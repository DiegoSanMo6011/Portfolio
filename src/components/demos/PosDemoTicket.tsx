/**
 * PosDemoTicket — Overlay del ticket "impreso" tras confirmar la venta (demo POS Lite).
 * El papel entra deslizándose desde la ranura superior; con prefers-reduced-motion
 * aparece sin animación. Muestra folio, fecha, líneas, total y cronómetro de la venta.
 */
import type { ReactElement } from 'react'
import { fmtMXN } from './PosDemoData'
import type { TicketVenta } from './PosDemoData'

const SEPARADOR = 'my-2 border-t border-dashed border-slate-300'

type Props = {
  ticket: TicketVenta
  /** true cuando el papel ya debe estar en reposo (dispara la transición). */
  impreso: boolean
  onNuevaVenta: () => void
}

export function PosDemoTicket({ ticket, impreso, onNuevaVenta }: Props): ReactElement {
  return (
    <div
      className="absolute inset-0 z-10 flex flex-col items-center gap-3 rounded-xl bg-slate-900/95 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Ticket de venta, folio ${ticket.folio}`}
    >
      <div className="h-3 w-full max-w-[300px] shrink-0 rounded-full bg-slate-700" aria-hidden="true" />
      <div className="min-h-0 w-full max-w-[272px] flex-1 overflow-hidden">
        <div
          className={`max-h-full overflow-y-auto rounded-b-lg bg-slate-50 p-4 font-mono text-[11px] leading-relaxed text-slate-800 shadow-2xl transition-transform duration-700 ease-out motion-reduce:transition-none ${
            impreso ? 'translate-y-0' : '-translate-y-[110%]'
          }`}
        >
          <p className="text-center text-xs font-bold tracking-widest">CAFETERÍA DEMO</p>
          <p className="text-center text-[10px] text-slate-500">AutoNoma POS Lite · Querétaro</p>
          <div className={SEPARADOR} />
          <div className="flex justify-between">
            <span>Folio</span>
            <span className="font-bold">#{ticket.folio}</span>
          </div>
          <div className="flex justify-between">
            <span>Fecha</span>
            <span>{ticket.fecha}</span>
          </div>
          <div className={SEPARADOR} />
          {ticket.lineas.map(l => (
            <div key={l.uid} className="mb-1">
              <div className="flex justify-between gap-2">
                <span>
                  {l.cantidad}× {l.nombre}
                </span>
                <span>{fmtMXN(l.precioUnitario * l.cantidad)}</span>
              </div>
              {l.detalle !== '' && <p className="pl-3 text-[10px] text-slate-500">{l.detalle}</p>}
            </div>
          ))}
          <div className={SEPARADOR} />
          <div className="flex justify-between text-sm font-bold">
            <span>TOTAL</span>
            <span>{fmtMXN(ticket.total)}</span>
          </div>
          <div className="flex justify-between">
            <span>Efectivo</span>
            <span>{fmtMXN(ticket.recibido)}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Cambio</span>
            <span>{fmtMXN(ticket.cambio)}</span>
          </div>
          <div className={SEPARADOR} />
          <p className="text-center text-[10px] text-slate-500">¡Gracias por su compra!</p>
          <p className="text-center text-[10px] text-slate-400">· · · demo · datos ficticios · · ·</p>
        </div>
      </div>
      <span
        className={`shrink-0 rounded-full border px-3 py-1 font-mono text-[11px] ${
          ticket.segundos < 15
            ? 'border-green-500/30 bg-green-500/10 text-green-500'
            : 'border-slate-600 bg-slate-800 text-slate-300'
        }`}
      >
        ⏱ cobrada en {ticket.segundos.toFixed(1)} s
        {ticket.segundos < 15 ? ' · objetivo < 15 s ✓' : ''}
      </span>
      <button
        type="button"
        onClick={onNuevaVenta}
        className="min-h-[48px] w-full max-w-[272px] shrink-0 rounded-lg bg-[#134F9F] text-sm font-bold text-white transition hover:brightness-110 active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100"
      >
        Nueva venta →
      </button>
    </div>
  )
}
