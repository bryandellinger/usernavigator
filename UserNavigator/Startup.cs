using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using UserNavigator.Models;
using Microsoft.AspNetCore.Server.IISIntegration;
using Swashbuckle.AspNetCore.Swagger;

namespace UserNavigator
{
    public class Startup
    {
        public Startup(IConfiguration config) => Configuration = config;

        public IConfiguration Configuration { get; }
     
        public void ConfigureServices(IServiceCollection services)
        {
            
            services.AddAuthentication(IISDefaults.AuthenticationScheme);
            string conString = Configuration["ConnectionStrings:DefaultConnection"];
            services.AddDbContext<DataContext>(options => options.UseSqlServer(conString));
            services.AddTransient<IEmployeesRepository, EmployeeRepository>();
            services.AddTransient<ICurrentUserRepository, CurrentUserRepository>();
            services.AddTransient<ICwopaAgencyFileRepository, CwopaAgencyFileRepository>();
            services.AddTransient<IEmployeeHierarchyRepository, EmployeeHierarchyRepository>();
            services.AddMvc();
            services.AddMemoryCache();
            services.AddSession();
            services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new Info
                {
                    Title = "People Viewer API",
                    Version = "v1",
                    Description = "API Service for browsing cwopa and ies directories",
                    Contact = new Contact { Name = "Bryan Dellinger", Email = "c-bdelling@pa.gov", Url = "https://github.com/bryandellinger/usernavigator" },
                    License = new License { Name = "MIT License" }
                });
            });
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseDeveloperExceptionPage();
            app.UseStatusCodePages();
            app.UseStaticFiles();
            app.UseSession();
            app.UseMvcWithDefaultRoute();
            app.UseSwagger();
            app.UseSwaggerUI(options =>
                options.SwaggerEndpoint("/swagger/v1/swagger.json", "People Viewer Services")
            );
        }
    }
}
