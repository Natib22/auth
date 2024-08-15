import React from 'react'

import { JobData } from '../features/api/apiInterface'
  // Correct the component definition
  const RightJobDescription: React.FC<{ job: JobData}> = ({ job }) =>{
    if (!job){
    return <p>Loading</p>
    }
  return (
    <>
    <h1 className='text-2xl font-black leading-[28.8px] text-left'>about</h1>


    <div className='flex gap-4'>
       <span className='flex justify-center items-center w-[44px] h-[44px] border border-gray-200 rounded-3xl'>
           <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
           <path d="M19.5 10C19.5 14.9706 15.4706 19 10.5 19C5.52944 19 1.5 14.9706 1.5 10C1.5 5.02944 5.52944 1 10.5 1M10.5 1C11.9368 1 13.295 1.33671 14.5 1.93552C14.5 1.93552 13.3085 1.40681 12.5 1.22302C11.7337 1.0488 10.5 1 10.5 1ZM10.5 7V13M13.5 10H7.5" stroke="#26A4FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
      <div className='flex flex-col gap-1'>
        <p className='text-[#515B6F]'>Posted On</p>
        <p className='font-semibold'>{job.datePosted.slice(0,10)}</p>
      </div>

    </div>

    <div className='flex gap-4'>
       <span className='flex justify-center items-center w-[44px] h-[44px] border border-gray-200 rounded-3xl'>
           <svg width="19" height="23" viewBox="0 0 19 23" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M5.96777 7.39451L5.96552 7.39634L5.96338 7.39842L5.96777 7.39451ZM15.9219 7.20798C15.8523 7.14093 15.7751 7.08226 15.6919 7.03317C15.5741 6.96383 15.4433 6.9194 15.3076 6.90261C15.1719 6.88583 15.0343 6.89705 14.9031 6.93558C14.7719 6.97412 14.6501 7.03915 14.5451 7.12665C14.44 7.21415 14.3541 7.32227 14.2925 7.44431C13.948 8.123 13.4729 8.727 12.8945 9.22165C12.9829 8.72326 13.0275 8.21807 13.0278 7.71188C13.0296 6.17198 12.6234 4.65909 11.8504 3.32725C11.0775 1.9954 9.96537 0.892171 8.62738 0.129883C8.47999 0.0463305 8.31379 0.00159306 8.14437 -0.000131297C7.97495 -0.00185565 7.80787 0.0394896 7.65881 0.120025C7.50974 0.20056 7.38358 0.317646 7.29217 0.460294C7.20075 0.602942 7.14707 0.766477 7.13617 0.935553C7.08021 1.88373 6.83233 2.81067 6.40756 3.66022C5.98279 4.50977 5.38996 5.26424 4.665 5.87791L4.43453 6.06541C3.67644 6.5755 3.00543 7.20431 2.44723 7.92771C1.57955 9.02082 0.978476 10.3011 0.691687 11.6669C0.404899 13.0327 0.44028 14.4466 0.795026 15.7964C1.14977 17.1462 1.81412 18.3947 2.7354 19.4431C3.65667 20.4914 4.80953 21.3107 6.10254 21.8359C6.25436 21.898 6.41911 21.9217 6.58226 21.905C6.74542 21.8883 6.90195 21.8317 7.03807 21.7402C7.17419 21.6488 7.2857 21.5252 7.36277 21.3804C7.43984 21.2357 7.4801 21.0741 7.48 20.9101C7.47928 20.8041 7.46249 20.6987 7.4302 20.5976C7.20647 19.7567 7.14205 18.8813 7.24025 18.0166C8.18649 19.8013 9.70539 21.216 11.5528 22.0332C11.7782 22.1341 12.0332 22.1476 12.2681 22.0713C13.7277 21.6002 15.0425 20.7637 16.0877 19.6413C17.133 18.5189 17.8738 17.1479 18.24 15.6586C18.6061 14.1692 18.5853 12.611 18.1796 11.1319C17.7739 9.65284 16.9967 8.30209 15.9219 7.20798ZM12.0171 20.039C11.1454 19.5973 10.3765 18.977 9.76025 18.2185C9.14403 17.46 8.69435 16.5804 8.44043 15.6367C8.36288 15.319 8.3029 14.9972 8.26074 14.6728C8.23218 14.4663 8.13978 14.2738 7.99647 14.1224C7.85315 13.9709 7.66609 13.868 7.46143 13.8281C7.39838 13.8157 7.33426 13.8095 7.27 13.8096C7.09424 13.8095 6.92158 13.8558 6.76941 13.9437C6.61725 14.0317 6.49096 14.1582 6.4033 14.3106C5.57357 15.7417 5.1563 17.3746 5.19773 19.0283C4.46797 18.4609 3.85808 17.7543 3.40341 16.9495C2.94873 16.1447 2.65832 15.2576 2.549 14.3397C2.43968 13.4218 2.51363 12.4914 2.76655 11.6023C3.01948 10.7131 3.44636 9.88308 4.02244 9.16016C4.45985 8.592 4.98753 8.09945 5.58444 7.70216C5.61029 7.68548 5.63507 7.66722 5.65866 7.64747C5.65866 7.64747 5.95535 7.40199 5.96549 7.39637C7.39019 6.19134 8.4035 4.57189 8.86423 2.76368C9.9538 3.77092 10.6803 5.10971 10.931 6.57219C11.1816 8.03467 10.9424 9.53899 10.2505 10.8516C10.159 11.0267 10.1215 11.225 10.1427 11.4215C10.1638 11.6179 10.2427 11.8037 10.3693 11.9554C10.4959 12.107 10.6646 12.2178 10.8541 12.2737C11.0436 12.3297 11.2454 12.3282 11.4341 12.2696C12.9658 11.7894 14.3138 10.8515 15.2964 9.58207C15.8869 10.4544 16.273 11.4487 16.4259 12.4909C16.5787 13.5332 16.4944 14.5965 16.1792 15.6016C15.864 16.6068 15.326 17.5278 14.6054 18.2961C13.8847 19.0644 13 19.6602 12.0171 20.0391L12.0171 20.039Z" fill="#26A4FF"/>
          </svg>
        </span>
      <div className='flex flex-col gap-1'>
        <p className='text-[#515B6F]'>Dead Line</p>
        <p className='font-semibold'>{job.deadline.slice(0,10)}</p>
      </div>

    </div>
    
    <div className='flex gap-4'>
       <span className='flex justify-center items-center w-[44px] h-[44px] border border-gray-200 rounded-3xl'>
       <svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M11 8.50051C11 7.11924 9.88076 6 8.50051 6C7.11924 6 6 7.11924 6 8.50051C6 9.88076 7.11924 11 8.50051 11C9.88076 11 11 9.88076 11 8.50051Z" stroke="#26A4FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M8.49951 19C7.30104 19 1 13.8984 1 8.56329C1 4.38664 4.3571 1 8.49951 1C12.6419 1 16 4.38664 16 8.56329C16 13.8984 9.69799 19 8.49951 19Z" stroke="#26A4FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg> 
        </span>
      <div className='flex flex-col gap-1'>
        <p className='text-[#515B6F]'>Location</p>
        <p className='font-semibold'>{job.location}</p>
      </div>

    </div>

    <div className='flex gap-4'>
       <span className='flex justify-center items-center w-[44px] h-[44px] border border-gray-200 rounded-3xl'>
              <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M5.25 1V3.25M15.75 1V3.25M1.5 16.75V5.5C1.5 4.25736 2.50736 3.25 3.75 3.25H17.25C18.4926 3.25 19.5 4.25736 19.5 5.5V16.75M1.5 16.75C1.5 17.9926 2.50736 19 3.75 19H17.25C18.4926 19 19.5 17.9926 19.5 16.75M1.5 16.75V9.25C1.5 8.00736 2.50736 7 3.75 7H17.25C18.4926 7 19.5 8.00736 19.5 9.25V16.75" stroke="#26A4FF" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
      <div className='flex flex-col gap-1'>
        <p className='text-[#515B6F]'>Start Date</p>
        <p className='font-semibold'>{job.startDate.slice(0,10)}</p>
      </div>

    </div>


    <div className='flex gap-4'>
    <span className='flex justify-center items-center w-[44px] h-[44px] border border-gray-200 rounded-3xl'>
    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      
      <path d="M7.25 3V5.25M17.75 3V5.25M3.5 18.75V7.5C3.5 6.25736 4.50736 5.25 5.75 5.25H19.25C20.4926 5.25 21.5 6.25736 21.5 7.5V18.75M3.5 18.75C3.5 19.9926 4.50736 21 5.75 21H19.25C20.4926 21 21.5 19.9926 21.5 18.75M3.5 18.75V11.25C3.5 10.0074 4.50736 9 5.75 9H19.25C20.4926 9 21.5 10.0074 21.5 11.25V18.75" stroke="#26A4FF" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M10.5 14.7222L12.2778 16.5L14.9444 12.5" stroke="#26A4FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
        </span>
      <div className='flex flex-col gap-1'>
        <p className='text-[#515B6F]'>End Date</p>
        <p className='font-semibold'>{job.endDate.slice(0,10)}</p>
      </div>

    </div>

    <svg width="294" height="1" viewBox="0 0 294 1" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="0.5" y1="0.5" x2="294" y2="0.5" stroke="#D6DDEB"/>
    </svg>


    <div className='flex flex-col gap-6'>
      <h1 className='text-2xl font-black leading-[28.8px] text-left'>Catagories</h1>
      <div className='flex gap-2 flex-wrap'>

        {job.categories.map((category , index) => (
          index % 2 == 0 ? <p key={index} className="flex items-center justify-center bg-[#56CDAD1A] text-xs text-[#56CDAD] rounded-2xl h-[31px] text-nowrap w-auto  py-1 px-3">{category}</p> 
          : <p key={index} className="flex items-center justify-center bg-[#EB85331A] text-xs text-[#FFB836] rounded-2xl h-[31px] text-nowrap w-auto  py-1 px-3">{category}</p>
        ))}

      
      
      </div>
     
    </div>

    <svg width="294" height="1" viewBox="0 0 294 1" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="0.5" y1="0.5" x2="294" y2="0.5" stroke="#D6DDEB"/>
    </svg>

    <div className='flex flex-col gap-6'>
      <h1 className='text-2xl font-black leading-[28.8px] text-left'>Required Skills</h1>
      <div className='flex gap-2 flex-wrap'>
        {job.requiredSkills.map((skill , i) => (
            <p key = {i}className="flex items-center justtify-center font-epilogue text-base bg-[#F8F8FD]  text-[#4640DE]  h-[37px] min-w-20 w-auto  py-1 px-3">{skill}</p>
        )) }
      
      </div>
     
    </div>


    
    </>
    
  )
}








export default RightJobDescription






