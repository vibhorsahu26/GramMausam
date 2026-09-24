import { useMemo, useState } from "react";
import {
  ArrowRight,
  CloudRain,
  Droplets,
  Gauge,
  MapPinned,
  ShieldAlert,
  Thermometer,
  Wind,
} from "lucide-react";

import WeatherMap from "../components/WeatherMap";
import { weatherByPanchayat } from "../data/mockData";

const panchayats = Object.keys(weatherByPanchayat);

export default function MapView() {
  const [selectedPanchayat, setSelectedPanchayat] =
    useState("Bara");

  const weather = useMemo(() => {
    return (
      weatherByPanchayat[selectedPanchayat] ||
      weatherByPanchayat.Bara
    );
  }, [selectedPanchayat]);

  return (
    <main className="mx-auto w-full max-w-[1700px] p-4 sm:p-6 xl:p-8">
      {/* Heading */}
      <div className="mb-5">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>Dashboard</span>
          <span>/</span>
          <span className="font-semibold text-emerald-700">
            Map View
          </span>
        </div>

        <div className="mt-3">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Panchayat Map View
          </h1>

          <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
            Explore localized weather conditions and compare
            Panchayat-level estimates across the selected block.
          </p>
        </div>
      </div>

      {/* Location bar */}
      <section className="mb-4 rounded-2xl border border-slate-200 bg-white p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="grid gap-3 sm:grid-cols-3">
            <LocationField
              label="State"
              value="Uttar Pradesh"
            />

            <LocationField
              label="District"
              value="Prayagraj"
            />

            <LocationField
              label="Block"
              value="Phaphamau"
            />
          </div>

          <div className="w-full sm:w-56">
            <label className="mb-1.5 block text-[10px] font-medium text-slate-500">
              Selected Panchayat
            </label>

            <select
              value={selectedPanchayat}
              onChange={(event) =>
                setSelectedPanchayat(event.target.value)
              }
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-800 outline-none focus:border-emerald-400"
            >
              {panchayats.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Main map layout */}
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_350px]">
        <WeatherMap
          selectedPanchayat={selectedPanchayat}
          onPanchayatSelect={setSelectedPanchayat}
        />

        <div className="space-y-4">
          <SelectedPanchayat
            name={selectedPanchayat}
            weather={weather}
          />

          <DownscalingCard />

          <MapHelp />
        </div>
      </div>

      {/* Bottom stats */}
      <section className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={CloudRain}
          title="Rainfall"
          value={`${weather.rainfall} mm`}
          note={weather.rainfallRange}
        />

        <StatCard
          icon={Thermometer}
          title="Temperature"
          value={`${weather.temperature}°C`}
          note={`${weather.minTemp}°C - ${weather.maxTemp}°C`}
        />

        <StatCard
          icon={Droplets}
          title="Humidity"
          value={`${weather.humidity}%`}
          note="Current estimate"
        />

        <StatCard
          icon={Wind}
          title="Wind"
          value={`${weather.windSpeed} km/h`}
          note={weather.windDirection}
        />
      </section>
    </main>
  );
}

function SelectedPanchayat({ name, weather }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-emerald-50 p-2.5">
          <MapPinned className="h-5 w-5 text-emerald-600" />
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-wide text-slate-400">
            Selected Panchayat
          </p>

          <h2 className="mt-0.5 text-lg font-bold text-slate-800">
            {name}
          </h2>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-4">
        <CloudRain className="h-12 w-12 text-sky-500" />

        <div>
          <p className="text-3xl font-bold text-slate-900">
            {weather.temperature}°C
          </p>

          <p className="text-xs text-slate-500">
            {weather.condition}
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-xl bg-slate-50 p-4">
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Weather Risk
          </span>

          <span
            className={`rounded-full px-2.5 py-1 text-[9px] font-semibold ${
              weather.risk === "High"
                ? "bg-red-50 text-red-700"
                : weather.risk === "Medium"
                  ? "bg-amber-50 text-amber-700"
                  : "bg-emerald-50 text-emerald-700"
            }`}
          >
            {weather.risk}
          </span>
        </div>

        <p className="mt-2 text-[11px] leading-5 text-slate-500">
          {weather.riskText}
        </p>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
        <div className="flex items-center gap-2">
          <Gauge className="h-4 w-4 text-emerald-600" />

          <span className="text-[11px] text-slate-500">
            Forecast confidence
          </span>
        </div>

        <span className="text-xs font-bold text-emerald-700">
          {weather.confidence}
        </span>
      </div>
    </section>
  );
}

function DownscalingCard() {
  return (
    <section className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5">
      <div className="flex items-center gap-2">
        <Gauge className="h-5 w-5 text-emerald-600" />

        <h2 className="text-sm font-bold text-slate-800">
          How Downscaling Works
        </h2>
      </div>

      <p className="mt-3 text-[11px] leading-5 text-slate-500">
        A coarse block forecast is combined with local geographic
        and environmental features to estimate finer-resolution
        weather conditions.
      </p>

      <div className="mt-4 space-y-2">
        <FlowStep
          number="01"
          title="Block Forecast"
          text="Coarse weather input"
        />

        <FlowArrow />

        <FlowStep
          number="02"
          title="Local Features"
          text="Terrain, satellite and historical data"
        />

        <FlowArrow />

        <FlowStep
          number="03"
          title="Panchayat Estimate"
          text="Localized weather output"
        />
      </div>
    </section>
  );
}

function FlowStep({ number, title, text }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-emerald-100 bg-white p-3">
      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-[9px] font-bold text-emerald-700">
        {number}
      </span>

      <div>
        <p className="text-[11px] font-semibold text-slate-700">
          {title}
        </p>

        <p className="text-[9px] text-slate-400">
          {text}
        </p>
      </div>
    </div>
  );
}

function FlowArrow() {
  return (
    <div className="flex justify-center">
      <ArrowRight className="h-3.5 w-3.5 rotate-90 text-emerald-400" />
    </div>
  );
}

function MapHelp() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-center gap-2">
        <ShieldAlert className="h-4 w-4 text-amber-500" />

        <h2 className="text-sm font-bold text-slate-800">
          Map Information
        </h2>
      </div>

      <div className="mt-3 space-y-2 text-[11px] leading-5 text-slate-500">
        <p>
          Click a Panchayat area on the map to inspect its local
          weather estimate.
        </p>

        <p>
          Use the layer buttons to switch between rainfall,
          temperature, humidity, wind and risk.
        </p>

        <p>
          Current map boundaries and values are demonstration data
          and will later come from the backend geospatial pipeline.
        </p>
      </div>
    </section>
  );
}

function LocationField({ label, value }) {
  return (
    <div>
      <p className="text-[9px] uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-xs font-semibold text-slate-700">
        {value}
      </p>
    </div>
  );
}

function StatCard({
  icon: Icon,
  title,
  value,
  note,
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] text-slate-400">
            {title}
          </p>

          <p className="mt-2 text-xl font-bold text-slate-900">
            {value}
          </p>

          <p className="mt-1 text-[9px] text-slate-400">
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