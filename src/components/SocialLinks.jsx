import React from 'react';
import { FaGithub, FaLinkedin, FaBehance } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';

const links = [
  {
    id: 1,
    child: (
      <>
        LinkedIn <FaLinkedin size={30} />
      </>
    ),
    href: 'https://www.linkedin.com/in/fredrik-haugen/',
    style: 'rounded-tr-md',
  },
  {
    id: 2,
    child: (
      <>
        Github <FaGithub size={30} />
      </>
    ),
    href: 'https://github.com/FredrikHaugen',
  },
  {
    id: 3,
    child: (
      <>
        Behance <FaBehance size={30} />
      </>
    ),
    href: 'https://www.behance.net/fredrikhaugen',
  },
  {
    id: 4,
    child: (
      <>
        Contact <HiOutlineMail size={30} />
      </>
    ),
    href: 'mailto:fredrik@haugendesign.net',
    style: 'rounded-br-md',
  },
];

const SocialLink = ({ child, href, style }) => (
  <li
    className="flex justify-between items-center w-40 h-14 px-4 bg-amber ml-[-100px] hover:rounded-lg hover:ml-[-10px] duration-300"
  >
    <a href={href} className="flex justify-between items-center w-full text-background" target="_blank" rel="noreferrer">
      {child}
    </a>
  </li>
);

const SocialLinks = () => (
  <div className="hidden lg:flex flex-col top-[35%] left-0 fixed">
    <ul>
      {links.map(({ id, child, style, href }) => (
        <SocialLink key={id} child={child} href={href} style={style} />
      ))}
    </ul>
  </div>
);

export default SocialLinks;
