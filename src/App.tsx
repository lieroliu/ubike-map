import { useEffect, useState } from "react";
import { fetchStations, fetchUsage } from "./api/youbike";
import "./App.css";
import ChartToggle from "./components/ChartToggle";
import MapView from "./components/MapView";
import NearbyList from "./components/NearbyList";
import SearchBar from "./components/SearchBar";
import StationInfo from "./components/StationInfo";
import UsageChart from "./components/UsageChart";
import { YouBikeStation, YouBikeUsage } from "./types";
import { toYearMonth } from "./utils/formmat";

const DEFAULT_CENTER: [number, number] = [25.0478, 121.5319]; // 台北車站

function App() {
  const [stations, setStations] = useState<YouBikeStation[]>([]);
  const [selected, setSelected] = useState<YouBikeStation | undefined>();
  const [center, setCenter] = useState<[number, number]>(DEFAULT_CENTER);
  const [showNearby, setShowNearby] = useState(false);
  const [usage, setUsage] = useState<YouBikeUsage[]>([]);
  const [chartMode, setChartMode] = useState<"line" | "bar">("line");

  useEffect(() => {
    fetchStations().then(setStations);
    fetchUsage()
      .then((res) =>
        setUsage(
          res.map((item) => ({
            ...item,
            month: toYearMonth(item.month),
          }))
        )
      )
      .catch(() =>
        setUsage([
          {
            month: "2025-03",
            count: 2730442,
          },
          {
            month: "2025-04",
            count: 2072168,
          },
        ])
      );
  }, []);

  const handleSelect = (station: YouBikeStation) => {
    setSelected(station);
    setCenter([station.lat, station.lng]);
    setShowNearby(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: 8,
          background: "#f5f5f5",
        }}
      >
        <h2 style={{ margin: 0, flex: 1 }}>YouBike 臺北市查詢系統</h2>
        <button
          onClick={() => setShowNearby((s) => !s)}
          style={{
            marginRight: 16,
            borderRadius: 4,
            padding: 4,
            background: "#fff",
            border: "1px solid #eee",
          }}
        >
          {showNearby ? "隱藏" : "顯示"}3公里內有空位站點
        </button>
        <div style={{ width: 300, marginRight: 8 }}>
          <SearchBar stations={stations} onSelect={handleSelect} />
        </div>
      </div>
      <div style={{ flex: 1, display: "flex", position: "relative" }}>
        <NearbyList
          stations={stations}
          center={center}
          onSelect={handleSelect}
          show={showNearby}
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <MapView
            stations={stations}
            onSelect={handleSelect}
            selectedStation={selected}
            center={center}
          />
        </div>
        <div
          style={{
            width: 320,
            background: "#fff",
            borderLeft: "1px solid #eee",
            height: "100%",
            overflow: "auto",
          }}
        >
          <StationInfo station={selected} />
        </div>
      </div>
      <div style={{ background: "#f5f5f5", padding: 0 }}>
        <ChartToggle mode={chartMode} onChange={setChartMode} />
        <UsageChart data={usage} mode={chartMode} />
      </div>
    </div>
  );
}

export default App;
