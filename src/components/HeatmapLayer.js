import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet.heat";

const HeatmapLayer = ({ data, airData, visible }) => {
  const map = useMap();

  useEffect(() => {
    if (!visible || !data || !airData) return;

    const points = data
      .map((loc, i) => {
        const aqi = airData?.[i]?.data?.aqi;
        if (aqi == null) return null;
        return [parseFloat(loc.lat), parseFloat(loc.long), aqi / 500];
      })
      .filter(Boolean);

    const heat = L.heatLayer(points, {
      radius: 40,
      blur: 30,
      maxZoom: 10,
      max: 1.0,
      gradient: {
        0.0: "#50C9F4",
        0.2: "#78C150",
        0.4: "#FFF46B",
        0.6: "#F89836",
        0.8: "#EC363A",
        1.0: "#7E0023",
      },
    }).addTo(map);

    return () => map.removeLayer(heat);
  }, [map, data, airData, visible]);

  return null;
};

export default HeatmapLayer;
