using Microsoft.AspNetCore.Mvc;

namespace SoftwareEstatistica.Web.Controllers
{
    public class QuantitativasController : BaseController
    {
        public ActionResult Rol(string jsonDadosColetados)
        {
            if (string.IsNullOrEmpty(jsonDadosColetados))
                return Error("Nenhum dado foi fornecido!");

            ViewBag.Dados = jsonDadosColetados;
            return PartialView("Rol");
        }

        public ActionResult MedidasSeparatrizes(string jsonDadosColetados, string tipo)
        {
            ViewBag.Tipo = tipo;
            ViewBag.Dados = jsonDadosColetados;

            if (string.IsNullOrEmpty(jsonDadosColetados))
                return Error("Nenhum dado foi fornecido!");

            return PartialView("MedidasSeparatrizes");
        }

        public ActionResult Grafico(string jsonDadosColetados)
        {
            if (string.IsNullOrEmpty(jsonDadosColetados))
                return Error("Nenhum dado foi fornecido!");

            ViewBag.Dados = jsonDadosColetados;
            return PartialView("Grafico");
        }

        public ActionResult MediaModaMediana(string jsonDadosColetados, string amostra)
        {
            ViewBag.Dados = jsonDadosColetados;
            ViewBag.Amostra = amostra;

            if (string.IsNullOrEmpty(jsonDadosColetados))
                return Error("Nenhum dado foi fornecido!");

            return PartialView("MediaModaMediana");
        }
    }
}