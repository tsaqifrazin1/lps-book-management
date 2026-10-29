using System.ComponentModel.DataAnnotations;

namespace LpsBookManagement.Api.DTOs;

public record BukuDto(
    int Id,
    string Judul,
    string Penulis,
    int JenisBukuId,
    string JenisBukuNama,
    DateOnly TanggalRilis,
    int JumlahHalaman);

public record CreateBukuRequest(
    [Required]
    string Judul,
    string Penulis,
    int JenisBukuId,
    DateOnly TanggalRilis,
    int JumlahHalaman);

public record UpdateBukuRequest(
    string Judul,
    string Penulis,
    int JenisBukuId,
    DateOnly TanggalRilis,
    int JumlahHalaman);
