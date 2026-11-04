# Pruebas del sitio y prácticas de repaso

[Volver al índice](../README.md)

## Qué se comprueba ahora

El material original no tenía una suite de pruebas. El sitio nuevo incorpora pruebas de generación, búsqueda y rutas; no pretende convertir cada apunte comentado en un test ni reemplazar las evaluaciones de certificación.

| Comprobación | Comando o evidencia | Alcance |
|---|---|---|
| Generación | `python3 -m unittest discover -s tests -v` | Un proyecto y guía por unidad; solución con carpetas propias; recursos y ZIP completos; salida pública limitada |
| Interfaz, helpers | `node --test site/course-utils.test.mjs` | Búsqueda, rutas, autoevaluación reversible y puntuación sin calificación de explicaciones |
| JavaScript | `node --check site/app.mjs` | Sintaxis del programa de la interfaz |
| Proyectos de repaso | `dotnet build aprende-csharp-dotnet.slnx` | Compila las 67 unidades con ejemplos comentados intencionalmente |
| Ejemplos de las guías | Extracción aislada de los 36 bloques C# y `dotnet build` | Comprueba que sean programas completos compilables; no implica haber probado cada entrada interactiva |
| Navegador | `tests/browser-smoke.js`, ejecutado con Playwright | Catálogo, búsqueda, repaso, descargas, recarga, navegación y ancho móvil |
| GitHub Pages | Mismo smoke bajo `/aprende-csharp-dotnet/` | Detecta recursos que dependan de la raíz del dominio |

Genere primero el material:

```bash
python3 tools/build_course.py
python3 -m unittest discover -s tests -v
node --test site/course-utils.test.mjs
node --check site/app.mjs
dotnet build aprende-csharp-dotnet.slnx
```

`tests/browser-smoke.js` es una función asíncrona que recibe una página Playwright ya situada en la portada del servidor de prueba. Se ejecutó mediante la herramienta de navegador del entorno de desarrollo; no se instaló Playwright como dependencia del curso. El workflow de Pages ejecuta Python y los tests aislados de Node, no este smoke de navegador ni los ejemplos de .NET.

## Evidencia observada

- Dos tests Python y ocho tests Node: aprobados. Incluyen las seis rutas oficiales, la cobertura de 134 escenarios críticos, estados de autoevaluación y puntajes de opciones.
- Solución nueva de 67 unidades: compilación correcta, sin advertencias.
- 36 ejemplos C# extraídos en proyectos aislados: compilación correcta, sin advertencias.
- Navegador de escritorio y móvil (375 px): búsqueda, estado vacío, preguntas desplegables, descargas completas, anterior/siguiente y recarga de lección comprobados.
- `tests/browser-study-smoke.js`: opciones y justificaciones obligatorias, puntajes 0/2 y 2/2, retroalimentación, autoevaluación reversible, lista de refuerzo, borradores al navegar y reinicio al recargar. El puntaje no marca comprensión automáticamente.
- Los archivos originales se conservan; su contenido fuente se compara con huellas locales tomadas antes de generar el curso.

Los registros locales de compilación están en `.checks/build-unidades.log` y `.checks/build-ejemplos.log`. `.checks/` no se publica en Pages.

## Qué no significa un resultado aprobado

Compilar el proyecto de una unidad **solo comprueba su estructura** mientras los ejemplos permanezcan comentados. Para aprender, copie un ejemplo completo en su archivo de trabajo y verifique su salida. No retire todos los comentarios a la vez: varias variantes pueden declarar los mismos nombres o incluir un punto de entrada propio.

Las guías incluyen expectativas y preguntas originales. No son una copia de los cuestionarios oficiales ni pruebas de que su cuenta haya completado una insignia. No se ejecutaron automáticamente todas las entradas interactivas, condiciones aleatorias o variaciones que pueda proponer al estudiar.

## Material original conservado

Los seis programas originales activos se comprobaron durante la revisión inicial; el registro está en `.checks/verificacion.log`. La solución original `curso_net.slnx` tiene `CS5001` en `6-functions` y `8-files` porque esos apuntes no tienen código activo. No se cambiaron para forzar una ejecución: **los comentarios son parte intencional del cuaderno de aprendizaje**.

El generador utiliza una solución separada, `aprende-csharp-dotnet.slnx`, y no modifica esos proyectos originales.

## Verificación de publicación

El [workflow de Pages](../.github/workflows/pages.yml) se revisa por separado de las prácticas. La comprobación local de rutas no demuestra que un despliegue remoto haya terminado. No hay ejecución de Actions ni URL pública confirmada mientras no se configure el repositorio de destino.
