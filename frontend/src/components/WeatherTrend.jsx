import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { trendData } from "../data/mockData";

export default function WeatherTrend() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-slate-800">
            Weather Trend (Bara)
          </h2>

          <p className="mt-1 text-[10px] text-slate-400">
            Expected rainfall and probability
          </p>
        </div>

        <div className="flex gap-1">
          {["Rainfall", "Temperature", "Humidity"].map(
            (item, index) => (
              <button
                key={item}
                className={`rounded-lg px-3 py-1.5 text-[10px] ${
                  index === 0
                    ? "bg-emerald-700 text-white"
                    : "bg-slate-50 text-slate-500"
                }`}
              >
                {item}
              </button>
            )
          )}
        </div>
      </div>

      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={trendData}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e2e8f0"
            />

            <XAxis
              dataKey="date"
              tick={{
                fontSize: 10,
                fill: "#64748b",
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              yAxisId="left"
              tick={{
                fontSize: 10,
                fill: "#64748b",
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{
                fontSize: 10,
                fill: "#64748b",
              }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `${value}%`}
            />

            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
                fontSize: "11px",
              }}
            />

            <Bar
              yAxisId="left"
              dataKey="rainfall"
              barSize={28}
              fill="#10b981"
              radius={[5, 5, 0, 0]}
            />

            <Line
              yAxisId="right"
              type="monotone"
              dataKey="probability"
              stroke="#0ea5e9"
              strokeWidth={2.5}
              dot={{
                r: 3,
              }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}