import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Search, Menu, X, User, LogIn, Globe, ChevronDown, LayoutDashboard, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
    const [langOpen, setLangOpen] = useState(false);
    const { language, setLanguage, t } = useLanguage();
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const location = useLocation();
    const isHomePage = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 40); // Updated threshold
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (location.hash) {
            const element = document.getElementById(location.hash.substring(1));
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    }, [location]);

    const navLinks = [
        { name: t('findServices'), path: '/services' },
        { name: t('joinAsPro'), path: '/register' },
        { name: t('howItWorks'), path: '/how-it-works' },
        { name: t('requireWorker'), path: '/require-worker' },
    ];

    return (
        <>
            <header
                className={`sticky top-0 z-40 w-full transition-all duration-300 ${isScrolled
                    ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm py-0.5'
                    : 'bg-white hover:bg-white border-b border-transparent py-0.5'
                    }`}
            >
                <div className="container mx-auto px-6">
                    <div className="flex items-center justify-between gap-4">

                        {/* Logo */}
                        <Link to="/" className="flex-shrink-0 group flex items-center gap-2.5">
                            <img src="/images/gigdial-logo.png" alt="GigDial" className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain group-hover:scale-105 transition-transform" />
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
                                    placeholder={t('searchServices')}
                                    className="w-full bg-slate-100 border border-transparent focus:bg-white focus:border-primary/20 outline-none py-2.5 pl-10 pr-4 text-sm font-medium text-slate-700 placeholder:text-slate-400 rounded-full transition-all"
                                />
                            </div>
                        </div>

                        {/* Right Interface */}
                        <div className="flex items-center gap-3">
                            {/* Language Toggle */}
                            <div className="relative hidden lg:block">
                                <button
                                    onClick={() => setLangOpen(!langOpen)}
                                    className="flex items-center gap-1.5 px-3 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-full transition-all"
                                >
                                    <Globe size={18} />
                                    <span>{language}</span>
                                    <ChevronDown size={14} className={`transition-transform ${langOpen ? 'rotate-180' : ''}`} />
                                </button>

                                <AnimatePresence>
                                    {langOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="absolute top-full right-0 mt-2 w-32 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden py-1"
                                        >
                                            {[
                                                { code: 'EN', label: 'English' },
                                                { code: 'HI', label: 'हिंदी' },
                                                { code: 'GU', label: 'ગુજરાતી' }
                                            ].map((lang) => (
                                                <button
                                                    key={lang.code}
                                                    onClick={() => {
                                                        setLanguage(lang.code);
                                                        setLangOpen(false);
                                                    }}
                                                    className={`w-full text-left px-4 py-2 text-sm font-medium hover:bg-slate-50 transition-colors flex justify-between items-center ${language === lang.code ? 'text-primary bg-blue-50' : 'text-slate-600'}`}
                                                >
                                                    {lang.label}
                                                    {language === lang.code && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                                                </button>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {user ? (
                                <div className="hidden lg:flex items-center gap-3">
                                    <Link 
                                        to={user.isWorker ? "/worker-dashboard" : "/customer-dashboard"}
                                        className="btn-primary py-2.5 px-6 text-sm rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 flex items-center gap-2 group transition-all"
                                    >
                                        <LayoutDashboard size={16} />
                                        <span>{t('dashboard') || 'Dashboard'}</span>
                                    </Link>
                                    <button 
                                        onClick={logout}
                                        className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                                        title="Logout"
                                    >
                                        <LogOut size={20} />
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <Link to="/login" state={{ from: location }} className="hidden lg:flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-primary transition-colors px-3">
                                        {t('login')}
                                    </Link>
                                    <Link to="/register" className="hidden lg:flex btn-primary py-2.5 px-6 text-sm rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 items-center gap-2 group transform active:scale-95 transition-all">
                                        <span>{t('signup')}</span>
                                        <User size={16} className="opacity-80 group-hover:opacity-100" />
                                    </Link>
                                </>
                            )}

                            {/* Mobile Search Btn */}
                            <button
                                className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                                onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
                            >
                                <Search size={20} />
                            </button>

                            {/* Mobile Menu Btn */}
                            <button
                                className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                                onClick={() => setIsMobileMenuOpen(true)}
                            >
                                <Menu size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Mobile Search Bar */}
                    <AnimatePresence>
                        {isMobileSearchOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="md:hidden overflow-hidden border-t border-slate-100"
                            >
                                <div className="py-4">
                                    <div className="relative w-full">
                                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input
                                            type="text"
                                            placeholder={t('searchServices')}
                                            className="w-full bg-slate-100 border border-transparent focus:bg-white focus:border-primary/20 outline-none py-3 pl-10 pr-4 text-sm font-medium text-slate-700 placeholder:text-slate-400 rounded-xl transition-all"
                                            autoFocus
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
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
                                    <img src="/images/gigdial-logo.png" alt="GigDial" className="h-16 w-auto object-contain" />
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

                                {/* Mobile Language Selector */}
                                <div className="p-4 rounded-2xl bg-slate-50 mt-4">
                                    <p className="text-xs font-bold text-slate-400 uppercase mb-3 px-1">{t('language')}</p>
                                    <div className="flex gap-2">
                                        {[
                                            { code: 'EN', label: 'English' },
                                            { code: 'HI', label: 'हिंदी' },
                                            { code: 'GU', label: 'ગુજરાતી' }
                                        ].map((lang) => (
                                            <button
                                                key={lang.code}
                                                onClick={() => {
                                                    setLanguage(lang.code);
                                                    setIsMobileMenuOpen(false);
                                                }}
                                                className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${language === lang.code ? 'bg-white shadow-sm text-primary' : 'text-slate-500 hover:text-slate-900'}`}
                                            >
                                                {lang.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                                {user ? (
                                    <div className="space-y-3">
                                        <Link 
                                            to={user.isWorker ? "/worker-dashboard" : "/customer-dashboard"}
                                            onClick={() => setIsMobileMenuOpen(false)} 
                                            className="flex justify-center gap-2 w-full py-3.5 rounded-xl bg-primary text-white font-bold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20"
                                        >
                                            <LayoutDashboard size={18} />
                                            {t('dashboard') || 'Dashboard'}
                                        </Link>
                                        <button 
                                            onClick={() => {
                                                logout();
                                                setIsMobileMenuOpen(false);
                                            }}
                                            className="flex justify-center w-full py-3.5 rounded-xl border border-red-100 text-red-500 font-bold hover:bg-red-50 transition-colors"
                                        >
                                            <LogOut size={18} className="mr-2" />
                                            {t('logout') || 'Logout'}
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <Link to="/login" state={{ from: location }} onClick={() => setIsMobileMenuOpen(false)} className="flex justify-center w-full py-3.5 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-colors">
                                            {t('login')}
                                        </Link>
                                        <Link to="/register" onClick={() => setIsMobileMenuOpen(false)} className="flex justify-center gap-2 w-full py-3.5 rounded-xl bg-primary text-white font-bold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20">
                                            {t('signupFree')}
                                        </Link>
                                    </>
                                )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;
