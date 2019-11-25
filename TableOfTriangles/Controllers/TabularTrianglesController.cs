using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TableOfTriangles.Models;

namespace TableOfTriangles.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TabularTrianglesController : ControllerBase
    {
        private readonly TabularTriangleContext _context;

        public TabularTrianglesController(TabularTriangleContext context)
        {
            _context = context;
        }

        // GET: api/TabularTriangles
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TabularTriangle>>> GetTabularTriangles()
        {
            return await _context.TabularTriangles.ToListAsync();
        }
    }
}
