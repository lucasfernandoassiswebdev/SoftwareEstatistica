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
    }
}