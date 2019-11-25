using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using TableOfTriangles.Models;
using System.Drawing;

namespace TableOfTriangles
{
    public enum TableRow { A = 0, B, C, D, E, F }

    public class DataGenerator
    {
        public const int HalfColumnQuantity = 6;
        public const int PixelStep = 10;

        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new TabularTriangleContext(
                serviceProvider.GetRequiredService<DbContextOptions<TabularTriangleContext>>()))
            {
                if (context.TabularTriangles.Any())
                    return;

                var rowNames = Enum.GetNames(typeof(TableRow));

                int runningX = 0, runningY = 0, runningCount = 0;
                foreach (var r in rowNames)
                {
                    for (int i = 0; i < HalfColumnQuantity; i++)
                    {
                        var v11_21 = new Point(runningX, runningY);
                        var v12 = new Point(runningX, runningY + PixelStep);
                        var v13_23 = new Point(runningX + PixelStep, runningY + PixelStep);
                        var v22 = new Point(runningX + PixelStep, runningY);

                        context.TabularTriangles.Add(new TabularTriangle(v11_21, v12, v13_23, r, ++runningCount));
                        context.TabularTriangles.Add(new TabularTriangle(v11_21, v22, v13_23, r, ++runningCount));
                        runningX += PixelStep;
                    }

                    runningX = 0;
                    runningY += PixelStep;
                    runningCount = 0;
                }

                context.SaveChanges();
            }
        }
    }
}
