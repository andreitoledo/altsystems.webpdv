using System.ComponentModel.DataAnnotations.Schema;

namespace PDV.API.Models
{
    [Table("Produto")]
    public class Produto
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string CodigoBarras { get; set; }
        public string Descricao { get; set; }
        public decimal PrecoVenda { get; set; }
        public decimal PrecoCusto { get; set; }
        public decimal EstoqueAtual { get; set; }
        public string Unidade { get; set; }
        public bool Ativo { get; set; } = true;
        public DateTime DataCriacao { get; set; } = DateTime.Now;
    }
}
