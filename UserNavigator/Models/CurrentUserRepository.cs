using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UserNavigator.Models
{
    public interface ICurrentUserRepository
    {
        CurrentUser Get(string identityName, HttpContext httpContext);
    }
    public class CurrentUserRepository : ICurrentUserRepository
    {
        private ICwopaAgencyFileRepository repository;

        public CurrentUserRepository(ICwopaAgencyFileRepository repo) => repository = repo;

        public CurrentUser Get(string identityName, HttpContext httpContext)
        {
            string domain = identityName.Split('\\')[1];

            string userNameFromQueryString = httpContext.Request.Query["username"].ToString();

            if (userNameFromQueryString != null && !string.IsNullOrEmpty(userNameFromQueryString))
            {
                domain = userNameFromQueryString.Split('\\')[1];
            }

            CWOPA_AGENCY_FILE cwopaAgencyFile = repository.GetByDomain(domain);
            return new CurrentUser
            {
                UserName = identityName,
                FirstName = cwopaAgencyFile?.NAME_FIRST,
                LastName = cwopaAgencyFile?.NAME_LAST
            };
        }
    }
}

