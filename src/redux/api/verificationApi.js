const { baseApi } = require("./baseApi");

const verificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getVerificationRequests: builder.query({
      query: ({ page, limit, searchText }) => ({
        url: `/verifications?page=${page}&limit=${limit}&searchTerm=${searchText}`,
        method: "GET",
      }),
      providesTags: ["verificationRequests"],
    }),
    updateVerificationRequest: builder.mutation({
      query: (payload) => ({
        url: `/verifications/status/${payload.id}`,
        method: "PATCH",
        body: { status: payload.status },
      }),
      invalidatesTags: ["verificationRequests"],
    }),
    deniedVerificationRequest: builder.mutation({
      query: (id) => ({
        url: `/verifications/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["verificationRequests"],
    }),
  }),
});

export const {
  useGetVerificationRequestsQuery,
  useUpdateVerificationRequestMutation,
  useDeniedVerificationRequestMutation,
} = verificationApi;
