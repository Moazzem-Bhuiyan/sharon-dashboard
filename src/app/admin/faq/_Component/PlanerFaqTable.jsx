"use client";
import CustomConfirm from "@/components/CustomConfirm/CustomConfirm";
import { useDeleteFaqMutation, useGetFaqsQuery } from "@/redux/api/faqApi";
import { Table, Tooltip } from "antd";
import { Edit, Trash, Trash2 } from "lucide-react";
import moment from "moment";
import React, { useState } from "react";
import EditFaqModal from "./EditFaq";

function PlanerFaqTable({ type }) {
  const [searchText, setSearchText] = useState("");
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRow, setSelectedRow] = useState(null);
  // get faq from api

  const { data: faq, isLoading } = useGetFaqsQuery({
    searchText: searchText,
    page: currentPage,
    type: type,
  });
  // delete faq api handeller
  const [deleteFaq] = useDeleteFaqMutation();
  const data = faq?.data?.map((item, inx) => ({
    key: inx + 1,
    id: item?._id,
    title: item.question,
    date: moment(item.createdAt).format("ll"),
    ans: item.answer,
  }));

  const handleDelete = async (id) => {
    try {
      const response = await deleteFaq(id).unwrap();
      if (response?.success) {
        toast.success("Faq deleted successfully");
      }
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };
  const columns = [
    {
      title: "Faq Question",
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
      render: (_, record) => (
        <div className="flex items-center gap-x-3">
          <Tooltip title="Edit">
            <button
              onClick={() => {
                setOpen(true);
                setSelectedRow(record);
              }}
            >
              <Edit color="#1B70A6" size={20} />
            </button>
          </Tooltip>

          <CustomConfirm
            title={"Are you sure?"}
            description={"Are you sure to delete this faq?"}
            onConfirm={() => {
              handleDelete(record.id);
            }}
          >
            <Tooltip title="Delete">
              <button>
                <Trash2 color="#F16365" size={20} />
              </button>
            </Tooltip>
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
      <Table
        columns={columns}
        dataSource={data}
        loading={isLoading}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: false,
          current: currentPage,
          onChange: (page) => setCurrentPage(page),
          total: faq?.meta?.total,
        }}
      />
      <EditFaqModal
        open={open}
        setOpen={setOpen}
        selectedRow={selectedRow}
        audience={type}
      />
    </div>
  );
}

export default PlanerFaqTable;
