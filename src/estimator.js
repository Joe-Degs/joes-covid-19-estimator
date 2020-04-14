const duration = (periodType, timeToElapse) => {
  const toDays = {
    days: timeToElapse,
    months: timeToElapse * 30,
    weeks: timeToElapse * 7
  };
  return Math.trunc(toDays[periodType] / 3);
};

const percentage = (percent, number) => (percent / 100) * number;

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

    const severeCases = percentage(15, estimate[key].infectionsByRequestedTime);
    const requiredBeds = percentage(35, data.totalHospitalBeds);
    estimate[key].severeCasesByRequestedTime = Math.trunc(severeCases);
    estimate[key].hospitalBedsByRequestedTime = Math.trunc(requiredBeds - severeCases);
  });

  return estimate;
};


export default covid19ImpactEstimator;
