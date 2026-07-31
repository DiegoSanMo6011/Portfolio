// Demo interactivo del dashboard de analítica + asistente IA "Autonomito".
// Todos los datos son ficticios y viven en memoria; sin red, sin dependencias.
import { useState } from "react";
import {
  DashboardDemoBars,
  DashboardDemoSparkline,
  fmtMXN,
  type DayPoint,
  type HourPoint,
} from "./DashboardDemoCharts";
import { DashboardDemoChat, type AutonomitoFacts } from "./DashboardDemoChat";

type RangeKey = "hoy" | "7d";

// ---------- Datos ficticios (cafetería) ----------
const HOURS_HOY: HourPoint[] = [
  { h: 8, v: 320 },
  { h: 9, v: 780 },
  { h: 10, v: 640 },
  { h: 11, v: 410 },
  { h: 12, v: 380 },
  { h: 13, v: 520 },
  { h: 14, v: 610 },
  { h: 15, v: 450 },
  { h: 16, v: 590 },
  { h: 17, v: 720 },
  { h: 18, v: 430 },
  { h: 19, v: 260 },
];

// Promedio por hora de los últimos 7 días (misma forma, escala coherente).
const HOURS_7D: HourPoint[] = [
  { h: 8, v: 350 },
  { h: 9, v: 800 },
  { h: 10, v: 650 },
  { h: 11, v: 450 },
  { h: 12, v: 390 },
  { h: 13, v: 520 },
  { h: 14, v: 600 },
  { h: 15, v: 440 },
  { h: 16, v: 560 },
  { h: 17, v: 700 },
  { h: 18, v: 460 },
  { h: 19, v: 280 },
];

// Últimos 7 días; el penúltimo es "ayer" y el último es "hoy".
const DAYS_7D: DayPoint[] = [
  { d: "vie", v: 6240 },
  { d: "sáb", v: 8350 },
  { d: "dom", v: 7180 },
  { d: "lun", v: 4760 },
  { d: "mar", v: 5310 },
  { d: "mié", v: 5420 },
  { d: "hoy", v: 6110 },
];

const TICKETS_HOY = 78;
const TICKETS_7D = 554;
const EFECTIVO_HOY = 3240;
const EFECTIVO_7D = 19870;
const PRODUCTO = { nombre: "Café americano", unidades: 34, precio: 45 };

// ---------- Derivados (garantizan coherencia dashboard <-> chat) ----------
const ventasHoy = HOURS_HOY.reduce((a, p) => a + p.v, 0);
const ventas7d = DAYS_7D.reduce((a, p) => a + p.v, 0);
const ayer = DAYS_7D[DAYS_7D.length - 2]?.v ?? ventasHoy;
const deltaAyer = ((ventasHoy - ayer) / ayer) * 100;
const horasOrdenadas = [...HOURS_HOY].sort((a, b) => b.v - a.v);
const horaPico = horasOrdenadas[0] ?? { h: 0, v: 0 };
const horaSegunda = horasOrdenadas[1] ?? { h: 0, v: 0 };
const productoMonto = PRODUCTO.unidades * PRODUCTO.precio;

const FACTS: Omit<AutonomitoFacts, "range"> = {
  ventasHoy: fmtMXN(ventasHoy),
  ticketsHoy: TICKETS_HOY,
  ticketPromHoy: fmtMXN(ventasHoy / TICKETS_HOY, 2),
  deltaVsAyer: `${deltaAyer >= 0 ? "+" : ""}${deltaAyer.toFixed(1)}%`,
  ventas7d: fmtMXN(ventas7d),
  tickets7d: TICKETS_7D,
  horaPico: `${horaPico.h}:00`,
  horaPicoMonto: fmtMXN(horaPico.v),
  horaSegunda: `${horaSegunda.h}:00`,
  horaSegundaMonto: fmtMXN(horaSegunda.v),
  producto: PRODUCTO.nombre,
  productoUnidades: PRODUCTO.unidades,
  productoMonto: fmtMXN(productoMonto),
  productoPct: Math.round((productoMonto / ventasHoy) * 100),
};

type Kpi = { label: string; value: string; pct: string; up: boolean; vs: string };

const KPIS: Record<RangeKey, Kpi[]> = {
  hoy: [
    { label: "Ventas", value: fmtMXN(ventasHoy), pct: FACTS.deltaVsAyer, up: deltaAyer >= 0, vs: "vs ayer" },
    { label: "Tickets", value: String(TICKETS_HOY), pct: "+6.8%", up: true, vs: "vs ayer" },
    { label: "Ticket promedio", value: FACTS.ticketPromHoy, pct: "+5.3%", up: true, vs: "vs ayer" },
    { label: "Efectivo en caja", value: fmtMXN(EFECTIVO_HOY), pct: "-2.1%", up: false, vs: "vs ayer" },
  ],
  "7d": [
    { label: "Ventas", value: fmtMXN(ventas7d), pct: "+9.4%", up: true, vs: "vs sem. previa" },
    { label: "Tickets", value: String(TICKETS_7D), pct: "+4.1%", up: true, vs: "vs sem. previa" },
    { label: "Ticket promedio", value: fmtMXN(ventas7d / TICKETS_7D, 2), pct: "+1.9%", up: true, vs: "vs sem. previa" },
    { label: "Efectivo en caja", value: fmtMXN(EFECTIVO_7D), pct: "-1.8%", up: false, vs: "vs sem. previa" },
  ],
};

function DeltaArrow({ up }: { up: boolean }) {
  return (
    <svg viewBox="0 0 12 12" className="h-3 w-3 shrink-0" aria-hidden="true">
      <path d={up ? "M6 2 L10.5 8.5 H1.5 Z" : "M6 10 L1.5 3.5 H10.5 Z"} fill={up ? "#22C55E" : "#EF4444"} />
    </svg>
  );
}

export function DashboardDemo() {
  const [range, setRange] = useState<RangeKey>("hoy");

  return (
    <section
      aria-label="Demo interactivo del dashboard de analítica con datos ficticios"
      className="overflow-hidden rounded-xl border border-slate-700 bg-slate-800/50"
    >
      {/* Encabezado */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-700 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#22C55E]" aria-hidden="true" />
          <span className="text-sm font-semibold text-slate-50">Analítica — Dashboard</span>
        </div>
        <span className="rounded-full border border-cyan-500/30 bg-cyan-400/10 px-2.5 py-1 font-mono text-[10px] text-cyan-400">
          Demo interactivo · datos ficticios
        </span>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_340px]">
        {/* Dashboard */}
        <div className="min-w-0 space-y-4 p-4">
          <div className="flex gap-2" role="group" aria-label="Rango de fechas">
            {(["hoy", "7d"] as const).map((k) => (
              <button
                key={k}
                type="button"
                aria-pressed={range === k}
                onClick={() => setRange(k)}
                style={{ touchAction: "manipulation" }}
                className={`min-h-[44px] rounded-lg border px-4 text-sm font-medium transition-colors ${
                  range === k
                    ? "border-cyan-500/50 bg-cyan-400/10 text-cyan-400"
                    : "border-slate-700 bg-slate-900/40 text-slate-400 hover:border-slate-600 hover:text-slate-300"
                }`}
              >
                {k === "hoy" ? "Hoy" : "7 días"}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2 xl:grid-cols-4">
            {KPIS[range].map((k) => (
              <div key={k.label} className="rounded-lg border border-slate-700 bg-slate-900/60 p-3">
                <p className="text-[11px] text-slate-400">{k.label}</p>
                <p className="mt-1 font-mono text-xl font-semibold text-slate-50">{k.value}</p>
                <p className="mt-1 flex items-center gap-1 text-[11px] text-slate-400">
                  <DeltaArrow up={k.up} />
                  <span>
                    {k.pct} {k.vs}
                  </span>
                </p>
              </div>
            ))}
          </div>

          <div className="rounded-lg border border-slate-700 bg-slate-900/60 p-3">
            <DashboardDemoBars
              data={range === "hoy" ? HOURS_HOY : HOURS_7D}
              title={range === "hoy" ? "Ventas por hora — hoy" : "Ventas por hora — promedio 7 días"}
            />
          </div>

          <div className="rounded-lg border border-slate-700 bg-slate-900/60 p-3">
            <DashboardDemoSparkline data={DAYS_7D} />
          </div>
        </div>

        {/* Autonomito */}
        <div className="border-t border-slate-700 lg:border-l lg:border-t-0">
          <DashboardDemoChat facts={{ range, ...FACTS }} />
        </div>
      </div>
    </section>
  );
}
