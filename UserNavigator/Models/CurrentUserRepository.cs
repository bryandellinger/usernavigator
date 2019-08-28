using Microsoft.AspNetCore.Http;
using SportsStore.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UserNavigator.Models
{
    public interface ICurrentUserRepository
    {
        CurrentUser Get(HttpContext httpContext, string identityName = null);
    }
    public class CurrentUserRepository : ICurrentUserRepository
    {
        private ICwopaAgencyFileRepository repository;

        public CurrentUserRepository(ICwopaAgencyFileRepository repo) => repository = repo;

        public CurrentUser Get(HttpContext httpContext, string identityName = null)
        {
            CurrentUser currentUser = new CurrentUser();

            if (identityName != null)
            {
                string domain = identityName.Split('\\')[1];

                string userNameFromQueryString = httpContext.Request.Query["username"].ToString();

                if (userNameFromQueryString != null && !string.IsNullOrEmpty(userNameFromQueryString))
                {
                    domain = userNameFromQueryString.Split('\\')[1];
                    currentUser = GetCurrentUserFromDomain(domain);
                    httpContext.Session.SetJson("CurrentUser", currentUser);
                }
                else
                {
                    currentUser = httpContext.Session.GetJson<CurrentUser>("CurrentUser");
                    if (currentUser == null)
                    {
                        currentUser = GetCurrentUserFromDomain(domain);
                        httpContext.Session.SetJson("CurrentUser", currentUser);
                    }
                }
            }

            currentUser = httpContext.Session.GetJson<CurrentUser>("CurrentUser");
            return currentUser;
        }

        private CurrentUser GetCurrentUserFromDomain(string domain)
        {
            CWOPA_AGENCY_FILE cwopaAgencyFile = repository.GetByDomain(domain);
            CurrentUser currentUser = new CurrentUser
            {
                UserName =  $"CWOPA\\{cwopaAgencyFile?.DOMAIN_NAME}",
                NAME_FIRST = cwopaAgencyFile?.NAME_FIRST,
                NAME_LAST = cwopaAgencyFile?.NAME_LAST,
                BUREAU = cwopaAgencyFile?.BUREAU,
                DIVISION = cwopaAgencyFile?.DIVISION,
                DOMAIN_NAME = cwopaAgencyFile?.DOMAIN_NAME,
                DEPUTATE = cwopaAgencyFile?.DEPUTATE,
                EMAIL_ADDRESS = cwopaAgencyFile?.EMAIL_ADDRESS,
                EMPLOYEE_NUM = cwopaAgencyFile?.EMPLOYEE_NUM,
                NAME_MIDDLE = cwopaAgencyFile?.NAME_MIDDLE,
                WORK_ADDR = cwopaAgencyFile?.NAME_MIDDLE,
                WORK_CITY = cwopaAgencyFile?.WORK_CITY,
                WORK_PHONE = cwopaAgencyFile?.WORK_PHONE,
                WORK_ZIP = cwopaAgencyFile?.WORK_ZIP,
            };
            return currentUser;
        }
    }
}

