// Choose between for, while, and do-while loops

// The for loop (known number of repetitions)

/* for (int i = 0; i < 5; i++)
{
    Console.WriteLine(i);
} */

// The while loop

/* int health = 3;

while (health > 0)
{
    Console.WriteLine($"Player is alive. Health: {health}");
    health--;
} */

// Avoid infinite loops

/* int attempts = 0;

do
{
    attempts++;
    Console.WriteLine($"Attempt number {attempts}");
}
while (attempts < 3); */

// Controlling loop execution with break and continue

// Break: exit the loop early

/* for (int count = 0; count < 10; count++)
{
    if (count == 5)
    {
        break;
    }
    Console.WriteLine(count);
}

Console.WriteLine("Loop ended."); */

// Continue: skip to the next iteration

/* for (int count = 0; count < 6; count++)
{
    if (count == 3)
    {
        continue;
    }
    Console.WriteLine(count);
} */

// Managing while loops with break

/* while (true)
{
    Console.Write("Type 'exit' to stop the loop: ");
    string userInput = Console.ReadLine();

    if (userInput.ToLower() == "exit")
    {
        break;
    }

    Console.WriteLine($"You entered: {userInput}");
}

Console.WriteLine("Goodbye!"); */

// Using continue in while loops

/* int currentSlot = 0;

while (currentSlot < 5)
{
    currentSlot++; // Crucial: the update happens before the continue check

    if (currentSlot == 3)
    {
        Console.WriteLine($"Skipping item slot {currentSlot}.");
        continue;
    }

    Console.WriteLine($"Successfully processed item in slot {currentSlot}.");
}

Console.WriteLine("Inventory scan complete!"); */

// Ejercicio: Crear un juego de adivinar el número


/* int contador = 1;

while (contador <= 5)
{
    Console.WriteLine($"Número: {contador}");
    contador++;
}

Console.WriteLine("¡Bucle terminado!"); */


int numeroSecreto = 7;
int intento = 0;

while (intento != numeroSecreto)
{
    Console.Write("Adivina el número: ");

    string? entrada = Console.ReadLine();

    if (!int.TryParse(entrada, out intento))
    {
        Console.WriteLine("Introduce un número válido.");
        continue;
    }

    if (intento == numeroSecreto)
    {
        Console.WriteLine("¡Ganaste!");
        break;
    }
    else
    {
        Console.WriteLine("Inténtalo nuevamente.");
    }
}
