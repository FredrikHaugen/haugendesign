import React from 'react'
import { SiCss3 } from 'react-icons/si'
import { SiHtml5 } from 'react-icons/si'
import { SiJavascript } from 'react-icons/si'
import { SiReact } from 'react-icons/si'
import { SiTailwindcss } from 'react-icons/si'
import { SiNextdotjs } from 'react-icons/si'
import { SiBlender } from 'react-icons/si'
import { SiAdobeaftereffects } from 'react-icons/si'
import { SiAdobeillustrator } from 'react-icons/si'
import { SiAdobelightroom } from 'react-icons/si'
import { SiAdobephotoshop } from 'react-icons/si'
import { SiAdobepremierepro } from 'react-icons/si'
import { SiAdobexd } from 'react-icons/si'
import { SiFigma } from 'react-icons/si'

const Experience = () => {

  const kunnskap = [
    {
      id: 1,
      title: 'JavaScript',
      icon: <SiJavascript className=' w-20 h-auto mx-auto text-amber' />,
      style: 'text-transform: Capitalize; !important',
      text: 'JavaScript is a scripting language used to create dynamic, interactive web pages. It is used to add functionality to websites, such as responding to user input, manipulating page content, and creating interactive elements.'
    },
    {
      id: 2,
      title: 'CSS',
      icon: <SiCss3 className='w-20 h-auto mx-auto text-amber' />,
      style: 'text-transform: Capitalize; !important',
      text: 'CSS is a language used to style and present web pages. It is used to control the style and layout of webpages, including colours, fonts, and page layout.'
    },
    {
      id: 3,
      title: 'HTML',
      icon: <SiHtml5 className='w-20 h-auto mx-auto text-amber' />,
      style: 'text-transform: Capitalize; !important',
      text: 'HTML is a markup language used to create the structure a webpage, add content and images, create links, and provide a basic layout for a website.'
    },
    {
      id: 4,
      title: 'React',
      icon: <SiReact className='w-20 h-auto mx-auto text-amber' />,
      style: 'text-transform: Capitalize; !important',
      text: 'React.js is a JavaScript library used to create user interfaces. It is used to build complex and interactive web applications and can be used to create reusable UI components.'
    },
    {
      id: 5,
      title: 'Tailwind',
      icon: <SiTailwindcss className='w-20 h-auto mx-auto text-amber' />,
      style: 'text-transform: Capitalize; !important',
      text: 'Tailwind is a utility-first CSS framework. It provides low-level styling primitives, allowing developers to easily create custom designs without the need to write custom CSS code.'
    },
    {
      id: 6,
      title: 'NEXT.JS',
      icon: <SiNextdotjs className='w-20 h-auto mx-auto text-amber' />,
      style: 'text-transform: Capitalize; !important',
      text: 'Next.js is a JavaScript framework for building server-rendered websites. It is used to create universal applications optimized for performance and SEO and can be deployed easily to various hosting providers.'
    },
    {
      id: 7,
      title: 'Blender',
      icon: <SiBlender className='w-20 h-auto mx-auto text-amber' />,
      style: 'text-transform: Capitalize; !important',
      text: 'Blender is an open-source 3D modelling software. It is used to create digital 3D models and render realistic images and animations for use in advertisements and product showcases.'
    },
    {
      id: 8,
      title: 'Adobe Illustrator',
      icon: <SiAdobeillustrator className='w-20 h-auto mx-auto text-amber' />,
      style: 'text-transform: Capitalize; !important',
      text: 'Adobe Illustrator is a vector-based graphics editing software. It is used to create illustrations, logos, diagrams, web graphics, and typography for both print and digital use.'
    },
    {
      id: 9,
      title: 'Adobe Lightroom',
      icon: <SiAdobelightroom className='w-20 h-auto mx-auto text-amber' />,
      style: 'text-transform: Capitalize; !important',
      text: 'Adobe Lightroom is a digital photo editing software. It is used to organize and edit digital photos, including adjusting colours, exposure, and tone.'
    },
    {
      id: 10,
      title: 'Adobe Photoshop',
      icon: <SiAdobephotoshop className='w-20 h-auto mx-auto text-amber' />,
      style: 'text-transform: Capitalize; !important',
      text: 'Adobe Photoshop is a raster-based image editing software. It is used to create and manipulate digital images for print, web, and other digital applications.'
    },
    {
      id: 11,
      title: 'Adobe Premiere',
      icon: <SiAdobepremierepro className='w-20 h-auto mx-auto text-amber' />,
      style: 'text-transform: Capitalize !important;',
      text: 'Adobe Premiere Pro is a video editing software. It is used to create and edit digital video content for television, movies, web, and other digital formats.'
    },
    {
      id: 12,
      title: 'Adobe XD',
      icon: <SiAdobexd className='w-20 h-auto mx-auto text-amber' />,
      style: 'text-transform: Capitalize !important;',
      text: 'Adobe XD is a user-experience design software. It is used to create wireframes, prototypes, and high-fidelity UI designs for web, mobile, and other digital products.'
    },
    {
      id: 13,
      title: 'Adobe After Effects',
      icon: <SiAdobeaftereffects className='w-20 h-auto mx-auto text-amber' />,
      style: 'text-transform: Capitalize; !important',
      text: 'Adobe After Effects is a motion graphics software. It is used to create visual effects and motion graphics for film, television, web, and other digital media.'
    },
    {
      id: 14,
      title: 'Figma',
      icon: <SiFigma className='w-20 h-auto mx-auto text-amber' />,
      style: 'text-transform: Capitalize; !important',
      text: 'Figma is a collaborative interface design tool. It is used to create, prototype, and collaborate on UI designs for web, mobile, and other digital products.'
    }

  ]


  return (
    <div className='bg-gradient-to-b -mt-1 from-background to-background2 w-full lg:p-20 md:p-10 sm:p-3'>
      <div name='experience' className=' pt-24'>
        <div className='max-w-screen mx-auto lg:p-4 md:p-2 sm:p-1 flex flex-col justify-center w-full text-white'>

          <div className='group ml-4'>
            <p className='text-4xl font-bold border-b-4 border-grey inline justify-start ml'>Experience</p>
            <p className='py-6 justify-start'>These are the technologies and softwares I have worked with</p>
          </div>

          <div className='w-full grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 text-center py-8 px-6'>

            {
              kunnskap.map(({ id, title, icon, style, text }) => (

                <div
                  key={id}
                  className={`p-2 shadow-md  bg-background2 hover:scale-105 duration-500 ease-in-out rounded-lg group ${style}`}>
                  <div>{icon}</div>
                  <p className='mt-4'>{title}</p>
                  <div className=' opacity-0 group-hover:opacity-100 duration-500 ease-in-out text-xs text-grey'><p></p></div>
                </div>

              ))
            }

          </div>

        </div>
      </div>
    </div>
  )
}

export default Experience
