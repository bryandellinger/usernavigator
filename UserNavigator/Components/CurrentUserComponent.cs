using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UserNavigator.Models;

namespace UserNavigator.Components
{
    public class CurrentUserComponent : ViewComponent
    {
        private ICurrentUserRepository repository;

        public CurrentUserComponent(ICurrentUserRepository repo) => repository = repo;

        public IViewComponentResult Invoke() => View(repository.Get(HttpContext, User.Identity.Name));

    }
}
