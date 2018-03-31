using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace SoftwareEstatistica.Web.Controllers
{
    public class QualitativasController : Controller
    {
        public QualitativasController()
        {
        }

        public ActionResult Rol(IEnumerable<string> dadosColetados){
            return View(dadosColetados);
        }
    }
}