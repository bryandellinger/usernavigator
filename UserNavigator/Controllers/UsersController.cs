using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UserNavigator.Models;

namespace UserNavigator.Controllers
{
    [Authorize]
    [Produces("application/json")]
    [Route("api/Users")]
    public class UsersController : Controller
    {

        private IEmployeesRepository repository;

        public UsersController(IEmployeesRepository repo) => repository = repo;

        [HttpGet("{search}")]
        public Task<IEnumerable<Employee>> Get(string search) => repository.Get(search == "null" ? null : search);
    }
}