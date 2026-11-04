# 2. Tipos de datos y operaciones

[Volver al índice](../README.md)

## Objetivo y estado

Distinguir datos de texto, números y valores booleanos. Casi toda la sección son ejemplos comentados; el programa activo evalúa `3 + 1 * 5 / 2`.

## Teoría

| Tipo o expresión | Uso y cuidado |
|---|---|
| `string`, `char` | Texto y un carácter, respectivamente: `"Hola"` y `'H'` |
| `int` | Enteros; `7 / 2` produce `3` |
| `double` | Punto flotante; `3.14` es `double`, no `decimal` |
| `decimal` | Cálculos decimales; usa sufijo `m`, como `19.99m` |
| `bool` | `true` o `false`, sin comillas |
| `var` | El compilador infiere un tipo fijo; no vuelve dinámica la variable |
| `%` | Residuo de una división, no cálculo de porcentaje |

Multiplicación y división tienen igual prioridad y se evalúan de izquierda a derecha. En `3 + 1 * 5 / 2`: `1 * 5 = 5`, `5 / 2 = 2` por división entera y `3 + 2 = 5`.

## Práctica actual

```bash
dotnet run --project 2-tipos-datos/2-tipos-datos.csproj
```

Salida exacta: una línea con `5`.

## Variantes comentadas

Hay apuntes de incremento previo y posterior, asignación compuesta, conversión, propina del 20 % y conversión de Fahrenheit a Celsius. No están activos.

- `Parse` devuelve el número o lanza una excepción si la entrada no corresponde.
- `TryParse` informa éxito mediante un `bool`, sin lanzar una excepción de formato por texto inválido.
- Un cast explícito de `decimal` a `int` descarta la parte fraccionaria; no redondea.
- En código fuente se usa punto decimal: `98.6m`, no `98,6`.
- El formato `F2` muestra dos decimales; no cambia el valor almacenado y usa la cultura actual.
- El operador `!` de `entrada!` silencia el análisis de nulabilidad; no impide que llegue `null`.

El comentario original que llama “decimal” a `3.14` es impreciso. También hay ejemplos intencionalmente inválidos como `int x = 12.3m;`; no actives todos los bloques juntos.

## Repaso

Predice `7 / 2`, `7m / 2m`, `"1" + "23"` y `(2 + 3) * 4`: resultados `3`, `3.5`, `"123"` y `20`. Son preguntas de estudio, no tests automatizados implementados.

Fuente: [Operaciones numéricas](https://learn.microsoft.com/en-us/training/modules/csharp-basic-operations/).
