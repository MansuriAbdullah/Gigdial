import React from 'react';
import { ShieldCheck, Zap, Users, ArrowRight, CheckCircle2, AlertCircle, TrendingUp, Handshake, Sparkles, Gavel, Wallet, Rocket, MessageSquare, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const FeatureCard = ({ icon: Icon, title, desc, color }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -10 }}
        className="relative group p-[1px] rounded-[2.5rem] bg-gradient-to-br from-slate-200 to-slate-100 hover:from-[#003366] hover:to-[#66CC33] transition-all duration-500 shadow-lg"
    >
        <div className="bg-white rounded-[calc(2.5rem-1px)] p-8 h-full flex flex-col items-center text-center">
            <div className={`w-16 h-16 ${color} rounded-2xl flex items-center justify-center text-white mb-6 transform group-hover:rotate-12 transition-transform duration-500 shadow-lg`}>
                <Icon size={32} strokeWidth={2.5} />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-4 tracking-tight uppercase leading-none">{title}</h3>
            <p className="text-slate-500 font-bold leading-relaxed">{desc}</p>
        </div>
    </motion.div>
);

const Features = () => {
    return (
        <section className="py-24 bg-white relative overflow-hidden" id="why-choose">
            {/* Soft Background Accents */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50/50 blur-[120px] rounded-full -mr-48 -mt-48 transition-all"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-50/30 blur-[120px] rounded-full -ml-48 -mb-48"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-slate-50 border border-slate-200 mb-8"
                    >
                        <Zap size={14} className="text-[#66CC33] fill-[#66CC33]" />
                        <span className="text-[11px] font-black text-slate-900 uppercase tracking-[0.3em]">GigDial Superpowers</span>
                    </motion.div>
                    
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4 leading-tight"
                    >
                        Why Choose GigDial?
                    </motion.h2>

                    <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-slate-500 text-lg md:text-xl font-bold max-w-2xl mx-auto"
                    >
                        Traditional marketplace ki commission aur middleman ki problem ab khatam!
                    </motion.p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    <FeatureCard 
                        icon={TrendingUp} 
                        title="100% Worker Earnings" 
                        desc="Hum worker ki mehnat se ek rupaya bhi commission nahi kaat-te. Poora paisa aapka hai." 
                        color="bg-[#003366]"
                    />
                    <FeatureCard 
                        icon={Handshake} 
                        title="Direct Connection" 
                        desc="Chat aur hiring direct! Bina kisi middleman ya platform intervention ke kaam finalize karein." 
                        color="bg-[#66CC33]"
                    />
                    <FeatureCard 
                        icon={ShieldCheck} 
                        title="Verified & Trusted" 
                        desc="Background checked professionals aur safe connection ki guarantee GigDial deta hai." 
                        color="bg-slate-950"
                    />
                </div>

            </div>
        </section>
    );
};

export default Features;
