# 8. Leer y escribir archivos con C#

[Volver al índice](../README.md)

## Objetivo y estado

Este es el punto de estudio indicado: [abrir y cerrar archivos de forma segura con `using`](https://learn.microsoft.com/en-us/training/modules/csharp-read-write-files/2-open-close-files-safely-with-using). El archivo `Program.cs` conserva apuntes y ejemplos comentados; **no hay una práctica activa** y el proyecto falla con `CS5001` al compilar.

El archivo de ejemplo [notes.txt](notes.txt) contiene `prueba`. No se modificó como parte de la documentación.

## Teoría: recursos y cierre seguro

Abrir un archivo puede reservar recursos del sistema operativo. Si una excepción interrumpe el código antes de `Close()`, el cierre manual podría no ejecutarse. `using` garantiza la llamada a `Dispose()` al abandonar su ámbito por el flujo normal o por una excepción. No garantiza que abrir, leer o escribir vaya a tener éxito ni protege frente a una terminación abrupta del proceso.

| Forma | Cuándo se libera el recurso |
|---|---|
| `using (StreamReader reader = new StreamReader(path)) { ... }` | Al salir del bloque |
| `using StreamReader reader = new StreamReader(path);` | Al terminar el ámbito que contiene la declaración |
| `File.ReadAllText(path)` | La API administra la apertura y el cierre de esa operación |

`using System.IO;` importa un espacio de nombres; **no es el mismo uso de `using`** que libera un recurso. Con `ImplicitUsings` habilitado ya se importan espacios comunes como `System.IO`.

## Rutas: evita el error del apunte original

`/8-files/notes.txt` es una ruta absoluta en Linux y apunta fuera de este proyecto. Una ruta relativa se interpreta desde el **directorio de trabajo actual**, no desde la ubicación de `Program.cs`. `dotnet run --project ...` selecciona el proyecto, pero no cambia automáticamente ese directorio.

Si estás en la raíz del curso, usa:

```csharp
string path = Path.Combine("8-files", "notes.txt");
```

Si primero entras a `8-files`, usa `"notes.txt"`. `Path.Combine` evita escribir separadores específicos de un sistema operativo.

## Práctica guiada propuesta: lectura

Este ejemplo completo es para una copia de estudio; **no está activado en `Program.cs`**. Ejecútalo desde la raíz del curso con un proyecto de consola de prueba, o actívalo como único bloque ejecutable cuando decidas completar esta sección.

```csharp
string path = Path.Combine("8-files", "notes.txt");
try
{
    using (StreamReader reader = new StreamReader(path))
    {
        Console.WriteLine(reader.ReadToEnd());
    }
}
catch (FileNotFoundException)
{
    Console.Error.WriteLine("No se encontró el archivo de notas.");
    Environment.ExitCode = 1;
}
catch (IOException)
{
    Console.Error.WriteLine("No se pudo leer el archivo de notas.");
    Environment.ExitCode = 1;
}
```

Debe imprimir `prueba`; el número de saltos finales depende del contenido del archivo y de `WriteLine`. `FileNotFoundException` se captura antes de `IOException` porque es una excepción más específica. Los errores de permisos pueden producir `UnauthorizedAccessException`, que este ejemplo mínimo no maneja.

## Leer, escribir y agregar

| API | Efecto |
|---|---|
| `File.ReadAllText(path)` | Lee todo como una cadena |
| `File.ReadAllLines(path)` | Lee todas las líneas en un arreglo |
| `File.ReadLines(path)` | Enumera líneas sin cargar todo el archivo de una vez; termina la enumeración para liberar sus recursos |
| `StreamReader.ReadLine()` | Lee una línea; devuelve `null` al llegar al final |
| `File.WriteAllText(path, text)` | Crea el archivo o reemplaza el contenido existente |
| `File.AppendAllText(path, text)` | Crea el archivo si no existe o agrega texto al final; no agrega saltos por ti |
| `StreamWriter` con `using` | Permite escribir progresivamente; su configuración determina si reemplaza o agrega |

**No pruebes escritura sobre tus apuntes originales.** Para practicar sin alterarlos:

```csharp
string path = Path.Combine(Path.GetTempPath(), $"curso-net-{Guid.NewGuid():N}.txt");
try
{
    File.WriteAllText(path, "Primera línea" + Environment.NewLine);
    File.AppendAllText(path, "Segunda línea" + Environment.NewLine);
    Console.Write(File.ReadAllText(path));
}
finally
{
    if (File.Exists(path)) File.Delete(path);
}
```

Este ejemplo crea y elimina únicamente un archivo temporal propio. Es material propuesto, no un test ya implementado o ejecutado. `File.Exists` no garantiza que una lectura posterior sea exitosa: el archivo puede cambiar o no ser accesible.

## Repaso y continuación

1. Explica qué ocurre al salir de un bloque `using` por una excepción.
2. Compara el ámbito de una declaración `using` y un bloque `using`.
3. Identifica qué API reemplaza y cuál agrega contenido.
4. Prueba lectura, archivo inexistente y liberación del recurso en una copia aislada cuando actives la práctica.

Sigue con las unidades oficiales de [lectura](https://learn.microsoft.com/en-us/training/modules/csharp-read-write-files/3-read-data-from-files), [escritura](https://learn.microsoft.com/en-us/training/modules/csharp-read-write-files/4-write-data-to-files) y [visor de registros](https://learn.microsoft.com/en-us/training/modules/csharp-read-write-files/5-exercise-log-file-viewer). La implementación local del visor todavía no existe.
