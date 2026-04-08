import React from 'react';
import { ShieldCheck, Zap, Users, ArrowRight, CheckCircle2, AlertCircle, TrendingUp, Handshake, Sparkles, Gavel, Wallet, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

const Point = ({ text, isPositive = true }) => (
    <div className="flex items-start gap-2.5 mb-3 last:mb-0">
        <div className={`mt-0.5 flex-shrink-0 w-4.5 h-4.5 rounded-full flex items-center justify-center ${isPositive ? 'bg-emerald-100 text-emerald-600' : 'bg-fuchsia-100 text-fuchsia-600'} shadow-sm`}>
            {isPositive ? <CheckCircle2 size={12} strokeWidth={3} /> : <AlertCircle size={12} strokeWidth={3} />}
        </div>
        <p className={`text-xs md:text-sm font-black tracking-tight ${isPositive ? 'text-slate-950' : 'text-slate-700'}`}>
            {text}
        </p>
    </div>
);

const Features = () => {
    return (
        <section className="py-16 bg-[#F8FAFF] relative overflow-hidden" id="why-choose">
            {/* High-End Background Design */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-200/30 blur-[110px] rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-fuchsia-200/20 blur-[110px] rounded-full -ml-32 -mb-32"></div>

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                {/* Compact Header Section */}
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-2 border-slate-100 shadow-xl mb-6 group hover:scale-105 transition-all duration-500 cursor-default"
                    >
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-700 animate-pulse"></div>
                        <span className="text-[10px] font-black text-slate-950 uppercase tracking-[0.25em] flex items-center gap-2">
                            GigDial <span className="text-lime-600">—</span> नया बाजार, नया नियम
                        </span>
                        <Sparkles size={12} className="text-amber-500 animate-spin-slow" />
                    </motion.div>
                    
                    <motion.h2 
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="text-2xl md:text-5xl font-black text-slate-950 mb-4 tracking-tighter"
                    >
                        Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-blue-600 to-lime-600">GigDial?</span>
                    </motion.h2>

                    <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-slate-800 text-sm md:text-lg font-black max-w-2xl mx-auto italic"
                    >
                        "आज हर प्लेटफॉर्म middleman hai. Worker ko poora haq nahi. Dono lutte hain."
                    </motion.p>
                </div>

                {/* Main Grid Section */}
                <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-stretch">
                    
                    {/* OLD MARKET CARD - Darker Text & Premium Fuchsia Theme */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="relative p-[1px] rounded-[2.5rem] bg-gradient-to-br from-fuchsia-300 via-indigo-200 to-fuchsia-300"
                    >
                        <div className="relative bg-white/95 backdrop-blur-md rounded-[calc(2.5rem-1px)] p-8 h-full flex flex-col">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-fuchsia-50 flex items-center justify-center text-fuchsia-700 shadow-sm border border-fuchsia-100">
                                    <AlertCircle size={20} />
                                </div>
                                <h3 className="text-base md:text-xl font-black text-fuchsia-900 uppercase tracking-widest leading-none">पुराना Market <br/><span className="text-[10px] text-fuchsia-500 font-black">Traditional Model</span></h3>
                            </div>

                            <div className="flex-1 space-y-4">
                                {[
                                    "Platform 20% - 30% commission काटता है",
                                    "Worker को अपनी मेहनत का पूरा पैसा नहीं मिलता",
                                    "Customer को high markup देनी पड़ती है",
                                    "Direct connection की कोई जगह नहीं"
                                ].map((txt, i) => (
                                    <div key={i} className="bg-fuchsia-50/20 p-4 rounded-2xl border border-fuchsia-100/50 group hover:bg-white transition-colors">
                                        <Point isPositive={false} text={txt} />
                                    </div>
                                ))}
                            </div>
                            
                            <div className="mt-8 p-5 rounded-[1.8rem] bg-gradient-to-br from-fuchsia-600 to-indigo-700 shadow-xl shadow-fuchsia-200">
                                <p className="text-white font-black text-sm text-center italic tracking-wider">
                                    दोनों लुटते हैं!
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* GIGDIAL NEW RULES CARD - High-Contrast Indigo/Lime Theme */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="relative p-[2px] rounded-[2.5rem] bg-gradient-to-br from-indigo-700 via-blue-600 to-lime-500 shadow-[0_20px_40px_-10px_rgba(79,70,229,0.25)] h-full"
                    >
                        <div className="relative bg-white rounded-[calc(2.5rem-2px)] p-8 h-full flex flex-col overflow-hidden">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-lime-400/5 blur-[80px] rounded-full -mr-24 -mt-24"></div>
                            
                            <div className="flex items-center justify-between mb-8 relative z-10">
                                <div className="flex items-center gap-3">
                                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-700 to-blue-800 flex items-center justify-center text-white shadow-xl shadow-indigo-100">
                                        <Zap size={22} className="fill-white" />
                                    </div>
                                    <h3 className="text-base md:text-xl font-black text-slate-950 uppercase tracking-widest leading-none">GigDial <br/><span className="text-lime-600 tracking-tighter">New Market Era</span></h3>
                                </div>
                                <div className="px-3 py-1 bg-lime-50 rounded-lg border border-lime-100">
                                    <p className="text-lime-700 font-black text-[10px] uppercase">Verified</p>
                                </div>
                            </div>
                            
                            <div className="flex-1 space-y-4 relative z-10">
                                <div className="group/item p-5 rounded-[1.8rem] bg-indigo-50/50 border-2 border-indigo-100 hover:border-indigo-500 hover:bg-white transition-all duration-300 shadow-sm">
                                    <div className="flex items-center gap-3 mb-1">
                                        <TrendingUp className="text-indigo-700" size={22} />
                                        <h4 className="text-indigo-900 text-sm md:text-lg font-black">Worker: 100% Payment</h4>
                                    </div>
                                    <p className="text-slate-700 font-bold ml-9 text-[11px]">कोई कट नहीं। पूरी मेहनत आपकी।</p>
                                </div>

                                <div className="group/item p-5 rounded-[1.8rem] bg-lime-50/50 border-2 border-lime-100 hover:border-lime-500 hover:bg-white transition-all duration-300 shadow-sm">
                                    <div className="flex items-center gap-3 mb-1">
                                        <Handshake className="text-lime-700" size={22} />
                                        <h4 className="text-lime-900 text-sm md:text-lg font-black">Customer: सस्ता Service</h4>
                                    </div>
                                    <p className="text-slate-700 font-bold ml-9 text-[11px]">कोई markup नहीं। डायरेक्ट जोड़ें।</p>
                                </div>

                                <div className="group/item p-5 rounded-[1.8rem] bg-slate-950 text-white border-2 border-slate-900 hover:border-lime-500 transition-all duration-500 shadow-2xl">
                                    <div className="flex items-center gap-3 mb-1">
                                        <ShieldCheck className="text-lime-400" size={22} />
                                        <h4 className="text-white text-sm md:text-lg font-black">सिर्फ ₹500 Subscription</h4>
                                    </div>
                                    <p className="text-slate-400 font-bold ml-9 text-[11px]">Premium transparency standard.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Redesigned Bottom Vision Banner with Symbols */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="mt-16 pt-10 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-8"
                >
                    <div className="flex flex-wrap justify-center gap-6 md:gap-14">
                        <div className="flex items-center gap-4 group">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-700 border border-indigo-100 shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                                <Gavel size={22} />
                            </div>
                            <div className="text-left">
                                <p className="text-base font-black text-slate-950 leading-none">Worker का हक</p>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Empowerment</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 group">
                            <div className="w-12 h-12 rounded-2xl bg-lime-50 flex items-center justify-center text-lime-700 border border-lime-100 shadow-sm group-hover:bg-lime-500 group-hover:text-white transition-all duration-500">
                                <Wallet size={22} />
                            </div>
                            <div className="text-left">
                                <p className="text-base font-black text-slate-950 leading-none">Customer फायदा</p>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Maximum Savings</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 group">
                            <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-900 border border-slate-200 shadow-sm group-hover:bg-slate-900 group-hover:text-white transition-all duration-500">
                                <Rocket size={22} />
                            </div>
                            <div className="text-left">
                                <p className="text-base font-black text-slate-950 leading-none">Market भविष्य</p>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">New Era</p>
                            </div>
                        </div>
                    </div>

                    <button className="group relative px-10 py-5 bg-slate-950 text-white rounded-[2rem] font-black uppercase text-[10px] tracking-[0.25em] shadow-2xl transition-all hover:-translate-y-1 hover:shadow-indigo-500/20 active:scale-95 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 via-blue-600 to-lime-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[length:200%_auto] animate-gradient"></div>
                        <span className="relative z-10 flex items-center gap-3">
                            Join The Revolution <ArrowRight size={16} />
                        </span>
                    </button>
                </motion.div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 8s linear infinite;
                }
            `}} />
        </section>
    );
};

export default Features;
