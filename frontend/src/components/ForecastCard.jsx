import {
  ArrowRight,
  Cloud,
  CloudRain,
  Sun,
} from "lucide-react";

const forecastData = {
  Bara: [
    {
      day: "Today",
      date: "24 Apr",
      icon: "rain",
      rainfall: 18,
      temp: "32° / 24°",
      risk: "Medium",
    },
    {
      day: "Tomorrow",
      date: "25 Apr",
      icon: "cloud",
      rainfall: 12,
      temp: "34° / 25°",
      risk: "Low",
    },
    {
      day: "Day 3",
      date: "26 Apr",
      icon: "sun",
      rainfall: 5,
      temp: "35° / 26°",
      risk: "Low",
    },
  ],

  Kareli: [
    {
      day: "Today",
      date: "24 Apr",
      icon: "rain",
      rainfall: 26,
      temp: "33° / 25°",
      risk: "High",
    },
    {
      day: "Tomorrow",
      date: "25 Apr",
      icon: "cloud",
      rainfall: 18,
      temp: "33° / 25°",
      risk: "Medium",
    },
    {
      day: "Day 3",
      date: "26 Apr",
      icon: "sun",
      rainfall: 7,
      temp: "35° / 26°",
      risk: "Low",
    },
  ],

  Soraon: [
    {
      day: "Today",
      date: "24 Apr",
      icon: "rain",
      rainfall: 32,
      temp: "34° / 26°",
      risk: "High",
    },
    {
      day: "Tomorrow",
      date: "25 Apr",
      icon: "rain",
      rainfall: 22,
      temp: "33° / 25°",
      risk: "Medium",
    },
    {
      day: "Day 3",
      date: "26 Apr",
      icon: "cloud",
      rainfall: 8,
      temp: "35° / 27°",
      risk: "Low",
    },
  ],

  Phaphamau: [
    {
      day: "Today",
      date: "24 Apr",
      icon: "rain",
      rainfall: 21,
      temp: "32° / 24°",
      risk: "Medium",
    },
    {
      day: "Tomorrow",
      date: "25 Apr",
      icon: "cloud",
      rainfall: 11,
      temp: "34° / 25°",
      risk: "Low",
    },
    {
      day: "Day 3",
      date: "26 Apr",
      icon: "sun",
      rainfall: 5,
      temp: "35° / 26°",
      risk: "Low",
    },
  ],

  Jasra: [
    {
      day: "Today",
      date: "24 Apr",
      icon: "cloud",
      rainfall: 16,
      temp: "31° / 23°",
      risk: "Low",
    },
    {
      day: "Tomorrow",
      date: "25 Apr",
      icon: "cloud",
      rainfall: 9,
      temp: "33° / 24°",
      risk: "Low",
    },
    {
      day: "Day 3",
      date: "26 Apr",
      icon: "sun",
      rainfall: 3,
      temp: "34° / 25°",
      risk: "Low",
    },
  ],
};

const icons = {
  rain: CloudRain,
  cloud: Cloud,
  sun: Sun,
};

export default function ForecastCard({ panchayat }) {
  const forecast = forecastData[panchayat] || forecastData.Bara;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-sm font-bold text-slate-800">
          3-Day Forecast ({panchayat})
        </h2>

        <button
          type="button"
          className="flex items-center gap-1 text-[10px] font-semibold text-sky-600"
        >
          View Full Forecast
          <ArrowRight className="h-3 w-3" />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {forecast.map((item) => {
          const Icon = icons[item.icon];

          return (
            <div
              key={`${panchayat}-${item.day}`}
              className="rounded-xl border border-slate-100 bg-slate-50 p-3 text-center"
            >
              <p className="text-[11px] font-bold text-slate-700">
                {item.day}
              </p>

              <p className="text-[9px] text-slate-400">
                {item.date}
              </p>

              <Icon className="mx-auto my-3 h-7 w-7 text-sky-500" />

              <p className="text-xs font-bold text-slate-800">
                {item.rainfall} mm
              </p>

              <p className="mt-1 text-[9px] text-slate-400">
                Rainfall
              </p>

              <p className="mt-3 text-[10px] font-semibold text-slate-600">
                {item.temp}
              </p>

              <span
                className={`mt-3 inline-block rounded-full px-2 py-1 text-[8px] font-semibold ${
                  item.risk === "High"
                    ? "bg-red-100 text-red-700"
                    : item.risk === "Medium"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-emerald-100 text-emerald-700"
                }`}
              >
                {item.risk} Risk
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}