
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UserNavigator.Models;
using System.Linq;

namespace UserNavigator.Controllers
{
    [Authorize]
    [Produces("application/json")]
    [Route("api/EmployeeHierarchy")]
    public class EmployeeHierarchyController : Controller
    {
        private IEmployeeHierarchyRepository repository;

        public EmployeeHierarchyController(IEmployeeHierarchyRepository repo) => repository = repo;

        [HttpGet("{posNo}")]
        public IActionResult Get(string posNo)
        {
            var result = repository.Get(posNo).ToArray();
            return Ok(result);
        }
    }
}