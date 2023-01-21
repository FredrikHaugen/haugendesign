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
        style: 'text-transform: Capitalize; !important'
      },
      {
        id: 2,
        title: 'CSS',
        icon: <SiCss3 className='w-20 h-auto mx-auto text-amber' />,
        style: 'text-transform: Capitalize; !important'
      },
      {
        id: 3,
        title: 'HTML',
        icon: <SiHtml5 className='w-20 h-auto mx-auto text-amber' />,
        style: 'text-transform: Capitalize; !important'
      },
      {
        id: 4,
        title: 'React',
        icon: <SiReact className='w-20 h-auto mx-auto text-amber' />,
        style: 'text-transform: Capitalize; !important'
      },
      {
        id: 5,
        title: 'Tailwind',
        icon: <SiTailwindcss className='w-20 h-auto mx-auto text-amber' />,
        style: 'text-transform: Capitalize; !important'
      },
      {
        id: 6,
        title: 'NEXT.JS',
        icon: <SiNextdotjs className='w-20 h-auto mx-auto text-amber' />,
        style: 'text-transform: Capitalize; !important'
      },
      {
        id: 7,
        title: 'Blender',
        icon: <SiBlender className='w-20 h-auto mx-auto text-amber' />,
        style: 'text-transform: Capitalize; !important'
      },
      {
        id: 8,
        title: 'Adobe Illustrator',
        icon: <SiAdobeillustrator className='w-20 h-auto mx-auto text-amber' />,
        style: 'text-transform: Capitalize; !important'
      },
      {
        id: 9,
        title: 'Adobe Lightroom',
        icon: <SiAdobelightroom className='w-20 h-auto mx-auto text-amber' />,
        style: 'text-transform: Capitalize; !important'
      },
      {
        id: 10,
        title: 'Adobe Photoshop',
        icon: <SiAdobephotoshop className='w-20 h-auto mx-auto text-amber' />,
        style: 'text-transform: Capitalize; !important'
      },
      {
        id: 11,
        title: 'Adobe Premiere',
        icon: <SiAdobepremierepro className='w-20 h-auto mx-auto text-amber' />,
        style: 'text-transform: Capitalize !important;'
      },
      {
        id: 12,
        title: 'Adobe XD',
        icon: <SiAdobexd className='w-20 h-auto mx-auto text-amber' />,
        style: 'text-transform: Capitalize !important;'
      },
      {
        id: 13,
        title: 'Adobe After Effects',
        icon: <SiAdobeaftereffects  className='w-20 h-auto mx-auto text-amber' />,
        style: 'text-transform: Capitalize; !important'
      },
      {
        id: 14,
        title: 'Figma',
        icon: <SiFigma className='w-20 h-auto mx-auto text-amber' />,
        style: 'text-transform: Capitalize; !important'
      }
      
    ]


  return (
    <div name='experience' className='bg-gradient-to-b from-background to-background2 w-full h-screen p-20'>

      <div className='max-w-screen mx-auto p-4 flex flex-col justify-center w-full text-white'>

        <div>
          <p className='text-4xl font-bold border-b-4 border-grey inline'>Experience</p>
          <p className='py-6'>These are the technologies and softwares I have worked with</p>
        </div>

        <div className='w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 text-center py-8 sm:px-0'>
        
        {
          kunnskap.map(({id, title, icon, style}) => (

            <div 
            key={id} 
            className={`px-3 shadow-md hover:scale-105 duration-500 py-2 bg-background2 rounded-lg hover:shadow-2xl ${style}`}>
              <div>{icon}</div>
              <p className='mt-4'>{title}</p>
          </div>

          ))
        }
          
        </div>

      </div>
    
    </div>
  )
}

export default Experience
