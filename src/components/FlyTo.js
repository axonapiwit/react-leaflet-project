import { useEffect } from "react";
import { useMap } from "react-leaflet";

const FlyTo = ({ coords }) => {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.flyTo(coords, 12, { duration: 1.2 });
    }
  }, [coords, map]);
  return null;
};

export default FlyTo;
