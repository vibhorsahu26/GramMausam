import { Route, Routes } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import Dashboard from "./pages/Dashboard";
import PlaceholderPage from "./pages/PlaceholderPage";

export default function App() {
  return (
    <div className="min-h-screen bg-[#f6faf9] text-slate-800">
      <div className="flex min-h-screen">
        <Sidebar />

        <div className="min-w-0 flex-1">
          <Header />

          <Routes>
            <Route path="/" element={<Dashboard />} />

            <Route
              path="/map"
              element={<PlaceholderPage title="Map View" />}
            />

            <Route
              path="/panchayat-details"
              element={
                <PlaceholderPage title="Panchayat Details" />
              }
            />

            <Route
              path="/forecast"
              element={
                <PlaceholderPage title="Forecast & Advisory" />
              }
            />

            <Route
              path="/historical"
              element={
                <PlaceholderPage title="Historical Data" />
              }
            />

            <Route
              path="/alerts"
              element={<PlaceholderPage title="Alerts" />}
            />

            <Route
              path="/settings"
              element={<PlaceholderPage title="Settings" />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}