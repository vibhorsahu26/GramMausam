import {
  evaluationMetrics,
  historicalDataByParameter,
  rainEventMetrics,
} from "../data/historicalData";

function buildExtendedData(parameter) {
  const base = historicalDataByParameter[parameter];

  const extraData = [
    {
      date: "02 Apr",
      observation: base[0].observation + 2,
      blockForecast: base[0].blockForecast + 1,
      downscaled: base[0].downscaled + 1,
    },
    {
      date: "05 Apr",
      observation: base[1].observation - 1,
      blockForecast: base[1].blockForecast + 2,
      downscaled: base[1].downscaled,
    },
    {
      date: "08 Apr",
      observation: base[2].observation + 3,
      blockForecast: base[2].blockForecast + 1,
      downscaled: base[2].downscaled + 2,
    },
    {
      date: "11 Apr",
      observation: base[3].observation + 1,
      blockForecast: base[3].blockForecast - 1,
      downscaled: base[3].downscaled,
    },
    {
      date: "14 Apr",
      observation: base[4].observation - 2,
      blockForecast: base[4].blockForecast,
      downscaled: base[4].downscaled - 1,
    },
    {
      date: "17 Apr",
      observation: base[5].observation + 1,
      blockForecast: base[5].blockForecast - 1,
      downscaled: base[5].downscaled,
    },
  ];

  return [...extraData, ...base];
}

export function getHistoricalData(
  parameter,
  period = "7 Days"
) {
  if (period === "3 Days") {
    return historicalDataByParameter[parameter].slice(-3);
  }

  if (period === "30 Days") {
    return buildExtendedData(parameter);
  }

  return historicalDataByParameter[parameter];
}

export function getEvaluationMetrics(parameter) {
  return evaluationMetrics[parameter];
}

export function getRainEventMetrics() {
  return rainEventMetrics;
}