import { DOM, APP } from '../index.js';
import { UTIL } from './utilities.js';

const HOME = (function () {
	let trackPointList;
	// let trackPointObjects = [];
	let gpxProcessingTime = new UTIL.PerformanceStat;
	let gpxProcessingStart;
	let gpxProcessingEnd;
	let noOfOptimizations;

	function createStates() {
		UTIL.StateManager.createNewState( 
			'home_domContentLoaded', 
			[ DOM.homeUpload, DOM.homeExamples ], 
			[ 'visibility: visible', 'visibility: visible' ],
			[ '', '' ],
		);
		UTIL.StateManager.createNewState( 
			'home_uploadError', 
			[ DOM.uploadError, ], 
			[ 'visibility: visible', ],
			[ '', ],
		);
		UTIL.StateManager.createNewState( 
			'info_baseState', 
			[ DOM.home, DOM.info, DOM.footer ], 
			[ 'display:none', 'display:flex', 'display: flex;' ],
			[ '', '', '' ],
		);
	}



	function uploadClicked(event){
		console.log('uploadClicked works');
		event.preventDefault();
		APP.runCheck(event);
		DOM.uploadInput.click();
	}
	
  function undertextClicked(event) {
		console.log('undertextClicked works');
		event.preventDefault();
    console.log('TODO: undertext clicked');
  }
	
	function anotherRideClicked(event) {
		console.log('another ride works');
		UTIL.StateManager.setState('home_baseState');
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
		let trackPointObjects = [];
		
		let trackPointTemplate = /(<trkpt)((.|\s)*?)(\/trkpt>)/g;
		trackPointList = content.match(trackPointTemplate); // We divided GPX into individual trackpoints.

		// Now we need to extract data from trackpoints into elements.
		let latTemplate = /(lat=")((.|\n)*?)(")/;
		let lonTemplate = /(lon=")((.|\n)*?)(")/;
		let eleTemplate = /(<ele>)((.|\n)*?)(<\/ele>)/;
		let timeTemplate = /(<time>)((.|\n)*?)(<\/time>)/;
		let previousTrackpoint;

		// Some GPX files don't contain time data. We should at least inform the user why we won't show him data,
		// or why we show partial data only.
		const hasGpxLat = Boolean(trackPointList[0].match(latTemplate));
		const hasGpxLon = Boolean(trackPointList[0].match(lonTemplate));
		const hasGpxEle = Boolean(trackPointList[0].match(eleTemplate));
		const hasGpxTime = Boolean(trackPointList[0].match(timeTemplate));

		if ((hasGpxLat && hasGpxLon && hasGpxEle && hasGpxTime) === true) {
			console.log('Your GPX has all necessary information.');
		} else {
			const hasInfo = [hasGpxLat, hasGpxLon, hasGpxEle, hasGpxTime];
			const names = [`Latitude`, `Longitude`, `Elevation`, `Time`];
			let missingInfoIndices = [];
			const elementToSearchFor = false;

			let foundIndex = hasInfo.indexOf(elementToSearchFor);
			while (foundIndex !== -1) {
				missingInfoIndices.push(foundIndex);
				foundIndex = hasInfo.indexOf(elementToSearchFor, foundIndex + 1);
			}
			console.log(missingInfoIndices);

			const missingInfoNames = missingInfoIndices.map(x=>names[x]);

			UTIL.StateManager.createNewState( 
				'home_gpxDataError', 
				[ DOM.uploadError, ], 
				[ 'visibility: visible', ],
				[ `${missingInfoNames} data is missing in your GPX.`, ],
			);

			UTIL.StateManager.setState('home_gpxDataError');

			throw new Error(`${missingInfoNames} data is missing in your GPX. Please provide a valid file.`);
			return;
		};

		// Now if file is too large, we'll skip some points:
		let numberOfOptimizations = checkFileSize(fileSize);
		if ( numberOfOptimizations > 0 ) {
			let newTrackpoints = HOME.optimizeFile( trackPointList, numberOfOptimizations );
			trackPointList = newTrackpoints;
			let optimizedTrackpoints = '';
			for (let i = 0; i < newTrackpoints.length; i++) {
				const element = newTrackpoints[i];
				optimizedTrackpoints = `${optimizedTrackpoints}${element}`;				
			}
		}
	
		for ( let i=0; i<trackPointList.length;) {
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
		createStates,
    uploadClicked,
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
		// trackPointObjects,
  }	
})();

export { HOME };