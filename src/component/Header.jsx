// components/Header.jsx
import React from 'react';
import logo from '../assets/Logo-with-Text.png';

export default function Header({ activePage, setActivePage }) {
    const navItems = [
        { id: 'home', label: 'HOME' },
        { id: 'about', label: 'ABOUT US' },
        { id: 'contact', label: 'CONTACT US' },
        { id: 'blog', label: 'BLOG' },
        { id: 'faq', label: 'FAQ' }
    ];

    const handleNavClick = (itemId) => {
        setActivePage(itemId);
    };

    return (
        <header className="header w-full bg-white shadow-sm ">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-center md:justify-between">
                    <div className="flex items-center space-x-2">
                        <img
                            src={logo}
                            alt="Logo"
                            className="h-10 w-auto md:h-12"
                        />
                    </div>

                    {/* Navigation Menu */}
                    <nav className="hidden md:flex items-center space-x-2">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => handleNavClick(item.id)}
                                className={`relative px-4 py-2 font-medium text-sm transition-all duration-200 ${activePage === item.id
                                    ? 'text-white'
                                    : 'text-[#ffcd00] hover:text-[#ffcd00]/80'
                                    }`}
                            >
                                <span className="relative z-10">
                                    {item.label}
                                </span>
                                {activePage === item.id && (
                                    <span className="absolute inset-0 bg-[#ffcd00] rounded-md shadow-sm transform scale-105"></span>
                                )}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>
        </header>
    );
}