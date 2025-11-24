import React from "react";
import FeedbackTable from "./FeedbackTable";

export const metadata = {
  title: "Feedbacks - Admin",
  description: "Feedbacks page for Admin",
};

export default function page() {
  return (
    <div>
      <h1>Feedbacks</h1>
      <FeedbackTable />
    </div>
  );
}
