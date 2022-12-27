const gpxFile = "Strava.gpx";
const readGpxBtn = document.getElementById("read-gpx-btn");
const rawText = document.getElementById("gpx-raw");

let gpxText;
let parser;
let xmlFile = new XMLHttpRequest();

readGpxBtn.addEventListener("click", readGpx);

function readGpx() {
  xmlFile.open("GET", gpxFile, false);
  xmlFile.send();
  rawText.innerHTML = xmlFile.responseText;
}
