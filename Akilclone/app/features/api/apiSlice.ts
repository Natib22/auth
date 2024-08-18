import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiResponse, BookmarkData, ApiResponseById } from "./apiInterface";
import { getSession } from "next-auth/react"; // Import getSession to fetch the session

const baseUrl = "https://akil-backend.onrender.com/";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: async (args, api, extraOptions) => {
    // Get the session here
    const session = await getSession();

    return fetchBaseQuery({
      baseUrl,
      prepareHeaders: (headers) => {
        // If there's a session with an access token, add it to the headers
       
          headers.set('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YmRiMWFlZjE2YWFhNTg4ODk4YzIyNCIsInJvbGUiOiJ1c2VyIiwicHJvZmlsZVN0YXR1cyI6ImluY29tcGxldGUiLCJleHAiOjE3MjQzMzQ3OTJ9.ZXwAmO6Ci1XsY1znzmkSXJKhPs59WclKBntZXO7R9eU`);
        
        return headers;
      },
    })(args, api, extraOptions);
  },
  endpoints: (builder) => ({
    getJobs: builder.query<ApiResponse, void>({
      query: () => "/opportunities/search",
    }),
    getJobById: builder.query<ApiResponseById, string>({
      query: (id) => `/opportunities/${id}`,
    }),
    Bookmark: builder.mutation<void, string>({
      query: (id) => ({
        url: `/bookmarks/${id}`,
        method: "POST",
      }),
    }),
    unBookmark: builder.mutation<void, string>({
      query: (id) => ({
        url: `/bookmarks/${id}`,
        method: "DELETE",
      }),
    }),
    getBookmarks: builder.query<BookmarkData, void>({
      query: () => "/bookmarks",
    }),
  }),
});

export const {
  useGetJobsQuery,
  useGetJobByIdQuery,
  useBookmarkMutation,
  useUnBookmarkMutation,
  useGetBookmarksQuery,
} = apiSlice;
