using System.Net;
using Microsoft.AspNetCore.Mvc;

namespace SoftwareEstatistica.Web.Controllers
{
    public class BaseController : Controller
    {
        public BaseController()
        {
        }

        protected ActionResult Content(HttpStatusCode status, string value)
        {
            Response.StatusCode = (int)status;
            return Content(value);
        }

        public IActionResult Error(string message)
        {
            return Content(HttpStatusCode.BadRequest, message ?? "Algo deu errado na sua solicitação :(");
        }
    }
}