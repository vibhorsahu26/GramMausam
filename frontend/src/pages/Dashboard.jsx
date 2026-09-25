import { motion } from "framer-motion";
import { useState } from "react";

import LocationSelector from "../components/LocationSelector";
import WeatherMap from "../components/WeatherMap";
import PanchayatOverview from "../components/PanchayatOverview";
import ForecastCard from "../components/ForecastCard";
import AdvisoryPanel from "../components/AdvisoryPanel";
import PanchayatComparison from "../components/PanchayatComparison";
import WeatherTrend from "../components/WeatherTrend";
import QuickLinks from "../components/QuickLinks";

import { getWeather } from "../services/weatherService";

export default function Dashboard() {
  const [selected, setSelected] = useState({
    state: "Uttar Pradesh",
    district: "Prayagraj",
    block: "Phaphamau",
    panchayat: "Bara",
  });

  const weather = getWeather(selected.panchayat);

  return (
    <main className="mx-auto w-full max-w-[1700px] p-4 sm:p-6 xl:p-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <LocationSelector
          selected={selected}
          setSelected={setSelected}
        />

        <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1fr)_350px]">
          <div className="space-y-4">
            <WeatherMap
              selectedPanchayat={selected.panchayat}
            />

            <div className="grid gap-4 lg:grid-cols-2">
              <PanchayatComparison />
              <WeatherTrend />
            </div>
          </div>

          <div className="space-y-4">
            <PanchayatOverview
              panchayat={selected.panchayat}
              weather={weather}
            />

            <ForecastCard
              panchayat={selected.panchayat}
            />

            <AdvisoryPanel
              weather={weather}
            />

            <QuickLinks />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-emerald-100 bg-emerald-50 px-5 py-4 text-[11px] font-medium text-emerald-700">
          <span>Better Weather Insights</span>
          <span>→</span>
          <span>Smarter Farming</span>
          <span>→</span>
          <span>Stronger Rural India</span>
        </div>
      </motion.div>
    </main>
  );
}