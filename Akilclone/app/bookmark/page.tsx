"use client";
import { useEffect } from "react";
import JobCard from "../components/JobCard";
import {
  useGetBookmarksQuery,
  useGetJobsQuery,
} from "../features/api/apiSlice";
import { JobData } from "../features/api/apiInterface";

import React from "react";

const Bookmarkpage = () => {
  const { data } = useGetBookmarksQuery();
  const { data: jobsData } = useGetJobsQuery();

  const bookmarkedList: string[] | undefined = data?.data.map((card) => {
    return card.eventID;
  });
  let bookmarkedJobs: JobData[] | undefined = jobsData?.data?.filter((job) =>
    bookmarkedList?.includes(job.id)
  );

  return (
    <div className="mt-28">
      <h1 className="text-4xl text-gray-900 ml-28">Bookmarks</h1>

      <div className="flex flex-col mx-52">
        {bookmarkedJobs?.map((job) => (
          <JobCard key={job.id} {...job} />
        ))}
      </div>
    </div>
  );
};

export default Bookmarkpage;
