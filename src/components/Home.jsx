import React from 'react'
import logo from '../assets/logo.png'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { Link } from 'react-scroll'

const Home = () => {
  return (
    <div name='home' className='w-full h-screen bg-gradient-to-b from-background via-background to-background2 '>

      <div className=' max-w-screen-2xl mx-auto flex gap-x-10 flex-col items-center justify-center h-full px-20 lg:flex-row'>
        <div className='flex flex-col justify-center'>
          <h2 className=' text-4xl sm:text-5xl font-bold text-lightgrey'>web developer & 3D artist</h2>
          <p className=' text-grey py-4  max-w-md'>With 14+ years of experience in design, 3D art, video editing and web development. Currently I use technologies such as React, Tailwind, Blender and the full Adobe Suite to make sure you are satisfied with the result of your desired project.</p>
          <div>
          <Link to='portfolio' smooth duration={500} className=' group text-background w-fit px-6 py-2 my-2 flex items-center rounded-md bg-gradient-to-r from-amber to-orange shadow-xl cursor-pointer'>
            portfolio
            <span className='group-hover:rotate-90 duration-300'>
            <MdKeyboardArrowRight size={25} className='ml-1'/>
            </span>
          </Link>
          </div>
        </div>
          
          <div>
          <img src={logo} 
          alt="logo" 
          className='mx-auto w-2/3 md:w-full bg-gradient-to-b from-background2  to-white rounded-xl shadow-2xl' />
          </div>
      </div>
    </div>
  )
}

export default Home
