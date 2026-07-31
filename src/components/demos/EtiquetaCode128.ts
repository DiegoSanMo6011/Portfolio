/**
 * Codificador Code128 puro (sin dependencias) para el demo de etiquetas.
 *
 * Implementa los Code Sets B (texto ASCII imprimible) y C (numérico en pares),
 * con carácter de inicio, checksum módulo 103 y patrón de stop, según
 * ISO/IEC 15417. Es el mismo esquema que usa el sistema real de OptiNoma para
 * imprimir etiquetas Brother DK-1204 legibles con pistola láser en caja.
 */

/**
 * Tabla estándar de patrones Code128 (ISO/IEC 15417): 107 patrones de
 * 11 módulos cada uno, indexados por valor 0–106. Cada string codifica
 * módulos negros (1) y blancos (0); todo símbolo tiene 3 barras y 3 espacios.
 * El stop (106) se completa con 2 módulos extra de barra (STOP_BAR).
 */
export const CODE128_PATTERNS: readonly string[] = [
  '11011001100', '11001101100', '11001100110', '10010011000', '10010001100',
  '10001001100', '10011001000', '10011000100', '10001100100', '11001001000',
  '11001000100', '11000100100', '10110011100', '10011011100', '10011001110',
  '10111001100', '10011101100', '10011100110', '11001110010', '11001011100',
  '11001001110', '11011100100', '11001110100', '11101101110', '11101001100',
  '11100101100', '11100100110', '11101100100', '11100110100', '11100110010',
  '11011011000', '11011000110', '11000110110', '10100011000', '10001011000',
  '10001000110', '10110001000', '10001101000', '10001100010', '11010001000',
  '11000101000', '11000100010', '10110111000', '10110001110', '10001101110',
  '10111011000', '10111000110', '10001110110', '11101110110', '11010001110',
  '11000101110', '11011101000', '11011100010', '11011101110', '11101011000',
  '11101000110', '11100010110', '11101101000', '11101100010', '11100011010',
  '11101111010', '11001000010', '11110001010', '10100110000', '10100001100',
  '10010110000', '10010000110', '10000101100', '10000100110', '10110010000',
  '10110000100', '10011010000', '10011000010', '10000110100', '10000110010',
  '11000010010', '11001010000', '11110111010', '11000010100', '10001111010',
  '10100111100', '10010111100', '10010011110', '10111100100', '10011110100',
  '10011110010', '11110100100', '11110010100', '11110010010', '11011011110',
  '11011110110', '11110110110', '10101111000', '10100011110', '10001011110',
  '10111101000', '10111100010', '11110101000', '11110100010', '10111011110',
  '10111101110', '11101011110', '11110101110',
  '11010000100', // 103: Start A
  '11010010000', // 104: Start B
  '11010011100', // 105: Start C
  '11000111010', // 106: Stop
];

const STOP_BAR = '11'; // 2 módulos extra que completan el patrón de stop
const START_B = 104;
const START_C = 105;
const STOP = 106;

/** Convierte un carácter ASCII imprimible (32–126) a su valor Code Set B. */
function valorCodeB(caracter: string): number {
  const codigo = caracter.charCodeAt(0);
  if (codigo < 32 || codigo > 126) {
    throw new Error(`Carácter fuera de Code128 Set B: "${caracter}"`);
  }
  return codigo - 32;
}

/** Convierte un texto numérico de longitud par a valores Code Set C (pares 00–99). */
function valoresCodeC(texto: string): number[] {
  const valores: number[] = [];
  for (let i = 0; i < texto.length; i += 2) {
    valores.push(Number.parseInt(texto.slice(i, i + 2), 10));
  }
  return valores;
}

/**
 * Checksum módulo 103 (ISO/IEC 15417): el carácter de inicio pesa 1 y cada
 * dato pesa su posición (1, 2, 3, …). El resultado se inserta antes del stop.
 *
 * Ejemplo verificado a mano — "OPT-0001" en Code Set B:
 *   valores = [104 (Start B), 47 (O), 48 (P), 52 (T), 13 (-), 16 (0), 16 (0), 16 (0), 17 (1)]
 *   suma    = 104 + 47·1 + 48·2 + 52·3 + 13·4 + 16·5 + 16·6 + 16·7 + 17·8 = 879
 *   checksum = 879 mod 103 = 55  →  patrón CODE128_PATTERNS[55] = "11101000110"
 */
function checksumMod103(valores: readonly number[]): number {
  let suma = valores[0] ?? 0;
  for (let i = 1; i < valores.length; i += 1) {
    suma += (valores[i] ?? 0) * i;
  }
  return suma % 103;
}

/**
 * Codifica el texto como patrón de bits Code128 completo:
 * inicio + datos + checksum + stop + barra final.
 *
 * Elige Code Set C cuando el texto es puramente numérico de longitud par
 * (codificación más densa: 2 dígitos por símbolo); en cualquier otro caso
 * usa Code Set B. Devuelve un string de '0'/'1', un carácter por módulo.
 */
export function encodeCode128(texto: string): string {
  if (texto.length === 0) {
    throw new Error('Texto vacío: no hay nada que codificar');
  }
  const usarSetC = texto.length >= 4 && texto.length % 2 === 0 && /^\d+$/.test(texto);
  const simbolos = usarSetC
    ? [START_C, ...valoresCodeC(texto)]
    : [START_B, ...[...texto].map(valorCodeB)];
  const completos = [...simbolos, checksumMod103(simbolos), STOP];

  let bits = '';
  for (const valor of completos) {
    const patron = CODE128_PATTERNS[valor];
    if (patron === undefined) {
      throw new Error(`Valor Code128 fuera de tabla: ${valor}`);
    }
    bits += patron;
  }
  return bits + STOP_BAR;
}

/** Barra negra del código, expresada en módulos (unidades de la X-dimension). */
export interface BarraCode128 {
  /** Posición inicial de la barra, en módulos desde el inicio del código. */
  x: number;
  /** Ancho de la barra en módulos (1–4). */
  w: number;
}

/**
 * Agrupa los módulos negros contiguos del patrón de bits en barras
 * rectangulares, listas para renderizarse como `<rect>` de SVG.
 */
export function extraerBarras(bits: string): BarraCode128[] {
  const barras: BarraCode128[] = [];
  let i = 0;
  while (i < bits.length) {
    if (bits[i] === '1') {
      let ancho = 1;
      while (i + ancho < bits.length && bits[i + ancho] === '1') ancho += 1;
      barras.push({ x: i, w: ancho });
      i += ancho;
    } else {
      i += 1;
    }
  }
  return barras;
}
