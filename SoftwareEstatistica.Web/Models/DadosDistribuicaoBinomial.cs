namespace SoftwareEstatistica.Web.Models
{
    public class DadosDistribuicaoBinomial
    {
        public decimal Amostra { get; set; }
        public bool BuscaSucesso { get; set; }
        public decimal QuantidadeN { get; set; }
        public decimal QuantidadeX { get; set; }
        public decimal Sucesso { get; set; }
        public byte TipoResposta { get; set; }
    }
}
