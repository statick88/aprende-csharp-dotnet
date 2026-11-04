/** Recorrido oficial completo; la disponibilidad describe solo este sitio. */
export const certificationPaths = [
  { part: 1, title: "Escribir el primer código con C#", available: true },
  { part: 2, title: "Crear y ejecutar aplicaciones de consola", available: true },
  { part: 3, title: "Agregar lógica a aplicaciones de consola", available: false },
  { part: 4, title: "Trabajar con datos variables", available: false },
  { part: 5, title: "Crear métodos en C#", available: false },
  { part: 6, title: "Depurar aplicaciones de consola", available: false },
].map((path) => ({
  ...path,
  sourceUrl: `https://learn.microsoft.com/en-us/training/paths/get-started-c-sharp-part-${path.part}/`,
}));

/** Normaliza texto para una búsqueda que no distingue tildes ni mayúsculas. */
export function normalizeSearch(value) {
  return String(value ?? "")
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("es-EC");
}

/** Devuelve pares módulo/lección cuyo título coincide con la consulta. */
export function filterUnits(modules, query) {
  const term = normalizeSearch(query);
  const matches = [];

  for (const module of Array.isArray(modules) ? modules : []) {
    for (const unit of Array.isArray(module.units) ? module.units : []) {
      if (!term || normalizeSearch(unit.title).includes(term)) {
        matches.push({ module, unit });
      }
    }
  }

  return matches;
}

/** Obtiene de forma segura un id de lección desde #/leccion/<id-codificado>. */
export function parseLessonHash(hash) {
  const prefix = "#/leccion/";
  if (typeof hash !== "string" || !hash.startsWith(prefix)) return null;

  const encodedId = hash.slice(prefix.length);
  if (!encodedId) return null;

  try {
    const id = decodeURIComponent(encodedId);
    return id && !id.includes("#") ? id : null;
  } catch {
    return null;
  }
}
