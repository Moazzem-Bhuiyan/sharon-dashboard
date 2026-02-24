"use client";

import { Button, Image, Modal, Tag, Divider } from "antd";
import { User, MapPin, CreditCard, ShieldCheck, Calendar } from "lucide-react";

export default function KycVerificationModal({ open, setOpen, user }) {
  const statusColorMap = {
    pending: "gold",
    approved: "green",
    rejected: "red",
  };

  return (
    <Modal
      centered
      open={open}
      footer={null}
      onCancel={() => setOpen(false)}
      width={900}
    >
      <div className="space-y-6 p-2">
        {/* 🔷 Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              KYC Verification Details
            </h2>
            <p className="text-sm text-gray-500">
              Submitted on {user?.createAt || "N/A"}
            </p>
          </div>

          <Tag color={statusColorMap[user?.status?.toLowerCase()] || "default"}>
            {user?.status?.toUpperCase() || "N/A"}
          </Tag>
        </div>
        <Divider />
        {/* 🔷 Personal Information */}
        <div className="rounded-2xl bg-gray-50 p-5 shadow-sm">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-700">
            <User size={18} /> Personal Information
          </h3>

          <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-3">
            <div>
              <p className="text-gray-500">Full Name</p>
              <p className="font-medium">{user?.name || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-500">Date of Birth</p>
              <p className="font-medium">{user?.dob || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-500">Gender</p>
              <p className="font-medium">{user?.gender || "N/A"}</p>
            </div>
          </div>
        </div>
        {/* 🔷 Address Information */}
        <div className="rounded-2xl bg-blue-50 p-5 shadow-sm">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-blue-700">
            <MapPin size={18} /> Address Information
          </h3>

          <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
            <div>
              <p className="text-gray-500">Current Address</p>
              <p className="font-medium">{user?.currentAddress || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-500">Permanent Address</p>
              <p className="font-medium">{user?.permanentAddress || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-500">City</p>
              <p className="font-medium">{user?.city || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-500">Postal Code</p>
              <p className="font-medium">{user?.postalCode || "N/A"}</p>
            </div>
          </div>
        </div>
        {/* 🔷 Identity Verification */}
        <div className="rounded-2xl bg-gray-50 p-5 shadow-sm">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-700">
            <ShieldCheck size={18} /> Identity Verification
          </h3>

          <div className="mb-4 grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
            <div>
              <p className="text-gray-500">ID Type</p>
              <p className="font-medium">{user?.idType || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-500">ID Number</p>
              <p className="font-medium">{user?.idNumber || "N/A"}</p>
            </div>
          </div>

          {/* 🔹 ID Images */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <p className="mb-2 text-sm font-medium text-gray-600">
                Front Side
              </p>
              <Image
                src={user?.frontSide}
                alt="Front ID"
                className="rounded-xl border"
              />
            </div>

            <div>
              <p className="mb-2 text-sm font-medium text-gray-600">
                Back Side
              </p>
              <Image
                src={user?.backSide}
                alt="Back ID"
                className="rounded-xl border"
              />
            </div>
          </div>
        </div>
        {/* 🔷 Bank Information */}
        <div className="rounded-2xl bg-blue-50 p-5 shadow-sm">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-blue-700">
            <CreditCard size={18} /> Bank Information
          </h3>

          <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-3">
            <div>
              <p className="text-gray-500">Bank Name</p>
              <p className="font-medium">{user?.bankName || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-500">Account Number</p>
              <p className="font-medium">{user?.accountNumber || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-500">TIN / NID</p>
              <p className="font-medium">{user?.tinOrNid || "N/A"}</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
