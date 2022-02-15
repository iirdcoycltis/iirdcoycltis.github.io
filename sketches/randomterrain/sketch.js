let columns = 0;
let rows = 0;
let scale = 40;
let w = 3400;
let h = 1600;
let flying = 0;
let terrain;
function setup(){
    //fullscreen(WEBGL);
    createCanvas(window.innerWidth, window.innerHeight, WEBGL);
    columns=w / scale;
    rows=h / scale;
    terrain=processing2jsNewNDimArray([columns, rows]);
}

function draw(){
    flying-=0.05;
    let yoff = flying;
    for(let y = 0;y < rows;y++) {
        let xoff = 0;
        for(let x = 0;x < columns;x++) {
            terrain[x][y]=map(noise(xoff, yoff), 0, 1, -250, 250);
            xoff+=0.1;
        }
        yoff+=0.1;
    }
    background(0);
    strokeWeight(1);
    stroke(255);
    noFill();
    translate(width / 2, height / 2 - 100, 200);
    rotateX(PI / 3);
    translate(-w / 2, -h / 2);
    for(let y = 0;y < rows - 1;y++) {
        beginShape(QUAD_STRIP);
        for(let x = 0;x < columns;x++) {
            vertex(x * scale, y * scale, terrain[x][y]);
            vertex(x * scale, (y + 1) * scale, terrain[x][y + 1]);
        }
        endShape();
    }
}

function processing2jsNewNDimArray(dimensions) {
    if (dimensions.length > 0) {
        let dim = dimensions[0];
        let rest = dimensions.slice(1);
        let newArray = new Array();
        for (var i = 0; i < dim; i++) {
            newArray[i] = processing2jsNewNDimArray(rest);
        }
        return newArray;
    } else {
        return undefined;
    }
}