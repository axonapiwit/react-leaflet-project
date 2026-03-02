import React from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "../index.css";
import "leaflet/dist/leaflet.css";
import { getAqiColor } from "../utils/aqiUtils";
import AqiChart from "./AqiChart";

const WeatherRow = ({ icon, label, value, unit }) =>
  value != null ? (
    <div className="flex items-center gap-1.5">
      <span className="text-sm">{icon}</span>
      <span className="text-xs text-gray-500">{label}</span>
      <span className="text-xs font-semibold text-gray-700 ml-auto">{value}{unit}</span>
    </div>
  ) : null;

const MapLocation = ({ data, airData }) => {
  const circleIcon = (index) => {
    const aqi = airData?.[index]?.data?.aqi ?? null;
    const { bg, dark } = getAqiColor(aqi);
    const textColor = dark ? "#555" : "#fff";
    return L.divIcon({
      html: `<div style="
        width:40px;height:40px;border-radius:50%;
        background:${bg};color:${textColor};
        font-size:13px;font-weight:700;
        display:flex;align-items:center;justify-content:center;
        box-shadow:0 2px 8px rgba(0,0,0,0.25),0 0 0 3px rgba(255,255,255,0.7);
        transition:transform 0.2s;cursor:pointer;
      ">${aqi ?? "–"}</div>`,
      className: "aqi-marker",
      iconSize: [40, 40],
      iconAnchor: [20, 20],
    });
  };

  return (
    <>
      {data?.map((item, index) => {
        const d = airData?.[index]?.data;
        const aqi = d?.aqi ?? null;
        const iaqi = d?.iaqi;
        const forecast = d?.forecast;
        const temp = iaqi?.t?.v;
        const humidity = iaqi?.h?.v;
        const wind = iaqi?.w?.v;
        const pressure = iaqi?.p?.v;
        const { bg, label: aqiLabel } = getAqiColor(aqi);
        return (
          <Marker key={index} position={[item?.lat, item?.long]} icon={circleIcon(index)}>
            <Popup className="custom-popup" maxWidth={300} minWidth={280}>
              <div className="w-72">
                <div className="relative w-full h-36 -mx-[16px] -mt-[14px] mb-3" style={{ width: "calc(100% + 32px)" }}>
                  {item?.image ? (
                    <img src={item.image} alt={item?.place_name} className="w-full h-full object-cover rounded-t-2xl" onError={(e) => { e.target.style.display = "none"; }} />
                  ) : (
                    <div className="w-full h-full rounded-t-2xl bg-gradient-to-br from-emerald-400 to-cyan-500" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-t-2xl" />
                  <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full text-xs font-bold shadow-lg" style={{ backgroundColor: bg, color: bg === "#FFF46B" ? "#555" : "#fff" }}>
                    AQI {aqi ?? "–"}
                  </div>
                  <h2 className="absolute bottom-2.5 left-3 right-3 text-white font-bold text-base drop-shadow-lg leading-tight">
                    {item?.place_name}
                  </h2>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ backgroundColor: bg + "25", color: bg === "#FFF46B" ? "#92700c" : bg }}>
                    {aqiLabel}
                  </span>
                  <span className="text-xs text-gray-400">{item?.province}</span>
                </div>

                {(temp != null || humidity != null || wind != null) && (
                  <div className="bg-gray-50 rounded-xl p-2.5 mb-2 grid grid-cols-2 gap-x-4 gap-y-1">
                    <WeatherRow icon="🌡" label="อุณหภูมิ" value={temp} unit="°C" />
                    <WeatherRow icon="💧" label="ความชื้น" value={humidity} unit="%" />
                    <WeatherRow icon="💨" label="ลม" value={wind} unit=" m/s" />
                    <WeatherRow icon="🔽" label="ความกดอากาศ" value={pressure} unit=" hPa" />
                  </div>
                )}

                <AqiChart forecast={forecast} />

                <div className="border-t border-gray-100 pt-2 flex flex-wrap gap-1.5">
                  {[item?.sub_district, item?.district, item?.province].filter(Boolean).map((t, i) => (
                    <span key={i} className="bg-gray-50 text-gray-500 text-xs px-2 py-0.5 rounded-md">📍 {t}</span>
                  ))}
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
};

export default MapLocation;
