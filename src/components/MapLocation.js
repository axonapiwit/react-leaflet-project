import React, { useEffect, useState } from "react";
import axios from "axios";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "../index.css";
import "leaflet/dist/leaflet.css";

const APIkey = process.env.REACT_APP_API_KEY;

const getAqiColor = (aqi) => {
  if (aqi >= 0 && aqi <= 50) return { bg: "#50C9F4", label: "ดี" };
  if (aqi >= 51 && aqi <= 100) return { bg: "#78C150", label: "ปานกลาง" };
  if (aqi >= 101 && aqi <= 200) return { bg: "#FFF46B", label: "ไม่ดีต่อกลุ่มเสี่ยง", dark: true };
  if (aqi >= 201 && aqi <= 300) return { bg: "#F89836", label: "ไม่ดี" };
  if (aqi >= 301 && aqi <= 500) return { bg: "#EC363A", label: "อันตราย" };
  return { bg: "#ccc", label: "ไม่มีข้อมูล", dark: true };
};

const MapLocation = () => {
  const [data, setData] = useState(null);
  const [airData, setAirData] = useState(null);

  const circleIcon = (index) => {
    const aqi = airData?.[index]?.data?.aqi ?? null;
    const { bg, dark } = getAqiColor(aqi);
    const textColor = dark ? "#555" : "#fff";

    return L.divIcon({
      html: `
        <div style="
          width: 40px; height: 40px; border-radius: 50%;
          background: ${bg};
          color: ${textColor};
          font-size: 13px; font-weight: 700;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.25), 0 0 0 3px rgba(255,255,255,0.7);
          transition: transform 0.2s;
          cursor: pointer;
        ">${aqi ?? "–"}</div>
      `,
      className: "aqi-marker",
      iconSize: [40, 40],
      iconAnchor: [20, 20],
    });
  };

  useEffect(() => {
    axios
      .get("json/tourism.json")
      .then((res) => setData(res.data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!data) return;
    const fetchAir = async () => {
      const results = await Promise.all(
        data.map(async (loc) => {
          try {
            const res = await axios.get(
              `https://api.waqi.info/feed/geo:${loc.lat};${loc.long}/?token=${APIkey}`
            );
            return res.data;
          } catch {
            return null;
          }
        })
      );
      setAirData(results);
    };
    fetchAir();
  }, [data]);

  return (
    <>
      {data?.map((item, index) => {
        const aqi = airData?.[index]?.data?.aqi ?? null;
        const { bg, label: aqiLabel } = getAqiColor(aqi);
        return (
          <Marker
            key={index}
            position={[item?.lat, item?.long]}
            icon={circleIcon(index)}
          >
            <Popup className="custom-popup" maxWidth={300} minWidth={280}>
              <div className="w-72">
                <div className="relative w-full h-36 -mx-[16px] -mt-[14px] mb-3" style={{ width: "calc(100% + 32px)" }}>
                  {item?.image ? (
                    <img
                      src={item.image}
                      alt={item?.place_name}
                      className="w-full h-full object-cover rounded-t-2xl"
                      onError={(e) => { e.target.style.display = "none"; }}
                    />
                  ) : (
                    <div className="w-full h-full rounded-t-2xl bg-gradient-to-br from-emerald-400 to-cyan-500" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-t-2xl" />
                  <div
                    className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1"
                    style={{ backgroundColor: bg, color: bg === "#FFF46B" ? "#555" : "#fff" }}
                  >
                    AQI {aqi ?? "–"}
                  </div>
                  <h2 className="absolute bottom-2.5 left-3 right-3 text-white font-bold text-base drop-shadow-lg leading-tight">
                    {item?.place_name}
                  </h2>
                </div>
                <div className="flex items-center gap-2 mb-2.5">
                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: bg + "25", color: bg === "#FFF46B" ? "#92700c" : bg }}
                  >
                    {aqiLabel}
                  </span>
                  <span className="text-xs text-gray-400">
                    {item?.province}
                  </span>
                </div>
                <div className="border-t border-gray-100 pt-2 flex flex-wrap gap-1.5">
                  {[item?.sub_district, item?.district, item?.province]
                    .filter(Boolean)
                    .map((t, i) => (
                      <span
                        key={i}
                        className="bg-gray-50 text-gray-500 text-xs px-2 py-0.5 rounded-md"
                      >
                        📍 {t}
                      </span>
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
