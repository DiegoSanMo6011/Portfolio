/**
 * Subcomponentes visuales del demo OfflineSyncDemo (solo presentación).
 * Iconos SVG inline, conector animado, filas de venta y tarjetas de nodo.
 */
import { useId, type ReactElement, type ReactNode } from 'react';

export type Venta = { folio: string; producto: string; monto: number };

/** Estilos de animación del demo. Respetan prefers-reduced-motion. */
export const OSD_STYLE = `
@keyframes osdFly{0%{left:2px;opacity:0}15%{opacity:1}100%{left:calc(100% - 12px);opacity:1}}
@keyframes osdPop{0%{transform:scale(.4);opacity:.3}60%{transform:scale(1.15)}100%{transform:scale(1);opacity:1}}
.osd-packet{animation:osdFly linear forwards}
.osd-pop{animation:osdPop .32s ease-out}
@media (prefers-reduced-motion:reduce){.osd-packet{display:none}.osd-pop{animation:none}}
`;

type IconProps = { className?: string };

function IconBase({ className, children }: IconProps & { children: ReactNode }): ReactElement {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export const IconPos = ({ className }: IconProps): ReactElement => (
  <IconBase className={className}>
    <rect x="3" y="4" width="18" height="13" rx="2" />
    <path d="M8 21h8M12 17v4" />
  </IconBase>
);

export const IconDb = ({ className }: IconProps): ReactElement => (
  <IconBase className={className}>
    <ellipse cx="12" cy="5" rx="8" ry="3" />
    <path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
    <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />
  </IconBase>
);

export const IconCloud = ({ className }: IconProps): ReactElement => (
  <IconBase className={className}>
    <path d="M17.5 19a4.5 4.5 0 0 0 .42-8.98 7 7 0 0 0-13.6 1.9A4 4 0 0 0 6 19h11.5Z" />
  </IconBase>
);

export const IconCheck = ({ className }: IconProps): ReactElement => (
  <IconBase className={className}>
    <path d="M20 6 9 17l-5-5" />
  </IconBase>
);

export const IconWifi = ({ className }: IconProps): ReactElement => (
  <IconBase className={className}>
    <path d="M1.42 9a16 16 0 0 1 21.16 0" />
    <path d="M5 12.55a11 11 0 0 1 14.08 0" />
    <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
    <circle cx="12" cy="19.5" r="1" fill="currentColor" stroke="none" />
  </IconBase>
);

export const IconWifiOff = ({ className }: IconProps): ReactElement => (
  <IconBase className={className}>
    <path d="m2 2 20 20" />
    <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
    <path d="M5 12.55a11 11 0 0 1 5.17-2.39" />
    <path d="M10.71 5.05A16 16 0 0 1 22.58 9" />
    <path d="M1.42 9a15.9 15.9 0 0 1 4.7-2.88" />
    <circle cx="12" cy="19.5" r="1" fill="currentColor" stroke="none" />
  </IconBase>
);

const IconX = ({ className }: IconProps): ReactElement => (
  <IconBase className={className}>
    <path d="M18 6 6 18M6 6l12 12" />
  </IconBase>
);

type ConnectorHProps = {
  /** true → enlace cortado (rojo, punteado, con ×). */
  cut: boolean;
  /** Paquete en vuelo: key distinta reinicia la animación. null → sin paquete. */
  packet: { key: number } | null;
  durationMs: number;
  /** Etiqueta bajo el conector (visible desde sm). */
  label: string;
};

/** Conector SVG horizontal entre nodos, con flecha, paquete animado y estado cortado. */
export function ConnectorH({ cut, packet, durationMs, label }: ConnectorHProps): ReactElement {
  const markerId = useId();
  return (
    <div aria-hidden="true" className="relative flex min-h-[120px] flex-col items-center justify-center">
      <div className="relative flex w-full items-center">
        <svg
          className={`h-3 w-full overflow-visible ${cut ? 'text-red-500/80' : 'text-slate-600'}`}
          role="presentation"
        >
          <defs>
            <marker
              id={markerId}
              viewBox="0 0 8 12"
              refX="7"
              refY="6"
              markerWidth="6"
              markerHeight="9"
              orient="auto"
            >
              <path d="M0 0 8 6 0 12Z" fill="currentColor" />
            </marker>
          </defs>
          <line
            x1="0"
            y1="50%"
            x2="98%"
            y2="50%"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeDasharray={cut ? '5 5' : undefined}
            markerEnd={`url(#${markerId})`}
          />
        </svg>
        {cut && (
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-red-500/70 bg-slate-900 p-0.5 text-red-500">
            <IconX className="h-2.5 w-2.5" />
          </span>
        )}
        {packet && !cut && (
          <span
            key={packet.key}
            className="osd-packet absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-cyan-600 ring-2 ring-cyan-400/40"
            style={{ animationDuration: `${durationMs}ms` }}
          />
        )}
      </div>
      <span
        className={`absolute top-1/2 mt-3 hidden whitespace-nowrap text-[10px] sm:block ${
          cut ? 'text-red-400' : 'text-slate-400'
        }`}
      >
        {label}
      </span>
    </div>
  );
}

/** Fila compacta de venta con badge de estado (pendiente ámbar / ok verde). */
export function VentaRow({ venta, estado }: { venta: Venta; estado: 'pendiente' | 'ok' }): ReactElement {
  return (
    <li className="flex min-w-0 items-center justify-between gap-1 rounded-md border border-slate-700 bg-slate-900/60 px-1.5 py-1">
      <span className="truncate font-mono text-[10px] text-slate-300">{venta.folio}</span>
      <span className="hidden font-mono text-[10px] text-slate-400 md:inline">${venta.monto}</span>
      {estado === 'pendiente' ? (
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-amber-500/15 px-1.5 py-0.5 text-[9px] font-medium text-amber-500">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
          pendiente
        </span>
      ) : (
        <span className="inline-flex shrink-0 items-center gap-0.5 text-[9px] font-medium text-green-500">
          <IconCheck className="h-3 w-3" />
          ok
        </span>
      )}
    </li>
  );
}

type NodeCardProps = { icon: ReactElement; titulo: string; sub: string; children: ReactNode };

/** Tarjeta de nodo del diagrama (POS, cola local o nube). */
export function NodeCard({ icon, titulo, sub, children }: NodeCardProps): ReactElement {
  return (
    <div className="flex min-h-[225px] flex-col rounded-xl border border-slate-700 bg-slate-900/50 p-2 sm:p-3">
      <div className="mb-2 flex flex-col items-center gap-1 text-center">
        <span className="text-cyan-400">{icon}</span>
        <p className="text-[11px] font-semibold leading-tight text-slate-50 sm:text-sm">{titulo}</p>
        <p className="font-mono text-[9px] leading-tight text-slate-400 sm:text-[10px]">{sub}</p>
      </div>
      <div className="min-h-0 flex-1">{children}</div>
    </div>
  );
}
