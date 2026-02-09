import React, { useState } from 'react';
import {
    Search, Filter, MapPin, Clock, DollarSign, Briefcase,
    User, Phone, Info, X, ChevronDown, SlidersHorizontal,
    ArrowUpRight
} from 'lucide-react';

const LeadCard = ({ lead }) => (
    <div className="group bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-[0_8px_30px_-6px_rgba(0,0,0,0.1)] transition-all duration-300 animate-slide-up relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-slate-200 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <div className="flex flex-col md:flex-row justify-between gap-6">
            <div className="flex-1">
                <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl transition-transform group-hover:scale-110 duration-300">
                            <Briefcase size={24} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-slate-800 leading-tight group-hover:text-primary transition-colors">{lead.service}</h3>
                            <div className="flex mt-1.5 gap-2">
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
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200 uppercase tracking-wide">
                                    {lead.distance}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className="block text-xl font-bold text-slate-900 tracking-tight">{lead.budget}</span>
                        <span className="text-xs text-slate-400 font-medium uppercase tracking-wide">Est. Budget</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 bg-slate-50/50 rounded-xl border border-slate-100/50">
                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <div className="mt-0.5 p-1 bg-white rounded-md shadow-sm text-slate-400">
                                <User size={14} />
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Customer</p>
                                <p className="text-sm font-semibold text-slate-700">{lead.customer}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="mt-0.5 p-1 bg-white rounded-md shadow-sm text-slate-400">
                                <Clock size={14} />
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Posted</p>
                                <p className="text-sm font-semibold text-slate-700">{lead.time}</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <div className="mt-0.5 p-1 bg-white rounded-md shadow-sm text-slate-400">
                                <MapPin size={14} />
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Location</p>
                                <p className="text-sm font-semibold text-slate-700 leading-snug">{lead.location}</p>
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
                        View Details
                    </button>
                    <button className="flex-none p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all border border-transparent hover:border-red-100" title="Decline">
                        <X size={20} />
                    </button>
                </div>
            </div>
        </div>
    </div>
);

const JobRequests = () => {
    const [filter, setFilter] = useState('All');

    const leads = [
        {
            id: 1,
            service: 'Kitchen Sink Repair',
            customer: 'Priya Mehta',
            location: 'Satellite, Ahmedabad',
            time: '2 hours ago',
            budget: '₹500-800',
            distance: '2.5 km',
            isUrgent: true,
            isNew: false,
            category: 'Plumbing'
        },
        {
            id: 2,
            service: 'Bathroom Plumbing',
            customer: 'Amit Sharma',
            location: 'Vastrapur, Ahmedabad',
            time: '5 hours ago',
            budget: 'Negotiable',
            distance: '4.1 km',
            isUrgent: false,
            isNew: true,
            category: 'Plumbing'
        },
        {
            id: 3,
            service: 'Full House Cleaning',
            customer: 'Rahul Verma',
            location: 'Bodakdev, Ahmedabad',
            time: '1 day ago',
            budget: '₹2,500',
            distance: '5.2 km',
            isUrgent: false,
            isNew: true,
            category: 'Cleaning'
        },
        {
            id: 4,
            service: 'AC Servicing (Split)',
            customer: 'Sneha Patel',
            location: 'Navrangpura, Ahmedabad',
            time: 'Just now',
            budget: '₹1,200',
            distance: '1.8 km',
            isUrgent: true,
            isNew: true,
            category: 'AC Repair'
        },
        {
            id: 5,
            service: 'Electric Switch Repair',
            customer: 'Vikram Singh',
            location: 'Gota, Ahmedabad',
            time: '3 hours ago',
            budget: '₹300-500',
            distance: '8.0 km',
            isUrgent: false,
            isNew: false,
            category: 'Electrical'
        }
    ];

    const filteredLeads = filter === 'All'
        ? leads
        : filter === 'Urgent'
            ? leads.filter(l => l.isUrgent)
            : filter === 'New'
                ? leads.filter(l => l.isNew)
                : leads;

    return (
        <div className="space-y-8 animate-fade-in max-w-5xl mx-auto pb-20">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -mr-20 -mt-20 opacity-50"></div>

                <div className="relative z-10 w-full md:w-auto">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600">
                            <Briefcase size={16} />
                        </span>
                        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Job Board</span>
                    </div>
                    <h1 className="text-4xl font-display font-bold text-slate-900 mb-2">Job Requests</h1>
                    <p className="text-slate-500 text-lg">
                        You have <strong className="text-primary">{leads.length} active leads</strong> matching your profile.
                    </p>
                </div>

                <div className="relative z-10 flex flex-wrap gap-3 w-full md:w-auto">
                    {['All', 'Urgent', 'New', 'Nearby'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 border ${filter === f
                                    ? 'bg-primary text-white border-primary shadow-lg shadow-blue-200 transform -translate-y-0.5'
                                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                    <button className="px-3 py-2.5 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-colors">
                        <Filter size={20} />
                    </button>
                </div>
            </div>

            {/* Search Bar */}
            <div className="flex gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search by service, location, or customer..."
                        className="w-full bg-white border border-slate-200 pl-12 pr-4 py-4 rounded-2xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-blue-50 transition-all font-medium text-slate-700 placeholder:text-slate-400"
                    />
                </div>
                <button className="hidden md:flex items-center gap-2 bg-white border border-slate-200 px-6 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                    <SlidersHorizontal size={18} />
                    <span>Sort</span>
                    <ChevronDown size={16} className="text-slate-400" />
                </button>
            </div>

            {/* Leads List */}
            <div className="space-y-5">
                {filteredLeads.map(lead => (
                    <LeadCard key={lead.id} lead={lead} />
                ))}
            </div>

            {filteredLeads.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-4">
                        <Search size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-700 mb-2">No jobs found</h3>
                    <p className="text-slate-500">Try adjusting your filters or search terms</p>
                    <button
                        onClick={() => setFilter('All')}
                        className="mt-6 text-primary font-bold hover:underline"
                    >
                        Clear filters
                    </button>
                </div>
            )}
        </div>
    );
};

export default JobRequests;
