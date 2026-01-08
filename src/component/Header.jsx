import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/Logo-with-Text.png';

export default function Header() {
    const navItems = [
        { id: 'home', label: 'HOME', path: '/' },
        { id: 'about', label: 'ABOUT US', path: '/about' },
        { id: 'contact', label: 'CONTACT US', path: '/contact' },
        { id: 'blog', label: 'BLOG', path: '/blog' },
        { id: 'faq', label: 'FAQ', path: '/faq' }
    ];

    return (
        <header className="header w-full bg-linear-to-b from-gray-50 to-white  ">
            <div className="container mx-auto px-4 py-4">
                <div className="flex flex-col lg:flex-row items-center justify-center lg:space-x-12">
                    <div className="flex items-center space-x-2">
                        <NavLink to="/">
                            <img
                                src={logo}
                                alt="Logo"
                                className="h-10 w-auto md:h-18"
                            />
                        </NavLink>
                    </div>

                    {/* Navigation Menu */}
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
                </div>
            </div>
        </header>
    );
}