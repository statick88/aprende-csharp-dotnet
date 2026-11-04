//Evaluación de condiciones con expresiones booleanas

// Expresiones booleanas

// bool isGameOver = true;
// bool isWinner = false;

// Console.WriteLine(isGameOver);
// Console.WriteLine(isWinner);

// Instrucción If

// int total = 17;

// if (total >= 15)
// {
//     Console.WriteLine("You win!"); //You win!
// }

// Controla el flujo del código con if, else if y else

// Adición de una ruta de acceso alternativa con else

// int total = 17;

// if (total >= 15)
// {
//     Console.WriteLine("You win!");
// }
// else
// {
//     Console.WriteLine("Sorry, you lose.");
// }

// Encadenar condiciones con else if

// int total = 12;

// if (total >= 16)
// {
//     Console.WriteLine("You win a new car!");
// }
// else if (total >= 10)
// {
//     Console.WriteLine("You win a new laptop!");
// }
// else if (total == 7)
// {
//     Console.WriteLine("You win a trip for two!");
// }
// else
// {
//     Console.WriteLine("You win a kitten!");
// }

// Anidación de instrucciones if

// bool hasTicket = true;
// int age = 16;

// if (hasTicket)
// {
//     if (age >= 18)
//     {
//         Console.WriteLine("Entry granted.");
//     }
//     else
//     {
//         Console.WriteLine("Minors must be accompanied by an adult.");
//     }
// }

// Combinación de condiciones con operadores lógicos

// Uso de && (todas las condiciones deben cumplirse)

// int age = 20;
// bool hasTicket = true;

// if (age >= 18 && hasTicket)
// {
//     Console.WriteLine("Entry granted.");
// }
// else
// {
//     Console.WriteLine("Entry denied.");
// }

// Uso de || (se debe cumplir al menos una condición)

// bool isWeekend = false;
// bool isHoliday = true;

// if (isWeekend || isHoliday)
// {
//     Console.WriteLine("The office is closed.");
// }

// Uso de ! (invertir una condición)

// bool isLoggedIn = false;

// if (!isLoggedIn)
// {
//     Console.WriteLine("Please log in to continue.");
// }

// Operadores de combinación

// int roll1 = 6, roll2 = 6, roll3 = 5;

// if ((roll1 == roll2) || (roll2 == roll3) || (roll1 == roll3))
// {
//     Console.WriteLine("You rolled doubles!");
// }

// Laboratorio C# — Creación de un juego de dados

// Random random = new Random();

// int dado1 = random.Next(1, 7);
// int dado2 = random.Next(1, 7);
// int dado3 = random.Next(1, 7);

// int total = dado1 + dado2 + dado3;

// Console.WriteLine($"Dados: {dado1}, {dado2}, {dado3}");

// if (dado1 == dado2 && dado2 == dado3)
// {
//     total += 6;
//     Console.WriteLine("¡Tres iguales! +6 puntos.");
// }
// else if (dado1 == dado2 || dado1 == dado3 || dado2 == dado3)
// {
//     total += 2;
//     Console.WriteLine("¡Dos iguales! +2 puntos.");
// }
// else
// {
//     Console.WriteLine("Todos los dados son diferentes.");
// }

// Console.WriteLine($"Puntuación total: {total}");

// Desafío: mostrar un mensaje de renovación de suscripción

// En este ejercicio, escribirá un programa que muestra un mensaje de renovación de suscripción basado en reglas de negocios.


Random random = new Random();

int diasRestantes = random.Next(0, 15);
int descuento = 0;

Console.WriteLine($"Días restantes: {diasRestantes}");

if (diasRestantes == 0)
{
    Console.WriteLine("Tu suscripción ha expirado.");
}
else if (diasRestantes == 1)
{
    descuento = 20;
    Console.WriteLine("¡Tu suscripción expira mañana!");
}
else if (diasRestantes >= 2 && diasRestantes <= 5)
{
    descuento = 10;
    Console.WriteLine($"Tu suscripción expira en {diasRestantes} días.");
}
else if (diasRestantes >= 6 && diasRestantes <= 10)
{
    Console.WriteLine($"Tu suscripción expira en {diasRestantes} días. ¡No olvides renovarla!");
}
else
{
    Console.WriteLine("Tu suscripción todavía está vigente.");
}

if (descuento > 0)
{
    Console.WriteLine($"Descuento disponible: {descuento}%");
}

int result = 3 + 1 * 5 / 2;
Console.WriteLine(result);
Console.WriteLine(5 / 10);