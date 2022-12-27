// HTML Elements
const readGpxBtn = document.getElementById("read-gpx-btn");
const rawText = document.getElementById("gpx-raw");

// Variables
const gpxFile = "Strava.gpx";
let gpxText;
let parser;
let xhr = new XMLHttpRequest();
let trackPointList;

// Event Listeners
readGpxBtn.addEventListener("click", readGpx);


/* Notes
1. Figure out a way to execute readGpx function asynchronously.
*/

// Script body
class TrackPoint {
	constructor(id, lat, lon, ele, time) {
		this.id = id;
		this.lat = lat;
		this.lon = lon;
		this.ele = ele;
		this.time = time;
		this.speed = 0;
	}
	
	distance(lat1, lon1, ele1, lat2, lon2, ele2) {}
	
	speed(distance, time) {}
};

function readGpx() {
	let trackPointObjects = [];
	
	xhr.open("GET", gpxFile, false);
  xhr.send();
	
	
	let trackPointTemplate = /(<trkpt)((.|\n)*?)(<\/trkpt>)/g;
	trackPointList = xhr.responseText.match(trackPointTemplate); // We divided GPX into individual trackpoints.
	console.log(trackPointList);	
	// Now we need to extract data from trackpoints into elements.
	let latTemplate = /(lat=")((.|\n)*?)(")/;
	let lonTemplate = /(lon=")((.|\n)*?)(")/;

	for ( i=0; i<trackPointList.length; i++ ) {
		let currentTrackpoint = new TrackPoint;
		let currentTrackpointRaw = trackPointList[i];

		currentTrackpoint.id = i;
		currentTrackpoint.lat = currentTrackpointRaw.match(latTemplate)[2];
		currentTrackpoint.lon = currentTrackpointRaw.match(lonTemplate)[2];

		trackPointObjects.push(currentTrackpoint);
	}

	rawText.innerHTML = trackPointList;
	console.log(trackPointObjects);
}


// function extractTrackPoints(stringToProcess, stringStart, stringFinish) {
// 	return stringToProcess.match()
// }

