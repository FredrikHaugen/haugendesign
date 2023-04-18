import React from 'react'
import { SiCss3, SiPython } from 'react-icons/si'
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
import { SiFlutter } from 'react-icons/si'


  
  const technologies = [
    {
      id: 1,
      title: 'JavaScript',
      icon: <SiJavascript className=' w-20 h-auto mx-auto text-amber' />,
      style: 'text-transform: Capitalize; !important',
    },
    {
      id: 2,
      title: 'CSS',
      icon: <SiCss3 className='w-20 h-auto mx-auto text-amber' />,
      style: 'text-transform: Capitalize; !important',
    },
    {
      id: 3,
      title: 'HTML',
      icon: <SiHtml5 className='w-20 h-auto mx-auto text-amber' />,
      style: 'text-transform: Capitalize; !important',
    },
    {
      id: 4,
      title: 'React',
      icon: <SiReact className='w-20 h-auto mx-auto text-amber' />,
      style: 'text-transform: Capitalize; !important',
    },
    {
      id: 5,
      title: 'Tailwind',
      icon: <SiTailwindcss className='w-20 h-auto mx-auto text-amber' />,
      style: 'text-transform: Capitalize; !important',
    },
    {
      id: 6,
      title: 'NEXT.JS',
      icon: <SiNextdotjs className='w-20 h-auto mx-auto text-amber' />,
      style: 'text-transform: Capitalize; !important',
    },
    {
      id: 7,
      title: 'Flutter',
      icon: <SiFlutter className='w-20 h-auto mx-auto text-amber' />,
      style: 'text-transform: Capitalize; !important',
    },
    {
      id: 8,
      title: 'Python',
      icon: <SiPython className='w-20 h-auto mx-auto text-amber' />,
      style: 'text-transform: Capitalize; !important',
    },
    {
      id: 9,
      title: 'Blender',
      icon: <SiBlender className='w-20 h-auto mx-auto text-amber' />,
      style: 'text-transform: Capitalize; !important',
    },
    {
      id: 10,
      title: 'Adobe Illustrator',
      icon: <SiAdobeillustrator className='w-20 h-auto mx-auto text-amber' />,
      style: 'text-transform: Capitalize; !important',
    },
    {
      id: 11,
      title: 'Adobe Lightroom',
      icon: <SiAdobelightroom className='w-20 h-auto mx-auto text-amber' />,
      style: 'text-transform: Capitalize; !important',
    },
    {
      id: 12,
      title: 'Adobe Photoshop',
      icon: <SiAdobephotoshop className='w-20 h-auto mx-auto text-amber' />,
      style: 'text-transform: Capitalize; !important',
    },
    {
      id: 13,
      title: 'Adobe Premiere',
      icon: <SiAdobepremierepro className='w-20 h-auto mx-auto text-amber' />,
      style: 'text-transform: Capitalize !important;',
    },
    {
      id: 14,
      title: 'Adobe XD',
      icon: <SiAdobexd className='w-20 h-auto mx-auto text-amber' />,
      style: 'text-transform: Capitalize !important;',
    },
    {
      id: 15,
      title: 'Adobe After Effects',
      icon: <SiAdobeaftereffects className='w-20 h-auto mx-auto text-amber' />,
      style: 'text-transform: Capitalize; !important',
    },
    {
      id: 16,
      title: 'Figma',
      icon: <SiFigma className='w-20 h-auto mx-auto text-amber' />,
      style: 'text-transform: Capitalize; !important',
    }

  ]
  
  const Technology = ({ id, title, icon }) => (
    <div className="p-2 shadow-md bg-background2 hover:scale-105 duration-500 ease-in-out rounded-lg">
      {icon}
      <p className="mt-4">{title}</p>
    </div>
  );
  
  const Experience = () => (
    <div className="bg-gradient-to-b -mt-1 from-background to-background2 w-full lg:p-20 md:p-10 sm:p-3">
      <div name="experience" className="pt-24">
        <div className="max-w-screen mx-auto lg:p-4 md:p-2 sm:p-1 flex flex-col justify-center w-full text-white">
          <div className="ml-4">
            <p className="text-4xl font-bold border-b-4 border-grey inline justify-start ml">Experience</p>
            <p className="py-6 justify-start">These are the technologies and software I have worked with</p>
          </div>
  
          <div className="w-full grid grid-cols-2 md:grid-cols-6 lg:grid-cols-9 gap-8 text-center py-8 px-6">
            {technologies.map((technology) => (
              <Technology key={technology.id} {...technology} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
  
  export default Experience;
  
