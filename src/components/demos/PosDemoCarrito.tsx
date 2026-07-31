/**
 * PosDemoCarrito — Lista editable de líneas de la orden (demo POS Lite).
 * Subcomponente del demo interactivo; datos ficticios en memoria.
 */
import { fmtMXN } from './PosDemoData'
import type { LineaCarrito } from './PosDemoData'

type Props = {
  lineas: LineaCarrito[]
  onCantidad: (uid: number, delta: number) => void
  onEliminar: (uid: number) => void
}

export function PosDemoCarrito({ lineas, onCantidad, onEliminar }: Props) {
  if (lineas.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2 p-6 text-center">
        <span className="text-2xl" aria-hidden="true">
          🧾
        </span>
        <p className="text-xs text-slate-400">Toca un producto para agregarlo a la orden</p>
      </div>
    )
  }

  return (
    <ul className="space-y-2">
      {lineas.map(linea => (
        <li key={linea.uid} className="rounded-lg border border-slate-700 bg-slate-800/80 p-2.5">
          <div className="flex items-start justify-between gap-1">
            <div className="min-w-0 pt-1">
              <p className="truncate text-xs font-semibold text-slate-50">{linea.nombre}</p>
              {linea.detalle !== '' && (
                <p className="truncate text-[11px] text-slate-400">{linea.detalle}</p>
              )}
            </div>
            <button
              type="button"
              onClick={() => onEliminar(linea.uid)}
              aria-label={`Quitar ${linea.nombre} de la orden`}
              className="-mr-1.5 -mt-1.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-sm text-slate-500 transition hover:bg-slate-700 hover:text-slate-50 motion-reduce:transition-none"
            >
              ✕
            </button>
          </div>
          <div className="mt-1 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => onCantidad(linea.uid, -1)}
                aria-label={`Quitar una unidad de ${linea.nombre}`}
                className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-700 text-base font-bold text-slate-50 transition active:scale-95 motion-reduce:transition-none motion-reduce:active:scale-100"
              >
                −
              </button>
              <span className="w-7 text-center font-mono text-sm font-bold text-slate-50">
                {linea.cantidad}
              </span>
              <button
                type="button"
                onClick={() => onCantidad(linea.uid, 1)}
                aria-label={`Agregar una unidad de ${linea.nombre}`}
                className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#134F9F] text-base font-bold text-white transition active:scale-95 motion-reduce:transition-none motion-reduce:active:scale-100"
              >
                +
              </button>
            </div>
            <span className="font-mono text-sm font-bold text-cyan-400">
              {fmtMXN(linea.precioUnitario * linea.cantidad)}
            </span>
          </div>
        </li>
      ))}
    </ul>
  )
}
