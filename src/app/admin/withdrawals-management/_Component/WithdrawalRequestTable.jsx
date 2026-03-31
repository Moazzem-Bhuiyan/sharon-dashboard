"use client";

import { ConfigProvider, Input, Table } from "antd";
import { Tooltip } from "antd";
import { ClockArrowUp, Eye, Search } from "lucide-react";
import { useState } from "react";
import { Tag } from "antd";
import CustomConfirm from "@/components/CustomConfirm/CustomConfirm";
import {
  useGetWithdrawalRequestsQuery,
  useUpdateWithdrawalRequestMutation,
} from "@/redux/api/financialApi";
import moment from "moment";
import WithdrawrequestModal from "./WithdrawrequestModal";
import toast from "react-hot-toast";

export default function WithdrawalRequestTables() {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRow, setSelectedRow] = useState(null);
  const [open, setOpen] = useState(false);

  // get withdrawal request data from api and show in table
  const { data: withdrawalRequests, isLoading } = useGetWithdrawalRequestsQuery(
    {
      page: currentPage,
      limit: 10,
      searchText: searchText,
    },
  );

  // change withdrwal request status
  const [updateWithdrawalRequest, { isLoading: updateLoading }] =
    useUpdateWithdrawalRequestMutation();

  // Dummy table data
  const data = withdrawalRequests?.data?.withdrawList?.map((item, inx) => ({
    key: inx + 1,
    id: item?._id,
    name: item?.user?.name || "n\a",
    email: item?.user?.email,
    requestedDate: moment(item?.createdAt).format("ll"),
    amount: item?.amount,
    status: item?.status,
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
      title: "User Email",
      dataIndex: "email",
    },
    {
      title: "Requested Date",
      dataIndex: "requestedDate",
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
    // {
    //   title: "Total Amount",
    //   dataIndex: "totalamount",
    //   render: (value) => (
    //     <Tag color="blue" className="!text-base font-semibold">
    //       ${value}
    //     </Tag>
    //   ),
    // },

    {
      title: "Status",
      dataIndex: "status",
      render: (value) => (
        <Tag
          color={
            value === "pending"
              ? "yellow"
              : value === "hold"
                ? "gray"
                : value === "completed"
                  ? "green"
                  : "red"
          }
          className="!text-base font-semibold"
        >
          {value}
        </Tag>
      ),
    },

    {
      title: "Action",
      render: (_, record) => (
        <div className="flex-center-start gap-x-3">
          <Tooltip title="Show Details">
            <span
              onClick={() => {
                setOpen(true);
                setSelectedRow(record?.id);
              }}
              className="cursor-pointer"
            >
              <Eye size={20} />
            </span>
          </Tooltip>
          {record?.status === "pending" || record?.status === "hold" ? (
            <CustomConfirm
              title={"Are you sure?"}
              description={`Are you sure to ${record?.status === "pending" ? "Hold" : "Pending"} this withdrawal request?`}
              onConfirm={() => {
                handleChangeStatus(record.id, record.status);
              }}
            >
              <Tooltip
                title={`${record?.status === "pending" ? "Move to Hold" : "Move to Pending"}`}
              >
                <button>
                  <ClockArrowUp color="#F16365" size={20} />
                </button>
              </Tooltip>
            </CustomConfirm>
          ) : null}
        </div>
      ),
    },
  ];

  // status change handeller
  const handleChangeStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "pending" ? "hold" : "pending";

    try {
      const res = await updateWithdrawalRequest({
        id,
        data: { status: newStatus },
      }).unwrap();

      if (res?.success) {
        toast.success("Status updated successfully");
      }
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

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
          placeholder="Search by name "
          prefix={<Search className="mr-2 text-black" size={20} />}
          className="h-11 !rounded-lg !border !text-base"
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      {/* Show table */}
      <section className="my-10">
        <Table
          style={{ overflowX: "auto" }}
          columns={columns}
          dataSource={data}
          scroll={{ x: "100%" }}
          pagination={{
            current: currentPage,
            pageSize: 10,
            total: withdrawalRequests?.data?.total,
            onChange: (page) => setCurrentPage(page),
          }}
          loading={isLoading}
        ></Table>
      </section>

      {/* Show earning modal */}
      <WithdrawrequestModal open={open} setOpen={setOpen} data={selectedRow} />
    </ConfigProvider>
  );
}
