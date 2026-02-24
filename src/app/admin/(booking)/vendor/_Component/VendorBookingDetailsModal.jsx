import { Calendar, Modal } from "antd";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  DollarSign,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import React from "react";
import moment from "moment";

export default function VendorBookingDetailsModal({
  open,
  setOpen,
  booking: data,
}) {
  const getStatusColor = (status) => {
    const s = status?.toLowerCase();
    if (s === "completed") return "bg-green-100 text-green-700";
    if (s === "pending") return "bg-yellow-100 text-yellow-700";
    if (s === "cancelled") return "bg-red-100 text-red-700";
    return "bg-blue-100 text-blue-700";
  };

  const getStatusIcon = (status) => {
    const s = status?.toLowerCase();
    if (s === "completed") return <CheckCircle2 size={16} />;
    if (s === "pending") return <Clock size={16} />;
    return <AlertCircle size={16} />;
  };

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount || 0);

  return (
    <Modal
      centered
      open={open}
      footer={null}
      onCancel={() => setOpen(false)}
      width={1000}
    >
      <div className="space-y-6 p-2">
        {/* Header */}
        <div className="rounded-xl border-b border-gray-200 bg-gradient-to-r from-blue-50 to-transparent p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-900">
                {data?.title || "N/A"}
              </h2>
              <p className="mt-2 text-base text-gray-600">
                {data?.shortDescription || "N/A"}
              </p>
            </div>

            {data?.status && (
              <div
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold shadow-sm ${getStatusColor(
                  data?.status,
                )}`}
              >
                {getStatusIcon(data?.status)}
                <span>{data?.status}</span>
              </div>
            )}
          </div>
        </div>

        {/* Event Details */}
        <section className="rounded-lg border border-gray-200 bg-white p-5">
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-700">
            📅 Event Details
          </h3>

          <div className="space-y-3">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex items-center gap-3 rounded-md bg-gray-50 p-3">
                <div>
                  <p className="text-xs text-gray-500">Start Date</p>
                  <p className="font-medium text-gray-900">
                    {moment(data?.startDate).format("ll") || "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-md bg-gray-50 p-3">
                <div>
                  <p className="text-xs text-gray-500">End Date</p>
                  <p className="font-medium text-gray-900">
                    {moment(data?.endDate).format("ll") || "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-md bg-gray-50 p-3">
                <Clock size={18} className="text-purple-600" />
                <div>
                  <p className="text-xs text-gray-500">Duration</p>
                  <p className="font-medium text-gray-900">
                    {data?.duration || "N/A"}
                  </p>
                </div>
              </div>

              <div className="rounded-md bg-gray-50 p-3">
                <p className="text-xs text-gray-500">Event Type</p>
                <p className="font-medium text-gray-900">
                  {data?.type || "N/A"}
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-md border border-gray-300 bg-gradient-to-r from-blue-50 to-purple-50 p-4">
              <p className="text-sm leading-relaxed text-gray-700">
                <span className="font-semibold text-gray-900">
                  Description:
                  <p
                    dangerouslySetInnerHTML={{
                      __html: data?.description || "",
                    }}
                  ></p>
                </span>{" "}
              </p>
            </div>
          </div>
        </section>

        {/* Participants */}
        <section className="rounded-lg border border-gray-200 bg-white p-5">
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-700">
            👥 Participants
          </h3>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              {
                id: data?.sender_id,
                name: data?.sender_name,
                photoUrl: data?.sender_photo,
                address: data?.sender_address,
                isKycVerified: data?.sender_kyc,
                label: "Sender",
              },
              {
                id: data?.receiver_id,
                name: data?.receiver_name,
                photoUrl: data?.receiver_photo,
                address: data?.receiver_address,
                isKycVerified: data?.receiver_kyc,
                label: "Receiver",
              },
            ]?.map((person, index) => (
              <div
                key={person?.id || index}
                className="rounded-lg border border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 p-4 transition-all hover:shadow-md"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    {person?.photoUrl ? (
                      <Image
                        src={person?.photoUrl}
                        alt={person?.name || "user"}
                        width={50}
                        height={50}
                        className="h-12 w-12 rounded-full object-cover ring-2 ring-blue-200"
                      />
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-blue-600 text-lg font-bold text-white">
                        {person?.name?.charAt(0) || "U"}
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                      {person?.label}
                    </p>

                    <p className="mt-1 text-base font-semibold text-gray-900">
                      {person?.name || "N/A"}
                    </p>

                    {person?.isKycVerified && (
                      <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
                        <CheckCircle2 size={13} />
                        KYC Verified
                      </span>
                    )}

                    <p className="mt-2 text-xs text-gray-600">
                      📍 {person?.address || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Financial Summary */}
        <section className="rounded-lg border border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-5">
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-blue-900">
            💰 Financial Summary
          </h3>

          <div className="mb-5 rounded-lg bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-700">
                Total Amount
              </span>
              <div className="flex items-center gap-2">
                <DollarSign size={20} className="text-blue-600" />
                <span className="text-2xl font-bold text-blue-600">
                  {formatCurrency(data?.totalAmount)}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-white p-3 shadow-sm">
              <p className="text-xs font-semibold text-gray-600">
                Initial Amount
              </p>
              <p className="mt-1 text-lg font-bold text-gray-900">
                {formatCurrency(data?.initialAmount)}
              </p>
            </div>

            <div className="rounded-lg bg-white p-3 shadow-sm">
              <p className="text-xs font-semibold text-gray-600">
                Final Amount
              </p>
              <p className="mt-1 text-lg font-bold text-gray-900">
                {formatCurrency(data?.finalAmount)}
              </p>
            </div>

            <div className="rounded-lg bg-orange-50 p-3 shadow-sm">
              <p className="text-xs font-semibold text-orange-700">
                Pending Amount
              </p>
              <p className="mt-1 text-lg font-bold text-orange-600">
                {formatCurrency(data?.pendingAmount)}
              </p>
            </div>

            <div className="rounded-lg bg-red-50 p-3 shadow-sm">
              <p className="text-xs font-semibold text-red-700">
                Refund Amount
              </p>
              <p className="mt-1 text-lg font-bold text-red-600">
                {formatCurrency(data?.refundAmount)}
              </p>
            </div>
          </div>
        </section>

        {/* Location */}
        <section className="rounded-lg border border-gray-200 bg-white p-5">
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-700">
            📍 Location
          </h3>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
                <MapPin size={24} className="text-red-600" />
              </div>
            </div>
            <div className="flex-1">
              <p className="text-base font-medium text-gray-900">
                {data?.address || "N/A"}
              </p>

              {data?.locationUrl && (
                <a
                  href={data?.locationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 rounded-lg bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-600 transition-all hover:bg-blue-100"
                >
                  View on Map →
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Extra Info */}
        <section className="rounded-lg border border-gray-200 bg-gray-50 p-5">
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-700">
            ℹ️ Additional Info
          </h3>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <div className="rounded-md bg-white p-3">
              <p className="text-xs font-semibold text-gray-600">Booking ID</p>
              <p className="mt-1 font-mono text-sm font-medium text-gray-900">
                {data?.id?.slice(0, 8) || "N/A"}...
              </p>
            </div>
            <div className="rounded-md bg-white p-3">
              <p className="text-xs font-semibold text-gray-600">Authority</p>
              <p className="mt-1 text-sm font-medium text-gray-900">
                {data?.authority || "N/A"}
              </p>
            </div>
            <div className="rounded-md bg-white p-3">
              <p className="text-xs font-semibold text-gray-600">Completed</p>
              <p
                className={`mt-1 text-sm font-bold ${data?.isCompleted ? "text-green-600" : "text-gray-600"}`}
              >
                {data?.isCompleted ? "✅ Yes" : "❌ No"}
              </p>
            </div>
            <div className="rounded-md bg-white p-3">
              <p className="text-xs font-semibold text-gray-600">Deleted</p>
              <p
                className={`mt-1 text-sm font-bold ${data?.isDeleted ? "text-red-600" : "text-green-600"}`}
              >
                {data?.isDeleted ? "🗑️ Yes" : "✅ No"}
              </p>
            </div>
          </div>
        </section>
      </div>
    </Modal>
  );
}
