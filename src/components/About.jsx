import React from 'react'

const About = () => {
  return (
    <div name='about' className='p-20 w-full h-screen bg-gradient-to-b from-background2 to-background text-white'>
       <div className=' max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full'>
         <div className=' pb-8'>
            <p className=' text-4xl font-bold inline border-b-4 border-grey'>About</p>
         </div>
         <p className=' text-xl mt-20'>As a graphic designer and web developer with over 14 years of experience, I offer a range of services to help bring your visions to life. From website design and development to 3D modeling and animation, I have the skills and expertise to make your ideas a reality.</p>

         <br />

         <p className=' text-xl'>I am proficient in a wide range of web development technologies and design programs to ensure that your project is of the highest quality. This includes VS Code, Blender, and the full Adobe Suite.</p>
       </div>
    </div>
  )
}

export default About
