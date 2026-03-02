export const getAqiColor = (aqi) => {
  if (aqi >= 0 && aqi <= 50) return { bg: "#50C9F4", label: "ดี" };
  if (aqi >= 51 && aqi <= 100) return { bg: "#78C150", label: "ปานกลาง" };
  if (aqi >= 101 && aqi <= 200) return { bg: "#FFF46B", label: "ไม่ดีต่อกลุ่มเสี่ยง", dark: true };
  if (aqi >= 201 && aqi <= 300) return { bg: "#F89836", label: "ไม่ดี" };
  if (aqi >= 301 && aqi <= 500) return { bg: "#EC363A", label: "อันตราย" };
  return { bg: "#ccc", label: "ไม่มีข้อมูล", dark: true };
};

export const AQI_LEVELS = [
  { key: "all", label: "ทั้งหมด", color: "#6b7280" },
  { key: "good", label: "ดี", color: "#50C9F4", min: 0, max: 50 },
  { key: "moderate", label: "ปานกลาง", color: "#78C150", min: 51, max: 100 },
  { key: "unhealthy-sg", label: "ไม่ดีต่อกลุ่มเสี่ยง", color: "#FFF46B", min: 101, max: 200 },
  { key: "unhealthy", label: "ไม่ดี", color: "#F89836", min: 201, max: 300 },
  { key: "hazardous", label: "อันตราย", color: "#EC363A", min: 301, max: 500 },
];
