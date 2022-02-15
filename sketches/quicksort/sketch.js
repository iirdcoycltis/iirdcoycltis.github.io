let values;
let i = 0;
let w;
let t = 0;
let states = [];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function swap(arr, a, b) {
  await sleep(50);
  t++;

  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}

async function partition(arr, start, end) {
  let pivotIndex = start;
  let pivotValue = arr[end];
  states[pivotIndex] = 0;
  for (let i = start; i < end; i++) {
    if (arr[i] < pivotValue) {
      await swap(arr, i, pivotIndex);
      states[pivotIndex] = -1;
      pivotIndex++;
      states[pivotIndex] = 0;
    }
  }
  await swap(arr, pivotIndex, end);
  return pivotIndex;
}

async function quickSort(arr, start, end) {
  if (start >= end) {
    return;
  }
  let index = await partition(arr, start, end);
  states[index] = -1;
  await Promise.all([
    quickSort(arr, start, index - 1),
    quickSort(arr, index + 1, end),
  ]);
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  w = 2;
  values = new Array(floor(width / w));
  for (let i = 0; i < values.length; i++) {
    values[i] = random(height);
    states[i] = -1;
  }
  // frameRate(5);
  quickSort(values, 0, values.length - 1);
}

function draw() {
  background(51);
  fill(255, 0, 0);
  textSize(40);
  text("Swaps: " + t, 0, 40);
  for (let i = 0; i < values.length; i++) {
    noStroke();
    if (states[i] == 0) {
      fill(0, 0, 255);
    } else {
      fill(255);
    }
    rect(i * w, height - values[i], w, values[i]);
  }
}
