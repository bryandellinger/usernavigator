using Microsoft.EntityFrameworkCore;

namespace UserNavigator.Models
{

    public class DataContext : DbContext
    {

        public DataContext(DbContextOptions<DataContext> opts) : base(opts) { }

        public virtual DbSet<CWOPA_AGENCY_FILE> CWOPA_AGENCY_FILES { get; set; }

        public virtual DbQuery<Employee> Employees { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CWOPA_AGENCY_FILE>(entity =>
            {
                entity.HasKey(e => e.EMPLOYEE_NUM);
                entity.ToTable("CWOPA_AGENCY_FILE", "dbo");
            });
        }
    }
}