import { useState } from "react";
import {
  Bell,
  ChevronDown,
  CloudRain,
  Globe2,
  Lock,
  MapPin,
  Save,
  Settings as SettingsIcon,
  ShieldCheck,
  Thermometer,
  User,
  Wind,
} from "lucide-react";

export default function Settings() {
  const [settings, setSettings] = useState({
    state: "Uttar Pradesh",
    district: "Prayagraj",
    block: "Phaphamau",
    panchayat: "Bara",

    temperatureUnit: "Celsius",
    rainfallUnit: "Millimetres",
    refreshInterval: "30 minutes",

    rainfallAlerts: true,
    heatAlerts: true,
    windAlerts: true,
    advisoryAlerts: true,

    showConfidence: true,
    compactForecast: false,
  });

  const [saved, setSaved] = useState(false);

  const updateSetting = (key, value) => {
    setSettings((current) => ({
      ...current,
      [key]: value,
    }));

    setSaved(false);
  };

  const saveSettings = () => {
    localStorage.setItem(
      "grammausam-settings",
      JSON.stringify(settings)
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  return (
    <main className="mx-auto w-full max-w-[1200px] p-4 sm:p-6 xl:p-8">
      {/* Heading */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>Dashboard</span>
          <span>/</span>

          <span className="font-semibold text-emerald-700">
            Settings
          </span>
        </div>

        <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900">
          Settings
        </h1>

        <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
          Manage your location, weather preferences and alert
          notifications.
        </p>
      </div>

      <div className="space-y-4">
        {/* Profile */}
        <SettingsSection
          icon={User}
          title="Profile"
          description="Basic information used by the dashboard."
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-slate-900 text-lg font-bold text-white">
              VS
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-800">
                Vibhor Sahu
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                Farmer / User
              </p>

              <p className="mt-1 text-[10px] text-slate-400">
                GramMausam prototype account
              </p>
            </div>
          </div>
        </SettingsSection>

        {/* Default location */}
        <SettingsSection
          icon={MapPin}
          title="Default Location"
          description="Location shown when you open the dashboard."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <SettingSelect
              label="State"
              value={settings.state}
              options={[
                "Uttar Pradesh",
                "Madhya Pradesh",
                "Haryana",
              ]}
              onChange={(value) =>
                updateSetting("state", value)
              }
            />

            <SettingSelect
              label="District"
              value={settings.district}
              options={[
                "Prayagraj",
                "Lucknow",
                "Varanasi",
              ]}
              onChange={(value) =>
                updateSetting("district", value)
              }
            />

            <SettingSelect
              label="Block"
              value={settings.block}
              options={[
                "Phaphamau",
                "Bara",
                "Koraon",
              ]}
              onChange={(value) =>
                updateSetting("block", value)
              }
            />

            <SettingSelect
              label="Panchayat"
              value={settings.panchayat}
              options={[
                "Bara",
                "Kareli",
                "Soraon",
                "Phaphamau",
                "Jasra",
              ]}
              onChange={(value) =>
                updateSetting("panchayat", value)
              }
            />
          </div>
        </SettingsSection>

        {/* Weather preferences */}
        <SettingsSection
          icon={SettingsIcon}
          title="Weather Preferences"
          description="Choose how weather information should be displayed."
        >
          <div className="grid gap-4 sm:grid-cols-3">
            <SettingSelect
              label="Temperature"
              value={settings.temperatureUnit}
              options={["Celsius", "Fahrenheit"]}
              onChange={(value) =>
                updateSetting(
                  "temperatureUnit",
                  value
                )
              }
            />

            <SettingSelect
              label="Rainfall"
              value={settings.rainfallUnit}
              options={[
                "Millimetres",
                "Inches",
              ]}
              onChange={(value) =>
                updateSetting(
                  "rainfallUnit",
                  value
                )
              }
            />

            <SettingSelect
              label="Auto Refresh"
              value={settings.refreshInterval}
              options={[
                "15 minutes",
                "30 minutes",
                "60 minutes",
              ]}
              onChange={(value) =>
                updateSetting(
                  "refreshInterval",
                  value
                )
              }
            />
          </div>
        </SettingsSection>

        {/* Notifications */}
        <SettingsSection
          icon={Bell}
          title="Alert Notifications"
          description="Choose which weather events should appear in your alert feed."
        >
          <div className="divide-y divide-slate-100">
            <ToggleRow
              icon={CloudRain}
              title="Rainfall Alerts"
              description="Notify when significant rainfall is expected."
              checked={settings.rainfallAlerts}
              onChange={(value) =>
                updateSetting(
                  "rainfallAlerts",
                  value
                )
              }
            />

            <ToggleRow
              icon={Thermometer}
              title="Heat Alerts"
              description="Notify when temperatures cross configured risk thresholds."
              checked={settings.heatAlerts}
              onChange={(value) =>
                updateSetting(
                  "heatAlerts",
                  value
                )
              }
            />

            <ToggleRow
              icon={Wind}
              title="Wind Alerts"
              description="Notify about stronger wind conditions."
              checked={settings.windAlerts}
              onChange={(value) =>
                updateSetting(
                  "windAlerts",
                  value
                )
              }
            />

            <ToggleRow
              icon={Bell}
              title="Agricultural Advisory Alerts"
              description="Show important crop and weather advisory updates."
              checked={settings.advisoryAlerts}
              onChange={(value) =>
                updateSetting(
                  "advisoryAlerts",
                  value
                )
              }
            />
          </div>
        </SettingsSection>

        {/* Dashboard preferences */}
        <SettingsSection
          icon={Thermometer}
          title="Dashboard Preferences"
          description="Control how additional information is displayed."
        >
          <div className="divide-y divide-slate-100">
            <ToggleRow
              icon={ShieldCheck}
              title="Show Forecast Confidence"
              description="Display the model confidence indicator wherever available."
              checked={settings.showConfidence}
              onChange={(value) =>
                updateSetting(
                  "showConfidence",
                  value
                )
              }
            />

            <ToggleRow
              icon={SettingsIcon}
              title="Compact Forecast"
              description="Use a more compact layout for forecast cards."
              checked={settings.compactForecast}
              onChange={(value) =>
                updateSetting(
                  "compactForecast",
                  value
                )
              }
            />
          </div>
        </SettingsSection>

        {/* Language */}
        <SettingsSection
          icon={Globe2}
          title="Language"
          description="Language preferences for the application."
        >
          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold text-slate-700">
                  Interface Language
                </p>

                <p className="mt-1 text-[10px] leading-5 text-slate-400">
                  The current prototype interface is available in
                  English.
                </p>
              </div>

              <span className="rounded-lg bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm">
                English
              </span>
            </div>
          </div>
        </SettingsSection>

        {/* Privacy */}
        <SettingsSection
          icon={Lock}
          title="Privacy & Data"
          description="Information about how the prototype stores preferences."
        >
          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 text-emerald-600" />

              <div>
                <p className="text-xs font-semibold text-slate-700">
                  Local preferences only
                </p>

                <p className="mt-1 text-[10px] leading-5 text-slate-500">
                  Current settings are stored locally in your
                  browser. No account or personal data backend is
                  connected in this prototype.
                </p>
              </div>
            </div>
          </div>
        </SettingsSection>

        {/* Save */}
        <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            {saved ? (
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
                <ShieldCheck className="h-4 w-4" />
                Settings saved successfully.
              </div>
            ) : (
              <p className="text-[10px] text-slate-400">
                Changes are applied to this prototype after saving.
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={saveSettings}
            className="flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-emerald-800"
          >
            <Save className="h-4 w-4" />
            Save Settings
          </button>
        </div>
      </div>
    </main>
  );
}

function SettingsSection({
  icon: Icon,
  title,
  description,
  children,
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-start gap-3">
        <div className="rounded-xl bg-emerald-50 p-2.5">
          <Icon className="h-5 w-5 text-emerald-600" />
        </div>

        <div>
          <h2 className="text-sm font-bold text-slate-800">
            {title}
          </h2>

          <p className="mt-1 text-[10px] leading-5 text-slate-400">
            {description}
          </p>
        </div>
      </div>

      <div className="mt-5">
        {children}
      </div>
    </section>
  );
}

function SettingSelect({
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

      <div className="relative">
        <select
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 py-2.5 pr-9 text-sm font-medium text-slate-700 outline-none transition focus:border-emerald-400"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      </div>
    </div>
  );
}

function ToggleRow({
  icon: Icon,
  title,
  description,
  checked,
  onChange,
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
      <div className="flex min-w-0 items-start gap-3">
        <div className="mt-0.5 rounded-lg bg-slate-50 p-2">
          <Icon className="h-4 w-4 text-slate-500" />
        </div>

        <div>
          <p className="text-xs font-semibold text-slate-700">
            {title}
          </p>

          <p className="mt-1 max-w-xl text-[10px] leading-5 text-slate-400">
            {description}
          </p>
        </div>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          checked
            ? "bg-emerald-600"
            : "bg-slate-200"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-all ${
            checked ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}