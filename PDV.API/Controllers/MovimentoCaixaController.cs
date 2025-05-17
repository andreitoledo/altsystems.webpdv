using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PDV.API.Data;
using PDV.API.Models;
using PDV.API.DTOs;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace PDV.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MovimentoCaixaController : ControllerBase
    {
        private readonly AppDbContext _context;

        public MovimentoCaixaController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var movimentos = await _context.MovimentosCaixa
                .OrderByDescending(m => m.Data)
                .ToListAsync();
            return Ok(movimentos);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] MovimentoCaixaDto dto)
        {
            var movimento = new MovimentoCaixa
            {
                Data = DateTime.Now,
                Valor = dto.Valor,
                Tipo = dto.Tipo,
                Descricao = dto.Descricao
            };

            _context.MovimentosCaixa.Add(movimento);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(Get), new { id = movimento.Id }, movimento);
        }
    }
}