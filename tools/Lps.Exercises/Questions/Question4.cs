namespace Lps.Exercises.Questions;

public static class Question4
{
    public static IEnumerable<string> CountCharacters(string input)
    {
        var counts = new Dictionary<char, int>();

        foreach (var c in input)
        {
            if (c == ' ') continue;
            counts[c] = counts.GetValueOrDefault(c) + 1;
        }

        return counts.Select(x => $"{x.Key}-{x.Value}");
    }
}
