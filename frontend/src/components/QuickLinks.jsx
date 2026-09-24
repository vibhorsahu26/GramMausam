import {
  CalendarDays,
  ChevronRight,
  CircleHelp,
  Clock3,
  Droplets,
  CloudSun,
} from "lucide-react";

const links = [
  {
    title: "View Detailed Forecast",
    icon: CloudSun,
  },
  {
    title: "Crop Calendar",
    icon: CalendarDays,
  },
  {
    title: "Soil Moisture",
    icon: Droplets,
  },
  {
    title: "Past Weather Data",
    icon: Clock3,
  },
  {
    title: "Help & Support",
    icon: CircleHelp,
  },
];

export default function QuickLinks() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5">
      <h2 className="mb-4 text-sm font-bold text-slate-800">
        Quick Links
      </h2>

      <div className="space-y-2">
        {links.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.title}
              className="flex w-full items-center gap-3 rounded-xl border border-slate-100 p-3 text-left transition hover:border-emerald-200 hover:bg-emerald-50/40"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-50">
                <Icon className="h-4 w-4 text-sky-600" />
              </span>

              <span className="flex-1 text-[11px] font-medium text-slate-600">
                {item.title}
              </span>

              <ChevronRight className="h-4 w-4 text-slate-400" />
            </button>
          );
        })}
      </div>
    </section>
  );
}