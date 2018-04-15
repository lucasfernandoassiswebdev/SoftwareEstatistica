using Microsoft.AspNetCore.Mvc;

namespace SoftwareEstatistica.Web.Controllers
{
    public class QuantitativasController : BaseController
    {
        public ActionResult Rol(string jsonDadosColetados){
            ViewBag.Dados = jsonDadosColetados;

            if(string.IsNullOrEmpty(jsonDadosColetados))
                return Error("Nenhum dado foi fornecido!");

            return View();
        }

        public ActionResult Grafico(string jsonDadosColetados, string tipo){
            ViewBag.Dados = jsonDadosColetados;

            if(string.IsNullOrEmpty(jsonDadosColetados))
                return Error("Nenhum dado foi fornecido!");
            
            if(string.IsNullOrEmpty(tipo))
                return Error("Nenhum dado foi fornecido!");

            return View(tipo == "D" ? "GraficoDiscretas" : "GraficoContinuas");
        }
    }
}