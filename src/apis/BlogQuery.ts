import { BlogEndpoints } from "@/constants/ApiEnumSet";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://dummyapi.io/data/v1/",
  prepareHeaders: (headers) => {
    headers.set("app-id", "652297c1f6390edd9df64d93");
    return headers;
  },
});

export const blogApi = createApi({
  reducerPath: "blogApi",
  refetchOnFocus: true,
  baseQuery: baseQuery,
  tagTypes: [],
  endpoints: (builder) => ({
    getPost: builder.query<any, any>({
      query: () => ({
        url: BlogEndpoints.GET_POST,
        method: "GET",
        // headers: {
        //   "app-id": "652297c1f6390edd9df64d93",
        //   accept: "application/json",
        // },
      }),
    }),
  }),
});

export const { useGetPostQuery } = blogApi;
