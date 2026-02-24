"use client";

import { Select } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";

const EarningSummary = ({ revenueByCategory }) => {
  const [selectedYear, setSelectedYear] = useState("");

  const data = revenueByCategory?.map((item, inx) => ({
    key: inx + 1,
    month: item?.category,
    user: item?.amount,
  }));

  const handleChange = (value) => {
    setSelectedYear(value);
  };

  return (
    <div className="max-w-8xl mx-auto w-full rounded-lg bg-white p-6 shadow-lg">
      <div className="mb-10 flex items-center justify-between gap-2 lg:flex-wrap xl:flex-nowrap">
        <h1 className="text-xl font-bold">Revenue by Category</h1>

        {/* <div className="space-x-3">
          <Select
            value={selectedYear}
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
              { value: "2024", label: "2024" },
              { value: "2023", label: "2023" },
              { value: "2022", label: "2022" },
              { value: "2021", label: "2021" },
            ]}
          />
        </div> */}
      </div>

      <ResponsiveContainer width="100%" height={375}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 20,
          }}
          barSize={20}
        >
          {/* Define Gradient */}
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#41839E" stopOpacity={1} />
              <stop offset="100%" stopColor="#0B607E" stopOpacity={1} />
            </linearGradient>
          </defs>

          <XAxis
            dataKey="month"
            scale="point"
            padding={{ left: 10, right: 10 }}
            tickMargin={10}
            tickLine={false}
            axisLine={false}
          />
          <YAxis axisLine={false} tickLine={false} tickMargin={20} />

          <Tooltip
            formatter={(value) => [`Total Earnings: ${value}`]}
            contentStyle={{
              color: "var(--primary-green)",
              fontWeight: "500",
              borderRadius: "5px",
              border: "0",
            }}
          />

          <CartesianGrid
            opacity={0.2}
            horizontal={true}
            vertical={false}
            stroke="#080E0E"
            strokeDasharray="3 3"
          />

          <Bar
            barSize={35}
            radius={5}
            background={false}
            dataKey="user"
            fill="url(#colorGradient)"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EarningSummary;
