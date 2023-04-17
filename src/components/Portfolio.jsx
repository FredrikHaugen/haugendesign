import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Pureen from '../assets/Pureen/pureenPerfume.webp'
import Florial from '../assets/Florial/florial2.webp'
import Glasses from '../assets/Glasses/GlassesCondensed.webp'
import Fjordfiesta from '../assets/Fjordfiesta/Main_inside.webp'
import currentPage from '../assets/newPortfolio/currentPortfolio.webp'
import oldPage from '../assets/oldPortfolio/oldPortfolio.webp'
import unsplashPortfolio from '../assets/unsplashPortfolio/Kazuo_Ota.webp'
import moody from '../assets/moody/moody.webp'
import iMessage from '../assets/iMessage/imessage.webp'

const Portfolio = () => {

    const [open, setOpen] = useState(false);

    const handleClickOpen = (id) => {
        setSelectedItem(portfolios.find(item => item.id === id));
        setOpen(true);
    };


    const handleClose = () => {
        setOpen(false);
    };

    const [selectedItem, setSelectedItem] = useState(null);




    const portfolios = [
        {
            id: 1,
            src: Pureen,
            behance: <a target='_blank' rel='noreferrer' href='https://www.behance.net/gallery/124386075/Pureen-Brand-Product-Design'>Behance</a>,
            picture: <a target='_blank' rel='noreferrer' href="https://unsplash.com/collections/_zTCpaNN1iw/pureen">Unsplash</a>,
            name: 'pureen cosmetics',
            imglink: 'https://www.behance.net/gallery/124386075/Pureen-Brand-Product-Design'
        },
        {
            id: 2,
            src: Florial,
            behance: <a target='_blank' rel='noreferrer' href='https://www.behance.net/gallery/115300163/Florial-Logo-design-product-mockup'>Behance</a>,
            picture: <a target='_blank' rel='noreferrer' href="https://unsplash.com/collections/z9v_7HLyOrg/florial">Unsplash</a>,
            name: 'florial perfume',
            imglink: 'https://www.behance.net/gallery/115300163/Florial-Logo-design-product-mockup'
        },
        {
            id: 3,
            src: Glasses,
            behance: <a target='_blank' rel='noreferrer' href='https://www.behance.net/gallery/162000881/Modern-Glass'>Behance</a>,
            picture: <a target='_blank' rel='noreferrer' href="https://unsplash.com/collections/psSKbBb3yKk/glasses">Unsplash</a>,
            name: 'modern drinking glass',
            imglink: 'https://www.behance.net/gallery/162000881/Modern-Glass'
        },
        {
            id: 4,
            src: Fjordfiesta,
            behance: <a target='_blank' rel='noreferrer' href='https://www.behance.net/gallery/141313091/Fjordfiesta-1001-AX-Sofat'>Behance</a>,
            picture: <a target='_blank' rel='noreferrer' href="https://unsplash.com/collections/-J3J2UOTRtM/fjordfiesta">Unsplash</a>,
            name: 'fjordfiesta 1001 AX sofa',
            imglink: 'https://www.behance.net/gallery/141313091/Fjordfiesta-1001-AX-Sofat'
        },
        {
            id: 5,
            src: currentPage,
            github: <a target='_blank' rel='noreferrer' href='https://github.com/FredrikHaugen/haugendesign'>GitHub</a>,
            page: <a target='_blank' rel='noreferrer' href="https://www.haugendesign.net">Demo</a>,
            name: 'current portfolio',
            imglink: 'https://www.haugendesign.net'
        },
        {
            id: 6,
            src: oldPage,
            github: <a target='_blank' rel='noreferrer' href='https://github.com/FredrikHaugen/old-portfolio'>GitHub</a>,
            page: <a target='_blank' rel='noreferrer' href='https://old-portfolio-2565e.web.app'>Demo</a>,
            name: 'old portfolio',
            imglink: 'https://old-portfolio-2565e.web.app'
        },
        {
            id: 7,
            src: unsplashPortfolio,
            github: <a target='_blank' rel='noreferrer' href='https://github.com/FredrikHaugen/unsplashPortfolio'>GitHub</a>,
            page: <a target='_blank' rel='noreferrer' href='https://test-unsplash-portfolio.web.app/'>Demo</a>,
            name: 'Kazuo Ota portfolio',
            imglink: 'https://test-unsplash-portfolio.web.app/'
        },
        {
            id: 8,
            src: iMessage,
            github: <a target='_blank' rel='noreferrer' href='https://github.com/FredrikHaugen/imessage_chatbot_openai'>GitHub</a>,
            page: <a target='_blank' rel='noreferrer' href='https://www.google.com/'>IDK</a>,
            name: 'OpenAI + iMessage',
            imglink: 'https://test-unsplash-portfolio.web.app/'
        },
        {
            id: 9,
            src: moody,
            name: 'Mood-logger app (ongoing)',
            imglink: 'moody'
        }
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
                        portfolios.map(({ behance, github, id, src, page, picture, name, imglink }) => (
                            <div key={id} className='shadow-box shadow-black hover:drop-shadow-2xl rounded-lg duration-300 lg:hover:scale-105 md:sm:hover:scale-100'>
                                <div>
                                    <p className='text-xl text-center capitalize py-2'>{name}</p>
                                </div>
                                <Button onClick={() => handleClickOpen(id)}><img src={src} alt="portfolioImage" /></Button>


                                <div className=' flex items-center justify-center'>
                                    <button className=' w-1/2 px-6 py-3 m-4 duration-300 lg:hover:scale-105 md:sm:hover:scale-100 hover:text-amber hover:bg-background2 rounded-md'>{page}{picture}</button>
                                    <button className=' w-1/2 px-6 py-3 m-4 duration-300 lg:hover:scale-105 md:sm:hover:scale-100 hover:text-amber hover:bg-background2 rounded-md'>{github}{behance}</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                BackdropComponent={null}
                PaperProps={{
                    sx: {
                        backgroundColor: 'white',
                        boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.3)',
                        border: '1px solid black',
                        position: 'relative' // add this to position the button correctly
                    }
                }}
                sx={{
                    position: 'fixed',
                    zIndex: 1300,
                    top: 0,
                    left: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    backdropFilter: 'blur(3px)'
                }}
            >
                {/* Add a button with an X icon to close the dialog */}
                <button
                    onClick={handleClose}
                    style={{
                        position: 'absolute',
                        top: '5px',
                        right: '5px',
                        padding: '5px',
                        cursor: 'pointer',
                        backgroundColor: 'transparent',
                        border: 'none'
                    }}
                >
                    <svg className=' hover:scale-105 ease-in-out' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path stroke="#222" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 6L6 18M6 6l12 12" />
                    </svg>

                </button>

                {/* Add the contents of the dialog */}
                {selectedItem && (
                    <div key={selectedItem.id} className=''>
                        <div>
                            <p className='text-xl text-center capitalize py-2'>{selectedItem.name}</p>
                        </div>
                        <img src={selectedItem.src} alt="portfolioImage" className=' w-[80vh]' />
                        <div className=' flex items-center justify-center'>
                            <button className=' w-1/2 px-6 py-3 m-4 duration-300 lg:hover:scale-105 md:sm:hover:scale-100 hover:text-amber hover:bg-background2 rounded-md'>{selectedItem.page}{selectedItem.picture}</button>
                            <button className=' w-1/2 px-6 py-3 m-4 duration-300 lg:hover:scale-105 md:sm:hover:scale-100 hover:text-amber hover:bg-background2 rounded-md'>{selectedItem.github}{selectedItem.behance}</button>
                        </div>
                    </div>
                )}
            </Dialog>

        </div>
    )
}

export default Portfolio
