# Aprende C# y .NET

**Sitio publicado:** <https://statick88.github.io/aprende-csharp-dotnet/>

**Comandos y VS Code:** <https://statick88.github.io/aprende-csharp-dotnet/#/herramientas-dotnet>

**Objetivo principal: prepararse para aprobar [Foundational C# with Microsoft](https://www.freecodecamp.org/learn/foundational-c-sharp-with-microsoft/).** Un lugar para repasar a su ritmo, con teoría paso a paso, ejemplos comentados y un proyecto .NET independiente por unidad. La navegación está inspirada en aprendejavascript.dev y la identidad visual usa el morado de .NET. Material propio en español latino de Ecuador, sin afiliación a Microsoft.

## Abrir el sitio localmente

Requisitos del sitio: Python 3.10 o posterior. Para las pruebas de JavaScript: Node.js 20 o posterior. Para ejecutar o compilar las prácticas: **SDK de .NET 10**. No se necesita npm, base de datos ni servidor de aplicaciones.

```bash
python3 tools/build_course.py
python3 -m http.server 4173 --directory _site
```

Abra <http://localhost:4173/>. No abra `site/index.html` directamente con `file://`: el navegador necesita servir `course.json` por HTTP. Detenga la vista previa con `Ctrl+C`.

## Cómo estudiar

1. Busque el tema o entre al recorrido por módulos/insignias.
2. Abra una unidad y revise el objetivo y los conocimientos previos.
3. Lea cada paso, prediga la salida y contraste con el ejemplo.
4. Abra el proyecto local de la unidad y active **un solo ejemplo completo** en una copia de trabajo.
5. Resuelva la práctica y los dos escenarios críticos de la unidad: elija una opción y justifique su decisión antes de revisar la retroalimentación.
6. Registre su autoevaluación: **Por revisar**, **Necesito reforzar** o **Puedo explicarlo y aplicarlo**. Los temas por reforzar aparecerán en su próximo repaso.
7. Vuelva a la fuente oficial para realizar su evaluación. El puntaje local comprueba opciones, no la calidad de sus explicaciones ni su elegibilidad para el examen.

### Seguimiento temporal

La portada y el lector comparten el seguimiento de las 67 unidades. Sus estados, respuestas y borradores se conservan al navegar dentro de la pestaña, pero **se reinician al recargar o cerrar la página**. No se guardan en una cuenta ni en el navegador de forma persistente. Visitar una lección, leer un texto o acertar opciones no marca automáticamente comprensión.

Cada unidad incluye dos preguntas críticas propias: **134 escenarios** para predecir resultados, diagnosticar errores y justificar decisiones. La retroalimentación ofrece una explicación y criterios para contrastar su razonamiento. Si edita una respuesta después de revisarla, debe revisarla otra vez para actualizar el resultado.

**El código comentado es intencional:** funciona como cuaderno de aprendizaje. Ejecutar una unidad sin editarla muestra una orientación, no ejecuta todos sus ejemplos ni certifica que la haya completado. En `Program.cs`, los ejemplos están fuera de la clase de orientación: reemplace el archivo por un solo ejemplo completo para probarlo, en vez de quitar todos los comentarios a la vez.

## Organización por ruta, insignia y unidad

Se desarrollan las **partes 1 y 2: 9 módulos y 67 unidades**, incluidos introducciones, evaluaciones de repaso y resúmenes. Los títulos, orden y enlaces de las unidades se contrastaron con los índices oficiales. Las partes 3 a 6 siguen siendo el próximo tramo de la certificación, no contenido local ya terminado.

| Parte | Módulos/insignias disponibles |
|---|---|
| 1 · Primer código | Primer código, variables y literales, operaciones numéricas, lógica de decisiones |
| 2 · Aplicaciones de consola | Entorno con Visual Studio Code, bucles, arreglos/listas, código reutilizable, lectura/escritura de archivos |

```text
course/                         Contenido editable y catálogo oficial
  catalog.json                  Rutas, módulos y unidades
  parte-01.json                 Explicaciones, ejemplos y repaso
  parte-02.json
  evaluaciones-01.json          Escenarios críticos y criterios de revisión
  evaluaciones-02.json
  herramientas-dotnet.json      Comandos, SDK y configuración de VS Code
curso/                          Generado: un proyecto por unidad
  parte-02/archivos/
    02-open-close-files-safely-with-using/
      README.md                 Teoría y práctica de la unidad
      Program.cs                Ejemplos comentados y documentación XML ///
      Unidad.csproj             Proyecto .NET 10 independiente
site/                           Interfaz HTML, CSS y JavaScript
_site/                          Sitio público generado para Pages
aprende-csharp-dotnet.slnx       Solución generada de las 67 unidades
curso_net.slnx                  Solución original conservada
1-variables/ ... 8-files/        Ejercicios originales conservados
```

`curso/`, la solución nueva y `_site/` se regeneran desde el contenido; están excluidos de Git. **Edite `course/*.json`, no las guías generadas**, para conservar sus cambios al reconstruir. Si practica editando un proyecto generado, guarde primero su copia de trabajo fuera de `curso/`: la siguiente generación reemplaza los archivos de cada unidad. No se borran sus directorios originales.

## Ejemplo: su punto de repaso actual

Después de generar el material:

```bash
dotnet run --project curso/parte-02/archivos/02-open-close-files-safely-with-using/Unidad.csproj
```

En el sitio, el botón **Continuar: abrir y cerrar archivos con using** lleva a esta unidad. Explica recursos, bloque `using`, declaración `using` y la diferencia frente a importar un espacio de nombres. Los ejemplos de archivos trabajan con temporales propios; no sobrescriben sus notas originales.

## Pruebas y certificación

```bash
python3 -m unittest discover -s tests -v
node --test site/course-utils.test.mjs
python3 tools/build_course.py
dotnet build aprende-csharp-dotnet.slnx
```

Las pruebas verifican la generación del material y sus 134 preguntas, los recursos públicos, la búsqueda, las rutas, el resumen de autoevaluaciones y el puntaje de opciones. No son el examen de Microsoft Learn ni pruebas de todas las variantes que usted active. Los ejercicios originales no tenían una suite automatizada; su código se conserva para consultar y comparar.

Los proyectos originales `6-functions` y `8-files` contienen únicamente comentarios; su solución original no tiene un punto de entrada para esos ejecutables. Esto **no es un defecto del material de aprendizaje** y no se alteraron sus apuntes para forzar su ejecución.

- [Comandos dotnet y configuración de VS Code](docs/HERRAMIENTAS-DOTNET.md): también disponibles en **Herramientas .NET** dentro del sitio.
- [Preparar GitHub Pages](docs/GITHUB-PAGES.md)
- [Ruta de certificación y avance observado](docs/RUTA-CERTIFICACION.md)
- [Pruebas y alcance de la evidencia](docs/PRUEBAS.md)
- [Documentación XML `///`](docs/DOCUMENTACION-XML.md)

## Identidad y referencias

Nombre sugerido del repositorio: **`aprende-csharp-dotnet`**. El sitio no depende de ese nombre: los recursos son relativos y las lecciones usan rutas hash para funcionar bajo `/nombre-del-repositorio/` en GitHub Pages. El código está publicado en [statick88/aprende-csharp-dotnet](https://github.com/statick88/aprende-csharp-dotnet), rama `main`. GitHub Pages está publicado en <https://statick88.github.io/aprende-csharp-dotnet/>. El [workflow de despliegue](https://github.com/statick88/aprende-csharp-dotnet/actions/runs/41930807808) completó build y deploy; se comprobaron navegación, evaluaciones, descargas, herramientas y vista móvil en la URL pública.

- [Certificación en freeCodeCamp](https://www.freecodecamp.org/learn/foundational-c-sharp-with-microsoft)
- [Módulo oficial de archivos](https://learn.microsoft.com/en-us/training/modules/csharp-read-write-files/)
- [Referencia de estructura visual](https://www.aprendejavascript.dev/)
- [Marca .NET: color oficial `#512bd4`](https://github.com/dotnet/brand)

No hay cuentas adicionales ni sincronización de progreso. El contenido y las preguntas son propios; las evaluaciones y la emisión de insignias/certificación siguen en las plataformas oficiales.
