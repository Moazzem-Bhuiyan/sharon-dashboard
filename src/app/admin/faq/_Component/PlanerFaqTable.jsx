"use client";
import CustomConfirm from "@/components/CustomConfirm/CustomConfirm";
import { Table } from "antd";
import { Trash } from "lucide-react";
import React from "react";

function PlanerFaqTable() {
  const data = Array.from({ length: 7 }).map((_, inx) => ({
    key: inx + 1,
    title: "Faq Title",
    date: "2023-10-01",
    ans: "Answer",
  }));
  const columns = [
    {
      title: "Faq Title",
      dataIndex: "title",
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Answer",
      dataIndex: "ans",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (value, record) => (
        <div className="flex-center-start gap-x-2">
          <CustomConfirm
            title="Delete"
            content="Are you sure to delte this faq?"
            description="Are you sure to delte this faq?"
            onConfirm={handleBlockUser}
          >
            <button>
              <Trash color="#F16365" size={22} />
            </button>
          </CustomConfirm>
        </div>
      ),
    },
  ];

  const handleBlockUser = () => {
    message.success("Faq deleted successfully");
  };
  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default PlanerFaqTable;
