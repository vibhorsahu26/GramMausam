import {
  AlertTriangle,
  CheckCircle2,
  Leaf,
  Sprout,
} from "lucide-react";

const actions = [
  "Avoid irrigation due to expected rainfall.",
  "Ensure proper drainage in fields.",
  "Delay fertilizer application (if planned).",
  "Monitor for pest and disease incidence after rainfall.",
];

export default function AdvisoryPanel({ weather }) {
  return (
    <aside className="space-y-4">
      <section className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5">
        <div className="flex items-center gap-2">
          <Leaf className="h-5 w-5 text-emerald-600" />

          <h2 className="text-sm font-bold text-emerald-800">
            Agricultural Advisory
          </h2>
        </div>

        <div className="mt-5 rounded-xl border border-slate-200 bg-white p-3">
          <label className="text-[10px] text-slate-500">
            Crop
          </label>

          <div className="mt-1 flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-800">
              🌾 {weather.crop}
            </span>

            <span className="text-xs text-slate-400">
              ▼
            </span>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-emerald-100 bg-white">
          <div className="border-b border-emerald-100 bg-emerald-50 px-4 py-3">
            <p className="text-[10px] font-bold uppercase tracking-wide text-emerald-800">
              Recommended Actions
            </p>
          </div>

          <div className="space-y-3 p-4">
            {actions.map((action) => (
              <div
                key={action}
                className="flex items-start gap-2"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />

                <p className="text-[11px] leading-5 text-slate-600">
                  {action}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 shrink-0 text-amber-600" />

            <div>
              <p className="text-[11px] font-bold text-amber-800">
                Weather Risk
              </p>

              <p className="mt-1 text-[11px] leading-5 text-slate-600">
                {weather.riskText}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-emerald-100 bg-white p-4">
          <div className="flex items-center gap-3">
            <Sprout className="h-5 w-5 text-emerald-600" />

            <div>
              <p className="text-[10px] font-bold text-emerald-800">
                Crop Stage
              </p>

              <p className="mt-1 text-[11px] text-slate-600">
                {weather.cropStage}
              </p>

              <p className="text-[10px] text-slate-400">
                ({weather.cropStageDays})
              </p>
            </div>
          </div>
        </div>
      </section>
    </aside>
  );
}