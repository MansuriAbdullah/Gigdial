import React from 'react';
import {
    Clock, CheckCircle, Search, Calendar, MapPin,
    ArrowRight, MessageSquare
} from 'lucide-react';
import { Link } from 'react-router-dom';

const CustomerOverview = () => {
    const upcomingJobs = [
        { id: 'JOB-101', service: 'House Cleaning', provider: 'Sita Devi', date: 'Tomorrow, 10:00 AM', status: 'Confirmed', img: 4 },
        { id: 'JOB-102', service: 'AC Repair', provider: 'Amit Kumar', date: 'Sat, 25 Jan', status: 'Pending', img: 8 },
    ];

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-primary to-primary-light rounded-[2rem] p-8 md:p-12 text-white relative overflow-hidden shadow-xl shadow-primary/20">
                <div className="relative z-10 max-w-xl">
                    <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">Hello, Sanya! 👋</h1>
                    <p className="text-white/80 text-lg mb-8">
                        Your home needs care today? You have 2 upcoming bookings this week.
                    </p>
                    <div className="flex gap-4">
                        <Link to="/services" className="px-6 py-3 bg-white text-primary font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                            Book a Service
                        </Link>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute right-0 bottom-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
                <div className="absolute top-0 right-10 text-white/10 transform rotate-12">
                    <Clock size={200} />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Stats & Active Jobs */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                            <h3 className="text-3xl font-bold text-dark-surface mb-1">12</h3>
                            <p className="text-slate-500 text-sm">Total Bookings</p>
                        </div>
                        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                            <h3 className="text-3xl font-bold text-dark-surface mb-1">₹4.5k</h3>
                            <p className="text-slate-500 text-sm">Spent this Month</p>
                        </div>
                        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hidden md:block">
                            <h3 className="text-3xl font-bold text-dark-surface mb-1">4.9</h3>
                            <p className="text-slate-500 text-sm">Average Rating</p>
                        </div>
                    </div>

                    {/* Upcoming Jobs */}
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-dark-surface">Upcoming Services</h2>
                            <Link to="requests" className="text-primary font-semibold text-sm hover:underline">View All</Link>
                        </div>
                        <div className="space-y-4">
                            {upcomingJobs.map(job => (
                                <div key={job.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-6 group hover:border-primary/30 transition-all">
                                    <div className="w-full md:w-16 h-16 rounded-xl bg-slate-50 overflow-hidden">
                                        <img src={`https://i.pravatar.cc/150?img=${job.img}`} className="w-full h-full object-cover" alt="Provider" />
                                    </div>
                                    <div className="flex-1 text-center md:text-left">
                                        <h4 className="font-bold text-lg text-dark-surface">{job.service}</h4>
                                        <p className="text-slate-500 text-sm">Provider: {job.provider}</p>
                                    </div>

                                    <div className="flex flex-col md:flex-row items-center gap-6 w-full md:w-auto">
                                        <div className="text-center md:text-right">
                                            <div className="font-semibold text-dark-surface">{job.date}</div>
                                            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">{job.status}</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <button className="p-2 rounded-xl text-slate-400 hover:text-primary hover:bg-primary/5 border border-transparent hover:border-primary/20 transition-all">
                                                <MessageSquare size={18} />
                                            </button>
                                            <button className="p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 border border-transparent hover:border-red-100 transition-all">
                                                <Calendar size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Sidebar: Recommended */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                        <h3 className="font-bold text-lg text-dark-surface mb-6">Recommended for you</h3>
                        <div className="space-y-6">
                            {[
                                { title: 'Sofa Cleaning', price: '₹799', img: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80' },
                                { title: 'Kitchen Deep Clean', price: '₹1499', img: 'https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&q=80' }
                            ].map((item, i) => (
                                <div key={i} className="group cursor-pointer">
                                    <div className="h-32 rounded-2xl overflow-hidden mb-3">
                                        <img src={item.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={item.title} />
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h4 className="font-bold text-dark-surface group-hover:text-primary transition-colors">{item.title}</h4>
                                            <p className="text-sm font-semibold text-primary">{item.price}</p>
                                        </div>
                                        <button className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all">
                                            <ArrowRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Link to="/services" className="block w-full text-center py-3 mt-6 rounded-xl border border-slate-100 font-semibold text-sm hover:bg-slate-50 transition-colors">
                            Explore All Services
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerOverview;
