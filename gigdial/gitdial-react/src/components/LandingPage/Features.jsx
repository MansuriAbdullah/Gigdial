import React from 'react';
import { ShieldCheck, Percent, Clock, Mic, Heart, Award, Sparkles, Zap, Smartphone, Globe, Verified, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const FeatureCard = ({ icon: Icon, title, description, color, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ y: -10, scale: 1.02 }}
        className="relative group h-full"
    >
        {/* Always Visible Shimmer Border Effect */}
        <div className={`absolute -inset-0.5 bg-gradient-to-r ${color} rounded-[2rem] blur opacity-25 group-hover:opacity-100 transition duration-500 group-hover:duration-200`}></div>
        
        {/* Main Card Content */}
        <div className="relative bg-white h-full p-8 rounded-[1.9rem] flex flex-col items-start border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden group-hover:bg-slate-50/50 transition-colors">
            {/* Background Glow */}
            <div className={`absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-32 h-32 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity`}></div>

            {/* Icon Container */}
            <div className={`w-14 h-14 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg transform group-hover:rotate-12 transition-transform duration-500`}>
                <Icon className="w-7 h-7" />
            </div>

            {/* Content */}
            <h3 className="text-xl font-black text-slate-900 mb-4 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-slate-900 group-hover:to-slate-600">
                {title}
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
                {description}
            </p>

            {/* Bottom Glow Bar */}
            <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${color} w-0 group-hover:w-full transition-all duration-500`}></div>
        </div>
    </motion.div>
);

const Features = () => {
    const features = [
        {
            icon: ShieldCheck,
            title: "100% Verified Workers",
            description: "Safety first! Every professional undergoes rigorous Aadhaar/PAN verification and thorough background checks.",
            color: "from-blue-600 to-cyan-500"
        },
        {
            icon: Percent,
            title: "0% Commission Fee",
            description: "A revolution in the gig economy – workers keep every rupee they earn with our transparent subscription model.",
            color: "from-rose-500 to-pink-500"
        },
        {
            icon: Clock,
            title: "On-Demand Services",
            description: "Need help right now? Book instant services or schedule them for a later time that fits your busy life.",
            color: "from-amber-400 to-orange-500"
        },
        {
            icon: Mic,
            title: "Voice Search (Hindi)",
            description: "Accessibility for all! Use voice commands in Hindi or English to find the help you need without typing.",
            color: "from-emerald-500 to-teal-500"
        },
        {
            icon: Heart,
            title: "Worker Wellness",
            description: "We care for those who care for you. Free health insurance and financial support for our verified partners.",
            color: "from-indigo-600 to-purple-500"
        },
        {
            icon: Award,
            title: "Quality Guarantee",
            description: "Expect nothing but the best. Our rating system and reviews ensure high-quality service, every single time.",
            color: "from-violet-500 to-fuchsia-500"
        }
    ];

    return (
        <section className="py-24 bg-[#FCFCFD] relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
                <div className="absolute top-20 left-10 w-64 h-64 bg-blue-100/50 blur-3xl rounded-full"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-100/30 blur-3xl rounded-full"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 text-slate-800 text-[10px] font-black uppercase tracking-[0.2em] mb-8 shadow-sm"
                    >
                        <Sparkles size={14} className="text-amber-500" />
                        The GigDial Advantage
                    </motion.div>
                    
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tighter"
                    >
                        Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-rose-500 to-amber-500">GigDial?</span>
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-500 text-lg md:text-xl font-bold max-w-2xl mx-auto italic"
                    >
                        India's first commission-free marketplace built for trust, transparency, and a better future for every worker.
                    </motion.p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {features.map((feature, idx) => (
                        <FeatureCard key={idx} {...feature} index={idx} />
                    ))}
                </div>

                {/* Bottom Trust CTA (Optional but adds value) */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20 p-8 rounded-[3rem] bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 blur-[100px] rounded-full"></div>
                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                        <div className="flex -space-x-4">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-12 h-12 rounded-full border-4 border-slate-900 overflow-hidden">
                                    <img src={`https://i.pravatar.cc/150?u=${i + 10}`} alt="user" className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                        <div className="text-center md:text-left">
                            <h4 className="text-lg font-black tracking-tight">Joined by 10,000+ professionals</h4>
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Ready to start your journey?</p>
                        </div>
                    </div>
                    <button className="relative z-10 px-10 py-4 bg-white text-slate-900 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-slate-200 transition-all active:scale-95 whitespace-nowrap">
                        Become a Partner
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default Features;
