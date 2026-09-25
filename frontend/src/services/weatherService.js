import {
  comparisonData,
  trendData,
  weatherByPanchayat,
} from "../data/mockData";

import { forecastByPanchayat } from "../data/forecastData";

export function getWeather(panchayat) {
  return (
    weatherByPanchayat[panchayat] ||
    weatherByPanchayat.Bara
  );
}

export function getForecast(panchayat) {
  return (
    forecastByPanchayat[panchayat] ||
    forecastByPanchayat.Bara
  );
}

export function getPanchayats() {
  return Object.keys(weatherByPanchayat);
}

export function getComparisonData() {
  return comparisonData;
}

export function getTrendData() {
  return trendData;
}