import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

const MapControls = () => {
  const map = useMap();

  useEffect(() => {
    const locateBtn = L.control({ position: "bottomright" });
    locateBtn.onAdd = () => {
      const btn = L.DomUtil.create("button", "map-ctrl-btn");
      btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/></svg>`;
      btn.title = "ตำแหน่งของฉัน";
      L.DomEvent.disableClickPropagation(btn);
      btn.onclick = () => {
        btn.classList.add("loading");
        map.locate({ setView: true, maxZoom: 14 });
        map.once("locationfound", () => btn.classList.remove("loading"));
        map.once("locationerror", () => btn.classList.remove("loading"));
      };
      return btn;
    };

    const fullscreenBtn = L.control({ position: "bottomright" });
    fullscreenBtn.onAdd = () => {
      const btn = L.DomUtil.create("button", "map-ctrl-btn");
      const updateIcon = () => {
        const isFs = !!document.fullscreenElement;
        btn.innerHTML = isFs
          ? `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 14 4 20 10 20"/><polyline points="20 10 20 4 14 4"/><line x1="14" y1="10" x2="21" y2="3"/><line x1="3" y1="21" x2="10" y2="14"/></svg>`
          : `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>`;
      };
      updateIcon();
      btn.title = "เต็มจอ";
      L.DomEvent.disableClickPropagation(btn);
      btn.onclick = () => {
        const container = map.getContainer().closest(".relative");
        if (!document.fullscreenElement) {
          container?.requestFullscreen?.();
        } else {
          document.exitFullscreen?.();
        }
      };
      document.addEventListener("fullscreenchange", updateIcon);
      btn._cleanup = () => document.removeEventListener("fullscreenchange", updateIcon);
      return btn;
    };

    fullscreenBtn.addTo(map);
    locateBtn.addTo(map);

    map.on("locationfound", (e) => {
      L.circleMarker(e.latlng, {
        radius: 8,
        fillColor: "#4285F4",
        fillOpacity: 1,
        color: "#fff",
        weight: 3,
      })
        .addTo(map)
        .bindPopup("คุณอยู่ที่นี่")
        .openPopup();
    });

    map.on("locationerror", () => {
      alert("ไม่สามารถระบุตำแหน่งได้ กรุณาอนุญาต Location ในเบราว์เซอร์");
    });

    return () => {
      locateBtn.remove();
      fullscreenBtn.remove();
    };
  }, [map]);

  return null;
};

export default MapControls;
