import L from "leaflet";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { YouBikeStation } from "../types";

// 修正 marker 圖示

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  iconUrl: "/leaflet/marker-icon.png",
  shadowUrl: "/leaflet/marker-shadow.png",
});

interface MapViewProps {
  stations: YouBikeStation[];
  onSelect: (station: YouBikeStation) => void;
  selectedStation?: YouBikeStation;
  center: [number, number];
}

const SetMapCenter = ({
  center,
  selectedStation,
}: {
  center: [number, number];
  selectedStation?: YouBikeStation;
}) => {
  const map = useMap();
  useEffect(() => {
    if (selectedStation) {
      map.setView([selectedStation.lat, selectedStation.lng], 16);
    } else {
      map.setView(center);
    }
  }, [center, selectedStation, map]);
  return null;
};

// 新增 PopupWithAutoOpen 元件
const PopupWithAutoOpen: React.FC<{
  isOpen: boolean;
  children: React.ReactNode;
}> = ({ isOpen, children }) => {
  const popupRef = useRef<L.Popup>(null);

  useEffect(() => {
    const popup = popupRef.current;
    // 取得 map 實例
    const map = popup && (popup as any)._source && (popup as any)._source._map;
    if (popup && map) {
      if (isOpen) {
        popup.openOn(map);
      } else {
        popup.close();
      }
    }
  }, [isOpen]);

  return <Popup ref={popupRef}>{children}</Popup>;
};

const MapView: React.FC<MapViewProps> = ({
  stations,
  onSelect,
  selectedStation,
  center,
}) => {
  return (
    <MapContainer
      center={center}
      zoom={14}
      style={{ height: "100%", width: "100%" }}
    >
      <SetMapCenter center={center} selectedStation={selectedStation} />
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {stations.map((station) => (
        <Marker
          key={station.sno}
          position={[station.lat, station.lng]}
          eventHandlers={{
            click: () => onSelect(station),
          }}
        >
          <PopupWithAutoOpen isOpen={selectedStation?.sno === station.sno}>
            <div>
              <b>{station.sna}</b>
              <br />
              {station.ar}
              <br />
              總車輛：{station.tot}
              <br />
              可借：{station.sbi}，空位：{station.bemp}
            </div>
          </PopupWithAutoOpen>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
