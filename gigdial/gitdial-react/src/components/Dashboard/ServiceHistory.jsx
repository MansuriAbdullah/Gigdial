import React, { useState } from 'react';
import { Search, Download, RotateCcw, HelpCircle, Droplets, Wrench, Zap, CheckCircle } from 'lucide-react';

const ServiceHistory = () => {
    const [filter, setFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const services = [
        {
            id: 1,
            title: 'Deep Home Cleaning',
            date: 'Oct 14, 2024',
            provider: 'Rajesh Kumar',
            price: '₹1,499',
            status: 'Completed',
            icon: Droplets,
            iconColor: 'text-blue-500',
            bgColor: 'bg-blue-50'
        },
        {
            id: 2,
            title: 'Plumbing Repair',
            date: 'Sep 28, 2024',
            provider: 'Amit Patel',
            price: '₹450',
            status: 'Completed',
            icon: Wrench,
            iconColor: 'text-amber-500',
            bgColor: 'bg-amber-50'
        },
        {
            id: 3,
            title: 'Electrical Checkup',
            date: 'Sep 10, 2024',
            provider: 'Suresh Singh',
            price: '₹0',
            status: 'Cancelled',
            icon: Zap,
            iconColor: 'text-red-500',
            bgColor: 'bg-red-50'
        },
        {
            id: 4,
            title: 'Sofa Cleaning',
            date: 'Aug 15, 2024',
            provider: 'CleanPro Services',
            price: '₹899',
            status: 'Completed',
            icon: Droplets,
            iconColor: 'text-blue-500',
            bgColor: 'bg-blue-50'
        }
    ];

    const filteredServices = services.filter(service => {
        const matchesFilter = filter === 'All' || service.status === filter;
        const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            service.provider.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <div className="space-y-6 animate-fade-in pb-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 flex-wrap">
                <h1 className="text-3xl font-display font-bold text-slate-900">Service History</h1>
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search services..."
                        className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Filters */}
            <div className="flex gap-2 overflow-x-auto pb-2">
                {['All', 'Completed', 'Cancelled', 'Refunded'].map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-6 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${filter === f
                            ? 'bg-[#0F172A] text-white shadow-md'
                            : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                            }`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* List */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                {filteredServices.length > 0 ? (
                    <div className="divide-y divide-slate-50">
                        {filteredServices.map(service => (
                            <div key={service.id} className="p-6 flex flex-col md:flex-row items-center gap-6 hover:bg-slate-50/50 transition-colors group">
                                {/* Icon */}
                                <div className={`w-16 h-16 ${service.bgColor} rounded-2xl flex items-center justify-center ${service.iconColor} shrink-0`}>
                                    <service.icon size={28} strokeWidth={1.5} />
                                </div>

                                {/* Details */}
                                <div className="flex-1 text-center md:text-left">
                                    <h3 className="text-lg font-bold text-slate-900 mb-1">{service.title}</h3>
                                    <p className="text-slate-500 text-sm font-medium">
                                        {service.date} • {service.provider} • <span className="text-slate-900 font-bold">{service.price}</span>
                                    </p>
                                </div>

                                {/* Status & Actions */}
                                <div className="flex items-center gap-6">
                                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${service.status === 'Completed'
                                        ? 'bg-green-100 text-green-700'
                                        : service.status === 'Cancelled'
                                            ? 'bg-red-100 text-red-700'
                                            : 'bg-slate-100 text-slate-700'
                                        }`}>
                                        {service.status}
                                    </span>

                                    <div className="flex items-center gap-3">
                                        <button className="p-2 text-slate-400 hover:text-primary hover:bg-slate-100 rounded-lg transition-colors" title="Download Invoice">
                                            <Download size={20} />
                                        </button>
                                        {service.status === 'Completed' ? (
                                            <button className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Book Again">
                                                <RotateCcw size={20} />
                                            </button>
                                        ) : (
                                            <button className="p-2 text-slate-400 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-colors" title="Help">
                                                <HelpCircle size={20} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-12 text-center text-slate-400">
                        <p>No services found matching your criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ServiceHistory;
