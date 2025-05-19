export interface YouBikeStation {
  sno: string; // 站點編號
  sna: string; // 站點名稱
  tot: number; // 總車輛數
  sbi: number; // 可借車輛數
  bemp: number; // 空位數
  lat: number; // 緯度
  lng: number; // 經度
  ar: string; // 地址
}

export interface YouBikeUsage {
  month: string; // 月份
  count: number; // 使用量
}
