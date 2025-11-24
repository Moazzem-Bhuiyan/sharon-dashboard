"use client";
import CustomConfirm from "@/components/CustomConfirm/CustomConfirm";
import { Table } from "antd";
import { Check, X } from "lucide-react";
import React from "react";

export default function ServicePendingTable() {
  const data = Array.from({ length: 50 }).map((_, inx) => ({
    key: inx + 1,
    service_name: "Wedding Photography",
    customer_name: "Moazzem",
    email: "justina@gmail.com",
    status: "Pending",
    event_type: "Wedding",
    role: inx % 3 === 0 ? "Planner" : "Vendor",
  }));

  const columns = [
    {
      title: "Service Name",
      dataIndex: "service_name",
      key: "service_name",
    },
    {
      title: "Applicant Name",
      dataIndex: "customer_name",
      key: "customer_name",
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
      dataIndex: "event_type",
      key: "event_type",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
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
      <Table columns={columns} dataSource={data} />
    </div>
  );
}
