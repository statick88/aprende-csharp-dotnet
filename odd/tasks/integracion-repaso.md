# Integración del recorrido y repaso
Objetivo: integrar las tres láminas aprobadas en el sitio real. Rama: feat/curso-por-unidad.
Entrega local, sin publicación. Verificación: tests Python/Node y navegador raíz/subruta/móvil.

## Specs
- S1: "procede".
- S2: "Integrar los tres diseños aprobados — recomendado" (elección del usuario).
- S3: "Me agrada esta seccion, sobretodo para ir evaluando al final de cada seccion, con preguntas criticas que comprueban que realmente el estudiante comprendio y entendio la lección".
- S4: "Me agrada para conocer el progreso de lo que se necesita ir mejorando".
- S5: "Esta bienvenida es espectacular".
- S6: "el objetivo principal es aprobar esta certificacion: https://www.freecodecamp.org/learn/foundational-c-sharp-with-microsoft/" (objetivo vigente).
- S7: "documenta en español latino de ecuador cada seccion" (idioma vigente).

## Tasks
- T1 | S2-S3,S6-S7 | delegated parallel | done | 31+36 unidades,62+72 preguntas; JSON/paridad PASS. Commits aaf3008 y4dc7498. ASSESS sin candidato por no rastreados; autoverificación, sin verificador independiente.
- T2 | S2-S5 | inline | done | RED/GREEN: módulo/recurso faltantes luego implementados; 2Python/8Node PASS. Seguimiento explícito, borradores y evaluación integrados con guías. Commit10a8000 (402líneas de diff). Workflow sin cambios.
- T3 | S1-S7 | inline | done | 2Python/8Node, sintaxis JS y diff-check PASS; ambos smoke navegador PASS bajo prefijo Pages; nuevo smoke raíz/móvil PASS. 134 preguntas y guías verificadas. Sin deploy ni aprobación nativa.

## Log
L1: procede
L2: Elección del usuario: Integrar los tres diseños aprobados — recomendado.
L3: Diseños de referencia: design/aprende-csharp-dotnet/01-recorrido.html (bienvenida aprobada, conservar), 02-lector.html (autoevaluación por unidad y próximo repaso), 03-cuaderno.html (decisiones críticas, justificación y retroalimentación). No se alteran las láminas durante esta integración.
L4: Alcance: las 67 unidades disponibles. Estado solo en memoria mientras la pestaña permanezca abierta; no localStorage, cuentas ni sincronización. Visitar una unidad, acertar opciones o leer un texto no cambia automáticamente su autoevaluación. Navegar conserva estados y borradores dentro de la pestaña; recargar reinicia. Se informa explícitamente. No se evalúa automáticamente la calidad semántica de explicaciones escritas ni se atribuyen insignias oficiales.
L5: Contrato para contenido nuevo: course/evaluaciones-01.json y course/evaluaciones-02.json, {schemaVersion:1, units:[{id:<id exacto del catálogo>, questions:[{id:<id estable local como q1>,prompt:string,code:string,options:[3 strings],correctIndex:integer 0..2,explanation:string,reasonPrompt:string,rubric:[2 strings]}]}]}. Dos preguntas críticas por unidad; no copiar respuestas del examen oficial. Código opcional, no se ejecuta en navegador. El padre incorpora questions a unit.assessment sin cambiar ids/títulos/orden de contenido existente.
L6: Invariantes: bienvenida y marca .NET conservadas; recursos relativos y compatibilidad Pages; render mediante DOM/textContent; código original y workflow sin cambios; autoevaluación explícita pending/reinforce/explain; puntaje solo de opciones y justificación revisada por el estudiante. No se publica ni se añade contenido a partes3-6.
L7: Ruta: dos writers concurrentes en foreground por política background off (31 y36 unidades, cada uno mucho mayor que100líneas), sin delegar test/docs separados del comportamiento. Padre integra frontend y generador porque comparten una interacción; riesgo previsto none: adición aislada de estado efímero y evaluación, sin cambios a contratos públicos consumidos fuera del sitio ni al despliegue. Evidencia de base: 2Python/4Node y browser anteriores PASS; .NET wrappers originales ya comprobados. Pronóstico: ~2500líneas de contenido, ~400líneas de UI/tests; commits por contenido parte y por unidad coherente de integración, sin PR/push. Preservar cambios existentes no comprometidos en láminas02/03 y metadatos canvas.

L8: RED de tests Node (módulo inexistente) y CLI Python (recurso faltante) observado; GREEN 2Python/8Node tras implementar study-state/study-ui y generación de assessment para67unidades. Consolidado el test nuevo en site/course-utils.test.mjs para que el workflow existente ejecute los8 sin modificar CI. Smoke raíz PASS: puntajes0/2 y2/2, justificación requerida, estado explícito y reversible, borradores al navegar, invalidación al editar y reinicio al recargar, móvil375. Guías generadas incluyen las preguntas, explicación y criterios.

L9: Final: 2Python/8Node PASS, node--check study-ui/app PASS y gitdiff--check PASS. Browser-study-smoke raíz y subruta /aprende-csharp-dotnet/ PASS: justificaciones obligatorias (espacios inválidos), puntaje0/2y2/2, feedback visible tras revisar e invalidado al editar, estados no automáticos, refuerzo, borradores al navegar y reinicio al recargar, móvil375px. Regresión browser-smoke bajo subruta PASS (bienvenida, seisrutas,67unidades,buscador,descargas,navegación,móvil). El aviso previo de favicon404 no pertenece a esta integración. No se recompiló .NET porque no cambió código C# ni csproj; solo guías, JSON yfrontend.
L10: Commits aaf3008 (evaluacionesparte1,780líneas),4dc7498 (parte2,1409),10a8000 (integración,testsyguías,394adiciones/8eliminaciones). Contenido separado por parte como unidad pedagógica sin minimizar para alcanzar400; no hayPR/push. Se preservan sinstaging las láminas02/03 y metadatoscanvas preexistentes. ASSESS final de commit10a8000 vs4dc7498 exacto devuelve unassessable por no rastreados, sin candidato ni aprobación nativa; plan self-verification sin independiente (no item de alto riesgo). Risk:none: módulos nuevos aislados, estado efímero, ampliación aditiva de datos, sin modificar workflow ni contratos de comandos ajenos.
L11: Vista previa principal permanece en http://127.0.0.1:4173/. Handoff01 implementado con elementos de02y03. Servidor temporal de subruta detenido. Publicación sigue fuera de esta autorización; destino remoto pendiente en feature anterior. Partes3-6 continúan por desarrollar; no se afirma preparación completa ni comprensión automática.
