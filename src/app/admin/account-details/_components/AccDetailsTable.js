"use client";
import { Input, Table } from "antd";
import { Tooltip } from "antd";
import { ConfigProvider } from "antd";
import { Filter, Search } from "lucide-react";
import { Eye } from "lucide-react";
import { UserX } from "lucide-react";
import { useState } from "react";
import CustomConfirm from "@/components/CustomConfirm/CustomConfirm";
import ProfileModal from "@/components/SharedModals/ProfileModal";
import {
  useBlockUnblockUserMutation,
  useGetAllusersQuery,
} from "@/redux/api/userApi";
import moment from "moment";
import toast from "react-hot-toast";
import { Image } from "antd";

export default function AccDetailsTable() {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [selectedUser, SetSelecteduser] = useState("");

  // User data with query parameterss
  const { data: users, isLoading } = useGetAllusersQuery({
    limit: 10,
    page: currentPage,
    searchText,
  });

  // status change api handaler----------------

  const [updateStatus, { isLoading: updating }] = useBlockUnblockUserMutation();

  // Dummy table Data (Updated with USER column based on image)
  const data = users?.data?.map((user, inx) => {
    return {
      _id: user?._id,
      key: inx + 1,
      name: user?.name || "not found",
      userImg: user?.photoUrl,
      email: user?.email || "not found",
      contact: user?.contractNumber || "not found",
      date: moment(user?.createdAt).format("ll"),
      status: user?.status,
      address: user?.address || "not found",
      role: user?.role || "not found",
      categories: user?.categories || [],
    };
  });

  // Block user handler
  const handleBlockUser = async (values) => {
    const payload = {
      userId: values._id,
      status: values?.status == "active" ? "blocked" : "active",
    };
    try {
      const res = await updateStatus(payload).unwrap();
      if (res.success) {
        toast.success(
          `${values.name} ${values?.status == "blocked" ? "unblocked" : "blocked"} successfully!`,
        );
      }
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  // ================== Table Columns ================
  const columns = [
    {
      title: "Serial",
      dataIndex: "key",
      render: (value) => `#${value}`,
    },
    {
      title: "User Name",
      dataIndex: "name",
      render: (value, record) => {
        // Helper function to validate URL
        const isValidUrl = (url) => {
          if (!url) return false;
          return (
            url.startsWith("http://") ||
            url.startsWith("https://") ||
            url.startsWith("/")
          );
        };

        // Get the first letter of the name (uppercase)
        const firstLetter = value ? value.charAt(0).toUpperCase() : "";

        // Determine if the image is valid
        const hasValidImage = isValidUrl(record?.userImg);

        return (
          <div className="flex-center-start gap-x-2">
            {hasValidImage ? (
              <Image
                src={record?.userImg}
                alt="User avatar"
                width={40}
                height={40}
                className="aspect-square h-auto w-10 rounded-full"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#000000] text-lg font-medium text-white">
                {firstLetter}
              </div>
            )}
            <p className="font-medium">{value}</p>
          </div>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
    },

    {
      title: "Role",
      dataIndex: "role",
      filters: [
        { text: "Planner", value: "planer" },
        { text: "User", value: "user" },
        { text: "Vendor", value: "vendor" },
      ],
      filterIcon: (filtered) => (
        <Filter
          size={16}
          color={filtered ? "#1B70A6" : "#000000"}
          style={{ cursor: "pointer" }}
        />
      ),
      onFilter: (value, record) => record.role === value,
      render: (value) => (
        <span
          className={`rounded-full px-3 py-1 text-sm font-semibold ${value === "planer" ? "border bg-green-100 text-green-600" : value === "vendor" ? "border bg-blue-100 text-blue-600" : "border bg-gray-100 text-gray-600"}`}
        >
          {value}
        </span>
      ),
    },
    {
      title: "Contact",
      dataIndex: "contact",
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Status",
      dataIndex: "status",
      filters: [
        { text: "Active", value: "active" },
        { text: "Blocked", value: "blocked" },
      ],
      filterIcon: (filtered) => (
        <Filter
          size={16}
          color={filtered ? "#1B70A6" : "#000000"}
          style={{ cursor: "pointer" }}
        />
      ),
      onFilter: (value, record) => record.status === value,
      render: (value) => (
        <span
          className={`rounded-full px-3 py-1 text-sm font-semibold ${value === "active" ? "border bg-green-100 text-green-600" : "border bg-white text-red-600"}`}
        >
          {value || "Active"}
        </span>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <div className="flex-center-start gap-x-3">
          <Tooltip title="Show Details">
            <button
              onClick={() => {
                setProfileModalOpen(true);
                SetSelecteduser(record);
              }}
            >
              <Eye color="#1B70A6" size={22} />
            </button>
          </Tooltip>

          <Tooltip title="Block User">
            <CustomConfirm
              title={`${record?.status == "blocked" ? "Unblock User" : "Blocked User"}`}
              description={`Are you sure to ${record?.status == "blocked" ? "Unblock" : "Blocked"} this user?`}
              loading={updating}
              onConfirm={() => handleBlockUser(record)}
            >
              <button>
                <UserX color="#F16365" size={22} />
              </button>
            </CustomConfirm>
          </Tooltip>
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
        scroll={{ x: "max-content" }}
        pagination={{
          current: currentPage,
          pageSize: 10,
          total: users?.meta?.total,
          onChange: (page) => setCurrentPage(page),
          showTotal: (total) => `Total ${total} users`,
        }}
        loading={isLoading}
      ></Table>

      <ProfileModal
        open={profileModalOpen}
        setOpen={setProfileModalOpen}
        selectedUser={selectedUser}
      />
    </ConfigProvider>
  );
}
