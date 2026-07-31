/**
 * PosDemoData — Catálogo y tipos del demo de venta rápida (POS Lite, cafetería).
 * Todos los datos son ficticios; precios de referencia en MXN.
 */

export const fmtMXN = (n: number): string =>
  new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(n)

export type Producto = {
  id: number
  nombre: string
  precio: number
  icono: string
  personalizable: boolean
}

export type OpcionMod = {
  id: string
  nombre: string
  delta: number
  /** Si la opción aparece en el detalle de la línea (los defaults neutros se omiten). */
  enDetalle: boolean
}

export type GrupoMod = {
  id: string
  nombre: string
  opciones: OpcionMod[]
}

export type LineaCarrito = {
  uid: number
  nombre: string
  detalle: string
  precioUnitario: number
  cantidad: number
}

export type TicketVenta = {
  folio: string
  fecha: string
  lineas: LineaCarrito[]
  total: number
  recibido: number
  cambio: number
  segundos: number
}

export const PRODUCTOS: Producto[] = [
  { id: 1, nombre: 'Americano', precio: 38, icono: '☕', personalizable: true },
  { id: 2, nombre: 'Capuchino', precio: 52, icono: '☕', personalizable: true },
  { id: 3, nombre: 'Latte', precio: 55, icono: '🥛', personalizable: true },
  { id: 4, nombre: 'Matcha latte', precio: 68, icono: '🍵', personalizable: true },
  { id: 5, nombre: 'Té chai', precio: 58, icono: '🫖', personalizable: true },
  { id: 6, nombre: 'Chocolate', precio: 54, icono: '🍫', personalizable: true },
  { id: 7, nombre: 'Croissant', precio: 42, icono: '🥐', personalizable: false },
  { id: 8, nombre: 'Concha', precio: 25, icono: '🐚', personalizable: false },
  { id: 9, nombre: 'Brownie', precio: 45, icono: '🧁', personalizable: false },
  { id: 10, nombre: 'Galleta de avena', precio: 28, icono: '🍪', personalizable: false },
]

export const GRUPOS: GrupoMod[] = [
  {
    id: 'tamano',
    nombre: 'Tamaño',
    opciones: [
      { id: 'ch', nombre: 'CH', delta: 0, enDetalle: true },
      { id: 'm', nombre: 'M', delta: 8, enDetalle: true },
      { id: 'g', nombre: 'G', delta: 14, enDetalle: true },
    ],
  },
  {
    id: 'leche',
    nombre: 'Tipo de leche',
    opciones: [
      { id: 'entera', nombre: 'Entera', delta: 0, enDetalle: false },
      { id: 'deslactosada', nombre: 'Deslactosada', delta: 5, enDetalle: true },
      { id: 'avena', nombre: 'Avena', delta: 12, enDetalle: true },
    ],
  },
  {
    id: 'extra',
    nombre: 'Extra',
    opciones: [
      { id: 'sin', nombre: 'Sin extra', delta: 0, enDetalle: false },
      { id: 'shot', nombre: 'Shot espresso', delta: 10, enDetalle: true },
    ],
  },
]
