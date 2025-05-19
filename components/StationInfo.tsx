import React from "react";
import { YouBikeStation } from "../types";

interface StationInfoProps {
  station?: YouBikeStation;
}

const StationInfo: React.FC<StationInfoProps> = ({ station }) => {
  if (!station) return <div style={{ padding: 16 }}>請點選地圖上的站點</div>;
  return (
    <div style={{ padding: 16 }}>
      <h3>{station.sna}</h3>
      <div>地址：{station.ar}</div>
      <div>總車輛：{station.tot}</div>
      <div>可借：{station.sbi}</div>
      <div>空位：{station.bemp}</div>
    </div>
  );
};

export default StationInfo;
