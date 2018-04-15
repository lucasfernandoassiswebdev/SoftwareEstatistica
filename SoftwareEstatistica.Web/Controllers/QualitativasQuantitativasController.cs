using Microsoft.AspNetCore.Mvc;

namespace SoftwareEstatistica.Web.Controllers
{
    public class QualitativasQuantitativasController : Controller
    {
        public QualitativasQuantitativasController()
        {
        }

        public ActionResult Qualitativas(){
            return View();
        }

        public ActionResult QuantitativasDiscretas(){
            return View();
        }

        public ActionResult QuantitativasContinuas(){
            return View();
        }
        
        public ActionResult Tabela(string jsonDadosColetados){            
            ViewBag.Dados = jsonDadosColetados;
            return View();
        }

        public ActionResult MediaModaMediana(string jsonDadosColetados, string tipo){
            ViewBag.Dados = jsonDadosColetados;
            ViewBag.Tipo = tipo;
            return View();
        }
    }
}