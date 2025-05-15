namespace PDV.API.DTOs
{
    public class VendaOutputDto
    {
        public int Id { get; set; }
        public DateTime Data { get; set; }
        public string Cliente { get; set; }
        public decimal Total { get; set; }
        public List<ItemVendaOutputDto> Itens { get; set; }
    }

    public class ItemVendaOutputDto
    {
        public string Produto { get; set; }
        public int Quantidade { get; set; }
        public decimal PrecoUnitario { get; set; }
        public decimal Subtotal => Quantidade * PrecoUnitario;
    }
}
