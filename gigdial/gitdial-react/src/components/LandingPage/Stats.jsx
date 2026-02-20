import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, MapPin, Percent } from 'lucide-react';

const Stats = () => {
    const stats = [
        { label: 'Service Categories', value: '45+', icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Verified Workers', value: '10k+', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { label: 'Cities Covered', value: '12', icon: MapPin, color: 'text-purple-600', bg: 'bg-purple-50' },
        { label: 'Commission Fee', value: '0%', icon: Percent, color: 'text-rose-600', bg: 'bg-rose-50' },
    ];

    return (
        <div className="relative mt-6 lg:-mt-20 z-20 pb-16 pointer-events-none">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pointer-events-auto">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="relative group bg-white rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-300 overflow-hidden"
                        >
                            {/* Hover Gradient Background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white to-slate-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                            <div className="relative flex flex-col items-center text-center space-y-2 sm:space-y-3">
                                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center mb-1 group-hover:scale-110 transition-transform duration-300`}>
                                    <stat.icon className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
                                </div>

                                <div>
                                    <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-colors">
                                        {stat.value}
                                    </div>
                                    <div className="text-[10px] sm:text-sm font-semibold text-slate-500 mt-1 uppercase tracking-wide">
                                        {stat.label}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Stats;
