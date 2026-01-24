import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard, Calendar, FileText, Settings, User, LogOut,
    Menu, X, Bell, Search, ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SidebarItem = ({ icon: Icon, label, path, active }) => (
    <Link to={path}>
        <div className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${active ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'text-slate-500 hover:bg-slate-50 hover:text-primary'}`}>
            <Icon size={20} className={active ? '' : 'group-hover:scale-110 transition-transform'} />
            <span className="font-medium">{label}</span>
            {active && <motion.div layoutId="active-pill" className="absolute left-0 w-1 h-8 bg-white/20 rounded-r-full" />}
        </div>
    </Link>
);

const DashboardLayout = ({ children, role = 'worker' }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const location = useLocation();

    const workerLinks = [
        { icon: LayoutDashboard, label: 'Overview', path: '/worker-dashboard' },
        { icon: Calendar, label: 'My Bookings', path: '/worker-dashboard/bookings' },
        { icon: FileText, label: 'Earnings', path: '/worker-dashboard/earnings' },
        { icon: User, label: 'Profile', path: '/worker-dashboard/profile' },
        { icon: Settings, label: 'Settings', path: '/worker-dashboard/settings' },
    ];

    const customerLinks = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/customer-dashboard' },
        { icon: Calendar, label: 'My Requests', path: '/customer-dashboard/requests' },
        { icon: User, label: 'Profile', path: '/customer-dashboard/profile' },
        { icon: Settings, label: 'Settings', path: '/customer-dashboard/settings' },
    ];

    const links = role === 'worker' ? workerLinks : customerLinks;

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex font-sans">
            {/* Sidebar */}
            <aside
                className={`fixed lg:sticky top-0 h-screen bg-white border-r border-slate-100 z-40 transition-all duration-300 flex flex-col ${isSidebarOpen ? 'w-72 translate-x-0' : 'w-20 -translate-x-full lg:translate-x-0 lg:w-20'} shadow-xl lg:shadow-none`}
            >
                {/* Logo Section */}
                <div className="h-20 flex items-center justify-between px-6 border-b border-slate-50">
                    <div className={`flex items-center gap-3 ${!isSidebarOpen && 'lg:justify-center'}`}>
                        <img src="/logo.png" alt="GigDial" className={`h-16 w-auto object-contain transition-transform ${isSidebarOpen ? '' : 'lg:scale-125'}`} />
                    </div>
                    <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-400"><X size={20} /></button>
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
                <div className="p-4 border-t border-slate-50">
                    <div className={`flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 ${!isSidebarOpen && 'justify-center'}`}>
                        <img src="https://i.pravatar.cc/150?img=11" className="w-10 h-10 rounded-full border-2 border-white shadow-sm shrink-0" alt="User" />
                        {isSidebarOpen && (
                            <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-bold text-dark-surface truncate">Rahul Kumar</h4>
                                <p className="text-xs text-slate-500 truncate">Pro Worker</p>
                            </div>
                        )}
                        <Link to="/login" className="text-slate-400 hover:text-red-500 transition-colors">
                            <LogOut size={18} />
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top Header */}
                <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-30 px-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors">
                            <Menu size={20} />
                        </button>
                        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl border border-slate-100 focus-within:ring-2 focus-within:ring-primary/20 transition-all w-96">
                            <Search size={18} className="text-slate-400" />
                            <input type="text" placeholder="Search bookings, invoices..." className="bg-transparent border-none outline-none text-sm w-full font-medium text-slate-600 placeholder:text-slate-400" />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="relative p-2.5 rounded-xl bg-white border border-slate-100 text-slate-500 hover:text-primary hover:border-primary/30 transition-all shadow-sm">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                        </button>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
