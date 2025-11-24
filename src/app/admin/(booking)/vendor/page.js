import React from "react";
import VendorBookingTable from "./_Component/VendorBookingTable";

export const metadata = {
  title: "Vendor booking Management - Admin Dashboard",
  description: "Manage vendors in the admin dashboard",
};

const page = () => {
  return (
    <div>
      <VendorBookingTable />
    </div>
  );
};

export default page;
