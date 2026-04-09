"use client";
import CustomCountUp from "@/components/CustomCountUp/CustomCountUp";
import React, { useState } from "react";
import EarningOverviewChart from "./EarningAnalyticsChart";
import { BookingStatus } from "./BookingStatusChart";
import { useGetAnalysisDataQuery } from "@/redux/api/dashboardApi";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import SkeletonCard from "@/components/SkeletonCard/SkeletonCard";

function AnalyticsContainer() {
  const [order_year, setOrderYear] = useState(null);
  const [subscription_year, setSubscriptionYear] = useState(null);
  const [booking_year, setBookingYear] = useState(null);

  // get /analysis/admin data from api
  const { data, isLoading } = useGetAnalysisDataQuery({
    order_year,
    subscription_year,
    booking_year,
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

  const userStats = [
    {
      key: "users",
      title: "Active Users",
      count: data?.data?.totalUserCount || 0,
    },
    {
      key: "avgBookingValue",
      title: "Avg. Booking Value",
      count: data?.data?.avgBookingValue || 0,
    },

    {
      key: "activeSubscriptionCount",
      title: "Active Subscriptions",
      count: data?.data?.activeSubscriptionCount || 0,
    },
    {
      key: "earning",
      title: "Total Earning",
      count: data?.data?.totalEarning || 0,
    },
  ];

  const handleSubscriptionYear = (year) => {
    setSubscriptionYear(year);
  };
  const handleOrderYear = (year) => {
    setOrderYear(year);
  };
  const handleBookingYear = (year) => {
    setBookingYear(year);
  };

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
      <EarningOverviewChart
        onSubscriptionYearChange={handleSubscriptionYear}
        onOrderYearChange={handleOrderYear}
        onBookingYearChange={handleBookingYear}
        data={data?.data?.earningOverview}
      />

      {/* booking chart */}
      <div className="my-10 mt-20 w-full rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-semibold">Booking Status Overview</h1>
        <BookingStatus data={data?.data?.bookingOverview} />
      </div>
    </div>
  );
}

export default AnalyticsContainer;
