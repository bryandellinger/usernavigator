
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
    [Route("api/EmployeeHierarchy")]
    public class EmployeeHierarchyController : Controller
    {
        private IEmployeeHierarchyRepository repository;

        public EmployeeHierarchyController(IEmployeeHierarchyRepository repo) => repository = repo;

        [HttpGet("{posNo}")]
        public Task<IEnumerable<EmployeeHierarchy>> Get(string posNo) => repository.Get(posNo);
        
    }
}