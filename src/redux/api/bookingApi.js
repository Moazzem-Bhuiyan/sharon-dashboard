const { baseApi } = require("./baseApi");

const BookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllVendorBookings: builder.query({
      query: ({ page, limit, searchText }) => ({
        url: `/orders/vendor-orders?page=${page}&limit=${limit}&searchTerm=${searchText}`,
        method: "GET",
      }),
      providesTags: ["booking"],
    }),
    getAllPlanerBookings: builder.query({
      query: ({ page, limit, searchText }) => ({
        url: `/orders/client-orders?page=${page}&limit=${limit}&searchTerm=${searchText}`,
        method: "GET",
      }),
      providesTags: ["booking"],
    }),
  }),
});

export const { useGetAllVendorBookingsQuery, useGetAllPlanerBookingsQuery } =
  BookingApi;
