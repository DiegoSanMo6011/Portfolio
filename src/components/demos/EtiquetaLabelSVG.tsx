/**
 * Render SVG de una etiqueta Brother DK-1204 (17 × 54 mm) en layout 2-up:
 * dos etiquetas idénticas lado a lado con línea de corte punteada al centro,
 * tal como salen de la impresora en el sistema real de OptiNoma.
 *
 * El fondo es blanco y el texto negro a propósito: la etiqueta es papel
 * (excepción legítima al tema oscuro del sitio).
 */
import { extraerBarras, type BarraCode128 } from './EtiquetaCode128';

/** Lienzo a 10 unidades por mm: 540 × 170 = etiqueta de 54 × 17 mm (proporción exacta 54:17). */
const ANCHO = 540;
const ALTO = 170;
const MITAD = ANCHO / 2;
const MARGEN = 12;
/** Quiet zone mínima de Code128: 10 módulos por lado. */
const ZONA_QUIETA = 10;

const FUENTE_SANS = 'Inter, ui-sans-serif, system-ui, sans-serif';
const FUENTE_MONO = '"JetBrains Mono", ui-monospace, SFMono-Regular, monospace';

/**
 * Trunca el nombre para que no invada el precio en la fila superior.
 * Aproximación por conteo de caracteres (suficiente para la vista previa).
 */
function truncarNombre(nombre: string, precioTexto: string): string {
  const anchoPrecio = precioTexto.length * 9;
  const anchoDisponible = MITAD - MARGEN * 2 - anchoPrecio - 8;
  const maxCaracteres = Math.max(4, Math.floor(anchoDisponible / 7.1));
  if (nombre.length <= maxCaracteres) return nombre;
  return `${nombre.slice(0, maxCaracteres - 1).trimEnd()}…`;
}

interface MediaEtiquetaProps {
  /** Borde izquierdo de esta mitad dentro del lienzo (0 o MITAD). */
  x0: number;
  nombre: string;
  precioTexto: string;
  sku: string;
  barras: readonly BarraCode128[];
  /** Longitud total del código en módulos. */
  totalModulos: number;
}

/**
 * Una mitad de la etiqueta física (~27 × 17 mm tras el corte):
 * nombre + precio arriba, barcode full-width al centro con quiet zones,
 * SKU legible abajo como respaldo para tecleo manual.
 */
function MediaEtiqueta({ x0, nombre, precioTexto, sku, barras, totalModulos }: MediaEtiquetaProps) {
  const anchoInterior = MITAD - MARGEN * 2;
  const anchoModulo = anchoInterior / (totalModulos + ZONA_QUIETA * 2);
  const inicioBarras = x0 + MARGEN + ZONA_QUIETA * anchoModulo;

  return (
    <g>
      <text
        x={x0 + MARGEN}
        y={25}
        fontSize={14}
        fontWeight={700}
        fill="#000"
        fontFamily={FUENTE_SANS}
      >
        {truncarNombre(nombre, precioTexto)}
      </text>
      <text
        x={x0 + MITAD - MARGEN}
        y={25}
        fontSize={15}
        fontWeight={700}
        fill="#000"
        textAnchor="end"
        fontFamily={FUENTE_MONO}
      >
        {precioTexto}
      </text>
      <g shapeRendering="crispEdges">
        {barras.map((barra) => (
          <rect
            key={barra.x}
            x={inicioBarras + barra.x * anchoModulo}
            y={34}
            width={barra.w * anchoModulo}
            height={98}
            fill="#000"
          />
        ))}
      </g>
      <text
        x={x0 + MITAD / 2}
        y={157}
        fontSize={13}
        fill="#000"
        textAnchor="middle"
        letterSpacing={1}
        fontFamily={FUENTE_MONO}
      >
        {sku}
      </text>
    </g>
  );
}

export interface EtiquetaLabelSVGProps {
  nombre: string;
  precioTexto: string;
  sku: string;
  /** Patrón de bits Code128 ya codificado (ver `encodeCode128`). */
  bits: string;
  className?: string;
}

/** Etiqueta DK-1204 completa en 2-up, con línea de corte punteada al centro. */
export function EtiquetaLabelSVG({ nombre, precioTexto, sku, bits, className }: EtiquetaLabelSVGProps) {
  const barras = extraerBarras(bits);
  const mitades = [0, MITAD];

  return (
    <svg
      viewBox={`0 0 ${ANCHO} ${ALTO}`}
      className={className}
      role="img"
      aria-label={`Etiqueta ${sku}: ${nombre}, ${precioTexto}. Código de barras Code128 en layout 2-up.`}
    >
      <rect width={ANCHO} height={ALTO} fill="#FFFFFF" />
      {mitades.map((x0) => (
        <MediaEtiqueta
          key={x0}
          x0={x0}
          nombre={nombre}
          precioTexto={precioTexto}
          sku={sku}
          barras={barras}
          totalModulos={bits.length}
        />
      ))}
      <line
        x1={MITAD}
        y1={8}
        x2={MITAD}
        y2={ALTO - 8}
        stroke="#334155"
        strokeWidth={1.5}
        strokeDasharray="7 6"
      />
    </svg>
  );
}
