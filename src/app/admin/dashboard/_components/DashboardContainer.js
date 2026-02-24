"use client";
import RecentUserTable from "./RecentUserTable";
import CustomCountUp from "@/components/CustomCountUp/CustomCountUp";
import EarningSummary from "./Earnings";
import UserStatistics from "./UserStatics";
import { useGetDashboardDataQuery } from "@/redux/api/dashboardApi";
import { useState } from "react";

export default function DashboardContainer() {
  const [earningcurrentYear, setearnigCurrentYear] = useState(null);
  // get admin dashboard data from api
  const { data, isLoading } = useGetDashboardDataQuery({
    earningcurrentYear,
  });

  if (isLoading) {
    return (
      <div className="h-[calc(100vh-124px)]">
        <div className="h-[calc(100vh-124px)] p-6">
          <div className="max-w-9xl mx-auto">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="animate-pulse rounded-lg bg-white shadow-md"
                >
                  <div className="p-0">
                    <div className="h-48 rounded-t-lg bg-gray-200"></div>
                  </div>
                  <div className="p-4">
                    <div className="mb-2 h-4 rounded bg-gray-200"></div>
                    <div className="mb-4 h-3 rounded bg-gray-200"></div>
                    <div className="flex gap-2">
                      <div className="h-9 flex-1 rounded bg-gray-200"></div>
                      <div className="h-9 flex-1 rounded bg-gray-200"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  // Dummy Data
  const userStats = [
    {
      key: "users",
      title: "Total Customers",
      count: data?.data?.totalUserCount || 0,
    },
    {
      key: "planer",
      title: "Total Planers",
      count: data?.data?.totalPlanerCount || 0,
    },
    {
      key: "vendors",
      title: "Total vendors",
      count: data?.data?.totalVendorCount || 0,
    },
    {
      key: "earning",
      title: "Total Subscription Earning",
      count: data?.data?.subscriptionEarnings || 0,
    },
  ];

  const handleUserYearChange = (year) => {
    setearnigCurrentYear(year);
  };
  return (
    <div className="space-y-20">
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

      {/* Charts */}
      <section className="flex-center-between flex-col gap-10 xl:flex-row">
        <UserStatistics
          userOverview={data?.data?.userOverview}
          onYearChange={handleUserYearChange}
        />
        <EarningSummary revenueByCategory={data?.data?.revenueByCategory} />
      </section>

      {/* Recent Users Table */}
      <section className="flex-center-between flex-col gap-10 xl:flex-row">
        <div className="w-full xl:w-full">
          <RecentUserTable recentUsers={data?.data?.recentUsers} />
        </div>
        {/* <TopPerformingVendors /> */}
      </section>
    </div>
  );
}
