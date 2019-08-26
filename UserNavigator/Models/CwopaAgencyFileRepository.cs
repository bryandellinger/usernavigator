using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UserNavigator.Models
{
    public interface ICwopaAgencyFileRepository
    {
        CWOPA_AGENCY_FILE GetByDomain (string domain);
    }
    public class CwopaAgencyFileRepository : ICwopaAgencyFileRepository
    {
        private DataContext context;

        public CwopaAgencyFileRepository(DataContext ctx) => context = ctx;

        public CWOPA_AGENCY_FILE GetByDomain(string domain) => 
            context.CWOPA_AGENCY_FILES.FirstOrDefault(x => x.DOMAIN_NAME == domain);
        
    }
}
