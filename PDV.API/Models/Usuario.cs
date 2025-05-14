using System;
using System.ComponentModel.DataAnnotations.Schema;
namespace PDV.API.Models
{
    [Table("Usuario")] // <- nome exato da tabela no banco
    public class Usuario
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public string SenhaHash { get; set; }
        public string Perfil { get; set; } // Admin, Operador
        public bool Ativo { get; set; } = true;
    }
}
