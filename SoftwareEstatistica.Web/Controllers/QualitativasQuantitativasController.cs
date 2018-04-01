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

        public ActionResult Quantitativas(){
            return View();
        }
        
        public ActionResult Tabela(string jsonDadosColetados){            
            ViewBag.Dados = jsonDadosColetados;
            return View();
        }
    }
}