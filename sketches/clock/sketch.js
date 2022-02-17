// VARIABLES

/*
let r1 = 50;  let g1 = 150; let b1 = 255;

let r2 = 150; let g2 = 255; let b2 = 0;

let r3 = 255; let g3 = 100; let b3 = 150;

let br = 50;  let bg = 50;  let bb = 50;

let tr = 255; let tg = 255; let tb = 255;
*/

// TONED DOWN PRESET

let r1 = 100;
let g1 = 100;
let b1 = 255;

let r2 = 100;
let g2 = 255;
let b2 = 100;

let r3 = 255;
let g3 = 100;
let b3 = 50;

let br = 0;
let bg = 20;
let bb = 20;

let tr = 255;
let tg = 255;
let tb = 255;

let lnThick = 40;

let canvasWidth = $(window).width();
let canvasHeight = $(window).height();

function sleep(msd) {
  return new Promise((resolve) => {
    setTimeout(resolve, msd);
  });
}

let batterylevel;

navigator.getBattery().then(function (battery) {
  batterylevel = battery.level * 100;
  battery.addEventListener("levelchange", function () {
    batterylevel = battery.level * 100;
  });
});

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  angleMode(DEGREES);
  console.log("Created by Norman94!");

  if ("getbattery" in navigator) {
    console.warn("Battery detection not supported");
  } else {
    console.info("Battery detection supported");
  }
}

function draw() {
  background(br, bg, bb);
  translate(canvasWidth / 2, canvasHeight / 2);
  rotate(-90);

  // window.addEventListener('resize',function(){location.reload(true)});

  let hr = correctHour();
  let mn = minute();
  let sc = second();
  let mo = getMonth(month());
  let da = day();
  let ye = year();

  // WHEELS

  strokeWeight(lnThick);
  noFill();
  stroke(r1, g1, b1);
  arc(0, 0, 700, 700, 0, map(hr + mn / 60 + sc / 3600, 0, 12, 0, 360));
  stroke(r2, g2, b2);
  arc(0, 0, 600, 600, 0, map(mn + sc / 60, 0, 60, 0, 360));
  stroke(r3, g3, b3);
  arc(0, 0, 500, 500, 0, map(sc, 0, 60, 0, 360));

  // TIME

  rotate(90);

  textSize(80);
  strokeWeight(0);
  fill(r1, g1, b1);
  if (hr < 10) {
    text("0" + hr, -195, +15);
  } else {
    text(hr, -195, +15);
  }
  fill(r2, g2, b2);
  if (mn < 10) {
    text("0" + mn, -42, 15);
  } else {
    text(mn, -42, 15);
  }
  fill(r3, g3, b3);
  if (sc < 10) {
    text("0" + sc, 105, 15);
  } else {
    text(sc, 105, 15);
  }
  fill(tr, tg, tb);
  if (hour() <= 12) {
    text("AM", -61, 150);
  } else {
    text("PM", -61, 150);
  }
  textSize(50);
  text(mo + " " + da, -110, -140);
  textSize(40);
  text(ye, -45, -100);

  translate(-(canvasWidth / 2), -(canvasHeight / 2));

  textSize(40);

  text(batterylevel + "%", 127, 44);
  if (batterylevel <= 100 && batterylevel > 80) {
    fill(0, 255, 127);
  }
  if (batterylevel <= 80 && batterylevel > 60) {
    fill(127, 255, 0);
  }
  if (batterylevel <= 60 && batterylevel > 40) {
    fill(255, 255, 0);
  }
  if (batterylevel <= 40 && batterylevel > 20) {
    fill(255, 127, 0);
  }
  if (batterylevel <= 20 && batterylevel > 0) {
    fill(255, 0, 0);
  }
  rect(10, 10, batterylevel, 40);
  fill(255);
  rect(110, 20, 7, 21);
  fill(0, 0, 0, 0);
  strokeWeight(4);
  stroke(255);
  rect(10, 10, 100, 40);
}

function correctHour() {
  if (hour() % 12 == 0) {
    return 12;
  } else {
    return hour() % 12;
  }
}

function getMonth(mi) {
  if ((mi = 1)) {
    return "January";
  }
  if ((mi = 2)) {
    return "February";
  }
  if ((mi = 3)) {
    return "March";
  }
  if ((mi = 4)) {
    return "April";
  }
  if ((mi = 5)) {
    return "May";
  }
  if ((mi = 6)) {
    return "June";
  }
  if ((mi = 7)) {
    return "July";
  }
  if ((mi = 8)) {
    return "August";
  }
  if ((mi = 9)) {
    return "September";
  }
  if ((mi = 10)) {
    return "October";
  }
  if ((mi = 11)) {
    return "November";
  }
  if ((mi = 12)) {
    return "December";
  }
}

function getTime() {
  /* DEBUG TOOL */ console.log(
    "HOURS = " + hr + "\nMINUTES = " + mn + "\nSECONDS = " + sc
  );
}

function getValues() {
  console.log(
    "r1 = " +
      r1 +
      "\ng1 = " +
      g1 +
      "\nb1 = " +
      b1 +
      "\n\nr2 = " +
      r2 +
      "\ng2 = " +
      g2 +
      "\nb2 = " +
      b2 +
      "\n\nr3 = " +
      r3 +
      "\ng3 = " +
      g3 +
      "\nb3 = " +
      b3 +
      "\n\nbr = " +
      br +
      "\nbg = " +
      bg +
      "\nbb = " +
      bb +
      "\n\ntr = " +
      tr +
      "\ntg = " +
      tg +
      "\ntb = " +
      tb
  );
}
