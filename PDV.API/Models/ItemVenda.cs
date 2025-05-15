
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace PDV.API.Models
{
    [Table("ItemVenda")]
    public class ItemVenda
    {
        public int Id { get; set; }

        public int VendaId { get; set; }

        [JsonIgnore]
        public Venda Venda { get; set; }

        public int ProdutoId { get; set; }

        [JsonIgnore]
        public Produto Produto { get; set; }

        public int Quantidade { get; set; }
        public decimal PrecoUnitario { get; set; }

        [NotMapped]
        public decimal Subtotal => Quantidade * PrecoUnitario;
    }
}
