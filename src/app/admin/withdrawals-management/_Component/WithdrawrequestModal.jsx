"use client";
import { useGetsingleWithdrawalRequestQuery } from "@/redux/api/financialApi";
import { Image, Modal, Spin } from "antd";
import React from "react";

export default function WithdrawrequestModal({ open, setOpen, data }) {
  const { data: withdrawalRequests, isLoading } =
    useGetsingleWithdrawalRequestQuery(data, {
      skip: !data,
    });

  const withdraw = withdrawalRequests?.data;

  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      width={900}
      centered
      footer={null}
    >
      {isLoading ? (
        <div className="flex justify-center py-20">
          <Spin />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Header */}
          <div className="border-b pb-4">
            <h2 className="text-xl font-bold text-gray-800">
              Withdraw Request Details
            </h2>
            <p className="text-sm text-gray-500">
              Review withdrawal information
            </p>
          </div>

          {/* Amount Highlight */}
          <div className="rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white shadow-lg">
            <p className="text-sm opacity-80">Withdraw Amount</p>
            <h1 className="text-4xl font-bold">${withdraw?.amount}</h1>

            <div className="mt-3 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-medium">
              Status: {withdraw?.status}
            </div>
          </div>

          {/* Grid Info */}
          <div className="grid grid-cols-2 gap-6">
            {/* User */}
            <div className="rounded-lg border p-4">
              <h3 className="mb-3 text-sm font-semibold text-gray-500">
                User Info
              </h3>

              <div className="flex items-center gap-3">
                <Image
                  src={withdraw?.user?.photoUrl}
                  alt="user"
                  className="h-12 w-12 rounded-full object-cover"
                />

                <div>
                  <p className="font-semibold text-gray-800">
                    {withdraw?.user?.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {withdraw?.user?.email}
                  </p>
                </div>
              </div>

              <p className="mt-3 text-sm text-gray-600">
                Balance: ${withdraw?.user?.balance}
              </p>
            </div>

            {/* Payment */}
            <div className="rounded-lg border p-4">
              <h3 className="mb-3 text-sm font-semibold text-gray-500">
                Payment Info
              </h3>

              <p className="text-sm">
                <span className="font-medium">Method:</span> {withdraw?.method}
              </p>

              <p className="text-sm">
                <span className="font-medium">Authority:</span>{" "}
                {withdraw?.authority}
              </p>

              <p className="text-sm">
                <span className="font-medium">Reference:</span>{" "}
                {withdraw?.reference}
              </p>
            </div>

            {/* Order */}
            <div className="col-span-2 rounded-lg border p-4">
              <h3 className="mb-3 text-sm font-semibold text-gray-500">
                Order Information
              </h3>

              <p className="font-semibold text-gray-800">
                {withdraw?.order?.title}
              </p>

              <p className="text-sm text-gray-500">
                {withdraw?.order?.address}
              </p>

              <div className="mt-3 flex gap-6 text-sm">
                <span>
                  Total: <b>${withdraw?.order?.totalAmount}</b>
                </span>

                <span>
                  Duration: <b>{withdraw?.order?.duration} days</b>
                </span>

                <span>
                  Status: <b>{withdraw?.order?.status}</b>
                </span>
              </div>
            </div>

            {/* Time */}
            <div className="col-span-2 rounded-lg border p-4">
              <h3 className="mb-3 text-sm font-semibold text-gray-500">
                Request Timeline
              </h3>

              <p className="text-sm">
                Created At: {new Date(withdraw?.createdAt).toLocaleString()}
              </p>

              <p className="text-sm">
                Proceed At: {new Date(withdraw?.proceedAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
