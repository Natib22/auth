// import React from 'react'
"use client";

import { useParams } from "next/navigation";

import { useGetJobByIdQuery } from "@/app/features/api/apiSlice";
import LeftJobDescription from "../../components/LeftJobDescription";
import RightJobDescription from "../../components/RightJobDescription";
import { JobData } from "@/app/features/api/apiInterface";

const SingleJobPage = () => {
  const index = useParams().id;
  const { data, isError, isLoading } = useGetJobByIdQuery(index as string);
  const jobs = data?.data;
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!index) {
    return <p>Invalid index</p>;
  }
  const i = parseInt(index as string);
  return (
    <div className="flex gap-16 w-[1229px] h-[1064px] p-8 mx-auto ">
      <div className="flex gap-[55px] flex-col py-[46px] w-[815px] h-[1000px] bg-white">
        {jobs ? <LeftJobDescription job={jobs} /> : null}
      </div>

      <div className="flex flex-col gap-5 w-[293.5px] h-[674px] bg-white">
        {jobs ? <RightJobDescription job={jobs} /> : null}
      </div>
    </div>
  );
};

export default SingleJobPage;
