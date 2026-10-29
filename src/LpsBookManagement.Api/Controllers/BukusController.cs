using System.Text;
using LpsBookManagement.Api.DTOs;
using LpsBookManagement.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace LpsBookManagement.Api.Controllers;

[ApiController]
[Route("api/books")]
public class BukusController(IBukuService service) : ControllerBase
{
    [HttpGet]
    public Task<List<BukuDto>> GetAll([FromQuery] string? search, CancellationToken ct) =>
        service.SearchAsync(search, ct);

    [HttpGet("{id:int}")]
    public async Task<IActionResult> Get(int id, CancellationToken ct) =>
        await service.GetAsync(id, ct) is { } item ? Ok(item) : NotFound();

    [HttpPost]
    public async Task<IActionResult> Create(CreateBukuRequest request, CancellationToken ct)
    {
        var book =  await service.CreateAsync(request, ct);
        return CreatedAtAction(nameof(Get), new { id = book.Id }, book);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, UpdateBukuRequest request, CancellationToken ct) =>
        await service.UpdateAsync(id, request, ct) ? NoContent() : NotFound();

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id, CancellationToken ct) =>
        await service.DeleteAsync(id, ct) ? NoContent() : NotFound();

    [HttpGet("export")]
    public async Task<IActionResult> Export([FromQuery] string? search, CancellationToken ct)
    {
        var csv = await service.ExportCsvAsync(search, ct);
        return File(Encoding.UTF8.GetBytes(csv), "text/csv", "books.csv");
    }
}
