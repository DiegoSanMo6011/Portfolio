import { useEffect, useRef, useState } from "react";
import type { ScheduledActivity } from "./PmoCpm";

/** Colores de serie validados para superficie oscura (#0F172A). */
const COLOR_CRITICA = "#EA580C";
const COLOR_HOLGURA = "#0891B2";

const LABEL_W = 108;
const ROW_H = 44;
const AXIS_H = 24;
const PAD_TOP = 6;
const PAD_RIGHT = 10;
const BAR_H = 16;

type PmoGanttProps = {
  activities: ScheduledActivity[];
  /** Máximo del eje de días (dominio de la escala X). */
  domainMax: number;
  selectedId: string;
  onSelect: (id: string) => void;
  reducedMotion: boolean;
};

/**
 * Gantt SVG horizontal: barras posicionadas por ES/EF en días.
 * Ruta crítica en naranja, actividades con holgura en cian.
 * El SVG se dibuja en píxeles reales (medidos con ResizeObserver)
 * para que los touch targets conserven ≥ 44 px en cualquier ancho.
 */
export function PmoGantt({ activities, domainMax, selectedId, onSelect, reducedMotion }: PmoGanttProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(600);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width;
      if (w && w > 0) setWidth(w);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const height = PAD_TOP + activities.length * ROW_H + AXIS_H;
  const plotW = Math.max(width - LABEL_W - PAD_RIGHT, 80);
  const x = (day: number): number => LABEL_W + (day / domainMax) * plotW;
  const axisY = PAD_TOP + activities.length * ROW_H;

  const ticks: number[] = [];
  for (let t = 0; t <= domainMax; t += 5) ticks.push(t);

  const barTransition = reducedMotion
    ? undefined
    : "x 300ms ease, width 300ms ease, fill 300ms ease";

  return (
    <div ref={containerRef} className="w-full">
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label="Diagrama de Gantt del proyecto con ruta crítica"
        className="block select-none"
      >
        {/* Grid recesivo: una línea vertical por marca de 5 días */}
        {ticks.map((t) => (
          <g key={t}>
            <line
              x1={x(t)}
              y1={PAD_TOP}
              x2={x(t)}
              y2={axisY}
              className="stroke-slate-700/50"
              strokeWidth={1}
            />
            <text
              x={x(t)}
              y={axisY + 15}
              textAnchor="middle"
              className="fill-slate-500 text-[10px] font-mono"
            >
              {t}
            </text>
          </g>
        ))}
        {/* Línea base del eje */}
        <line x1={LABEL_W} y1={axisY} x2={width - PAD_RIGHT} y2={axisY} className="stroke-slate-700" strokeWidth={1} />
        <text x={width - PAD_RIGHT} y={axisY + 15} textAnchor="end" className="fill-slate-500 text-[10px]">
          días
        </text>

        {activities.map((act, i) => {
          const rowTop = PAD_TOP + i * ROW_H;
          const barX = x(act.es);
          const barW = Math.max(x(act.ef) - x(act.es), 3);
          const isSelected = act.id === selectedId;
          return (
            <g key={act.id}>
              {isSelected && (
                <rect
                  x={0}
                  y={rowTop}
                  width={width}
                  height={ROW_H}
                  fill="rgba(148, 163, 184, 0.07)"
                  rx={6}
                />
              )}
              <text
                x={4}
                y={rowTop + ROW_H / 2}
                dominantBaseline="central"
                className={`text-[11px] ${isSelected ? "fill-slate-200" : "fill-slate-300"}`}
              >
                {act.nombreCorto}
              </text>
              <rect
                x={barX}
                y={rowTop + (ROW_H - BAR_H) / 2}
                width={barW}
                height={BAR_H}
                rx={4}
                fill={act.critical ? COLOR_CRITICA : COLOR_HOLGURA}
                stroke={isSelected ? "#E2E8F0" : "none"}
                strokeWidth={isSelected ? 1.5 : 0}
                style={barTransition ? { transition: barTransition } : undefined}
              />
              {/* Hit target de fila completa (44 px), accesible por teclado */}
              <rect
                x={0}
                y={rowTop}
                width={width}
                height={ROW_H}
                fill="transparent"
                className="cursor-pointer focus:outline-none focus-visible:stroke-cyan-400"
                role="button"
                tabIndex={0}
                aria-label={`${act.nombre}: día ${act.es} a ${act.ef}, holgura ${act.slack} días`}
                onClick={() => onSelect(act.id)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onSelect(act.id);
                  }
                }}
              >
                <title>{`${act.nombre} · día ${act.es}–${act.ef} · holgura ${act.slack} d`}</title>
              </rect>
            </g>
          );
        })}
      </svg>

      {/* Leyenda: 2 categorías → siempre visible */}
      <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 pl-1">
        <span className="inline-flex items-center gap-2 text-xs text-slate-400">
          <span className="h-3 w-3 rounded-[3px]" style={{ backgroundColor: COLOR_CRITICA }} aria-hidden="true" />
          Ruta crítica
        </span>
        <span className="inline-flex items-center gap-2 text-xs text-slate-400">
          <span className="h-3 w-3 rounded-[3px]" style={{ backgroundColor: COLOR_HOLGURA }} aria-hidden="true" />
          Con holgura
        </span>
      </div>
    </div>
  );
}
