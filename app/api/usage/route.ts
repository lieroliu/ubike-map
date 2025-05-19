import type { YouBikeMonthlyUsage } from "@/types";
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
    return NextResponse.json({
      ...data,
      result: {
        results: data.result.results.map((result: YouBikeMonthlyUsage) => ({
          month: result.民國年月,
          count: result["臺北市youbike每月使用量（次數）"],
        })),
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "伺服器錯誤" },
      { status: 500 }
    );
  }
}
