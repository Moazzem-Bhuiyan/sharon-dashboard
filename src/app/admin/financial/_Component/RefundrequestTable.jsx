"use client";

import { Input, Table, Select, Modal, message } from "antd";
import { Eye, Search } from "lucide-react";
import React, { useState } from "react";
import RefundDetailsModal from "./RefundDetailsModal";
import {
  useGetRefundRequestsQuery,
  useUpdateRefundRequestMutation,
} from "@/redux/api/financialApi";
import toast from "react-hot-toast";

const STATUS_FLOW = {
  pending: ["underReview"],
  underReview: ["confirmed", "rejected"],
  confirmed: [],
  rejected: [],
};

const STATUS_STYLES = {
  pending: "bg-amber-100 text-amber-700 ring-amber-200",
  underReview: "bg-blue-100 text-blue-700 ring-blue-200",
  confirmed: "bg-emerald-100 text-emerald-700 ring-emerald-200",
  rejected: "bg-red-100 text-red-700 ring-red-200",
};

const STATUS_LABELS = {
  pending: "Pending",
  underReview: "Under Review",
  confirmed: "Confirmed",
  rejected: "Rejected",
};

const StatusBadge = ({ status }) => (
  <span
    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${
      STATUS_STYLES[status] || "bg-gray-100 text-gray-600 ring-gray-200"
    }`}
  >
    <span
      className={`h-1.5 w-1.5 rounded-full ${
        status === "pending"
          ? "bg-amber-500"
          : status === "underReview"
            ? "bg-blue-500"
            : status === "confirmed"
              ? "bg-emerald-500"
              : "bg-red-500"
      }`}
    />
    {STATUS_LABELS[status] || status}
  </span>
);

export default function RefundRequestTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [refundId, setRefundId] = useState(null);

  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectNote, setRejectNote] = useState("");
  const [pendingRejectId, setPendingRejectId] = useState(null);
  const [rejectLoading, setRejectLoading] = useState(false);

  const { data: refund, isLoading } = useGetRefundRequestsQuery({
    page: currentPage,
    limit: 10,
    searchText,
  });

  const [updateRefundStatus] = useUpdateRefundRequestMutation();

  // status update
  const handleChangeStatus = async (id, newStatus, note = "") => {
    try {
      const res = await updateRefundStatus({
        id,
        data: { status: newStatus, reason: note },
      }).unwrap();

      if (res?.success) {
        toast.success(`Status updated to "${STATUS_LABELS[newStatus]}"`);
      }
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  // dropdown change
  const handleSelectChange = (newStatus, record) => {
    if (newStatus === "rejected") {
      setPendingRejectId(record.id);
      setShowRejectModal(true);
      return;
    }

    handleChangeStatus(record.id, newStatus);
  };

  // reject confirm
  const handleConfirmReject = async () => {
    if (!rejectNote.trim()) {
      message.warning("Please provide a rejection reason.");
      return;
    }

    setRejectLoading(true);

    await handleChangeStatus(pendingRejectId, "rejected", rejectNote);

    setRejectLoading(false);
    setShowRejectModal(false);
    setRejectNote("");
    setPendingRejectId(null);
  };

  const data =
    refund?.data?.map((item, index) => ({
      key: item._id,
      id: item._id,
      user_name: item.user?.name,
      order_title: item?.order?.title,
      status: item.status,
      serial: index + 1,
    })) || [];

  const columns = [
    {
      title: "#",
      dataIndex: "serial",
      width: 60,
      render: (v) => (
        <span className="font-mono text-xs text-gray-400">#{v}</span>
      ),
    },
    {
      title: "User Name",
      dataIndex: "user_name",
      render: (v) => (
        <span className="text-sm font-medium text-gray-700">{v}</span>
      ),
    },
    {
      title: "Order Title",
      dataIndex: "order_title",
      render: (v) => <span className="text-sm text-gray-600">{v}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (v) => <StatusBadge status={v} />,
    },
    {
      title: "Change Status",
      dataIndex: "status",
      render: (status, record) => {
        const nextOptions = STATUS_FLOW[status] || [];

        if (nextOptions.length === 0) {
          return (
            <span className="text-xs italic text-gray-400">
              No actions available
            </span>
          );
        }

        return (
          <Select
            placeholder="Change status"
            size="small"
            className="w-36"
            onChange={(val) => handleSelectChange(val, record)}
            options={nextOptions.map((s) => ({
              value: s,
              label: (
                <span
                  className={`text-xs font-semibold ${
                    s === "rejected"
                      ? "text-red-600"
                      : s === "confirmed"
                        ? "text-emerald-600"
                        : "text-blue-600"
                  }`}
                >
                  {STATUS_LABELS[s]}
                </span>
              ),
            }))}
          />
        );
      },
    },
    {
      title: "Action",
      width: 90,
      render: (_, record) => (
        <button
          onClick={() => {
            setShowDetailsModal(true);
            setRefundId(record.id);
          }}
          className="flex items-center gap-1.5 rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 transition hover:bg-indigo-50 hover:text-indigo-600"
        >
          <Eye size={14} />
          View
        </button>
      ),
    },
  ];

  return (
    <div>
      {/* Search */}
      <div className="mb-5 flex justify-end">
        <Input
          placeholder="Search by name..."
          prefix={<Search size={16} className="text-gray-400" />}
          className="h-10 w-72 rounded-lg border text-sm"
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      {/* Table */}
      <Table
        columns={columns}
        dataSource={data}
        loading={isLoading}
        pagination={{
          current: currentPage,
          pageSize: 10,
          total: refund?.meta?.total,
          onChange: (page) => setCurrentPage(page),
          showTotal: (total) => `Total ${total} items`,
        }}
      />

      {/* Details Modal */}
      <RefundDetailsModal
        open={showDetailsModal}
        setOpen={setShowDetailsModal}
        id={refundId}
      />

      {/* Reject Modal */}
      <Modal
        open={showRejectModal}
        onCancel={() => {
          setShowRejectModal(false);
          setRejectNote("");
        }}
        footer={null}
        width={460}
        centered
        styles={{
          content: { borderRadius: 16, padding: 0, overflow: "hidden" },
        }}
        title={null}
      >
        <div className="border-b border-red-100 bg-red-50 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
              ⚠️
            </div>
            <div>
              <h3 className="text-base font-bold text-red-700">
                Reject Refund Request
              </h3>
              <p className="text-xs text-red-500">
                This action cannot be undone
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-gray-500">
            Reason for Rejection *
          </label>

          <textarea
            rows={4}
            value={rejectNote}
            onChange={(e) => setRejectNote(e.target.value)}
            placeholder="Explain why this refund request is rejected..."
            className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100"
          />

          <div className="mt-5 flex gap-3">
            <button
              onClick={() => {
                setShowRejectModal(false);
                setRejectNote("");
              }}
              className="flex-1 rounded-xl border border-gray-200 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              onClick={handleConfirmReject}
              disabled={rejectLoading || !rejectNote.trim()}
              className="flex-1 rounded-xl bg-red-600 py-2.5 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
            >
              {rejectLoading ? "Rejecting..." : "Confirm Reject"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
