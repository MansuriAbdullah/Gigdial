import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Users, ShieldCheck, BarChart3, MessageSquare, Bell, Star, CheckCircle2, Zap } from 'lucide-react';

const features = [
    {
        id: 'workers',
        icon: Users,
        title: "Verified Worker Pool",
        description: "Access thousands of verified skilled workers ready for instant hiring.",
        accent: "blue",
        gradient: "from-blue-500 to-indigo-600"
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
        title: "Secure Payments",
        description: "Escrow-protected payments ensure satisfaction for both parties.",
        accent: "indigo",
        gradient: "from-indigo-500 to-purple-600"
    },
    {
        id: 'tracking',
        icon: BarChart3,
        title: "Real-time Tracking",
        description: "Monitor work progress and worker location in real-time.",
        accent: "lime",
        gradient: "from-lime-500 to-green-600"
    },
    {
        id: 'support',
        icon: Phone,
        title: "24/7 Support",
        description: "Dedicated support team to help resolve any disputes instantly.",
        accent: "orange",
        gradient: "from-orange-500 to-red-500"
    },
    {
        id: 'alerts',
        icon: Bell,
        title: "Smart Alerts",
        description: "Get notified immediately when a worker accepts your gig.",
        accent: "cyan",
        gradient: "from-cyan-500 to-blue-500"
    }
];

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
        }, 5000); // Rotate every 5 seconds
        return () => clearInterval(interval);
    }, []);

    const activeFeatureData = features.find(f => f.id === activeFeature);

    return (
        <section className="py-24 bg-slate-50 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-100/40 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 -z-10"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-100/40 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3 -z-10"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-24"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight">
                        One Mobile App to Manage <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500">All Your Requirements</span>
                    </h2>
                    <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
                        Powerful features packaged in a simple, intuitive mobile interface designed for speed and reliability.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    {/* Left Side - Feature Grid */}
                    <div className="grid sm:grid-cols-2 gap-5 relative z-10">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                onClick={() => setActiveFeature(feature.id)}
                                className={`group p-6 rounded-3xl cursor-pointer border transition-all duration-300 relative overflow-hidden ${activeFeature === feature.id
                                        ? 'bg-white border-blue-200 shadow-2xl shadow-blue-900/10 scale-105 z-20'
                                        : 'bg-white/60 border-slate-100 hover:border-blue-200 hover:shadow-lg hover:bg-white'
                                    }`}
                            >
                                {/* Active Indicator Line */}
                                {activeFeature === feature.id && (
                                    <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${feature.gradient}`}></div>
                                )}

                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-colors duration-300 ${activeFeature === feature.id
                                        ? `bg-gradient-to-br ${feature.gradient} text-white shadow-lg`
                                        : 'bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600'
                                    }`}>
                                    <feature.icon size={26} strokeWidth={2} />
                                </div>
                                <h3 className={`text-xl font-bold mb-2 transition-colors ${activeFeature === feature.id ? 'text-slate-900' : 'text-slate-700'
                                    }`}>
                                    {feature.title}
                                </h3>
                                <p className="text-slate-500 text-sm leading-relaxed font-medium">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Right Side - Phone Mockup (Sticky/Interactive) */}
                    <div className="relative flex justify-center lg:h-[800px] items-start pt-10">
                        {/* Abstract Background Blobs behind Phone */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-blue-200/20 to-emerald-200/20 blur-3xl -z-10 animate-pulse"></div>

                        <div className="sticky top-24 transform perspective-1000">
                            <motion.div
                                className="relative w-[340px] h-[680px] bg-slate-900 rounded-[3.5rem] p-3 shadow-2xl shadow-blue-900/30 border-8 border-slate-800 ring-1 ring-white/20"
                                initial={{ rotateY: -10, rotateX: 5 }}
                                whileInView={{ rotateY: -5, rotateX: 0 }}
                                transition={{ type: "spring", stiffness: 40, damping: 20 }}
                            >
                                {/* Camera Notch */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-8 w-40 bg-slate-950 rounded-b-2xl z-30"></div>

                                {/* Screen Content Container */}
                                <div className="w-full h-full bg-slate-50 rounded-[2.8rem] overflow-hidden relative flex flex-col">

                                    {/* App Header */}
                                    <div className={`relative pt-12 pb-8 px-6 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-b-[2.5rem] shadow-xl z-20 overflow-hidden`}>
                                        {/* Header BG Pattern */}
                                        <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
                                        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>

                                        <div className="flex justify-between items-center mb-6 relative z-10">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center">
                                                    <Users size={18} className="text-white" />
                                                </div>
                                                <span className="font-bold text-lg tracking-wide">GigHome</span>
                                            </div>
                                            <div className="relative">
                                                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-indigo-600"></div>
                                                <Bell size={22} />
                                            </div>
                                        </div>
                                        <div className="relative z-10">
                                            <h4 className="text-2xl font-bold mb-1">Hello, User 👋</h4>
                                            <p className="text-blue-100 font-medium text-sm flex items-center gap-2">
                                                <Zap size={14} className="fill-yellow-400 text-yellow-400" />
                                                Find your next worker
                                            </p>
                                        </div>
                                    </div>

                                    {/* Dynamic Content Area */}
                                    <div className="flex-1 p-5 relative overflow-hidden">
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={activeFeature}
                                                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                                transition={{ duration: 0.4, type: "spring" }}
                                                className="h-full flex flex-col gap-5"
                                            >
                                                {/* Hero Card inside Phone */}
                                                <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden group">
                                                    <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${activeFeatureData.gradient} opacity-10 rounded-bl-full`}></div>

                                                    <div className="flex items-center gap-4 mb-4">
                                                        <div className={`p-3 rounded-xl bg-gradient-to-br ${activeFeatureData.gradient} text-white shadow-md`}>
                                                            <activeFeatureData.icon size={24} />
                                                        </div>
                                                        <div>
                                                            <span className="font-bold text-slate-800 block text-lg">
                                                                {activeFeatureData.title}
                                                            </span>
                                                            <span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full inline-block mt-1">
                                                                Active Now
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {/* Skeleton Lines */}
                                                    <div className="h-24 bg-slate-50 rounded-xl border border-slate-100 p-3 flex gap-3 animate-pulse">
                                                        <div className="w-12 h-12 rounded-lg bg-slate-200"></div>
                                                        <div className="flex-1 space-y-2">
                                                            <div className="h-2 w-3/4 bg-slate-200 rounded"></div>
                                                            <div className="h-2 w-1/2 bg-slate-200 rounded"></div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Secondary Cards */}
                                                <div className="grid grid-cols-2 gap-3">
                                                    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-between h-32">
                                                        <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                                                            <Star size={18} className="fill-blue-600" />
                                                        </div>
                                                        <div className="h-2 w-12 bg-slate-100 rounded"></div>
                                                    </div>
                                                    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-between h-32">
                                                        <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600">
                                                            <CheckCircle2 size={18} />
                                                        </div>
                                                        <div className="h-2 w-12 bg-slate-100 rounded"></div>
                                                    </div>
                                                </div>

                                                {/* Action Button */}
                                                <div className={`mt-auto p-4 rounded-xl text-center font-bold text-white shadow-xl bg-gradient-to-r ${activeFeatureData.gradient} transition-all duration-300 transform active:scale-95`}>
                                                    Explore Feature
                                                </div>
                                            </motion.div>
                                        </AnimatePresence>
                                    </div>

                                    {/* Bottom Nav Bar */}
                                    <div className="bg-white border-t border-slate-100 px-6 py-4 pb-8 flex justify-between items-center text-slate-300">
                                        <div className="flex flex-col items-center gap-1 text-blue-600">
                                            <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center p-1">
                                                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                            </div>
                                        </div>
                                        <div className="w-6 h-6 bg-slate-100 rounded-full"></div>
                                        <div className="w-6 h-6 bg-slate-100 rounded-full"></div>
                                        <div className="w-6 h-6 bg-slate-100 rounded-full"></div>
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
