# Herramientas .NET y Visual Studio Code

[Volver al índice](../README.md)

Referencia complementaria para preparar su entorno y repasar la línea de comandos. .NET no es un plugin: el SDK crea y compila proyectos; el runtime ejecuta aplicaciones; las extensiones C# y C# Dev Kit integran esas herramientas en VS Code. Esta guía no agrega una insignia ni cambia las 67 unidades del curso.

## 1. Compruebe el SDK y el entorno

### Instale el SDK, no solo el runtime

Instale Visual Studio Code y el SDK de .NET 10 para su sistema operativo desde las fuentes oficiales. El curso usa net10.0. No basta con instalar la extensión del editor ni el runtime. Los comandos de esta guía son para practicar; el sitio no instala programas ni ejecuta comandos en su equipo.

### Diagnóstico completo

Muestra SDK, runtimes, sistema operativo y arquitectura. Úselo al investigar problemas del entorno.

```bash
dotnet --info
```

**Resultado esperado:** Debe aparecer un SDK compatible con net10.0. Si dotnet no se reconoce, revise la instalación y PATH antes de cambiar código.

### SDK seleccionado

Muestra el SDK que usa el directorio actual. Un archivo global.json puede influir en la selección; no es la versión del lenguaje C# ni la lista de todos los SDK.

```bash
dotnet --version
```

**Resultado esperado:** En el entorno de esta revisión se observó 10.0.403; su equipo puede tener otro parche de .NET 10.

### SDK disponibles

Permite comprobar si realmente está instalado un SDK de .NET 10, incluso si hay varias versiones.

```bash
dotnet --list-sdks
```

### Runtimes disponibles

Lista los entornos de ejecución. Ver un runtime no demuestra que el SDK esté instalado.

```bash
dotnet --list-runtimes
```

## 2. Configure C# en Visual Studio Code

### Abra la carpeta del curso

Ejecute desde la raíz del repositorio. Si code no se reconoce, abra VS Code manualmente con File > Open Folder y configure su comando de terminal según el instalador de su sistema. Utilice únicamente espacios de trabajo de confianza.

```bash
code .
```

### Instale C# Dev Kit de Microsoft

También puede buscar C# Dev Kit en Extensions (Ctrl+Shift+X en Windows/Linux; Cmd+Shift+X en macOS). Compruebe el publicador Microsoft y el identificador exacto. C# Dev Kit se apoya en la extensión C# para servicios del lenguaje y agrega explorador de soluciones, plantillas y pruebas. Puede solicitar inicio de sesión según su configuración y condiciones de licencia; consulte la fuente oficial.

```bash
code --install-extension ms-dotnettools.csdevkit
```

**Resultado esperado:** La extensión aparece habilitada. Esto no sustituye comprobar el SDK con dotnet --list-sdks.

### Conozca la extensión C# básica

Proporciona soporte del lenguaje, IntelliSense y depuración. C# Dev Kit la usa como base; si ya se instaló como dependencia no necesita instalarla otra vez. La CLI sigue siendo útil para compilar y ejecutar sin depender de la interfaz del editor.

```bash
code --install-extension ms-dotnettools.csharp
```

### Revise las extensiones instaladas

Busque los identificadores ms-dotnettools.csdevkit y ms-dotnettools.csharp. Sus versiones son independientes del SDK y del TargetFramework del proyecto.

```bash
code --list-extensions --show-versions
```

### Genere la solución de aprendizaje

Este comando es del repositorio, no de .NET. Genera aprende-csharp-dotnet.slnx y los proyectos de las unidades. Seleccione esa solución en VS Code; curso_net.slnx conserva los apuntes originales comentados.

```bash
python3 tools/build_course.py
```

### Ejecute y depure conscientemente

Abra una unidad generada y revise Program.cs. Ctrl+F5 ejecuta sin depuración y F5 permite depurar cuando el proyecto está seleccionado. Para practicar un ejemplo, copie un único bloque completo en un archivo de trabajo, coloque un punto de interrupción y avance paso a paso. No quite todos los comentarios a la vez ni confunda ejecutar el mensaje de orientación con completar la lección.

## 3. Comandos dotnet para el trabajo diario

### Pida ayuda antes de memorizar opciones

Cada comando dispone de ayuda. Compruebe nombres de opciones en el SDK que tenga instalado.

```bash
dotnet --help
dotnet new --help
dotnet build --help
```

### Cree una aplicación de práctica

Ejecute desde una carpeta de trabajo elegida para practicar. Crea archivos y puede restaurar dependencias; no lo ejecute sobre una carpeta con trabajo que quiera conservar.

```bash
dotnet new console -n MiPractica -o practicas/MiPractica
```

**Resultado esperado:** Se crean MiPractica.csproj y Program.cs en practicas/MiPractica.

### Restaure dependencias

Resuelve paquetes y referencias; puede necesitar conexión a NuGet. build y run suelen realizar una restauración implícita. No confunda restaurar con ejecutar el programa.

```bash
dotnet restore practicas/MiPractica/MiPractica.csproj
```

### Compile sin ejecutar

Comprueba el código y genera resultados en bin/ y obj/. Compilar no demuestra que todos los casos de uso sean correctos.

```bash
dotnet build practicas/MiPractica/MiPractica.csproj
```

### Ejecute una práctica concreta

Seleccione explícitamente el proyecto cuando hay varios. --project no cambia automáticamente el directorio de trabajo de los archivos relativos.

```bash
dotnet run --project practicas/MiPractica/MiPractica.csproj
```

**Resultado esperado:** La plantilla de consola muestra Hello, World! si no se cambió su código.

### Compile las unidades del curso

Primero genere esta solución con python3 tools/build_course.py. Agrupa los 67 proyectos independientes, sin activar los ejemplos comentados.

```bash
dotnet build aprende-csharp-dotnet.slnx
```

### Ejecute la unidad de archivos

Sin editar Program.cs, imprime la orientación de estudio. Practique sobre una copia: regenerar el curso reemplaza los archivos de cada unidad.

```bash
dotnet run --project curso/parte-02/archivos/02-open-close-files-safely-with-using/Unidad.csproj
```

### Ejecute pruebas .NET cuando existan

RUTA_AL_PROYECTO_DE_PRUEBAS es un marcador que debe sustituir por un proyecto de pruebas real. El material C# original no tiene xUnit, NUnit o MSTest. Un resultado sin tests descubiertos no prueba su código. Las pruebas del sitio usan Python y Node, no dotnet test.

```bash
dotnet test RUTA_AL_PROYECTO_DE_PRUEBAS.csproj
```

### Limpie resultados de compilación

Limpia resultados de compilación del proyecto; no equivale a borrar sus fuentes o apuntes ni a desinstalar paquetes.

```bash
dotnet clean practicas/MiPractica/MiPractica.csproj
```

### Prepare una salida de distribución

Genera archivos para distribuir la aplicación .NET. No los sube a Internet ni despliega GitHub Pages. Este sitio de repaso es estático y se publica mediante el workflow de Pages.

```bash
dotnet publish practicas/MiPractica/MiPractica.csproj -c Release -o salida/MiPractica
```

## 4. Diagnóstico y lista de comprobación

### El editor no encuentra el SDK

Compare dotnet --info en la terminal externa y la terminal integrada. Reinicie VS Code después de instalar el SDK y revise arquitectura, PATH y global.json. No copie rutas de otro equipo ni instale SDK adicionales sin identificar qué versión pide el proyecto.

### No aparecen autocompletado o proyectos

Compruebe la extensión habilitada, abra la carpeta y la solución correctas, espere la restauración y revise View > Output de C# / C# Dev Kit. Abrir un .cs suelto no siempre proporciona el mismo contexto que un proyecto .csproj.

### Aparece CS5001 en los apuntes originales

Los ejemplos de 6-functions y 8-files están comentados por diseño. No existe un punto de entrada activo en esos ejecutables originales. Para estudiar por unidad use aprende-csharp-dotnet.slnx; no active todos los apuntes para eliminar el error.

### Antes de dar el entorno por listo

Compruebe que puede identificar un SDK, abrir el proyecto en VS Code, compilarlo, ejecutarlo y detenerse en un punto de interrupción de un ejemplo activo. Explique qué hizo cada herramienta: instalar una extensión por sí solo no demuestra que el entorno esté completo.

## Fuentes oficiales

- [.NET en Visual Studio Code](https://code.visualstudio.com/docs/languages/dotnet)
- [Primeros pasos con C# y C# Dev Kit](https://code.visualstudio.com/docs/csharp/get-started)
- [Referencia oficial de la CLI dotnet](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet)
- [Descarga del SDK de .NET](https://dotnet.microsoft.com/download)
