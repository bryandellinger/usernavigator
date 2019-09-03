using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UserNavigator.Models
{
    public class EmployeeRepository : IEmployeesRepository
    {
        private DataContext context;

        public EmployeeRepository(DataContext ctx) => context = ctx;

        public Task <IEnumerable<Employee>> Get(string search) =>
        Task.FromResult<IEnumerable<Employee>>(context.Employees.FromSql(
            @"select
                c.EMPLOYEE_NUM, i.POS_NO, i.ORG_ID, i.ORG_NAME, i.JOB_NAME, i.SPVR_POS_NO,
                i.SPVR_FIRST_NAME, i.SPVR_MID_NAME, i.SPVR_LAST_NAME, i.PERS_AREA_NAME,
                COALESCE(c.NAME_FIRST, 'Vacant') as NAME_FIRST ,  COALESCE(c.NAME_LAST, 'Position') as NAME_LAST, c.NAME_MIDDLE, c.EMAIL_ADDRESS, c.DOMAIN_NAME,
                c.WORK_PHONE, c.WORK_ADDR, C.WORK_CITY, c.WORK_ZIP, c.DEPUTATE, c.BUREAU,
                c.COMPANY, c.DESCRIPTION, c.msExchExtensionAttribute20, c.msExchExtensionAttribute21,
                c.DIVISION, c.NAME_FIRST + ' ' + c.NAME_LAST as FULL_NAME,
                c.NAME_FIRST + ' ' + c.NAME_MIDDLE + ' ' + c.NAME_LAST as FULL_NAME_WITH_MIDDLE,
                c.COMPANY + ' ( ' + c.msExchExtensionAttribute20 + ' )' as FULL_COMPANY
             from
                IES_HR_EMPLOYEES i full outer join CWOPA_AGENCY_FILE c on i.PERS_NO = c.EMPLOYEE_NUM
             "
            ).
            Where(
                x => search == null ||
                (
                    x.NAME_LAST.ToLower().StartsWith(search.ToLower()) ||
                    x.NAME_FIRST.ToLower().StartsWith(search.ToLower()) ||
                    x.FULL_NAME.ToLower().StartsWith(search.ToLower()) ||
                    x.EMPLOYEE_NUM.ToLower().StartsWith(search.ToLower()) ||
                    (x.POS_NO != null && x.POS_NO.ToLower().StartsWith(search.ToLower())) ||
                    (x.ORG_ID != null && x.ORG_ID.ToLower().StartsWith(search.ToLower())) ||
                    (x.ORG_NAME != null && x.ORG_NAME.ToLower().StartsWith(search.ToLower())) ||
                    (x.JOB_NAME != null && x.JOB_NAME.ToLower().StartsWith(search.ToLower())) ||
                    (x.PERS_AREA_NAME != null && x.PERS_AREA_NAME.ToLower().StartsWith(search.ToLower())) ||
                    (x.EMAIL_ADDRESS != null && x.EMAIL_ADDRESS.ToLower().StartsWith(search.ToLower())) ||
                    (x.DEPUTATE != null && x.DEPUTATE.ToLower().StartsWith(search.ToLower())) ||
                    (x.BUREAU != null && x.BUREAU.ToLower().StartsWith(search.ToLower())) ||
                    (x.DIVISION != null && x.DIVISION.ToLower().StartsWith(search.ToLower())) ||
                    (x.FULL_NAME_WITH_MIDDLE != null && x.FULL_NAME_WITH_MIDDLE.ToLower().StartsWith(search.ToLower())) ||
                    (x.COMPANY != null && x.COMPANY.ToLower().StartsWith(search.ToLower())) ||
                    (x.msExchExtensionAttribute20 != null && x.msExchExtensionAttribute20.ToLower().StartsWith(search.ToLower())) ||
                    (x.FULL_COMPANY != null && x.FULL_COMPANY.ToLower().StartsWith(search.ToLower()))
                )
            ).
            ToArray().
            Take(30000).
            OrderBy(x => x.NAME_LAST).
            ThenBy(x => x.NAME_FIRST));
    }
}
