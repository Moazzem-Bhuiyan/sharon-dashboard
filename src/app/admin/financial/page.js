import React from "react";
import FinancialContainer from "./_Component/FinancialContainer";

export const metadata = {
  title: "Financial - Admin Dashboard",
  description: "Financial overview in the admin dashboard",
};

const page = () => {
  return (
    <div>
      <FinancialContainer />
    </div>
  );
};

export default page;
