using LpsBookManagement.Api.DTOs;
using LpsBookManagement.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace LpsBookManagement.Api.Controllers;

[ApiController]
[Route("api/book-types")]
public class MasterJenisBukuController(IMasterJenisBukuService service) : ControllerBase
{
    [HttpGet]
    public Task<List<MasterJenisBukuDto>> GetAll(CancellationToken ct)
    {
        return service.GetAllAsync(ct);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> Get(int id, CancellationToken ct)
    {
        return await service.GetAsync(id, ct) is { } item ? Ok(item) : NotFound();
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateMasterJenisBukuRequest request, CancellationToken ct)
    {
        var bookType = await service.CreateAsync(request, ct);

        return CreatedAtAction(nameof(Get), new { id = bookType.Id }, bookType);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, UpdateMasterJenisBukuRequest request, CancellationToken ct)
    {
        return await service.UpdateAsync(id, request, ct) ? NoContent() : NotFound();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id, CancellationToken ct)
    {
        return await service.DeleteAsync(id, ct) ? NoContent() : NotFound();
    }
}