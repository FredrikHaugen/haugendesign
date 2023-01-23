import React from 'react'

const About = () => {
  return (
    <div name='about' className='lg:p-20 md:p-10 sm:p-3 w-full h-fit bg-gradient-to-b from-background2 to-background text-white'>
       <div className=' max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full pt-4'>
         <div className=' pb-8'>
            <p className=' text-4xl font-bold inline border-b-4 border-grey'>About</p>
         </div>
         <p className=' text-xl my-6'>My name is Fredrik and I am the founder of Haugendesign. I am a 28-year-old graphic designer and web developer from Oslo, Norway with over 14 years of experience. My passion for visual design began at a young age of 14, and since then it has evolved into a professional career. I specialize in creating a wide range of visual elements and design layouts using the industry-standard software such as Blender, Adobe Photoshop, Illustrator, Premiere and Lightroom, Adobe XD, and Figma.</p>

         <br />

         <p className=' text-xl mb-16'>As a web developer, I offer a wide range of services to help bring your visions to life, including website design and development. I am proficient in a wide range of web development technologies such as HTML, CSS, Javascript and I also have experience working with React, Tailwind and Nextjs. These technologies and my experience with them, allow me to bring the most efficient and effective solutions to my clients.</p>

         <br />

         <p className=' text-xl mb-16'>Furthermore, my proficiency in 3D modeling software such as Blender, allows me to create photorealistic product rendering that can be used in a variety of applications such as product design. With my passion for design, technical skill, and expertise, I am dedicated to bringing your ideas to life and exceeding your expectations.</p>
       </div>
    </div>
  )
}

export default About
