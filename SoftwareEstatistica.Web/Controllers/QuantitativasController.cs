using Microsoft.AspNetCore.Mvc;

namespace SoftwareEstatistica.Web.Controllers
{
    public class QuantitativasController : Controller
    {
        public ActionResult Rol(string jsonDadosColetados){
            ViewBag.Dados = jsonDadosColetados;
            return View();
        }

        public ActionResult Grafico(string jsonDadosColetados, string tipo){
            ViewBag.Dados = jsonDadosColetados;
            ViewBag.Tipo = tipo == "D" ? "GraficoDiscretas" : "GraficoContinuas";
            return View();
        }
    }
}