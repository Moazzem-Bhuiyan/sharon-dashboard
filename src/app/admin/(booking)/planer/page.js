import React from "react";
import PlanerBookingTable from "./_Component/PlanerBookingTable";

export const metadata = {
  title: "Planer booking Management - Admin Dashboard",
  description: "Manage planers in the admin dashboard",
};

const page = () => {
  return (
    <div>
      <PlanerBookingTable />
    </div>
  );
};

export default page;
