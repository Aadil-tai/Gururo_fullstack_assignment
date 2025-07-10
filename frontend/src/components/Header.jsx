import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineMenuAlt3, HiOutlineX } from 'react-icons/hi';

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    return (
        <header className="sticky top-6 z-50 flex justify-center">
            <div className=" w-[90%] md:max-w-6xl backdrop-blur-md bg-secondary border border-white/20 shadow-md rounded-full px-6 py-4 flex justify-between items-center transition-all">

                <div className="lg:hidden">
                    <button onClick={toggleMenu} className="text-white text-2xl">
                        {isMobileMenuOpen ? <HiOutlineX /> : <HiOutlineMenuAlt3 />}
                    </button>
                </div>
                <ul className="lg:flex hidden  gap-6 text-sm font-medium text-white">
                    <li><a href="#home" className="hover:text-primary transition">Home</a></li>
                    <li><a href="#about" className="hover:text-primary transition">About</a></li>
                    <li><a href="#contact" className="hover:text-primary transition">Contact us</a></li>
                </ul>

                <Link to="/" className="text-2xl font-bold text-white mx-auto md:mx-0">
                    <span className="text-white">Give</span>
                    <span className="text-primary">Life</span>
                </Link>


                <Link to="/donate" className="hidden md:block">
                    <button className="bg-primary hover:bg-secondary text-white px-5 py-2 rounded-full transition">
                        Donate
                    </button>
                </Link>
            </div>


            {isMobileMenuOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleMenu}>
                    <div
                        className="fixed top-0 right-0 w-64 h-[50%] bg-secondary text-white p-6 shadow-lg z-50 flex flex-col gap-6"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button onClick={toggleMenu} className="self-end text-2xl">
                            <HiOutlineX />
                        </button>
                        <a href="#home" className="hover:text-primary" onClick={toggleMenu}>Home</a>
                        <a href="#about" className="hover:text-primary" onClick={toggleMenu}>About</a>
                        <a href="#contact" className="hover:text-primary" onClick={toggleMenu}>Contact us</a>

                        <Link to="/donate" onClick={toggleMenu}>
                            <button className="bg-primary mt-4 w-full py-2 rounded-full">
                                Donate
                            </button>
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
