import { BlogEndpoints } from "@/constants/ApiEnumSet";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://dummyapi.io/data/v1/",
  prepareHeaders: (headers) => {
    headers.set("app-id", "6524e35de0d0cf6f1aa921ff");
    return headers;
  },
});

export const blogApi = createApi({
  reducerPath: "blogApi",
  refetchOnFocus: true,
  baseQuery: baseQuery,
  tagTypes: ["comment", "post"],
  endpoints: (builder) => ({
    getPost: builder.query<any, any>({
      query: (body) => ({
        url: BlogEndpoints.GET_POST,
        method: "GET",
        params: body,
      }),
      providesTags: ["post"],
    }),
    getTag: builder.query<any, any>({
      query: (body) => ({
        url: BlogEndpoints.GET_TAG,
        method: "GET",
        params: body,
      }),
      providesTags: ["post"],
    }),
    getPostDetails: builder.query<any, any>({
      query: (body) => ({
        url: `${BlogEndpoints.GET_POST}/${body?.id}`,
        method: "GET",
        params: body,
      }),
      providesTags: ["post"],
    }),
    getPostComments: builder.query<any, any>({
      query: (body) => ({
        url: `${BlogEndpoints.GET_POST}/${body?.id}/comment`,
        method: "GET",
        params: body,
      }),
      providesTags: ["comment"],
    }),
    createComments: builder.mutation<any, any>({
      query: (body) => ({
        url: BlogEndpoints.CREATE_COMMENT,
        method: "POST",
        body,
      }),
      invalidatesTags: ["comment"],
    }),
    deletePost: builder.mutation<any, any>({
      query: (body) => ({
        url: `${BlogEndpoints.GET_POST}/${body?.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["post"],
    }),
    createPost: builder.mutation<any, any>({
      query: (body) => ({
        url: `${BlogEndpoints.CREATE_POST}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["post"],
    }),
    updatePost: builder.mutation<any, any>({
      query: (body) => ({
        url: `${BlogEndpoints.GET_POST}/${body?.id}`,
        method: "PUT",
        // params: body,
        body,
      }),
      invalidatesTags: ["post"],
    }),
  }),
});

export const {
  useGetPostQuery,
  useGetPostDetailsQuery,
  useGetPostCommentsQuery,
  useCreateCommentsMutation,
  useDeletePostMutation,
  useCreatePostMutation,
  useUpdatePostMutation,
  useGetTagQuery,
} = blogApi;
