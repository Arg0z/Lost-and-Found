using Microsoft.AspNetCore.Mvc;

namespace LostAndFoundBack.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
