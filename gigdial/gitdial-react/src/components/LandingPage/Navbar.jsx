import React, { useState } from 'react';
import { MapPin, Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 supports-[backdrop-filter]:bg-white/60 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center cursor-pointer group">
                        <div className="relative">
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-lime-500 bg-clip-text text-transparent group-hover:from-blue-500 group-hover:to-lime-400 transition-all">
                                GigDial
                            </h1>
                            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-lime-500 group-hover:w-full transition-all duration-300"></div>
                        </div>
                    </div>

                    {/* Search Bar - Hidden on mobile, shown on md+ */}
                    <div className="hidden md:flex flex-1 max-w-2xl mx-8">
                        <div className="flex w-full bg-slate-100 hover:bg-slate-200 transition-all rounded-full border border-slate-200 hover:border-slate-300 p-1 group focus-within:ring-2 focus-within:ring-blue-500/50 focus-within:border-blue-500/50 shadow-inner shadow-black/5">
                            <div className="flex items-center px-4 border-r border-slate-300">
                                <MapPin className="w-4 h-4 text-slate-400 mr-2 group-focus-within:text-blue-500 transition-colors" />
                                <select className="bg-transparent text-sm text-slate-600 outline-none cursor-pointer hover:text-slate-900 transition-colors">
                                    <option className="bg-white">Mumbai</option>
                                    <option className="bg-white">Delhi</option>
                                    <option className="bg-white">Bangalore</option>
                                </select>
                            </div>
                            <input
                                type="text"
                                placeholder="Search for services (e.g., Driver, Plumber)..."
                                className="flex-1 bg-transparent px-4 text-sm text-slate-900 placeholder-slate-400 outline-none"
                            />
                            <button className="bg-blue-600 hover:bg-blue-500 text-white rounded-full p-2 px-6 text-sm font-medium transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 active:scale-95">
                                Search
                            </button>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-4">
                        <a href="#" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Find Gigs</a>
                        <a href="#" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Post a Job</a>
                        <a href="#" className="px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-sm font-medium text-slate-900 border border-slate-200 transition-all hover:border-blue-300">
                            Join as Worker
                        </a>
                    </nav>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-slate-600 hover:text-blue-600 p-2"
                        >
                            {isMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-slate-900 border-t border-slate-800 p-4 space-y-4 animate-in slide-in-from-top-2">
                    <div className="flex items-center bg-slate-800/50 rounded-lg p-2 mb-4">
                        <MapPin className="w-4 h-4 text-slate-400 mr-2" />
                        <select className="bg-transparent text-sm text-slate-200 outline-none w-full">
                            <option>Mumbai</option>
                            <option>Delhi</option>
                        </select>
                    </div>
                    <input
                        type="text"
                        placeholder="Search services..."
                        className="w-full bg-slate-800/50 p-2 rounded-lg text-sm text-white border border-slate-700 mb-4"
                    />

                    <a href="#" className="block text-slate-300 hover:text-white py-2">Find Gigs</a>
                    <a href="#" className="block text-slate-300 hover:text-white py-2">Post a Job</a>
                    <a href="#" className="block w-full text-center bg-blue-600 text-white py-2 rounded-lg mt-4">Join as Worker</a>
                </div>
            )}
        </header>
    );
};

export default Navbar;
