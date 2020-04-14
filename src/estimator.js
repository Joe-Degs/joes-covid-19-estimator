const covid19ImpactEstimator = (data) => {

	let result = {
		data: data,
		impact: {
			currentlyInfected: data.reportedCases * 10,
			infectionsByRequestedTime: ''
		},
		severeImpact: {
			currentlyInfected: data.reportedCases * 50,
			infectionsByRequestedTime: ''
		}
	}

	for (prop in result) {
		if (prop['infectionsByRequestedTime']) {
			prop['infectionsByRequestedTime'] =
				prop['currentlyInfected'] * (2 ** duration(data.periodType, data.timeToElapse));
		}
	}

	return result;
};

function duration (periodType, timeToElapse) {
	if (periodType === 'months') {
		monthsToDays = timeToElapse * 30;
		return Math.floor(monthsToDays / 3);
	}
	else if (periodType === 'weeks') {
		weeksToDays = timeToElapse * 7;
		return Math.floor(weeksToDays / 3);
	}
	else {
		return Math.floor(timeToElapse / 3);
	}
}

export default covid19ImpactEstimator;
