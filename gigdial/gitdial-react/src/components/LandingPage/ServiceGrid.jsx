import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Service icons using SVG paths to match mockup style
const services = [
    {
        name: 'Plumber',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
                <path d="M12 2a5 5 0 0 1 5 5v3H7V7a5 5 0 0 1 5-5z" /><rect x="7" y="10" width="10" height="12" rx="2" />
            </svg>
        ),
        bg: 'bg-blue-50', color: 'text-blue-500'
    },
    {
        name: 'Electrician',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
        ),
        bg: 'bg-yellow-50', color: 'text-yellow-500'
    },
    {
        name: 'AC Repair',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
                <rect x="2" y="7" width="20" height="10" rx="2" /><path d="M6 17v2M10 17v2M14 17v2M18 17v2M6 7V5M12 7V4M18 7V5" />
            </svg>
        ),
        bg: 'bg-cyan-50', color: 'text-cyan-500'
    },
    {
        name: 'AC Repair',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
                <rect x="2" y="7" width="20" height="10" rx="2" /><path d="M6 17v2M10 17v2M14 17v2M18 17v2M6 7V5M12 7V4M18 7V5" />
            </svg>
        ),
        bg: 'bg-cyan-50', color: 'text-cyan-500'
    },
    {
        name: 'Painter',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
                <path d="M2 12h20M2 6h20M2 18h12" /><circle cx="19" cy="18" r="3" />
            </svg>
        ),
        bg: 'bg-pink-50', color: 'text-pink-500'
    },
    {
        name: 'Cleaning',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
                <path d="M3 21l7-7M12 8l4-4 4 4-4 4-4-4zM5 12l7 7" /><path d="M14 4l6 6" />
            </svg>
        ),
        bg: 'bg-green-50', color: 'text-green-500'
    },
    {
        name: 'RO Service',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" /><path d="M12 6v6l4 2" />
            </svg>
        ),
        bg: 'bg-indigo-50', color: 'text-indigo-500'
    },
    {
        name: 'See All Services',
        isViewAll: true,
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
                <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
        ),
        bg: 'bg-slate-100', color: 'text-slate-500'
    },
];

const ServiceGrid = () => {
    const navigate = useNavigate();

    return (
        <section className="py-14" style={{ backgroundColor: '#eef2f7' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-1">45+ Services Available</h2>
                    <p className="text-slate-500 font-semibold text-sm">Most popular and frequently booked services</p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {services.map((service, index) => (
                        service.isViewAll ? (
                            <motion.button
                                key={index}
                                whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}
                                onClick={() => navigate('/services')}
                                className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col items-center justify-center gap-3 hover:border-slate-300 transition-all min-h-[120px]"
                            >
                                <div className={`w-10 h-10 rounded-xl ${service.bg} ${service.color} flex items-center justify-center`}>
                                    {service.icon}
                                </div>
                                <span className="text-sm font-black text-slate-700">{service.name}</span>
                            </motion.button>
                        ) : (
                            <motion.div
                                key={index}
                                whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}
                                className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col gap-3 transition-all"
                            >
                                {/* Top: Icon + Name */}
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-xl ${service.bg} ${service.color} flex items-center justify-center shrink-0`}>
                                        {service.icon}
                                    </div>
                                    <span className="text-slate-900 font-black text-sm">{service.name}</span>
                                </div>

                                {/* Two Book Now Buttons */}
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => navigate('/services')}
                                        className="flex-1 py-1.5 text-[11px] font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors"
                                    >
                                        Book Now
                                    </button>
                                    <button
                                        onClick={() => navigate('/services')}
                                        className="flex-1 py-1.5 text-[11px] font-bold text-white bg-gray-700 hover:bg-gray-800 rounded-lg transition-colors"
                                    >
                                        Book Now
                                    </button>
                                </div>
                            </motion.div>
                        )
                    ))}
                </div>

                {/* View All Button */}
                <div className="flex justify-center">
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => navigate('/services')}
                        className="flex items-center gap-2 px-10 py-3 bg-gradient-to-r from-[#2f5af4] to-[#6049e6] hover:from-[#2143bf] hover:to-[#4a39b3] text-white font-black text-sm rounded-full shadow-lg shadow-indigo-500/30 hover:shadow-xl transition-all"
                    >
                        View All Services →
                    </motion.button>
                </div>
            </div>
        </section>
    );
};

export default ServiceGrid;
