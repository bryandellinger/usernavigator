using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UserNavigator.Models
{
    public interface IEmployeesRepository
    {
      
        IEnumerable<Employee> Get(string search);
    }
}
