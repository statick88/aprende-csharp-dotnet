# Documentar código con comentarios XML `///`

[Volver al índice](../README.md)

La documentación XML describe el contrato de clases y miembros para quienes los utilizan. Su sintaxis pertenece a C#; el contenido que escribes es documentación de tu proyecto, no una publicación oficial de Microsoft.

## Ejemplo real del curso

Consulta [BillingCalculator.cs](../7-billing/Billing/BillingCalculator.cs). Se documentan:

| Etiqueta | Qué explica |
|---|---|
| `<summary>` | Propósito del tipo o miembro |
| `<param name="price">` | Significado del parámetro; el nombre debe coincidir con la firma |
| `<returns>` | Valor retornado, sin confundirlo con texto impreso |
| `<remarks>` | Límites, supuestos y detalles útiles |
| `<exception cref="OverflowException">` | Una excepción que sí puede producir la operación |
| `<see cref="decimal"/>`, `<c>F2</c>` | Referencias a tipos y fragmentos de código |

No agregues `<exception>` para validaciones inexistentes. Por ejemplo, `CalculateTotal` no lanza una excepción deliberada para rechazar cantidades negativas.

## Cuándo usar cada forma

- `README.md`: teoría, cómo ejecutar, ejemplos, fuentes y ejercicios.
- `//`: explicar una decisión puntual o una instrucción de nivel superior.
- `/* ... */`: conservar temporalmente un bloque didáctico; no cuenta como código ejecutado.
- `///`: inmediatamente antes de una declaración de clase o miembro documentable. No lo uses para decorar cada `Console.WriteLine`.

Los identificadores de API se conservan: traduce “archivo” en la explicación, pero escribe `File` en el código, no `Archivo`. Lo mismo aplica a `using`, `Close()` y `StreamReader`.

## Generar y comprobar el XML

Desde la raíz:

```bash
dotnet build 7-billing/7-billing.csproj -p:GenerateDocumentationFile=true
```

El XML se genera normalmente en `7-billing/bin/Debug/net10.0/7-billing.xml`. La compilación ayuda a detectar XML mal formado, parámetros mal nombrados y referencias inválidas. No produce por sí sola un sitio web de documentación ni demuestra que el contrato descrito sea correcto: hay que contrastarlo con código y pruebas.

## Lista de revisión

- [ ] El resumen explica para qué sirve el método.
- [ ] Cada parámetro tiene unidades y formato cuando corresponde.
- [ ] El retorno describe el valor real, incluido el redondeo o su ausencia.
- [ ] Las excepciones descritas pueden ocurrir de verdad.
- [ ] Los ejemplos no prometen validaciones que no existen.

Referencia oficial: [Comentarios de documentación XML de C#](https://learn.microsoft.com/es-es/dotnet/csharp/language-reference/xmldoc/).
