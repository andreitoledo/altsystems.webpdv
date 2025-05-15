using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace PDV.API.Models
{
    [Table("Cliente")]
    public class Cliente
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Documento { get; set; } // Pode ser CPF ou CNPJ
        public string Telefone { get; set; }
        public string Email { get; set; }
        public bool Ativo { get; set; } = true;
        public DateTime DataCriacao { get; set; } = DateTime.Now;
    }
}
