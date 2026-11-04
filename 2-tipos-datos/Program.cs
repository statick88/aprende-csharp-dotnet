/*using System.Threading.Tasks.Dataflow;

Console.WriteLine("Hello"); //string literal - uses double quotes
Console.WriteLine('H'); // char literal - uses single quote for ONE character
Console.WriteLine(42); // int literal - just a number
Console.WriteLine(3.14); // decimal literal - needs the decimal point
Console.WriteLine(true); // bool litearl - true or false

Console.WriteLine(4 + 9); //13
Console.WriteLine("1" + "23"); //123

// Declaracion de variables

string name = "Alice";
int age = 25;
//decimal temperature = 98,6;
bool isRaining = true;

Console.WriteLine(name, age, isRaining);

var name1 = "Alice";
var age1 = 24;
var price = 2.4;

Console.WriteLine(name1);
Console.WriteLine(age1);
Console.WriteLine(price);

// En este ejercicio, escribirá un programa de C# que crea valores literales y variables de diferentes tipos de datos y, 
// a continuación, los mostrará en la consola.
//Inicie el ejercicio y siga las instrucciones.

var nombreFirst = "Diego";
var nombreSecond = "Saavedra";
var age_2 = 38;

Console.WriteLine($"mi nombre es {nombreFirst}, mi apellido {nombreSecond} y tengo {age_2}");
Console.WriteLine(43.40M);
int x = 12.3m;
*/

//int score = 95;
//decimal price = 19.99m;
//double average = 87.5;

//int count = 10;
//count = "ten";     // ERROR! Can't assign a string to an int

/* int a = 7;
int b = 2;
Console.WriteLine(a / b);        // Output: 3 (integer division truncates)

decimal c = 7m;
decimal d = 2m;
Console.WriteLine(c / d);        // Output: 3.5 (keeps the decimal)

Console.WriteLine(10 % 2);   // Output: 0 (10 is even)
Console.WriteLine(11 % 2);   // Output: 1 (11 is odd) */

/* int standard = 2 + 3 * 4;      // Multiplication first: 14
int forced = (2 + 3) * 4;      // Parentheses first: 20
Console.WriteLine(standard);
Console.WriteLine(forced); */

//Operadores de asignación compuesta

/* int score = 50;
score = score + 10;    // Standard way: score is 60
score += 10;           // Shorthand: score is 70

Console.WriteLine(score); */

//Operadores de incremento y decremento

// int count = 5;
// count++;                       // Same as count = count + 1
// Console.WriteLine(count);      // Output: 6

// count--;                       // Same as count = count - 1
// Console.WriteLine(count);      // Output: 5

// La posición es importante: incremento previo frente al incremento posterior

// int a = 5;
// Console.WriteLine(a++);   // Output: 5 (uses old value, then increments)
// Console.WriteLine(a);     // Output: 6 (a was incremented)

// int b = 5;
// Console.WriteLine(++b);   // Output: 6 (increments first, then uses new value)
// Console.WriteLine(b);     // Output: 6

// División con enteros frente a decimales

// int result = 7 / 2;
// Console.WriteLine(result);     // Output: 3 (not 3.5)

// decimal result = 7m / 2m;
// Console.WriteLine(result);     // Output: 3.5

// converir tipos

// Console.Write("Enter your age: ");
// string ageInput = Console.ReadLine();
//int nextYear = ageInput + 1;    // ERROR! Can't add int to string

// Console.Write("Enter your age: ");
// string ageInput = Console.ReadLine();
// int age = Convert.ToInt32(ageInput);
// int nextYear = age + 1;
// Console.WriteLine($"Next year you'll be {nextYear}");

// Análisis de métodos

// int age = int.Parse("25");
// decimal price = decimal.Parse("19.99");
// double average = double.Parse("87.5");

// decimal price = 19.99m;
// int wholePrice = (int)price;         // Casts to int: 19 (decimal dropped)
// Console.WriteLine(wholePrice);       // Output: 19

// int first = 7;
// int second = 2;
// decimal result = (decimal)first / (decimal)second;
// Console.WriteLine(result);           // Output: 3.5

// int number = Convert.ToInt32("hello");    // ERROR: Input string was not in a correct format

// En este ejercicio, crearás una calculadora de propinas que acepta el importe de la cuenta y calcula la propina y el total a pagar.


// Console.Write("¿Cuánto es el total de tu cuenta? ");

// string? entrada = Console.ReadLine();

// decimal cuenta = decimal.Parse(entrada!);

// decimal propina = cuenta * 20 / 100;
// decimal total = cuenta + propina;

// Console.WriteLine($"La propina del 20% es: ${propina:F2}");
// Console.WriteLine($"El total a pagar es: ${total:F2}");

// En este ejercicio, escribe un programa que convierte una temperatura de Fahrenheit a Celsius.


// Console.Write("Introduce la temperatura en Fahrenheit: ");

// string? entrada = Console.ReadLine();

// decimal fahrenheit = decimal.Parse(entrada!);

// decimal celsius = (fahrenheit - 32m) * 5m / 9m;

// Console.WriteLine($"Temperatura en Fahrenheit: {fahrenheit:F2} °F");
// Console.WriteLine($"Temperatura en Celsius: {celsius:F2} °C");

int result = 3 + 1 * 5 / 2;
Console.WriteLine(result);