import React, { useState } from 'react';
import { Plus, Play, Pause, CreditCard, Calendar, Clock, User, ChevronRight, Sparkles, Utensils, Zap, Trash2, ArrowRight } from 'lucide-react';

const CustomerSubscriptions = () => {
    const [subscriptions, setSubscriptions] = useState([
        {
            id: 1,
            title: 'Weekly Home Cleaning',
            price: '₹2,499',
            interval: '/ month',
            status: 'Active',
            schedule: 'Every Friday, 10:00 AM',
            provider: 'Sunita Desai',
            nextVisit: 'Oct 18, 2024',
            icon: Sparkles,
            color: 'blue'
        },
        {
            id: 2,
            title: 'Daily Cook Service',
            price: '₹4,000',
            interval: '/ month',
            status: 'Paused',
            schedule: 'Mon-Sat, 7:00 PM',
            provider: 'Any Available',
            pausedSince: 'Oct 1, 2024',
            icon: Utensils,
            color: 'orange'
        }
    ]);

    const handleStatusChange = (id, newStatus) => {
        setSubscriptions(subscriptions.map(sub =>
            sub.id === id ? { ...sub, status: newStatus } : sub
        ));
    };

    return (
        <div className="space-y-8 animate-fade-in pb-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-display font-bold text-slate-900">My Subscriptions</h1>
                    <p className="text-slate-500 mt-1">Manage your recurring services and plans</p>
                </div>
                <button className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl shadow-lg shadow-green-500/20 transition-all flex items-center gap-2 transform hover:-translate-y-0.5">
                    <Plus size={20} strokeWidth={3} />
                    <span>New Subscription</span>
                </button>
            </div>

            {/* Subscriptions Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {subscriptions.map((sub) => (
                    <div key={sub.id} className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
                        {/* Status Badge */}
                        <div className={`absolute top-6 right-6 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${sub.status === 'Active'
                                ? 'bg-green-50 text-green-600'
                                : 'bg-orange-50 text-orange-600'
                            }`}>
                            <span className={`w-2 h-2 rounded-full ${sub.status === 'Active' ? 'bg-green-500' : 'bg-orange-500'}`}></span>
                            {sub.status}
                        </div>

                        {/* Icon & Title */}
                        <div className="flex items-start gap-5 mb-6">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${sub.color === 'blue' ? 'bg-blue-50 text-blue-500' : 'bg-orange-50 text-orange-500'
                                }`}>
                                <sub.icon size={28} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 mb-1">{sub.title}</h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-2xl font-bold text-slate-800">{sub.price}</span>
                                    <span className="text-sm text-slate-400 font-medium">{sub.interval}</span>
                                </div>
                            </div>
                        </div>

                        {/* Details */}
                        <div className="space-y-4 mb-8">
                            <div className="flex items-center gap-3 text-slate-600">
                                <Calendar size={18} className="text-slate-400" />
                                <span className="font-medium">{sub.schedule}</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-600">
                                <User size={18} className="text-slate-400" />
                                <span className="font-medium">Preferred: {sub.provider}</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-600">
                                <Clock size={18} className="text-slate-400" />
                                <span className="font-medium">
                                    {sub.status === 'Active' ? `Next Visit: ${sub.nextVisit}` : `Paused since ${sub.pausedSince}`}
                                </span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-4 pt-6 border-t border-slate-50">
                            {sub.status === 'Active' ? (
                                <>
                                    <button className="flex-1 py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 group/btn">
                                        Reschedule
                                    </button>
                                    <button
                                        onClick={() => handleStatusChange(sub.id, 'Paused')}
                                        className="flex-1 py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 transition-all flex items-center justify-center gap-2"
                                    >
                                        <Pause size={18} /> Pause
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={() => handleStatusChange(sub.id, 'Active')}
                                        className="flex-1 py-3 bg-white border-2 border-green-500 text-green-600 font-bold rounded-xl hover:bg-green-50 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Play size={18} fill="currentColor" /> Resume
                                    </button>
                                    <button className="flex-1 py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-red-500/20">
                                        <Trash2 size={18} /> Cancel
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                ))}

                {/* Upsell Card */}
                <div className="bg-gradient-to-br from-indigo-600 to-violet-600 rounded-[2rem] p-8 text-white flex flex-col justify-between shadow-lg shadow-indigo-500/20 relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300 cursor-pointer">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-white/20 transition-colors"></div>

                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-6">
                            <Zap size={24} className="text-yellow-300" fill="currentColor" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Get GigDial Plus+</h3>
                        <p className="text-indigo-100 mb-6">Save flat 15% on all subscriptions and get priority support.</p>
                    </div>

                    <div className="relative z-10 flex items-center justify-between mt-auto pt-8 border-t border-white/10">
                        <span className="font-bold text-lg">₹499 / year</span>
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-indigo-600 shadow-sm group-hover:translate-x-1 transition-transform">
                            <ArrowRight size={20} strokeWidth={3} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerSubscriptions;
