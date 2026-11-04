export const PROGRESS_STORAGE_KEY = "aprende-csharp-dotnet:progress:v1";
const validStates = new Set(["pending", "reinforce", "explain"]);

function validEntries(entries, units) {
  const known = new Set(units.map((unit) => unit.id));
  return entries.filter((entry) => Array.isArray(entry) && entry.length === 2 && known.has(entry[0]) && validStates.has(entry[1]));
}

/** Recupera solo autoevaluaciones válidas; nunca lee otras claves del sitio. */
export function loadProgress(units, getStorage = () => globalThis.localStorage) {
  let raw;
  try {
    raw = getStorage().getItem(PROGRESS_STORAGE_KEY);
  } catch {
    return { states: new Map(), status: "unavailable" };
  }
  if (raw === null) return { states: new Map(), status: "ready" };
  try {
    const data = JSON.parse(raw);
    if (data?.version !== 1 || !Array.isArray(data.states)) throw new Error("Formato no compatible");
    return { states: new Map(validEntries(data.states, units)), status: "ready" };
  } catch {
    return { states: new Map(), status: "invalid" };
  }
}

/** Guarda estados validados, sin respuestas escritas ni datos de cuentas. */
export function saveProgress(states, units, getStorage = () => globalThis.localStorage) {
  try {
    const data = { version: 1, states: validEntries([...states], units) };
    getStorage().setItem(PROGRESS_STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
}

/** Resume autoevaluaciones explícitas de unidades disponibles, sin mutar estados. */
export function summarizeProgress(units, states) {
  const reinforcement = units.filter((unit) => states.get(unit.id) === "reinforce");
  const explain = units.filter((unit) => states.get(unit.id) === "explain").length;
  return {
    total: units.length,
    reviewed: reinforcement.length + explain,
    reinforce: reinforcement.length,
    explain,
    reinforcement,
  };
}

/** Puntúa opciones válidas; no califica explicaciones ni atribuye comprensión. */
export function gradeChoices(questions, choices) {
  let correct = 0;
  let answered = 0;
  for (const question of questions) {
    const raw = choices[question.id];
    if (!(typeof raw === "number" || (typeof raw === "string" && /^\d+$/.test(raw)))) continue;
    const selected = Number(raw);
    if (!Number.isInteger(selected) || selected < 0 || selected >= question.options.length) continue;
    answered += 1;
    if (selected === question.correctIndex) correct += 1;
  }
  return { correct, total: questions.length, answered };
}
