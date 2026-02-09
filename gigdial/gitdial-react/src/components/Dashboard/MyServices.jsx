import React, { useState } from 'react';
import {
    Plus, Edit2, Trash2, Eye, EyeOff, Star, Clock, Tag,
    CheckCircle, AlertCircle, MoreVertical, Wrench, Search
} from 'lucide-react';

const ServiceCard = ({ service }) => (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-[0_8px_30px_-6px_rgba(0,0,0,0.1)] transition-all duration-300 group relative">
        <div className="flex justify-between items-start mb-4">
            <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <Wrench size={24} strokeWidth={2} />
                </div>
                <div>
                    <h3 className="font-bold text-lg text-slate-800 leading-tight mb-1">{service.title}</h3>
                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                        <Tag size={14} />
                        <span>{service.category}</span>
                    </div>
                </div>
            </div>
            <div className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${service.isActive ? 'bg-green-50 text-green-600 border-green-100' : 'bg-slate-50 text-slate-500 border-slate-200'}`}>
                {service.isActive ? 'Active' : 'Inactive'}
            </div>
        </div>

        <p className="text-slate-600 text-sm mb-6 leading-relaxed line-clamp-2">
            {service.description}
        </p>

        <div className="flex items-center gap-4 text-sm font-medium text-slate-500 mb-6">
            <span className="flex items-center gap-1.5">
                <span className="text-slate-800 font-bold">₹{service.price}</span>
            </span>
            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
            <span className="flex items-center gap-1.5">
                <Clock size={14} />
                {service.duration}
            </span>
            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
            <span className="flex items-center gap-1.5 text-orange-500">
                <Star size={14} fill="currentColor" />
                <span className="text-slate-800 font-bold">{service.rating}</span>
                <span className="text-slate-400 font-normal">({service.reviews})</span>
            </span>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
            {service.tags.map((tag, index) => (
                <span key={index} className="px-2 py-1 bg-slate-50 border border-slate-100 rounded-md text-[10px] uppercase font-bold text-slate-500 tracking-wide">
                    {tag}
                </span>
            ))}
        </div>

        <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-primary transition-colors">
                    {service.isVisible ? <CheckCircle size={16} className="text-green-500" /> : <EyeOff size={16} />}
                    {service.isVisible ? 'Visible' : 'Hidden'}
                </button>
            </div>
            <div className="flex gap-2">
                <button className="p-2 hover:bg-slate-50 text-slate-400 hover:text-blue-600 rounded-lg transition-colors" title="Edit">
                    <Edit2 size={18} />
                </button>
                <button className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-lg transition-colors" title="Delete">
                    <Trash2 size={18} />
                </button>
            </div>
        </div>
    </div>
);

const MyServices = () => {
    const services = [
        {
            id: 1,
            title: 'Tap Repair & Installation',
            category: 'Plumbing',
            description: 'Professional tap repair and installation services. Fix leaking taps, install new fixtures, and ensure proper water flow. Quick response for emergency repairs.',
            price: '299 - 799',
            duration: '1-2 hours',
            rating: 4.9,
            reviews: 45,
            isActive: true,
            isVisible: true,
            tags: ['Emergency Available', 'Same Day Service', 'Eco-Friendly']
        },
        {
            id: 2,
            title: 'Pipe Installation',
            category: 'Plumbing',
            description: 'Complete pipe installation and repair services for residential and commercial properties. Leak detection, pipe replacement, and preventive maintenance.',
            price: '599 - 2,499',
            duration: '2-4 hours',
            rating: 5.0,
            reviews: 32,
            isActive: true,
            isVisible: true,
            tags: ['Licensed', 'Warranty Included']
        },
        {
            id: 3,
            title: 'Water Tank Cleaning',
            category: 'Cleaning',
            description: 'Thorough cleaning and sanitization of overhead and underground water tanks. Removal of sludge, bacteria, and impurities using modern equipment.',
            price: '999',
            duration: '3-4 hours',
            rating: 4.8,
            reviews: 28,
            isActive: false,
            isVisible: false,
            tags: ['Mechanized Cleaning', 'Anti-Bacterial Treatment']
        }
    ];

    return (
        <div className="space-y-8 animate-fade-in max-w-6xl mx-auto pb-20">
            {/* Header with Background */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600">
                            <Wrench size={16} />
                        </span>
                        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Service Management</span>
                    </div>
                    <h1 className="text-3xl font-display font-bold text-slate-900 mb-2">My Services</h1>
                    <p className="text-slate-500 text-lg opacity-90 max-w-lg">
                        Manage the services you offer to customers. Keep your listings updated for better visibility.
                    </p>
                </div>
                <div className="relative z-10">
                    <button className="flex items-center gap-2 bg-primary hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-blue-200 transition-all active:scale-95 group">
                        <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                        Add New Service
                    </button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-center items-center text-center">
                    <span className="text-3xl font-bold text-slate-800 mb-1">5</span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Services</span>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-center items-center text-center">
                    <span className="text-3xl font-bold text-slate-800 mb-1">2</span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Inactive</span>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-center items-center text-center">
                    <span className="text-3xl font-bold text-green-600 mb-1">156</span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Bookings</span>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-center items-center text-center">
                    <span className="text-3xl font-bold text-orange-500 mb-1 flex items-center gap-1">
                        4.9 <Star size={20} fill="currentColor" />
                    </span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Avg Rating</span>
                </div>
            </div>

            {/* Service List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {services.map(service => (
                    <ServiceCard key={service.id} service={service} />
                ))}
            </div>
        </div>
    );
};

export default MyServices;
