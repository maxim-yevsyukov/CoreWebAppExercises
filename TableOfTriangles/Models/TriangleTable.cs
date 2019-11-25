using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace TableOfTriangles.Models
{


    public class TriangleTable
    {


        public TriangleTable()
        {

        }

        public ICollection<TabularTriangle> Triangles { get; }

    }
}
