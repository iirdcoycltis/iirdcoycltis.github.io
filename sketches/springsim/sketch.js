let anchor;
let bob;
let v;
let g;

let vval = 0.98;
let restLength = 250;
let k = 0.01;
let gs = 0.5;

function setup() {
  createCanvas(600, 600);
  anchor = createVector(width / 2, height / 2);
  bob = createVector(anchor.x, anchor.y + restLength);
  v = createVector(0, 0);
  g = createVector(0, gs);
}

function draw() {
  background(50);
  strokeWeight(2);
  stroke(255);
  noFill();
  line(anchor.x, anchor.y, bob.x, bob.y);
  fill(0, 255, 255);
  circle(anchor.x, anchor.y, 32);
  circle(bob.x, bob.y, 64);

  if (mouseIsPressed) {
    bob.x = mouseX;
    bob.y = mouseY;
    v.set(0, 0);
  }

  let f = p5.Vector.sub(bob, anchor);
  let x = f.mag();
  f.normalize();
  f.mult(-1 * k * x);

  v.add(f);
  v.add(g);
  bob.add(v);
  v.mult(vval);
}
