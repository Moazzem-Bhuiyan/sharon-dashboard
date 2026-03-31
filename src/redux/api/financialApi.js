const { baseApi } = require("./baseApi");

const FinancialApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTransactionsData: builder.query({
      query: ({ page, limit, searchText }) => ({
        url: `/payments?page=${page}&limit=${limit}&searchTerm=${searchText}`,
        method: "GET",
      }),
    }),
    getWithdrawalRequests: builder.query({
      query: ({ page, limit, searchText }) => ({
        url: `/withdraw?page=${page}&limit=${limit}&searchTerm=${searchText}`,
        method: "GET",
      }),
      providesTags: ["withdrawalRequests"],
    }),
    // get single withdrawal request
    getsingleWithdrawalRequest: builder.query({
      query: (id) => ({
        url: `/withdraw/${id}`,
        method: "GET",
      }),
      providesTags: ["withdrawalRequests"],
    }),
    updateWithdrawalRequest: builder.mutation({
      query: ({ id, data }) => ({
        url: `/withdraw/status/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["withdrawalRequests"],
    }),
    deniedWithdrawalRequest: builder.mutation({
      query: (id) => ({
        url: `/withdraw/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["withdrawalRequests"],
    }),

    getRefundRequests: builder.query({
      query: ({ page, limit, searchText }) => ({
        url: `/refunds?page=${page}&limit=${limit}&searchTerm=${searchText}`,
        method: "GET",
      }),
      providesTags: ["refundRequests"],
    }),

    getsingleRefundRequest: builder.query({
      query: (id) => ({
        url: `/refunds/${id}`,
        method: "GET",
      }),
      providesTags: ["refundRequests"],
    }),
    updateRefundRequest: builder.mutation({
      query: ({ id, data }) => ({
        url: `/refunds/status/${id}`,
        method: "PATCH",
        body: {
          status: data?.status,
          reason: data?.reason,
        },
      }),
      invalidatesTags: ["refundRequests"],
    }),
    deniedRefundRequest: builder.mutation({
      query: ({ id, data }) => ({
        url: `/refunds/${id}`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["refundRequests"],
    }),
  }),
});

export const {
  useGetTransactionsDataQuery,
  useGetWithdrawalRequestsQuery,
  useUpdateWithdrawalRequestMutation,
  useDeniedWithdrawalRequestMutation,
  useGetRefundRequestsQuery,
  useUpdateRefundRequestMutation,
  useDeniedRefundRequestMutation,
  useGetsingleRefundRequestQuery,
  useGetsingleWithdrawalRequestQuery,
} = FinancialApi;
