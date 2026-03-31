"use client";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export function BookingStatus({ data: pieData }) {
  const chartData = {
    labels: ["Pending", "Running", "Cancelled", "Completed", "Denied"],
    datasets: [
      {
        label: "# of Booking Status",
        data: [
          pieData?.pending || 0,
          pieData?.running || 0,
          pieData?.cancelled || 0,
          pieData?.completed || 0,
          pieData?.denied || 0,
        ],
        backgroundColor: [
          "rgba(54, 162, 235, 0.2)", // Pending
          "rgba(75, 192, 192, 0.2)", // Running
          "rgba(255, 99, 132, 0.2)", // Cancelled
          "rgba(153, 102, 255, 0.2)", // Completed
          "rgba(255, 159, 64, 0.2)", // Denied
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="mx-auto w-1/4">
      <Pie data={chartData} />
    </div>
  );
}
