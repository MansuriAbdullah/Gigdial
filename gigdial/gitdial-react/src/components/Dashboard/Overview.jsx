import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    DollarSign, User, TrendingUp, TrendingDown,
    CheckCircle, Clock, MapPin, Phone, X, Briefcase, Info,
    Star, ArrowRight
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const StatCard = ({ title, value, change, isPositive, icon: Icon, color, index }) => (
    <div className="relative overflow-hidden bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-6px_rgba(0,0,0,0.1)] transition-all duration-300 group">
        <div className={`absolute top-0 right-0 w-32 h-32 bg-${color.replace('bg-', '')}-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-50 group-hover:opacity-100 transition-opacity duration-500`}></div>

        <div className="relative">
            <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-xl ${color} bg-opacity-10 backdrop-blur-sm flex items-center justify-center text-${color.replace('bg-', '')}-600 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                    <Icon size={24} />
                </div>
                {change && (
                    <span className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full border ${isPositive ? 'bg-green-50 text-green-600 border-green-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
                        {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                        {change}
                    </span>
                )}
            </div>
            <h3 className="text-3xl font-display font-bold text-slate-800 mb-1 tracking-tight">{value}</h3>
            <p className="text-slate-500 font-medium text-sm">{title}</p>
        </div>
    </div>
);

const LeadCard = ({ lead }) => (
    <div className="group bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-[0_8px_30px_-6px_rgba(0,0,0,0.1)] transition-all duration-300 animate-slide-up relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-slate-200 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <div className="flex flex-col md:flex-row justify-between gap-6">
            <div className="flex-1">
                <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                            <Briefcase size={22} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-slate-800 leading-tight group-hover:text-primary transition-colors">{lead.service}</h3>
                            <div className="flex mt-1 gap-2">
                                {lead.isUrgent && (
                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-red-50 text-red-600 border border-red-100 uppercase tracking-wide">
                                        Urgent
                                    </span>
                                )}
                                {lead.isNew && !lead.isUrgent && (
                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-100 uppercase tracking-wide">
                                        New
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className="block text-lg font-bold text-slate-900">{lead.budget}</span>
                        <span className="text-xs text-slate-400 font-medium">Est. Budget</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 bg-slate-50/50 rounded-xl border border-slate-100/50">
                    <div className="space-y-2">
                        <div className="flex items-start gap-2.5">
                            <User size={16} className="text-slate-400 mt-0.5" />
                            <div>
                                <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Customer</p>
                                <p className="text-sm font-semibold text-slate-700">{lead.customer}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-2.5">
                            <Clock size={16} className="text-slate-400 mt-0.5" />
                            <div>
                                <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Posted</p>
                                <p className="text-sm font-semibold text-slate-700">{lead.time}</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-start gap-2.5">
                            <MapPin size={16} className="text-slate-400 mt-0.5" />
                            <div>
                                <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Location</p>
                                <p className="text-sm font-semibold text-slate-700">{lead.location}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-3">
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-gradient-to-r from-secondary to-green-600 hover:to-green-700 text-white px-8 py-3 rounded-xl font-bold text-sm transition-all shadow-lg shadow-green-200 active:scale-95 hover:-translate-y-0.5">
                        <Phone size={18} />
                        Accept & Call
                    </button>
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border-2 border-slate-100 hover:border-slate-300 text-slate-700 px-6 py-3 rounded-xl font-bold text-sm transition-all hover:bg-slate-50">
                        <Info size={18} />
                        Details
                    </button>
                    <button className="flex-none p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all border border-transparent hover:border-red-100" title="Decline">
                        <X size={20} />
                    </button>
                </div>
            </div>
        </div>
    </div>
);

const Overview = () => {
    const navigate = useNavigate();

    const revenueData = [
        { name: 'Mon', revenue: 4000 },
        { name: 'Tue', revenue: 3000 },
        { name: 'Wed', revenue: 2000 },
        { name: 'Thu', revenue: 2780 },
        { name: 'Fri', revenue: 1890 },
        { name: 'Sat', revenue: 2390 },
        { name: 'Sun', revenue: 3490 },
    ];

    const newLeads = [
        {
            id: 1,
            service: 'Kitchen Sink Repair',
            customer: 'Priya Mehta',
            location: 'Satellite, Ahmedabad',
            time: '2 hours ago',
            budget: '₹500-800',
            isUrgent: true,
            isNew: false
        },
        {
            id: 2,
            service: 'Bathroom Plumbing',
            customer: 'Amit Sharma',
            location: 'Vastrapur, Ahmedabad',
            time: '5 hours ago',
            budget: 'Negotiable',
            isUrgent: false,
            isNew: true
        }
    ];

    return (
        <div className="space-y-10 animate-fade-in max-w-7xl mx-auto pb-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 bg-gradient-to-r from-blue-900 to-blue-800 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -mr-20 -mt-20"></div>

                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="bg-white/20 backdrop-blur-md text-white/90 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-white/10">
                            Dashboard
                        </span>
                        <span className="flex items-center gap-1.5 text-green-300 text-xs font-bold">
                            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                            Online
                        </span>
                    </div>
                    <h1 className="text-4xl font-display font-bold mb-2">Welcome back, Rajesh!</h1>
                    <p className="text-blue-100 text-lg opacity-90 max-w-md">You have <strong className="text-white">2 new leads</strong> waiting for your response today.</p>
                </div>

                <div className="relative z-10 flex items-center gap-4">
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 min-w-[140px]">
                        <p className="text-blue-200 text-xs font-semibold uppercase tracking-wider mb-1">Total Earnings</p>
                        <p className="text-2xl font-bold">₹35,240</p>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="New Leads Today"
                    value="18"
                    change="+15% from yesterday"
                    isPositive={true}
                    icon={Briefcase}
                    color="bg-primary"
                    index={0}
                />
                <StatCard
                    title="Rating"
                    value="4.8"
                    change="120 reviews"
                    isPositive={true}
                    icon={Star}
                    color="bg-orange-500"
                    index={1}
                />
                <StatCard
                    title="This Month's Earnings"
                    value="₹35,240"
                    change="+22% from last month"
                    isPositive={true}
                    icon={DollarSign}
                    color="bg-secondary"
                    index={2}
                />
                <StatCard
                    title="Total Jobs"
                    value="156"
                    change="+12 this month"
                    isPositive={true}
                    icon={Clock}
                    color="bg-purple-500"
                    index={3}
                />
            </div>

            <div className="flex flex-col gap-8">
                {/* Leads Section */}
                <div className="w-full space-y-6">
                    <div className="flex justify-between items-center px-2">
                        <h2 className="text-2xl font-display font-bold text-slate-800 flex items-center gap-3">
                            New Leads
                            <span className="bg-red-100 text-red-600 text-sm font-bold w-6 h-6 flex items-center justify-center rounded-full shadow-inner">{newLeads.length}</span>
                        </h2>
                        <button
                            onClick={() => navigate('leads')}
                            className="group flex items-center gap-1 text-sm font-bold text-primary hover:text-blue-700 transition-colors"
                        >
                            View All Leads
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    <div className="space-y-5">
                        {newLeads.map(lead => (
                            <LeadCard key={lead.id} lead={lead} />
                        ))}

                        {newLeads.length === 0 && (
                            <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200">
                                <Briefcase size={48} className="mx-auto text-slate-200 mb-3" />
                                <h3 className="text-lg font-bold text-slate-600">No new leads right now</h3>
                                <p className="text-slate-400">Check back later for new opportunities</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Overview;
