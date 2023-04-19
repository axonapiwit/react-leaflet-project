import React from "react";
import "leaflet/dist/leaflet.css";
import BaseMap from "./layers/BaseMap";
import MapLocation from "./MapLocation";
// import icon from "leaflet/dist/images/marker-icon.png";
// import iconShadow from "leaflet/dist/images/marker-shadow.png";
// import L from "leaflet"

import { MapContainer } from "react-leaflet";
// import jsonData from "../json/th.json";

// let DefaultIcon = L.icon({
//   iconUrl: icon,
//   shadowUrl: iconShadow,
//   iconSize: [25, 41],
//   iconAnchor: [12.5, 20.5],
// });
// L.Marker.prototype.options.icon = DefaultIcon;

const MapContent = () => {

  return (
    <div>
      <MapContainer
        style={{ width: "100%", height: "100vh" }}
        center={[13, 100]}
       
        zoom={6}
        maxZoom={18}
        minZoom={5}
      >
        <BaseMap />
        <MapLocation />
        {/* <MapLocation jsonData={jsonData} /> */}
      </MapContainer>
    </div>
  );
};

export default MapContent;
