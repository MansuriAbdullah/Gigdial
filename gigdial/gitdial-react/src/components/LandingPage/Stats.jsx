import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, MapPin, Percent, Sparkles } from 'lucide-react';

const Stats = () => {
    const stats = [
        { 
            label: 'Service Categories', 
            value: '45+', 
            icon: TrendingUp, 
            gradient: "from-blue-600 to-indigo-600" 
        },
        { 
            label: 'Verified Workers', 
            value: '10k+', 
            icon: Users, 
            gradient: "from-emerald-500 to-teal-500" 
        },
        { 
            label: 'Cities Covered', 
            value: '12', 
            icon: MapPin, 
            gradient: "from-purple-500 to-fuchsia-500" 
        },
        { 
            label: 'Commission Fee', 
            value: '0%', 
            icon: Percent, 
            gradient: "from-rose-500 to-pink-500" 
        },
    ];

    return (
        <div className="relative mt-12 lg:-mt-14 z-20 pb-16 pointer-events-none px-4">
            <div className="max-w-6xl mx-auto pointer-events-auto">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -8 }}
                            className="relative group cursor-default"
                        >
                            {/* Always Visible Shimmer Border Effect */}
                            <div className={`absolute -inset-[1px] bg-gradient-to-r ${stat.gradient} rounded-[1.5rem] blur-sm opacity-25 group-hover:opacity-100 transition duration-500`}></div>
                            
                            {/* Main Card Content */}
                            <div className="relative bg-white rounded-[1.4rem] p-5 sm:p-6 flex flex-col items-center text-center shadow-lg shadow-slate-200/20 border border-slate-100/80 overflow-hidden group-hover:bg-slate-50 transition-colors">
                                {/* Subtle Background Glow */}
                                <div className={`absolute -top-10 -left-10 w-20 h-20 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 blur-2xl transition-opacity`}></div>
                                
                                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${stat.gradient} text-white flex items-center justify-center mb-4 shadow-md transform group-hover:rotate-6 transition-all duration-300`}>
                                    <stat.icon className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
                                </div>

                                <div className="space-y-0.5">
                                    <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tighter group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-slate-900 group-hover:to-slate-600">
                                        {stat.value}
                                    </div>
                                    <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest pt-0.5">
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
