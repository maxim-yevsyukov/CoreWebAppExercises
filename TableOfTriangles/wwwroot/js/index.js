const uri = 'api/TabularTriangles';

let triangleObjects = [];
let drawnTriangles = [];
let drawnTextObjects = [];

let visualMultiplier = 10;
let fontSize = 20;

let lightBlue = '#5B9BD5';
let lightGrey = '#BCC3CA';
let white = '#FEFFFF';


function getAndDrawItems() {
    fetch(uri)
        .then(response => response.json())
        .then(data => _displayItems(data))
        .catch(error => console.error('Unable to get items.', error));
}

function canvasMouseDown(options) {

    if (options.target) {
        var foundIdx = -1;

        if (options.target.type == 'text') {
            for (var i = 0; i < drawnTextObjects.length; i++)
                if (drawnTextObjects[i] == options.target) {
                    foundIdx = i;
                    break;
                }
        }
        else if (options.target.type == 'polygon') {
            for (var i = 0; i < drawnTriangles.length; i++)
                if (drawnTriangles[i] == options.target) {
                    foundIdx = i;
                    break;
                }
        }

        if (foundIdx != -1) {
            selectDrawnTriangle(foundIdx);
            populatePageControlsForTriangle(foundIdx);
        }
    }
}

function selectDrawnTriangle(index) {
    var t = drawnTriangles[index];
    t.set({ strokeWidth: 3, stroke: 'yellow' });
    canvas.renderAll();
    canvas.setActiveObject(t);
}

function populatePageControlsForTriangle(index, skipVertices = false, skipRowColumn = false) {

    if (index >= 0 && index < triangleObjects.length) {

        if (!skipVertices) {
            document.getElementById('v1x').value = triangleObjects[index].v1.x;
            document.getElementById('v1y').value = triangleObjects[index].v1.y;
            document.getElementById('v2x').value = triangleObjects[index].v2.x;
            document.getElementById('v2y').value = triangleObjects[index].v2.y;
            document.getElementById('v3x').value = triangleObjects[index].v3.x;
            document.getElementById('v3y').value = triangleObjects[index].v3.y;
        }

        if (!skipRowColumn) {
            document.getElementById('row').value = triangleObjects[index].row;
            document.getElementById('column').value = triangleObjects[index].column;
        }
    }
}

function _displayItems(data) {
    canvas = new fabric.Canvas('myCanvas');
    canvas.hoverCursor = 'pointer';

    canvas.on('mouse:down', canvasMouseDown);

    data.forEach(item => {

        var p1 = { x: item.v1.x * visualMultiplier, y: item.v1.y * visualMultiplier },
            p2 = { x: item.v2.x * visualMultiplier, y: item.v2.y * visualMultiplier },
            p3 = { x: item.v3.x * visualMultiplier, y: item.v3.y * visualMultiplier };

        var textLeft = (item.column % 2 == 0) ? p1.x + (p3.x - p1.x) / 2 : p1.x + (p3.x - p1.x) / 4;
        var textTop = (item.column % 2 == 0) ? p1.y + (p3.y - p2.y) / 4 : p2.y - (p2.y - p1.y) / 3;

        var text = new fabric.Text(item.row + item.column, { left: textLeft, top: textTop, fontSize: fontSize });
        text.setColor(white);
        text.lockMovementX = true;
        text.lockMovementY = true;
        text.lockRotation = true;
        text.lockScalingX = true;
        text.lockScalingY = true;

        var shape = new fabric.Polygon([p1, p2, p3]);
        shape.set('fill', lightBlue);
        shape.set({ strokewidth: 1, stroke: lightGrey });
        shape.perPixelTargetFind = true;
        shape.lockMovementX = true;
        shape.lockMovementY = true;
        shape.lockRotation = true;
        shape.lockScalingX = true;
        shape.lockScalingY = true;

        canvas.add(shape);
        canvas.add(text);

        drawnTriangles.push(shape);
        drawnTextObjects.push(text);

    });

    triangleObjects = data;
}

function getRowColumn() {
    var v1x = document.getElementById('v1x').value;
    var v1y = document.getElementById('v1y').value;
    var v2x = document.getElementById('v2x').value;
    var v2y = document.getElementById('v2y').value;
    var v3x = document.getElementById('v3x').value;
    var v3y = document.getElementById('v3y').value;

    var foundIdx = -1;
    for (var i = 0; i < triangleObjects.length; i++)
        if (triangleObjects[i].v1.x == v1x && triangleObjects[i].v1.y == v1y &&
            triangleObjects[i].v2.x == v2x && triangleObjects[i].v2.y == v2y &&
            triangleObjects[i].v3.x == v3x && triangleObjects[i].v3.y == v3y)
        {
            foundIdx = i;
            break;
        }

    if (foundIdx != -1) {
        selectDrawnTriangle(foundIdx);
        populatePageControlsForTriangle(foundIdx, true, false);
    }
}

function getVertices() {
    var row = document.getElementById('row').value;
    var column = document.getElementById('column').value;

    var foundIdx = -1;
    for (var i = 0; i < triangleObjects.length; i++)
        if (triangleObjects[i].row == row && triangleObjects[i].column == column)
        {
            foundIdx = i;
            break;
        }

    if (foundIdx != -1) {
        selectDrawnTriangle(foundIdx);
        populatePageControlsForTriangle(foundIdx, false, true);
    }
}
