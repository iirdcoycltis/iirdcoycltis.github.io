class Box {
  constructor(x, y, w, h) {
    const options = {
      restitution: 0.2,
    };
    this.body = Matter.Bodies.rectangle(x, y, w, h, options);
    Matter.World.add(world, this.body);
    this.w = w;
    this.h = h;
  }

  show() {
    const pos = this.body.position;
    const angle = this.body.angle;

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    fill(255);
    imageMode(CENTER);
    image(boximg, 0, 0, this.w, this.h);
    pop();
  }
}

class Ground extends Box {
  constructor(x, y, w, h) {
    super(x, y, w, h);
    this.body.isStatic = true;
  }

  show() {
    const pos = this.body.position;
    const angle = this.body.angle;

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    fill(255);
    rectMode(CENTER);
    rect(0, 0, this.w, this.h);
    pop();
  }
}

class Bird {
  constructor(x, y, r) {
    const options = {
      restitution: 0.5,
    };
    this.body = Matter.Bodies.circle(x, y, r, options);
    Matter.Body.setMass(this.body, this.body.mass * 4);
    Matter.World.add(world, this.body);
    this.r = r;
  }

  show() {
    const pos = this.body.position;
    const angle = this.body.angle;

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    imageMode(CENTER);
    image(dotimg, 0, 0, this.r * 2, this.r * 2);
    pop();
  }
}

class Slingshot {
  constructor(x, y, body) {
    const options = {
      pointA: {
        x: x,
        y: y,
      },
      bodyB: body,
      stiffness: 0.02,
      length: 40,
    };
    this.sling = Constraint.create(options);
    World.add(world, this.sling);
  }

  fly() {
    this.sling.bodyB = null;
  }

  attach(body) {
    this.sling.bodyB = body;
  }

  show() {
    if (this.sling.bodyB) {
      stroke(255);
      const posA = this.sling.pointA;
      const posB = this.sling.bodyB.position;
      line(posA.x, posA.y, posB.x, posB.y);
    }
  }
}

const { Engine, World, Bodies, Mouse, MouseConstraint, Constraint } = Matter;

let ground, bird, world, engine, mConst, slingshot, dotimg, boximg;
const boxes = [];

function preload() {
  dotimg = loadImage("images/dot.png");
  boximg = loadImage("images/equals.png");
}

function setup() {
  const canvas = createCanvas(600, 400);

  engine = Engine.create();
  world = engine.world;

  ground = new Ground(width / 2, height - 10, width, 20);
  for (let i = 0; i < 3; i++) {
    boxes[i] = new Box(450, 300 - i * 100, 100, 100);
  }
  bird = new Bird(150, 300, 25);

  slingshot = new Slingshot(150, 300, bird.body);

  const mouse = Mouse.create(canvas.elt);
  const options = {
    mouse: mouse,
  };
  mConst = MouseConstraint.create(engine, options);
  World.add(world, mConst);
}

function keyPressed() {
  if (key == " ") {
    World.remove(world, bird.body);
    bird = new Bird(150, 300, 25);
    slingshot.attach(bird.body);
  }
}

function mouseReleased() {
  setTimeout(() => {
    slingshot.fly();
  }, 100);
}

function draw() {
  background(0);
  Engine.update(engine);
  ground.show();
  for (let box of boxes) {
    box.show();
  }
  slingshot.show();
  bird.show();
}
