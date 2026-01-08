import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Users, Mail, FileText, HelpCircle } from 'lucide-react';

export default function Footer() {
    const footerLinks = [
        { title: 'Home', path: '/', icon: <Home className="w-4 h-4" /> },
        { title: 'About Us', path: '/about', icon: <Users className="w-4 h-4" /> },
        { title: 'Contact Us', path: '/contact', icon: <Mail className="w-4 h-4" /> },
        { title: 'Blog', path: '/blog', icon: <FileText className="w-4 h-4" /> },
        { title: 'FAQ', path: '/faq', icon: <HelpCircle className="w-4 h-4" /> }
    ];

    return (
        <footer className="bg-gradient-to-b from-gray-800 to-gray-900 text-white py-10">
            <div className="container mx-auto px-4">
                {/* Main Footer Content */}
                <div className="flex flex-col items-center">
                    {/* Logo/Title */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold bg-[#ffd733] bg-clip-text text-transparent">
                            YourBrand
                        </h2>
                    </div>

                    {/* Navigation Links */}
                    <div className="w-full max-w-2xl mb-8">
                        <h3 className="text-center text-gray-300 font-medium mb-6">
                            Navigation
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            {footerLinks.map((link, index) => (
                                <Link
                                    key={index}
                                    to={link.path}
                                    className="flex flex-col items-center justify-center p-4 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300 hover:scale-105 group"
                                >
                                    <div className="mb-2 text-[#ffd733] group-hover:text-blue-300">
                                        {link.icon}
                                    </div>
                                    <span className="text-sm font-medium">
                                        {link.title}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="mt-8 pt-6 border-t border-gray-700 w-full max-w-lg">
                        <p className="text-center text-gray-400 text-sm">
                            © Copyright 2016. All Rights Reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}