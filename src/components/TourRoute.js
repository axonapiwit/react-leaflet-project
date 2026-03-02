import React from "react";
import { Polyline, CircleMarker, Tooltip } from "react-leaflet";

const TourRoute = ({ data, visible }) => {
  if (!visible || !data || data.length < 2) return null;

  const positions = data.map((d) => [parseFloat(d.lat), parseFloat(d.long)]);

  return (
    <>
      <Polyline
        positions={positions}
        pathOptions={{
          color: "#06b6d4",
          weight: 3,
          dashArray: "10 8",
          opacity: 0.7,
          lineCap: "round",
        }}
      />
      {positions.map((pos, i) => (
        <CircleMarker
          key={`route-${i}`}
          center={pos}
          radius={10}
          pathOptions={{
            fillColor: "#06b6d4",
            fillOpacity: 0.9,
            color: "#fff",
            weight: 2,
          }}
        >
          <Tooltip direction="top" offset={[0, -10]} permanent className="route-label">
            {i + 1}
          </Tooltip>
        </CircleMarker>
      ))}
    </>
  );
};

export default TourRoute;
