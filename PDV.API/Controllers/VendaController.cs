using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PDV.API.Data;
using PDV.API.DTOs;
using PDV.API.Models;

namespace PDV.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VendaController : ControllerBase
    {
        private readonly AppDbContext _context;

        public VendaController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult Post([FromBody] VendaDto dto)
        {
            var cliente = _context.Clientes.FirstOrDefault(c => c.Id == dto.ClienteId && c.Ativo);
            if (cliente == null)
                return BadRequest("Cliente inválido ou inativo.");

            var itens = new List<ItemVenda>();
            foreach (var itemDto in dto.Itens)
            {
                var produto = _context.Produtos.FirstOrDefault(p => p.Id == itemDto.ProdutoId && p.Ativo);
                if (produto == null)
                    return BadRequest($"Produto ID {itemDto.ProdutoId} inválido.");

                if (produto.EstoqueAtual < itemDto.Quantidade)
                    return BadRequest($"Estoque insuficiente para o produto: {produto.Nome}");

                produto.EstoqueAtual -= itemDto.Quantidade;

                itens.Add(new ItemVenda
                {
                    ProdutoId = produto.Id,
                    Produto = produto,
                    Quantidade = itemDto.Quantidade,
                    PrecoUnitario = produto.PrecoVenda
                });
            }

            var venda = new Venda
            {
                ClienteId = cliente.Id,
                Data = DateTime.Now,
                Itens = itens,
                Total = itens.Sum(i => i.PrecoUnitario * i.Quantidade),
                Ativo = true
            };

            _context.Vendas.Add(venda);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetById), new { id = venda.Id }, venda);
        }


        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var vendas = await _context.Vendas
                .Include(v => v.Cliente)
                .Include(v => v.Itens)
                    .ThenInclude(i => i.Produto)
                .Where(v => v.Ativo)
                .ToListAsync();

            var resultado = vendas.Select(v => new VendaOutputDto
            {
                Id = v.Id,
                Data = v.Data,
                Cliente = v.Cliente?.Nome,
                Total = v.Total,
                Itens = v.Itens.Select(i => new ItemVendaOutputDto
                {
                    Produto = i.Produto?.Nome ?? "N/A",
                    Quantidade = i.Quantidade,
                    PrecoUnitario = i.PrecoUnitario
                }).ToList()
            });

            return Ok(resultado);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var venda = await _context.Vendas
                .Include(v => v.Cliente)
                .Include(v => v.Itens)
                    .ThenInclude(i => i.Produto)
                .FirstOrDefaultAsync(v => v.Id == id);

            if (venda == null)
                return NotFound();

            return Ok(venda);
        }

        [HttpPut("Inativar/{id}")]
        public async Task<IActionResult> Inativar(int id)
        {
            var venda = await _context.Vendas.FindAsync(id);
            if (venda == null) return NotFound();

            venda.Ativo = false;
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
