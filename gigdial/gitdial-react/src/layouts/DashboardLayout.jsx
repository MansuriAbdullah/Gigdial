import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard, Calendar, FileText, Settings, User, LogOut,
    Menu, X, Bell, Search, ChevronDown, Repeat, MessageSquare, Heart, CreditCard, MapPin, Gift, Award, Briefcase, Wrench, Globe,
    Users, CheckCircle, DollarSign, AlertCircle, CheckSquare, Image, Scale, Shield, BarChart2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const SidebarItem = ({ icon: Icon, label, path, active, onClick }) => (
    <Link to={path} onClick={onClick}>
        <div className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${active ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'text-slate-500 hover:bg-slate-50 hover:text-primary'}`}>
            <Icon size={20} className={active ? '' : 'group-hover:scale-110 transition-transform'} />
            <span className="font-medium">{label}</span>
            {active && <motion.div layoutId="active-pill" className="absolute left-0 w-1 h-8 bg-white/20 rounded-r-full" />}
        </div>
    </Link>
);

const DashboardLayout = ({ children, role = 'worker' }) => {
    // Initial state based on screen size
    const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);
    const [langOpen, setLangOpen] = useState(false);
    const location = useLocation();
    const { user, logout } = useAuth();
    const { language, setLanguage, t } = useLanguage();

    // Auto-close sidebar on mobile when route changes
    useEffect(() => {
        if (window.innerWidth < 1024) {
            setSidebarOpen(false);
        }
    }, [location.pathname]);

    // Handle resize events
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setSidebarOpen(true);
            } else {
                setSidebarOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const workerLinks = [
        { icon: LayoutDashboard, label: t('overview'), path: '/worker-dashboard' },
        { icon: Briefcase, label: t('jobRequests'), path: '/worker-dashboard/leads' },
        { icon: Wrench, label: t('myServices'), path: '/worker-dashboard/services' },
        { icon: MessageSquare, label: t('messages'), path: '/worker-dashboard/messages' },
        { icon: Calendar, label: t('myBookings'), path: '/worker-dashboard/bookings' },
        { icon: FileText, label: t('earnings'), path: '/worker-dashboard/earnings' },
        { icon: User, label: t('profile'), path: '/worker-dashboard/profile' },
        { icon: Settings, label: t('settings'), path: '/worker-dashboard/settings' },
    ];

    const customerLinks = [
        { icon: LayoutDashboard, label: t('dashboard'), path: '/customer-dashboard' },
        { icon: Search, label: t('browseServices'), path: '/customer-dashboard/browse-services' },
        { icon: Users, label: 'Browse Workers', path: '/customer-dashboard/browse-workers' },
        { icon: Calendar, label: t('serviceHistory'), path: '/customer-dashboard/service-history' },
        { icon: Heart, label: t('favorites'), path: '/customer-dashboard/favourites' },
        { icon: CreditCard, label: t('wallet'), path: '/customer-dashboard/wallet' },
        { icon: MapPin, label: t('savedAddresses'), path: '/customer-dashboard/addresses' },
        { icon: Gift, label: t('referEarn'), path: '/customer-dashboard/refer-earn' },
    ];

    const adminLinks = [
        { icon: LayoutDashboard, label: t('dashboard'), path: '/admin' },
        { icon: Briefcase, label: t('manageWorkers'), path: '/admin/workers' },
        { icon: Users, label: t('manageCustomers'), path: '/admin/customers' },
        { icon: Calendar, label: t('bookings'), path: '/admin/bookings' },
        { icon: DollarSign, label: 'Withdrawals', path: '/admin/withdrawals' },
        { icon: Scale, label: t('disputes'), path: '/admin/disputes' },
        { icon: BarChart2, label: t('analytics'), path: '/admin/analytics' },
        { icon: CheckSquare, label: t('services'), path: '/admin/services' },
        { icon: FileText, label: t('content'), path: '/admin/content' },
        { icon: MapPin, label: 'Cities', path: '/admin/cities' },
        { icon: Settings, label: t('settings'), path: '/admin/settings' },
    ];

    let links;
    if (role === 'worker') links = workerLinks;
    else if (role === 'admin') links = adminLinks;
    else links = customerLinks;

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex font-sans relative">
            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isSidebarOpen && window.innerWidth < 1024 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSidebarOpen(false)}
                        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-30 lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <aside
                className={`fixed lg:sticky top-0 h-screen bg-white border-r border-slate-100 z-40 transition-all duration-300 flex flex-col ${isSidebarOpen ? 'w-72 translate-x-0' : 'w-0 -translate-x-full lg:w-20 lg:translate-x-0'} shadow-2xl lg:shadow-none overflow-hidden`}
            >
                {/* Logo Section */}
                <div className="h-20 flex items-center justify-between px-6 border-b border-slate-50 shrink-0">
                    <div className={`flex items-center gap-3 ${!isSidebarOpen && 'lg:justify-center'}`}>
                        <img src="/logo.png" alt="GigDial" className={`h-16 w-auto object-contain transition-transform ${isSidebarOpen ? '' : 'lg:scale-125'}`} />
                    </div>
                    <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-2 hover:bg-slate-50 rounded-full text-slate-400">
                        <X size={20} />
                    </button>
                </div>

                {/* Nav Links */}
                <div className="flex-1 py-6 px-4 space-y-2 overflow-y-auto custom-scrollbar">
                    {links.map((link) => (
                        <SidebarItem
                            key={link.path}
                            {...link}
                            active={location.pathname === link.path}
                        />
                    ))}
                </div>

                {/* User Snippet */}
                <div className="p-4 border-t border-slate-50 shrink-0">
                    <div className={`flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 ${!isSidebarOpen && 'lg:justify-center'}`}>
                        <img
                            src={user?.profileImage || "https://i.pravatar.cc/150?img=11"}
                            className="w-10 h-10 rounded-full border-2 border-white shadow-sm shrink-0 object-cover"
                            alt="User"
                        />
                        <div className={`flex-1 min-w-0 transition-opacity duration-200 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 lg:hidden'}`}>
                            <h4 className="text-sm font-bold text-dark-surface truncate">{user?.name || 'Guest'}</h4>
                            <p className="text-xs text-slate-500 truncate capitalize">{user?.isAdmin ? 'Administrator' : (user?.isProvider ? 'Service Provider' : 'Customer')}</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="text-red-500 hover:text-red-600 hover:bg-red-50 transition-all p-2 rounded-lg group"
                            title="Logout"
                        >
                            <LogOut size={18} className="group-hover:scale-110 transition-transform" />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
                {/* Top Header */}
                <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-30 px-4 md:px-6 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors">
                            <Menu size={20} />
                        </button>
                        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl border border-slate-100 focus-within:ring-2 focus-within:ring-primary/20 transition-all w-64 lg:w-96">
                            <Search size={18} className="text-slate-400" />
                            <input type="text" placeholder="Search..." className="bg-transparent border-none outline-none text-sm w-full font-medium text-slate-600 placeholder:text-slate-400" />
                        </div>
                    </div>

                    <div className="flex items-center gap-2 md:gap-4">
                        {/* Mobile Search Icon */}
                        <button className="md:hidden p-2.5 rounded-xl bg-white border border-slate-100 text-slate-500 hover:text-primary transition-all">
                            <Search size={20} />
                        </button>

                        {/* Language Toggle */}
                        <div className="relative hidden md:block">
                            <button
                                onClick={() => setLangOpen(!langOpen)}
                                className="flex items-center gap-1.5 px-3 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-full transition-all border border-slate-100 bg-white"
                            >
                                <Globe size={18} />
                                <span className="hidden sm:inline">{language}</span>
                                <ChevronDown size={14} className={`transition-transform ${langOpen ? 'rotate-180' : ''}`} />
                            </button>

                            <AnimatePresence>
                                {langOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute top-full right-0 mt-2 w-32 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden py-1 z-50"
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
                                                {language === lang.code && <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Notification Bell */}
                        <button className="relative p-2.5 rounded-xl bg-white border border-slate-100 text-slate-500 hover:text-primary hover:border-primary/30 transition-all shadow-sm">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                        </button>

                        {/* Logout Button */}
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-3 md:px-4 py-2.5 rounded-xl bg-red-50 border border-red-100 text-red-600 hover:bg-red-100 hover:border-red-200 transition-all shadow-sm font-medium group"
                            title="Logout"
                        >
                            <LogOut size={18} className="group-hover:scale-110 transition-transform" />
                            <span className="hidden sm:inline text-sm font-bold">Logout</span>
                        </button>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-4 lg:p-8 pb-24 overflow-y-auto w-full">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
