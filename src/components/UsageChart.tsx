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
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#8884d8" />
          </LineChart>
        ) : (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#82ca9d" />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default UsageChart;
