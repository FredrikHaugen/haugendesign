import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Pureen from '../assets/Pureen/pureenPerfume.webp'
import Pureen2 from '../assets/Pureen/EyeShadow.webp'
import Pureen3 from '../assets/Pureen/poster1.webp'
import Pureen4 from '../assets/Pureen/poster2.webp'
import Pureen5 from '../assets/Pureen/poster3.webp'
import Florial from '../assets/Florial/florial2.webp'
import LogoFlorial from '../assets/Florial/logo.webp'
import FlorPro from '../assets/Florial/process.webp'
import Glasses from '../assets/Glasses/GlassesCondensed.webp'
import Glasses2 from '../assets/Glasses/Glasses.webp'
import Fjordfiesta from '../assets/Fjordfiesta/Main_inside.webp'
import Fjordfiesta2 from '../assets/Fjordfiesta/Main_outside.webp'
import Fjordfiesta3 from '../assets/Fjordfiesta/strokes_inside.webp'
import Fjordfiesta4 from '../assets/Fjordfiesta/Strokes_outside.webp'
import currentPage from '../assets/newPortfolio/currentPortfolio.webp'
import currentPage2 from '../assets/newPortfolio/currentPortfolio2.webp'
import oldPage from '../assets/oldPortfolio/oldPortfolio.webp'
import oldPage2 from '../assets/oldPortfolio/oldPortfolio2.webp'
import unsplashPortfolio from '../assets/unsplashPortfolio/Kazuo_Ota.webp'
import moody from '../assets/moody/moody.webp'
import iMessage from '../assets/iMessage/imessage.webp'
import iMessage2 from '../assets/iMessage/iMessage2.webp'

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
            dialogImg1: Pureen2,
            dialogImg2: Pureen3,
            dialogImg3: Pureen4,
            dialogImg4: Pureen5,
            dialogImg5: '',
            dialogText1: 'This whole project started with Pureen, an upcoming German cosmetic brand, reaching out in the start-up phase in early March 2021. They wanted a complete brand design and style guide as well as a couple of product renders. Below are a showcase of their brand design.',
            dialogText2: 'After the brand experienced some initial growth and interest from the public, they wanted to launch a secondary series of fragrances and eyeshadow. They then reached out about designing these products, model them in 3D and use them as the products in posters for advertisement purposes.',
            dialogText3: 'Photography by: Alexander Krivbitskiy',
            behance: <a target='_blank' rel='noreferrer' href='https://www.behance.net/gallery/124386075/Pureen-Brand-Product-Design'>Behance</a>,
            picture: <a target='_blank' rel='noreferrer' href="https://unsplash.com/collections/_zTCpaNN1iw/pureen">Unsplash</a>,
            name: 'pureen cosmetics',
        },
        {
            id: 2,
            src: Florial,
            dialogImg1: FlorPro,
            dialogImg2: LogoFlorial,
            dialogText1: 'The logo ended up being a happy accident while vectorising a flower petal with some geometric forms. In the beginning, it was a very detailed flower, and after gradually removing lines and gradients, it ended up looking like a great combination of modern pastel and retro colours in a warm and pleasant looking logo. ',
            dialogText2: 'The logo and first custom perfume bottle were designed back in February 2021. The initial launch of the company went very well and they decided to launch a second scent. This time they wanted a more unique bottle. Together we made a few mockups and finally decided on the design shown below.',
            dialogText3: '',
            behance: <a target='_blank' rel='noreferrer' href='https://www.behance.net/gallery/115300163/Florial-Logo-design-product-mockup'>Behance</a>,
            picture: <a target='_blank' rel='noreferrer' href="https://unsplash.com/collections/z9v_7HLyOrg/florial">Unsplash</a>,
            name: 'florial perfume',
        },
        {
            id: 3,
            src: Glasses,
            dialogImg2: Glasses2,
            dialogText1: 'A project just for me, with inspiration from previous designs I have created. The drinking glass formed like this have for some reason always been in my head as something I want to have so I decided that the best way I can create it was to make my own render.',
            dialogText2: 'The model is uploaded for free to sketchfab and below is a link to the download if you want to use it for your own projects.',
            dialogText3: '',
            behance: <a target='_blank' rel='noreferrer' href='https://www.behance.net/gallery/162000881/Modern-Glass'>Behance</a>,
            picture: <a target='_blank' rel='noreferrer' href="https://sketchfab.com/3d-models/drinking-glass-bfe2995de95c4bb2a730501c82cb09ad">Sketchfab</a>,
            name: 'modern drinking glass',
        },
        {
            id: 4,
            src: Fjordfiesta,
            dialogImg1: Fjordfiesta2,
            dialogImg3: Fjordfiesta3,
            dialogImg4: Fjordfiesta4,
            dialogText1: 'This project was a simple render of a sofa made by a Norwegian furniture company called Fjordfiesta.',
            dialogText2: 'The first part of this project was to design and model the sofa and place it in a suiting environment. No materials were added yet and I focused mostly on the design, and also the placement of the camera for the best images.',
            dialogText3: '',
            behance: <a target='_blank' rel='noreferrer' href='https://www.behance.net/gallery/141313091/Fjordfiesta-1001-AX-Sofat'>Behance</a>,
            picture: <a target='_blank' rel='noreferrer' href="https://fjordfiesta.com/products/1001-ax-sofa">Fjordfiesta</a>,
            name: 'fjordfiesta 1001 AX sofa',
        },
        {
            id: 5,
            src: currentPage,
            dialogImg1: '',
            dialogImg2: currentPage2,
            dialogImg3: '',
            dialogImg4: '',
            dialogImg5: '',
            dialogText1: 'My current portfolio showcases my recent projects, created using ReactJS, a user-friendly JavaScript library, and TailwindCSS, an adaptable CSS framework. These tools help build a visually appealing and easy-to-use website.',
            dialogText2: 'The portfolio includes smooth scrolling for better navigation and uses lazy-loading for images. This ensures the site loads quickly and provides a seamless experience for visitors, even with slow internet connections.',
            dialogText3: '',
            github: <a target='_blank' rel='noreferrer' href='https://github.com/FredrikHaugen/haugendesign'>GitHub</a>,
            page: <a target='_blank' rel='noreferrer' href="https://www.haugendesign.net">Demo</a>,
            name: 'current portfolio',
        },
        {
            id: 6,
            src: oldPage,
            dialogImg1: '',
            dialogImg2: oldPage2,
            dialogImg3: '',
            dialogImg4: '',
            dialogImg5: '',
            dialogText1: 'This project showcases my previous portfolio, which was designed and developed using HTML, SCSS, and JavaScript. The website\'s layout and functionality bear similarities to my current active portfolio, displaying my skills and versatility as a web developer',
            dialogText2: 'The previous portfolio was structured as a single-page application, featuring a user-friendly navigation bar on the right side for easy access to various sections. Additionally, it incorporated a light and dark mode switch, catering to users preferences and enhancing the overall browsing experience.',
            dialogText3: '',
            github: <a target='_blank' rel='noreferrer' href='https://github.com/FredrikHaugen/old-portfolio'>GitHub</a>,
            page: <a target='_blank' rel='noreferrer' href='https://my-old-portfolio.web.app'>Demo</a>,
            name: 'old portfolio',
        },
        {
            id: 7,
            src: unsplashPortfolio,
            dialogImg1: '',
            dialogImg2: unsplashPortfolio,
            dialogImg3: '',
            dialogImg4: '',
            dialogImg5: '',
            dialogText1: 'In this collaborative project, I had the opportunity to work alongside the talented photographer Kazuo Ota. The primary goal was to create a bespoke portfolio that seamlessly aligned with his unique style of photography, showcasing his exceptional work.',
            dialogText2: 'To achieve this, I adopted a minimalistic design approach, featuring a pristine white background that accentuated the high-contrast colors in both the text and images. This design choice not only provided a clean and modern aesthetic, but it also allowed Kazuo Ota\'s  photography to take the main focus of the viewer.',
            dialogText3: '',
            github: <a target='_blank' rel='noreferrer' href='https://github.com/FredrikHaugen/unsplashPortfolio'>GitHub</a>,
            page: <a target='_blank' rel='noreferrer' href='https://test-unsplash-portfolio.web.app/'>Demo</a>,
            name: 'Kazuo Ota portfolio',
        },
        {
            id: 8,
            src: iMessage,
            dialogImg2: iMessage2,
            dialogText1: 'This Python program uses the Apple iMessage app and OpenAI to automatically generate responses to messages. It does this by setting up variables and constants to store information about the chat and responses, defining functions to fetch messages and generate responses, and entering a loop to check for new messages and send automated responses.',
            dialogText2: 'The end result is a tool that allows users to automate the process of responding to iMessage messages by using machine learning to generate pre-written responses. This project could be useful for anyone who wants to save time and effort while still being responsive to their iMessage contacts.',
            dialogText3: 'This project is available for public use and can be easily cloned free of charge from my GitHub. By cloning the project, users can make use of the automated response capabilities for their own iMessage conversations, saving time and effort in managing message exchanges.',
            github: <a target='_blank' rel='noreferrer' href='https://github.com/FredrikHaugen/imessage_chatbot_openai'>GitHub</a>,
            name: 'OpenAI + iMessage',
        },
        {
            id: 9,
            src: moody,
            dialogImg1: '',
            dialogImg2: '',
            dialogImg3: '',
            dialogImg4: '',
            dialogImg5: '',
            dialogText1: 'Moody is an upcoming app that aims to help users track their mood and daily activities to gain insights into their emotions and behavior patterns. The app will allow users to log their mood and add notes about their daily activities.',
            dialogText2: 'The goal of Moody is to help users become more self-aware and make positive changes in their lives. By tracking their mood and activities, users will be able to identify triggers that affect their emotional state and develop strategies to manage them.',
            dialogText3: 'Moody will be designed with a user-friendly interface to make it easy for users to track their mood and activities. Overall, Moody aims to be a powerful tool for anyone who wants to better understand and manage their emotions.',
            name: 'Mood-logger app (ongoing)',
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
                    backgroundColor: 'transparent',
                    boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.5)',
                    border: '0px solid transparent',
                    position: 'relative',
                    overflow: 'auto',
                    '-ms-overflow-style': 'none',
                    scrollbarWidth: 'none',
                    '&::-webkit-scrollbar': {
                        display: 'none'
                    },
                    '-webkit-overflow-scrolling': 'touch',
                    width: '80vw' // add this line to set the width
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
                        <path stroke="#333" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 6L6 18M6 6l12 12" />
                    </svg>

                </button>

                {selectedItem && (
                    <div key={selectedItem.id} className=' bg-gray-800 border-none'>
                        <div>
                            <p className='text-3xl text-center capitalize py-2 ' style={{ color: '#ddd' }}>{selectedItem.name}</p>

                        </div>
                        <div className='p-2'><p className=' font-light text-secondary'>{selectedItem.dialogText1}</p></div>
                        <img src={selectedItem.src} alt="portfolioImage" className='p-2' />
                        <hr className='mx-2' style={{ borderColor: 'transparent' }} />
                        <img src={selectedItem.dialogImg1} alt="" className='p-2' />
                        <div className='p-2'><p className=' font-light text-secondary'>{selectedItem.dialogText2}</p></div>
                        <img src={selectedItem.dialogImg2} alt="" className='p-2' />
                        <hr className='mx-2' style={{ borderColor: 'transparent' }} />
                        <div className='w-full grid grid-cols-2 gap-4 text-center p-2'>
                            <img src={selectedItem.dialogImg3} alt="" className='' />
                            <img src={selectedItem.dialogImg4} alt="" className='' />
                            <img src={selectedItem.dialogImg5} alt="" className='' />
                            
                        </div>
                        <div className='p-2'><p className=' text-center font-light text-secondary'>{selectedItem.dialogText3}</p></div>
                        
                        <div className=' flex items-center justify-center'>
                            <button className=' w-1/2 px-6 py-3 m-4 duration-300 lg:hover:scale-105 md:sm:hover:scale-100 hover:text-amber text-[#eee] bg-[rgba(0,0,0,0.2)] hover:bg-background2 rounded-md'>{selectedItem.page}{selectedItem.picture}</button>
                            <button className=' w-1/2 px-6 py-3 m-4 duration-300 lg:hover:scale-105 md:sm:hover:scale-100 hover:text-amber text-[#eee] bg-[rgba(0,0,0,0.2)] hover:bg-background2 rounded-md'>{selectedItem.github}{selectedItem.behance}</button>
                        </div>
                    </div>
                )}
            </Dialog>

            {/* Refactor code!!! */}

        </div>
    )
}

export default Portfolio
