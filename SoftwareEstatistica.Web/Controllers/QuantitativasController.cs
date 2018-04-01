using Microsoft.AspNetCore.Mvc;

namespace SoftwareEstatistica.Web.Controllers
{
    public class QuantitativasController : Controller
    {

        public ActionResult Rol(string jsonDadosColetados){
            ViewBag.Dados = jsonDadosColetados;
            return View();
        }
    }
}