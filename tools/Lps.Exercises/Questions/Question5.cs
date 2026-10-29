namespace Lps.Exercises.Questions;

public static class Question5
{
    public static IEnumerable<string> Generate(int n)
    {
        for (var i = 1; i <= n; i++)
        {
            if (i != 5 && i % 5 == 0)
                yield return "IDIC";
            else if (i != 6 && i % 6 == 0)
                yield return "LPS";
            else
                yield return i.ToString();
        }
    }
}
