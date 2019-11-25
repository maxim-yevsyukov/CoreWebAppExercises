using Microsoft.EntityFrameworkCore;

namespace TableOfTriangles.Models
{
    public class TabularTriangleContext : DbContext
    {
        public TabularTriangleContext()
        {

        }

        public TabularTriangleContext(DbContextOptions<TabularTriangleContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder mb)
        {
            mb.Entity<TabularTriangle>().HasKey(tt => new { tt.Row, tt.Column });
        }

        public DbSet<TabularTriangle> TabularTriangles { get; set; }
    }
}
