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
        <div className="relative font-sans bg-white">

            {/* ───────────────────────────── HERO TOP ───────────────────────────── */}
            <div className="relative overflow-hidden min-h-[540px] flex items-center">

                {/* Blue Diagonal Wave Background */}
                <div className="absolute inset-0 pointer-events-none z-0">
                    {/* Main blue sweep – right half */}
                    <svg
                        className="absolute inset-0 w-full h-full"
                        viewBox="0 0 1440 600"
                        preserveAspectRatio="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <defs>
                            <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#dbeafe" stopOpacity="0.9" />
                                <stop offset="100%" stopColor="#bfdbfe" stopOpacity="0.5" />
                            </linearGradient>
                        </defs>
                        {/* Diagonal blue panel starting ~40% from left */}
                        <path d="M520,0 L1440,0 L1440,600 L320,600 Z" fill="url(#waveGrad)" />
                        {/* Subtle inner wave curve */}
                        <path
                            d="M480,0 Q600,150 500,300 Q400,450 520,600 L1440,600 L1440,0 Z"
                            fill="#eff6ff"
                            fillOpacity="0.6"
                        />
                    </svg>
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12 lg:py-16">
                    <div className="grid lg:grid-cols-2 gap-8 items-center">

                        {/* ── Left Content ── */}
                        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">

                            {/* Heading — exactly 2 lines */}
                            <motion.h1
                                className="text-[42px] md:text-5xl lg:text-[58px] font-black text-slate-900 leading-[1.1] mb-5 tracking-tighter"
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <span className="block">Apne area ke trusted</span>
                                <span className="block">workers instantly hire kare</span>
                            </motion.h1>

                            {/* Sub-text */}
                            <motion.p
                                className="text-base md:text-lg text-slate-500 font-semibold mb-8 max-w-md leading-relaxed"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.15 }}
                            >
                                Plumber, Electrician, Carpenter aur 45+ services –<br className="hidden md:block" /> bina middleman
                            </motion.p>

                            {/* Search Bar */}
                            <motion.div
                                className="w-full max-w-md mb-4"
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <form
                                    onSubmit={handleSearch}
                                    className="relative bg-white border border-slate-200 rounded-xl shadow-lg shadow-slate-200/60 overflow-hidden"
                                >
                                    <input
                                        type="text"
                                        placeholder="Aapko kaunsi service chahiye?"
                                        className="w-full py-4 pl-5 pr-14 bg-transparent outline-none font-semibold text-base text-slate-700 placeholder:text-slate-300"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    <button
                                        type="submit"
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors"
                                    >
                                        <Search size={22} strokeWidth={2.5} />
                                    </button>
                                </form>
                            </motion.div>

                            {/* Service Pills */}
                            <motion.div
                                className="flex flex-wrap gap-2 mb-8 justify-center lg:justify-start"
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
                                        className="flex items-center gap-1.5 px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-[13px] font-bold text-slate-600 hover:shadow-md hover:border-slate-300 transition-all"
                                    >
                                        {item.icon}
                                        {item.name}
                                    </button>
                                ))}
                            </motion.div>

                            {/* Sage-Green CTA */}
                            <motion.button
                                onClick={() => navigate('/login')}
                                className="flex items-center gap-3 px-8 py-4 bg-[#829c7b] hover:bg-[#738c6c] text-white rounded-xl font-bold text-base shadow-lg shadow-[#829c7b]/30 transition-all hover:scale-[1.02] active:scale-95 group"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <Zap size={18} className="fill-white shrink-0" />
                                <span>GigDial – kaam turant, bina tension</span>
                                <span className="text-xl group-hover:translate-x-1 transition-transform duration-200">→</span>
                            </motion.button>
                        </div>

                        {/* ── Right: Worker Image ── */}
                        <motion.div
                            className="relative hidden lg:flex items-end justify-center"
                            initial={{ opacity: 0, x: 24 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                        >
                            <img
                                src="/heropage_picture.png"
                                alt="Professional Workers"
                                className="w-full max-w-[580px] h-auto object-contain drop-shadow-2xl"
                            />
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* ─────────────── COMPARISON BOXES (pulled up close) ─────────────── */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 -mt-2 pb-16">
                <div className="grid md:grid-cols-2 gap-6">

                    {/* Traditional Platforms Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="bg-slate-50 p-8 rounded-3xl border border-slate-200"
                    >
                        <div className="flex items-center gap-4 mb-7">
                            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center border border-rose-100 shrink-0">
                                <ShieldAlert size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-slate-800 leading-none mb-1">Traditional Platforms</h3>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-tight">High hidden charges &amp; commissions</p>
                            </div>
                        </div>
                        <ul className="space-y-5">
                            {[
                                '20-30% commission on every job',
                                "Workers don't receive their full earnings",
                                'Customers pay inflated prices',
                                'No direct communication with workers',
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-slate-600 font-semibold text-sm">
                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0"></span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <div className="mt-8 p-4 bg-slate-200/40 rounded-2xl text-center">
                            <p className="text-slate-600 font-black text-sm">Both workers and customers lose value.</p>
                        </div>
                        <button
                            disabled
                            className="mt-6 px-8 py-3.5 bg-[#8da2c0] text-white rounded-full font-black text-xs uppercase tracking-widest cursor-default"
                        >
                            Book Now →
                        </button>
                    </motion.div>

                    {/* GigDial Advantage Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="bg-white p-8 rounded-3xl border border-slate-100 shadow-2xl shadow-slate-200/50"
                    >
                        <div className="flex items-center gap-4 mb-7">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shrink-0">
                                <CheckCircle2 size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-slate-800 leading-none mb-1">GigDial Advantage</h3>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-tight">Verified workers, direct connections</p>
                            </div>
                        </div>
                        <ul className="space-y-5">
                            {[
                                { t: '100% Payment to Workers',  d: 'No commission. Workers keep what they earn.' },
                                { t: 'Affordable for Customers', d: 'No markup. Pay only for the actual service.' },
                                { t: 'Direct Connection',        d: 'Talk directly — no middleman.' },
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-slate-900 font-black text-sm leading-none mb-0.5">{item.t}</p>
                                        <p className="text-xs font-semibold text-slate-400">{item.d}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <button
                            onClick={() => navigate('/login')}
                            className="mt-10 w-full py-4 bg-[#829c7b] hover:bg-[#738c6c] text-white rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-lg hover:scale-[1.01] flex items-center justify-center gap-2"
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
