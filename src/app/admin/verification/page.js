import React from "react";
import VerificationTable from "./_Component/VerificationTable";

export const metadata = {
  title: "Verification - Admin Dashboard",
  description: "Verification overview in the admin dashboard",
};

function page() {
  return (
    <div>
      <div className="my-4 space-y-5 rounded-2xl border p-5">
        <h1 className="text-lg font-bold">Vendor & Planner Verification</h1>
        <p>
          Approve or reject vendor KYC applications to maintain platform
          integrity.
        </p>
      </div>

      <VerificationTable />
    </div>
  );
}

export default page;
