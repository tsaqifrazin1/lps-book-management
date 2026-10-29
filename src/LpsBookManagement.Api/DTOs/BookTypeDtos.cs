using System.ComponentModel.DataAnnotations;

namespace LpsBookManagement.Api.DTOs;

public record MasterJenisBukuDto(int Id, string MasterJenisBukuNama);
public record CreateMasterJenisBukuRequest(
    [Required]
    string MasterJenisBukuNama
    );
public record UpdateMasterJenisBukuRequest(
    [Required]
    string MasterJenisBukuNama
    );
