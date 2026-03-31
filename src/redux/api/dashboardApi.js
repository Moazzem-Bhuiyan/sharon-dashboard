import { baseApi } from "./baseApi";

const dashBoardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardData: builder.query({
      query: ({ earningcurrentYear }) => ({
        url: `/meta/admin?year=${earningcurrentYear}`,
        method: "GET",
      }),
    }),

    // get /analysis/admin data
    getAnalysisData: builder.query({
      query: ({ order_year, subscription_year, booking_year }) => ({
        url: `/analysis/admin?order_year=${order_year}&subscription_year=${subscription_year}&booking_year=${booking_year}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetDashboardDataQuery, useGetAnalysisDataQuery } =
  dashBoardApi;
