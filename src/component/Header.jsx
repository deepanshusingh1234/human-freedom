import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/Logo-with-Text.png';

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { id: 'home', label: 'HOME', path: '/' },
        { id: 'about', label: 'ABOUT US', path: '/about' },
        { id: 'contact', label: 'CONTACT US', path: '/contact' },
        { id: 'blog', label: 'BLOG', path: '/blog' },
        { id: 'faq', label: 'FAQ', path: '/faq' }
    ];

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className="header w-full bg-linear-to-b from-gray-50 to-white">
            <div className="container mx-auto px-4 py-4">
                <div className="flex flex-col lg:flex-row items-center justify-center lg:space-x-12 relative">
                    {/* Logo - Centered with nav items on desktop */}
                    <div className="flex items-center space-x-2 mb-4 lg:mb-0">
                        <NavLink to="/">
                            <img
                                src={logo}
                                alt="Logo"
                                className="h-10 w-auto md:h-18"
                            />
                        </NavLink>
                    </div>

                    {/* Desktop Navigation Menu - Centered with logo */}
                    <nav className="hidden md:flex items-center space-x-2">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.id}
                                to={item.path}
                                className={({ isActive }) =>
                                    `relative px-4 py-2 font-medium text-sm transition-all duration-200 ${isActive
                                        ? 'text-white'
                                        : 'text-[#ffcd00] hover:text-[#ffcd00]/80'
                                    }`
                                }
                                end={item.path === '/'}
                            >
                                {({ isActive }) => (
                                    <>
                                        <span className="relative z-10">
                                            {item.label}
                                        </span>
                                        {isActive && (
                                            <span className="absolute inset-0 bg-[#ffcd00] rounded-md shadow-sm transform scale-105"></span>
                                        )}
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </nav>

                    {/* Mobile Menu Button - Right aligned on mobile */}
                    <button
                        className="md:hidden absolute right-0 top-1/2 transform -translate-y-1/2 flex flex-col justify-center items-center w-10 h-10 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all duration-300"
                        onClick={toggleMobileMenu}
                        aria-label="Toggle menu"
                    >
                        <span className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                        <span className={`w-6 h-0.5 bg-gray-700 my-1.5 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                        <span className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
                    </button>
                </div>

                {/* Mobile Navigation Menu */}
                <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${isMobileMenuOpen ? 'max-h-96 mt-4' : 'max-h-0'}`}>
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.id}
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center px-4 py-3 my-1 rounded-lg transition-all duration-300 ${isActive
                                        ? 'bg-gradient-to-r from-[#ffcd00]/10 to-[#ffcd00]/5 text-gray-900 border-l-4 border-[#ffcd00]'
                                        : 'text-gray-700 hover:bg-gray-50 hover:border-l-4 hover:border-gray-200'
                                    }`
                                }
                                end={item.path === '/'}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {({ isActive }) => (
                                    <>
                                        <span className={`font-medium ${isActive ? 'text-[#ffcd00]' : ''}`}>
                                            {item.label}
                                        </span>
                                        {isActive && (
                                            <span className="ml-auto w-2 h-2 bg-[#ffcd00] rounded-full animate-pulse"></span>
                                        )}
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </div>
                </div>
            </div>
        </header>
    );
}