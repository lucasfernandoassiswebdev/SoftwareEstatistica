using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace SoftwareEstatistica.Web.Controllers
{
    public class CorrelacaoRegrecaoController : Controller
    {
        public IActionResult FomularioCorReg()
        {
            return View();
        }

        public IActionResult Tabela(String jsonTabela)
        {
            ViewBag.dadosTabela = jsonTabela;
            return PartialView();
        }
        public IActionResult Influencia(String jsonDados)
        {
            ViewBag.dados = jsonDados;
            return PartialView();
        }

        public IActionResult Grafico(String jsonDadosGrafico)
        {
            ViewBag.dadosGrafico = jsonDadosGrafico;
            return PartialView();
        }
    }
}