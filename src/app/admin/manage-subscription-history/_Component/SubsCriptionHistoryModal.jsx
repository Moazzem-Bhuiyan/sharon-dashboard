"use client";

import { Modal, Tag, Divider } from "antd";
import moment from "moment";

export default function SubsCriptionHistoryModal({
  open,
  setOpen,
  selectedRow,
}) {
  if (!selectedRow) return null;

  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      centered
      footer={null}
      width={700}
      title={
        <h2 className="text-xl font-semibold text-gray-800">
          Subscription Details
        </h2>
      }
    >
      <div className="space-y-6">
        {/* 🔹 User Info */}
        <div>
          <h3 className="mb-3 text-lg font-semibold text-gray-700">
            User Information
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <Info label="Name" value={selectedRow?.name} />
            <Info label="Email" value={selectedRow?.email} />
          </div>
        </div>

        <Divider />

        {/* 🔹 Plan Info */}
        <div>
          <h3 className="mb-3 text-lg font-semibold text-gray-700">
            Plan Information
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <Info label="Plan" value={selectedRow?.plan} />
            <Info label="Billing Cycle" value={selectedRow?.billingCycle} />
            <Info label="Type" value={selectedRow?.type} />
            <Info label="Amount" value={`$${selectedRow?.amount}`} />
            <Info
              label="Auto Renew"
              value={
                selectedRow?.autoRenew ? (
                  <Tag color="green">Enabled</Tag>
                ) : (
                  <Tag color="red">Disabled</Tag>
                )
              }
            />
          </div>
        </div>

        <Divider />

        {/* 🔹 Dates & Status */}
        <div>
          <h3 className="mb-3 text-lg font-semibold text-gray-700">Timeline</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <Info
              label="Purchase Date"
              value={moment(selectedRow?.purchaseDate).format("LLL")}
            />
            <Info
              label="Expiry Date"
              value={moment(selectedRow?.expiredAt).format("LLL")}
            />
            <Info
              label="Status"
              value={
                <Tag
                  color={
                    selectedRow?.status === "active"
                      ? "green"
                      : selectedRow?.status === "expired"
                        ? "red"
                        : "blue"
                  }
                >
                  {selectedRow?.status}
                </Tag>
              }
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}

// 🔹 Reusable Info Component
const Info = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="text-xs text-gray-500">{label}</span>
    <span className="font-medium text-gray-800">{value || "N/A"}</span>
  </div>
);
