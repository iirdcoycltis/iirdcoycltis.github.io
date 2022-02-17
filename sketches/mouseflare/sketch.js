// CONFIG
let shape = "circle";
let density = 5;
let maxarr = 1000;
let speed = 1;
let sizemin = 16;
let sizemax = 64;

class Particle {
  constructor() {
    this.x = random(mouseX);
    this.y = random(mouseY);
    this.vx = random(-10, 10);
    this.vy = random(-10, 10);
    this.r = random(sizemin, sizemax);
  }

  show() {
    //stroke(255);
    noStroke();
    fill(255, 50);
    if (shape === "circle") {
      ellipse(this.x, this.y, this.r);
    } else if (shape === "square") {
      rect(this.x, this.y, this.r);
    } else {
      console.error("Invalid config!");
    }
  }

  update() {
    this.x += this.vx * speed;
    this.y += this.vy * speed;
  }
}

let particles = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  rectMode(CENTER);
}

function draw() {
  background(0);
  for (let j = 0; j < density; j++) {
    particles.push(new Particle());
    if (particles.length > maxarr) {
      particles.shift();
    }
  }
  for (let i = 0; i < particles.length; i++) {
    particles[i].show();
    particles[i].update();
  }
}
