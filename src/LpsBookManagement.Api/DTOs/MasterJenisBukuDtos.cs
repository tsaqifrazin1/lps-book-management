using System.ComponentModel.DataAnnotations;

namespace LpsBookManagement.Api.DTOs;

public record MasterJenisBukuDto(int Id, string Nama);

public record CreateMasterJenisBukuRequest(
    [Required] string Nama
);

public record UpdateMasterJenisBukuRequest(
    [Required] string Nama
);