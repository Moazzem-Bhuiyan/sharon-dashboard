"use client";

import { Input, Table, Tag } from "antd";
import { ConfigProvider } from "antd";
import { useState } from "react";
import { message } from "antd";
import { Search } from "lucide-react";

// Dummy table Data
const data = Array.from({ length: 50 }).map((_, inx) => ({
  key: inx + 1,
  order_date: "11 oct 24, 11.10PM",
  customer_name: "Moazzem",
  email: "justina@gmail.com",
  amount: "$500",
  status: "Processing",
  event_type: "Wedding",
  location: "New York",
}));

export default function PlanerBookingTable() {
  const [searchText, setSearchText] = useState("");
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  // Block user handler
  const handleBlockUser = () => {
    message.success(" Order delete  successfully");
  };

  // ================== Table Columns ================
  const columns = [
    {
      title: "Planner Name",
      dataIndex: "customer_name",
      render: (value, record) => (
        <div className="gap-x-2">
          <p className="font-medium">{value}</p>
          <p className="text-xs text-gray-400">{record.email}</p>
        </div>
      ),
    },
    {
      title: "Event Type",
      dataIndex: "event_type",
    },
    {
      title: "Location",
      dataIndex: "location",
    },
    {
      title: "Date",
      dataIndex: "order_date",
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (value) => (
        <Tag color={value === "Processing" ? "blue" : "green"}>{value}</Tag>
      ),
    },
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1B70A6",
          colorInfo: "#1B70A6",
        },
      }}
    >
      <div className="mb-3 ml-auto w-1/3 gap-x-5">
        <Input
          placeholder="Search by name or email"
          prefix={<Search className="mr-2 text-black" size={20} />}
          className="h-11 !rounded-lg !border !text-base"
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <h1 className="mb-2 text-xl font-semibold">Planer Booking</h1>
      <Table
        style={{ overflowX: "auto" }}
        columns={columns}
        dataSource={data}
        scroll={{ x: "100%" }}
      ></Table>
      {/* 
      <OrderDetailsModal
        open={profileModalOpen}
        setOpen={setProfileModalOpen}
      /> */}
    </ConfigProvider>
  );
}
