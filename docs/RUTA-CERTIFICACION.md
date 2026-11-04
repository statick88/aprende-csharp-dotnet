# Ruta de certificación y cobertura del curso

[Volver al índice](../README.md)

## Meta y fuentes

La meta indicada es [Foundational C# with Microsoft en freeCodeCamp](https://www.freecodecamp.org/learn/foundational-c-sharp-with-microsoft), con foco actual en [Read and write files in C#](https://learn.microsoft.com/en-us/training/modules/csharp-read-write-files/). El repositorio es evidencia de práctica local; la obtención de logros y el estado de certificación se comprueban en las plataformas, no a partir de carpetas o comentarios.

Las páginas actuales de Microsoft Learn mantienen seis rutas. La parte 2 consultada incluye instalación de VS Code, bucles, arreglos/listas, código reutilizable y archivos. Por eso el orden local resulta razonable, aunque las carpetas no representan un módulo oficial cada una. Los temarios pueden cambiar: toma como referencia los títulos y unidades visibles, no solo tutoriales antiguos.

## Mapa de estudio

La tabla siguiente describe el material original conservado. “Activo” significa código ejecutable y “apunte” significa código comentado intencionalmente para estudiar: no es una clasificación de calidad ni una tarea de activación. El sitio nuevo lo organiza en 9 módulos y 67 proyectos independientes por unidad de las partes 1 y 2; se genera con `python3 tools/build_course.py`. Ninguna de estas categorías implica completar el módulo oficial.

| Ruta oficial | Evidencia local | Qué falta consolidar |
|---|---|---|
| [1. Primer código](https://learn.microsoft.com/en-us/training/paths/get-started-c-sharp-part-1/) | 1: consola; 2: tipos y aritmética; 3: decisiones | Conversión segura, nulabilidad y explicación de cada resultado |
| [2. Aplicaciones sencillas](https://learn.microsoft.com/en-us/training/paths/get-started-c-sharp-part-2/) | 4: bucles; 5: listas; 6: métodos como apuntes; 7: cálculo activo; 8: archivos como apuntes | Repasar las unidades organizadas de métodos, lectura, escritura, agregado y visor de registros; practicar cada ejemplo por separado cuando corresponda; manejo del entorno/IDE |
| [3. Agregar lógica](https://learn.microsoft.com/en-us/training/paths/get-started-c-sharp-part-3/) | 3: booleanos; 4: repetición; alcance comentado en 6 | `switch`, alcance de bloques, proyectos guiado y desafío de ramificación/bucles |
| [4. Datos variables](https://learn.microsoft.com/en-us/training/paths/get-started-c-sharp-part-4/) | 2: conversiones comentadas; 5: ordenamiento; 7: `F2` | Tipos por rango y precisión, operaciones de arreglos, extracción/reemplazo de cadenas, alineación y búsquedas |
| [5. Métodos](https://learn.microsoft.com/en-us/training/paths/get-started-c-sharp-part-5/) | 6: apuntes; 7: parámetros, retorno y tasa opcional | Más práctica ejecutable de parámetros/retornos; proyectos de visita al zoológico y minijuego |
| [6. Depuración](https://learn.microsoft.com/en-us/training/paths/get-started-c-sharp-part-6/) | 6: división y `try/catch` comentados | Depurador, puntos de interrupción, inspección de variables, creación/captura de excepciones y proyectos de depuración |

Las brechas se refieren al código inspeccionado, **no a una afirmación de que no hayas aprendido esos temas**. No se encontraron soluciones locales de los proyectos oficiales guiados y desafíos mencionados.

## Punto actual: archivos

La [guía de archivos](../8-files/README.md) conecta estos objetivos con tu código:

1. Entender por qué `using` libera recursos incluso cuando se propaga una excepción.
2. Diferenciar bloque `using`, declaración `using` e importación de espacios de nombres.
3. Resolver rutas desde el directorio de trabajo correcto.
4. Elegir lectura completa o por líneas.
5. Diferenciar reemplazo de contenido y agregado al final.
6. Practicar con archivos propios temporales y controlar errores concretos.

El módulo oficial contiene introducción, cierre seguro, lectura, escritura, ejercicio de visor de registros, evaluación y resumen. En la copia actual no hay un visor implementado.

## Comprobación del perfil de Learn

Perfil solicitado: [Diego Medardo Saavedra García](https://learn.microsoft.com/en-us/users/diegomedardosaavedragarcia-3950/).

La primera descarga pública devolvió una plantilla sin logros. Después de que indicaste “ahora estas login”, el navegador sí mostró el perfil solicitado y su actividad. Se observaron estos datos el 4 de noviembre de 2026; son una fotografía del momento, no un seguimiento automático:

| Evidencia visible | Estado observado |
|---|---|
| Resumen | 7 insignias, 1 trofeo, nivel 4; 9.800 / 13.299 XP |
| Parte 1: Escribir el primer código con C# | Trofeo de ruta completada |
| Primer código, variables, operaciones numéricas y decisiones | Cuatro módulos completados |
| Repeat actions with loops in C# | Completado |
| Organize data with arrays and lists in C# | Completado |
| Write reusable code in C# | Completado |
| Read and write files in C# | 18 %; la plataforma indicaba 45 minutos restantes |

Tu siguiente foco razonable es continuar el módulo de archivos y repasar cada unidad en el sitio nuevo. El código comentado se conserva a propósito; puedes activar un único ejemplo en una copia cuando quieras practicar. Que el módulo de código reutilizable esté completado en Learn y `6-functions` siga comentado refleja tu forma de organizar apuntes, no un defecto que deba corregirse. La actividad visible no demuestra que las partes 2 a 6 estén completadas ni que ya tengas la certificación final.

No se copió el correo mostrado por la cuenta. Tampoco se interpreta el tiempo restante como una medición exacta del estudio necesario. La palabra “Completed” de una página genérica descargada, por sí sola, no se usa como evidencia individual.

No se consultan contraseñas, cookies ni tokens. Una sesión iniciada permite ver información de la cuenta cuando la plataforma la expone, pero no autoriza completar unidades o evaluaciones en tu nombre.

## Cómo usar el material para preparar la evaluación

- Resuelve primero el ejercicio sin consultar su solución y predice su salida.
- Explica el resultado y un caso límite: `null`, división entera, índice fuera de rango o archivo inexistente.
- Revisa los módulos oficiales correspondientes y sus evaluaciones dentro de tu cuenta.
- La página de freeCodeCamp, verificada posteriormente en el navegador, indica obtener el trofeo de cada una de las seis secciones en Microsoft Learn y verificar esos trofeos en freeCodeCamp para poder acceder al examen de certificación. La descarga inicial no mostraba este contenido dinámico. No se comprobó tu elegibilidad individual, el puntaje, el número de preguntas ni la duración del examen; los indicadores de una página sin sesión no se atribuyen a tu cuenta.
- Registra por separado el avance local y el oficial: no marques toda la ruta como terminada por haber ejecutado un solo ejemplo.

## Lista personal de repaso

- [ ] Puedo explicar entrada/salida, tipos, conversiones y nulabilidad.
- [ ] Resuelvo decisiones, `switch` y bucles sin depender del azar para comprobarlos.
- [ ] Puedo manejar índices, listas, arreglos, cadenas y formatos.
- [ ] Escribo métodos con parámetros y retornos, y entiendo el alcance.
- [ ] Leo/escribo archivos con rutas correctas y liberación de recursos.
- [ ] Uso el depurador y manejo excepciones de forma específica.
- [ ] Completé y verifiqué los requisitos en las plataformas oficiales.

Estos casilleros quedan sin marcar: son una autoevaluación, no logros atribuidos automáticamente.
