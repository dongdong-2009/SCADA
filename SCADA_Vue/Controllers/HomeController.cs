using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SCADA_Vue.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Jsplumb()
        {
            return View();
        }
        public ActionResult Test()
        {
            return View();
        }
    }
}