import L from "leaflet";
import "leaflet/dist/leaflet.css";
import React, { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { YouBikeStation } from "../types";

// 修正 marker 圖示
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
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
          <Popup>
            <div>
              <b>{station.sna}</b>
              <br />
              {station.ar}
              <br />
              總車輛：{station.tot}
              <br />
              可借：{station.sbi}，空位：{station.bemp}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
