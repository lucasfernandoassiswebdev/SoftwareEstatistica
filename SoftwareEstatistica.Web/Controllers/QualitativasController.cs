using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace SoftwareEstatistica.Web.Controllers
{
    public class QualitativasController : BaseController
    {
        public QualitativasController()
        {
        }

        public ActionResult Rol(string jsonDadosColetados, string ordenar){
            ViewBag.Dados = jsonDadosColetados;
            ViewBag.Ordenar = ordenar;

            if(string.IsNullOrEmpty(jsonDadosColetados))
                return Error("Não foi fornecido nenhum dado!");

            return View("Rol");
        }
        
        public ActionResult Ordinal(string jsonDadosColetados){
            ViewBag.Dados = jsonDadosColetados;

            if(string.IsNullOrEmpty(jsonDadosColetados))
                return Error("Não foi fornecido nenhum dado!");

            return View();
        }

        public ActionResult Grafico(string jsonDadosColetados){
            if(string.IsNullOrEmpty(jsonDadosColetados))
                return Error("Não foi fornecido nenhum dado!");

            ViewBag.Dados = jsonDadosColetados;
            return View();
        }
    }
}