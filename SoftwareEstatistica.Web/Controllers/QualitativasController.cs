using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace SoftwareEstatistica.Web.Controllers
{
    public class QualitativasController : BaseController
    {
        public ActionResult Rol(string jsonDadosColetados, string ordenar){
            if(string.IsNullOrEmpty(jsonDadosColetados))
                return Error("Nenhum dado foi fornecido!");

            ViewBag.Dados = jsonDadosColetados;
            ViewBag.Ordenar = ordenar;
            return PartialView("Rol");
        }
        
        public ActionResult Ordinal(string jsonDadosColetados){
            if(string.IsNullOrEmpty(jsonDadosColetados))
                return Error("Nenhum dado foi fornecido!");
            
            ViewBag.Dados = jsonDadosColetados;
            return PartialView("Ordinal");
        }

        public ActionResult Grafico(string jsonDadosColetados){
            if(string.IsNullOrEmpty(jsonDadosColetados))
                return Error("Nenhum dado foi fornecido!");

            ViewBag.Dados = jsonDadosColetados;
            return PartialView("Grafico");
        }
    }
}