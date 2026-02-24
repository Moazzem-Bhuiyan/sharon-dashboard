"use client";

import { ConfigProvider, Input, Table } from "antd";
import { Search } from "lucide-react";
import { Tooltip } from "antd";
import { Eye } from "lucide-react";
import { useState } from "react";
import { Tag } from "antd";
import EarningModal from "./EarningModal";
import moment from "moment";

export default function EarningsTable({
  transactions,
  isLoading,
  setSearchText,
  setCurrentPage,
  currentPage,
}) {
  const [showEarningModal, setShowEarningModal] = useState(false);
  const [selectedEarning, setSelectedEarning] = useState(null);

  // Dummy table data
  const data = transactions?.map((item, inx) => ({
    key: inx + 1,
    name: item?.user?.name,
    email: item?.user?.email,
    purchaseDate: moment(item?.createdAt).format("ll"),
    amount: item?.amount,
    modelType: item?.modelType,
    paymentIntentId: item?.paymentIntentId,
    transactionId: item?.transactionId,
    status: item?.status,
    id: item?.id,
  }));
  // ================== Table Columns ================
  const columns = [
    {
      title: "ID",
      dataIndex: "key",
      render: (value) => `#${value}`,
    },
    {
      title: "User Name",
      dataIndex: "name",
    },

    {
      title: "Amount",
      dataIndex: "amount",
      render: (value) => (
        <Tag color="blue" className="!text-base font-semibold">
          ${value}
        </Tag>
      ),
    },
    {
      title: "Payment Intent Id",
      dataIndex: "paymentIntentId",
    },
    {
      title: "Date",
      dataIndex: "purchaseDate",
    },
    {
      title: "Action",
      render: (_, record) => (
        <Tooltip title="Show Details">
          <button
            onClick={() => {
              setShowEarningModal(true);
              setSelectedEarning(record);
            }}
          >
            <Eye color="#1B70A6" size={22} />
          </button>
        </Tooltip>
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

      {/* Earning table */}
      <section className="my-10">
        <Table
          style={{ overflowX: "auto" }}
          columns={columns}
          dataSource={data}
          scroll={{ x: "100%" }}
          loading={isLoading}
          pagination={{
            current: currentPage,
            pageSize: 10,
            onChange: (page) => setCurrentPage(page),
          }}
        ></Table>
      </section>

      {/* Show earning modal */}
      <EarningModal
        open={showEarningModal}
        setOpen={setShowEarningModal}
        earning={selectedEarning}
      />
    </ConfigProvider>
  );
}
