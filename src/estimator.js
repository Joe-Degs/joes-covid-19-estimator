function duration(periodType, timeToElapse) {
  if (periodType === 'months') {
    const monthsToDays = timeToElapse * 30;
    return Math.floor(monthsToDays / 3);
  }
  if (periodType === 'weeks') {
    const weeksToDays = timeToElapse * 7;
    return Math.floor(weeksToDays / 3);
  }

  return Math.floor(timeToElapse / 3);
}

const covid19ImpactEstimator = (data) => {
  const estimate = {
    data,
    impact: {
      currentlyInfected: data.reportedCases * 10
    },
    severeImpact: {
      currentlyInfected: data.reportedCases * 50
    }
  };

  Object.keys(estimate).slice(1, 3).forEach((key) => {
    estimate[key].infectionsByRequestedTime = estimate[key].currentlyInfected
    * (2 ** duration(data.periodType, data.timeToElapse));
  });

  return estimate;
};


export default covid19ImpactEstimator;
