import React from 'react'

import Pureen from '../assets/Pureen/pureenPerfume.webp'
import Florial from '../assets/Florial/florial2.webp'
import Glasses from '../assets/Glasses/GlassesCondensed.webp'
import Fjordfiesta from '../assets/Fjordfiesta/Main_inside.webp'
import currentPage from '../assets/newPortfolio/CurrentPage.webp'
import oldPage from '../assets/oldPage/oldPage.webp'

const Portfolio = () => {

    const porttfolios = [
        {
            id: 1,
            src: Pureen,
            behance: <a target='_blank' rel='noreferrer' href='https://www.behance.net/gallery/124386075/Pureen-Brand-Product-Design'>behance</a>
        },
        {
            id: 2,
            src: Florial,
            behance: <a target='_blank' rel='noreferrer' href='https://www.behance.net/gallery/115300163/Florial-Logo-design-product-mockup'>behance</a>
        },
        {
            id: 3,
            src: Glasses,
            behance: <a target='_blank' rel='noreferrer' href='https://www.behance.net/gallery/162000881/Modern-Glass'>behance</a>
        },
        {
            id: 4,
            src: Fjordfiesta,
            behance: <a target='_blank' rel='noreferrer' href='https://www.behance.net/gallery/141313091/Fjordfiesta-1001-AX-Sofat'>behance</a>
        },
        {
            id: 5,
            src: currentPage,
            github: <a target='_blank' rel='noreferrer' href='https://github.com/FredrikHaugen/haugendesign'>github</a>,
            page: <a target='_blank' rel='noreferrer' href='https://www.haugendesign.net'>Demo</a>
        },
        {
            id: 6,
            src: oldPage,
            github: <a target='_blank' rel='noreferrer' href='https://www.github.com'>github</a>,
            page: <a target='_blank' rel='noreferrer' href='https://old-portfolio-2565e.web.app'>Demo</a>
        },
    ]




  return (
    <div name="portfolio" className='bg-background w-full text-white flex align-middle lg:p-20 md:p-10 sm:p-3'>
        
            
            <div className=' max-w-screen-lg  mx-auto flex flex-col justify-center w-full h-full'>
                <div className='pb-8 ml-4'>
                    <p className='text-4xl font-bold inline border-b-4 border-grey'>Portfolio</p>
                    <p className='py-6 '>Here's some of my previous work</p>
                </div>

            
                

                <div className='grid sm:grid-cols-2 ps:grid-cols-3 gap-4 p-12 sm:p-3 justify-center'>

                {
                    porttfolios.map(({behance, github, id, src, page}) => (
                        <div key={id} className=' shadow-box shadow-black hover:shadow-lg rounded-lg duration-300 hover:scale-105'>
                        <img src={src} alt="portfolioImage" className=' rounded-t-lg '/>
                        <div className=' flex items-center justify-center'>
                            <button className=' w-1/2 px-6 py-3 m-4 duration-300 hover:scale-105 hover:text-amber hover:bg-background2 rounded-md'>{page}</button>
                            <button className=' w-1/2 px-6 py-3 m-4 duration-300 hover:scale-105 hover:text-amber hover:bg-background2 rounded-md'>{github}{behance}</button>
                        </div>
                    </div>
                    ))
                }
                    
                </div>
            </div>
    </div>
  )
}

export default Portfolio
