import { useMemo, useState } from "react";
import {
  ArrowDown,
  CloudRain,
  Droplets,
  Gauge,
  Leaf,
  MapPin,
  ShieldAlert,
  Thermometer,
  Wind,
} from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  getForecast,
  getPanchayats,
  getWeather,
} from "../services/weatherService";

const parameters = [
  "Rainfall",
  "Temperature",
  "Humidity",
];

const chartKeys = {
  Rainfall: "rainfall",
  Temperature: "maxTemp",
  Humidity: "humidity",
};

const chartLabels = {
  Rainfall: "Rainfall (mm)",
  Temperature: "Temperature (°C)",
  Humidity: "Humidity (%)",
};

export default function PanchayatDetails() {
  const [panchayat, setPanchayat] = useState("Bara");
  const [activeParameter, setActiveParameter] =
    useState("Rainfall");

  const weather = getWeather(panchayat);
  const forecast = getForecast(panchayat);

  const selectedKey = chartKeys[activeParameter];

  const chartData = useMemo(() => {
    return forecast.map((item) => ({
      day: item.day,
      value: item[selectedKey],
    }));
  }, [forecast, selectedKey]);

  return (
    <main className="mx-auto w-full max-w-[1700px] p-4 sm:p-6 xl:p-8">
      {/* Page heading */}
      <div className="mb-5">
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
          <span>Uttar Pradesh</span>
          <span>/</span>
          <span>Prayagraj</span>
          <span>/</span>
          <span>Phaphamau</span>
          <span>/</span>
          <span className="font-semibold text-emerald-700">
            Panchayat Details
          </span>
        </div>

        <div className="mt-3 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Panchayat Details
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Detailed local weather intelligence for agricultural
              decision-making.
            </p>
          </div>

          <select
            value={panchayat}
            onChange={(event) =>
              setPanchayat(event.target.value)
            }
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 outline-none transition focus:border-emerald-400"
          >
            {getPanchayats().map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Location strip */}
      <div className="mb-4 flex flex-wrap items-center gap-x-5 gap-y-2 rounded-2xl border border-slate-200 bg-white px-4 py-3">
        <LocationItem
          label="State"
          value="Uttar Pradesh"
        />

        <LocationItem
          label="District"
          value="Prayagraj"
        />

        <LocationItem
          label="Block"
          value="Phaphamau"
        />

        <div className="ml-auto flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5">
          <MapPin className="h-3.5 w-3.5 text-emerald-600" />

          <span className="text-[11px] font-semibold text-emerald-700">
            {panchayat} Panchayat
          </span>
        </div>
      </div>

      {/* Current overview */}
      <div className="grid gap-4 xl:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <section className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-[11px] font-medium text-slate-400">
            Current Conditions
          </p>

          <div className="mt-4 flex items-center gap-4">
            <div className="rounded-2xl bg-sky-50 p-4">
              <CloudRain className="h-9 w-9 text-sky-500" />
            </div>

            <div>
              <p className="text-4xl font-bold tracking-tight text-slate-900">
                {weather.temperature}°C
              </p>

              <p className="mt-1 text-sm text-slate-500">
                {weather.condition}
              </p>
            </div>
          </div>
        </section>

        <WeatherStat
          icon={CloudRain}
          title="Rainfall (24h)"
          value={`${weather.rainfall} mm`}
          note={weather.rainfallRange}
          iconClass="text-sky-500"
          bgClass="bg-sky-50"
        />

        <WeatherStat
          icon={Droplets}
          title="Humidity"
          value={`${weather.humidity}%`}
          note="Current estimate"
          iconClass="text-cyan-500"
          bgClass="bg-cyan-50"
        />

        <WeatherStat
          icon={Wind}
          title="Wind"
          value={`${weather.windSpeed} km/h`}
          note={weather.windDirection}
          iconClass="text-indigo-500"
          bgClass="bg-indigo-50"
        />
      </div>

      {/* Downscaling explanation */}
      <section className="mt-4 rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-50 to-white p-5">
        <div className="flex items-start gap-4">
          <div className="rounded-xl bg-white p-3 shadow-sm">
            <Gauge className="h-6 w-6 text-emerald-600" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-sm font-bold text-slate-800">
                Panchayat Downscaling Snapshot
              </h2>

              <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[9px] font-semibold text-amber-700">
                Prototype Data
              </span>
            </div>

            <p className="mt-1 max-w-3xl text-xs leading-5 text-slate-500">
              The prototype compares the coarse block forecast with
              a finer Panchayat-level estimate. The real ML
              downscaling engine will replace these demonstration
              values in Chunk 2.
            </p>

            <div className="mt-5 grid max-w-3xl gap-3 sm:grid-cols-[1fr_auto_1fr]">
              <DownscaleBox
                label="Block Forecast"
                value="20 mm"
                subtext="Coarse input"
              />

              <div className="hidden items-center justify-center sm:flex">
                <div className="rounded-full bg-white p-2 shadow-sm">
                  <ArrowDown className="h-4 w-4 rotate-[-90deg] text-emerald-600" />
                </div>
              </div>

              <DownscaleBox
                label="Panchayat Estimate"
                value={`${weather.rainfall} mm`}
                subtext="Localized output"
                highlighted
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1.5fr)_minmax(320px,0.9fr)]">
        {/* Forecast chart */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-sm font-bold text-slate-800">
                7-Day Weather Profile
              </h2>

              <p className="mt-1 text-[10px] text-slate-400">
                Panchayat-level forecast trend
              </p>
            </div>

            <div className="flex gap-1 overflow-x-auto">
              {parameters.map((parameter) => (
                <button
                  key={parameter}
                  type="button"
                  onClick={() =>
                    setActiveParameter(parameter)
                  }
                  className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-[10px] font-medium transition ${activeParameter === parameter
                      ? "bg-emerald-700 text-white"
                      : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                    }`}
                >
                  {parameter}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 h-[320px] w-full">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <LineChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
                />

                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 10,
                    fill: "#64748b",
                  }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 10,
                    fill: "#64748b",
                  }}
                />

                <Tooltip
                  formatter={(value) => [
                    value,
                    chartLabels[activeParameter],
                  ]}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                    fontSize: "11px",
                  }}
                />

                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#059669"
                  strokeWidth={3}
                  dot={{
                    r: 4,
                    fill: "#059669",
                  }}
                  activeDot={{
                    r: 6,
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Right information */}
        <div className="space-y-4">
          <section className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-amber-500" />

              <h2 className="text-sm font-bold text-slate-800">
                Weather Risk
              </h2>
            </div>

            <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-amber-800">
                  {weather.risk} Risk
                </span>

                <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              </div>

              <p className="mt-2 text-xs leading-5 text-slate-600">
                {weather.riskText}
              </p>
            </div>

            <RiskRow
              name="Heavy Rain"
              status={
                weather.rainfall >= 25
                  ? "High"
                  : "Moderate"
              }
            />

            <RiskRow
              name="Waterlogging"
              status={
                weather.rainfall >= 20
                  ? "Moderate"
                  : "Low"
              }
            />

            <RiskRow
              name="Heat Stress"
              status={
                weather.maxTemp >= 35
                  ? "Moderate"
                  : "Low"
              }
            />
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-emerald-600" />

              <h2 className="text-sm font-bold text-slate-800">
                Crop Conditions
              </h2>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <InfoBox
                title="Crop"
                value={weather.crop}
              />

              <InfoBox
                title="Growth Stage"
                value={weather.cropStage}
              />

              <InfoBox
                title="Max Temp"
                value={`${weather.maxTemp}°C`}
              />

              <InfoBox
                title="Min Temp"
                value={`${weather.minTemp}°C`}
              />
            </div>
          </section>
        </div>
      </div>

      {/* Forecast table */}
      <section className="mt-4 rounded-2xl border border-slate-200 bg-white p-5">
        <div className="mb-4">
          <h2 className="text-sm font-bold text-slate-800">
            Panchayat Forecast Details
          </h2>

          <p className="mt-1 text-[10px] text-slate-400">
            Seven-day forecast for {panchayat}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left">
            <thead>
              <tr className="border-y border-slate-100 bg-slate-50">
                <th className="px-4 py-3 text-[10px] font-semibold text-slate-500">
                  Day
                </th>

                <th className="px-4 py-3 text-[10px] font-semibold text-slate-500">
                  Rainfall
                </th>

                <th className="px-4 py-3 text-[10px] font-semibold text-slate-500">
                  Temperature
                </th>

                <th className="px-4 py-3 text-[10px] font-semibold text-slate-500">
                  Humidity
                </th>

                <th className="px-4 py-3 text-[10px] font-semibold text-slate-500">
                  Weather
                </th>
              </tr>
            </thead>

            <tbody>
              {forecast.map((item, index) => (
                <tr
                  key={item.day}
                  className="border-b border-slate-100 last:border-none"
                >
                  <td className="px-4 py-3 text-xs font-semibold text-slate-700">
                    {item.day}
                  </td>

                  <td className="px-4 py-3 text-xs text-slate-600">
                    {item.rainfall} mm
                  </td>

                  <td className="px-4 py-3 text-xs text-slate-600">
                    {item.maxTemp}°C / {item.minTemp}°C
                  </td>

                  <td className="px-4 py-3 text-xs text-slate-600">
                    {item.humidity}%
                  </td>

                  <td className="px-4 py-3">
                    {index === 0 ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-2.5 py-1 text-[9px] font-semibold text-sky-700">
                        <CloudRain className="h-3 w-3" />
                        Rain
                      </span>
                    ) : item.rainfall >= 15 ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-2.5 py-1 text-[9px] font-semibold text-sky-700">
                        <CloudRain className="h-3 w-3" />
                        Rain
                      </span>
                    ) : item.max >= 35 ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-[9px] font-semibold text-amber-700">
                        <Thermometer className="h-3 w-3" />
                        Hot
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-semibold text-emerald-700">
                        Clear
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Confidence */}
      <section className="mt-4 rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">
            <Gauge className="h-5 w-5 text-emerald-600" />
          </div>

          <div className="flex-1">
            <p className="text-xs font-bold text-slate-800">
              Forecast Confidence
            </p>

            <p className="mt-1 text-[11px] leading-5 text-slate-500">
              Confidence indicates how strongly the current forecast
              is supported by the available data and model
              conditions.
            </p>
          </div>

          <div className="min-w-[220px]">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-medium text-slate-400">
                Confidence
              </span>

              <span className="text-xs font-bold text-emerald-700">
                {weather.confidence}
              </span>
            </div>

            <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-emerald-500"
                style={{
                  width: `${weather.confidenceValue}%`,
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <p className="mt-4 text-center text-[10px] text-slate-400">
        Prototype interface — weather values shown here are
        demonstration data until the backend downscaling model is
        connected.
      </p>
    </main>
  );
}

function LocationItem({ label, value }) {
  return (
    <div>
      <p className="text-[9px] uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-0.5 text-xs font-semibold text-slate-700">
        {value}
      </p>
    </div>
  );
}

function WeatherStat({
  icon: Icon,
  title,
  value,
  note,
  iconClass,
  bgClass,
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

        <div className={`rounded-xl p-2.5 ${bgClass}`}>
          <Icon className={`h-5 w-5 ${iconClass}`} />
        </div>
      </div>
    </section>
  );
}

function DownscaleBox({
  label,
  value,
  subtext,
  highlighted = false,
}) {
  return (
    <div
      className={`rounded-xl border p-4 ${highlighted
          ? "border-emerald-200 bg-white"
          : "border-slate-200 bg-white"
        }`}
    >
      <p className="text-[10px] text-slate-400">
        {label}
      </p>

      <p
        className={`mt-1 text-xl font-bold ${highlighted
            ? "text-emerald-700"
            : "text-slate-800"
          }`}
      >
        {value}
      </p>

      <p className="mt-1 text-[9px] text-slate-400">
        {subtext}
      </p>
    </div>
  );
}

function RiskRow({ name, status }) {
  const styles = {
    High: "bg-red-50 text-red-700",
    Moderate: "bg-amber-50 text-amber-700",
    Low: "bg-emerald-50 text-emerald-700",
  };

  return (
    <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
      <span className="text-[11px] text-slate-600">
        {name}
      </span>

      <span
        className={`rounded-full px-2 py-1 text-[9px] font-semibold ${styles[status]}`}
      >
        {status}
      </span>
    </div>
  );
}

function InfoBox({ title, value }) {
  return (
    <div className="rounded-xl bg-slate-50 p-3">
      <p className="text-[9px] text-slate-400">
        {title}
      </p>

      <p className="mt-1 text-xs font-semibold text-slate-700">
        {value}
      </p>
    </div>
  );
}