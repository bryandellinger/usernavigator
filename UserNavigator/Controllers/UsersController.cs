using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UserNavigator.Models;

namespace UserNavigator.Controllers
{
    [Produces("application/json")]
    [Route("api/Users")]
    public class UsersController : Controller
    {

        private IEmployeesRepository repository;

        public UsersController(IEmployeesRepository repo) => repository = repo;

        [Authorize]
        [HttpGet("{search}")]
        public IActionResult Get(string search) => Ok(repository.Get(search == "null" ? null : search));
    }
}