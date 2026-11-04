# 3. Condiciones y reglas de negocio

[Volver al índice](../README.md)

## Objetivo y estado

Elegir una acción mediante expresiones booleanas. El programa activo calcula un aviso de renovación con un número aleatorio de días y después imprime dos operaciones aritméticas.

## Teoría

- `if`, `else if` y `else` forman una cadena: se ejecuta la primera rama verdadera.
- `==` compara; `=` asigna. `>=` y `<=` incluyen los límites.
- `&&` exige ambas condiciones; `||` admite cualquiera; `!` invierte el valor lógico.
- `&&` y `||` usan cortocircuito: pueden omitir el operando derecho.
- `random.Next(0, 15)` incluye `0` y excluye `15`: los resultados posibles son de 0 a 14.

## Práctica actual

```bash
dotnet run --project 3-condiciones/3-condiciones.csproj
```

La primera línea tiene la forma `Días restantes: N`. No esperes una salida idéntica en ejecuciones distintas.

| Días | Mensaje principal exacto | Descuento adicional |
|---|---|---|
| 0 | `Tu suscripción ha expirado.` | Ninguno |
| 1 | `¡Tu suscripción expira mañana!` | `Descuento disponible: 20%` |
| 2 a 5 | `Tu suscripción expira en N días.` | `Descuento disponible: 10%` |
| 6 a 10 | `Tu suscripción expira en N días. ¡No olvides renovarla!` | Ninguno |
| 11 a 14 | `Tu suscripción todavía está vigente.` | Ninguno |

Al final siempre se imprimen `5` y `0`, cada uno en su línea, por las expresiones de aritmética entera que permanecen activas.

## Apuntes comentados

Incluyen acceso con boleto, condiciones anidadas, operadores lógicos y un juego de tres dados. No forman parte de la ejecución actual. `Next(1, 7)` genera de 1 a 6.

## Repaso y pruebas

Revisa los límites 0, 1, 2, 5, 6, 10, 11 y 14. Una ejecución aleatoria **no prueba todas las ramas**. Para una futura prueba determinista convendría separar la regla de renovación de la generación aleatoria; esa extracción no se implementó en esta documentación.

Pregunta: ¿qué cambia si la condición de 2 a 5 usa `||` en lugar de `&&`? Aceptaría valores fuera del intervalo.

Fuente: [Agregar decisiones](https://learn.microsoft.com/en-us/training/modules/csharp-if-elseif-else/).
