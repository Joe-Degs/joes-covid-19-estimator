const covid19ImpactEstimator = (data) => {

	const estimate = {
		data: data,
		impact: {
			currentlyInfected: data.reportedCases * 10
		},
		severeImpact: {
			currentlyInfected: data.reportedCases * 50
		}
	}

	for (const key of Object.keys(estimate).slice(1,3)) {
		estimate[key]['infectionsByRequestedTime'] =
			estimate[key]['currentlyInfected'] * (2 ** duration(data.periodType, data.timeToElapse));
	}

	return estimate;
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
