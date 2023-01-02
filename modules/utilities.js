const UTIL = (function() {
	let performanceList = [];
	let storedStates = [];

	function secondsToMinutesAndSeconds(sec) {
		let result;
		sec = Number(sec);
		let hours = Math.floor(sec / 3600);
		let minutes = Math.floor(sec % 3600 / 60);
		let seconds = Math.floor(sec % 3600 % 60);
		
		if (minutes == 0) {
			minutes = `00`
		} else if (minutes < 10) {
			minutes = `0${minutes}`
		}
		
		if (seconds === 0) {
			seconds = `00`
		} else if (seconds < 10) {
			seconds = `0${seconds}`
		}
		
		result = `${hours}:${minutes}:${seconds}`;
		return result;
	}
	
	function metersToKm(m) {
		let km;
	
		km = (m/1000).toFixed(2);
	
		return km;
	}
	
	class PerformanceStat {
		constructor(name, value) {
			this.name = name;
			this.value = value;
		}
	
		startTimer() {
			let start = Date.now();
			return start;
		}
	
		endTimer() {
			let end = Date.now();
			return end;
		}
	
		evaluateTimer(performanceStat, startTimer, endTimer) {
			performanceStat.value = endTimer - startTimer;
		}
	
		addStat(stat, unit) {
			performanceList = (`${performanceList}
				<li>${stat.name}: ${stat.value} ${unit}</li>
			`);
		}
	}
	
	class TrackPoint {
		constructor(id, lat, lon, ele, time) {
			this.id = id;
			this.lat = lat;
			this.lon = lon;
			this.ele = ele;
			this.time = time;
			this.dist = 0;
			this.speed = 0;
			this.interval = 0;
			this.eleDiff = 0;
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
	
		elevationDifference(ele1, ele2) {
			let eleDiff = 0;
	
			eleDiff = ele2 - ele1;
	
			return eleDiff;
		}
	};

	const StateManager = (function() {
		let StateManager;
		// (!StateManager) ? console.log('no SM') : console.log('SM');

		class State {
			constructor( name, domElements, current ) {
				name = this.name;
				domElements = this.domElements;
				current = this.current;
			}
		}

		function createStateManager() {
			console.log('state manager created.')
			return new Object({name: 'stateManager'});
		}

		function storeDom(stateName, elementsToStore) {
			let elementsArray = [];
			let stateToStore = new State;
			class domElement {
				constructor( element, innerHtml, style ) {
					element = this.element;
					innerHtml = this.innerHtml;
					style = this.style;
				}
			}

			stateToStore.name = stateName;
			stateToStore.current = true;

			let entry = Object.entries(elementsToStore);
			let styleTemplate = /(style=")((.|\n)*?)(")/;
			for ( let i = 0; i < entry.length; i++ ) {
				let currentElement = new domElement;

				currentElement.id = entry[i][1].id;				
				currentElement.innerHtml = entry[i][1].innerHTML;

				// console.log(i);
				let currentOuterHtml = entry[i][1].outerHTML;
				let currentStyle = currentOuterHtml.match(styleTemplate);
				if (currentStyle !== null) {
					currentStyle = currentStyle[2];
				} else { currentStyle = '' }
				currentElement.style = currentStyle;
				
				elementsArray.push(currentElement);
			};

			stateToStore.domElements = elementsArray;

			storedStates.push(stateToStore);
			console.log(storedStates);
		}

		function createNewState( stateName, targetElement, style, innerHtml) {
			let oldCurrentState = checkCurrentState();
			let newCurrentState;			
			let stateToCreate = new State;

			stateToCreate.name = stateName;

			stateToCreate.current = false;

			let nameArr = (oldCurrentState.domElements).map(
				({ id, innerHtml, style }) => {return id});

			// for ( let i=0; i<targetElement.length; i++ ) {
			// 	console.log(targetElement[i].id);				

			// }

			// targetElement.forEach(i => {
			// 	// let targetElementIndex = nameArr.indexOf(targetElement[i].id);
			// 	console.log(targetElement[0].id);				
			// });

			let targetElementIndex = nameArr.indexOf(targetElement.id);
			stateToCreate.domElements = oldCurrentState.domElements;
			if (targetElementIndex !== -1) {
				let toChange = stateToCreate.domElements[targetElementIndex];
				stateToCreate.domElements[targetElementIndex].style = style;
				stateToCreate.domElements[targetElementIndex].innerHtml = innerHtml;
			};

			storedStates.push(stateToCreate);
		}


		function checkCurrentState() {
			let currentState;
			for ( let i=0; i< storedStates.length; i++) {
				let current = (storedStates).map(
					({ name, current, domElements }) => {return current});	
				if ( current[i] === true ) {
					currentState = storedStates[i];
				}
			}
			return currentState;
		}

		function setState(newStateName) {
			let oldState = checkCurrentState();
			let baseState = storedStates[0];
			console.log(oldState);
			let newState;
			// first we need to check if a State exists with a name === newState
			if ( findStateIndex(newStateName) !== -1 ) {
				newState = storedStates[findStateIndex(newStateName)];
				console.log( oldState, newState );
				switchStates( oldState, baseState );
				switchStates( baseState, newState );
			} else throw new Error ('This state has not been specified yet.')

			// now we change all DOM objects.
			console.log(newState.domElements);
			newState.domElements.forEach(item => {
				// document.getElementById(item.element).style = item.style;
				if ( item.innerHtml !== '' ) {
					document.getElementById(item.id).innerHTML = item.innerHtml;
				};
				if ( item.style !== '' ) {
					document.getElementById(item.id).style = item.style;
				};
			});

		}

		function findStateIndex(stateName) {
			let result;

			let statesArr = (storedStates).map(
				({ name, current, domElements }) => {return name});
			let targetStateIndex = statesArr.indexOf(stateName);
			result = targetStateIndex;

			return result;
		}

		function switchStates( currentState, newState ) {
			if ( findStateIndex(newState.name) !== -1 ) {
				currentState.current = false;
				newState.current = true;
				currentState = newState;
			} else throw new Error ('This state has not been specified yet.');
			
			return currentState;
		}

		return {			
			getStateManager: function() {
				if (!StateManager) {
					StateManager = createStateManager();
				} else {
					return StateManager;
				}
			},

			storeDom,
			createNewState,
			setState,
			findStateIndex


			// changeDomElement(newStateName, elementToChange),
	
		}
	})();
	
	return { 
		secondsToMinutesAndSeconds, 
		metersToKm, 
		performanceList,
		PerformanceStat,
		TrackPoint,
		StateManager,
		storedStates,
	};
})();

export { UTIL };

