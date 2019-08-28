using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UserNavigator.Models
{
    public class EmployeeHierarchy
    {
        public string POS_NO { get; set; }
        public string SPVR_POS_NO { get; set; }
        public string EMP_FIRST_NAME { get; set; }
        public string EMP_LAST_NAME { get; set; }
        public string SPVR_FIRST_NAME { get; set; }
        public string SPVR_LAST_NAME { get; set; }
        public int EmpLevel { get; set; }
    }
}
