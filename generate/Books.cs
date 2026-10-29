namespace namespace LpsBookManagement.Api.Models;
;

public class Books
{
    public int Id { get; set; }
    public string Judul { get; set; }
    public string Penulis { get; set; }
    public int JenisBukuId { get; set; }
    public DateOnly TanggalRilis { get; set; }
    public int JumlahHalaman { get; set; }
}
