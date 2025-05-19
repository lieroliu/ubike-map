import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { YouBikeUsage } from "../types";

interface UsageChartProps {
  data: YouBikeUsage[];
  mode: "line" | "bar";
}

const UsageChart: React.FC<UsageChartProps> = ({ data, mode }) => {
  return (
    <div
      style={{ width: "100%", height: 300, background: "#fff", padding: 16 }}
    >
      <ResponsiveContainer width="100%" height="100%">
        {mode === "line" ? (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="月份" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="數量" stroke="#8884d8" />
          </LineChart>
        ) : (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="月份" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="數量" fill="#82ca9d" />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default UsageChart;
