using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PDV.API.Data;

namespace PDV.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RelatorioController : ControllerBase
    {
        private readonly AppDbContext _context;

        public RelatorioController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("vendas")]
        public async Task<IActionResult> GetRelatorioVendas([FromQuery] DateTime inicio, [FromQuery] DateTime fim)
        {
            var relatorio = await _context.ItensVenda
                .Include(i => i.Produto)
                .Include(i => i.Venda)
                .Where(i => i.Venda.Data >= inicio && i.Venda.Data <= fim && i.Venda.Ativo)
                .GroupBy(i => new { i.ProdutoId, i.Produto.Nome })
                .Select(g => new
                {
                    ProdutoId = g.Key.ProdutoId,
                    Produto = g.Key.Nome,
                    Quantidade = g.Sum(i => i.Quantidade),
                    Total = g.Sum(i => i.Quantidade * i.PrecoUnitario)
                })
                .ToListAsync();

            return Ok(relatorio);
        }

    }

}
