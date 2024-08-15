import React from 'react';
import checkicon from '../assets/checkicon.png';
import locationicon from '../assets/locationicon.png';
import Image from 'next/image';
import { JobData } from '../features/api/apiInterface';

// Correct the component definition
const LeftJobDescription: React.FC<{ job: JobData }> = ({ job }) => {
    const parseTrait = (trait: string) => {
        const [label, ...textParts] = trait.split(':');
        const text = textParts.join(':').trim();
        return { label: label.trim(), text };
      };
      if (!job){
        return <p>loading</p>
      }

      const responsibilities = job.responsibilities.split("\n")
      console.log(responsibilities)

  return (
    <>
        <div className='flex flex-col gap-4 w-full min-h-[175px] h-auto'>
            <h1 className=' text-2xl font-black leading-[28.8px] text-left'>Description</h1>
            <p className='text-base leading-[25.6px] text-left font-normal'>{job.description}</p>

        </div>
      
        <div className='flex flex-col gap-4 w-full min-h-[207px] h-auto'>
            <h1 className='text-2xl font-black leading-[28.8px] text-left'>Responsibilities</h1>
            <ul className='space-y-2'>
            {responsibilities.map((responsibility, index) => (
                <li key={index} className='flex '>
                    <Image src={checkicon} alt="Checked Icon" className="w-[20px] h-[20px]" />
                    <p className='ml-2 text-base leading-[25.6px] text-left font-normal'>{responsibility}</p>
                 </li>
            ))}

            </ul>
           
        </div>

         
        <div className='flex flex-col gap-4 w-full  h-auto mt-3'>
            <h1 className='text-2xl font-black leading-[28.8px] text-left'>ideal candidate we want</h1>
            {/* <p className=''>Age: {job.ideal_candidate.age}</p> */}
            <ul className='list-disc pl-5'>
               
                        <li className=''>
                            <p className='text-base leading-[25.6px] text-left font-normal'><span className='text-base leading-[25.6px] text-left font-semibold'> </span>{job.idealCandidate}</p>
                        </li>
            
            </ul>
               
            </div>

        <div className='flex flex-col gap-6 w-[724px] min-h-[96px] h-auto'>
            <h1 className='text-2xl font-black leading-[28.8px] text-left'>When & Where</h1>
            <div className=' flex w-[815px] items-center gap-4'>
                <Image src={locationicon} alt="loc" className="w-[44px] h-[44px]" />
            <p className='text-base leading-[25.6px] text-left font-normal'>{job.whenAndWhere}</p>
            </div>
            
        </div>
   
    </>
  );
}









export default LeftJobDescription;





