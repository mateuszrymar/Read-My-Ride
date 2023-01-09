import { HOME } from './modules/home.js';
import { INFO } from './modules/info.js';
import { UTIL } from './modules/utilities.js';

const DOM = {
	home: document.getElementsByClassName("home")[0],
	info: document.getElementsByClassName("info")[0],

	readGpxBtn: document.getElementsByClassName("upload__button")[0],
	uploadInput: document.getElementsByClassName("upload__input")[0],
	statisticsObject: document.getElementsByClassName("stats")[0],
	uploadText: document.getElementsByClassName("upload__text")[0],
	uploadUndertext: document.getElementsByClassName("upload__undertext")[0],
	uploadError: document.getElementsByClassName("upload__error")[0],
	uploadErrorHint: document.getElementsByClassName("upload__error-hint")[0],
	file_1: document.getElementsByClassName("examples__tile-1")[0],
	file_2: document.getElementsByClassName("examples__tile-2")[0],
	file_3: document.getElementsByClassName("examples__tile-3")[0],

	statsTable: document.getElementsByClassName("stats__table")[0],
};

const APP = (function () {
	// Variables
	const stopTime = 10; // Time interval [s] when we consider user stopped.
	const stopSpeed = 0.3; // Slowest speed [m/s] considered a movement.
	const numberSmoothing = 5;
	const maxFileSize = 1e6;
	const gradientBoundaries = [ -3, 1.5, 6 ];
	let gpxFile;
	let gpxFileContent;
	let gpxFileSize;
	let gpxText;
	let parser;
	let isUploadValid = false;

	UTIL.StateManager.getStateManager(); // Initialization.
	UTIL.StateManager.storeDom( 'home_baseState', DOM );
	HOME.init();

	UTIL.StateManager.createNewState( 
		'home_uploadError', 
		[ DOM.uploadError, DOM.uploadErrorHint ], 
		[ 'visibility: visible', 'visibility: hidden' ],
		[ '', '' ],
	);
	UTIL.StateManager.createNewState( 
		'home_uploadErrorHint', 
		[ DOM.readGpxBtn, DOM.uploadError, DOM.uploadErrorHint, DOM.file_1, DOM.file_2, DOM.file_3, ], 
		[ 'background-color: var(--grey-40)', 'visibility: hidden', 'visibility: visible', 'background-color: var(--green-70)', 'background-color: var(--green-70)', 'background-color: var(--green-70)' ],
		[ '', '', '', '', '', '' ],
	);
	UTIL.StateManager.createNewState( 
		'info_baseState', 
		[ DOM.home, DOM.info ], 
		[ 'display:none', 'display:block' ],
		[ '', '' ],
	);
	console.log(UTIL.storedStates)

	const validateUpload = () => {
		return new Promise((resolve, reject) => {

			DOM.uploadInput.addEventListener('change', checkUpload, false);
			DOM.uploadUndertext.addEventListener('click', displayHint, false);
			DOM.file_1.addEventListener('click', loadFile, false);
			DOM.file_2.addEventListener('click', loadFile, false);
			DOM.file_3.addEventListener('click', loadFile, false);

			function checkUpload(event) {

				console.log('Upload is being validated.');
				
				gpxFile = event.target.files[0];

				const extension = gpxFile.name.split('.')[1];
				
				if (extension != 'gpx') {

					// On wrong extension do that:
					isUploadValid = false;
					UTIL.StateManager.setState('home_uploadError');

					setTimeout(() => {					
						displayHint();
					}, 1600);

					reject( Error('This tool accepts only .gpx files.' ));

				} else {
					isUploadValid = true;
					console.log('File is valid.');
					const reader = new FileReader();
					gpxFileSize = gpxFile.size;

					if (gpxFile) {
						reader.readAsText(gpxFile);
					}

					reader.addEventListener("load", () => {
						// this will then display a text file
						// console.log(reader.result);
						gpxFileContent = reader.result;
						resolve( 'File is valid.' );
					}, false);
				}
			}

			function displayHint() { UTIL.StateManager.setState('home_uploadErrorHint') }

			function loadFile(event) {
				event.preventDefault();
				gpxFile = (event.target.href);
				fetch(event.target.href)
					.then(res => res.blob())
					.then(blob => {
						// here we can check file size:
						gpxFileSize = blob.size;
						return blob
					})
					.then(blob => blob.text())
					.then(text => {
						console.log('blob read.');
						gpxFileContent = text;
						resolve( 'File is valid.' )
					})
			}

		}, isUploadValid)
	}

	validateUpload()
		.then (() => {
			HOME.processGpx(gpxFileContent);
			localStorage.clear();
			// And optionally, display a loading screen in the meantime.
		})
		.then (() => {
			// let dataToSave = JSON.stringify(HOME.trackPointObjects);
			// localStorage.setItem('currentGpx', dataToSave);

			INFO.createPolyline(HOME.trackPointObjects);
		})
		.then (() => {
			UTIL.StateManager.setState('info_baseState');
		})
		.then (() => {
		})
		.then(() => {
			INFO.setupMap();
			let stats = INFO.calculateStats(HOME.trackPointObjects);
			INFO.displayAllStats(stats);
			console.log('displaying charts')
			INFO.prepareElevationGraph( HOME.trackPointObjects, 30 );
			INFO.prepareSpeedGraph( HOME.trackPointObjects, 30 );
			INFO.prepareGradientsGraph( HOME.trackPointObjects);
		})
		.then(() => {
		})
		.then(() => {
		})
		.then(() => {
		})

	/*
	// create a stateManager utility, store homeBaseState properties (mostly none).

	if we get a valid upload, or one of the examples was clicked,
		process data and switch to INFO screen.
	else if undertext is clicked, change state to selectExample.
	else if we get an invalid input extension, change state to errorInvalid.
	else if upload was cancelled, change state to errorCancelled.

	handleSwitch: change state to infoBaseState.
	if weightInfo was filled, process data and change state to infoWeightSubmitted (?).
	if anotherFile button was clicked, use stateManager to restore all variables to default
		and switch to HOME screen.

	*/

	function displayPerformance() {
		// Calculate statistics here
	};

	return { 
		gpxFile, 
		gpxText, 
		parser, 
		stopTime, 
		stopSpeed, 
		maxFileSize, 
		gpxFileSize, 
		numberSmoothing, 
		gradientBoundaries 
	};
})();

export { DOM, APP };