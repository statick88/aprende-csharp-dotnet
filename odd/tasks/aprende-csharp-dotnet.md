# Aprende C# y .NET
Objetivo: sitio estático de repaso y un proyecto .NET por unidad. Rama: feat/curso-por-unidad.
Entrega local; GitHub Pages preparado, sin remoto/publicación. Verificación: Python unittest, dotnet build, navegador.

## Specs
- S1: "este es un repositorio de aprendizaje, es por ello que el codigo esta comentado".
- S2: "necesito que cada proyecto se divida por cada seccion segun la insignia, documentando el paso a paso de lo que se debe ir conociendo para conseguir la certificacion https://www.freecodecamp.org/learn/foundational-c-sharp-with-microsoft/create-and-run-simple-c-sharp-console-applications/read-and-write-files-in-c-sharp".
- S3: "Un proyecto independiente por unidad" (selección del usuario).
- S4: "documenta en español latino de ecuador cada seccion" (solicitud inicial).
- S5: "quiero que adoptes este diseño https://www.aprendejavascript.dev/".
- S6: "Sitio web del curso — recomendado" (selección del usuario).
- S7: "vamos a utilizar github pages para el deploy, lo importante es poder tener un lugar para repasar".
- S8: "cambia el nombre del repo si es necesario".

- S9: "adapta a la imagen corporativa de .Net".

- S10: "quita esta seccionÑ Material de estudio independiente. Inspiración estructural: aprendejavascript.dev. Morado .NET: #512bd4. No afiliado a Microsoft.".

- S11: "el objetivo principal es aprobar esta certificacion: https://www.freecodecamp.org/learn/foundational-c-sharp-with-microsoft/".

## Tasks
- T1 | S1-S9 | inline | done | Catálogo oficial: 9 módulos y 67 unidades; tres láminas en design/aprende-csharp-dotnet; elegida 01-recorrido.html, alternativas 02 y 03. Contrato L9-L10.
- T2 | S1-S6,S9 | delegated parallel | done | T2a/T2b: JSON, ids, URLs y orden comprobados; T2b recibió una corrección para ejemplos completos. T2c: 3 tests node y sintaxis pasan; navegador pendiente en T6. ASSESS sin candidato por archivos no rastreados; autoverificación. Commits pendientes de integración.
- T3 | S1-S4 | delegated | dropped | Absorbida como unidad independiente T2b para una sola transición de coordinación.
- T4 | S4-S6,S9 | delegated | dropped | Absorbida como unidad independiente T2c; no se elimina el resultado.
- T5 | S1-S4,S7-S11 | inline | done | Portada enfocada en certificación y recorrido de seis rutas; tests 2 Python/4 Node, 67 proyectos y 36 ejemplos compilables; originales intactos. Commits 80b7b22,73a1c70,7d807fb.
- T6 | S1-S11 | inline + independent verify (item 5: workflow de despliegue) | done | Python 2/2 y Node 4/4; smoke raíz/subruta/móvil y objetivo de certificación PASS; 67 proyectos y 36 ejemplos compilan. Verificador independiente PASS para commit7d807fb. Smoke fijado en a391413. Sin aprobación nativa (ASSESS unassessable).
- T7 | S7-S8 | inline | blocked | Espera URL del repositorio de GitHub de destino y confirmación de si usar uno existente o crear aprende-csharp-dotnet. No hay origin ni publicación remota.

## Log
L1: este es un repositorio de aprendizaje, es por ello que el codigo esta comentado, asi que necesito que cada proyecto se divida por cada seccion segun la insignia, documentando el paso a paso de lo que se debe ir conociendo para conseguir la certificacion https://www.freecodecamp.org/learn/foundational-c-sharp-with-microsoft/create-and-run-simple-c-sharp-console-applications/read-and-write-files-in-c-sharp
L2: Elección: "Un proyecto independiente por unidad".
L3: quiero que adoptes este diseño https://www.aprendejavascript.dev/
L4: Elección: "Sitio web del curso — recomendado".
L5: vamos a utilizar github pages para el deploy, lo importante es poder tener un lugar para repasar
L6: cambia el nombre del repo si es necesario
L7: Alcance concreto: las partes 1 y 2 que corresponden al material existente, incluidas todas sus unidades oficiales; partes 3 a 6 figuran como continuación de la certificación, no como material ya desarrollado. Se mantienen intactos los ocho directorios originales y su solución como referencia, evitando pérdida o activación accidental de apuntes.
L8: Decisiones: sitio sin framework ni dependencias npm, HTML/CSS/JS y build con biblioteca estándar Python; sin backend ni autenticación. Nombre visible Aprende C# y .NET; slug sugerido aprende-csharp-dotnet. No hay remoto ni commits previos; ahora existe .git (no existía al inicio de la sesión anterior), inventario inspeccionado sin hacer reset/recuperación. Nueva rama creada, sin publicar.
L9: Contrato de contenido: course/catalog.json describe rutas/módulos/unidades oficiales. course/parte-01.json y parte-02.json usan schemaVersion=1 y modules[], cada módulo {id,title,description,sourceUrl,part,units[]}; cada unidad {id,title,sourceUrl,objective,prerequisites:[texto],steps:[{title,text,code,expected}],practice,review:[{question,answer}],originals:[ruta]}. id global: module-id/NN-slug-oficial. practice es texto. Código en steps es fuente C# completa de ejemplo, no se ejecuta en navegador. Evaluaciones/resúmenes son repaso propio, no respuestas de la evaluación oficial. El generador padre deriva README, Program.cs comentado, Unidad.csproj y rutas desde los ids. Los proyectos de introducción/evaluación/resumen también existen por elección del usuario.
L10: Invariantes compartidos: identificadores y orden del catálogo oficial no cambian; rutas siempre relativas; ningún token/correo del perfil ni archivo privado se publica; código original conservado; datos se renderizan como texto, nunca HTML arbitrario; no se atribuye progreso de certificación. Los ejemplos permanecen comentados y cada programa de unidad solo imprime una instrucción de estudio.
L11: Riesgo previsto item 5 únicamente por workflow Pages; no se instala ni despliega nada en esta sesión sin remoto. Pronóstico de miles de líneas por contenido didáctico: commits por módulo o capa coherente, sin PR ni push, evitando un único commit de todo el curso. Los slices de contenido pueden exceder 400 líneas por coherencia pedagógica y se informan, sin comprimir apuntes para ajustar presupuesto.

L12: adapta a la imagen corporativa de .Net
L13: Se conserva la estructura de la referencia, usando morado .NET y sin presentar el sitio como oficial de Microsoft. Catálogo verificado contra índices oficiales: 9 módulos, 67 unidades (partes 1 y 2).

L14: Diseño: design/aprende-csharp-dotnet/ con 01-recorrido.html (elegida por ser la más cercana a la referencia), 02-lector.html y 03-cuaderno.html (alternativas). Handoff de 01 recibido. Marca: https://github.com/dotnet/brand confirma #512bd4; no se usa logotipo oficial ni fuentes remotas. No hay sistema visual previo que sincronizar.

L15: Workers T2a, T2b y T2c regresaron. Comando de paridad de T2a repetido correctamente por padre: PASS (31 unidades); T2b PASS (36). Una corrección de contenido T2b añadió ejemplos completos en conceptos sustantivos. Tests JS: 3/3. RED del generador: 2 tests de interfaz CLI fallan porque no existe tools/build_course.py. Material original protegido por huellas SHA-256 locales (no se publica el inventario).

L16: quita esta seccionÑ Material de estudio independiente. Inspiración estructural: aprendejavascript.dev. Morado .NET: #512bd4. No afiliado a Microsoft.
L17: Eliminado el footer en sitio y lámina elegida; build regenerado. 67 proyectos compilados sin advertencias tras corregir colisión de nombres en solución (carpetas virtuales propias). 36 ejemplos extraídos a copias aisladas: se encontró y corrigió CS1009 por escape de salto de línea; nueva compilación en curso. ZIP completo por unidad con solo Program.cs, Unidad.csproj y README.md; test RED/GREEN observado. Navegador: búsqueda desde lector corregida tras reproducción; smoke final encuentra desborde móvil en lección, pendiente de corrección.

L18: GREEN observado: tests Python 2/2, Node 3/3, 67 proyectos y 36 ejemplos compilan sin advertencias. Smoke raíz PASS tras corregir min-width móvil; script en tests/browser-smoke.js. Fuentes originales conservadas por SHA-256. Verificación con prefijo de Pages y auditoría workflow en curso.

L19: el objetivo principal es aprobar esta certificacion: https://www.freecodecamp.org/learn/foundational-c-sharp-with-microsoft/
L20: Se prioriza esa meta en portada y recorrido de seis rutas. Cobertura propia actual: partes 1-2; 3-6 se enlazan con su temario oficial y se marcan por desarrollar. No se promete aprobación ni se confunde tener un sitio con cumplir requisitos de certificación.

L21: Commits: f744035 baseline original (1551 líneas, importación íntegra de cuadernos); 2f43a2f catálogo y parte1 (1642); 67bdb7f parte2 (1390); 257d843 diseño (192); 80b7b22 interfaz y tests (613); 73a1c70 generador/guías/tests (538); 7d807fb workflow Pages y documentación (109, unidad de riesgo item5 aislada). Partes de contenido son unidades pedagógicas coherentes; exceden 400 líneas sin compactar ni omitir ejemplos. No hay PR ni push. ASSESS permanece unassessable por no rastreados, no hubo aprobación nativa; escalación item5 requiere verificador independiente del workflow.

L22: Verificador independiente mw2o692p-6-j9mq: PASS de S7,S8 e interacciones S1-S3,S10,S11 sobre workflow 7d807fb; pruebas en git archive aislado 2 Python y 4 Node; 265 URLs relativas y 67 ZIP revisados, sin bloqueos. No se añadieron gates sugeridos no necesarios. Parent spot-check de los mismos tests PASS. Smoke final bajo /aprende-csharp-dotnet/ PASS: 9 módulos,67unidades,seisrutas,objetivocertificación,footereliminado,búsqueda,repaso,descargas,recarga,anterior/siguiente,móvil375px. Handoff 01-recorrido implementado con preview http://127.0.0.1:4173/.
L23: Entrega local lista; no hay remoto origin, por lo que no se ejecutó Actions ni se publicó en Pages y no se renombró un repositorio remoto. T7 espera decisión concreta de destino. Contenido local actual: partes1-2; partes3-6 son enlaces de continuación y están pendientes de desarrollar, no se afirma preparación completa. Los ejemplos se compilaron, no se ejecutaron todas sus entradas.
