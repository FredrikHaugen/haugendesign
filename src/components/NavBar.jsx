import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-scroll';

const links = [
  { id: 1, link: 'home' },
  { id: 2, link: 'about' },
  { id: 3, link: 'portfolio' },
  { id: 4, link: 'experience' },
  { id: 5, link: 'contact' },
];

const NavLinks = ({ onClick }) => (
  <ul className="hidden md:flex">
    {links.map(({ id, link }) => (
      <li
        key={id}
        className="px-4 cursor-pointer text-lg font-light text-gray-400 hover:scale-105 duration-200"
      >
        <Link to={link} smooth duration={500} onClick={onClick}>
          {link}
        </Link>
      </li>
    ))}
  </ul>
);

const MobileNavLinks = ({ onClick }) => (
  <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-background to-background2 text-gray-400">
    {links.map(({ id, link }) => (
      <li key={id} className="px-4 cursor-pointer py-6 text-4xl font-light">
        <Link to={link} smooth duration={500} onClick={onClick}>
          {link}
        </Link>
      </li>
    ))}
  </ul>
);

const NavBar = () => {
  const [navOpen, setNavOpen] = useState(false);

  const handleNavClick = () => setNavOpen((open) => !open);
  const handleLinkClick = () => setNavOpen(false);

  return (
    <nav className="flex justify-between items-center w-full h-20 text-primary bg-background fixed px-4 z-10">
      <div>
        <h1 className="text-3xl ml-2 font-extralight text-amber">haugendesign</h1>
      </div>

      <NavLinks onClick={handleLinkClick} />

      <div
        onClick={handleNavClick}
        className="cursor-pointer pr-4 z-10 text-gray-400 md:hidden"
      >
        {navOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>

      {navOpen && <MobileNavLinks onClick={handleLinkClick} />}
    </nav>
  );
};

export default NavBar;
