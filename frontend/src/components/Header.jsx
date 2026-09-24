import {
  Bell,
  CalendarDays,
  ChevronDown,
  Search,
} from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="flex min-h-[72px] items-center gap-4 px-4 sm:px-6 xl:px-8">
        <div className="relative hidden flex-1 md:block">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            placeholder="Search State, District, Block or Panchayat..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-emerald-400 focus:bg-white"
          />
        </div>

        <button className="relative rounded-xl p-2.5 text-slate-600 hover:bg-slate-50">
          <Bell className="h-5 w-5" />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <div className="hidden items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 sm:flex">
          <CalendarDays className="h-4 w-4 text-slate-500" />

          <div>
            <p className="text-xs font-semibold text-slate-700">
              24 Apr 2025
            </p>

            <p className="text-[10px] text-slate-400">Thu</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
            VS
          </div>

          <div className="hidden md:block">
            <p className="text-xs font-semibold text-slate-800">
              Vibhor Sahu
            </p>

            <p className="text-[10px] text-slate-500">
              Farmer / User
            </p>
          </div>

          <ChevronDown className="hidden h-4 w-4 text-slate-400 md:block" />
        </div>
      </div>
    </header>
  );
}