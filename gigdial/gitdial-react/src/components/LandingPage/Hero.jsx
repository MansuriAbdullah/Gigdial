import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { motion } from 'framer-motion';
import { Search, Zap, Plus, ShieldAlert, CheckCircle2, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
        if (e) e.preventDefault();
        const params = new URLSearchParams();
        if (searchQuery) params.append('search', searchQuery);
        navigate(`/services?${params.toString()}`);
    };

    return (
        <div className="relative font-sans bg-white overflow-hidden">

            {/* Blue Diagonal Wave Background — right half only */}
            <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 1440 900"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ zIndex: 0 }}
            >
                <defs>
                    <linearGradient id="blueWave" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#dbeafe" stopOpacity="1" />
                        <stop offset="100%" stopColor="#bfdbfe" stopOpacity="0.7" />
                    </linearGradient>
                </defs>
                <path d="M760,0 L1440,0 L1440,900 L680,900 Z" fill="url(#blueWave)" />
                <path d="M820,0 Q860,225 820,450 Q780,675 840,900 L1440,900 L1440,0 Z" fill="#eff6ff" fillOpacity="0.55" />
            </svg>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-8 pb-6 lg:pt-12">

                {/* ══════ TOP: 2-Column Hero ══════ */}
                <div className="grid lg:grid-cols-2 gap-8 items-center mb-6">

                    {/* LEFT: Text + Search + CTA */}
                    <div className="flex flex-col items-start">

                        <motion.h1
                            className="font-bold text-slate-900 tracking-tight mb-4 leading-[1.1] text-[28px] md:text-[36px] lg:text-[44px]"
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <span className="block">Apne area ke trusted</span>
                            <span className="block">workers instantly hire kare</span>
                        </motion.h1>

                        <motion.p
                            className="text-base text-slate-500 font-semibold mb-6 max-w-md leading-relaxed"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.15 }}
                        >
                            Plumber, Electrician, Carpenter aur 45+ services – bina middleman
                        </motion.p>

                        {/* Search Bar */}
                        <motion.form
                            onSubmit={handleSearch}
                            className="relative bg-white border border-slate-200 rounded-2xl shadow-lg overflow-hidden w-full max-w-md mb-4"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <input
                                type="text"
                                placeholder="Aapko kaunsi service chahiye?"
                                className="w-full py-3 pl-5 pr-14 bg-transparent outline-none font-semibold text-base text-slate-700 placeholder:text-slate-300"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors">
                                <Search size={22} strokeWidth={2.5} />
                            </button>
                        </motion.form>

                        {/* Pills */}
                        <motion.div
                            className="flex flex-wrap gap-2 mb-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.25 }}
                        >
                            {[
                                { name: 'Plumber',     icon: <Users size={13} /> },
                                { name: 'Electrician', icon: <Zap   size={13} className="text-amber-400" /> },
                                { name: 'Carpenter',   icon: <Users size={13} /> },
                                { name: 'More',        icon: <Plus  size={13} /> },
                            ].map((item) => (
                                <button
                                    key={item.name}
                                    onClick={() => {
                                        if (item.name === 'More') navigate('/services');
                                        else { setSearchQuery(item.name); navigate(`/services?search=${item.name}`); }
                                    }}
                                    className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:shadow-md hover:border-slate-300 transition-all"
                                >
                                    {item.icon}
                                    {item.name}
                                </button>
                            ))}
                        </motion.div>

                        {/* CTA */}
                        <motion.button
                            onClick={() => navigate('/login')}
                            className="flex items-center gap-3 px-8 py-3.5 bg-gradient-to-r from-[#2f5af4] to-[#6049e6] hover:from-[#2143bf] hover:to-[#4a39b3] text-white rounded-xl font-bold text-base shadow-lg shadow-indigo-500/30 transition-all hover:scale-[1.02] active:scale-95 group"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <Zap size={18} className="fill-white shrink-0" />
                            <span>GigDial – kaam turant, bina tension</span>
                            <span className="text-xl group-hover:translate-x-1 transition-transform duration-200">→</span>
                        </motion.button>
                    </div>

                    {/* RIGHT: Worker Image */}
                    <motion.div
                        className="flex items-end justify-center relative z-20 mt-8 lg:mt-0"
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                    >
                        <img
                            src="/heropage_picture.png"
                            alt="Professional Workers"
                            className="w-full max-w-[540px] h-auto object-contain drop-shadow-2xl relative z-20"
                        />
                    </motion.div>
                </div>

                {/* ══════ BOTTOM: Both Cards Side-by-Side in one row ══════ */}
                <div className="grid md:grid-cols-2 gap-6 pb-16 mt-12 lg:-mt-16 relative z-30">

                    {/* Traditional Platforms */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-slate-50 p-7 rounded-3xl border border-slate-200"
                    >
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2f5af4] flex items-center justify-center border border-blue-100 shrink-0">
                                <ShieldAlert size={20} />
                            </div>
                            <div>
                                <h3 className="text-xl md:text-[22px] font-black text-black leading-none mb-1.5">Traditional Platforms</h3>
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Adage, apa agvagong a gress, commissions chack here</p>
                            </div>
                        </div>
                        <ul className="space-y-3 mb-5">
                            {[
                                '20-30% commission on every job',
                                "Workers don't receive their full earnings",
                                'Customers pay inflated prices',
                                'No direct communication with workers',
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-black font-bold text-[15px] tracking-tight">
                                    <span className="w-2 h-2 rounded-full bg-[#2f5af4] shrink-0 shadow-[0_0_8px_rgba(47,90,244,0.6)]"></span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <div className="p-4 bg-slate-100 rounded-2xl text-center mb-5 shadow-inner">
                            <p className="text-black font-black text-[15px]">Both workers and customers lose value.</p>
                        </div>
                        <button disabled className="px-7 py-3 bg-gray-700 text-white rounded-full font-black text-xs uppercase tracking-widest cursor-default">
                            Book Now →
                        </button>
                    </motion.div>

                    {/* GigDial Advantage */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="bg-white p-7 rounded-3xl border border-slate-100 shadow-2xl shadow-slate-200/50"
                    >
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shrink-0">
                                <CheckCircle2 size={20} />
                            </div>
                            <div>
                                <h3 className="text-xl md:text-[22px] font-black text-black leading-none mb-1.5">GigDial Advantage</h3>
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Lasrs apertis onig creaginge a flosed widget.</p>
                            </div>
                        </div>
                        <ul className="space-y-4 mb-6">
                            {[
                                { t: '100% Payment to Workers',  d: 'No commission Workers keep what they earn.' },
                                { t: 'Affordable for Customers', d: 'No markup. Pay only for the actual service.' },
                                { t: 'Direct Connection',        d: 'Talk and hne directty — no — middleman.' },
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3.5 p-2 rounded-xl hover:bg-slate-50 transition-colors -ml-2">
                                    <CheckCircle2 size={20} className="text-[#2f5af4] shrink-0 mt-0.5 drop-shadow-sm" strokeWidth={2.5} />
                                    <div>
                                        <p className="text-black font-black text-[15px] leading-tight mb-1">{item.t}</p>
                                        <p className="text-sm font-bold text-slate-600 leading-snug">{item.d}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <button
                            onClick={() => navigate('/login')}
                            className="w-full py-3.5 bg-gradient-to-r from-[#2f5af4] to-[#6049e6] hover:from-[#2143bf] hover:to-[#4a39b3] text-white rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-lg shadow-indigo-500/30 hover:scale-[1.01] flex items-center justify-center gap-2"
                        >
                            Get Started Now →
                        </button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
