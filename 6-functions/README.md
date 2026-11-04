# 6. Métodos, alcance y espacios de nombres

[Volver al índice](../README.md)

## Objetivo y estado

Reutilizar lógica con métodos que reciben parámetros y devuelven valores. **Todo el código está comentado**: el proyecto es un apunte, no una aplicación ejecutable actualmente.

```bash
dotnet build 6-functions/6-functions.csproj
```

Resultado comprobado: error `CS5001`, porque no existe un punto de entrada activo. No es un test que haya pasado.

## Teoría conectada con los apuntes

| Tema | Qué debes poder explicar |
|---|---|
| Parámetro y argumento | El parámetro se declara en el método; el argumento se entrega al llamarlo |
| `void` | El método no entrega un valor utilizable en una asignación |
| `return` | Devuelve un resultado compatible con el tipo declarado |
| Parámetro opcional | Tiene un valor predeterminado si se omite el argumento |
| Argumento con nombre | Permite escribir `greeting: "Welcome"` |
| Tupla | Agrupa varios valores, por ejemplo `(double x, double y)` |
| Alcance | Una variable local no está disponible fuera de su método o bloque |
| `namespace` | Agrupa tipos y ayuda a evitar colisiones de nombres |

## Prácticas conservadas

Hay ejemplos de IVA, suma, saludo, división protegida, tuplas, alcance, `StringBuilder` y espacios de nombres. Algunos fragmentos muestran errores didácticos deliberados o están incompletos. No elimines todos los comentarios de golpe: habría nombres repetidos y fragmentos sin contexto.

Para ver una práctica equivalente que sí funciona, ejecuta [la sección de facturación](../7-billing/README.md). Allí `CalculateTotal` tiene parámetros, retorno, argumento opcional, espacio de nombres y documentación XML real.

## Repaso propuesto

En una copia aislada de la práctica, activa un ejemplo completo a la vez:

- `Sumar(25.50m, 14.25m)` debe devolver `39.75m`.
- `Add(3, 4)` debe devolver `7` si activas su bloque con retorno.
- `Dividir(20m, 4m)` debe devolver `5m`; dividir entre cero en ese ejemplo lanza `DivideByZeroException` con el mensaje `No se puede dividir entre cero.`.

Estas expectativas **no son tests implementados ni ejecutados**. El código comentado no proporciona cobertura de pruebas.

## Documentación del código

Los métodos locales de estos apuntes no se exponen como miembros públicos de una biblioteca. No pegues `///` encima de cada instrucción: usa la guía para documentar declaraciones reales de tipos y miembros.

Fuente: [Código reutilizable](https://learn.microsoft.com/en-us/training/modules/csharp-reusable-code/).
