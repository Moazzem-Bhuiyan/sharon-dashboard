"use client";

import { Modal, Tag } from "antd";
import Image from "next/image";

export default function ProfileModal({ open, setOpen, selectedUser: user }) {
  const isValidUrl = (url) => {
    if (!url) return false;
    return (
      url.startsWith("http://") ||
      url.startsWith("https://") ||
      url.startsWith("/")
    );
  };

  const imageSrc = isValidUrl(user?.userImg);

  return (
    <Modal
      centered
      open={open}
      footer={null}
      onCancel={() => setOpen(false)}
      width={850}
      className="profile-modal"
    >
      <div className="overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* 🔥 HEADER SECTION */}
        <div className="relative flex flex-col items-center bg-gradient-to-r from-[#E36B4E] to-[#ff9a7a] py-10">
          {imageSrc ? (
            <Image
              src={user?.userImg}
              alt="user"
              height={300}
              width={300}
              className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-lg"
            />
          ) : (
            <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-white bg-white text-5xl font-bold text-[#E36B4E] shadow-lg">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          )}

          <h3 className="mt-4 text-2xl font-bold text-white">{user?.name}</h3>

          <p className="text-white/80">{user?.email}</p>
        </div>

        {/* 🔥 BODY SECTION */}
        <div className="grid grid-cols-1 gap-6 px-10 py-8 md:grid-cols-2">
          <InfoItem label="Status">
            <Tag
              color="processing"
              className="!rounded-full !px-4 !py-1 !text-sm !font-semibold"
            >
              {user?.status}
            </Tag>
          </InfoItem>

          <InfoItem label="Role">
            <Tag
              color="purple"
              className="!rounded-full !px-4 !py-1 !text-sm !font-semibold"
            >
              {user?.role}
            </Tag>
          </InfoItem>
        </div>
        <div className="p-10">
          <InfoItem label="Address">
            <Tag
              color="purple"
              className="w-full !rounded-full !px-4 !py-1 !text-sm !font-semibold"
            >
              {user?.address}
            </Tag>
          </InfoItem>
        </div>
        {/* 🔥 CATEGORY SECTION */}
        {(user?.role === "planer" || user?.role === "vendor") && (
          <div className="border-t px-10 pb-10 pt-6">
            <h5 className="mb-3 text-lg font-semibold text-gray-800">
              Categories
            </h5>

            <div className="flex flex-wrap gap-3">
              {user?.categories?.length ? (
                user.categories.map((category, index) => (
                  <Tag
                    key={index}
                    className="!rounded-full !bg-gray-100 !px-4 !py-1 !text-sm !font-medium !text-gray-700 transition-all duration-300 hover:!bg-[#E36B4E] hover:!text-white"
                  >
                    {category}
                  </Tag>
                ))
              ) : (
                <span className="text-gray-500">N/A</span>
              )}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}

/* 🔥 Reusable Info Item */
function InfoItem({ label, children }) {
  return (
    <div className="rounded-xl bg-gray-50 p-4 shadow-sm">
      <p className="mb-2 text-sm font-medium text-gray-500">{label}</p>
      {children}
    </div>
  );
}
