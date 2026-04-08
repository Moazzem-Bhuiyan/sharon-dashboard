"use client";
import { DatePicker } from "antd";
import moment from "moment";
import React, { useState } from "react";
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

const EarningOverviewChart = ({
  data: chartData,
  onBookingYearChange,
  onOrderYearChange,
  onSubscriptionYearChange,
}) => {
  const [selectedYear, setSelectedYear] = useState(null);

  // Month order for proper sorting
  const monthOrder = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // ✅ Correct data handling
  const data = (chartData?.earningOverview || []).sort(
    (a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month),
  );

  // Handle year change
  const handleChange = (date, dateString) => {
    setSelectedYear(dateString);
    onOrderYearChange && onOrderYearChange(dateString);
  };

  return (
    <div className="mt-20 w-full rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold text-gray-900">
        Earning Overview
      </h2>

      {/* Year Picker */}
      <div className="mb-4">
        <DatePicker
          value={selectedYear ? moment(selectedYear, "YYYY") : null}
          onChange={handleChange}
          picker="year"
          placeholder="Select earning year"
          style={{ width: 150 }}
        />
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          {/* Gradients */}
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

          {/* Grid */}
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />

          {/* X Axis */}
          <XAxis
            dataKey="month"
            tick={{ fill: "#6b7280", fontSize: 14 }}
            axisLine={false}
            tickLine={false}
          />

          {/* Y Axis */}
          <YAxis
            tick={{ fill: "#9ca3af", fontSize: 14 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => `${value / 1000}k`}
          />

          {/* Tooltip */}
          <Tooltip
            formatter={(value) => `$ ${(value / 1000).toFixed(1)}k`}
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          />

          {/* Legend */}
          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="circle"
            formatter={(value) => (
              <span className="text-sm capitalize text-gray-700">{value}</span>
            )}
          />

          {/* Areas */}
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
