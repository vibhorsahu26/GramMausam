export const historicalDataByParameter = {
  Rainfall: [
    {
      date: "18 Apr",
      observation: 22,
      blockForecast: 19,
      downscaled: 21,
    },
    {
      date: "19 Apr",
      observation: 14,
      blockForecast: 18,
      downscaled: 15,
    },
    {
      date: "20 Apr",
      observation: 31,
      blockForecast: 25,
      downscaled: 29,
    },
    {
      date: "21 Apr",
      observation: 8,
      blockForecast: 12,
      downscaled: 9,
    },
    {
      date: "22 Apr",
      observation: 17,
      blockForecast: 21,
      downscaled: 18,
    },
    {
      date: "23 Apr",
      observation: 26,
      blockForecast: 22,
      downscaled: 24,
    },
    {
      date: "24 Apr",
      observation: 18,
      blockForecast: 20,
      downscaled: 18,
    },
  ],

  Temperature: [
    {
      date: "18 Apr",
      observation: 31.4,
      blockForecast: 30.8,
      downscaled: 31.2,
    },
    {
      date: "19 Apr",
      observation: 32.1,
      blockForecast: 31.5,
      downscaled: 31.9,
    },
    {
      date: "20 Apr",
      observation: 33.6,
      blockForecast: 34.1,
      downscaled: 33.7,
    },
    {
      date: "21 Apr",
      observation: 30.8,
      blockForecast: 31.7,
      downscaled: 31.0,
    },
    {
      date: "22 Apr",
      observation: 32.9,
      blockForecast: 32.1,
      downscaled: 32.7,
    },
    {
      date: "23 Apr",
      observation: 34.2,
      blockForecast: 33.4,
      downscaled: 34.0,
    },
    {
      date: "24 Apr",
      observation: 32.0,
      blockForecast: 32.7,
      downscaled: 32.2,
    },
  ],

  Humidity: [
    {
      date: "18 Apr",
      observation: 74,
      blockForecast: 70,
      downscaled: 73,
    },
    {
      date: "19 Apr",
      observation: 72,
      blockForecast: 68,
      downscaled: 71,
    },
    {
      date: "20 Apr",
      observation: 81,
      blockForecast: 77,
      downscaled: 80,
    },
    {
      date: "21 Apr",
      observation: 69,
      blockForecast: 72,
      downscaled: 70,
    },
    {
      date: "22 Apr",
      observation: 77,
      blockForecast: 73,
      downscaled: 76,
    },
    {
      date: "23 Apr",
      observation: 82,
      blockForecast: 78,
      downscaled: 81,
    },
    {
      date: "24 Apr",
      observation: 78,
      blockForecast: 74,
      downscaled: 77,
    },
  ],
};

export const evaluationMetrics = {
  Rainfall: {
    blockMae: "6.4 mm",
    downscaledMae: "3.9 mm",
    blockRmse: "8.1 mm",
    downscaledRmse: "5.2 mm",
  },

  Temperature: {
    blockMae: "1.2°C",
    downscaledMae: "0.7°C",
    blockRmse: "1.5°C",
    downscaledRmse: "0.9°C",
  },

  Humidity: {
    blockMae: "6.1%",
    downscaledMae: "3.8%",
    blockRmse: "7.4%",
    downscaledRmse: "4.9%",
  },
};

export const rainEventMetrics = [
  {
    label: "Rain Event Detected",
    precision: "82%",
    recall: "79%",
    f1: "80%",
  },
  {
    label: "No Significant Rain",
    precision: "86%",
    recall: "88%",
    f1: "87%",
  },
];