# 7. Práctica integradora: facturación

[Volver al índice](../README.md)

## Objetivo y estado

Combinar `decimal`, parámetros, retorno, argumentos opcionales y un espacio de nombres. El proyecto está activo y separa la presentación en `Program.cs` del cálculo en `Billing/BillingCalculator.cs`.

## Teoría y contrato actual

`BillingCalculator.CalculateTotal(price, quantity, taxRate = 0.15m)` es un método público estático. No necesitas crear una instancia para llamarlo.

```text
subtotal = price × quantity
impuesto = subtotal × taxRate
total = subtotal + impuesto
```

La tasa se expresa como fracción: `0.15m` representa 15 %, no `15m`. El 15 % es un valor didáctico del programa, **no una validación de la normativa tributaria vigente en Ecuador**.

## Práctica actual

```bash
dotnet run --project 7-billing/7-billing.csproj
```

Para precio `10.99m` y cantidad `5`:

```text
=== CALCULADORA DE FACTURACIÓN ===
Subtotal: $54.95
Total con 15%: $63.19
Total con 12%: $61.54
```

El separador decimal depende de la cultura. El resultado matemático interno con 15 % es `63.1925m` y con 12 % es `61.544m`. `F2` redondea la **presentación**, pero el método no redondea el valor retornado.

## Documentación XML real

En [BillingCalculator.cs](Billing/BillingCalculator.cs) se describen la clase, el método, cada parámetro y el resultado mediante `///`. Es documentación propia con el formato oficial de C#, no texto oficial redactado por Microsoft.

## Límites y repaso

El método no rechaza precios, cantidades o tasas negativas. No prometas validación que no existe. Una operación `decimal` fuera de rango puede lanzar `OverflowException`.

Casos propuestos para una futura suite: tasa predeterminada → `63.1925m`; tasa `0.12m` → `61.544m`; cantidad cero → `0m`; tasa cero → subtotal. No hay xUnit, NUnit ni MSTest instalados en el proyecto y estos casos no se presentan como pruebas existentes.

Fuente: [Métodos con parámetros](https://learn.microsoft.com/en-us/training/modules/create-c-sharp-methods-parameters/).
