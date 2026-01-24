import React, { useState, useEffect } from 'react';
import { Search, Menu, X, User, LogIn } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const location = useLocation();
    const isHomePage = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 40); // Updated threshold
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Find Services', path: '/services' },
        { name: 'Join as Pro', path: '/register' },
        { name: 'How it Works', path: '#' },
    ];

    return (
        <>
            <header
                className={`sticky top-0 z-40 w-full transition-all duration-300 ${isScrolled
                    ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm py-2'
                    : 'bg-white hover:bg-white border-b border-transparent py-4'
                    }`}
            >
                <div className="container mx-auto px-6">
                    <div className="flex items-center justify-between gap-4">

                        {/* Logo */}
                        <Link to="/" className="flex-shrink-0 group flex items-center gap-2.5">
                            <img src="/logo.png" alt="GigDial" className="h-20 w-auto object-contain group-hover:scale-105 transition-transform" />
                        </Link>

                        {/* Navigation (Desktop) */}
                        <div className="hidden lg:flex items-center gap-1 bg-slate-50 p-1.5 rounded-full border border-slate-200/50">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className="px-5 py-2 rounded-full text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-white hover:shadow-sm transition-all"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        {/* Search Bar (Conditionally Visible) */}
                        <div className={`hidden md:block flex-1 max-w-sm mx-4 transition-all duration-300 ${isScrolled || !isHomePage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
                            <div className="relative w-full group">
                                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Search services..."
                                    className="w-full bg-slate-100 border border-transparent focus:bg-white focus:border-primary/20 outline-none py-2.5 pl-10 pr-4 text-sm font-medium text-slate-700 placeholder:text-slate-400 rounded-full transition-all"
                                />
                            </div>
                        </div>

                        {/* Right Interface */}
                        <div className="flex items-center gap-3">
                            <Link to="/login" className="hidden sm:flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-primary transition-colors px-3">
                                Log In
                            </Link>
                            <Link to="/register" className="btn-primary py-2.5 px-6 text-sm rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 flex items-center gap-2 group transform active:scale-95 transition-all">
                                <span>Sign Up</span>
                                <User size={16} className="opacity-80 group-hover:opacity-100" />
                            </Link>

                            {/* Mobile Menu Btn */}
                            <button
                                className="lg:hidden p-2.5 text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                                onClick={() => setIsMobileMenuOpen(true)}
                            >
                                <Menu size={24} />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[60]"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 bottom-0 w-[300px] bg-white z-[70] shadow-2xl flex flex-col p-6"
                        >
                            <div className="flex justify-between items-center mb-8 border-b border-slate-50 pb-6">
                                <div className="flex items-center gap-2">
                                    <img src="/logo.png" alt="GigDial" className="h-16 w-auto object-contain" />
                                </div>
                                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-slate-50 rounded-full text-slate-500">
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto space-y-2">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        to={link.path}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="block p-4 rounded-2xl text-lg font-semibold text-slate-600 hover:bg-slate-50 hover:text-primary transition-all"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>

                            <div className="space-y-4 pt-6 border-t border-slate-50">
                                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="flex justify-center w-full py-3.5 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-colors">
                                    Log In
                                </Link>
                                <Link to="/register" onClick={() => setIsMobileMenuOpen(false)} className="flex justify-center gap-2 w-full py-3.5 rounded-xl bg-primary text-white font-bold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20">
                                    Sign Up Free
                                </Link>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;
