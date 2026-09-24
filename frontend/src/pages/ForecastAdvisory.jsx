import { useMemo, useState } from "react";
import {
  AlertTriangle,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CloudRain,
  Droplets,
  Leaf,
  ShieldCheck,
  Thermometer,
  Wind,
} from "lucide-react";

import { weatherByPanchayat } from "../data/mockData";

const crops = {
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

const forecastData = {
  Bara: [
    {
      date: "24 Apr",
      day: "Today",
      rainfall: 18,
      rainProbability: 72,
      max: 32,
      min: 24,
      humidity: 78,
      wind: 12,
      condition: "Light Rain",
    },
    {
      date: "25 Apr",
      day: "Tomorrow",
      rainfall: 12,
      rainProbability: 58,
      max: 34,
      min: 25,
      humidity: 74,
      wind: 11,
      condition: "Partly Cloudy",
    },
    {
      date: "26 Apr",
      day: "Day 3",
      rainfall: 5,
      rainProbability: 36,
      max: 35,
      min: 26,
      humidity: 69,
      wind: 10,
      condition: "Partly Cloudy",
    },
    {
      date: "27 Apr",
      day: "Day 4",
      rainfall: 9,
      rainProbability: 42,
      max: 33,
      min: 24,
      humidity: 72,
      wind: 12,
      condition: "Light Rain",
    },
    {
      date: "28 Apr",
      day: "Day 5",
      rainfall: 7,
      rainProbability: 31,
      max: 32,
      min: 23,
      humidity: 70,
      wind: 9,
      condition: "Cloudy",
    },
    {
      date: "29 Apr",
      day: "Day 6",
      rainfall: 6,
      rainProbability: 25,
      max: 34,
      min: 24,
      humidity: 67,
      wind: 10,
      condition: "Mostly Clear",
    },
    {
      date: "30 Apr",
      day: "Day 7",
      rainfall: 4,
      rainProbability: 18,
      max: 35,
      min: 25,
      humidity: 64,
      wind: 11,
      condition: "Sunny",
    },
  ],

  Kareli: [
    {
      date: "24 Apr",
      day: "Today",
      rainfall: 26,
      rainProbability: 81,
      max: 33,
      min: 25,
      humidity: 82,
      wind: 14,
      condition: "Rain",
    },
    {
      date: "25 Apr",
      day: "Tomorrow",
      rainfall: 18,
      rainProbability: 69,
      max: 33,
      min: 25,
      humidity: 80,
      wind: 13,
      condition: "Light Rain",
    },
    {
      date: "26 Apr",
      day: "Day 3",
      rainfall: 7,
      rainProbability: 35,
      max: 35,
      min: 26,
      humidity: 70,
      wind: 10,
      condition: "Cloudy",
    },
    {
      date: "27 Apr",
      day: "Day 4",
      rainfall: 5,
      rainProbability: 28,
      max: 36,
      min: 26,
      humidity: 67,
      wind: 9,
      condition: "Sunny",
    },
    {
      date: "28 Apr",
      day: "Day 5",
      rainfall: 6,
      rainProbability: 25,
      max: 35,
      min: 25,
      humidity: 68,
      wind: 10,
      condition: "Mostly Clear",
    },
    {
      date: "29 Apr",
      day: "Day 6",
      rainfall: 4,
      rainProbability: 19,
      max: 36,
      min: 26,
      humidity: 63,
      wind: 11,
      condition: "Sunny",
    },
    {
      date: "30 Apr",
      day: "Day 7",
      rainfall: 3,
      rainProbability: 14,
      max: 37,
      min: 27,
      humidity: 61,
      wind: 12,
      condition: "Sunny",
    },
  ],

  Soraon: [
    {
      date: "24 Apr",
      day: "Today",
      rainfall: 32,
      rainProbability: 88,
      max: 34,
      min: 26,
      humidity: 85,
      wind: 16,
      condition: "Heavy Rain",
    },
    {
      date: "25 Apr",
      day: "Tomorrow",
      rainfall: 22,
      rainProbability: 74,
      max: 33,
      min: 25,
      humidity: 83,
      wind: 15,
      condition: "Rain",
    },
    {
      date: "26 Apr",
      day: "Day 3",
      rainfall: 8,
      rainProbability: 39,
      max: 35,
      min: 26,
      humidity: 72,
      wind: 11,
      condition: "Cloudy",
    },
    {
      date: "27 Apr",
      day: "Day 4",
      rainfall: 6,
      rainProbability: 27,
      max: 35,
      min: 25,
      humidity: 68,
      wind: 10,
      condition: "Sunny",
    },
    {
      date: "28 Apr",
      day: "Day 5",
      rainfall: 5,
      rainProbability: 22,
      max: 36,
      min: 26,
      humidity: 65,
      wind: 11,
      condition: "Sunny",
    },
    {
      date: "29 Apr",
      day: "Day 6",
      rainfall: 4,
      rainProbability: 17,
      max: 37,
      min: 27,
      humidity: 62,
      wind: 12,
      condition: "Sunny",
    },
    {
      date: "30 Apr",
      day: "Day 7",
      rainfall: 3,
      rainProbability: 13,
      max: 37,
      min: 27,
      humidity: 60,
      wind: 12,
      condition: "Sunny",
    },
  ],

  Phaphamau: [
    {
      date: "24 Apr",
      day: "Today",
      rainfall: 21,
      rainProbability: 76,
      max: 32,
      min: 24,
      humidity: 80,
      wind: 12,
      condition: "Light Rain",
    },
    {
      date: "25 Apr",
      day: "Tomorrow",
      rainfall: 11,
      rainProbability: 53,
      max: 34,
      min: 25,
      humidity: 74,
      wind: 11,
      condition: "Cloudy",
    },
    {
      date: "26 Apr",
      day: "Day 3",
      rainfall: 5,
      rainProbability: 33,
      max: 35,
      min: 26,
      humidity: 70,
      wind: 10,
      condition: "Sunny",
    },
    {
      date: "27 Apr",
      day: "Day 4",
      rainfall: 7,
      rainProbability: 35,
      max: 34,
      min: 25,
      humidity: 71,
      wind: 10,
      condition: "Cloudy",
    },
    {
      date: "28 Apr",
      day: "Day 5",
      rainfall: 5,
      rainProbability: 24,
      max: 33,
      min: 24,
      humidity: 68,
      wind: 9,
      condition: "Sunny",
    },
    {
      date: "29 Apr",
      day: "Day 6",
      rainfall: 4,
      rainProbability: 19,
      max: 35,
      min: 25,
      humidity: 65,
      wind: 10,
      condition: "Sunny",
    },
    {
      date: "30 Apr",
      day: "Day 7",
      rainfall: 3,
      rainProbability: 14,
      max: 36,
      min: 26,
      humidity: 62,
      wind: 11,
      condition: "Sunny",
    },
  ],

  Jasra: [
    {
      date: "24 Apr",
      day: "Today",
      rainfall: 16,
      rainProbability: 61,
      max: 31,
      min: 23,
      humidity: 76,
      wind: 10,
      condition: "Cloudy",
    },
    {
      date: "25 Apr",
      day: "Tomorrow",
      rainfall: 9,
      rainProbability: 42,
      max: 33,
      min: 24,
      humidity: 72,
      wind: 9,
      condition: "Cloudy",
    },
    {
      date: "26 Apr",
      day: "Day 3",
      rainfall: 3,
      rainProbability: 19,
      max: 34,
      min: 25,
      humidity: 67,
      wind: 10,
      condition: "Sunny",
    },
    {
      date: "27 Apr",
      day: "Day 4",
      rainfall: 4,
      rainProbability: 22,
      max: 34,
      min: 25,
      humidity: 66,
      wind: 9,
      condition: "Sunny",
    },
    {
      date: "28 Apr",
      day: "Day 5",
      rainfall: 3,
      rainProbability: 17,
      max: 35,
      min: 26,
      humidity: 63,
      wind: 10,
      condition: "Sunny",
    },
    {
      date: "29 Apr",
      day: "Day 6",
      rainfall: 2,
      rainProbability: 12,
      max: 35,
      min: 26,
      humidity: 60,
      wind: 11,
      condition: "Sunny",
    },
    {
      date: "30 Apr",
      day: "Day 7",
      rainfall: 2,
      rainProbability: 10,
      max: 36,
      min: 26,
      humidity: 58,
      wind: 11,
      condition: "Sunny",
    },
  ],
};

export default function ForecastAdvisory() {
  const [panchayat, setPanchayat] = useState("Bara");
  const [crop, setCrop] = useState("Wheat");
  const [stage, setStage] = useState(
    crops.Wheat.stages[1]
  );

  const weather =
    weatherByPanchayat[panchayat] ||
    weatherByPanchayat.Bara;

  const forecast =
    forecastData[panchayat] || forecastData.Bara;

  const stageOptions = crops[crop].stages;

  const today = forecast[0];

  const advisory = useMemo(() => {
    return createAdvisory({
      crop,
      stage,
      rainfall: today.rainfall,
      rainProbability: today.rainProbability,
      temperature: today.max,
      humidity: today.humidity,
      wind: today.wind,
    });
  }, [
    crop,
    stage,
    today.rainfall,
    today.rainProbability,
    today.max,
    today.humidity,
    today.wind,
  ]);

  const handleCropChange = (value) => {
    setCrop(value);
    setStage(crops[value].stages[0]);
  };

  return (
    <main className="mx-auto w-full max-w-[1700px] p-4 sm:p-6 xl:p-8">
      {/* Heading */}
      <div className="mb-5">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>Dashboard</span>
          <span>/</span>
          <span className="font-semibold text-emerald-700">
            Forecast & Advisory
          </span>
        </div>

        <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900">
          Forecast & Agricultural Advisory
        </h1>

        <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-500">
          View localized weather forecasts and translate expected
          weather conditions into crop-specific actions.
        </p>
      </div>

      {/* Filters */}
      <section className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="grid gap-3 md:grid-cols-3">
          <SelectField
            label="Panchayat"
            value={panchayat}
            options={Object.keys(weatherByPanchayat)}
            onChange={setPanchayat}
          />

          <SelectField
            label="Crop"
            value={crop}
            options={Object.keys(crops)}
            onChange={handleCropChange}
          />

          <SelectField
            label="Growth Stage"
            value={stage}
            options={stageOptions}
            onChange={setStage}
          />
        </div>
      </section>

      {/* Today summary */}
      <section className="mt-4 grid gap-4 xl:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-[10px] uppercase tracking-wide text-slate-400">
            Today's Forecast
          </p>

          <div className="mt-4 flex items-center gap-4">
            <div className="rounded-2xl bg-sky-50 p-4">
              <CloudRain className="h-9 w-9 text-sky-500" />
            </div>

            <div>
              <p className="text-3xl font-bold text-slate-900">
                {today.max}°C
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {today.condition}
              </p>

              <p className="mt-1 text-[10px] text-slate-400">
                {panchayat} Panchayat
              </p>
            </div>
          </div>
        </div>

        <SummaryCard
          icon={CloudRain}
          title="Rainfall"
          value={`${today.rainfall} mm`}
          note={`${today.rainProbability}% probability`}
        />

        <SummaryCard
          icon={Droplets}
          title="Humidity"
          value={`${today.humidity}%`}
          note="Current estimate"
        />

        <SummaryCard
          icon={Wind}
          title="Wind"
          value={`${today.wind} km/h`}
          note="Expected today"
        />
      </section>

      {/* Forecast */}
      <section className="mt-4 rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <div className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-emerald-600" />

              <h2 className="text-sm font-bold text-slate-800">
                7-Day Panchayat Forecast
              </h2>
            </div>

            <p className="mt-1 text-[10px] text-slate-400">
              Forecast for {panchayat}
            </p>
          </div>

          <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-[10px] font-semibold text-emerald-700">
            {weather.confidence} Confidence
          </span>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-7">
          {forecast.map((item, index) => (
            <ForecastDay
              key={item.date}
              data={item}
              today={index === 0}
            />
          ))}
        </div>
      </section>

      {/* Advisory */}
      <div className="mt-4 grid gap-4 xl:grid-cols-[1.25fr_0.75fr]">
        <section className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-5">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-white p-2.5">
              <Leaf className="h-5 w-5 text-emerald-600" />
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-emerald-700">
                Personalized Advisory
              </p>

              <h2 className="mt-1 text-lg font-bold text-slate-800">
                {crop} · {stage}
              </h2>

              <p className="mt-1 text-[11px] text-slate-500">
                Based on today's expected weather conditions.
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {advisory.actions.map((action) => (
              <div
                key={action.title}
                className="rounded-xl border border-emerald-100 bg-white p-4"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />

                  <div>
                    <p className="text-xs font-semibold text-slate-700">
                      {action.title}
                    </p>

                    <p className="mt-1 text-[10px] leading-5 text-slate-500">
                      {action.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-emerald-600" />

            <h2 className="text-sm font-bold text-slate-800">
              Advisory Summary
            </h2>
          </div>

          <div className="mt-5">
            <div
              className={`rounded-xl p-4 ${
                advisory.level === "High"
                  ? "bg-red-50"
                  : advisory.level === "Medium"
                    ? "bg-amber-50"
                    : "bg-emerald-50"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700">
                  Advisory Priority
                </span>

                <span
                  className={`rounded-full px-2.5 py-1 text-[9px] font-semibold ${getPriorityClass(
                    advisory.level
                  )}`}
                >
                  {advisory.level}
                </span>
              </div>

              <p className="mt-3 text-[11px] leading-5 text-slate-600">
                {advisory.summary}
              </p>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            <RiskIndicator
              label="Rainfall Risk"
              value={advisory.rainfallRisk}
            />

            <RiskIndicator
              label="Heat Risk"
              value={advisory.heatRisk}
            />

            <RiskIndicator
              label="Wind Risk"
              value={advisory.windRisk}
            />

            <RiskIndicator
              label="Moisture Risk"
              value={advisory.moistureRisk}
            />
          </div>
        </section>
      </div>

      {/* Decision panel */}
      <section className="mt-4 rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-slate-50 p-2.5">
            <ShieldAlertIcon />
          </div>

          <div>
            <h2 className="text-sm font-bold text-slate-800">
              Decision Support
            </h2>

            <p className="mt-1 text-[10px] text-slate-400">
              Weather information relevant to the selected crop
              and growth stage.
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          <DecisionCard
            title="Irrigation"
            value={advisory.irrigation}
          />

          <DecisionCard
            title="Field Operations"
            value={advisory.fieldOperations}
          />

          <DecisionCard
            title="Crop Monitoring"
            value={advisory.monitoring}
          />
        </div>
      </section>

      <p className="mt-4 text-center text-[10px] text-slate-400">
        Prototype advisory rules use demonstration weather data.
        Scientific crop-weather rules will be implemented and
        validated in the backend.
      </p>
    </main>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[10px] font-medium text-slate-500">
        {label}
      </label>

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-800 outline-none focus:border-emerald-400"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function SummaryCard({
  icon: Icon,
  title,
  value,
  note,
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] text-slate-400">
            {title}
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {value}
          </p>

          <p className="mt-1 text-[10px] text-slate-400">
            {note}
          </p>
        </div>

        <div className="rounded-xl bg-sky-50 p-2.5">
          <Icon className="h-5 w-5 text-sky-500" />
        </div>
      </div>
    </section>
  );
}

function ForecastDay({ data, today }) {
  return (
    <div
      className={`rounded-xl border p-4 text-center ${
        today
          ? "border-emerald-200 bg-emerald-50/60"
          : "border-slate-100 bg-slate-50"
      }`}
    >
      <p className="text-[11px] font-bold text-slate-700">
        {data.day}
      </p>

      <p className="mt-0.5 text-[9px] text-slate-400">
        {data.date}
      </p>

      <CloudRain className="mx-auto my-3 h-7 w-7 text-sky-500" />

      <p className="text-sm font-bold text-slate-800">
        {data.rainfall} mm
      </p>

      <p className="mt-1 text-[9px] text-slate-400">
        Rainfall
      </p>

      <div className="mt-3 border-t border-slate-200 pt-3">
        <p className="text-xs font-semibold text-slate-700">
          {data.max}° / {data.min}°
        </p>

        <p className="mt-1 text-[9px] text-slate-400">
          Temperature
        </p>
      </div>

      <div className="mt-3">
        <p className="text-xs font-semibold text-slate-700">
          {data.rainProbability}%
        </p>

        <p className="mt-1 text-[9px] text-slate-400">
          Rain probability
        </p>
      </div>
    </div>
  );
}

function RiskIndicator({ label, value }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
      <span className="text-[11px] text-slate-600">
        {label}
      </span>

      <span
        className={`rounded-full px-2.5 py-1 text-[9px] font-semibold ${getPriorityClass(
          value
        )}`}
      >
        {value}
      </span>
    </div>
  );
}

function DecisionCard({ title, value }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-slate-700">
          {title}
        </p>

        <ChevronRight className="h-4 w-4 text-slate-400" />
      </div>

      <p className="mt-2 text-[11px] leading-5 text-slate-500">
        {value}
      </p>
    </div>
  );
}

function getPriorityClass(level) {
  if (level === "High") {
    return "bg-red-50 text-red-700";
  }

  if (level === "Medium") {
    return "bg-amber-50 text-amber-700";
  }

  return "bg-emerald-50 text-emerald-700";
}

function ShieldAlertIcon() {
  return (
    <AlertTriangle className="h-5 w-5 text-amber-500" />
  );
}

function createAdvisory({
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

  const heat =
    temperature >= 35;

  const strongWind =
    wind >= 15;

  const highHumidity =
    humidity >= 80;

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

  const summary =
    level === "High"
      ? `Weather conditions require closer attention for ${crop} during the ${stage.toLowerCase()} stage.`
      : level === "Medium"
        ? `Some weather-related adjustments may be useful for ${crop} during the ${stage.toLowerCase()} stage.`
        : `Current weather conditions show no major immediate advisory concern for ${crop}.`;

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