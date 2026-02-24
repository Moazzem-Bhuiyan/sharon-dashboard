"use client";

import { ConfigProvider, Image } from "antd";
import { Table } from "antd";
import { Tag } from "antd";
import { useState } from "react";
import ProfileModal from "@/components/SharedModals/ProfileModal";
import moment from "moment";

const RecentUserTable = ({ recentUsers }) => {
  const [showProfileModal, setShowProfileModal] = useState(false);

  const data = recentUsers?.map((user, inx) => ({
    key: inx + 1,
    name: user?.name || "Moazzem Hossain",
    userImg: user?.photoUrl,
    email: user?.email,
    date: moment(user?.createdAt).format("ll"),
    status: user?.status,
  }));

  // =============== Table columns ===============
  const columns = [
    {
      title: "Name",
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
        const firstLetter = record?.email
          ? record?.email.charAt(0).toUpperCase()
          : "";

        // Determine if the image is valid
        const hasValidImage = isValidUrl(record?.userImg);

        return (
          <div className="flex-center-start gap-x-2">
            {hasValidImage ? (
              <Image
                src={record?.userImg || "/nouser.png"}
                alt="/nouser.png"
                width={40}
                height={40}
                className="aspect-square h-10 w-10 rounded-full border object-cover"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-[#cbf9f2] to-foundation-accent-400 text-lg font-medium text-white">
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
      title: "Status",
      dataIndex: "status",
      render: (value) => (
        <Tag color="green" className="!text-base font-semibold">
          {value}
        </Tag>
      ),
    },

    {
      title: "Date",
      dataIndex: "date",
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
      <div className="">
        <h1 className="text-xl font-semibold">Recent Users</h1>
        <p className="mb-5 text-sm text-gray-500">
          Here are the latest users who joined the platform.
        </p>
        <Table
          style={{ overflowX: "auto", width: "100%" }}
          columns={columns}
          dataSource={data}
          scroll={{ x: "100%" }}
          pagination={false}
        ></Table>
      </div>

      {/* Profile Modal */}
      <ProfileModal open={showProfileModal} setOpen={setShowProfileModal} />
    </ConfigProvider>
  );
};

export default RecentUserTable;
