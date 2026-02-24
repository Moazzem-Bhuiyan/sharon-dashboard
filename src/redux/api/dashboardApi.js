import { baseApi } from "./baseApi";

const dashBoardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardData: builder.query({
      query: ({ earningcurrentYear }) => ({
        url: `/meta/admin?year=${earningcurrentYear}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetDashboardDataQuery } = dashBoardApi;
