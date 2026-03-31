"use client";
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const EarningOverviewChart = ({ data: chartData }) => {
  // const data = [
  //   { month: "Jan", planner: 45000, vendor: 38000, total: 48000 },
  //   { month: "Feb", planner: 48000, vendor: 42000, total: 50000 },
  //   { month: "Mar", planner: 35000, vendor: 32000, total: 40000 },
  //   { month: "Apr", planner: 30000, vendor: 28000, total: 35000 },
  //   { month: "May", planner: 25000, vendor: 22000, total: 30000 },
  //   { month: "Jun", planner: 22000, vendor: 20000, total: 25000 },
  //   { month: "Jul", planner: 18000, vendor: 17000, total: 20000 },
  //   { month: "Aug", planner: 40000, vendor: 38000, total: 45000 },
  //   { month: "Sep", planner: 48000, vendor: 45000, total: 50000 },
  //   { month: "Oct", planner: 42000, vendor: 40000, total: 47000 },
  //   { month: "Nov", planner: 38000, vendor: 36000, total: 44000 },
  //   { month: "Dec", planner: 46000, vendor: 43000, total: 49000 },
  // ];

  const plannerData = chartData?.planerEarningOverview || [];
  const vendorData = chartData?.vendorEarningOverview || [];
  const totalData = chartData?.totalEarningOverview || [];

  // Merge arrays by month
  const data = plannerData.map((item) => {
    const vendor = vendorData.find((v) => v.month === item.month);
    const total = totalData.find((t) => t.month === item.month);

    return {
      month: item.month,
      planner: item.amount || 0,
      vendor: vendor?.amount || 0,
      total: total?.amount || 0,
    };
  });

  return (
    <div className="mt-20 w-full rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold text-gray-900">
        Earning Overview
      </h2>

      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          {/* Gradient Definitions */}
          <defs>
            <linearGradient id="planner" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FF9A62" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#FF9A62" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="vendor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FCA5A5" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#FCA5A5" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#60A5FA" stopOpacity={0.1} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="month"
            tick={{ fill: "#6b7280", fontSize: 14 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#9ca3af", fontSize: 14 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => `${value / 1000}k`}
          />

          <Tooltip
            formatter={(value) => `$ ${(value / 1000).toFixed(1)}k`}
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          />

          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="circle"
            formatter={(value) => (
              <span className="text-sm text-gray-700">{value}</span>
            )}
          />

          {/* Stacked Areas - Total on top for visibility */}
          <Area
            type="monotone"
            dataKey="total"
            stackId="1"
            stroke="#3B82F6"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#total)"
            dot={{ fill: "#3B82F6", r: 6, strokeWidth: 2, stroke: "#fff" }}
            activeDot={{ r: 8 }}
          />
          <Area
            type="monotone"
            dataKey="planner"
            stackId="1"
            stroke="#FB923C"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#planner)"
            dot={{ fill: "#FB923C", r: 6, strokeWidth: 2, stroke: "#fff" }}
          />
          <Area
            type="monotone"
            dataKey="vendor"
            stackId="1"
            stroke="#F87171"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#vendor)"
            dot={{ fill: "#F87171", r: 6, strokeWidth: 2, stroke: "#fff" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EarningOverviewChart;
