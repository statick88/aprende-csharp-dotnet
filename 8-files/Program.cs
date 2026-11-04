// Read and write files in C#

/* Learn how to read from and write to files in C# using the using statement and the File class to keep your code safe and clean.
Learning objectives

After you complete this module, you'll be able to:

    Open files safely using the using statement and the File class

    Read data from text files

    Write and append data to text files
 */

/* Introducción

Los programas se vuelven mucho más útiles cuando pueden leer los datos que ya existen y guardar los resultados para más adelante. Archivos de configuración, archivos de registro, notas, exportaciones de otras aplicaciones: todos estos en vivo en disco como archivos, y C # hace que sea fácil trabajar con ellos.

En este módulo, aprende a abrir archivos de forma segura utilizando la instrucción y la clase Archivo, leer datos de texto de archivos de varias maneras diferentes y escribir nuevos datos, ya sea reemplazando lo que hay o agregando al final. */

/*
Abrir y cerrar archivos de forma segura con el uso de la instrucción using

Para trabajar con un archivo en C#, primero debe abrirlo. Abrir un archivo le da un objeto de flujo, como un StreamReader o StreamWriter, que usted lee o escribe. Cuando haya terminado, debe cerrar el archivo para que el sistema operativo pueda liberar sus recursos y se guarden las escrituras pendientes.

El problema al olvidar cerrar de cuerpo

Puede abrir un archivo con un StreamReader y cerrarlo con . Cerrar().
*/

/* using (StreamReader reader = new StreamReader("/8-files/notes.txt"))
{
    string contents = reader.ReadToEnd();
    Console.WriteLine(contents);
} */

/*
El problema es que si ocurre un error después de abrir el archivo, pero antes de cerrarlo, el archivo permanece abierto, lo que puede provocar pérdida de datos, archivos bloqueados o fugas de recursos.

Uso de la declaración de uso

La forma más segura de trabajar con archivos en C# es la declaración de uso. Se cierra automáticamente el archivo cuando el bloque termina, incluso si se produce un error.
*/

/* using (StreamReader reader = new StreamReader("/8-files/notes.txt"))
{
    string contents = reader.ReadToEnd();
    Console.WriteLine(contents);
} // File is automatically closed here */

// El C# moderno también admite una declaración de uso más corta que cierra el archivo al final del alcance de cierre, sin necesidad de sus propios frenos.

/* using StreamReader reader = new StreamReader("/8-files/notes.txt");
string contents = reader.ReadToEnd();
Console.WriteLine(contents); */
// File is automatically closed at the end of this block

/*
La clase de archivo: una opción aún más simple

Para muchas tareas comunes, la clase Archivo proporciona métodos estáticos que abren, leen o escriben y cierran un archivo en una sola llamada, sin necesidad de una instrucción de uso explícita.
*/

/* string contents = File.ReadAllText("/8-files/notes.txt");
Console.WriteLine(contents); */

/*
Un incumplimiento más seguro

Cualquiera que sea el enfoque que elijas, evita llamar. Close() usted mismo. Utilice el uso, o un método de archivo que lo maneje por usted.
*/