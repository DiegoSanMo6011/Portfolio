/**
 * Motor de cálculo PERT + CPM del demo de la PMO.
 *
 * Funciones puras, sin estado ni dependencias: reciben actividades con
 * estimación de 3 puntos y devuelven el cronograma completo (forward pass,
 * backward pass, holgura y ruta crítica).
 */

/** Estimación PERT de 3 puntos: optimista, más probable y pesimista (días). */
export type PertEstimate = {
  a: number;
  m: number;
  b: number;
};

/** Actividad del proyecto con sus dependencias (predecesoras). */
export type PmoActivity = {
  id: string;
  nombre: string;
  nombreCorto: string;
  deps: string[];
  est: PertEstimate;
};

/** Actividad ya calendarizada por el motor CPM. */
export type ScheduledActivity = PmoActivity & {
  /** Duración esperada te = (a + 4m + b) / 6, redondeada a 1 decimal. */
  te: number;
  /** Inicio más temprano (Early Start). */
  es: number;
  /** Fin más temprano (Early Finish). */
  ef: number;
  /** Inicio más tardío (Late Start). */
  ls: number;
  /** Fin más tardío (Late Finish). */
  lf: number;
  /** Holgura total (LS − ES). */
  slack: number;
  /** true si la actividad está en la ruta crítica (holgura ≈ 0). */
  critical: boolean;
};

/** Resultado completo del análisis CPM. */
export type CpmResult = {
  activities: ScheduledActivity[];
  /** Duración total del proyecto en días. */
  duration: number;
  /** Ids de las actividades críticas, en orden topológico. */
  criticalPath: string[];
};

/** Tolerancia numérica para considerar la holgura como cero. */
const SLACK_EPSILON = 0.05;

/** Redondea a 1 decimal (evita ruido de punto flotante en sumas). */
export function round1(value: number): number {
  return Math.round(value * 10) / 10;
}

/** Duración esperada PERT: te = (a + 4m + b) / 6, a 1 decimal. */
export function computeTe(est: PertEstimate): number {
  return round1((est.a + 4 * est.m + est.b) / 6);
}

/** Obtiene un valor de un mapa o lanza error (ayuda al modo estricto). */
function mustGet<K, V>(map: Map<K, V>, key: K): V {
  const value = map.get(key);
  if (value === undefined) {
    throw new Error(`CPM: id de actividad desconocido: ${String(key)}`);
  }
  return value;
}

/** Orden topológico por algoritmo de Kahn. Lanza error si hay ciclos. */
function topoSort(activities: PmoActivity[]): string[] {
  const indegree = new Map<string, number>();
  const successors = new Map<string, string[]>();
  for (const act of activities) {
    indegree.set(act.id, act.deps.length);
    if (!successors.has(act.id)) successors.set(act.id, []);
    for (const dep of act.deps) {
      const list = successors.get(dep) ?? [];
      list.push(act.id);
      successors.set(dep, list);
    }
  }
  const queue = activities.filter((act) => act.deps.length === 0).map((act) => act.id);
  const order: string[] = [];
  while (queue.length > 0) {
    const id = queue.shift();
    if (id === undefined) break;
    order.push(id);
    for (const next of successors.get(id) ?? []) {
      const remaining = mustGet(indegree, next) - 1;
      indegree.set(next, remaining);
      if (remaining === 0) queue.push(next);
    }
  }
  if (order.length !== activities.length) {
    throw new Error("CPM: la red de actividades contiene un ciclo");
  }
  return order;
}

/**
 * Ejecuta el análisis CPM completo sobre la red de actividades.
 *
 * Forward pass: ES = máx(EF de predecesoras), EF = ES + te.
 * Backward pass: LF = mín(LS de sucesoras) o duración total, LS = LF − te.
 * Holgura = LS − ES; ruta crítica = actividades con holgura ≈ 0.
 */
export function computeCpm(activities: PmoActivity[]): CpmResult {
  const byId = new Map(activities.map((act) => [act.id, act]));
  const order = topoSort(activities);

  const te = new Map<string, number>();
  const es = new Map<string, number>();
  const ef = new Map<string, number>();
  for (const id of order) {
    const act = mustGet(byId, id);
    const dur = computeTe(act.est);
    const start = round1(Math.max(0, ...act.deps.map((dep) => mustGet(ef, dep))));
    te.set(id, dur);
    es.set(id, start);
    ef.set(id, round1(start + dur));
  }

  const duration = round1(Math.max(0, ...order.map((id) => mustGet(ef, id))));

  const successors = new Map<string, string[]>();
  for (const act of activities) {
    for (const dep of act.deps) {
      const list = successors.get(dep) ?? [];
      list.push(act.id);
      successors.set(dep, list);
    }
  }

  const ls = new Map<string, number>();
  const lf = new Map<string, number>();
  for (const id of [...order].reverse()) {
    const succ = successors.get(id) ?? [];
    const finish =
      succ.length === 0
        ? duration
        : round1(Math.min(...succ.map((next) => mustGet(ls, next))));
    lf.set(id, finish);
    ls.set(id, round1(finish - mustGet(te, id)));
  }

  const scheduled: ScheduledActivity[] = order.map((id) => {
    const act = mustGet(byId, id);
    const slack = round1(mustGet(ls, id) - mustGet(es, id));
    return {
      ...act,
      te: mustGet(te, id),
      es: mustGet(es, id),
      ef: mustGet(ef, id),
      ls: mustGet(ls, id),
      lf: mustGet(lf, id),
      slack,
      critical: slack <= SLACK_EPSILON,
    };
  });

  return {
    activities: scheduled,
    duration,
    criticalPath: scheduled.filter((act) => act.critical).map((act) => act.id),
  };
}
