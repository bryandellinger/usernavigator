using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace UserNavigator.Models
{
    public interface IEmployeeHierarchyRepository
    {
        Task<IEnumerable<EmployeeHierarchy>> Get(string PosNo);
    }
    public class EmployeeHierarchyRepository : IEmployeeHierarchyRepository
    {
        private DataContext context;

        public EmployeeHierarchyRepository(DataContext ctx) => context = ctx;

        public Task<IEnumerable<EmployeeHierarchy>> Get(string PosNo)
        {
            SqlParameter posNo = new SqlParameter("PosNo", PosNo);
            var sql = @";with EmpsCTE as 
(select POS_NO, SPVR_POS_NO, EMP_FIRST_NAME, EMP_LAST_NAME, COALESCE(SPVR_FIRST_NAME,'Vacant') as SPVR_FIRST_NAME, SPVR_LAST_NAME, 1 as EmpLevel from IES_HR_EMPLOYEES  where POS_NO = @PosNo 
 union all
 select C.POS_NO, C.SPVR_POS_NO, C.EMP_FIRST_NAME, C.EMP_LAST_NAME, COALESCE(C.SPVR_FIRST_NAME,'Vacant') as SPVR_FIRST_NAME, C.SPVR_LAST_NAME, EmpLevel + 1 as EmpLevel from EmpsCTE AS P
 Join IES_HR_EMPLOYEES as C
 on C.SPVR_POS_NO = P.POS_NO
)
Select * from EmpsCTE  where emp_first_name is not null  and emp_last_name is not null order by 7
             ";

            return Task.FromResult<IEnumerable<EmployeeHierarchy>>(context.EmployeeHierarchies.FromSql(sql, posNo).Skip(1));
        } 
    }
}

