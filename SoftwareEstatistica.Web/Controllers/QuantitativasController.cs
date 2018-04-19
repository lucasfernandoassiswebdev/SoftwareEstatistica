using Microsoft.AspNetCore.Mvc;

namespace SoftwareEstatistica.Web.Controllers
{
    public class QuantitativasController : BaseController
    {
        public ActionResult Rol(string jsonDadosColetados){
            if(string.IsNullOrEmpty(jsonDadosColetados))
                return Error("Nenhum dado foi fornecido!");

            ViewBag.Dados = jsonDadosColetados;
            return View();
        }

        public ActionResult Grafico(string jsonDadosColetados){
            if(string.IsNullOrEmpty(jsonDadosColetados))
                return Error("Nenhum dado foi fornecido!");
            
            ViewBag.Dados = jsonDadosColetados;
            return View();
        }

        public ActionResult MediaModaMediana(string jsonDadosColetados, string amostra)
        {
            ViewBag.Dados = jsonDadosColetados;
            ViewBag.Amostra = amostra;

            if (string.IsNullOrEmpty(jsonDadosColetados))
                return Error("Nenhum dado foi fornecido!");

            return View();
        }
    }
}