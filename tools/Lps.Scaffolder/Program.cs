using Npgsql;
using System.Text;

if (args.Length < 2)
{
    Console.WriteLine(
        "Usage: Lps.Scaffolder <connection-string> <output-directory>");
    return;
}

var connectionString = args[0];
var outputDirectory = args[1];

Directory.CreateDirectory(outputDirectory);

await using var connection = new NpgsqlConnection(connectionString);
await connection.OpenAsync();

const string sql = """
                   SELECT
                       table_name,
                       column_name,
                       data_type,
                       character_maximum_length
                   FROM information_schema.columns
                   WHERE table_schema = 'public'
                   ORDER BY table_name, ordinal_position;
                   """;

await using var command = new NpgsqlCommand(sql, connection);
await using var reader = await command.ExecuteReaderAsync();

var tables = new Dictionary<
    string,
    List<(string Name, string Type, int? Length)>
>();

while (await reader.ReadAsync())
{
    var tableName = reader.GetString(0);
    var columnName = reader.GetString(1);
    var dataType = reader.GetString(2);

    int? length = reader.IsDBNull(3)
        ? null
        : reader.GetInt32(3);

    if (!tables.TryGetValue(tableName, out var columns))
    {
        columns = [];
        tables[tableName] = columns;
    }

    columns.Add((columnName, dataType, length));
}

foreach (var (tableName, columns) in tables)
{
    var className = ToPascalCase(tableName);

    var code = new StringBuilder();

    code.AppendLine("namespace namespace LpsBookManagement.Api.Models;\n;");
    code.AppendLine();
    code.AppendLine($"public class {className}");
    code.AppendLine("{");

    foreach (var column in columns)
    {
        var propertyName = ToPascalCase(column.Name);
        var csharpType = MapToCSharpType(column.Type);

        code.AppendLine(
            $"    public {csharpType} {propertyName} {{ get; set; }}"
        );
    }

    code.AppendLine("}");

    var filePath = Path.Combine(
        outputDirectory,
        $"{className}.cs"
    );

    await File.WriteAllTextAsync(
        filePath,
        code.ToString()
    );

    Console.WriteLine($"Generated: {filePath}");
}

static string MapToCSharpType(string postgresType)
{
    return postgresType switch
    {
        "integer" => "int",
        "bigint" => "long",
        "smallint" => "short",
        "boolean" => "bool",
        "date" => "DateOnly",
        "timestamp without time zone" => "DateTime",
        "timestamp with time zone" => "DateTime",
        "numeric" => "decimal",
        "real" => "float",
        "double precision" => "double",
        "uuid" => "Guid",
        "json" => "string",
        "jsonb" => "string",
        "text" => "string",
        "character varying" => "string",
        "character" => "string",
        _ => "string"
    };
}

static string ToPascalCase(string value)
{
    return string.Concat(
        value
            .Split(
                '_',
                StringSplitOptions.RemoveEmptyEntries
            )
            .Select(part =>
                char.ToUpperInvariant(part[0]) + part[1..])
    );
}