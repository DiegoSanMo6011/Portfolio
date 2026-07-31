/**
 * PosDemo — Simulador de venta rápida del POS Lite de Autónoma (cafetería).
 * Reproduce el flujo real "cobrar en menos de 15 segundos": tap al producto,
 * personalización (tamaño, leche, extra), cobro con numpad táctil y ticket
 * que se imprime con folio. Todo ocurre en memoria: datos y ventas ficticios.
 */
import { useEffect, useRef, useState, type ReactElement } from 'react'
import { fmtMXN, PRODUCTOS } from './PosDemoData'
import type { LineaCarrito, Producto, TicketVenta } from './PosDemoData'
import { PosDemoCarrito } from './PosDemoCarrito'
import { PosDemoCobro, PosDemoModificadores } from './PosDemoPaneles'
import { PosDemoTicket } from './PosDemoTicket'

const FOLIO_INICIAL = 137

type Panel =
  | { tipo: 'ninguno' }
  | { tipo: 'modificadores'; producto: Producto }
  | { tipo: 'cobro' }
  | { tipo: 'ticket'; ticket: TicketVenta }

export function PosDemo(): ReactElement {
  const [lineas, setLineas] = useState<LineaCarrito[]>([])
  const [panel, setPanel] = useState<Panel>({ tipo: 'ninguno' })
  const [ventas, setVentas] = useState(0)
  const [acumulado, setAcumulado] = useState(0)
  const [segundos, setSegundos] = useState(0)
  const [impreso, setImpreso] = useState(false)

  const inicioRef = useRef<number | null>(null)
  const intervaloRef = useRef<number | null>(null)
  const uidRef = useRef(0)

  const apagarCrono = (): void => {
    if (intervaloRef.current !== null) {
      window.clearInterval(intervaloRef.current)
      intervaloRef.current = null
    }
    inicioRef.current = null
    setSegundos(0)
  }

  useEffect(() => apagarCrono, [])

  // Si la orden queda vacía sin cobrarse, el cronómetro vuelve a cero.
  useEffect(() => {
    if (lineas.length === 0 && panel.tipo === 'ninguno') apagarCrono()
  }, [lineas, panel])

  const total = lineas.reduce((suma, l) => suma + l.precioUnitario * l.cantidad, 0)
  const piezas = lineas.reduce((suma, l) => suma + l.cantidad, 0)

  /** El cronómetro arranca con el primer producto de la orden. */
  const iniciarCrono = (): void => {
    if (inicioRef.current !== null) return
    const inicio = Date.now()
    inicioRef.current = inicio
    intervaloRef.current = window.setInterval(() => {
      setSegundos((Date.now() - inicio) / 1000)
    }, 100)
  }

  const detenerCrono = (): number => {
    const transcurrido = inicioRef.current === null ? 0 : (Date.now() - inicioRef.current) / 1000
    apagarCrono()
    return Math.round(transcurrido * 10) / 10
  }

  const agregar = (nombre: string, detalle: string, precioUnitario: number): void => {
    iniciarCrono()
    setLineas(prev => {
      const idx = prev.findIndex(
        l => l.nombre === nombre && l.detalle === detalle && l.precioUnitario === precioUnitario,
      )
      if (idx >= 0) {
        return prev.map((l, i) => (i === idx ? { ...l, cantidad: l.cantidad + 1 } : l))
      }
      uidRef.current += 1
      return [...prev, { uid: uidRef.current, nombre, detalle, precioUnitario, cantidad: 1 }]
    })
  }

  const tapProducto = (p: Producto): void => {
    if (p.personalizable) {
      setPanel({ tipo: 'modificadores', producto: p })
    } else {
      agregar(p.nombre, '', p.precio)
    }
  }

  const confirmarModificadores = (nombre: string, detalle: string, precioUnitario: number): void => {
    agregar(nombre, detalle, precioUnitario)
    setPanel({ tipo: 'ninguno' })
  }

  const cambiarCantidad = (uid: number, delta: number): void => {
    setLineas(prev =>
      prev
        .map(l => (l.uid === uid ? { ...l, cantidad: l.cantidad + delta } : l))
        .filter(l => l.cantidad > 0),
    )
  }

  const eliminar = (uid: number): void => {
    setLineas(prev => prev.filter(l => l.uid !== uid))
  }

  const confirmarCobro = (recibido: number): void => {
    const ticket: TicketVenta = {
      folio: String(FOLIO_INICIAL + ventas + 1).padStart(4, '0'),
      fecha: new Date().toLocaleString('es-MX', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      lineas,
      total,
      recibido,
      cambio: Math.round((recibido - total) * 100) / 100,
      segundos: detenerCrono(),
    }
    setVentas(v => v + 1)
    setAcumulado(a => a + total)
    setLineas([])
    setImpreso(false)
    setPanel({ tipo: 'ticket', ticket })
    // Doble rAF: el navegador pinta el ticket arriba antes de animarlo hacia abajo.
    // Con prefers-reduced-motion la transición es instantánea (motion-reduce).
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setImpreso(true))
    })
  }

  const nuevaVenta = (): void => {
    setPanel({ tipo: 'ninguno' })
    setImpreso(false)
  }

  return (
    <div
      className="relative overflow-hidden rounded-xl border border-slate-700 bg-slate-800/50 p-4 sm:p-6"
      aria-label="Demo interactivo del POS Lite con datos ficticios"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1 font-mono text-[11px] text-slate-400">
          Demo interactivo · datos ficticios
        </span>
        <div className="flex items-center gap-3 font-mono text-[11px]">
          {inicioRef.current !== null && panel.tipo !== 'ticket' && (
            <span className="text-cyan-400">⏱ {segundos.toFixed(1)} s</span>
          )}
          <span className="text-slate-500" aria-live="polite">
            {ventas === 0
              ? 'caja abierta'
              : `ventas de la sesión: ${ventas} · ${fmtMXN(acumulado)}`}
          </span>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-[1fr_236px]">
        <div
          className="grid max-h-[268px] grid-cols-2 content-start gap-2 overflow-y-auto pr-1 sm:grid-cols-3 md:max-h-[356px] xl:grid-cols-4"
          role="group"
          aria-label="Catálogo de productos"
        >
          {PRODUCTOS.map(p => (
            <button
              key={p.id}
              type="button"
              onClick={() => tapProducto(p)}
              className="flex min-h-[92px] flex-col items-center justify-center gap-0.5 rounded-lg border border-slate-700 bg-slate-800/80 p-2 text-center transition hover:border-cyan-500/50 active:scale-95 motion-reduce:transition-none motion-reduce:active:scale-100"
            >
              <span className="text-xl" aria-hidden="true">
                {p.icono}
              </span>
              <span className="text-xs font-semibold leading-tight text-slate-50">{p.nombre}</span>
              <span className="font-mono text-xs font-bold text-cyan-400">{fmtMXN(p.precio)}</span>
              {p.personalizable && <span className="text-[10px] text-slate-500">con opciones</span>}
            </button>
          ))}
        </div>

        <aside className="flex flex-col overflow-hidden rounded-lg border border-slate-700 bg-slate-900/40">
          <div className="flex items-center justify-between border-b border-slate-700 px-3 py-2">
            <span className="text-xs font-semibold text-slate-50">Orden en curso</span>
            <span className="rounded-full bg-[#134F9F] px-2 py-0.5 font-mono text-[11px] font-bold text-white">
              {piezas}
            </span>
          </div>
          <div className="max-h-[196px] min-h-[96px] flex-1 overflow-y-auto p-2 md:max-h-[236px]">
            <PosDemoCarrito lineas={lineas} onCantidad={cambiarCantidad} onEliminar={eliminar} />
          </div>
          <div className="space-y-2 border-t border-slate-700 p-3">
            <div className="flex items-center justify-between" aria-live="polite">
              <span className="text-xs text-slate-400">Total</span>
              <span className="font-mono text-xl font-bold text-slate-50">{fmtMXN(total)}</span>
            </div>
            <button
              type="button"
              disabled={lineas.length === 0}
              onClick={() => setPanel({ tipo: 'cobro' })}
              className="min-h-[48px] w-full rounded-lg bg-[#134F9F] text-sm font-bold text-white transition hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 motion-reduce:transition-none motion-reduce:active:scale-100"
            >
              Cobrar →
            </button>
            {lineas.length > 0 && (
              <button
                type="button"
                onClick={() => setLineas([])}
                className="min-h-[44px] w-full rounded-lg text-xs font-semibold text-slate-500 transition hover:bg-slate-800 hover:text-slate-300 motion-reduce:transition-none"
              >
                Vaciar orden
              </button>
            )}
          </div>
        </aside>
      </div>

      {(panel.tipo === 'modificadores' || panel.tipo === 'cobro') && (
        <div
          className="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-slate-900/80 p-3 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          {panel.tipo === 'modificadores' ? (
            <PosDemoModificadores
              producto={panel.producto}
              onConfirmar={confirmarModificadores}
              onCerrar={() => setPanel({ tipo: 'ninguno' })}
            />
          ) : (
            <PosDemoCobro
              total={total}
              onConfirmar={confirmarCobro}
              onCerrar={() => setPanel({ tipo: 'ninguno' })}
            />
          )}
        </div>
      )}

      {panel.tipo === 'ticket' && (
        <PosDemoTicket ticket={panel.ticket} impreso={impreso} onNuevaVenta={nuevaVenta} />
      )}
    </div>
  )
}
