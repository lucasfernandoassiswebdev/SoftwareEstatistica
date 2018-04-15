using Microsoft.AspNetCore.Mvc;

namespace SoftwareEstatistica.Web.Controllers
{
    public class QualitativasQuantitativasController : BaseController
    {
        public QualitativasQuantitativasController()
        {
        }

        public ActionResult Qualitativas(){
            return View();
        }

        public ActionResult Quantitativas(string tipo){
            ViewBag.Tipo = tipo;

            if(string.IsNullOrEmpty(tipo))
                return Error("O tipo não foi informado!");
            return View();
        }

        public ActionResult Tabela(string jsonDadosColetados){            
            ViewBag.Dados = jsonDadosColetados;

            if(string.IsNullOrEmpty(jsonDadosColetados))
                return Error("Nenhum dado foi fornecido!");

            return View();
        }

        public ActionResult MediaModaMediana(string jsonDadosColetados, string tipo){
            ViewBag.Dados = jsonDadosColetados;
            ViewBag.Tipo = tipo;

            if(string.IsNullOrEmpty(jsonDadosColetados))
                return Error("Nenhum dado foi fornecido!");

            return View();
        }
    }
}