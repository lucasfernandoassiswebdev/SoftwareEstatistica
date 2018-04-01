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

        public ActionResult Rol(string jsonDadosColetados){
            ViewBag.Dados = jsonDadosColetados;
            return View("Rol");
        }
    }
}