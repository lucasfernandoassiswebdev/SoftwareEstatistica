using Microsoft.AspNetCore.Mvc;

namespace SoftwareEstatistica.Web.Controllers
{
    public class QualitativasQuantitativasController : BaseController
    {
        public ActionResult Qualitativas()
        {
            return View();
        }

        public ActionResult Quantitativas(string tipo)
        {
            if (string.IsNullOrEmpty(tipo))
                return Error("O tipo não foi informado!");

            ViewBag.Tipo = tipo;
            return View();
        }

        public ActionResult Tabela(string jsonDadosColetados)
        {
            if (string.IsNullOrEmpty(jsonDadosColetados))
                return Error("Nenhum dado foi fornecido!");

            ViewBag.Dados = jsonDadosColetados;
            return PartialView("Tabela");
        }

        public ActionResult DistribuicaoBinomial()
        {
            return View();
        }
    }
}