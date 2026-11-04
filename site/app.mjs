import { certificationPaths, filterUnits, parseLessonHash } from "./course-utils.mjs";
import { makeProgressPanel, makeStateControl, makeAssessment } from "./study-ui.mjs";

const app = document.querySelector("#app");
const search = document.querySelector("#search");
let course;
const studyStates = new Map();
const assessmentDrafts = new Map();

function refreshStudyProgress() {
  const units = allUnits().map(({ unit }) => unit);
  for (const panel of document.querySelectorAll('.study-progress')) {
    panel.replaceWith(makeProgressPanel(units, studyStates, lessonHref));
  }
  for (const control of document.querySelectorAll('.unit-study')) {
    const value = studyStates.get(control.dataset.studyId) || 'pending';
    control.dataset.state = value;
    control.querySelector('select').value = value;
  }
}

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function link(text, href, className) {
  const anchor = element("a", className, text);
  anchor.href = href;
  return anchor;
}

function lessonHref(id) {
  return `#/leccion/${encodeURIComponent(id)}`;
}

function localHref(path) {
  // Los recursos generados deben ser rutas relativas del mismo sitio.
  return typeof path === "string" && !/^[a-z][a-z\d+.-]*:/i.test(path) && !path.startsWith("//")
    ? path
    : null;
}

function externalLink(text, href) {
  if (typeof href !== "string" || !/^https:\/\//i.test(href)) return null;
  const anchor = link(text, href, "text-link");
  anchor.target = "_blank";
  anchor.rel = "noreferrer";
  return anchor;
}

function clearApp() {
  app.replaceChildren();
}

function appendIf(parent, child) {
  if (child) parent.append(child);
}

function studyModules() {
  return course.modules.filter((module) => module.part === 1 || module.part === 2);
}

function allUnits() {
  return filterUnits(studyModules(), "");
}

function firstUnitId() {
  return allUnits()[0]?.unit.id;
}

function makeModule(module, units) {
  const section = element("section", "module");
  const badge = element("span", "badge", `PARTE ${module.part} · INSIGNIA`);
  const heading = element("h2", undefined, module.title);
  const list = element("ul", "lesson-list");
  section.append(badge, heading, list);

  for (const unit of units) {
    const item = element("li");
    item.append(link(`○ ${unit.title}`, lessonHref(unit.id)));
    list.append(item);
  }
  return section;
}

function renderHome() {
  clearApp();
  const units = allUnits();
  const modules = studyModules();
  const query = search.value;
  const matches = filterUnits(modules, query);

  const hero = element("section", "hero");
  hero.setAttribute("aria-labelledby", "home-title");
  hero.append(
    element("p", "eyebrow", "PREPARACIÓN PARA LA CERTIFICACIÓN"),
    element("h1", undefined),
    element("p", "hero-copy", "Prepárate para Foundational C# with Microsoft con teoría paso a paso, ejemplos comentados, práctica y preguntas de repaso."),
  );
  const title = hero.querySelector("h1");
  title.id = "home-title";
  title.append("Aprende C# y .NET", document.createElement("br"));
  title.append(element("span", undefined, "paso a paso."));
  if (firstUnitId()) hero.append(link("Empezar a repasar →", lessonHref(firstUnitId()), "cta"));
  hero.append(element("p", "totals", `${units.length} unidades · ${modules.length} módulos · Partes 1 y 2 disponibles`));

  const currentTopic = "archivos/02-open-close-files-safely-with-using";
  const secondary = link("Continuar: abrir y cerrar archivos con using", lessonHref(currentTopic), "secondary-cta");
  hero.append(secondary);
  app.append(hero);

  const catalogSection = element("section", "catalog-section");
  catalogSection.id = "catalogo";
  catalogSection.append(element("h2", "section-title", query ? "Resultados de búsqueda" : "Índice del curso"));
  if (query && !matches.length) {
    catalogSection.append(element("p", "empty-state", "No encontramos lecciones con esa búsqueda. Prueba con otra palabra."));
  } else {
    const catalog = element("div", "catalog");
    if (query) {
      const grouped = new Map();
      for (const { module, unit } of matches) {
        if (!grouped.has(module.id)) grouped.set(module.id, { module, units: [] });
        grouped.get(module.id).units.push(unit);
      }
      for (const { module, units: filtered } of grouped.values()) catalog.append(makeModule(module, filtered));
    } else {
      for (const module of modules) catalog.append(makeModule(module, module.units));
    }
    catalogSection.append(catalog);
  }
  app.append(makeProgressPanel(units.map(({ unit }) => unit), studyStates, lessonHref), makeNextSteps(), catalogSection);
}

function makeNextSteps() {
  const section = element("section", "next-steps");
  section.append(element("h2", undefined, "Tu ruta hacia la certificación"));
  section.append(element("p", undefined, "La meta es preparar las seis rutas de Foundational C# with Microsoft. Este cuaderno desarrolla las partes 1 y 2; las partes 3 a 6 todavía deben estudiarse en la ruta oficial."));
  const list = element("ol", "certification-grid");
  for (const path of certificationPaths) {
    const item = element("li", "certification-card");
    item.append(element("span", "badge", `PARTE ${path.part}`));
    item.append(element("h3", undefined, path.title));
    item.append(element("p", undefined, path.available ? "Guías y proyectos disponibles para repasar aquí." : "Pendiente de desarrollar aquí. Continúa con la fuente oficial."));
    appendIf(item, externalLink("Ver ruta oficial ↗", path.sourceUrl));
    list.append(item);
  }
  section.append(list);
  section.append(element("p", undefined, "Después de estudiar cada ruta, obtén su trofeo en Microsoft Learn y verifícalo en freeCodeCamp para acceder al examen de certificación. Este sitio no registra esos logros ni garantiza la aprobación."));
  appendIf(section, externalLink("Abrir la certificación en freeCodeCamp ↗", "https://www.freecodecamp.org/learn/foundational-c-sharp-with-microsoft/"));
  return section;
}

function findUnit(id) {
  for (const module of studyModules()) {
    const unit = module.units.find((candidate) => candidate.id === id);
    if (unit) return { module, unit };
  }
  return null;
}

function makeSidebar(activeId) {
  const aside = element("aside", "lesson-sidebar");
  aside.setAttribute("aria-label", "Navegación de lecciones");
  aside.append(element("p", "eyebrow", "RECORRIDO"));
  aside.append(makeProgressPanel(allUnits().map(({ unit }) => unit), studyStates, lessonHref));
  for (const module of studyModules()) {
    const heading = element("h2", "sidebar-module", module.title);
    const list = element("ul", "sidebar-list");
    for (const unit of module.units) {
      const item = element("li");
      const unitLink = link(unit.title, lessonHref(unit.id));
      if (unit.id === activeId) unitLink.setAttribute("aria-current", "page");
      item.append(unitLink, makeStateControl(unit, studyStates, refreshStudyProgress));
      list.append(item);
    }
    aside.append(heading, list);
  }
  return aside;
}

function resourceLinkList(unit) {
  const resources = element("ul", "resources");
  const addLocal = (label, value) => {
    const href = localHref(value);
    if (!href) return;
    const item = element("li");
    item.append(link(label, href, "text-link"));
    resources.append(item);
  };
  appendIf(resources, (() => {
    const official = externalLink("Abrir fuente oficial", unit.sourceUrl);
    if (!official) return null;
    const item = element("li");
    item.append(official);
    return item;
  })());
  for (const original of Array.isArray(unit.originals) ? unit.originals : []) addLocal("Descargar fuente original", original);
  addLocal("Descargar proyecto completo (.zip)", unit.projectUrl);
  addLocal("Leer guía local", unit.guideUrl);
  addLocal("Ver código fuente local", unit.sourceCodeUrl);
  return resources;
}

function renderLesson(record) {
  clearApp();
  const { module, unit } = record;
  const ordered = allUnits();
  const index = ordered.findIndex((entry) => entry.unit.id === unit.id);
  const layout = element("div", "lesson-layout");
  const article = element("article", "lesson");
  article.append(element("p", "eyebrow", `PARTE ${module.part} · ${module.title}`), element("h1", undefined, unit.title));

  const objective = element("section", "objective");
  objective.append(element("h2", undefined, "Objetivo"), element("p", undefined, unit.objective || "Revisar esta unidad y sus recursos de estudio."));
  article.append(objective);

  const prerequisites = element("section", "prerequisites");
  prerequisites.append(element("h2", undefined, "Antes de empezar"));
  const prereqList = element("ul");
  for (const prerequisite of Array.isArray(unit.prerequisites) ? unit.prerequisites : []) prereqList.append(element("li", undefined, prerequisite));
  if (!prereqList.children.length) prereqList.append(element("li", undefined, "Lee el objetivo y prepara tu entorno de C# antes de practicar."));
  prerequisites.append(prereqList);
  article.append(prerequisites);

  const theory = element("section", "theory");
  theory.append(element("h2", undefined, "Paso a paso"));
  for (const step of Array.isArray(unit.steps) ? unit.steps : []) {
    const block = element("section", "step");
    block.append(element("h3", undefined, step.title), element("p", undefined, step.text));
    if (step.code) {
      const pre = element("pre");
      const code = element("code");
      code.textContent = step.code;
      pre.append(code);
      block.append(pre);
    }
    if (step.expected) block.append(element("p", "expected", `Resultado esperado: ${step.expected}`));
    theory.append(block);
  }
  if (!theory.querySelector(".step")) theory.append(element("p", undefined, "El contenido detallado estará disponible al cargar la guía de esta unidad."));
  article.append(theory);

  const practice = element("section", "practice");
  practice.append(element("h2", undefined, "Práctica"), element("p", undefined, unit.practice || "Sigue la guía local y repite el ejemplo en tu proyecto independiente."));
  article.append(practice);

  const review = element("section", "review");
  review.append(element("h2", undefined, "Repaso"));
  for (const item of Array.isArray(unit.review) ? unit.review : []) {
    const details = element("details");
    details.append(element("summary", undefined, item.question), element("p", undefined, item.answer));
    review.append(details);
  }
  if (!review.querySelector("details")) review.append(element("p", undefined, "Consulta la fuente oficial para comprobar lo aprendido."));
  article.append(review);

  article.append(makeAssessment(unit, assessmentDrafts));
  const selfReview = element('section', 'self-review');
  selfReview.append(element('h2', undefined, 'Registra tu autoevaluación'));
  selfReview.append(element('p', undefined, 'Después de contrastar tus razones, decide qué necesitas reforzar. Leer o acertar opciones no marca esta unidad como comprendida.'));
  selfReview.append(makeStateControl(unit, studyStates, refreshStudyProgress));
  article.append(selfReview);

  const resources = element("section", "lesson-resources");
  resources.append(element("h2", undefined, "Recursos"), resourceLinkList(unit));
  article.append(resources);

  const navigation = element("nav", "lesson-pagination");
  navigation.setAttribute("aria-label", "Lección anterior y siguiente");
  if (index > 0) navigation.append(link("← Lección anterior", lessonHref(ordered[index - 1].unit.id), "secondary-cta"));
  if (index >= 0 && index < ordered.length - 1) navigation.append(link("Siguiente lección →", lessonHref(ordered[index + 1].unit.id), "cta"));
  article.append(navigation);
  layout.append(makeSidebar(unit.id), article);
  app.append(layout);
}

function renderNotFound() {
  clearApp();
  const section = element("section", "message-panel");
  section.append(element("h1", undefined, "No encontramos esa lección"), element("p", undefined, "Puede que la dirección esté incompleta o que el contenido aún no se haya generado."), link("Volver al índice", "#/", "cta"));
  app.append(section);
}

function renderRoute() {
  if (!course) return;
  const id = parseLessonHash(window.location.hash);
  if (id) {
    const record = findUnit(id);
    if (record) renderLesson(record);
    else renderNotFound();
  } else {
    renderHome();
  }
  if (window.location.hash === "#/catalogo") {
    document.querySelector("#catalogo")?.scrollIntoView();
  } else {
    window.scrollTo(0, 0);
  }
}

function renderLoadError() {
  clearApp();
  const section = element("section", "message-panel");
  section.setAttribute("role", "alert");
  section.append(element("h1", undefined, "No se pudo cargar el contenido"), element("p", undefined, "Revisa tu conexión o confirma que course.json esté junto a esta página. Luego intenta nuevamente."));
  const retry = element("button", "cta", "Reintentar carga");
  retry.type = "button";
  retry.addEventListener("click", loadCourse);
  section.append(retry);
  app.append(section);
}

async function loadCourse() {
  clearApp();
  app.append(element("p", "loading", "Cargando el recorrido de estudio…"));
  try {
    const response = await fetch("./course.json");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    if (data?.schemaVersion !== 1 || !Array.isArray(data.modules)) throw new Error("Formato de curso no compatible");
    course = data;
    document.title = course.title || "Aprende C# y .NET";
    renderRoute();
  } catch (error) {
    console.error("No se pudo cargar course.json", error);
    renderLoadError();
  }
}

search.addEventListener("input", () => {
  if (!course) return;
  if (parseLessonHash(window.location.hash)) {
    window.location.hash = "#/catalogo";
  } else {
    renderHome();
  }
});
window.addEventListener("hashchange", renderRoute);
loadCourse();
