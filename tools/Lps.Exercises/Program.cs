using Lps.Exercises.Questions;

var characterCounts = Question4.CountCharacters("hello world");

Console.WriteLine("Test 4:");
foreach (var item in characterCounts)
    Console.WriteLine($"{item}");

Console.WriteLine("\nTest 5:");
Console.WriteLine(string.Join(" ", Question5.Generate(20)));