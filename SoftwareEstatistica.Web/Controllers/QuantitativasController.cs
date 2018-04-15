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
            return View(tipo == "D" ? "GraficoDiscretas" : "GraficoContinuas");
        }
    }
}