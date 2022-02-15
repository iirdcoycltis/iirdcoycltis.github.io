let pimr, digits, searchBox, indStat;
let port = 3000;

// function preload() {
//   pimr = loadStrings("pi_million.txt");
// }

function searchDigits() {
  let search = searchBox.value();
  let url = `http://localhost:` + port + `/search/${search}`;
  loadJSON(url, gotResult);
}

function gotResult(data) {
  indStat.html(data.index);
}

function setup() {
  noCanvas();
  digits = pimr[0];
  searchBox = createInput("");
  searchBox.input(searchDigits);
  indStat = createP("...");
}
