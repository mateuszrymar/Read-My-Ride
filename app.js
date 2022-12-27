const gpxFile = "Routes.gpx";
const readGpxBtn = document.getElementById("read-gpx-btn");
const rawText = document.getElementById("gpx-raw");

let gpxText;
let parser;
let xhr = new XMLHttpRequest();
let trackPointStart = /<trkpt/;
let trackPointEnd = /<\/trkpt>/;
let trackPoint = /(<trkpt)((.|\n)*?)(<\/trkpt>)/g;
let trackPointList;


readGpxBtn.addEventListener("click", readGpx);

function readGpx() {
  xhr.open("GET", gpxFile, false);
  xhr.send();

	rawText.innerHTML = xhr.responseText;

	trackPointList = xhr.responseText.match(trackPoint);
	// const result = trackPoint.exec(trackPointList);
	console.log(trackPointList);	
}


// function extractTrackPoints(stringToProcess, stringStart, stringFinish) {
// 	return stringToProcess.match()
// }

