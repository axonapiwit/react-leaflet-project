import React, { useEffect, useState } from "react";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import BaseMap from "./layers/BaseMap";
import MapLocation from "./MapLocation";
import AqiLegend from "./AqiLegend";
import MapControls from "./MapControls";
import Sidebar from "./Sidebar";
import FlyTo from "./FlyTo";
import HeatmapLayer from "./HeatmapLayer";
import TourRoute from "./TourRoute";
import { MapContainer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";

const APIkey = process.env.REACT_APP_API_KEY;

const MapContent = () => {
  const [data, setData] = useState(null);
  const [airData, setAirData] = useState(null);
  const [flyCoords, setFlyCoords] = useState(null);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [showRoute, setShowRoute] = useState(false);

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
    <div className="relative w-full h-screen overflow-hidden">
      <div className="absolute top-0 left-0 right-0 z-[1002] pointer-events-none">
        <div className="m-4 pointer-events-auto inline-block">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg px-5 py-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center">
              <span className="text-white text-lg">🌍</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-800 leading-tight">Mappa</h1>
              <p className="text-xs text-gray-400">Air Quality Monitor</p>
            </div>
          </div>
        </div>
      </div>

      <Sidebar data={data} airData={airData} onSelect={setFlyCoords} />

      <div className="absolute top-[140px] right-4 z-[999] flex flex-col gap-2">
        <button
          onClick={() => setShowHeatmap(!showHeatmap)}
          className={`backdrop-blur-md shadow-lg rounded-xl px-3 py-2 text-xs font-semibold transition flex items-center gap-1.5 ${
            showHeatmap
              ? "bg-orange-500 text-white hover:bg-orange-600"
              : "bg-white/90 text-gray-600 hover:bg-white"
          }`}
        >
          <span className="text-sm">🔥</span>
          {showHeatmap ? "ปิด Heatmap" : "Heatmap"}
        </button>
        <button
          onClick={() => setShowRoute(!showRoute)}
          className={`backdrop-blur-md shadow-lg rounded-xl px-3 py-2 text-xs font-semibold transition flex items-center gap-1.5 ${
            showRoute
              ? "bg-cyan-500 text-white hover:bg-cyan-600"
              : "bg-white/90 text-gray-600 hover:bg-white"
          }`}
        >
          <span className="text-sm">🗺️</span>
          {showRoute ? "ปิด Route" : "เส้นทาง"}
        </button>
      </div>

      <MapContainer
        style={{ width: "100%", height: "100vh" }}
        center={[13, 100]}
        zoom={6}
        maxZoom={18}
        minZoom={5}
      >
        <BaseMap />
        <MarkerClusterGroup
          chunkedLoading
          maxClusterRadius={60}
          spiderfyOnMaxZoom
          iconCreateFunction={(cluster) => {
            const count = cluster.getChildCount();
            return L.divIcon({
              html: `<div class="cluster-icon">${count}</div>`,
              className: "custom-cluster",
              iconSize: [44, 44],
            });
          }}
        >
          <MapLocation data={data} airData={airData} />
        </MarkerClusterGroup>
        <HeatmapLayer data={data} airData={airData} visible={showHeatmap} />
        <TourRoute data={data} visible={showRoute} />
        <MapControls />
        <FlyTo coords={flyCoords} />
      </MapContainer>
      <AqiLegend />
    </div>
  );
};

export default MapContent;
