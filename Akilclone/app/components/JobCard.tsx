// import React from "react";
"use client";
import imageMap from "../assets/ImageMap";
import Image from "next/image";
import { useRouter } from "next/navigation";
import bookmarked from "@/app/assets/bookmarked.gif";
import unbookmarked from "@/app/assets/unbookmarked.gif";
import { useEffect, useState } from "react";
import { JobData } from "../features/api/apiInterface";
import {
  useGetBookmarksQuery,
  useBookmarkMutation,
  useUnBookmarkMutation,
} from "../features/api/apiSlice";

// Usage

const shortenJobDescription = (description: string) => {
  return description.length > 400
    ? description.substring(0, 400) + "..."
    : description;
};

const JobCard = (job: JobData) => {
  const [bookmark, setBookmark] = useState(job.isBookmarked);

  const [Bookmark, { isLoading: isBookmarking, isError: isBookmarkError }] =
    useBookmarkMutation();
  const [
    unBookmark,
    { isLoading: isUnBookmarking, isError: isUnBookmarkError },
  ] = useUnBookmarkMutation();

  const modifyBookmark = async (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevents the event from bubbling up
    setBookmark((prev) => !prev);
    job.isBookmarked = !job.isBookmarked;
    console.log("bookmark getting clicked", bookmark);
    try {
      if (bookmark) {
        await unBookmark(job.id).unwrap();
      } else {
        await Bookmark(job.id).unwrap();
      }
    } catch (error) {
      console.error("Error modifying bookmark:", error);
      // Handle error (e.g., show an error message)
    }
  };

  const imageSrc = job.logoUrl || imageMap["job1.png"];
  const navigate = useRouter();

  return (
    <div
      onClick={() => navigate.push(`/job/${job.id}`)}
      className="flex h-[262px] mt-8 rounded-3xl p-[26px] gap-6 border border-[#D6DDEB] hover:bg-gray-200 "
    >
      <Image
        className="h-[59px] w-[66px]"
        src={imageSrc}
        alt="job image"
        width={66} // Specify width
        height={59} // Specify height
      />

      <div className="flex gap-2 flex-col  w-full">
        <div className="flex justify-between w-full items-center">
          <p className="text-xl">{job.title}</p>
          <button onClick={modifyBookmark}>
            {bookmark ? (
              <Image className="h-10 w-10" src={bookmarked} alt="bookmarked" />
            ) : (
              <Image
                className="h-10 w-10"
                src={unbookmarked}
                alt="unbookmarked"
              />
            )}
          </button>
        </div>

        <p className="text-grayParagraph text-base font-extralight">
          {job.orgName} . {job.location}
        </p>
        <p className="text-base font-extralight text-justify font-sans text-[#25324B] leading-relaxed">
          {shortenJobDescription(job.description)}
        </p>

        <div className="flex gap-2 items-center w-auto h-8 mt-3">
          <p className="flex items-center bg-[#56CDAD1A] text-xs text-[#56CDAD] rounded-2xl h-full w-[76] py-1 px-2">
            {job.opType}
          </p>
          <p>|</p>
          <p className="flex justify-center items-center text-xs text-yellow-500 border-yellow-500 w-auto border rounded-2xl h-full py-1 px-2 text-nowrap">
            {job.categories[0]}
          </p>
          {job.categories[1] ? (
            <p className="flex justify-center items-center text-xs text-blue-900 border-blue-900 w-auto border rounded-2xl h-full py-1 px-2 text-nowrap">
              {job.categories[1]}
            </p>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default JobCard;
