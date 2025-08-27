import React from 'react'
import { assets } from '../assets/assets'
import { ArrowRight, Calendar1Icon, CalendarIcon, ClockIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {

    const Navigate = useNavigate()
  return (
    <div className='flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-36 bg-[url("/backgroundImage.png")] 
    h-screen bg-cover bg-center'>

      <img src={assets.marvelLogo} alt="" className='max-h-11 lg:h-11 mt-20' />
      <h1 className='text-5x1 md:text-[70px] md:leading-18 font-semibold max-w-110' >Gardians <br /> of the Galaxy</h1>

        <div className='flex items-center gap-4 text-gray-300'>
            <span>Action | Adventure | Sci-Fi</span>
            <div className='flex intems-center gap-1'>
                <CalendarIcon className='w-4.5 h-4.5'/> 2018
            </div>
            <div className='flex items-center gap-1' >
                <ClockIcon className='w-4.5 h-4.5' />
            </div>
        </div>
        <p className='max-w-md text-gray-300'>In a post-apocalyptic world where cities ride on wheels and 
            consume each other to survive , two people meet in the Landon and try to stop to 
            conspiracy</p>
            <button onClick={()=>{Navigate('/Movies')}} className='flex items-center gap-1 px-6 py-3 text-sm bg-primary
             hower:bg-primary-dull transition rounded-full font-medium cursor-pointer'>Explore Movies
                <ArrowRight className='w-5 h-5'/>
            </button>


    </div>
  )
}

export default HeroSection
