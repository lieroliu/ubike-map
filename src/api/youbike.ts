import { YouBikeStation, YouBikeUsage } from "../types";

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

// 取得每月使用量
export async function fetchUsage(): Promise<YouBikeUsage[]> {
  const res = await fetch(
    "https://data.taipei/api/v1/dataset/8f690548-61bc-4bff-8baa-01d465eb672c?scope=resourceAquire"
  );
  const data = await res.json();
  return data.results.map((item: any) => ({
    month: item._importdate.date,
    count: Number(item.count),
  }));
}
