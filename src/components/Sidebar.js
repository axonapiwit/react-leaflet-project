import React, { useState } from "react";
import { getAqiColor, AQI_LEVELS } from "../utils/aqiUtils";

const Sidebar = ({ data, airData, onSelect }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [aqiFilter, setAqiFilter] = useState("all");

  const filtered = data?.filter((item, i) => {
    const aqi = airData?.[i]?.data?.aqi ?? null;
    const matchSearch =
      !search ||
      item.place_name?.toLowerCase().includes(search.toLowerCase()) ||
      item.province?.toLowerCase().includes(search.toLowerCase());
    if (!matchSearch) return false;
    if (aqiFilter === "all") return true;
    const level = AQI_LEVELS.find((l) => l.key === aqiFilter);
    if (!level || aqi === null) return aqiFilter === "all";
    return aqi >= level.min && aqi <= level.max;
  });

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className={`absolute top-[72px] z-[1001] bg-white/90 backdrop-blur-md shadow-lg rounded-xl px-3 py-2 text-sm font-semibold text-gray-600 hover:bg-white transition-all duration-300 flex items-center gap-1.5 ${
          open ? "left-[328px]" : "left-4"
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {open
            ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
            : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="15" y2="12"/><line x1="3" y1="18" x2="9" y2="18"/></>
          }
        </svg>
        {open ? "ปิด" : "สถานที่"}
      </button>

      <div
        className={`absolute top-0 left-0 z-[1000] h-full transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="w-80 h-full bg-white/95 backdrop-blur-md shadow-2xl flex flex-col pt-[72px]">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-bold text-gray-800">สถานที่ท่องเที่ยว</h2>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                  {filtered?.length ?? 0} แห่ง
                </span>
                <button
                  onClick={() => setOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>
            </div>
            <div className="relative mb-3">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input
                type="text"
                placeholder="ค้นหาสถานที่ / จังหวัด..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 bg-gray-50"
              />
            </div>
            <div className="flex flex-wrap gap-1.5">
              {AQI_LEVELS.map((level) => (
                <button
                  key={level.key}
                  onClick={() => setAqiFilter(level.key)}
                  className={`text-xs px-2.5 py-1 rounded-full font-medium transition-all ${
                    aqiFilter === level.key
                      ? "text-white shadow-sm scale-105"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
                  style={
                    aqiFilter === level.key
                      ? { backgroundColor: level.color, color: level.key === "unhealthy-sg" ? "#555" : "#fff" }
                      : {}
                  }
                >
                  {level.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filtered?.map((item, i) => {
              const origIndex = data.indexOf(item);
              const aqi = airData?.[origIndex]?.data?.aqi ?? null;
              const { bg, label: aqiLabel } = getAqiColor(aqi);
              return (
                <button
                  key={origIndex}
                  onClick={() => {
                    onSelect([parseFloat(item.lat), parseFloat(item.long)]);
                    if (window.innerWidth < 768) setOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 border-b border-gray-50 hover:bg-cyan-50/50 transition flex items-center gap-3 group"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex-shrink-0 bg-cover bg-center shadow-sm"
                    style={{
                      backgroundImage: item.image ? `url(${item.image})` : undefined,
                      backgroundColor: !item.image ? bg : undefined,
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate group-hover:text-cyan-600 transition">
                      {item.place_name}
                    </p>
                    <p className="text-xs text-gray-400 truncate">{item.province}</p>
                  </div>
                  <div className="flex flex-col items-end gap-0.5 flex-shrink-0">
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: bg + "25", color: bg === "#FFF46B" ? "#92700c" : bg }}
                    >
                      {aqi ?? "–"}
                    </span>
                    <span className="text-[10px] text-gray-400">{aqiLabel}</span>
                  </div>
                </button>
              );
            })}
            {filtered?.length === 0 && (
              <div className="p-8 text-center text-gray-400 text-sm">ไม่พบสถานที่</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
