import React from 'react';
import { FaLinkedin, FaGithub, FaBehance } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-b to-background2 from-background w-full py-10">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between items-center">
                    <div className="w-full md:w-1/2 mb-4 md:mb-0 text-white flex justify-center items-center">
                        <a href="mailto:fredrik@haugendesign.net"><p className="font-light">fredrik@haugendesign.net</p></a>
                    </div>
                    <div className="w-full md:w-1/2 mb-4 md:mb-0">
                        <div className="flex justify-center items-center">
                            <div className="flex space-x-4">
                                <a href="https://www.linkedin.com/in/fredrik-haugen/" className="hover:scale-105 ease-in-out duration-500" target="_blank" rel="noopener noreferrer">
                                    <FaLinkedin size={40} className="hover:fill-amber ease-in-out duration-500 fill-white" />
                                </a>
                                <a href="https://github.com/FredrikHaugen" className="hover:scale-105 ease-in-out duration-500" target="_blank" rel="noopener noreferrer">
                                    <FaGithub size={40} className="hover:fill-amber ease-in-out duration-500 fill-white" />
                                </a>
                                <a href="https://www.behance.net/fredrikhaugen" className="hover:scale-105 ease-in-out duration-500" target="_blank" rel="noopener noreferrer">
                                    <FaBehance size={40} className="hover:fill-amber fill-white ease-in-out duration-500" />
                                </a>
                                <a href="mailto:fredrik@haugendesign.net" className="hover:scale-105 ease-in-out duration-500" target="_blank" rel="noopener noreferrer">
                                    <HiMail size={40} className="hover:fill-amber fill-white ease-in-out duration-500" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-4 text-center text-sm text-white pt-10">
                    <p>©2023 haugendesign. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
