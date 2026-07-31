/**
 * OfflineSyncDemo — Demo interactivo del modo offline-first de los POS de Autónoma.
 * Simula en memoria el flujo POS → cola local → nube: con internet la venta se
 * sincroniza casi al instante; sin internet se acumula en la cola y al reconectar
 * se vacía una por una. Nunca se pierde una venta. Sin red real: todo es ficticio.
 */
import { useEffect, useRef, useState, type ReactElement } from 'react';
import {
  ConnectorH,
  IconCheck,
  IconCloud,
  IconDb,
  IconPos,
  IconWifi,
  IconWifiOff,
  NodeCard,
  OSD_STYLE,
  VentaRow,
  type Venta,
} from './OfflineSyncDemoParts';

/** Catálogo fijo: las ventas se generan ciclando esta lista (sin aleatoriedad). */
const VENTAS_DEMO: ReadonlyArray<Pick<Venta, 'producto' | 'monto'>> = [
  { producto: 'Latte 12 oz', monto: 62 },
  { producto: 'Espresso doble', monto: 48 },
  { producto: 'Concha + americano', monto: 75 },
  { producto: 'Cold brew', monto: 68 },
  { producto: 'Capuchino', monto: 58 },
  { producto: 'Té chai', monto: 55 },
  { producto: 'Panini de pavo', monto: 89 },
];

const FLIGHT1_MS = 260; // vuelo POS → cola
const FLIGHT2_MS = 340; // vuelo cola → nube
const DRAIN_STEP_MS = 400; // ritmo de vaciado de la cola al reconectar
const TOAST_MS = 3600;

const fmtMXN = (n: number): string =>
  n.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });

export function OfflineSyncDemo(): ReactElement {
  const [online, setOnline] = useState(true);
  const [queue, setQueue] = useState<Venta[]>([]);
  const [captured, setCaptured] = useState(0);
  const [syncedCount, setSyncedCount] = useState(0);
  const [recent, setRecent] = useState<Venta[]>([]);
  const [lastVenta, setLastVenta] = useState<Venta | null>(null);
  const [leg1, setLeg1] = useState<{ key: number } | null>(null);
  const [leg2, setLeg2] = useState<{ key: number } | null>(null);
  const [pulse, setPulse] = useState(0);
  const [toast, setToast] = useState<string | null>(null);

  // Refs como fuente de verdad para la lógica con timers (evita closures viejos).
  const onlineRef = useRef(true);
  const queueRef = useRef<Venta[]>([]);
  const drainingRef = useRef(false);
  const drainCountRef = useRef(0);
  const folioRef = useRef(0);
  const keyRef = useRef(0);
  const reducedRef = useRef(false);
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedRef.current = mql.matches;
    const onChange = (e: MediaQueryListEvent): void => {
      reducedRef.current = e.matches;
    };
    mql.addEventListener('change', onChange);
    return () => {
      mql.removeEventListener('change', onChange);
      timersRef.current.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  const schedule = (fn: () => void, ms: number): void => {
    timersRef.current.push(window.setTimeout(fn, ms));
  };

  /** Duración de vuelo: 0 si el usuario prefiere movimiento reducido. */
  const dur = (ms: number): number => (reducedRef.current ? 0 : ms);

  const syncQueueView = (): void => setQueue([...queueRef.current]);

  const fireLeg = (set: typeof setLeg1, ms: number): void => {
    const key = ++keyRef.current;
    set({ key });
    schedule(() => set((prev) => (prev && prev.key === key ? null : prev)), ms);
  };

  /** Aterriza una venta en la nube (tras el vuelo cola → nube). */
  const flyToCloud = (venta: Venta): void => {
    fireLeg(setLeg2, dur(FLIGHT2_MS));
    schedule(() => {
      setSyncedCount((s) => s + 1);
      setRecent((r) => [...r, venta].slice(-3));
      setPulse((p) => p + 1);
    }, dur(FLIGHT2_MS));
  };

  const endDrain = (): void => {
    drainingRef.current = false;
    const n = drainCountRef.current;
    if (n > 0) {
      setToast(`${n} ${n === 1 ? 'venta sincronizada' : 'ventas sincronizadas'} · 0 perdidas`);
      schedule(() => setToast(null), TOAST_MS);
    }
  };

  /** Vacía la cola una venta a la vez (~400 ms por venta). */
  const drainStep = (): void => {
    const next = queueRef.current[0];
    if (!onlineRef.current || !next) {
      endDrain();
      return;
    }
    queueRef.current = queueRef.current.slice(1);
    syncQueueView();
    drainCountRef.current += 1;
    flyToCloud(next);
    schedule(drainStep, DRAIN_STEP_MS);
  };

  const startDrain = (): void => {
    if (drainingRef.current || queueRef.current.length === 0) return;
    drainingRef.current = true;
    drainCountRef.current = 0;
    drainStep();
  };

  const toggleOnline = (): void => {
    const next = !onlineRef.current;
    onlineRef.current = next;
    setOnline(next);
    if (next) startDrain();
  };

  const registrarVenta = (): void => {
    const idx = folioRef.current++;
    const base = VENTAS_DEMO[idx % VENTAS_DEMO.length]!;
    const venta: Venta = { ...base, folio: `V-${String(101 + idx).padStart(4, '0')}` };
    setCaptured((c) => c + 1);
    setLastVenta(venta);
    fireLeg(setLeg1, dur(FLIGHT1_MS));
    schedule(() => {
      if (onlineRef.current && !drainingRef.current && queueRef.current.length === 0) {
        flyToCloud(venta);
      } else {
        queueRef.current = [...queueRef.current, venta];
        syncQueueView();
        if (onlineRef.current) startDrain();
      }
    }, dur(FLIGHT1_MS));
  };

  const cloudOk = syncedCount > 0 && queue.length === 0;

  return (
    <div className="relative mx-auto w-full max-w-3xl rounded-xl border border-slate-700 bg-slate-800/50 p-4 font-sans text-slate-50 sm:p-6">
      <style>{OSD_STYLE}</style>

      <div className="mb-4">
        <span className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1 text-[11px] text-slate-400">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
          Demo interactivo · datos ficticios
        </span>
      </div>

      <div className="mb-5 flex flex-wrap items-center gap-3">
        <button
          type="button"
          role="switch"
          aria-checked={online}
          onClick={toggleOnline}
          className="flex min-h-[44px] items-center gap-3 rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 transition-colors hover:border-slate-500"
        >
          <span
            className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${online ? 'bg-green-500/80' : 'bg-red-500/80'}`}
          >
            <span
              className={`absolute top-1 h-5 w-5 rounded-full bg-slate-50 transition-all ${online ? 'left-6' : 'left-1'}`}
            />
          </span>
          <span className="flex items-center gap-1.5 text-sm">
            {online ? (
              <IconWifi className="h-4 w-4 text-green-500" />
            ) : (
              <IconWifiOff className="h-4 w-4 text-red-500" />
            )}
            <span className="text-slate-400">Internet:</span>
            <span className="font-medium text-slate-50">{online ? 'conectado' : 'sin conexión'}</span>
          </span>
        </button>
        <button
          type="button"
          onClick={registrarVenta}
          className="min-h-[44px] rounded-lg bg-[#134F9F] px-5 text-sm font-semibold text-white transition hover:bg-[#1a5fc0] active:scale-[.98]"
        >
          Registrar venta
        </button>
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)_1.5rem_minmax(0,1fr)_1.5rem_minmax(0,1fr)] items-stretch sm:grid-cols-[minmax(0,1fr)_3.5rem_minmax(0,1fr)_3.5rem_minmax(0,1fr)]">
        <NodeCard icon={<IconPos className="h-5 w-5 sm:h-6 sm:w-6" />} titulo="POS (PWA)" sub="captura la venta">
          {lastVenta ? (
            <div className="rounded-md border border-slate-700 bg-slate-900/60 px-2 py-1.5">
              <p className="truncate font-mono text-[10px] text-slate-300">{lastVenta.folio}</p>
              <p className="truncate text-[10px] text-slate-400">{lastVenta.producto}</p>
              <p className="font-mono text-[11px] text-slate-50">{fmtMXN(lastVenta.monto)}</p>
            </div>
          ) : (
            <p className="text-center text-[10px] text-slate-500">Presiona «Registrar venta»</p>
          )}
        </NodeCard>

        <ConnectorH cut={false} packet={leg1} durationMs={dur(FLIGHT1_MS)} label="captura local" />

        <NodeCard icon={<IconDb className="h-5 w-5 sm:h-6 sm:w-6" />} titulo="Cola local" sub="IndexedDB / SQLite">
          <div className="mb-1.5 flex justify-center">
            {queue.length > 0 ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-2 py-0.5 font-mono text-[10px] font-medium text-amber-500">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                {queue.length} {queue.length === 1 ? 'pendiente' : 'pendientes'}
              </span>
            ) : (
              <span className="font-mono text-[10px] text-slate-500">cola vacía</span>
            )}
          </div>
          <ul aria-label="Ventas pendientes de sincronizar" className="space-y-1">
            {queue.slice(0, 3).map((v) => (
              <VentaRow key={v.folio} venta={v} estado="pendiente" />
            ))}
          </ul>
          {queue.length > 3 && (
            <p className="mt-1 text-center font-mono text-[10px] text-slate-400">+{queue.length - 3} más</p>
          )}
        </NodeCard>

        <ConnectorH
          cut={!online}
          packet={leg2}
          durationMs={dur(FLIGHT2_MS)}
          label={online ? 'sync cada 30 s' : 'sin conexión'}
        />

        <NodeCard icon={<IconCloud className="h-5 w-5 sm:h-6 sm:w-6" />} titulo="Nube" sub="Supabase">
          <div className="mb-1.5 flex justify-center">
            <span
              key={pulse}
              className={`inline-flex h-8 w-8 items-center justify-center rounded-full ${pulse > 0 ? 'osd-pop' : ''} ${
                cloudOk ? 'bg-green-500/15 text-green-500' : 'bg-slate-700/50 text-slate-500'
              }`}
            >
              <IconCheck className="h-4 w-4" />
            </span>
          </div>
          <ul aria-label="Ventas sincronizadas recientes" className="space-y-1">
            {recent.map((v) => (
              <VentaRow key={v.folio} venta={v} estado="ok" />
            ))}
          </ul>
        </NodeCard>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2 rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-3 text-center">
        <div>
          <p className="font-mono text-lg leading-tight text-slate-50">{captured}</p>
          <p className="text-[10px] text-slate-400">Ventas capturadas</p>
        </div>
        <div>
          <p className="font-mono text-lg leading-tight text-slate-50">{syncedCount}</p>
          <p className="text-[10px] text-slate-400">Sincronizadas</p>
        </div>
        <div>
          <p className="flex items-center justify-center gap-1 font-mono text-lg leading-tight text-slate-50">
            0<IconCheck className="h-3.5 w-3.5 text-green-500" />
          </p>
          <p className="text-[10px] text-slate-400">Perdidas</p>
        </div>
      </div>

      <p className="mt-3 text-center text-[11px] leading-snug text-slate-400">
        Así operan los POS de Autónoma: hasta 72 h sin internet con cola local y
        sincronización automática cada 30 s. Ninguna venta se pierde.
      </p>

      {toast && (
        <div role="status" className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center px-4">
          <div className="osd-pop flex items-center gap-2 rounded-lg border border-green-500/40 bg-slate-900/95 px-4 py-2 text-xs text-slate-100 shadow-lg">
            <IconCheck className="h-4 w-4 shrink-0 text-green-500" />
            {toast}
          </div>
        </div>
      )}
    </div>
  );
}
