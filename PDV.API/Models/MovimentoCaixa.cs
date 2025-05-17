using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PDV.API.Models
{
    [Table("MovimentoCaixa")]
    public class MovimentoCaixa
    {
        public int Id { get; set; }

        [Required]
        public DateTime Data { get; set; }

        [Required]
        public decimal Valor { get; set; }

        [Required]
        [MaxLength(20)]
        public string Tipo { get; set; } // Entrada ou Saída

        [MaxLength(255)]
        public string Descricao { get; set; }
    }
}