// Panel de chat "Autonomito" del demo de analítica (datos ficticios).
// Las respuestas citan los mismos números visibles en el dashboard.
import { useEffect, useRef, useState } from "react";

export type AutonomitoFacts = {
  range: "hoy" | "7d";
  ventasHoy: string;
  ticketsHoy: number;
  ticketPromHoy: string;
  deltaVsAyer: string;
  ventas7d: string;
  tickets7d: number;
  horaPico: string;
  horaPicoMonto: string;
  horaSegunda: string;
  horaSegundaMonto: string;
  producto: string;
  productoUnidades: number;
  productoMonto: string;
  productoPct: number;
};

type QuestionId = "ventas" | "producto" | "hora";
type Msg = { role: "user" | "ia"; text: string };

const QUESTIONS: ReadonlyArray<{ id: QuestionId; label: string }> = [
  { id: "ventas", label: "¿Cómo van las ventas hoy?" },
  { id: "producto", label: "¿Cuál es mi producto estrella?" },
  { id: "hora", label: "¿A qué hora vendo más?" },
];

const GREETING =
  "Hola, soy Autonomito, el asistente del dashboard. Toca una pregunta y te contesto con los datos del POS.";

function buildAnswer(id: QuestionId, f: AutonomitoFacts): string {
  if (id === "ventas") {
    const extra =
      f.range === "7d"
        ? ` En los últimos 7 días acumulas ${f.ventas7d} con ${f.tickets7d} tickets.`
        : "";
    return `Hoy llevas ${f.ventasHoy} en ventas con ${f.ticketsHoy} tickets; tu ticket promedio es de ${f.ticketPromHoy}. Vas ${f.deltaVsAyer} respecto a ayer.${extra} Fuente: comandas.`;
  }
  if (id === "producto") {
    return `Tu producto estrella de hoy es ${f.producto}: ${f.productoUnidades} unidades por ${f.productoMonto}, el ${f.productoPct}% de la venta del día. Fuente: comandas.`;
  }
  return `Tu hora pico es a las ${f.horaPico} con ${f.horaPicoMonto} vendidos hoy; le sigue las ${f.horaSegunda} con ${f.horaSegundaMonto}. Ahí conviene reforzar la barra. Fuente: comandas.`;
}

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

function Avatar({ size }: { size: "sm" | "md" }) {
  const cls = size === "md" ? "h-8 w-8 text-sm" : "h-6 w-6 text-[10px]";
  return (
    <span
      className={`flex ${cls} shrink-0 items-center justify-center rounded-full bg-[#134F9F] font-bold text-white`}
      aria-hidden="true"
    >
      A
    </span>
  );
}

export function DashboardDemoChat({ facts }: { facts: AutonomitoFacts }) {
  const reduced = usePrefersReducedMotion();
  const [messages, setMessages] = useState<Msg[]>([{ role: "ia", text: GREETING }]);
  const [target, setTarget] = useState<string | null>(null);
  const [typed, setTyped] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const ask = (id: QuestionId, label: string) => {
    if (target !== null) return;
    const answer = buildAnswer(id, facts);
    if (reduced) {
      setMessages((m) => [...m, { role: "user", text: label }, { role: "ia", text: answer }]);
      return;
    }
    setMessages((m) => [...m, { role: "user", text: label }]);
    setTyped("");
    setTarget(answer);
  };

  useEffect(() => {
    if (target === null) return;
    if (typed.length >= target.length) {
      const t = setTimeout(() => {
        setMessages((m) => [...m, { role: "ia", text: target }]);
        setTarget(null);
        setTyped("");
      }, 350);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setTyped(target.slice(0, typed.length + 1));
    }, 16 + Math.random() * 14);
    return () => clearTimeout(t);
  }, [target, typed]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el !== null) el.scrollTop = el.scrollHeight;
  }, [messages, typed]);

  return (
    <div className="flex h-[400px] flex-col lg:h-full">
      {/* Encabezado */}
      <div className="flex items-center gap-2.5 border-b border-slate-700 px-3 py-2.5">
        <Avatar size="md" />
        <div className="min-w-0">
          <p className="text-sm font-semibold text-slate-50">Autonomito</p>
          <p className="flex items-center gap-1.5 text-[11px] text-slate-400">
            <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" aria-hidden="true" />
            Asistente IA · en línea
          </p>
        </div>
      </div>

      {/* Mensajes */}
      <div ref={scrollRef} className="flex-1 space-y-2.5 overflow-y-auto p-3" aria-live="polite">
        {messages.map((msg, i) =>
          msg.role === "ia" ? (
            <div key={i} className="flex items-start gap-2">
              <Avatar size="sm" />
              <div className="max-w-[85%] rounded-lg rounded-tl-sm border border-slate-700 bg-slate-800/80 px-3 py-2 text-[13px] leading-relaxed text-slate-300">
                {msg.text}
              </div>
            </div>
          ) : (
            <div
              key={i}
              className="ml-auto max-w-[85%] rounded-lg rounded-tr-sm border border-cyan-500/30 bg-cyan-400/10 px-3 py-2 text-[13px] leading-relaxed text-slate-200"
            >
              {msg.text}
            </div>
          )
        )}
        {target !== null && (
          <div className="flex items-start gap-2" aria-hidden="true">
            <Avatar size="sm" />
            <div className="max-w-[85%] rounded-lg rounded-tl-sm border border-slate-700 bg-slate-800/80 px-3 py-2 text-[13px] leading-relaxed text-slate-300">
              {typed}
              <span className="ml-0.5 inline-block animate-pulse text-cyan-400">▍</span>
            </div>
          </div>
        )}
      </div>

      {/* Preguntas sugeridas */}
      <div className="space-y-2 border-t border-slate-700 px-3 py-2.5">
        <div className="flex flex-wrap gap-1.5">
          {QUESTIONS.map((q) => (
            <button
              key={q.id}
              type="button"
              onClick={() => ask(q.id, q.label)}
              disabled={target !== null}
              className={`min-h-[44px] rounded-lg border border-slate-700 bg-slate-900/40 px-3 text-left text-xs text-slate-300 transition-colors ${
                target !== null
                  ? "cursor-not-allowed opacity-50"
                  : "hover:border-cyan-500/50 hover:text-cyan-400"
              }`}
              style={{ touchAction: "manipulation" }}
            >
              {q.label}
            </button>
          ))}
        </div>
        <p className="flex items-start gap-1.5 text-[10px] leading-snug text-slate-500">
          <svg
            viewBox="0 0 16 16"
            className="mt-px h-3 w-3 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <circle cx="8" cy="8" r="6.5" />
            <path d="M8 7.5v3.5M8 5v.5" strokeLinecap="round" />
          </svg>
          Las respuestas citan datos reales del POS — el asistente no inventa métricas.
        </p>
      </div>
    </div>
  );
}
