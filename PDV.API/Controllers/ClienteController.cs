using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PDV.API.Data;
using PDV.API.Models;

namespace PDV.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClienteController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ClienteController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Cliente
        [HttpGet]
        public IActionResult Get()
        {
            var clientes = _context.Clientes
                .Where(c => c.Ativo)
                .ToList();
            return Ok(clientes);
        }

        // GET: api/Cliente/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var cliente = _context.Clientes.Find(id);
            if (cliente == null) return NotFound();
            return Ok(cliente);
        }

        // POST: api/Cliente
        [HttpPost]
        public IActionResult Post([FromBody] Cliente cliente)
        {
            cliente.DataCriacao = DateTime.Now;
            _context.Clientes.Add(cliente);
            _context.SaveChanges();

            return CreatedAtAction(nameof(Get), new { id = cliente.Id }, cliente);
        }

        // PUT: api/Cliente/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Cliente clienteAtualizado)
        {
            var cliente = _context.Clientes.Find(id);
            if (cliente == null) return NotFound();

            cliente.Nome = clienteAtualizado.Nome;
            cliente.Documento = clienteAtualizado.Documento;
            cliente.Telefone = clienteAtualizado.Telefone;
            cliente.Email = clienteAtualizado.Email;

            _context.SaveChanges();
            return NoContent();
        }

        // PUT: api/Cliente/Inativar/5
        [HttpPut("Inativar/{id}")]
        public IActionResult Inativar(int id)
        {
            var cliente = _context.Clientes.Find(id);
            if (cliente == null) return NotFound();

            cliente.Ativo = false;
            _context.SaveChanges();

            return NoContent();
        }
    }
}
