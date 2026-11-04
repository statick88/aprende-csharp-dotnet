import assert from "node:assert/strict";
import test from "node:test";
import { certificationPaths, filterUnits, normalizeSearch, parseLessonHash } from "./course-utils.mjs";

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
