# 1. Variables, entrada y salida

[Volver al índice](../README.md)

## Objetivo y estado

Comprender cómo almacenar texto y conversar con una persona desde la consola. El programa activo imprime un saludo, solicita el nombre y lo incluye en un mensaje.

## Teoría conectada con el código

- `Console.WriteLine` muestra texto y agrega un salto de línea; `Console.Write` no lo agrega.
- Un literal como `"Diego"` es texto; una variable como `name` almacena un valor.
- `Console.ReadLine()` devuelve `string?`: al terminar la entrada puede devolver `null`.
- `$"Mucho gusto {name}"` es interpolación: inserta el valor de la variable.
- `//` y `/* ... */` son comentarios; no se ejecutan.

## Práctica actual

Desde la raíz:

```bash
printf 'Ana\n' | dotnet run --project 1-variables/1-variables.csproj
```

Salida esperada; la segunda línea contiene un espacio:

```text
Hello, World!
Linea 1
 
Linea 2
Hola cual es tu nombre?
Que tiempo llevas trabajando aqui?
Mucho gusto Ana, mi nombre es Diego
```

La pregunta sobre tiempo de trabajo **no lee una respuesta**: el código solo hace una lectura, para el nombre. No asumas un formulario de dos preguntas.

## Variantes y errores para estudiar

Los bloques comentados ensayan color favorito y sumas. `int(Console.ReadLine())` no es una conversión válida en C#: estudia `int.TryParse` en la sección de bucles. Asignar `ReadLine()` a `string` puede producir una advertencia de nulabilidad; `string?` expresa la posibilidad de `null`.

## Repaso y comprobación

1. Cambia solo la entrada a otro nombre: debe cambiar el saludo, no las líneas anteriores.
2. Explica por qué escribir `name` sin comillas no equivale a escribir `"name"`.
3. Predice qué pasa con una línea vacía y con fin de entrada. Son ejercicios propuestos, no tests existentes.

No hay métodos propios para documentar con `///` en este programa; usa comentarios normales para las instrucciones de nivel superior.

Fuente: [Escribir el primer código de C#](https://learn.microsoft.com/en-us/training/modules/csharp-write-first/).
