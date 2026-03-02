import React from "react";
import { LayersControl, TileLayer } from "react-leaflet";

const BaseMap = () => {
  return (
    <LayersControl position="topright">
      <LayersControl.BaseLayer name="Standard" checked>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
        />
      </LayersControl.BaseLayer>

      <LayersControl.BaseLayer name="CyclOSM">
        <TileLayer
          url="https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
        />
      </LayersControl.BaseLayer>

      <LayersControl.BaseLayer name="Dark">
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        />
      </LayersControl.BaseLayer>

      <LayersControl.BaseLayer name="Satellite">
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
        />
      </LayersControl.BaseLayer>
    </LayersControl>
  );
};

export default BaseMap;
