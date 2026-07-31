/**
 * Demo interactivo del sistema de etiquetas de OptiNoma.
 *
 * Genera códigos de barras Code128 reales (ver `EtiquetaCode128.ts`) y los
 * presenta en una etiqueta Brother DK-1204 de 17 × 54 mm en layout 2-up,
 * con animación de impresión. Todo ocurre en memoria: sin red, sin datos reales.
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import { encodeCode128 } from './EtiquetaCode128';
import { EtiquetaLabelSVG } from './EtiquetaLabelSVG';

type FaseImpresion = 'reposo' | 'preparando' | 'imprimiendo';

/** Formatea el precio capturado como moneda MXN para la etiqueta. */
function formatearPrecio(entrada: string): string {
  const valor = Number.parseFloat(entrada.replace(/[^0-9.]/g, ''));
  if (!Number.isFinite(valor) || valor < 0) return '$0.00';
  return valor.toLocaleString('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/** Incrementa el sufijo numérico del SKU conservando los ceros (OPT-0001 → OPT-0002). */
function siguienteSku(actual: string): string {
  const coincidencia = /^(.*?)(\d+)$/.exec(actual);
  const prefijo = coincidencia?.[1] ?? '';
  const digitos = coincidencia?.[2] ?? '';
  if (digitos === '') return actual;
  const siguiente = String(Number.parseInt(digitos, 10) + 1).padStart(digitos.length, '0');
  return `${prefijo}${siguiente}`;
}

/** Transformaciones de la etiqueta según la fase de impresión. */
const CLASES_MOVIMIENTO: Record<FaseImpresion, string> = {
  reposo: 'translate-y-0 opacity-100',
  preparando: '-translate-y-[103%] opacity-0 transition-none',
  imprimiendo:
    'translate-y-0 opacity-100 motion-safe:transition-all motion-safe:duration-700 motion-safe:ease-out motion-reduce:transition-none',
};

const CLASE_INPUT =
  'h-11 w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 text-sm text-slate-100 ' +
  'placeholder:text-slate-500 focus:border-cyan-500/60 focus:outline-none focus:ring-1 focus:ring-cyan-500/40';

/** Demo del sistema de etiquetas: formulario, vista previa 2-up e impresión animada. */
export function EtiquetaDemo() {
  const [nombre, setNombre] = useState('Armazón acetato negro');
  const [precio, setPrecio] = useState('1250');
  const [sku, setSku] = useState('OPT-0001');
  const [fase, setFase] = useState<FaseImpresion>('reposo');
  const [impresas, setImpresas] = useState(0);
  const temporizador = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (temporizador.current !== null) window.clearTimeout(temporizador.current);
    };
  }, []);

  const skuCodigo = sku.trim() === '' ? 'OPT-0000' : sku.trim();
  const bits = useMemo(() => encodeCode128(skuCodigo), [skuCodigo]);
  const precioTexto = formatearPrecio(precio);

  const imprimir = () => {
    if (fase !== 'reposo') return;
    setFase('preparando');
    // Doble rAF: garantiza que el navegador pinte la posición inicial antes de animar.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setFase('imprimiendo'));
    });
    temporizador.current = window.setTimeout(() => {
      setFase('reposo');
      setImpresas((n) => n + 1);
      setSku((actual) => siguienteSku(actual));
    }, 850);
  };

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1 font-mono text-[11px] text-slate-400">
          Demo interactivo · datos ficticios
        </span>
        <span className="font-mono text-[11px] text-slate-500" aria-live="polite">
          {impresas === 0 ? 'DK-1204 · 17 × 54 mm' : `etiquetas impresas: ${impresas}`}
        </span>
      </div>

      <div className="mt-5 grid gap-6 md:grid-cols-2 md:items-start">
        {/* Columna de captura */}
        <div className="flex flex-col gap-4">
          <div>
            <label htmlFor="etiqueta-nombre" className="mb-1.5 block text-xs font-medium text-slate-400">
              Nombre del producto
            </label>
            <input
              id="etiqueta-nombre"
              type="text"
              value={nombre}
              maxLength={26}
              onChange={(e) => setNombre(e.target.value)}
              className={CLASE_INPUT}
              placeholder="Ej. Armazón acetato negro"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="etiqueta-precio" className="mb-1.5 block text-xs font-medium text-slate-400">
                Precio (MXN)
              </label>
              <div className="relative">
                <span aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">
                  $
                </span>
                <input
                  id="etiqueta-precio"
                  type="text"
                  inputMode="decimal"
                  value={precio}
                  maxLength={9}
                  onChange={(e) => setPrecio(e.target.value.replace(/[^0-9.]/g, ''))}
                  className={`${CLASE_INPUT} pl-7`}
                  placeholder="0.00"
                />
              </div>
            </div>
            <div>
              <label htmlFor="etiqueta-sku" className="mb-1.5 block text-xs font-medium text-slate-400">
                SKU <span className="font-normal text-slate-500">(autogenerado, editable)</span>
              </label>
              <input
                id="etiqueta-sku"
                type="text"
                value={sku}
                maxLength={12}
                onChange={(e) => setSku(e.target.value.toUpperCase().replace(/[^A-Z0-9-]/g, ''))}
                className={`${CLASE_INPUT} font-mono`}
                placeholder="OPT-0001"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={imprimir}
            disabled={fase !== 'reposo'}
            className="h-12 w-full rounded-lg bg-gradient-to-r from-cyan-400 to-blue-600 font-semibold text-white
              transition-opacity hover:opacity-90 disabled:cursor-default disabled:opacity-60"
          >
            {fase === 'reposo' ? 'Imprimir etiqueta' : 'Imprimiendo…'}
          </button>

          <p className="border-l-2 border-cyan-500/50 pl-3 text-sm leading-relaxed text-slate-400">
            Así se etiqueta cada pieza física del inventario de la óptica — el mismo código se
            escanea al vender.
          </p>
        </div>

        {/* Columna de impresora + etiqueta */}
        <div>
          <div className="rounded-xl border border-slate-600 bg-gradient-to-b from-slate-600 to-slate-800 px-4 pb-4 pt-3 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] tracking-widest text-slate-300">
                BROTHER · DK-1204
              </span>
              <span className="flex items-center gap-1.5">
                <span
                  aria-hidden="true"
                  className={`h-1.5 w-1.5 rounded-full bg-green-500 ${
                    fase !== 'reposo' ? 'motion-safe:animate-pulse' : ''
                  }`}
                />
                <span className="font-mono text-[10px] text-slate-400">
                  {fase === 'reposo' ? 'lista' : 'imprimiendo'}
                </span>
              </span>
            </div>
            {/* Ranura de salida */}
            <div aria-hidden="true" className="mt-3 h-2.5 rounded-full bg-slate-950 shadow-inner" />
          </div>

          {/* Zona de salida: la etiqueta emerge de la ranura */}
          <div className="overflow-hidden px-3 pb-4 pt-2 sm:px-4">
            <div className={`rounded-md bg-white shadow-xl shadow-black/40 ${CLASES_MOVIMIENTO[fase]}`}>
              <EtiquetaLabelSVG
                nombre={nombre.trim() === '' ? 'Producto sin nombre' : nombre}
                precioTexto={precioTexto}
                sku={skuCodigo}
                bits={bits}
                className="block h-auto w-full"
              />
            </div>
          </div>

          <p className="text-center font-mono text-[10px] leading-relaxed text-slate-500">
            Code128 · checksum mod 103 · layout 2-up · 17 × 54 mm
            <br />
            la línea punteada marca el corte
          </p>
        </div>
      </div>
    </div>
  );
}
