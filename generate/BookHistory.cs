namespace namespace LpsBookManagement.Api.Models;
;

public class BookHistory
{
    public long Id { get; set; }
    public int BukuId { get; set; }
    public string Action { get; set; }
    public string OldData { get; set; }
    public string NewData { get; set; }
    public DateTime TanggalPerubahan { get; set; }
}
