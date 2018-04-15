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

        public ActionResult QuantitativasDiscretas(){
            return View();
        }

        public ActionResult QuantitativasContinuas(){
            return View();
        }
        
        public ActionResult Tabela(string jsonDadosColetados){            
            ViewBag.Dados = jsonDadosColetados;

            if(string.IsNullOrEmpty(jsonDadosColetados))
                return Error("Não foi fornecido nenhum dado!");

            return View();
        }

        public ActionResult MediaModaMediana(string jsonDadosColetados, string tipo){
            ViewBag.Dados = jsonDadosColetados;
            ViewBag.Tipo = tipo;

            if(string.IsNullOrEmpty(jsonDadosColetados))
                return Error("Não foi fornecido nenhum dado!");

            return View();
        }
    }
}