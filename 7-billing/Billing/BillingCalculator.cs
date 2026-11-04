
namespace Billing;

/// <summary>
/// Agrupa cálculos didácticos de facturación con valores decimales.
/// </summary>
public static class BillingCalculator
{
    /// <summary>
    /// Calcula el subtotal y le agrega el impuesto indicado.
    /// </summary>
    /// <param name="price">Precio unitario, expresado en unidades monetarias.</param>
    /// <param name="quantity">Cantidad de unidades del producto.</param>
    /// <param name="taxRate">
    /// Tasa como fracción decimal; por ejemplo, 0.15 representa el 15 %.
    /// El valor predeterminado es didáctico, no una regla tributaria vigente.
    /// </param>
    /// <returns>Subtotal más impuesto, sin redondear a dos decimales.</returns>
    /// <remarks>
    /// No valida valores negativos. El formato de presentación corresponde
    /// al código que llama al método, no a este cálculo.
    /// </remarks>
    /// <exception cref="System.OverflowException">
    /// Una operación produce un valor fuera del rango de decimal.
    /// </exception>
    public static decimal CalculateTotal(
        decimal price,
        int quantity,
        decimal taxRate = 0.15m)
    {
        decimal subtotal = price * quantity;
        decimal tax = subtotal * taxRate;

        return subtotal + tax;
    }
}

