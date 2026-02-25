"use client";
import CustomConfirm from "@/components/CustomConfirm/CustomConfirm";
import { useGetServicesQuery } from "@/redux/api/serviceApi";
import { Table, Tooltip } from "antd";
import { Check, X } from "lucide-react";
import React, { useState } from "react";

export default function ServicePendingTable() {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  // get pending service api handaller

  const { data: service, isLoading } = useGetServicesQuery({
    page: currentPage,
    limit: 10,
    searchText: searchText,
  });

  const data = service?.data?.map((item, inx) => ({
    key: inx + 1,
    service_name: item?.title,
    customer_name: item?.author?.name,
    email: item?.author?.email,
    status: "Pending",
    categories: item?.author?.categories
      ?.map((category) => category)
      .join(", "),
    role: item?.author?.role,
    subtitle: item?.subtitle,
    title: item?.title,
    address: item?.address,
    locationUrl: item?.locationUrl,
  }));

  const columns = [
    {
      title: "Service Name",
      dataIndex: "service_name",
      key: "service_name",
      ellipsis: {
        showTitle: false,
      },
      render: (value) => (
        <Tooltip title={value}>
          <div className="max-w-[150px] truncate text-sm">{value}</div>
        </Tooltip>
      ),
    },
    {
      title: "Applicant Name",
      dataIndex: "customer_name",
      key: "customer_name",
      ellipsis: {
        showTitle: false,
      },
      render: (value) => (
        <Tooltip title={value}>
          <div className="max-w-[150px] truncate text-sm">{value}</div>
        </Tooltip>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Category",
      dataIndex: "categories",
      key: "categories",
      ellipsis: {
        showTitle: false,
      },
      render: (value) => (
        <Tooltip title={value}>
          <div className="max-w-[150px] truncate text-sm">{value}</div>
        </Tooltip>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Subtitle",
      dataIndex: "subtitle",
      key: "subtitle",
      ellipsis: {
        showTitle: false,
      },
      render: (value) => (
        <Tooltip title={value}>
          <div className="max-w-[150px] truncate text-sm">{value}</div>
        </Tooltip>
      ),
    },

    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      ellipsis: {
        showTitle: false,
      },
      render: (value) => (
        <Tooltip title={value}>
          <div className="max-w-[150px] truncate text-sm">{value}</div>
        </Tooltip>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (value, record) => (
        <div className="flex-center-start gap-x-2">
          <CustomConfirm
            title={"Approve Service"}
            description={"Are you sure to approve this service"}
          >
            <button>
              <Check color="#F16365" size={22} />
            </button>
          </CustomConfirm>
          <CustomConfirm
            title={"Reject Service"}
            description={"Are you sure to reject this service"}
          >
            <button>
              <X color="red" size={22} />
            </button>
          </CustomConfirm>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        loading={isLoading}
        pagination={{
          current: currentPage,
          pageSize: 10,
          total: service?.meta?.total,
          onChange: (page) => {
            setCurrentPage(page);
          },
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} services`,
        }}
      />
    </div>
  );
}
