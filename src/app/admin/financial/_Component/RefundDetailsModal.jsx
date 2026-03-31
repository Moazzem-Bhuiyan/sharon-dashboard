"use client";

import { useGetsingleRefundRequestQuery } from "@/redux/api/financialApi";
import { Image, Modal, Spin } from "antd";

export default function RefundDetailsModal({ open, setOpen, id }) {
  const { data: refund, isLoading } = useGetsingleRefundRequestQuery(id, {
    skip: !id,
  });

  const r = refund?.data;
  const o = r?.order;

  const statusStyles = {
    pending: {
      badge: "bg-amber-100 text-amber-600 ring-1 ring-amber-200",
      dot: "bg-amber-400",
    },
    approved: {
      badge: "bg-emerald-100 text-emerald-600 ring-1 ring-emerald-200",
      dot: "bg-emerald-400",
    },
    rejected: {
      badge: "bg-red-100 text-red-600 ring-1 ring-red-200",
      dot: "bg-red-400",
    },
    cancelled: {
      badge: "bg-gray-100 text-red-500 ring-1 ring-gray-200",
      dot: "bg-gray-400",
    },
    completed: {
      badge: "bg-blue-100 text-blue-600 ring-1 ring-blue-200",
      dot: "bg-blue-400",
    },
  };

  const fmt = (n) => (n ? `$ ${Number(n).toLocaleString()}` : "$ 0");
  const fmtDate = (d) =>
    d
      ? new Date(d).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "—";

  const StatusBadge = ({ status }) => {
    const s = statusStyles[status] || statusStyles.cancelled;
    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${s.badge}`}
      >
        <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
        {status}
      </span>
    );
  };

  const PersonCard = ({ person, role }) => (
    <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3 ring-1 ring-gray-100">
      <div className="relative">
        <Image
          width={44}
          height={44}
          src={person?.photoUrl || "/avatar.png"}
          alt={person?.name || role}
          className="h-11 w-11 rounded-full object-cover shadow ring-2 ring-white"
        />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate text-sm font-semibold text-gray-900">
            {person?.name}
          </p>
          <span className="shrink-0 rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-indigo-500">
            {role}
          </span>
        </div>
        <p className="truncate text-xs text-gray-500">{person?.email}</p>
        <p className="text-[11px] text-gray-400">{person?.contractNumber}</p>
      </div>
    </div>
  );

  const InfoRow = ({ label, value }) => (
    <div className="flex items-center justify-between border-b border-gray-50 py-2 last:border-0">
      <span className="text-xs text-gray-400">{label}</span>
      <span className="text-xs font-medium text-gray-800">{value}</span>
    </div>
  );

  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      title={null}
      footer={null}
      width={980}
      style={{ top: 16 }}
      centered
    >
      {isLoading ? (
        <div className="flex justify-center py-16">
          <Spin size="large" />
        </div>
      ) : (
        r && (
          <div className="font-sans text-gray-800">
            {/* ── Hero Banner ── */}
            <div className="relative overflow-hidden bg-gradient-to-br from-indigo-700 via-indigo-600 to-violet-600 px-7 pb-6 pt-7">
              {/* decorative circles */}
              <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/5" />
              <div className="absolute bottom-0 left-1/2 h-24 w-24 rounded-full bg-white/5" />

              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-indigo-300">
                    Refund Request
                  </p>
                  <h2 className="text-xl font-bold leading-tight text-white">
                    {o?.title || "Order"}
                  </h2>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <StatusBadge status={r.status} />
                    <span className="font-mono text-[11px] text-indigo-300">
                      #{r._id?.slice(-10)}
                    </span>
                  </div>
                </div>
                <div className="shrink-0 rounded-2xl bg-white/10 px-5 py-4 text-right ring-1 ring-white/20 backdrop-blur-sm">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-indigo-300">
                    Refund Amount
                  </p>
                  <p className="mt-1 text-3xl font-extrabold tracking-tight text-white">
                    {fmt(r.amount)}
                  </p>
                  <p className="mt-0.5 text-[11px] text-indigo-300">
                    of {fmt(o?.totalAmount)} total
                  </p>
                </div>
              </div>

              {/* progress bar */}
              <div className="relative mt-5">
                <div className="mb-1.5 flex justify-between text-[11px] text-indigo-300">
                  <span>Payment Progress</span>
                  <span className="font-bold text-white">
                    {Math.round(
                      ((o?.initialAmount || 0) / (o?.totalAmount || 1)) * 100,
                    )}
                    % paid
                  </span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-white/20">
                  <div
                    className="h-1.5 rounded-full bg-white transition-all duration-700"
                    style={{
                      width: `${Math.round(((o?.initialAmount || 0) / (o?.totalAmount || 1)) * 100)}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* ── Body ── */}
            <div className="max-h-[62vh] space-y-4 overflow-y-auto bg-gray-50/60 p-6">
              {/* Reason */}
              <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
                <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-gray-400">
                  Reason for Refund
                </p>
                <div className="rounded-xl border-l-4 border-amber-400 bg-amber-50 px-4 py-3">
                  <p className="text-sm font-medium text-gray-800">
                    {r.reason}
                  </p>
                  {r.note && (
                    <p className="mt-1 text-xs text-gray-500">{r.note}</p>
                  )}
                </div>
              </div>

              {/* People */}
              <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
                <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-gray-400">
                  Parties Involved
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <PersonCard person={r.user} role="Requester" />
                  <PersonCard person={o?.sender} role="Sender" />
                </div>
              </div>

              {/* Order + Payment – side by side */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
                  <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-gray-400">
                    Order Details
                  </p>
                  <InfoRow label="Type" value={o?.type} />
                  <InfoRow
                    label="Status"
                    value={<StatusBadge status={o?.status} />}
                  />
                  <InfoRow label="Start" value={fmtDate(o?.startDate)} />
                  <InfoRow label="End" value={fmtDate(o?.endDate)} />
                  <InfoRow
                    label="Duration"
                    value={`${o?.duration || 0} days`}
                  />
                  <InfoRow label="Authority" value={o?.authority} />
                </div>

                <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
                  <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-gray-400">
                    Payment Details
                  </p>
                  <InfoRow label="Total" value={fmt(o?.totalAmount)} />
                  <InfoRow label="Initial" value={fmt(o?.initialAmount)} />
                  <InfoRow label="Pending" value={fmt(o?.pendingAmount)} />
                  <InfoRow
                    label="Refund"
                    value={
                      <span className="font-bold text-red-500">
                        {fmt(r.amount)}
                      </span>
                    }
                  />
                  <InfoRow
                    label="Pay Status"
                    value={<StatusBadge status={o?.initialPayment?.status} />}
                  />
                  <InfoRow
                    label="Paid At"
                    value={fmtDate(o?.initialPayment?.paidAt)}
                  />
                </div>
              </div>

              {/* Transaction ID */}
              {o?.initialPayment?.transactionId && (
                <div className="flex items-center justify-between rounded-2xl bg-white px-5 py-4 shadow-sm ring-1 ring-gray-100">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
                      Transaction ID
                    </p>
                    <p className="mt-0.5 font-mono text-sm font-semibold text-gray-800">
                      {o.initialPayment.transactionId}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
                      Payment Intent
                    </p>
                    <p className="mt-0.5 font-mono text-sm font-semibold text-gray-800">
                      {r.paymentIntentId}
                    </p>
                  </div>
                </div>
              )}

              {/* Address + Timestamps */}
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
                  <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-gray-400">
                    Address
                  </p>
                  <p className="text-xs leading-relaxed text-gray-600">
                    {o?.address}
                  </p>
                  {o?.locationUrl && (
                    <a
                      href={o.locationUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                    >
                      View on Maps →
                    </a>
                  )}
                </div>
                <div className="space-y-3 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
                      Requested
                    </p>
                    <p className="mt-0.5 text-xs font-medium text-gray-700">
                      {fmtDate(r.createdAt)}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
                      Updated
                    </p>
                    <p className="mt-0.5 text-xs font-medium text-gray-700">
                      {fmtDate(r.updatedAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </Modal>
  );
}
