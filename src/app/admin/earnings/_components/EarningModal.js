"use client";

import { Divider, Modal, Tag } from "antd";
import {
  User,
  Mail,
  Calendar,
  CreditCard,
  DollarSign,
  Hash,
} from "lucide-react";

export default function EarningModal({ open, setOpen, earning }) {
  const statusColorMap = {
    completed: "green",
    pending: "gold",
    failed: "red",
    processing: "blue",
  };

  return (
    <Modal
      centered
      open={open}
      footer={null}
      onCancel={() => setOpen(false)}
      width={900}
      className="rounded-2xl"
    >
      <div className="space-y-6 p-2">
        {/* 🔹 Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">Payment Details</h2>

          <Tag
            color={statusColorMap[earning?.status?.toLowerCase()] || "default"}
          >
            {earning?.status || "N/A"}
          </Tag>
        </div>

        <Divider className="my-2" />

        {/* 🔹 User Info */}
        <div className="rounded-xl bg-gray-50 p-4 shadow-sm">
          <h3 className="mb-3 text-sm font-semibold uppercase text-gray-500">
            User Information
          </h3>

          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <User size={16} className="text-gray-500" />
              <span className="font-medium">{earning?.name || "N/A"}</span>
            </div>

            <div className="flex items-center gap-2">
              <Mail size={16} className="text-gray-500" />
              <span>{earning?.email || "N/A"}</span>
            </div>

            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-gray-500" />
              <span>{earning?.purchaseDate || "N/A"}</span>
            </div>
          </div>
        </div>

        {/* 🔹 Payment Info */}
        <div className="rounded-xl bg-blue-50 p-4 shadow-sm">
          <h3 className="mb-3 text-sm font-semibold uppercase text-blue-600">
            Payment Information
          </h3>

          <div className="grid grid-cols-1 gap-3 text-sm md:grid-cols-2">
            <div className="flex items-center gap-2">
              <DollarSign size={16} className="text-blue-500" />
              <span className="font-semibold text-blue-700">
                ${earning?.amount || 0}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <CreditCard size={16} className="text-blue-500" />
              <span> Model Type : {earning?.modelType || "N/A"}</span>
            </div>

            <div className="flex items-center gap-2">
              <Hash size={16} className="text-gray-500" />
              <span className="truncate">
                Transaction ID : {earning?.transactionId || "N/A"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Hash size={16} className="text-gray-500" />
              <span className="truncate">
                Payment Intent ID : {earning?.paymentIntentId || "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
