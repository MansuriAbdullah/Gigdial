import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { motion } from 'framer-motion';
import { Search, MessageSquare, Briefcase, ChevronRight } from 'lucide-react';

const StepCard = ({ number, icon: Icon, title, desc, gradient, lightBg, textColor }) => (
    <div className="relative group h-full">
        {/* Colorful Shimmer Border - Always Visible & Sync with Features */}
        <div className={`absolute -inset-0.5 bg-gradient-to-r ${gradient} rounded-[1.8rem] blur opacity-25 group-hover:opacity-100 transition duration-500`}></div>
        
        <div className="relative flex flex-col items-center text-center p-5 bg-white rounded-[1.75rem] border border-slate-100 shadow-xl shadow-slate-200/40 transition-all duration-500 h-full overflow-hidden">
            {/* Number Badge - Smaller & Lightweight */}
            <div className={`absolute top-3 left-3 w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:bg-gradient-to-br ${gradient} group-hover:text-white group-hover:border-transparent transition-all duration-500`}>
                <span className="text-[11px] font-black text-slate-900 group-hover:text-inherit tracking-tighter">0{number}</span>
            </div>

            {/* Icon Container - More Compact */}
            <div className={`mt-6 mb-4 p-5 rounded-xl ${lightBg} ${textColor} group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-sm border border-white`}>
                <Icon size={24} />
            </div>

            <h3 className="text-lg font-black text-slate-900 mb-2 tracking-tight leading-none uppercase">{title}</h3>
            <p className="text-slate-400 font-bold leading-relaxed text-[11px] flex-1 px-2">{desc}</p>
        </div>
    </div>
);

const HowItWorks = () => {
    const { t } = useLanguage();
    
    const steps = [
        { 
            number: "1", 
            icon: Search, 
            gradient: "from-blue-600 to-indigo-500",
            lightBg: "bg-blue-50",
            textColor: "text-blue-600",
            title: t('step1Title'),
            desc: t('step1Desc')
        },
        { 
            number: "2", 
            icon: MessageSquare, 
            gradient: "from-rose-500 to-pink-500",
            lightBg: "bg-rose-50",
            textColor: "text-rose-600",
            title: t('step2Title'),
            desc: t('step2Desc')
        },
        { 
            number: "3", 
            icon: Briefcase, 
            gradient: "from-emerald-500 to-teal-500",
            lightBg: "bg-emerald-50",
            textColor: "text-emerald-600",
            title: t('step3Title'),
            desc: t('step3Desc')
        }
    ];

    return (
        <section className="py-24 bg-slate-50/50 relative overflow-hidden">
            {/* Subtle Light-Theme Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-100/30 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[700px] h-[700px] bg-rose-100/20 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-6">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
                        <span className="text-[9px] font-black uppercase text-blue-700 tracking-widest">How It Works</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight mb-4">
                        How GigDial Works
                    </h2>
                    <p className="text-slate-500 max-w-2xl mx-auto text-lg font-medium opacity-80">
                        A seamless experience, from search to service.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8 relative">
                    {/* Connecting Lines - Thinner & Lighter */}
                    <div className="hidden lg:block absolute top-[43%] left-[18%] w-[18%] h-[1px] bg-slate-200/50"></div>
                    <div className="hidden lg:block absolute top-[43%] right-[18%] w-[18%] h-[1px] bg-slate-200/50"></div>

                    {steps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                        >
                            <StepCard {...step} />
                        </motion.div>
                    ))}
                </div>

                <motion.div 
                    className="mt-16 text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <button className="relative group overflow-hidden px-10 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all">
                        <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                        <span className="relative flex items-center justify-center gap-3">
                            Get Started Now 
                            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </span>
                    </button>
                    <p className="mt-6 text-[9px] font-bold text-slate-400 uppercase tracking-widest">Free for all users</p>
                </motion.div>
            </div>
        </section>
    );
};

export default HowItWorks;
