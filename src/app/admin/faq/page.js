import React from "react";
import FaqContainer from "./_Component/FaqContainer";
export const metadata = {
  title: "FAQ - Admin Dashboard",
  description: "FAQ overview in the admin dashboard",
};
const page = () => {
  return (
    <div>
      <FaqContainer />
    </div>
  );
};

export default page;
