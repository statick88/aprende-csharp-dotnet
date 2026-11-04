import assert from "node:assert/strict";
import test from "node:test";
import { certificationPaths, filterUnits, normalizeSearch, parseLessonHash } from "./course-utils.mjs";
import { summarizeProgress, gradeChoices, loadProgress, saveProgress, PROGRESS_STORAGE_KEY } from "./study-state.mjs";

test("el recorrido distingue las seis rutas oficiales del contenido local", () => {
  assert.equal(certificationPaths.length, 6);
  assert.deepEqual(certificationPaths.filter((path) => path.available).map((path) => path.part), [1, 2]);
  assert.deepEqual(certificationPaths.map((path) => path.part), [1, 2, 3, 4, 5, 6]);
  for (const path of certificationPaths) {
    assert.equal(path.sourceUrl, `https://learn.microsoft.com/en-us/training/paths/get-started-c-sharp-part-${path.part}/`);
    assert.ok(path.title.length > 5);
  }
});

const modules = [
  {
    id: "archivos",
    title: "Leer y escribir archivos",
    units: [
      { id: "archivos/02-open-close-files-safely-with-using", title: "Abrir y cerrar con using" },
      { id: "archivos/03-read-data", title: "Leer datos de archivos" },
    ],
  },
  {
    id: "metodos",
    title: "Métodos reutilizables",
    units: [{ id: "metodos/01-introduccion", title: "Introducción" }],
  },
];

test("normalizeSearch ignora mayúsculas, tildes y espacios exteriores", () => {
  assert.equal(normalizeSearch("  MÉTODOS  "), "metodos");
  assert.equal(normalizeSearch("ÁrChÍvÖs"), "archivos");
});

test("filterUnits encuentra títulos de lecciones sin distinguir tildes o mayúsculas", () => {
  const matches = filterUnits(modules, "CERRAR");
  assert.deepEqual(matches.map(({ unit }) => unit.id), ["archivos/02-open-close-files-safely-with-using"]);
  assert.equal(filterUnits(modules, "introduccion").length, 1);
  assert.equal(filterUnits(modules, "inexistente").length, 0);
});

test("parseLessonHash admite ids codificados con barra y rechaza hashes ajenos", () => {
  assert.equal(
    parseLessonHash("#/leccion/archivos%2F02-open-close-files-safely-with-using"),
    "archivos/02-open-close-files-safely-with-using",
  );
  assert.equal(parseLessonHash("#/"), null);
  assert.equal(parseLessonHash("#/otra-ruta/archivos"), null);
  assert.equal(parseLessonHash("#/leccion/%E0%A4%A"), null);
});

const units = [{ id: "a", title: "Primera" }, { id: "b", title: "Segunda" }];

test("el progreso inicia vacío, sin atribuir comprensión ni modificar estados", () => {
  const states = new Map();
  assert.deepEqual(summarizeProgress(units, states), {
    total: 2, reviewed: 0, reinforce: 0, explain: 0, reinforcement: [],
  });
  assert.equal(states.size, 0);
});

test("la autoevaluación distingue refuerzo y comprensión y admite volver a pendiente", () => {
  const states = new Map([["a", "reinforce"], ["b", "explain"], ["ajena", "explain"]]);
  assert.deepEqual(summarizeProgress(units, states), {
    total: 2, reviewed: 2, reinforce: 1, explain: 1, reinforcement: [units[0]],
  });
  states.set("a", "explain");
  assert.equal(summarizeProgress(units, states).reinforcement.length, 0);
  states.set("b", "pending");
  assert.equal(summarizeProgress(units, states).reviewed, 1);
});

const questions = [
  { id: "q1", correctIndex: 1, options: ["a", "b", "c"] },
  { id: "q2", correctIndex: 0, options: ["a", "b", "c"] },
];

test("la revisión puntúa las decisiones, no las explicaciones ni el estado de aprendizaje", () => {
  assert.deepEqual(gradeChoices(questions, { q1: "1", q2: "0" }), { correct: 2, total: 2, answered: 2 });
  assert.deepEqual(gradeChoices(questions, { q1: "0", q2: "2" }), { correct: 0, total: 2, answered: 2 });
  assert.deepEqual(gradeChoices(questions, {}), { correct: 0, total: 2, answered: 0 });
});

test("una opción vacía, fuera de rango o no numérica no cuenta como respuesta", () => {
  assert.deepEqual(gradeChoices(questions, { q1: "", q2: null }), { correct: 0, total: 2, answered: 0 });
  assert.deepEqual(gradeChoices(questions, { q1: "99", q2: "texto" }), { correct: 0, total: 2, answered: 0 });
});


test("las autoevaluaciones se guardan y recuperan sin modificar claves ajenas", () => {
  const values = new Map([["otro-sitio", "conservar"]]);
  const storage = { getItem: (key) => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) };
  const states = new Map([["a", "reinforce"], ["b", "explain"]]);
  assert.equal(saveProgress(states, units, () => storage), true);
  assert.deepEqual(loadProgress(units, () => storage), { states, status: "ready" });
  assert.equal(values.get("otro-sitio"), "conservar");
  assert.ok(values.has(PROGRESS_STORAGE_KEY));
  states.set("a", "pending");
  assert.equal(saveProgress(states, units, () => storage), true);
  assert.equal(loadProgress(units, () => storage).states.get("a"), "pending");
});

test("solo se recuperan unidades conocidas y estados válidos", () => {
  const raw = JSON.stringify({ version: 1, states: [["a", "reinforce"], ["ajena", "explain"], ["b", "falso"], null] });
  const loaded = loadProgress(units, () => ({ getItem: () => raw }));
  assert.deepEqual([...loaded.states], [["a", "reinforce"]]);
  assert.equal(loaded.status, "ready");
  const malformed = loadProgress(units, () => ({ getItem: () => "JSON roto" }));
  assert.equal(malformed.states.size, 0);
  assert.equal(malformed.status, "invalid");
  const incompatible = loadProgress(units, () => ({ getItem: () => JSON.stringify({ version: 99, states: [] }) }));
  assert.equal(incompatible.status, "invalid");
});

test("el almacenamiento bloqueado o sin espacio no interrumpe el seguimiento", () => {
  const denied = () => { throw new Error("acceso bloqueado"); };
  assert.deepEqual(loadProgress(units, denied), { states: new Map(), status: "unavailable" });
  assert.equal(saveProgress(new Map([["a", "reinforce"]]), units, denied), false);
  const full = () => ({ setItem: () => { throw new Error("sin espacio"); } });
  assert.equal(saveProgress(new Map([["a", "reinforce"]]), units, full), false);
});
