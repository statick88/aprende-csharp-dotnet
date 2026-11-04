
using Billing;

decimal price = 10.99m;
int quantity = 5;

// Utilizar impuesto predeterminado del 15 %
decimal total = BillingCalculator.CalculateTotal(
    price,
    quantity
);

// Utilizar impuesto personalizado del 12 %
decimal totalPersonalizado = BillingCalculator.CalculateTotal(
    price,
    quantity,
    taxRate: 0.12m
);

Console.WriteLine("=== CALCULADORA DE FACTURACIÓN ===");
Console.WriteLine($"Subtotal: ${price * quantity:F2}");
Console.WriteLine($"Total con 15%: ${total:F2}");
Console.WriteLine($"Total con 12%: ${totalPersonalizado:F2}");


