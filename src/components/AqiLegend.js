import React, { useState } from "react";

const levels = [
  { range: "0–50", label: "ดี", color: "#50C9F4" },
  { range: "51–100", label: "ปานกลาง", color: "#78C150" },
  { range: "101–200", label: "ไม่ดีต่อกลุ่มเสี่ยง", color: "#FFF46B", text: "#92700c" },
  { range: "201–300", label: "ไม่ดี", color: "#F89836" },
  { range: "301–500", label: "อันตราย", color: "#EC363A" },
];

const AqiLegend = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="absolute bottom-6 left-4 z-[1000]">
      <button
        onClick={() => setOpen(!open)}
        className="bg-white/90 backdrop-blur-md shadow-lg rounded-xl px-3 py-2 text-xs font-semibold text-gray-600 hover:bg-white transition mb-2 flex items-center gap-1.5"
      >
        <span className="w-3 h-3 rounded-full bg-gradient-to-r from-cyan-400 to-red-400 inline-block" />
        {open ? "ซ่อน AQI" : "แสดง AQI"}
      </button>
      {open && (
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-4 w-52 animate-fade-in">
          <h3 className="text-sm font-bold text-gray-700 mb-3">ระดับคุณภาพอากาศ</h3>
          <div className="space-y-2">
            {levels.map((l) => (
              <div key={l.range} className="flex items-center gap-2.5">
                <span
                  className="w-5 h-5 rounded-full shadow-sm border border-white/50 flex-shrink-0"
                  style={{ backgroundColor: l.color }}
                />
                <span className="text-xs text-gray-600">
                  <span className="font-semibold">{l.range}</span> — {l.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AqiLegend;
