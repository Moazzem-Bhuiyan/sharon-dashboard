"use client";
import CustomConfirm from "@/components/CustomConfirm/CustomConfirm";
import {
  useGetAllSubscriptionHistoryQuery,
  usePasueSubscriptionMutation,
} from "@/redux/api/subsCriptionApi";
import { Table } from "antd";
import { Check, Cross, Eye, Star, StarOff } from "lucide-react";
import moment from "moment";
import React, { useState } from "react";
import SubsCriptionHistoryModal from "./SubsCriptionHistoryModal";
import toast from "react-hot-toast";

export default function SubshistoryContainer() {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  // get subscription history from api
  const { data: subscriptionHistory, isLoading } =
    useGetAllSubscriptionHistoryQuery({
      page: currentPage,
      limit: 10,
      searchText: searchText,
    });

  // change subscription status api handeller
  const [
    changeSubscriptionStatus,
    { isLoading: changeSubscriptionStatusLoading },
  ] = usePasueSubscriptionMutation();

  const data = subscriptionHistory?.data?.map((item, i) => ({
    key: i,
    id: item?._id,
    name: item?.user?.name,
    email: item?.user?.email,
    plan: item.package?.title,
    billingCycle: item.package?.billingCycle,
    type: item?.type,
    amount: item?.amount,
    autoRenew: item?.autoRenew,
    purchaseDate: moment(item?.createdAt).format("LLL"),
    expiredAt: moment(item?.expiredAt).format("LLL"),
    status: item?.status,
  }));

  // handle suspend and activate subscription
  const handleSuspend = async (id, status) => {
    try {
      const response = await changeSubscriptionStatus({ id, status }).unwrap();
      if (response?.success) {
        toast.success(
          `Subscription ${status === "active" ? "activated" : "suspended"} successfully`,
        );
      }
    } catch (error) {
      toast.error("Failed to update subscription status");
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Plan",
      dataIndex: "plan",
      key: "plan",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span
          className={`${
            status === "active"
              ? "bg-green-100 text-green-800"
              : status === "suspend"
                ? "bg-red-100 text-red-800"
                : "bg-gray-100 text-gray-800"
          } rounded-full px-2 py-1 text-sm font-medium`}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Purchase Date",
      dataIndex: "purchaseDate",
      key: "date",
    },
    {
      title: "Expired At",
      dataIndex: "expiredAt",
      key: "expiredAt",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex items-center gap-x-3">
          <button
            onClick={() => {
              setSelectedRow(record);
              setOpen(true);
            }}
            className="text-blue-500 hover:underline"
          >
            <Eye size={24} />
          </button>
          <CustomConfirm
            title={`${record.status === "active" ? "Suspend" : "Activate"} Subscription?`}
            description={`Are you sure you want to ${record.status === "active" ? "suspend" : "activate"} this subscription?`}
            onConfirm={() => {
              handleSuspend(
                record.id,
                record.status === "active" ? "suspend" : "active",
              );
            }}
          >
            <button className="hover:underline">
              {record.status === "active" ? (
                <StarOff size={24} color="red" />
              ) : (
                <Star size={24} color="green" />
              )}
            </button>
          </CustomConfirm>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Subscription History</h1>
      <Table
        columns={columns}
        dataSource={data}
        loading={isLoading}
        pagination={{
          current: currentPage,
          pageSize: 10,
          onChange: (page) => setCurrentPage(page),
          total: subscriptionHistory?.meta?.total || 0,
          showTotal: (total) => `Total ${total} items`,
        }}
      />
      <SubsCriptionHistoryModal
        open={open}
        setOpen={setOpen}
        selectedRow={selectedRow}
      />
    </div>
  );
}
