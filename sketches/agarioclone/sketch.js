// CONFIG
let playerStartingMass = 50;
let playerColor = {
  r: 0,
  g: 255,
  b: 127,
  a: 255,
};
let foodMassMultiplier = 2;
let foodDensity = 500;
let foodColor = {
  r: 0,
  g: 127,
  b: 255,
  a: 200,
};
let mapSize = 2;
let scoreSize = 50;
let scoreColor = {
  r: 255,
  g: 255,
  b: 255,
  a: 255,
};
let sceneZoomIntensity = 0.07;
let playerSteeringIntensity = 0.15;
let backgroundColor = {
  r: 0,
  g: 0,
  b: 0,
};

function Blob(x, y, r, isFood) {
  this.pos = createVector(x, y);
  this.r = r;
  this.vel = createVector(0, 0);

  this.update = function () {
    var newvel = createVector(mouseX - width / 2, mouseY - height / 2);
    newvel.setMag(3);
    this.vel.lerp(newvel, playerSteeringIntensity);
    this.pos.add(this.vel);
  };

  this.eat = function (other) {
    var d = p5.Vector.dist(this.pos, other.pos);
    if (d < this.r + other.r) {
      var sum = PI * this.r * this.r + PI * other.r * other.r;
      this.r = sqrt(sum / PI);
      //this.r += other.r / 8;
      return true;
    } else {
      return false;
    }
  };

  this.show = function () {
    if (isFood) {
      fill(foodColor.r, foodColor.g, foodColor.b, foodColor.a);
    } else {
      fill(playerColor.r, playerColor.g, playerColor.b, playerColor.a);
    }
    circle(this.pos.x, this.pos.y, this.r * 2);
  };
}

var blob;
var food = [];
var zoom = 1;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight - 1);

  blob = new Blob(0, 0, playerStartingMass, false);
  for (var i = 0; i < foodDensity; i++) {
    var x = random(-width * mapSize, width * mapSize);
    var y = random(-height * mapSize, height * mapSize);
    let r = random(5, 10) * foodMassMultiplier;
    food[i] = new Blob(x, y, r, true);
  }
}

function draw() {
  background(backgroundColor.r, backgroundColor.g, backgroundColor.b);
  fill(scoreColor.r, scoreColor.g, scoreColor.b, scoreColor.a);
  textSize(scoreSize);
  text("Score: " + round(blob.r), textSize() / 10, textSize());
  translate(width / 2, height / 2);
  var newscale = playerStartingMass / blob.r;
  zoom = lerp(zoom, newscale, sceneZoomIntensity);
  scale(zoom);
  translate(-blob.pos.x, -blob.pos.y);

  blob.show();
  blob.update();
  for (var i = food.length - 1; i >= 0; i--) {
    food[i].show();
    if (blob.eat(food[i])) {
      food.splice(i, 1);
    }
  }
}
