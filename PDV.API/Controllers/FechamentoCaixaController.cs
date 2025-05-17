using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PDV.API.Data;
using PDV.API.Models;
using PDV.API.DTOs;

namespace PDV.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FechamentoCaixaController : ControllerBase
    {
        private readonly AppDbContext _context;

        public FechamentoCaixaController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var lista = await _context.FechamentosCaixa.OrderByDescending(f => f.Data).ToListAsync();
            return Ok(lista);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] FechamentoCaixaDto dto)
        {
            var movimentos = await _context.MovimentosCaixa
                .Where(m => m.Data.Date == DateTime.Today)
                .ToListAsync();

            var totalEntradas = movimentos.Where(m => m.Tipo == "Entrada").Sum(m => m.Valor);
            var totalSaidas = movimentos.Where(m => m.Tipo == "Saída").Sum(m => m.Valor);

            var fechamento = new FechamentoCaixa
            {
                TotalEntradas = totalEntradas,
                TotalSaidas = totalSaidas,
                SaldoFinal = totalEntradas - totalSaidas,
                Responsavel = dto.Responsavel
            };

            _context.FechamentosCaixa.Add(fechamento);
            await _context.SaveChangesAsync();

            return Ok(fechamento);
        }
    }
}