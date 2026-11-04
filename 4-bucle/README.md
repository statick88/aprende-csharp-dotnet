# 4. Bucles y validación de entrada

[Volver al índice](../README.md)

## Objetivo y estado

Repetir acciones hasta cumplir una condición. El programa activo solicita intentos hasta adivinar el número fijo `7`.

## Teoría

| Instrucción | Cuándo usarla |
|---|---|
| `for` | Con inicio, condición y actualización definidos |
| `while` | Repetir mientras la condición sea verdadera; puede no entrar |
| `do ... while` | Ejecutar al menos una vez y luego evaluar |
| `foreach` | Recorrer los elementos de una colección |
| `break` | Terminar el bucle más cercano |
| `continue` | Pasar a la siguiente iteración |

`int.TryParse(entrada, out intento)` intenta convertir el texto y guarda el resultado en `intento`. La negación `!` entra a la rama de error cuando la conversión falla.

## Práctica actual

Desde la raíz:

```bash
printf 'hola\n5\n7\n' | dotnet run --project 4-bucle/4-bucle.csproj
```

Con entrada redirigida, la salida esperada es:

```text
Adivina el número: Introduce un número válido.
Adivina el número: Inténtalo nuevamente.
Adivina el número: ¡Ganaste!
```

El indicador usa `Write`, por eso el mensaje aparece en la misma línea. El número secreto no es aleatorio.

## Límites que debes conocer

Si se agota la entrada sin enviar `7`, `ReadLine()` devuelve `null`; `TryParse` falla y el bucle vuelve a pedir datos indefinidamente. No ejecutes esta práctica con entrada vacía ni con una tubería que no incluya el acierto. Este problema existente no se corrigió como parte de la documentación.

Los ejemplos comentados muestran `for`, `while`, `do-while`, `break` y `continue`. Algunas variantes leen texto y llaman `ToLower()` sin comprobar `null`; requieren revisión antes de activarlas.

## Repaso

- Entrada `7`: debe ganar en el primer intento.
- Entrada `hola, 5, 7`, una por línea: error de formato, intento incorrecto y acierto.
- ¿Por qué actualizar un contador antes de `continue` puede evitar un bucle infinito?

No hay tests automatizados existentes; consulta [las comprobaciones](../docs/PRUEBAS.md).

Fuente: [Repetir acciones con bucles](https://learn.microsoft.com/en-us/training/modules/csharp-repeat-actions-loops/).
