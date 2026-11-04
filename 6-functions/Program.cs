// Calcular el IVA de un producto
// ========================================


/* decimal precio1 = 15.50m;
decimal precio2 = 20.00m;

decimal total1 = CalcularIVA(precio1);
decimal total2 = CalcularIVA(precio2);

Console.WriteLine($"IVA producto 1: {total1:F2}");
Console.WriteLine($"IVA producto 2: {total2:F2}");

static decimal CalcularIVA(decimal precio)
{
     return precio * 0.15m;
}*/

/* decimal numero1 = 25.50m;
decimal numero2 = 14.25m;

// TODO 1: Llamar al método Sumar.

decimal resultado = Sumar(numero1, numero2);

// TODO 2: Mostrar el resultado.
Console.WriteLine($"Suma: {resultado:F2}");

// TODO 3: Crear el método Sumar.
// Debe recibir dos parámetros decimal
// y devolver la suma mediante return.

static decimal Sumar(decimal num1, decimal num2)
{
    return num1 + num2;
} */

/* 
decimal precio2 = 15.50m;
/// TODO: Devolver la multiplicación
    return a * b;
}
*/

/* decimal resultado2 = Multiplicar(precio2, 2.5m);


static decimal Dividir(decimal a, decimal b)
{
    if (b == 0m)
    {
        throw new DivideByZeroException(
            "No se puede dividir entre cero."
        );
    }

    return a / b;
}



try
{
    decimal resultado3 = Dividir(precio2, 0m);
    Console.WriteLine($"División: {resultado3:F2}");
}
catch (DivideByZeroException ex)
{
    Console.WriteLine($"Error controlado: {ex.Message}");
}


Console.WriteLine($"Multiplicación: {resultado2:F2}");

decimal? resultado = null;

try
{
    resultado = Dividir(20m, 4m);
}
catch (DivideByZeroException ex)
{
    Console.WriteLine(ex.Message);
}

if (resultado.HasValue)
{
    Console.WriteLine($"Resultado: {resultado.Value:F2}");
} */


// Create methods with parameters

// Defining a method

/* void Greet()
{
    Console.WriteLine("Hello, world!");
}

Greet(); // Output: Hello, world! */

// Adding parameters

/* void Greet(string name)
{
    Console.WriteLine($"Hello, {name}!");
}

Greet("Alex"); // Output: Hello, Alex!
Greet("Sam");  // Output: Hello, Sam! */

/* void Greet(string name, string greeting)
{
    Console.WriteLine($"{greeting}, {name}!");
}

Greet("Alex", "Hi"); // Output: Hi, Alex! */

// Optional parameters with default values

/* void Greet(string name, string greeting = "Hello")
{
    Console.WriteLine($"{greeting}, {name}!");
}

Greet("Alex");             // Output: Hello, Alex!
Greet("Alex", "Welcome");  // Output: Welcome, Alex! 

// Named arguments

Greet(name: "Alex", greeting: "Welcome"); */

// Return values from methods

// Declaring a return type

/* int Add(int a, int b)
{
    return a + b;
}

int result = Add(3, 4);
Console.WriteLine(result); // Output: 7

Console.WriteLine(Add(10, 5) * 2); // Output: 30 */

// Void methods don't return a usable value

/* void Add(int a, int b)
{
    Console.WriteLine(a + b); // Shows the result, but doesn't return it
}

int x = Add(3, 4); // Compile error: Add doesn't return a value */

// Returning multiple values with tuples

/* (double x, double y) GetCoordinates()
{
    return (10.0, 20.0);
}

var (x, y) = GetCoordinates();
Console.WriteLine($"x: {x}, y: {y}"); // Output: x: 10, y: 20 */

// Manage variable scope

// Local variables

/* int CalculateTotal(int price, int tax)
{
    int total = price + tax; // total is local to this method
    return total;
}

CalculateTotal(10, 2);
Console.WriteLine(total); // Compile error: total doesn't exist here */

// Block scope

/* if (true)
{
    int message = 42;
    Console.WriteLine(message); // OK: message exists in this block
}

Console.WriteLine(message); // Compile error: message doesn't exist here */

// Organize code with namespaces

// Using code from the .NET class library

/* using System.Text;

StringBuilder builder = new StringBuilder();
builder.Append("Hello, ");
builder.Append("world!");
Console.WriteLine(builder.ToString()); // Output: Hello, world! */

// Organizing your own code with namespaces

/* using Calc = MathUtilities.Calculator;

Console.WriteLine(Calc.Add(2, 3)); // Output: 5

namespace MathUtilities
{
    class Calculator
    {
        public static int Add(int a, int b)
        {
            return a + b;
        }
    }
} */

/* using MathUtilities;

Console.WriteLine(Calculator.Add(2, 3)); // Output: 5 */

