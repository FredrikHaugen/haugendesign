import React from 'react'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { Link } from 'react-scroll'
import head from '../assets/moreAssets/header.svg'

const Home = () => {
  return (
    
    <div name='home' className='w-full h-screen px-20 pt-40'>
        <div className='w-screen h-screen absolute -z-10 top-0 left-0 bg-primary'>
          <img src={head} className='w-full h-full object-cover' alt='header' />
        </div>
      <div className='mx-auto grid md:grid-cols-2 sm:grid-row-2 gap-8'>
      
      <div className='pt-8'>
            <h2 className=' text-4xl sm:text-5xl font-bold text-gray-100 text-transparent bg-clip-text bg-gradient-to-r from-amber to-white'>web developer & 3D artist</h2>
            <p className=' text-grey py-4'>with 14+ years of experience in graphic design, 3D modeling, video editing, and web development, I specialize in bringing your ideas to life with the help of tools such as React, Tailwind, Blender, and the full Adobe Suite.</p>
            <div>
            <Link to='portfolio' smooth duration={500} className=' group text-background w-fit px-6 py-2 my-2 flex items-center rounded-md bg-gradient-to-r from-amber to-orange shadow-xl hover:shadow-2xl cursor-pointer'>
              portfolio
              <span className='group-hover:rotate-90 duration-300'>
              <MdKeyboardArrowRight size={25} className='ml-1'/>
              </span>
            </Link>
            </div>
            
        </div>
      </div>
    </div>
  )
}

export default Home
