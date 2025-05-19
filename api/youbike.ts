import { YouBikeStation } from "../types";

// 取得 YouBike 站點即時資訊
export async function fetchStations(): Promise<YouBikeStation[]> {
  const res = await fetch(
    "https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json"
  );
  const data = await res.json();
  return data.map((item: any) => ({
    sno: item.sno,
    sna: item.sna,
    tot: Number(item.total),
    sbi: Number(item.available_rent_bikes),
    bemp: Number(item.available_return_bikes),
    lat: Number(item.latitude),
    lng: Number(item.longitude),
    ar: item.ar,
  }));
}
