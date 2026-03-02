import React from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { getAqiColor } from "../utils/aqiUtils";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const v = payload[0].value;
  const { bg } = getAqiColor(v);
  return (
    <div className="bg-white rounded-lg shadow-lg px-3 py-1.5 text-xs border border-gray-100">
      <p className="text-gray-400 mb-0.5">{label}</p>
      <p className="font-bold" style={{ color: bg }}>PM2.5: {v}</p>
    </div>
  );
};

const AqiChart = ({ forecast }) => {
  const pm25 = forecast?.daily?.pm25;
  if (!pm25 || pm25.length === 0) return null;

  const chartData = pm25.map((d) => ({
    date: d.day?.slice(5),
    avg: d.avg,
    max: d.max,
    min: d.min,
  }));

  const todayStr = new Date().toISOString().slice(5, 10);

  return (
    <div className="mt-2 mb-1">
      <p className="text-xs font-semibold text-gray-600 mb-1">PM2.5 พยากรณ์ 7 วัน</p>
      <div style={{ width: "100%", height: 100 }}>
        <ResponsiveContainer>
          <AreaChart data={chartData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
            <defs>
              <linearGradient id="aqiGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" tick={{ fontSize: 9, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 9, fill: "#9ca3af" }} axisLine={false} tickLine={false} width={30} />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine x={todayStr} stroke="#f59e0b" strokeDasharray="3 3" strokeWidth={1} />
            <Area type="monotone" dataKey="avg" stroke="#06b6d4" strokeWidth={2} fill="url(#aqiGrad)" dot={false} activeDot={{ r: 3, fill: "#06b6d4" }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AqiChart;
