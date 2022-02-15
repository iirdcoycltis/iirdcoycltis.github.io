var cells = [];
var cellCount = 10;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  for (var i = 0; i < cellCount; i++) {
    cells.push(new Cell());
  }
}

function draw() {
  background(51);
  cells.forEach(function (cell) {
    cell.move();
    cell.show();
  });
}

function mousePressed() {
  for (var i = cells.length - 1; i >= 0; i--) {
    if (cells[i].clicked(mouseX, mouseY)) {
      cells.push(cells[i].mitosis());
      cells.push(cells[i].mitosis());
      cells.splice(i, 1);
    }
  }
}
