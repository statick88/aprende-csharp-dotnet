// Store and manage data with arrays

// Creating an array
/* using System.Drawing;

string[] colors = { "red", "green", "blue" };
int[] scores = new int[4]; */

// Accessing items by index

/* string[] colors = { "red", "green", "blue" };
Console.WriteLine(colors[0]); // Output: red
Console.WriteLine(colors[2]); // Output: blue
 */

// The fixed size of an array

/* string[] colors = { "red", "green", "blue" };
colors[0] = "purple"; // Replaces "red" with "purple"
Console.WriteLine(colors[0]); // Output: purple

Console.WriteLine(colors.Length); // Output: 3 */

// Iterating over an array

/* int[] scores = { 95, 82, 76, 91 };

foreach (int score in scores)
{
    Console.WriteLine(score);
} */


/*
 * Microsoft Learn - Foundational C#
 * Ejercicio: Top 5 Leaderboard
 * Objetivo: List<int>, int[], for, Sort y Reverse
 */

// ========================================
// 1. DECLARAR COLECCIONES
// ========================================

List<int> puntuaciones = new List<int>();
int[] top5 = new int[5];

// ========================================
// 2. REGISTRAR PUNTUACIONES
// ========================================

puntuaciones.Add(120);
puntuaciones.Add(350);
puntuaciones.Add(200);
puntuaciones.Add(500);
puntuaciones.Add(180);
puntuaciones.Add(420);
puntuaciones.Add(300);
puntuaciones.Add(250);

// ========================================
// 3. MOSTRAR PUNTUACIONES
// ========================================

Console.WriteLine("=== PUNTUACIONES ===");

for (int i = 0; i < puntuaciones.Count; i++)
{
    Console.WriteLine(
        $"Puntuación {i + 1}: {puntuaciones[i]} puntos"
    );
}

// ========================================
// 4. ORDENAR PUNTUACIONES
// ========================================

puntuaciones.Sort();
puntuaciones.Reverse();

// ========================================
// 5. COPIAR LAS 5 MEJORES
// ========================================

for (int i = 0; i < top5.Length; i++)
{
    top5[i] = puntuaciones[i];
}

// ========================================
// 6. MOSTRAR CLASIFICACIÓN
// ========================================

Console.WriteLine("\n=== TOP 5 ===");

for (int i = 0; i < top5.Length; i++)
{
    Console.WriteLine(
        $"{i + 1}. {top5[i]} puntos"
    );
}

// ========================================
// 7. MOSTRAR ESTADÍSTICAS
// ========================================

Console.WriteLine("\n=== ESTADÍSTICAS ===");

Console.WriteLine($"Mejor puntuación: {puntuaciones[0]}");

Console.WriteLine(
    $"Peor puntuación: {puntuaciones[puntuaciones.Count - 1]}"
);

Console.WriteLine(
    $"Promedio de puntuaciones: {puntuaciones.Average():F2}"
);

Console.WriteLine(
    $"Suma de puntuaciones: {puntuaciones.Sum()}"
);

Console.WriteLine(
    $"Cantidad de puntuaciones: {puntuaciones.Count}"
);
