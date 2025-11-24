import React from "react";
import AnalyticsContainer from "./_Component/AnalyticsContainer";

export const metadata = {
  title: "Analytics - Admin Dashboard",
  description: "Analytics overview in the admin dashboard",
};

function page() {
  return (
    <div>
      <AnalyticsContainer />
    </div>
  );
}

export default page;
