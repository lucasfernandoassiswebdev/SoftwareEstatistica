using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace SoftwareEstatistica.Web.Controllers
{
    public class QualitativasController : Controller
    {
        public QualitativasController()
        {
        }

        public ActionResult Rol(string jsonDadosColetados, string ordenar){
            ViewBag.Dados = jsonDadosColetados;
            ViewBag.Ordenar = ordenar;
            return View("Rol");
        }
        
        public ActionResult Ordinal(string jsonDadosColetados){
            ViewBag.Dados = jsonDadosColetados;
            return View();
        }
    }
}