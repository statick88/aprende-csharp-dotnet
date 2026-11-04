# Publicar el sitio de repaso en GitHub Pages

[Volver al índice](../README.md)

El sitio es estático. `.github/workflows/pages.yml` construye **solo `_site/`** y publica ese artefacto; no sube la carpeta completa del repositorio. No necesita claves privadas, tokens pegados en archivos, backend ni dependencias npm.

## Estado de esta entrega

**Publicado y verificado:** <https://statick88.github.io/aprende-csharp-dotnet/>.

El repositorio es público: [statick88/aprende-csharp-dotnet](https://github.com/statick88/aprende-csharp-dotnet), con rama `main` y remoto `origin`. La [ejecución 41930807808](https://github.com/statick88/aprende-csharp-dotnet/actions/runs/41930807808) terminó con build y deploy aprobados.

Se ejecutaron los tres smoke de navegador contra la URL pública: recorrido y descargas, evaluaciones/seguimiento temporal y herramientas .NET/VS Code. Incluyen recarga, búsqueda y vista móvil de 375 px.

La primera ejecución falló en Configure Pages porque el sitio todavía no estaba habilitado. Se habilitó Pages con GitHub Actions y se reejecutó una vez, sin cambiar el workflow ni ampliar permisos.

## Paso a paso en GitHub

1. Identifique o cree el repositorio de destino; puede llamarlo `aprende-csharp-dotnet`.
2. Revise el contenido público antes de subirlo. Mantenga fuera de Git credenciales, archivos `.env`, capturas de sesiones, `.checks/`, `bin/`, `obj/` y el directorio generado `_site/`.
3. Publique los fuentes en su rama principal. El workflow contempla `main` y `master` y también permite ejecución manual.
4. En **Settings → Pages → Build and deployment → Source**, seleccione **GitHub Actions**.
5. En **Actions**, ejecute **Publish review course to GitHub Pages** desde la rama principal, o publique un cambio de contenido que active el workflow.
6. Si hay protección del entorno `github-pages`, apruebe la publicación desde GitHub.
7. Espere a que termine el trabajo `deploy` y use la URL que devuelve. Para un repositorio de proyecto suele tener la forma `https://USUARIO.github.io/REPOSITORIO/`; no sustituya estos marcadores sin conocer el destino real.

No se proporcionan comandos de `push` con un destino inventado. Vincular `origin`, renombrar el repositorio en GitHub y publicar requieren conocer el propietario y el repositorio correctos.

## Qué hace el workflow

1. Descarga los fuentes con `actions/checkout@v6`.
2. Usa Python y Node.js para ejecutar los tests del generador y los helpers de la interfaz.
3. Ejecuta `python3 tools/build_course.py`.
4. Configura Pages con `actions/configure-pages@v5`.
5. Sube `_site/` con `actions/upload-pages-artifact@v4`.
6. Publica el artefacto con `actions/deploy-pages@v4`.

Los permisos de escritura de Pages y del token OIDC se limitan al trabajo de despliegue, que depende de la construcción. No hay despliegues de pull requests ni ejecuciones sobre código de forks. La compilación de prácticas .NET se realiza como comprobación local separada: no se necesita ejecutar los ejemplos para generar HTML y JSON.

## Compatibilidad con la ruta del repositorio

CSS, JavaScript, JSON y recursos descargables usan rutas relativas. Las lecciones usan `#/leccion/...`, por lo que recargar una lección no exige reglas de reescritura del servidor ni un archivo 404 especial. No fije `/styles.css` o `/course.json` desde la raíz del dominio: esas rutas romperían un Pages de proyecto.

## Fuentes editables

- Cambie explicaciones y código en `course/parte-01.json` y `course/parte-02.json`.
- Mantenga los identificadores y enlaces del catálogo oficial en `course/catalog.json`.
- Cambie el diseño en `site/`.
- Ejecute los comandos de prueba indicados en el README antes de publicar.

El generador no copia `.git`, capturas ni archivos de configuración privados. Solo publica los activos de interfaz enumerados, el contenido didáctico y los recursos C# referenciados explícitamente.

Fuente: [Workflows personalizados para GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).
