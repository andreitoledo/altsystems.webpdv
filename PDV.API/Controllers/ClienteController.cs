using Microsoft.AspNetCore.Mvc;
using PDV.API.Models;

namespace PDV.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClienteController : ControllerBase
    {
        private static List<Cliente> clientes = new List<Cliente>();

        [HttpGet]
        public IActionResult Get() => Ok(clientes.Where(c => c.Ativo));

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var cliente = clientes.FirstOrDefault(c => c.Id == id);
            if (cliente == null) return NotFound();
            return Ok(cliente);
        }

        [HttpPost]
        public IActionResult Post([FromBody] Cliente cliente)
        {
            cliente.Id = clientes.Any() ? clientes.Max(c => c.Id) + 1 : 1;
            clientes.Add(cliente);
            return CreatedAtAction(nameof(Get), new { id = cliente.Id }, cliente);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Cliente clienteAtualizado)
        {
            var cliente = clientes.FirstOrDefault(c => c.Id == id);
            if (cliente == null) return NotFound();

            cliente.Nome = clienteAtualizado.Nome;
            cliente.Documento = clienteAtualizado.Documento;
            cliente.Telefone = clienteAtualizado.Telefone;
            cliente.Email = clienteAtualizado.Email;

            return NoContent();
        }

        [HttpPut("Inativar/{id}")]
        public IActionResult Inativar(int id)
        {
            var cliente = clientes.FirstOrDefault(c => c.Id == id);
            if (cliente == null) return NotFound();

            cliente.Ativo = false;
            return NoContent();
        }
    }
}
