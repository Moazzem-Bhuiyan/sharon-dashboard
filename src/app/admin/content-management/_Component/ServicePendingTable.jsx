"use client";
import CustomConfirm from "@/components/CustomConfirm/CustomConfirm";
import FormWrapper from "@/components/Form/FormWrapper";
import UTextArea from "@/components/Form/UTextArea";
import {
  useGetServicesQuery,
  useUpdateServiceMutation,
} from "@/redux/api/serviceApi";
import { Button, Modal, Table, Tooltip } from "antd";
import { Check, X } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function ServicePendingTable() {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  // get pending service api handaller

  const { data: service, isLoading } = useGetServicesQuery({
    page: currentPage,
    limit: 10,
    searchText: searchText,
  });

  // service approval api
  const [updateService, { isLoading: isUpdating }] = useUpdateServiceMutation();

  const data = service?.data?.map((item, inx) => ({
    key: inx + 1,
    _id: item?._id,
    service_name: item?.title,
    customer_name: item?.author?.name,
    email: item?.author?.email,
    status: item?.status,
    categories: item?.author?.categories
      ?.map((category) => category)
      .join(", "),
    role: item?.author?.role,
    subtitle: item?.subtitle,
    title: item?.title,
    address: item?.address,
    locationUrl: item?.locationUrl,
  }));

  // service cancle api
  const handleCancle = async (values) => {
    try {
      const payload = {
        id: selectedRow?._id,
        status: "denied",
        reason: values.reason,
      };
      const res = await updateService(payload).unwrap();
      if (res?.success) {
        toast.success(res?.message || "Service cancled successfully");
        setIsModalOpen(false);
      }
    } catch (error) {
      toast.error(error?.data?.message || "Failed to cancle service");
    }
  };

  // approved
  const handleApprove = async (id) => {
    console.log("🚀 ~ handleApprove ~ id:", id);

    try {
      const payload = {
        id: id,
        status: "active",
      };
      const res = await updateService(payload).unwrap();
      if (res?.success) {
        toast.success(res?.message || "Service approved successfully");
      }
    } catch (error) {
      toast.error(error?.data?.message || "Failed to approve service");
    }
  };

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
      render: (value) => (
        <div
          className={`flex items-center justify-center gap-2 ${value === "active" ? "rounded-xl border bg-green-50 text-green-500" : "rounded-xl border bg-red-50 text-red-500"}`}
        >
          {value === "active" ? (
            <Check className="text-green-500" />
          ) : (
            <X className="text-red-500" />
          )}
          <span className="">{value}</span>
        </div>
      ),
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
      render: (_, record) => (
        <div className="flex-center-start gap-x-2">
          <CustomConfirm
            title={"Approve Service"}
            description={"Are you sure to approve this service"}
            onConfirm={() => {
              handleApprove(record?._id);
            }}
          >
            <button>
              <Check color="#F16365" size={22} />
            </button>
          </CustomConfirm>
          <CustomConfirm
            title={"Reject Service"}
            description={"Are you sure to reject this service"}
            onConfirm={() => {
              setIsModalOpen(true);
              setSelectedRow(record);
            }}
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

      <Modal
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        footer={null}
        centered
      >
        <h1 className="text-xl font-medium">
          Please enter the reason to reject :
        </h1>
        <FormWrapper onSubmit={handleCancle}>
          <UTextArea name="reason" label="Reason" placeholder="Reason" />
          <Button
            loading={isUpdating}
            className="w-full"
            type="primary"
            htmlType="submit"
          >
            Submit
          </Button>
        </FormWrapper>
      </Modal>
    </div>
  );
}
