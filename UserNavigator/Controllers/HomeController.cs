using UserNavigator.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace UserNavigator.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index() => View();     
    }
}