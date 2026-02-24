"use client";
import { Input, Table } from "antd";
import { Tooltip } from "antd";
import { ConfigProvider } from "antd";
import { Check, Filter, Search, X } from "lucide-react";
import userImage from "@/assets/images/user-avatar-lg.png";
import { Eye } from "lucide-react";
import { useState } from "react";
import CustomConfirm from "@/components/CustomConfirm/CustomConfirm";
import { message } from "antd";
import KycVerificationModal from "./KycVerificationModal";
import {
  useGetVerificationRequestsQuery,
  useUpdateVerificationRequestMutation,
} from "@/redux/api/verificationApi";
import moment from "moment";
import toast from "react-hot-toast";

export default function VerificationTable() {
  const [searchText, setSearchText] = useState("");
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);

  // get all vendor verification data from api
  const { data: verificationData, isLoading } = useGetVerificationRequestsQuery(
    {
      page: currentPage,
      limit: 10,
      searchText: searchText,
    },
  );

  // varifaction status update api
  const [updateVerificationStatus] = useUpdateVerificationRequestMutation();

  // Dummy table Data (Updated with USER column based on image)
  const data =
    verificationData?.data?.map((item, index) => ({
      key: item?._id || index,

      // 🔹 Basic
      id: item?._id,
      status: item?.status,
      createdAt: item?.createdAt,

      // 🔹 Personal Info
      name: item?.personalInfo?.name,
      dob: item?.personalInfo?.dob,
      gender: item?.personalInfo?.gender,

      // 🔹 Address Info
      currentAddress: item?.address?.currentAddress,
      permanentAddress: item?.address?.permanentAddress,
      city: item?.address?.city,
      postalCode: item?.address?.postalCode,

      // 🔹 Identity
      idType: item?.identityVerification?.idType,
      idNumber: item?.identityVerification?.number,
      frontSide: item?.identityVerification?.frontSide,
      backSide: item?.identityVerification?.backSide,

      // 🔹 Bank
      bankName: item?.bankInfo?.bankName,
      accountNumber: item?.bankInfo?.accountNumber,
      tinOrNid: item?.bankInfo?.tinOrNID,

      fullData: item,
      createAt: moment(item?.createdAt).format("ll"),
    })) || [];
  // Block user handler
  const handleBlockUser = async (userId, status) => {
    try {
      const payload = {
        id: userId,
        status: status,
      };
      const res = await updateVerificationStatus(payload).unwrap();
      if (res?.success) {
        toast.success(
          `User ${status === "approved" ? "approved" : "denied"} successfully`,
        );
      } else {
        toast.error(res?.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("Failed to update verification status");
    }
  };

  // ================== Table Columns ================
  const columns = [
    {
      title: "Serial",
      render: (_, __, index) => `#${index + 1}`,
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Gender",
      dataIndex: "gender",
    },

    {
      title: "Current Address",
      dataIndex: "currentAddress",
      ellipsis: true,
    },

    {
      title: "TIN / NID",
      dataIndex: "tinOrNid",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (value) => {
        const status = value?.toLowerCase();

        const colorMap = {
          pending: "bg-yellow-100 text-yellow-600",
          approved: "bg-green-100 text-green-600",
          rejected: "bg-red-100 text-red-600",
        };

        return (
          <span
            className={`rounded-full px-3 py-1 text-sm font-semibold ${
              colorMap[status] || "bg-gray-100 text-gray-600"
            }`}
          >
            {value}
          </span>
        );
      },
    },
    {
      title: "Created At",
      dataIndex: "createAt",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <div className="flex-center-start gap-x-3">
          {" "}
          <Tooltip title="Show Details">
            {" "}
            <button
              onClick={() => {
                setProfileModalOpen(true);
                setSelectedUser(record);
              }}
            >
              {" "}
              <Eye color="#1B70A6" size={22} />{" "}
            </button>{" "}
          </Tooltip>{" "}
          {record?.status === "pending" && (
            <>
              <Tooltip title="Accept User">
                {" "}
                <CustomConfirm
                  title="accept User"
                  description="Are you sure to accept this user?"
                  onConfirm={() => handleBlockUser(record.id, "approved")}
                >
                  {" "}
                  <button>
                    {" "}
                    <Check color="#1B70A6" size={22} />{" "}
                  </button>{" "}
                </CustomConfirm>{" "}
              </Tooltip>{" "}
              <Tooltip title="Decline User">
                {" "}
                <CustomConfirm
                  title="decline User"
                  description="Are you sure to decline this user?"
                  onConfirm={() => handleBlockUser(record.id, "denied")}
                >
                  {" "}
                  <button>
                    {" "}
                    <X color="red" size={22} />{" "}
                  </button>{" "}
                </CustomConfirm>{" "}
              </Tooltip>{" "}
            </>
          )}
        </div>
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

      <Table
        style={{ overflowX: "auto", overflowY: "auto" }}
        columns={columns}
        dataSource={data}
        loading={isLoading}
        scroll={{ x: "max-content" }}
        pagination={{
          current: currentPage,
          pageSize: 10,
          total: verificationData?.meta?.total || 0,
          onChange: (page) => setCurrentPage(page),
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} verification requests`,
        }}
      ></Table>

      <KycVerificationModal
        open={profileModalOpen}
        setOpen={setProfileModalOpen}
        user={selectedUser}
      />
    </ConfigProvider>
  );
}
