import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Users, ShieldCheck, BarChart3, MessageSquare, Bell, Star, CheckCircle2, Zap, Sparkles } from 'lucide-react';

const features = [
    {
        id: 'workers',
        icon: Users,
        title: "Verified Worker Pool",
        description: "Access thousands of verified skilled workers ready for instant hiring.",
        accent: "blue",
        gradient: "from-blue-600 to-indigo-600"
    },
    {
        id: 'campaigns',
        icon: MessageSquare,
        title: "Instant Communication",
        description: "Chat directly with workers or broadcast your requirements efficiently.",
        accent: "emerald",
        gradient: "from-emerald-500 to-teal-500"
    },
    {
        id: 'secure',
        icon: ShieldCheck,
        title: "0% Commission Payments",
        description: "Secure, transparent payments where workers keep 100% of their earnings.",
        accent: "indigo",
        gradient: "from-rose-500 to-pink-500"
    },
    {
        id: 'tracking',
        icon: BarChart3,
        title: "Real-time Tracking",
        description: "Monitor work progress and worker location in real-time.",
        accent: "lime",
        gradient: "from-amber-400 to-orange-500"
    },
    {
        id: 'support',
        icon: Phone,
        title: "24/7 Premium Support",
        description: "Our dedicated support team is here to help resolve any disputes instantly.",
        accent: "orange",
        gradient: "from-indigo-600 to-purple-500"
    },
    {
        id: 'alerts',
        icon: Bell,
        title: "Smart Alerts",
        description: "Get notified immediately when a worker accepts your gig request.",
        accent: "cyan",
        gradient: "from-violet-500 to-fuchsia-500"
    }
];

const FeatureItem = ({ feature, isActive, onClick, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        onClick={onClick}
        className="relative group cursor-pointer"
    >
        {/* Shimmer Border Effect */}
        <div className={`absolute -inset-0.5 bg-gradient-to-r ${feature.gradient} rounded-3xl blur opacity-20 transition duration-500 ${isActive ? 'opacity-100' : 'group-hover:opacity-60'}`}></div>
        
        {/* Card Content */}
        <div className={`relative p-6 rounded-[1.4rem] border transition-all duration-300 overflow-hidden h-full flex flex-col sm:flex-row gap-4 items-center sm:items-start ${isActive 
            ? 'bg-white border-transparent shadow-2xl scale-[1.02] z-10' 
            : 'bg-white/80 border-slate-100 group-hover:bg-white group-hover:border-transparent'}`}>
            
            {/* Background Glow */}
            <div className={`absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-24 h-24 bg-gradient-to-br ${feature.gradient} opacity-0 ${isActive ? 'opacity-10' : 'group-hover:opacity-5'} blur-2xl transition-opacity`}></div>

            {/* Icon Container */}
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-500 ${isActive ? `bg-gradient-to-br ${feature.gradient} text-white shadow-lg scale-110` : 'bg-slate-100 text-slate-500 group-hover:scale-110'}`}>
                <feature.icon size={22} strokeWidth={2.5} />
            </div>

            <div className="text-center sm:text-left">
                <h3 className={`text-base font-black mb-1 tracking-tight transition-colors ${isActive ? 'text-slate-900' : 'text-slate-700'}`}>
                    {feature.title}
                </h3>
                <p className="text-slate-500 text-[11px] leading-relaxed font-bold line-clamp-2">
                    {feature.description}
                </p>
            </div>

            {/* Active Indicator Bar */}
            <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${feature.gradient} transition-all duration-500 ${isActive ? 'w-full' : 'w-0 group-hover:w-1/2'}`}></div>
        </div>
    </motion.div>
);

const AppShowcase = () => {
    const [activeFeature, setActiveFeature] = useState(features[0].id);

    // Auto-rotate active feature
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveFeature(prev => {
                const currentIndex = features.findIndex(f => f.id === prev);
                const nextIndex = (currentIndex + 1) % features.length;
                return features[nextIndex].id;
            });
        }, 5000); 
        return () => clearInterval(interval);
    }, []);

    const activeFeatureData = features.find(f => f.id === activeFeature);

    return (
        <section className="py-24 bg-[#FAFBFF] relative overflow-hidden">
            {/* Premium Background Elements */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-100/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 -z-10 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-100/30 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3 -z-10"></div>

            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-24"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 text-slate-800 text-[10px] font-black uppercase tracking-[0.2em] mb-8 shadow-sm"
                    >
                        <Sparkles size={14} className="text-blue-500" />
                        Next-Gen Mobile Platform
                    </motion.div>

                    <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tighter leading-[1.1]">
                        One Mobile App to Manage <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-500">All Your Requirements</span>
                    </h2>
                    <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto font-bold italic leading-relaxed">
                        Powerful features packaged in a simple, intuitive mobile interface designed for speed and reliability.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    {/* Left Side - Vibrant Feature Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10 order-2 lg:order-1">
                        {features.map((feature, index) => (
                            <FeatureItem 
                                key={feature.id} 
                                feature={feature} 
                                isActive={activeFeature === feature.id} 
                                onClick={() => setActiveFeature(feature.id)}
                                index={index} 
                            />
                        ))}
                    </div>

                    {/* Right Side - Phone Mockup */}
                    <div className="relative flex justify-center lg:h-[800px] items-center order-1 lg:order-2">
                        {/* Animated Glow behind Phone */}
                        <div className="absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full bg-gradient-to-tr from-blue-200/40 to-purple-200/40 blur-3xl -z-10 animate-pulse"></div>

                        <div className="lg:sticky lg:top-32 transform scale-90 sm:scale-105 transition-transform">
                            <motion.div
                                className="relative w-[250px] h-[500px] sm:w-[280px] sm:h-[560px] bg-slate-900 rounded-[3rem] p-2 shadow-[0_40px_80px_-15px_rgba(30,58,138,0.25)] border-[6px] border-slate-800"
                                initial={{ rotateY: -10, rotateX: 5 }}
                                whileInView={{ rotateY: -5, rotateX: 0 }}
                                transition={{ type: "spring", stiffness: 40, damping: 20 }}
                            >
                                {/* notch */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-5 w-24 bg-slate-950 rounded-b-xl z-30"></div>

                                {/* Screen Content Container */}
                                <div className="w-full h-full bg-slate-50 rounded-[2.4rem] overflow-hidden relative flex flex-col">

                                    {/* App Header */}
                                    <div className={`relative pt-10 pb-6 px-5 bg-gradient-to-br ${activeFeatureData.gradient} text-white rounded-b-[2rem] shadow-xl z-20 overflow-hidden transition-all duration-700`}>
                                        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                                        <div className="flex justify-between items-center mb-4 relative z-10">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center">
                                                    <Users size={14} className="text-white" />
                                                </div>
                                                <span className="font-bold text-base tracking-wide">GigHome</span>
                                            </div>
                                            <Bell size={18} className="opacity-80" />
                                        </div>
                                        <div className="relative z-10">
                                            <h4 className="text-xl font-black mb-0.5">Explore</h4>
                                            <p className="text-white/80 font-bold text-[9px] uppercase tracking-widest flex items-center gap-1.5">
                                                <Zap size={10} className="fill-yellow-400 text-yellow-400" />
                                                {activeFeatureData.title}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Dynamic Content Area */}
                                    <div className="flex-1 p-4 relative">
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={activeFeature}
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.9 }}
                                                className="h-full flex flex-col gap-4"
                                            >
                                                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col gap-3">
                                                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${activeFeatureData.gradient} text-white flex items-center justify-center shadow-md`}>
                                                        <activeFeatureData.icon size={20} />
                                                    </div>
                                                    <div>
                                                        <h5 className="font-black text-slate-800 text-sm">{activeFeatureData.title}</h5>
                                                        <p className="text-slate-500 text-[9px] font-bold leading-relaxed mt-0.5">{activeFeatureData.description}</p>
                                                    </div>
                                                </div>

                                                <div className="flex-1 bg-slate-100/50 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-4 text-center">
                                                    <div className="w-8 h-8 bg-slate-200 rounded-full mb-2 flex items-center justify-center">
                                                        <Sparkles className="text-slate-400" size={16} />
                                                    </div>
                                                    <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 italic">Interface loading...</p>
                                                </div>
                                            </motion.div>
                                        </AnimatePresence>
                                    </div>

                                    {/* Bottom Nav Bar */}
                                    <div className="bg-white border-t border-slate-100 px-6 py-4 flex justify-between items-center">
                                        <div className="w-2 h-2 bg-blue-600 rounded-full shadow-[0_0_8px_rgba(37,99,235,0.4)]"></div>
                                        <div className="w-1.5 h-1.5 bg-slate-200 rounded-full"></div>
                                        <div className="w-4 h-4 bg-slate-100 rounded-full"></div>
                                        <div className="w-1.5 h-1.5 bg-slate-200 rounded-full"></div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AppShowcase;
