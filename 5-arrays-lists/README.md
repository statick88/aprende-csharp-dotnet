# 5. Arreglos, listas y clasificación

[Volver al índice](../README.md)

## Objetivo y estado

Almacenar varias puntuaciones, ordenarlas y obtener las cinco mejores. Este programa sí está activo.

## Teoría

- `int[] top5 = new int[5]` crea un arreglo de longitud fija, con cinco ceros iniciales.
- `List<int>` permite agregar elementos con `Add`; su cantidad actual se consulta con `Count`.
- Los índices empiezan en cero; el último índice válido es `Length - 1` o `Count - 1`.
- `Sort()` ordena la lista de menor a mayor y `Reverse()` invierte ese orden; ambos modifican la lista.
- `Average()` y `Sum()` son métodos de extensión de LINQ disponibles con los imports implícitos del proyecto.

## Práctica actual

```bash
dotnet run --project 5-arrays-lists/5-arrays-lists.csproj
```

Se registran, en ese orden: `120, 350, 200, 500, 180, 420, 300, 250`. Primero se muestra la lista original; luego la clasificación y las estadísticas.

| Resultado | Valor esperado |
|---|---|
| Top 5 | 500, 420, 350, 300, 250 |
| Mejor puntuación | 500 |
| Peor puntuación | 120 |
| Promedio | 290, mostrado con dos decimales |
| Suma | 2320 |
| Cantidad | 8 |

El separador decimal del promedio depende de la cultura: puede verse `290.00` o `290,00`.

## Organización y límites

El proyecto referencia los ejecutables de variables y bucles, pero este código no usa miembros suyos. Una referencia de proyecto ayuda al compilador a resolver tipos; no ejecuta automáticamente el `Program.cs` de otro proyecto.

La copia al top 5 presupone al menos cinco puntuaciones. Con menos elementos podría acceder fuera del rango. No se ha cambiado esta regla ni se agregó soporte para listas pequeñas.

## Repaso

Explica por qué `top5.Length` es 5 mientras `puntuaciones.Count` es 8. Predice qué mostraría la clasificación sin `Reverse()`: empezaría por los valores más bajos. Son ejercicios propuestos, no pruebas implementadas.

Fuente: [Arreglos y listas](https://learn.microsoft.com/en-us/training/modules/csharp-arrays-lists/).
