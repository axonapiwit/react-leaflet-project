import React from "react";
import "leaflet/dist/leaflet.css";
import BaseMap from "./layers/BaseMap";
import MapLocation from "./MapLocation";
import AqiLegend from "./AqiLegend";
import { MapContainer } from "react-leaflet";

const MapContent = () => {
  return (
    <div className="relative w-full h-screen">
      <div className="absolute top-0 left-0 right-0 z-[1000] pointer-events-none">
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
      <MapContainer
        style={{ width: "100%", height: "100vh" }}
        center={[13, 100]}
        zoom={6}
        maxZoom={18}
        minZoom={5}
      >
        <BaseMap />
        <MapLocation />
      </MapContainer>
      <AqiLegend />
    </div>
  );
};

export default MapContent;
