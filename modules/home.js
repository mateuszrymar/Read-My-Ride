import { DOM, APP } from '../app.js';
import { UTIL } from './utilities.js';

const HOME = (function () {
	let trackPointList;
	let trackPointObjects = [];
	let gpxProcessingTime = new UTIL.PerformanceStat;
	let gpxProcessingStart;
	let gpxProcessingEnd;
	let noOfOptimizations;


	function init() {
		[ DOM.readGpxBtn, DOM.uploadText ].forEach(function (element) {
			element.addEventListener('click', uploadClicked);
		});
		DOM.uploadUndertext.addEventListener('click', undertextClicked)
	};

	function uploadClicked(){
		DOM.uploadInput.click();
	}

  function undertextClicked() {
    console.log('TODO: undertext clicked');
  }

	function processDataFromUpload(data) {
		console.log('processDataFromUpload function started.')
		const processPromise = Promise.resolve(processGpx(data));
	
		processPromise
			.then(() => {
        localStorage.clear();
        console.log('local storage cleared');
      })
			.then(() => {
				let dataToSave = JSON.stringify(trackPointObjects);
				localStorage.setItem('currentGpx', dataToSave);
			})				
			.then(() => {
        calculateGpxProcessingTime();
        console.log(gpxProcessingTime, 'ms');
        gpxProcessingTime.addStat(gpxProcessingTime, 'ms')
        // performanceObject.innerHTML = performanceList;
			})
	}		

	function checkFileSize(fileSize) {
		noOfOptimizations = Math.ceil(Math.log2(fileSize/APP.maxFileSize));
		// console.log(noOfOptimizations);
		if ( fileSize > APP.maxFileSize ) {
      console.log(`File's too big, we need to take 1 in every ${Math.pow( 2, noOfOptimizations )} points.`);
    } else {
      console.log("File size ok, no need to optimize it.");			
		}
		return noOfOptimizations;
	}

	function optimizeFile( contentArray, noOfOptimizations ) {
		let optimized = [];
		for ( let i=0; i<contentArray.length; i++) {
			let currentEntry = contentArray[i];
			optimized.push(currentEntry);
			i = i + Math.pow( 2, (noOfOptimizations - 1) );
		}
		return optimized;
	}

	function processGpx(content, fileSize) {
		console.log('processGPX function started.');
		gpxProcessingStart = gpxProcessingTime.startTimer();
		
		let trackPointTemplate = /(<trkpt)((.|\n)*?)(<\/trkpt>)/g;
		trackPointList = content.match(trackPointTemplate); // We divided GPX into individual trackpoints.
		
		// Now if file is too large, we'll skip some points:
		let numberOfOptimizations = checkFileSize(fileSize);
		if ( numberOfOptimizations > 0 ) {
			let newTrackpoints = HOME.optimizeFile( trackPointList, numberOfOptimizations );
			trackPointList = newTrackpoints;
		}

		// Now we need to extract data from trackpoints into elements.
		let latTemplate = /(lat=")((.|\n)*?)(")/;
		let lonTemplate = /(lon=")((.|\n)*?)(")/;
		let eleTemplate = /(<ele>)((.|\n)*?)(<\/ele>)/;
		let timeTemplate = /(<time>)((.|\n)*?)(<\/time>)/;
		let previousTrackpoint;
	
		for ( let i=0; i<trackPointList.length;  ) {
			let currentTrackpoint = new UTIL.TrackPoint;
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

			if (i>0) {
				currentTrackpoint.totDist = parseFloat(previousTrackpoint.totDist) + parseFloat( currentTrackpoint.dist);
				// currentTrackpoint.totDist = parseFloat(currentTrackpoint.totDist);
				currentTrackpoint.totDist = currentTrackpoint.totDist.toFixed(3);
			} else {
				currentTrackpoint.totDist = 0;
			}
	
			currentTrackpoint.speed = currentTrackpoint.speedBetweenPoints(
				currentTrackpoint.dist, currentTrackpoint.interval
			).toFixed(3);
	
			if (i>0) {
				currentTrackpoint.eleDiff = currentTrackpoint.elevationDifference(
					previousTrackpoint.ele, currentTrackpoint.ele).toFixed(2);
			} else {
				currentTrackpoint.eleDiff = 0;
			}
	
			trackPointObjects.push(currentTrackpoint);
			previousTrackpoint = currentTrackpoint;

			i++;
			if ( i ===  (trackPointList.length)) {
				smoothSpeed(trackPointObjects);
			}
		}
		
		function smoothSpeed(trackPointObjects) {
			// numberSmoothing
			let speeds = (trackPointObjects).map(
				({ speed }) => {return speed});
			let smoothSpeeds = UTIL.smoothArray(speeds, APP.numberSmoothing, 2);

			for (let i = 0; i < trackPointObjects.length; i++) {
				trackPointObjects[i].speed = smoothSpeeds[i];				
			}

			return trackPointObjects;
		}
    
    gpxProcessingEnd = gpxProcessingTime.endTimer();
		return trackPointObjects;
	}

  function calculateGpxProcessingTime() {
    gpxProcessingTime.name = 'GPX processing time';
    gpxProcessingTime.evaluateTimer(
      gpxProcessingTime, gpxProcessingStart, gpxProcessingEnd);
  };

  return {
		init,
    // uploadClicked,
    // undertextClicked,
    // processDataFromUpload,
    // fetchDataFromGpx,
    // handleFileSelect,
    // handleFileLoad,
    processGpx,
    // calculateGpxProcessingTime,
		checkFileSize,
		optimizeFile,
    // gpxProcessingTime,
		trackPointObjects,
  }	
})();

export { HOME };