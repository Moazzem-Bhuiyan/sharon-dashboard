const { baseApi } = require("./baseApi");

const ServiceApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getServices: build.query({
      query: ({ page, limit, searchText }) => ({
        url: "/services",
        method: "GET",
        params: { page, limit, searchTerm: searchText },
      }),
      providesTags: ["services"],
    }),
    createService: build.mutation({
      query: (data) => ({
        url: "/services",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["services"],
    }),
    updateService: build.mutation({
      query: ({ id, formData }) => ({
        url: `/services/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["services"],
    }),
    deleteService: build.mutation({
      query: (id) => ({
        url: `/services/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["services"],
    }),

    // banner api
    getBanner: build.query({
      query: ({ page, limit }) => ({
        url: "/banners",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["banner"],
    }),
    createBanner: build.mutation({
      query: (data) => ({ url: "/banners", method: "POST", body: data }),
      invalidatesTags: ["banner"],
    }),

    deleteBanner: build.mutation({
      query: (id) => ({ url: `/banners/${id}`, method: "DELETE" }),
      invalidatesTags: ["banner"],
    }),
  }),
});

export const {
  useGetServicesQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,

  // banner api
  useGetBannerQuery,
  useCreateBannerMutation,
  useDeleteBannerMutation,
} = ServiceApi;
