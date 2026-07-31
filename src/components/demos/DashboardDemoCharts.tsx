// Gráficas SVG del demo de dashboard de analítica (datos ficticios).
// Reglas: una serie #0891B2, texto siempre en tintas slate, un solo eje,
// barras delgadas con extremos redondeados 4px ancladas a la baseline, gap 2px.
import { useEffect, useRef, useState } from "react";

export type HourPoint = { h: number; v: number };
export type DayPoint = { d: string; v: number };

const SERIE = "#0891B2";
const INK_LABEL = "#94A3B8"; // slate-400
const INK_VALUE = "#CBD5E1"; // slate-300
const GRID = "#334155"; // slate-700
const BASELINE = "#475569"; // slate-600
const SURFACE = "#0F172A"; // slate-900 (anillo de superficie en puntos)
const VB_W = 480; // ancho del viewBox compartido por ambas gráficas

/** Formatea un monto en pesos con separador de miles (sin depender de locale). */
export function fmtMXN(n: number, decimals = 0): string {
  const [int, dec] = n.toFixed(decimals).split(".");
  const grouped = (int ?? "0").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return dec ? `$${grouped}.${dec}` : `$${grouped}`;
}

/**
 * Compensa el escalado del viewBox para que el texto del SVG conserve un
 * tamaño legible (~11px reales) de 360 px a 1280 px de viewport.
 */
function useTextScale(): { ref: React.RefObject<HTMLDivElement | null>; k: number } {
  const ref = useRef<HTMLDivElement>(null);
  const [k, setK] = useState(1);
  useEffect(() => {
    const el = ref.current;
    if (el === null) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width ?? 0;
      if (w > 0) setK(Math.min(2, Math.max(1, VB_W / w)));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return { ref, k };
}

type Hover = { i: number; x: number; y: number } | null;

function clampPct(p: number): number {
  return Math.min(88, Math.max(12, p));
}

/** Barras "Ventas por hora": tooltip al hover, etiqueta directa solo en el máximo. */
export function DashboardDemoBars({ data, title }: { data: HourPoint[]; title: string }) {
  const [hover, setHover] = useState<Hover>(null);
  const { ref, k } = useTextScale();
  const fs = 11 * k;
  const W = VB_W;
  const H = 210;
  const top = 18;
  const bottom = 22;
  const left = 40;
  const right = 6;
  const plotW = W - left - right;
  const plotH = H - top - bottom;
  const base = H - bottom;

  const max = data.reduce((a, p) => Math.max(a, p.v), 0);
  const step = Math.max(100, Math.ceil(max / 3 / 100) * 100);
  const niceMax = step * 3;
  const ticks = [0, step, step * 2, step * 3];
  const slot = plotW / data.length;
  const barW = Math.max(6, slot - 2); // gap fijo de 2px entre barras adyacentes
  const yFor = (v: number) => base - (v / niceMax) * plotH;
  const maxIdx = data.reduce((mi, p, i, arr) => (p.v > (arr[mi]?.v ?? 0) ? i : mi), 0);
  const hovered = hover !== null ? data[hover.i] : undefined;

  return (
    <div>
      <p className="text-sm font-medium text-slate-300">{title}</p>
      <div ref={ref} className="relative mt-2">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="block w-full"
          role="img"
          aria-label={`${title}. Máximo: ${fmtMXN(max)} a las ${data[maxIdx]?.h ?? 0}:00.`}
          onPointerLeave={() => setHover(null)}
        >
          {ticks.map((t) => (
            <g key={t}>
              {t > 0 && (
                <line x1={left} x2={W - right} y1={yFor(t)} y2={yFor(t)} stroke={GRID} strokeOpacity={0.5} strokeWidth={1} />
              )}
              <text x={left - 6} y={yFor(t) + fs / 3} textAnchor="end" fontSize={fs} fill={INK_LABEL} className="font-mono">
                {t === 0 ? "0" : fmtMXN(t).slice(1)}
              </text>
            </g>
          ))}
          <line x1={left} x2={W - right} y1={base} y2={base} stroke={BASELINE} strokeWidth={1} />
          {data.map((p, i) => {
            const x = left + i * slot + (slot - barW) / 2;
            const y = yFor(p.v);
            const hgt = base - y;
            const r = Math.min(4, barW / 2, hgt);
            const d = `M ${x} ${base} L ${x} ${y + r} Q ${x} ${y} ${x + r} ${y} L ${x + barW - r} ${y} Q ${x + barW} ${y} ${x + barW} ${y + r} L ${x + barW} ${base} Z`;
            return (
              <path key={p.h} d={d} fill={SERIE} opacity={hover === null || hover.i === i ? 1 : 0.5} />
            );
          })}
          {data.map((p, i) => (
            <text
              key={`x-${p.h}`}
              x={left + i * slot + slot / 2}
              y={H - 7}
              textAnchor="middle"
              fontSize={fs}
              fill={INK_LABEL}
              className="font-mono"
            >
              {i % 2 === 0 ? p.h : ""}
            </text>
          ))}
          <text
            x={left + maxIdx * slot + slot / 2}
            y={yFor(data[maxIdx]?.v ?? 0) - 6}
            textAnchor="middle"
            fontSize={fs}
            fill={INK_VALUE}
            className="font-mono"
          >
            {fmtMXN(data[maxIdx]?.v ?? 0)}
          </text>
          {data.map((p, i) => (
            <rect
              key={`hit-${p.h}`}
              x={left + i * slot}
              y={top}
              width={slot}
              height={plotH}
              fill="transparent"
              onPointerEnter={() => setHover({ i, x: left + i * slot + slot / 2, y: yFor(p.v) })}
              onPointerDown={() => setHover({ i, x: left + i * slot + slot / 2, y: yFor(p.v) })}
            />
          ))}
        </svg>
        {hover !== null && hovered !== undefined && (
          <div
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[calc(100%+8px)] whitespace-nowrap rounded-md border border-slate-600 bg-slate-800 px-2 py-1 text-[11px] text-slate-200 shadow-lg"
            style={{ left: `${clampPct((hover.x / W) * 100)}%`, top: `${(hover.y / H) * 100}%` }}
            aria-hidden="true"
          >
            {hovered.h}:00 · <span className="font-mono">{fmtMXN(hovered.v)}</span>
          </div>
        )}
      </div>
    </div>
  );
}

/** Sparkline "Tendencia 7 días": línea 2px + media móvil punteada, con leyenda (2 series). */
export function DashboardDemoSparkline({ data }: { data: DayPoint[] }) {
  const [hover, setHover] = useState<Hover>(null);
  const { ref, k } = useTextScale();
  const fs = 11 * k;
  const W = VB_W;
  const H = 130;
  const top = 20;
  const bottom = 22;
  const left = 22;
  const right = 22;

  const values = data.map((p) => p.v);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const lo = min * 0.94;
  const hi = max * 1.05;
  const xFor = (i: number) => left + (i * (W - left - right)) / (data.length - 1);
  const yFor = (v: number) => top + ((hi - v) / (hi - lo)) * (H - top - bottom);
  const maxIdx = values.indexOf(max);

  const ma = data.map((_, i, arr) =>
    i < 2 ? null : arr.slice(i - 2, i + 1).reduce((a, q) => a + q.v, 0) / 3
  );
  const linePath = data.map((p, i) => `${i === 0 ? "M" : "L"} ${xFor(i)} ${yFor(p.v)}`).join(" ");
  const maPath = ma
    .map((v, i) => (v === null ? "" : `${i === 2 ? "M" : "L"} ${xFor(i)} ${yFor(v)}`))
    .join(" ")
    .trim();
  const hovered = hover !== null ? data[hover.i] : undefined;
  const hoveredMa = hover !== null ? ma[hover.i] ?? null : null;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
        <p className="text-sm font-medium text-slate-300">Tendencia 7 días</p>
        <div className="flex items-center gap-4 text-[11px] text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="h-0.5 w-4 rounded-full" style={{ backgroundColor: SERIE }} aria-hidden="true" />
            Ventas por día
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-4 border-t-2 border-dashed border-slate-400" aria-hidden="true" />
            Media móvil (3 días)
          </span>
        </div>
      </div>
      <div ref={ref} className="relative mt-2">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="block w-full"
          role="img"
          aria-label={`Tendencia de ventas de 7 días. Mejor día: ${data[maxIdx]?.d ?? ""} con ${fmtMXN(max)}.`}
          onPointerLeave={() => setHover(null)}
        >
          <path d={maPath} fill="none" stroke={INK_LABEL} strokeWidth={1.5} strokeDasharray="4 4" strokeLinecap="round" />
          <path d={linePath} fill="none" stroke={SERIE} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          {data.map((p, i) => (
            <circle
              key={`pt-${p.d}`}
              cx={xFor(i)}
              cy={yFor(p.v)}
              r={hover !== null && hover.i === i ? 4.5 : 3}
              fill={SERIE}
              stroke={SURFACE}
              strokeWidth={2}
            />
          ))}
          {data.map((p, i) => (
            <text key={`d-${p.d}`} x={xFor(i)} y={H - 6} textAnchor="middle" fontSize={fs} fill={INK_LABEL} className="font-mono">
              {p.d}
            </text>
          ))}
          <text
            x={xFor(maxIdx)}
            y={yFor(max) - 9}
            textAnchor="middle"
            fontSize={fs}
            fill={INK_VALUE}
            className="font-mono"
          >
            {fmtMXN(max)}
          </text>
          {data.map((p, i) => (
            <circle
              key={`hit-${p.d}`}
              cx={xFor(i)}
              cy={yFor(p.v)}
              r={22}
              fill="transparent"
              onPointerEnter={() => setHover({ i, x: xFor(i), y: yFor(p.v) })}
              onPointerDown={() => setHover({ i, x: xFor(i), y: yFor(p.v) })}
            />
          ))}
        </svg>
        {hover !== null && hovered !== undefined && (
          <div
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[calc(100%+10px)] whitespace-nowrap rounded-md border border-slate-600 bg-slate-800 px-2 py-1 text-[11px] text-slate-200 shadow-lg"
            style={{ left: `${clampPct((hover.x / W) * 100)}%`, top: `${(hover.y / H) * 100}%` }}
            aria-hidden="true"
          >
            <p>
              {hovered.d} · <span className="font-mono">{fmtMXN(hovered.v)}</span>
            </p>
            {hoveredMa !== null && (
              <p className="text-slate-400">
                media 3d · <span className="font-mono">{fmtMXN(hoveredMa)}</span>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
