import type { YouBikeMonthlyUsageApiResponse } from "@/types";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://data.taipei/api/v1/dataset/8f690548-61bc-4bff-8baa-01d465eb672c?scope=resourceAquire&resource_id=8f690548-61bc-4bff-8baa-01d465eb672c%22"
    );
    if (!response.ok) {
      throw new Error("外部 API 回應失敗");
    }
    const data = await response.json();
    // 直接回傳 data，假設格式正確
    return NextResponse.json(data as YouBikeMonthlyUsageApiResponse);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: error.message || "伺服器錯誤" },
      { status: 500 }
    );
  }
}
