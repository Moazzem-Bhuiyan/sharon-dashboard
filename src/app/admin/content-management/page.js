import React from "react";
import ContentManagementContainer from "./_Component/ContentManagementContainer";
export const metadata = {
  title: "Content Management - Admin Dashboard",
  description: "Content Management overview in the admin dashboard",
};
const page = () => {
  return (
    <div>
      <div className="my-4 space-y-5 rounded-2xl border p-5">
        <h1 className="text-xl font-bold">Content & Category Management</h1>
        <p>Manage service categories, approve listings, and create content.</p>
      </div>
      <ContentManagementContainer />
    </div>
  );
};
export default page;
