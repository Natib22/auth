// import React from 'react'
"use client";

import { useParams } from 'next/navigation';
import data from '../../data/Jobs.json'
import { useGetJobByIdQuery } from '@/app/features/api/apiSlice';
import LeftJobDescription from '../../components/LeftJobDescription'
import RightJobDescription from '../../components/RightJobDescription'

const SingleJobPage = () => {
   const index = useParams().id 
    const {data , isError , isLoading} = useGetJobByIdQuery(index as string)
    const jobs = data?.data
    
    if (!index) {
        return <p>Invalid index</p>
    }
    const i = parseInt(index as string)
  return (
    <div className='flex gap-16 w-[1229px] h-[1064px] p-8 mx-auto '>
        <div className='flex gap-[55px] flex-col py-[46px] w-[815px] h-[1000px] bg-white'>
            <LeftJobDescription job={jobs} />
        </div>


      <div className='flex flex-col gap-5 w-[293.5px] h-[674px] bg-white'>
      <RightJobDescription job={jobs} />
      </div>

    </div>
  )
}




export default SingleJobPage
