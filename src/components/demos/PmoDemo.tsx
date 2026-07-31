import { useEffect, useMemo, useRef, useState } from "react";
import { computeCpm, computeTe, type PmoActivity } from "./PmoCpm";
import { PmoGantt } from "./PmoGantt";

/** Id de la actividad controlada por el slider. */
const SLIDER_ID = "C";
const SLIDER_MIN = 3;
const SLIDER_MAX = 14;
const SLIDER_DEFAULT = 9;

/** Red del proyecto ficticio "Implementación POS" (7 actividades). */
const BASE_ACTIVITIES: PmoActivity[] = [
  { id: "A", nombre: "Levantamiento de requerimientos", nombreCorto: "Levantamiento", deps: [], est: { a: 2, m: 3, b: 5 } },
  { id: "B", nombre: "Diseño de la solución", nombreCorto: "Diseño", deps: ["A"], est: { a: 3, m: 4, b: 6 } },
  { id: "C", nombre: "Desarrollo del núcleo", nombreCorto: "Desarrollo núcleo", deps: ["B"], est: { a: 7, m: 9, b: 13 } },
  { id: "D", nombre: "Integración de hardware", nombreCorto: "Integración HW", deps: ["B"], est: { a: 4, m: 6, b: 9 } },
  { id: "E", nombre: "Pruebas integrales", nombreCorto: "Pruebas", deps: ["C", "D"], est: { a: 2, m: 3, b: 5 } },
  { id: "F", nombre: "Instalación en sitio", nombreCorto: "Instalación", deps: ["E"], est: { a: 1, m: 2, b: 3 } },
  { id: "G", nombre: "Capacitación y cierre", nombreCorto: "Capacitación", deps: ["F"], est: { a: 1, m: 2, b: 4 } },
];

/** Sustituye la estimación de Desarrollo del núcleo según el slider (m). */
function buildActivities(mDesarrollo: number): PmoActivity[] {
  return BASE_ACTIVITIES.map((act) =>
    act.id === SLIDER_ID
      ? { ...act, est: { a: Math.max(1, mDesarrollo - 2), m: mDesarrollo, b: mDesarrollo + 4 } }
      : act,
  );
}

/** Detecta la preferencia del sistema por movimiento reducido. */
function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const onChange = (event: MediaQueryListEvent): void => setReduced(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/**
 * Demo interactivo del motor PM de la PMO interna de Autónoma:
 * estimación PERT de 3 puntos + ruta crítica (CPM) recalculada en vivo.
 */
export function PmoDemo() {
  const [mDev, setMDev] = useState(SLIDER_DEFAULT);
  const [selectedId, setSelectedId] = useState(SLIDER_ID);
  const [announcement, setAnnouncement] = useState("");
  const prevPathRef = useRef("");
  const reducedMotion = usePrefersReducedMotion();

  const result = useMemo(() => computeCpm(buildActivities(mDev)), [mDev]);
  const domainMax = Math.max(20, Math.ceil(result.duration / 5) * 5);
  const selected = result.activities.find((act) => act.id === selectedId) ?? result.activities[0];
  const teDev = computeTe({ a: Math.max(1, mDev - 2), m: mDev, b: mDev + 4 });

  // Anuncia cuando la ruta crítica cambia de camino al mover el slider.
  useEffect(() => {
    const signature = result.criticalPath.join(">");
    const prev = prevPathRef.current;
    prevPathRef.current = signature;
    if (!prev || prev === signature) return;
    const prevSet = new Set(prev.split(">"));
    const nuevas = result.activities.filter((act) => act.critical && !prevSet.has(act.id));
    if (nuevas.length > 0) {
      setAnnouncement(`La ruta crítica cambió: ahora pasa por ${nuevas.map((act) => act.nombre).join(" y ")}.`);
    }
  }, [result]);

  const detalle: Array<[string, string]> = selected
    ? [
        ["Optimista (a)", `${selected.est.a} d`],
        ["Probable (m)", `${selected.est.m} d`],
        ["Pesimista (b)", `${selected.est.b} d`],
        ["Esperada (te)", `${selected.te} d`],
        ["Holgura", `${selected.slack} d`],
        ["ES", `${selected.es}`],
        ["EF", `${selected.ef}`],
        ["LS", `${selected.ls}`],
        ["LF", `${selected.lf}`],
      ]
    : [];

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-4 sm:p-5">
      {/* Encabezado: chip + KPI en vivo */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <span className="inline-block rounded-full border border-slate-700 px-2.5 py-1 font-mono text-[11px] text-slate-400">
            Demo interactivo · datos ficticios
          </span>
          <h3 className="mt-2 text-sm font-semibold text-slate-50">
            Proyecto: Implementación POS
          </h3>
          <p className="text-xs text-slate-400">PERT 3 puntos + ruta crítica (CPM), recalculado en vivo</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-400">Duración total del proyecto</p>
          <p className="font-mono text-3xl font-bold text-slate-50">
            {result.duration}
            <span className="ml-1 text-base font-normal text-slate-400">días</span>
          </p>
        </div>
      </div>

      {/* Slider: duración de Desarrollo del núcleo */}
      <div className="mt-4 rounded-lg border border-slate-700 bg-slate-900/60 p-3">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <label htmlFor="pmo-slider-mdev" className="text-xs font-medium text-slate-300">
            Duración de Desarrollo del núcleo
            <span className="ml-1 text-slate-500">— estimación más probable (m)</span>
          </label>
          <span className="font-mono text-xs text-slate-300">
            m = {mDev} d · te = {teDev} d
          </span>
        </div>
        <input
          id="pmo-slider-mdev"
          type="range"
          min={SLIDER_MIN}
          max={SLIDER_MAX}
          step={1}
          value={mDev}
          onChange={(event) => setMDev(Number(event.target.value))}
          className="mt-1 h-11 w-full cursor-pointer touch-manipulation accent-cyan-500"
          aria-valuetext={`${mDev} días, duración esperada ${teDev} días`}
        />
        {/* Aviso de cambio de ruta crítica (espacio reservado, sin saltos de layout) */}
        <p className="min-h-[1.25rem] text-xs text-slate-200" aria-live="polite">
          {announcement && (
            <span
              className="inline-flex items-center gap-2"
              style={reducedMotion ? undefined : { animation: "pmo-fade-in 300ms ease" }}
            >
              <span className="h-2 w-2 shrink-0 rounded-full bg-[#EA580C]" aria-hidden="true" />
              {announcement}
            </span>
          )}
        </p>
      </div>

      {/* Gantt SVG */}
      <div className="mt-3 rounded-lg border border-slate-700 bg-slate-900 p-3">
        <PmoGantt
          activities={result.activities}
          domainMax={domainMax}
          selectedId={selectedId}
          onSelect={setSelectedId}
          reducedMotion={reducedMotion}
        />
      </div>

      {/* Panel de detalle de la actividad seleccionada */}
      {selected && (
        <div className="mt-3 rounded-lg border border-slate-700 bg-slate-900/60 p-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-medium text-slate-200">{selected.nombre}</p>
            <span className="inline-flex items-center gap-2 text-xs text-slate-400">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: selected.critical ? "#EA580C" : "#0891B2" }}
                aria-hidden="true"
              />
              {selected.critical ? "En ruta crítica" : `Holgura de ${selected.slack} días`}
            </span>
          </div>
          <dl className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-5">
            {detalle.map(([label, value]) => (
              <div key={label} className="rounded-md bg-slate-800/70 px-2 py-1.5">
                <dt className="text-[10px] uppercase tracking-wide text-slate-500">{label}</dt>
                <dd className="font-mono text-xs text-slate-300">{value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-2 text-[11px] text-slate-500">
            Toca cualquier barra del Gantt para ver su detalle PERT/CPM.
          </p>
        </div>
      )}

      <p className="mt-3 text-xs leading-relaxed text-slate-400">
        Este mismo motor (PERT + CPM + EVM) corre en la PMO interna con la que Autónoma gestiona sus
        proyectos.
      </p>

      <style>{`@keyframes pmo-fade-in { from { opacity: 0; } to { opacity: 1; } }`}</style>
    </div>
  );
}
