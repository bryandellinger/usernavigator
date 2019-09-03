using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml;
using UserNavigator.Models;

namespace UserNavigator.Controllers
{
    public class ExcelExportController : Controller
    {
        private IEmployeesRepository repository;

        public ExcelExportController(IEmployeesRepository repo) => repository = repo;

        public async Task<IActionResult> Index(string search)
        {
            IEnumerable<Employee> employees = await repository.Get(search == "null" ? null : search);
            var stream = new MemoryStream();

            using (var package = new ExcelPackage(stream))
            {
                var workSheet = package.Workbook.Worksheets.Add("Sheet1");
                workSheet.Cells.LoadFromCollection(employees, true);
                const double minWidth = 0.00;
                const double maxWidth = 50.00;
                workSheet.Cells.AutoFitColumns(minWidth, maxWidth);
                package.Save();
            }
            stream.Position = 0;
            string excelName = $"SearchFor-{search}.xlsx";

            return File(stream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", excelName);
        }
    }
}