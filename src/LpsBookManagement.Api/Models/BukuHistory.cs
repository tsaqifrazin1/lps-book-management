namespace LpsBookManagement.Api.Models;

public class BukuHistory
{
    public long Id { get; set; }
    public int BukuId { get; set; }
    public string Action { get; set; } = string.Empty;
    public string? OldData { get; set; }
    public string? NewData { get; set; }
    public DateTime TanggalPerubahan { get; set; }
}
