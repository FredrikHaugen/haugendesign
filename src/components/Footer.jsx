import React from 'react';
import { FaLinkedin, FaGithub, FaBehance, FaDeviantart } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';
import { SiFiverr, SiUpwork } from 'react-icons/si';

const contactLinks = [
  {
    href: 'mailto:fredrik@haugendesign.net',
    icon: <HiMail size={40} />,
    label: 'fredrik@haugendesign.net',
  },
  {
    href: 'https://www.linkedin.com/in/fredrik-haugen/',
    icon: <FaLinkedin size={40} />,
    label: 'LinkedIn',
  },
  {
    href: 'https://github.com/FredrikHaugen',
    icon: <FaGithub size={40} />,
    label: 'GitHub',
  },
  {
    href: 'https://www.behance.net/fredrikhaugen',
    icon: <FaBehance size={40} color='amber'/>,
    label: 'Behance',
  },
  {
    href: 'https://www.deviantart.com/haugendesign',
    icon: <FaDeviantart size={40} color='amber'/>,
    label: 'DeviantArt',
  },
  {
    href: 'https://www.fiverr.com/haugendesign?up_rollout=true',
    icon: <SiFiverr size={40} color='amber'/>,
    label: 'DeviantArt',
  },
  {
    href: 'https://www.upwork.com/freelancers/~01812eebcbdcfb5666',
    icon: <SiUpwork size={40} color='amber'/>,
    label: 'DeviantArt',
  },
];

const ContactLink = ({ link }) => (
  <a
    href={link.href}
    className="hover:scale-105 ease-in-out duration-500"
    target="_blank"
    rel="noopener noreferrer"
  >
    {link.icon}
  </a>
);

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b to-background2 from-background w-full py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/2 mb-4 md:mb-0 text-white flex justify-center items-center">
            <a href={contactLinks[0].href}>
              <p className="font-light">{contactLinks[0].label}</p>
            </a>
          </div>
          <div className="w-full md:w-1/2 mb-4 md:mb-0">
            <div className="flex justify-center items-center">
              <div className="flex space-x-4">
                {contactLinks.slice(1).map((link, index) => (
                  <ContactLink key={index} link={link} />
                ))}
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
