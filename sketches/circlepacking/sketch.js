class Circle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 2;
    this.g = true;
    this.i = 0;
  }

  grow() {
    if (this.g) {
      this.r += 0.5;
    }
  }

  edges() {
    return (
      this.x + this.r > width ||
      this.x - this.r < 0 ||
      this.y + this.r > height ||
      this.y - this.r < 0
    );
  }

  show() {
    // strokeWeight(1);
    // stroke(255);
    this.i = (this.i + 1) % 255;
    noStroke();
    fill(this.i);
    ellipse(this.x, this.y, this.r * 2);
  }
}

let circles = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  //frameRate(5);
}

function newCircle() {
  let x = random(width);
  let y = random(height);
  let valid = true;
  for (let i = 0; i < circles.length; i++) {
    let d = dist(x, y, circles[i].x, circles[i].y);
    if (d < circles[i].r) {
      valid = false;
      break;
    }
  }
  if (valid) {
    return new Circle(x, y);
  } else {
    return null;
  }
}

function draw() {
  background(0);
  let total = 10;
  let count = 0;
  let att = 0;
  while (count < total) {
    let c = newCircle();
    if (c != null) {
      circles.push(c);
      count++;
    }
    att++;
    if (att > 1000) {
      break;
    }
  }

  for (let i = 0; i < circles.length; i++) {
    if (circles[i].g) {
      if (circles[i].edges()) {
        circles[i].g = false;
      } else {
        for (let j = 0; j < circles.length; j++) {
          if (circles[i] != circles[j]) {
            let d = dist(
              circles[i].x,
              circles[i].y,
              circles[j].x,
              circles[j].y
            );
            if (d - 1 < circles[i].r + circles[j].r) {
              circles[i].g = false;
              break;
            }
          }
        }
      }
    }
    circles[i].show();
    circles[i].grow();
  }
}
