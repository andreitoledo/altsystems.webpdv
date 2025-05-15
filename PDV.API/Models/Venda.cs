
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace PDV.API.Models
{
    [Table("Venda")]
    public class Venda
    {
        public int Id { get; set; }
        public DateTime Data { get; set; } = DateTime.Now;

        public int ClienteId { get; set; }

        [JsonIgnore]
        public Cliente Cliente { get; set; }

        public decimal Total { get; set; }
        public bool Ativo { get; set; } = true;

        public List<ItemVenda> Itens { get; set; }
    }
}
