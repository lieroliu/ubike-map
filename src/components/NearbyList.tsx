import React from "react";
import { YouBikeStation } from "../types";

function getDistance(lat1: number, lng1: number, lat2: number, lng2: number) {
  const toRad = (v: number) => (v * Math.PI) / 180;
  const R = 6371; // km
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

interface NearbyListProps {
  stations: YouBikeStation[];
  center: [number, number];
  onSelect: (station: YouBikeStation) => void;
  show: boolean;
}

const NearbyList: React.FC<NearbyListProps> = ({
  stations,
  center,
  onSelect,
  show,
}) => {
  if (!show) return null;
  const filtered = stations
    .filter(
      (s) => getDistance(center[0], center[1], s.lat, s.lng) <= 3 && s.bemp > 0
    )
    .sort(
      (a, b) =>
        getDistance(center[0], center[1], a.lat, a.lng) -
        getDistance(center[0], center[1], b.lat, b.lng)
    );

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 60,
        width: 300,
        background: "#fff",
        zIndex: 1000,
        maxHeight: 400,
        overflow: "auto",
        border: "1px solid #eee",
      }}
    >
      <h4 style={{ margin: 8 }}>3公里內有空位站點 ({filtered.length})</h4>
      <ul style={{ margin: 0, padding: 0 }}>
        {filtered.map((station) => (
          <li
            key={station.sno}
            style={{
              listStyle: "none",
              padding: 8,
              cursor: "pointer",
              borderBottom: "1px solid #eee",
            }}
            onClick={() => onSelect(station)}
          >
            {station.sna} <span style={{ color: "#888" }}>{station.ar}</span>
            <br />
            空位：{station.bemp}
          </li>
        ))}
        {filtered.length === 0 && <li style={{ padding: 8 }}>查無站點</li>}
      </ul>
    </div>
  );
};

export default NearbyList;
