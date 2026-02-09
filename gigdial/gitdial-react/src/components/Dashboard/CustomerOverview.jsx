import React from 'react';
import {
    Clock, CheckCircle, Search, Calendar, MapPin,
    ArrowRight, MessageSquare, Phone, CreditCard, Wallet, ChevronRight, Star, MoreVertical
} from 'lucide-react';
import { Link } from 'react-router-dom';

const CustomerOverview = () => {
    return (
        <div className="space-y-8 animate-fade-in pb-10">
            {/* Welcome Banner */}
            <div className="bg-[#0F172A] rounded-[2rem] p-8 md:p-12 text-white relative overflow-hidden shadow-xl shadow-slate-900/10">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/30 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>

                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                        <h1 className="text-3xl md:text-4xl text-white font-display font-bold mb-2">Hello, Sanya! 👋</h1>
                        <p className="text-slate-300 text-lg">
                            Your home needs care today? You have <span className="text-white font-bold">2 upcoming bookings</span> this week.
                        </p>
                    </div>
                    <Link to="services" className="px-8 py-4 bg-white text-slate-900 font-bold rounded-2xl shadow-lg hover:shadow-white/20 transition-all transform hover:-translate-y-1 flex items-center gap-2">
                        <span>Book a Service</span>
                        <ArrowRight size={20} />
                    </Link>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                            <Calendar size={24} />
                        </div>
                        <span className="text-xs font-bold bg-slate-100 text-slate-500 px-2 py-1 rounded-full">Total</span>
                    </div>
                    <h3 className="text-3xl font-bold text-slate-800 mb-1">12</h3>
                    <p className="text-slate-500 font-medium">Total Bookings</p>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl">
                            <Wallet size={24} />
                        </div>
                        <span className="text-xs font-bold bg-slate-100 text-slate-500 px-2 py-1 rounded-full">Monthly</span>
                    </div>
                    <h3 className="text-3xl font-bold text-slate-800 mb-1">₹4.5k</h3>
                    <p className="text-slate-500 font-medium">Spent this Month</p>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-green-50 text-green-600 rounded-2xl">
                            <CheckCircle size={24} />
                        </div>
                        <span className="text-xs font-bold bg-slate-100 text-slate-500 px-2 py-1 rounded-full">Lifetime</span>
                    </div>
                    <h3 className="text-3xl font-bold text-slate-800 mb-1">14</h3>
                    <p className="text-slate-500 font-medium">Jobs Completed</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Active Bookings & Messages */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Active Bookings */}
                    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-slate-800">Active Bookings</h2>
                            <button className="text-primary font-semibold text-sm hover:underline">View All</button>
                        </div>
                        <div className="p-6">
                            <div className="border border-slate-100 rounded-3xl p-6 relative overflow-hidden group hover:border-primary/20 transition-all">
                                <div className="absolute top-0 right-0 px-4 py-2 bg-blue-50 text-blue-600 font-bold text-xs rounded-bl-2xl">
                                    IN PROGRESS
                                </div>

                                <div className="flex flex-col md:flex-row gap-6 mb-6">
                                    <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
                                        <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-800 mb-1">Plumbing Repair</h3>
                                        <p className="text-slate-500 text-sm mb-2">Worker: <span className="font-semibold text-slate-800">Rajesh Kumar</span> • <Star size={12} fill="currentColor" className="text-amber-400 inline mb-0.5" /> 4.8</p>
                                        <p className="text-slate-400 text-xs font-medium">Scheduled: Tomorrow, 2:00 PM</p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-3">
                                    <button className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors">
                                        <Phone size={16} /> Call
                                    </button>
                                    <button className="flex-1 bg-white border border-slate-200 hover:border-primary/50 text-slate-700 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all">
                                        <MessageSquare size={16} /> Message
                                    </button>
                                    <button className="flex-1 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all">
                                        <MapPin size={16} /> Track
                                    </button>
                                    <button className="flex-1 bg-gradient-to-r from-primary to-primary-light text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
                                        <CheckCircle size={16} /> Complete Job
                                    </button>
                                </div>
                            </div>

                            <div className="mt-6 space-y-4">
                                <h3 className="font-bold text-slate-800 text-lg">All Bookings</h3>
                                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-transparent hover:border-slate-200 transition-all cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-800">Plumbing Repair</h4>
                                            <p className="text-slate-500 text-xs">Rajesh Kumar • Tomorrow, 2:00 PM</p>
                                        </div>
                                    </div>
                                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-lg">IN PROGRESS</span>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-transparent hover:border-slate-200 transition-all cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-accent shadow-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-800">House Painting</h4>
                                            <p className="text-slate-500 text-xs">Amit Sharma • Quote: ₹12,000</p>
                                        </div>
                                    </div>
                                    <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-lg">PENDING QUOTE</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-slate-800">Messages</h2>
                        </div>
                        <div className="space-y-4">
                            {[
                                { name: 'Rajesh Kumar', msg: "I'll be there by 2 PM tomorrow. Please keep...", time: '10 min ago', initials: 'RK', color: 'bg-blue-100 text-blue-600' },
                                { name: 'Amit Sharma', msg: "Quote updated to ₹12,000. Includes premium...", time: '1 hour ago', initials: 'AS', color: 'bg-indigo-100 text-indigo-600' },
                                { name: 'Sunita Desai', msg: "Thank you for the 5-star review! Happy to...", time: '2 days ago', initials: 'SD', color: 'bg-pink-100 text-pink-600' },
                            ].map((msg, i) => (
                                <div key={i} className="flex items-start gap-4 p-4 hover:bg-slate-50 rounded-2xl transition-colors cursor-pointer group">
                                    <div className={`w-12 h-12 rounded-2xl ${msg.color} flex items-center justify-center font-bold text-sm flex-shrink-0`}>
                                        {msg.initials}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between mb-1">
                                            <h4 className="font-bold text-slate-800 group-hover:text-primary transition-colors">{msg.name}</h4>
                                            <span className="text-xs text-slate-400 font-medium">{msg.time}</span>
                                        </div>
                                        <p className="text-slate-500 text-sm line-clamp-1">{msg.msg}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Favorite Workers */}
                    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-slate-800">Favorite Workers</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                                { name: 'Rajesh Kumar', role: 'Plumber', rating: '4.8', icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg> },
                                { name: 'Suresh Patel', role: 'Electrician', rating: '4.9', icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg> },
                                { name: 'Sunita Desai', role: 'Cleaning', rating: '5.0', icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4" /><path d="m16.2 7.8 2.9-2.9" /><path d="M18 12h4" /><path d="m16.2 16.2 2.9 2.9" /><path d="M12 18v4" /><path d="m4.9 19.1 2.9-2.9" /><path d="M2 12h4" /><path d="m4.9 4.9 2.9 2.9" /></svg> }
                            ].map((worker, i) => (
                                <div key={i} className="border border-slate-100 rounded-2xl p-4 text-center hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all cursor-pointer">
                                    <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-primary mx-auto mb-3">
                                        {worker.icon}
                                    </div>
                                    <h4 className="font-bold text-slate-800 text-sm">{worker.name}</h4>
                                    <p className="text-slate-500 text-xs mb-3">{worker.role} • {worker.rating}</p>
                                    <button className="w-full py-2 bg-secondary hover:bg-secondary-dark text-white rounded-lg text-xs font-bold transition-colors">
                                        Book Now
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Right Column: Wallet & Transactions */}
                <div className="lg:col-span-1 space-y-8">

                    {/* Payments & Wallet */}
                    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-6">
                        <h3 className="font-bold text-lg text-slate-800 mb-6">Payments & Wallet</h3>

                        {/* Credit Card Visual */}
                        <div className="bg-[#0F172A] rounded-2xl p-6 text-white relative overflow-hidden shadow-lg mb-6 group cursor-pointer hover:scale-[1.02] transition-transform">
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>

                            <div className="relative z-10">
                                <div className="flex justify-between items-center mb-8">
                                    <CreditCard size={24} className="opacity-80" />
                                    <span className="font-display font-bold italic opacity-80">VISA</span>
                                </div>
                                <div className="mb-6">
                                    <p className="font-mono text-xl tracking-widest opacity-90">•••• •••• •••• 4242</p>
                                </div>
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Card Holder</p>
                                        <p className="font-medium">Priya Mehta</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Expires</p>
                                        <p className="font-medium">12/25</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button className="w-full py-3 border border-slate-200 rounded-xl font-bold text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                            <span className="text-2xl leading-none font-light mb-0.5">+</span> Add Payment Method
                        </button>
                    </div>

                    {/* Recent Transactions */}
                    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-6">
                        <h3 className="font-bold text-lg text-slate-800 mb-6">Recent Transactions</h3>
                        <div className="space-y-6">
                            {[
                                { title: 'Deep Cleaning Service', date: 'Nov 28, 2025', amount: '-₹2,500', type: 'debit' },
                                { title: 'Electrical Repair', date: 'Nov 20, 2025', amount: '-₹1,800', type: 'debit' },
                                { title: 'Wallet Topup', date: 'Nov 15, 2025', amount: '+₹5,000', type: 'credit' },
                            ].map((tx, i) => (
                                <div key={i} className="flex justify-between items-center pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                                    <div>
                                        <h4 className="font-bold text-sm text-slate-800">{tx.title}</h4>
                                        <p className="text-xs text-slate-400">{tx.date}</p>
                                    </div>
                                    <span className={`font-bold text-sm ${tx.type === 'credit' ? 'text-green-500' : 'text-red-500'}`}>
                                        {tx.amount}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Settings Preview */}
                    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-6">
                        <h3 className="font-bold text-lg text-slate-800 mb-6">Settings</h3>

                        <div className="space-y-6">
                            <div>
                                <h4 className="font-bold text-sm text-slate-800 mb-2">Account Settings</h4>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-sm font-medium text-slate-700">Email Notifications</p>
                                            <p className="text-xs text-slate-400">Receive booking updates</p>
                                        </div>
                                        <div className="w-10 h-6 bg-green-500 rounded-full relative cursor-pointer">
                                            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-sm font-medium text-slate-700">SMS Notifications</p>
                                            <p className="text-xs text-slate-400">Get SMS alerts</p>
                                        </div>
                                        <div className="w-10 h-6 bg-green-500 rounded-full relative cursor-pointer">
                                            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-slate-100">
                                <h4 className="font-bold text-sm text-slate-800 mb-4">Account Actions</h4>
                                <div className="flex gap-2">
                                    <button className="flex-1 py-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-2">
                                        Edit Profile
                                    </button>
                                    <button className="flex-1 py-2 border border-red-100 text-red-500 rounded-lg text-xs font-bold hover:bg-red-50 flex items-center justify-center gap-2">
                                        Delete Account
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerOverview;
