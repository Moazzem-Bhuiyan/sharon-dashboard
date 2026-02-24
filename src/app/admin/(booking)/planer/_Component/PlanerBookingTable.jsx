"use client";

import { Input, Table, Tag } from "antd";
import { ConfigProvider } from "antd";
import { useState } from "react";
import { Eye, Search } from "lucide-react";
import { useGetAllPlanerBookingsQuery } from "@/redux/api/bookingApi";
import moment from "moment";
import VendorBookingDetailsModal from "../../vendor/_Component/VendorBookingDetailsModal";

export default function PlanerBookingTable() {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  // get all vendor booking data from api
  const { data: bookings, isLoading } = useGetAllPlanerBookingsQuery({
    page: currentPage,
    limit: 10,
    searchText: searchText,
  });

  const data = bookings?.data?.map((item, index) => ({
    key: item._id || index,

    // 🔹 Basic Info
    id: item._id,
    title: item.title,
    type: item.type,
    authority: item.authority,
    status: item.status,

    // 🔹 Sender Info
    sender_id: item.sender?._id,
    sender_name: item.sender?.name,
    sender_photo: item.sender?.photoUrl,
    sender_address: item.sender?.address,
    sender_kyc: item.sender?.isKycVerified,

    // 🔹 Receiver Info
    receiver_id: item.receiver?._id,
    receiver_name: item.receiver?.name,
    receiver_photo: item.receiver?.photoUrl,
    receiver_address: item.receiver?.address,
    receiver_kyc: item.receiver?.isKycVerified,

    // 🔹 Financial Info
    totalAmount: item.totalAmount,
    initialAmount: item.initialAmount,
    pendingAmount: item.pendingAmount,
    finalAmount: item.finalAmount,
    refundAmount: item.refundAmount,

    initialPayCompleted: item.initialPayCompleted,
    finalPayCompleted: item.finalPayCompleted,
    isFullyPaid: item.isFullyPaid,

    // 🔹 Event Info
    shortDescription: item.shortDescription,
    description: item.description,
    duration: item.duration,
    startDate: item.startDate,
    endDate: item.endDate,

    // 🔹 Location Info
    address: item.address,
    location_type: item.location?.type,
    coordinates: item.location?.coordinates,
    locationUrl: item.locationUrl,

    // 🔹 Flags
    isCompleted: item.isCompleted,
    isDeleted: item.isDeleted,

    // 🔹 Timestamps
    createdAt: moment(item.createdAt).format("LLL"),
    updatedAt: item.updatedAt,
  }));

  const statusColorMap = {
    processing: "blue",
    pending: "gold",
    running: "cyan",
    denied: "red",
    completed: "green",
  };
  // ================== Table Columns ================
  const columns = [
    {
      title: "Planer Name (Sender)",
      dataIndex: "sender_name",
      render: (value, record) => (
        <div className="gap-x-2">
          <p className="font-medium">{value}</p>
          <p className="text-xs text-gray-400">{record.sender_email}</p>
        </div>
      ),
    },
    {
      title: "Event Type",
      dataIndex: "type",
    },
    // {
    //   title: "Location",
    //   dataIndex: "address",
    // },
    {
      title: "Date",
      dataIndex: "createdAt",
    },
    {
      title: "Amount",
      dataIndex: "totalAmount",
      render: (value) => <span>$ {value}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (value) => (
        <Tag color={statusColorMap[value] || "default"}>{value}</Tag>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <button
          onClick={() => {
            setProfileModalOpen(true);
            setSelectedBooking(record);
          }}
          className="rounded px-3 py-1 text-white"
        >
          <Eye className="mr-1" color="black" size={24} />
        </button>
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
      <h1 className="mb-2 text-xl font-semibold">Planer Booking List </h1>
      <Table
        style={{ overflowX: "auto" }}
        columns={columns}
        dataSource={data}
        scroll={{ x: "max-content" }}
        loading={isLoading}
        pagination={{
          current: currentPage,
          pageSize: 10,
          total: bookings?.meta?.total || 0,
          onChange: (page) => setCurrentPage(page),
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} bookings`,
        }}
      ></Table>
      <VendorBookingDetailsModal
        open={profileModalOpen}
        setOpen={setProfileModalOpen}
        booking={selectedBooking}
      />
    </ConfigProvider>
  );
}
