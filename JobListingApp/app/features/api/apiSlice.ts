import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import ApiResponse from "./apiInterface";
export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "https://akil-backend.onrender.com/" }),
    endpoints: builder => ({
        getJobs: builder.query<ApiResponse, void>({
            query: () => "/opportunities/search"
        }),
        getJobById: builder.query<ApiResponse, string>({
            query: id => `/opportunities/${id}`
        })
    })

})

export const { useGetJobsQuery, useGetJobByIdQuery } = apiSlice;