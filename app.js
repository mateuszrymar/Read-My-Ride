// HTML Elements
const readGpxBtn = document.getElementById("read-gpx-btn");
const rawText = document.getElementById("gpx-raw");

// Variables
const gpxFile = "Routes.gpx";
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
		this.dist = 0; // TO BE DELETED
		this.speed = 0;
		this.interval = 0;
	}
	
	distance(lat1, lon1, lat2, lon2) {
		// Haversine formula - 0.3% error expected		
		const R = 6371e3; // metres
		const φ1 = lat1 * Math.PI/180; // φ, λ in radians
		const φ2 = lat2 * Math.PI/180;
		const Δφ = (lat2-lat1) * Math.PI/180;
		const Δλ = (lon2-lon1) * Math.PI/180;

		const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
							Math.cos(φ1) * Math.cos(φ2) *
							Math.sin(Δλ/2) * Math.sin(Δλ/2);
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
		const d = R * c; // in metres

		return d;
	}

	timeToDate(time) {
		let timeTemplate = /[0-9.]{1,}/g;
		let date;

		date = time.match(timeTemplate);
		date = new Date(Date.UTC(date[0], date[1]-1, date[2], date[3], date[4], date[5]));
		console.log(date);

		return date;
	}
	
	speedBetweenPoints(distance, interval) {
		let speed;

		if (interval != 0) {
			speed = distance / interval;
		} else {
			speed = 0;
		}

		return speed;
	}
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
	let eleTemplate = /(<ele>)((.|\n)*?)(<\/ele>)/;
	let timeTemplate = /(<time>)((.|\n)*?)(<\/time>)/;
	let previousTrackpoint;

	for ( i=0; i<trackPointList.length; i++ ) {
		let currentTrackpoint = new TrackPoint;
		let currentTrackpointRaw = trackPointList[i];

		currentTrackpoint.id = i;
		currentTrackpoint.lat = currentTrackpointRaw.match(latTemplate)[2];
		currentTrackpoint.lon = currentTrackpointRaw.match(lonTemplate)[2];
		currentTrackpoint.ele = currentTrackpointRaw.match(eleTemplate)[2];
		currentTrackpoint.time = currentTrackpointRaw.match(timeTemplate)[2];
		currentTrackpoint.time = currentTrackpoint.timeToDate(currentTrackpoint.time);

		if (i>0) {
			currentTrackpoint.interval = (currentTrackpoint.time - previousTrackpoint.time)/1000;
		} else {
			currentTrackpoint.interval = 0;
		}

		if (i>0) {
			currentTrackpoint.dist = currentTrackpoint.distance(
			previousTrackpoint.lat, previousTrackpoint.lon, currentTrackpoint.lat, currentTrackpoint.lon).toFixed(3);
		} else {
			currentTrackpoint.dist = 0;
		}

		currentTrackpoint.speed = currentTrackpoint.speedBetweenPoints(
			currentTrackpoint.dist, currentTrackpoint.interval
		).toFixed(3); 		

		trackPointObjects.push(currentTrackpoint);
		previousTrackpoint = currentTrackpoint;
	}

	rawText.innerHTML = JSON.stringify(trackPointObjects);
	console.log(trackPointObjects);
}


// function extractTrackPoints(stringToProcess, stringStart, stringFinish) {
// 	return stringToProcess.match()
// }

