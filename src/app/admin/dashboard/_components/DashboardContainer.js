"use client";
import RecentUserTable from "./RecentUserTable";
import CustomCountUp from "@/components/CustomCountUp/CustomCountUp";
import EarningSummary from "./Earnings";
import UserStatistics from "./UserStatics";
import { useGetDashboardDataQuery } from "@/redux/api/dashboardApi";
import { useState } from "react";
import SkeletonCard from "@/components/SkeletonCard/SkeletonCard";

export default function DashboardContainer() {
  const [earningcurrentYear, setearnigCurrentYear] = useState(null);
  // get admin dashboard data from api
  const { data, isLoading } = useGetDashboardDataQuery({
    earningcurrentYear,
  });

  if (isLoading) {
    return (
      <div div className="space-y-20">
        <div className="flex gap-10">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>

        <div className="justyfy-between flex gap-10">
          <SkeletonCard width={600} rows={10} />
          <SkeletonCard width={600} rows={10} />
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
