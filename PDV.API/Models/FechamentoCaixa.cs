using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PDV.API.Models
{
    [Table("FechamentoCaixa")]
    public class FechamentoCaixa
    {
        public int Id { get; set; }
        public DateTime Data { get; set; } = DateTime.Now;
        public decimal TotalEntradas { get; set; }
        public decimal TotalSaidas { get; set; }
        public decimal SaldoFinal { get; set; }
        public string Responsavel { get; set; }
    }
}