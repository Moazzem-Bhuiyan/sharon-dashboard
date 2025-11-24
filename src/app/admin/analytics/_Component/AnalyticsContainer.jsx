import CustomCountUp from "@/components/CustomCountUp/CustomCountUp";
import React from "react";
import EarningOverviewChart from "./EarningAnalyticsChart";
import { BookingStatus } from "./BookingStatusChart";

function AnalyticsContainer() {
  const userStats = [
    {
      key: "users",
      title: "Active Users",
      count: 518,
    },
    {
      key: "planer",
      title: "Avg. Booking Value",
      count: 518,
    },
    {
      key: "vendors",
      title: "Conversion Rate",
      count: 118,
    },
    {
      key: "earning",
      title: "Total Payouts",
      count: 1500,
    },
  ];
  return (
    <div>
      {/* User Stats Section */}
      <section className="grid grid-cols-2 gap-5 md:grid-cols-3 2xl:grid-cols-4">
        {userStats?.map((stat) => (
          <div
            key={stat.key}
            className="gap-x-4 rounded-2xl bg-[#FFFFFF] p-5 text-black shadow-sm"
          >
            <div className="flex justify-between gap-4">
              <div>
                <p className="font-dmSans text-lg font-medium">{stat.title}</p>
                <h5 className="mt-0.5 text-3xl font-semibold text-black">
                  {stat.key !== "earning" ? (
                    <CustomCountUp end={stat.count} />
                  ) : (
                    <span>
                      $ <CustomCountUp end={stat.count} />
                    </span>
                  )}
                </h5>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* earning chart */}
      <EarningOverviewChart />

      {/* booking chart */}
      <div className="my-10 mt-20 w-full rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-semibold">Booking Status Overview</h1>
        <BookingStatus />
      </div>
    </div>
  );
}

export default AnalyticsContainer;
