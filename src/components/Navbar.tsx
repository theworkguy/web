import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#about' },
    { name: 'Books', href: '#books' },
    { name: 'Movies', href: '#movies' },
    { name: 'Media', href: '#media' },
    { name: 'Shop', href: '#shop' },
    { name: 'Book John', href: '#book-john' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/90 backdrop-blur-sm shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-center md:justify-between items-center py-4 relative">
          <a 
            href="https://johnalite.com"
            reloadDocument
            className="text-2xl font-heading font-bold text-white tracking-wider"
          >
            <span className="text-primary neon-glow">JOHN</span> ALITE
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-white hover:text-primary transition-colors duration-300 font-medium uppercase"
                {...(link.name === 'Home' ? { 'aria-current': 'page' } : {})}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Navigation Toggle */}
          <button
            className="md:hidden text-white focus:outline-none absolute right-4 top-1/2 transform -translate-y-1/2"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden fixed inset-x-0 top-[64px] bg-black transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className="flex flex-col space-y-6 px-6 py-8 h-screen">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-white hover:text-primary hover:bg-primary/10 transition-colors duration-300 px-4 py-2 text-xl uppercase rounded-md"
                onClick={() => setIsOpen(false)}
                {...(link.name === 'Home' ? { 'aria-current': 'page' } : {})}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;