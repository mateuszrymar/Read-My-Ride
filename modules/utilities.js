let performanceList = [];

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

export { 
  secondsToMinutesAndSeconds, 
  metersToKm, 
  performanceList,
  PerformanceStat,
  TrackPoint,
};