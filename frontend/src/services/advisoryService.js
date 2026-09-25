export const crops = {
  Wheat: {
    stages: [
      "Germination",
      "Vegetative Stage",
      "Flowering",
      "Maturity",
    ],
  },

  Rice: {
    stages: [
      "Nursery",
      "Vegetative Stage",
      "Tillering",
      "Flowering",
      "Maturity",
    ],
  },

  Mustard: {
    stages: [
      "Vegetative Stage",
      "Flowering",
      "Pod Formation",
      "Maturity",
    ],
  },

  Potato: {
    stages: [
      "Vegetative Stage",
      "Tuber Formation",
      "Tuber Bulking",
      "Maturity",
    ],
  },
};

export function createAdvisory({
  crop,
  stage,
  rainfall,
  rainProbability,
  temperature,
  humidity,
  wind,
}) {
  const heavyRain =
    rainfall >= 25 || rainProbability >= 80;

  const moderateRain =
    rainfall >= 15 || rainProbability >= 60;

  const heat = temperature >= 35;

  const strongWind = wind >= 15;

  const highHumidity = humidity >= 80;

  const actions = [];

  if (heavyRain) {
    actions.push({
      title: "Avoid irrigation",
      description:
        "Expected rainfall may provide sufficient moisture and increase the risk of excess water.",
    });
  } else if (moderateRain) {
    actions.push({
      title: "Review irrigation timing",
      description:
        "Check field moisture before the next irrigation cycle instead of following a fixed schedule.",
    });
  } else {
    actions.push({
      title: "Monitor soil moisture",
      description:
        "Lower rainfall conditions may require irrigation depending on field moisture and crop demand.",
    });
  }

  if (heavyRain) {
    actions.push({
      title: "Protect field drainage",
      description:
        "Inspect drainage channels and low-lying portions of the field before the rainfall event.",
    });
  } else {
    actions.push({
      title: "Field operations can continue",
      description:
        "Weather conditions are comparatively suitable for routine field activity.",
    });
  }

  if (highHumidity) {
    actions.push({
      title: "Monitor for disease",
      description:
        "Persistent humid conditions can increase the suitability for some fungal and moisture-related crop problems.",
    });
  } else {
    actions.push({
      title: "Continue crop monitoring",
      description:
        "Regular scouting should continue through the current crop stage.",
    });
  }

  if (heat) {
    actions.push({
      title: "Monitor heat stress",
      description:
        "Higher daytime temperatures may increase crop water demand, especially in sensitive stages.",
    });
  } else if (strongWind) {
    actions.push({
      title: "Check wind-sensitive operations",
      description:
        "Avoid weather-sensitive field operations when stronger winds are expected.",
    });
  } else {
    actions.push({
      title: "Normal crop monitoring",
      description:
        "No major temperature or wind-related concern is indicated by today's demonstration forecast.",
    });
  }

  let level = "Low";

  if (heavyRain || (heat && highHumidity)) {
    level = "High";
  } else if (moderateRain || heat || strongWind) {
    level = "Medium";
  }

  let summary;

  if (level === "High") {
    summary = `Weather conditions require closer attention for ${crop} during the ${stage.toLowerCase()} stage.`;
  } else if (level === "Medium") {
    summary = `Some weather-related adjustments may be useful for ${crop} during the ${stage.toLowerCase()} stage.`;
  } else {
    summary = `Current weather conditions show no major immediate advisory concern for ${crop}.`;
  }

  return {
    level,
    summary,
    actions,

    rainfallRisk: heavyRain
      ? "High"
      : moderateRain
        ? "Moderate"
        : "Low",

    heatRisk: heat ? "Moderate" : "Low",

    windRisk: strongWind ? "Moderate" : "Low",

    moistureRisk: highHumidity ? "Moderate" : "Low",

    irrigation: heavyRain
      ? "Delay irrigation and reassess field moisture after rainfall."
      : moderateRain
        ? "Check soil moisture before irrigation."
        : "Irrigate according to soil moisture and crop requirement.",

    fieldOperations: heavyRain
      ? "Avoid unnecessary field operations during rainfall."
      : strongWind
        ? "Avoid wind-sensitive operations during stronger winds."
        : "Routine field operations can continue with normal precautions.",

    monitoring: highHumidity
      ? "Increase monitoring for moisture-related pest and disease conditions."
      : "Continue regular crop and field monitoring.",
  };
}