"use client";
import CustomCountUp from "@/components/CustomCountUp/CustomCountUp";
import { Tabs } from "antd";
import React, { useState } from "react";
import EarningsTable from "../../earnings/_components/EarningsTable";
import WithdrawalRequestTables from "../../withdrawals-management/_Component/WithdrawalRequestTable";
import { useGetTransactionsDataQuery } from "@/redux/api/financialApi";

const { TabPane } = Tabs;

function FinancialContainer() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  // get transaction data from api and calculate total revenue, commissions, and pending payouts
  const {
    data: transactions,
    isLoading,
    isError,
  } = useGetTransactionsDataQuery({
    page: currentPage,
    limit: 10,
    searchText: searchText,
  });
  console.log("🚀 ~ FinancialContainer ~ transactions:", transactions);

  const userStats = [
    {
      key: "earning",
      title: "Total Revenue",
      count: transactions?.data?.totalRevenue || 0,
    },
    {
      key: "earning",
      title: "Commissions (3%)",
      count: transactions?.data?.commission || 0,
    },
    {
      key: "earning",
      title: "Pending Payouts",
      count: transactions?.data?.pendingPayout || 0,
    },
  ];
  return (
    <div>
      {/* User Stats Section */}
      <div className="border-border rounded-xl border bg-white p-5 shadow-2xl shadow-emerald-50">
        <div className="mb-5 space-y-3">
          {" "}
          <h1 className="text-xl font-semibold">
            Admin User Super Admin Financial Management
          </h1>
          <p className="text-gray-700">
            Review revenue, track commissions, and manage payouts.
          </p>
        </div>
        <section className="grid grid-cols-2 gap-5 md:grid-cols-3 2xl:grid-cols-4">
          {userStats?.map((stat) => (
            <div
              key={stat.key}
              className="gap-x-4 rounded-2xl bg-[#FFFFFF] p-5 text-black shadow-2xl"
            >
              <div className="flex justify-between gap-4">
                <div>
                  <p className="font-dmSans text-lg font-medium">
                    {stat.title}
                  </p>
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
      </div>

      {/* transactions and withdrawals tabs */}

      <div className="mt-10">
        <Tabs>
          <TabPane tab="Transactions" key="1">
            <EarningsTable
              transactions={transactions?.data?.paymentList}
              setSearchText={setSearchText}
              setCurrentPage={setCurrentPage}
              isLoading={isLoading}
              currentPage={currentPage}
            />
          </TabPane>
          <TabPane tab="Withdrawals" key="2">
            <WithdrawalRequestTables />
          </TabPane>
          <TabPane tab="Refunds" key="3">
            <p className="text-gray-500">Refund management coming soon...</p>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default FinancialContainer;
