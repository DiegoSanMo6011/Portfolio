/**
 * PosDemoPaneles — Panel de modificadores y panel de cobro con numpad táctil.
 * Subcomponentes del demo de venta rápida (POS Lite); datos ficticios.
 */
import { useState } from 'react'
import { fmtMXN, GRUPOS } from './PosDemoData'
import type { OpcionMod, Producto } from './PosDemoData'

const BTN_CONFIRMAR =
  'min-h-[48px] w-full rounded-lg bg-[#134F9F] text-sm font-bold text-white transition hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 motion-reduce:transition-none motion-reduce:active:scale-100'

type ModificadoresProps = {
  producto: Producto
  onConfirmar: (nombre: string, detalle: string, precioUnitario: number) => void
  onCerrar: () => void
}

/** Panel de personalización: tamaño CH/M/G, tipo de leche y extra shot. */
export function PosDemoModificadores({ producto, onConfirmar, onCerrar }: ModificadoresProps) {
  const [seleccion, setSeleccion] = useState<Record<string, string>>(() => {
    const inicial: Record<string, string> = {}
    for (const grupo of GRUPOS) inicial[grupo.id] = grupo.opciones[0]?.id ?? ''
    return inicial
  })

  const elegidas = GRUPOS.map(g => g.opciones.find(o => o.id === seleccion[g.id])).filter(
    (o): o is OpcionMod => o !== undefined,
  )
  const precioFinal = producto.precio + elegidas.reduce((suma, o) => suma + o.delta, 0)
  const detalle = elegidas
    .filter(o => o.enDetalle)
    .map(o => o.nombre)
    .join(' · ')

  return (
    <div className="flex max-h-full w-full max-w-sm flex-col overflow-hidden rounded-xl border border-slate-700 bg-slate-800 shadow-2xl">
      <div className="flex items-start justify-between border-b border-slate-700 p-4 pb-3">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-cyan-400">
            Personalizar
          </p>
          <h3 className="mt-0.5 truncate text-lg font-bold text-slate-50">
            <span aria-hidden="true">{producto.icono} </span>
            {producto.nombre}
          </h3>
          <p className="font-mono text-xs text-slate-400">Base {fmtMXN(producto.precio)}</p>
        </div>
        <button
          type="button"
          onClick={onCerrar}
          aria-label="Cerrar personalización"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-700 hover:text-slate-50 motion-reduce:transition-none"
        >
          ✕
        </button>
      </div>

      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4">
        {GRUPOS.map(grupo => (
          <fieldset key={grupo.id}>
            <legend className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
              {grupo.nombre}
            </legend>
            <div className="flex flex-wrap gap-2">
              {grupo.opciones.map(opcion => {
                const activa = seleccion[grupo.id] === opcion.id
                return (
                  <button
                    key={opcion.id}
                    type="button"
                    aria-pressed={activa}
                    onClick={() => setSeleccion(prev => ({ ...prev, [grupo.id]: opcion.id }))}
                    className={`min-h-[44px] rounded-lg border px-3 text-sm font-semibold transition motion-reduce:transition-none ${
                      activa
                        ? 'border-cyan-400 bg-cyan-400/10 text-slate-50'
                        : 'border-slate-700 bg-slate-800/80 text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    {opcion.nombre}
                    {opcion.delta > 0 && (
                      <span
                        className={`ml-1.5 font-mono text-xs ${activa ? 'text-cyan-400' : 'text-slate-400'}`}
                      >
                        +${opcion.delta}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </fieldset>
        ))}
      </div>

      <div className="border-t border-slate-700 p-4">
        <button
          type="button"
          onClick={() => onConfirmar(producto.nombre, detalle, precioFinal)}
          className={BTN_CONFIRMAR}
        >
          Agregar a la orden · {fmtMXN(precioFinal)}
        </button>
      </div>
    </div>
  )
}

const TECLAS: readonly string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', '⌫']
const MONTOS_RAPIDOS: readonly number[] = [100, 200, 500]

type CobroProps = {
  total: number
  onConfirmar: (recibido: number) => void
  onCerrar: () => void
}

/** Panel de cobro en efectivo: numpad táctil, montos rápidos y cambio calculado. */
export function PosDemoCobro({ total, onConfirmar, onCerrar }: CobroProps) {
  const [recibido, setRecibido] = useState('')
  const recibidoNum = parseFloat(recibido === '' ? '0' : recibido)
  const suficiente = recibidoNum >= total && total > 0
  const cambio = Math.max(0, recibidoNum - total)
  const falta = Math.max(0, total - recibidoNum)

  const teclear = (tecla: string) => {
    if (tecla === '⌫') {
      setRecibido(v => v.slice(0, -1))
      return
    }
    setRecibido(v => {
      if (tecla === '.' && v.includes('.')) return v
      if (tecla === '.' && v === '') return '0.'
      const punto = v.indexOf('.')
      if (punto >= 0 && tecla !== '.' && v.length - punto > 2) return v
      if (punto < 0 && tecla !== '.' && v.length >= 5) return v
      return v + tecla
    })
  }

  return (
    <div className="flex max-h-full w-full max-w-xs flex-col overflow-y-auto rounded-xl border border-slate-700 bg-slate-800 p-4 shadow-2xl">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-cyan-400">
            Cobro en efectivo
          </p>
          <p className="mt-0.5 font-mono text-2xl font-bold text-slate-50">{fmtMXN(total)}</p>
        </div>
        <button
          type="button"
          onClick={onCerrar}
          aria-label="Cerrar cobro"
          className="-mr-1.5 -mt-1.5 flex h-11 w-11 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-700 hover:text-slate-50 motion-reduce:transition-none"
        >
          ✕
        </button>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        <button
          type="button"
          onClick={() => setRecibido(String(total))}
          className="min-h-[44px] flex-1 rounded-lg border border-slate-700 bg-slate-800/80 px-2 text-xs font-semibold text-slate-300 transition hover:border-cyan-500/50 motion-reduce:transition-none"
        >
          Exacto
        </button>
        {MONTOS_RAPIDOS.map(monto => (
          <button
            key={monto}
            type="button"
            disabled={monto < total}
            onClick={() => setRecibido(String(monto))}
            className="min-h-[44px] flex-1 rounded-lg border border-slate-700 bg-slate-800/80 px-2 font-mono text-xs font-semibold text-slate-300 transition hover:border-cyan-500/50 disabled:cursor-not-allowed disabled:opacity-30 motion-reduce:transition-none"
          >
            ${monto}
          </button>
        ))}
      </div>

      <div
        className="mt-2 flex min-h-[52px] items-center justify-between rounded-lg bg-slate-900/80 px-3"
        aria-live="polite"
      >
        <span className="text-xs text-slate-400">Recibido</span>
        <span className={`font-mono text-xl font-bold ${recibido === '' ? 'text-slate-500' : 'text-slate-50'}`}>
          ${recibido === '' ? '0' : recibido}
        </span>
      </div>

      <div className="mt-2 grid grid-cols-3 gap-1.5">
        {TECLAS.map(tecla => (
          <button
            key={tecla}
            type="button"
            onClick={() => teclear(tecla)}
            aria-label={tecla === '⌫' ? 'Borrar dígito' : `Tecla ${tecla}`}
            className="min-h-[44px] rounded-lg bg-slate-700 text-lg font-bold text-slate-50 transition hover:bg-slate-600 active:scale-95 motion-reduce:transition-none motion-reduce:active:scale-100"
          >
            {tecla}
          </button>
        ))}
      </div>

      <div className="mt-2 flex items-center justify-between px-1 text-sm" aria-live="polite">
        <span className="text-slate-400">{suficiente ? 'Cambio' : 'Falta'}</span>
        <span className={`font-mono font-bold ${suficiente ? 'text-green-500' : 'text-amber-500'}`}>
          {fmtMXN(suficiente ? cambio : falta)}
        </span>
      </div>

      <button
        type="button"
        disabled={!suficiente}
        onClick={() => onConfirmar(recibidoNum)}
        className={`mt-2 ${BTN_CONFIRMAR}`}
      >
        Confirmar venta
      </button>
    </div>
  )
}
