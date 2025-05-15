namespace PDV.API.DTOs
{
    public class VendaDto
    {
        public int ClienteId { get; set; }
        public List<ItemVendaDto> Itens { get; set; }
    }

    public class ItemVendaDto
    {
        public int ProdutoId { get; set; }
        public int Quantidade { get; set; }
    }
}
