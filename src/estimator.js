const duration = (periodType, timeToElapse) => {
  const toDays = {
    days: timeToElapse,
    months: timeToElapse * 30,
    weeks: timeToElapse * 7
  };
  return [toDays[periodType], Math.trunc(toDays[periodType] / 3)];
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
    const daysElapsed = duration(data.periodType, data.timeToElapse);
    estimate[key].infectionsByRequestedTime = estimate[key].currentlyInfected
     * (2 ** daysElapsed[1]);

    const severeCases = percentage(15, estimate[key].infectionsByRequestedTime);
    const requiredBeds = percentage(35, data.totalHospitalBeds);
    estimate[key].severeCasesByRequestedTime = Math.trunc(severeCases);
    estimate[key].hospitalBedsByRequestedTime = Math.trunc(requiredBeds - severeCases);

    // challenge 3
    const icu = percentage(5, estimate[key].infectionsByRequestedTime);
    const ventilators = percentage(2, estimate[key].infectionsByRequestedTime);
    estimate[key].casesForICUByRequestedTime = Math.trunc(icu);
    estimate[key].casesForVentilatorsByRequestedTime = Math.trunc(ventilators);
    const totalIncome = data.region.avgDailyIncomeInUSD * data.region.avgDailyIncomePopulation;
    const avgIncome = (estimate[key].infectionsByRequestedTime * totalIncome) / daysElapsed[0];
    estimate[key].dollarsInFlight = Math.trunc(avgIncome);
  });

  return estimate;
};

module.exports = covid19ImpactEstimator;
// export default covid19ImpactEstimator;
