// import React from "react";
"use client";
import imageMap from "../assets/ImageMap";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface JobData {
  id: string;
  title: string;
  description: string;
  responsibilities: string;
  requirements: string;
  idealCandidate: string;
  categories: string[];
  opType: string;
  startDate: string;
  endDate: string;
  deadline: string;
  location: string[];
  requiredSkills: string[];
  whenAndWhere: string;
  orgID: string;
  datePosted: string;
  status: string;
  applicantsCount: number;
  viewsCount: number;
  orgName: string;
  logoUrl: string;
  isBookmarked: boolean;
  isRolling: boolean;
  questions: string | null;
  perksAndBenefits: string | null;
  createdAt: string;
  updatedAt: string;
  orgPrimaryPhone: string;
  orgEmail: string;
  average_rating: number;
  total_reviews: number;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: JobData[];
}

// Usage

const shortenJobDescription = (description: string) => {
  return description.length > 400
    ? description.substring(0, 400) + "..."
    : description;
};

const JobCard = (job: JobData) => {
  const imageSrc = job.logoUrl || imageMap["job1.png"];
  const navigate = useRouter();
  console.log(job.logoUrl);

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

      <div className="flex gap-2 flex-col  ">
        <p className="text-xl">{job.title}</p>
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
