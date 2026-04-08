import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { motion } from 'framer-motion';
import { Search, Briefcase, MapPin, CheckCircle, Shield, Zap, CreditCard, Phone, Check, Sparkles } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

const TrustBadge = ({ icon: Icon, title, desc, color = "blue" }) => {
    const gradients = {
        blue: "from-blue-600 to-indigo-600",
        green: "from-emerald-500 to-teal-500",
        purple: "from-purple-500 to-fuchsia-500",
        orange: "from-amber-400 to-orange-500",
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group relative cursor-default"
        >
            {/* Always Visible Shimmer Border effect */}
            <div className={`absolute -inset-[1px] bg-gradient-to-r ${gradients[color]} rounded-[1.2rem] blur-[2px] opacity-25 group-hover:opacity-100 transition-opacity duration-300`}></div>

            {/* Card Content */}
            <div className={`relative px-4 py-3 rounded-[1.2rem] bg-white border border-slate-100 shadow-lg shadow-slate-200/40 flex items-center gap-4 group-hover:bg-slate-50 transition-colors overflow-hidden`}>
                <div className={`w-11 h-11 bg-gradient-to-br ${gradients[color]} rounded-[0.9rem] flex items-center justify-center text-white shadow-md transition-transform duration-500 group-hover:rotate-12`}>
                    <Icon size={20} strokeWidth={2.5} />
                </div>

                <div className="flex-1">
                    <h4 className="text-[13px] font-black text-slate-900 tracking-tight transition-colors">{title}</h4>
                    <p className="text-[10px] font-bold text-slate-500 mt-0.5 italic">{desc}</p>
                </div>

                {/* Arrow Icon appears on hover */}
                <div className={`absolute -right-3 -bottom-3 w-10 h-10 bg-gradient-to-br ${gradients[color]} opacity-0 group-hover:opacity-5 blur-xl transition-all`}></div>
            </div>
        </motion.div>
    );
};

const Hero = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const location = useLocation();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [cities, setCities] = useState([]);

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const { data } = await axios.get('/api/cities');
                setCities(data);
            } catch (error) {
                console.error('Error fetching cities:', error);
                // Fallback to default cities if API fails
                setCities([
                    { _id: '1', name: 'Ahmedabad' },
                    { _id: '2', name: 'Gandhinagar' },
                    { _id: '3', name: 'Surat' },
                    { _id: '4', name: 'Vadodara' }
                ]);
            }
        };
        fetchCities();
    }, []);

    const handleSearch = (e) => {
        if (e) e.preventDefault();
        const params = new URLSearchParams();
        if (searchQuery) params.append('search', searchQuery);
        if (selectedCity) params.append('city', selectedCity);
        navigate(`/services?${params.toString()}`);
    };

    return (
        <div className="relative overflow-hidden bg-white pt-6 pb-12 lg:pt-8 lg:pb-20">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-blue-100/80 blur-[100px] animate-pulse" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-lime-100/80 blur-[120px] animate-pulse" style={{ animationDuration: '4s' }} />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center mb-16">
                    {/* Left Column: Content */}
                    <div className="flex flex-col items-center text-center lg:items-start lg:text-left order-1 px-2 lg:px-0">
                        <motion.div
                            className="mb-4 relative"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="flex items-center gap-4">
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-3 mb-1">

                                        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black tracking-tight leading-tight max-w-2xl">
                                            <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-700 bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent drop-shadow-sm">
                                                GigDial kijiye
                                            </span>
                                            <span className="text-slate-900 mx-3 italic font-black">aur</span>
                                            <span className="bg-gradient-to-r from-blue-600 via-emerald-600 to-lime-600 bg-clip-text text-transparent">
                                                apne kaam ki problem turant solve kijiye.
                                            </span>
                                        </h2>
                                    </div>
                                    {/* Stylized Underline */}

                                </div>
                            </div>
                        </motion.div>

                        <motion.h1
                            className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-4 md:mb-6 leading-[1.2] md:leading-[1.15]"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            {t('heroTitle')} <br className="hidden md:block" />
                            <span className="bg-gradient-to-r from-blue-600 to-lime-600 bg-clip-text text-transparent text-2xl md:text-4xl lg:text-5xl block md:inline mt-2 md:mt-0">{t('heroPricing')}</span>
                        </motion.h1>

                        <motion.p
                            className="text-lg md:text-2xl font-medium text-slate-700 mb-6 md:mb-8 italic leading-snug"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            {t('heroSubtitle')}
                        </motion.p>



                        <motion.div
                            className="w-full max-w-lg mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                        >
                            <form onSubmit={handleSearch} className="bg-white p-2 rounded-2xl shadow-xl border border-slate-200 flex flex-col sm:flex-row gap-2">
                                <div className="relative w-full sm:min-w-[160px] sm:w-auto">
                                    <MapPin className="absolute left-3 top-3.5 text-slate-400" size={18} />
                                    <select
                                        value={selectedCity}
                                        onChange={(e) => setSelectedCity(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-transparent rounded-xl focus:bg-white focus:border-blue-500 outline-none text-slate-700 font-bold text-sm appearance-none cursor-pointer hover:bg-slate-100 transition-colors"
                                    >
                                        <option value="">Select City</option>
                                        {cities.map((city) => (
                                            <option key={city._id} value={city.name}>
                                                {city.name}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="absolute right-3 top-4 pointer-events-none">
                                        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </div>
                                </div>
                                <div className="flex-1 relative w-full">
                                    <Search className="absolute left-3 top-3.5 text-slate-400" size={18} />
                                    <input
                                        type="text"
                                        placeholder={t('searchServices')}
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-transparent rounded-xl focus:bg-white focus:border-blue-500 outline-none text-slate-700 placeholder:text-slate-400 font-medium transition-colors"
                                    />
                                </div>
                            </form>
                        </motion.div>

                        <motion.div
                            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                        >
                            <button onClick={handleSearch} className="group relative px-8 py-4 bg-slate-900 text-white rounded-full font-bold shadow-lg shadow-slate-900/20 hover:shadow-slate-900/40 transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center overflow-hidden w-full sm:w-auto text-lg gap-2 border border-transparent hover:border-slate-700/50">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[length:200%_auto] animate-gradient"></div>
                                <Search className="w-5 h-5 relative z-10 group-hover:rotate-12 transition-transform" />
                                <span className="relative z-10">Service खोजें</span>
                            </button>

                            <Link to="/login" state={{ from: location }} className="group px-8 py-4 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full text-slate-800 font-bold border border-slate-200 shadow-lg shadow-slate-200/50 transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center w-full sm:w-auto text-lg gap-2 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-50 to-teal-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <Briefcase className="w-5 h-5 text-slate-600 group-hover:text-emerald-600 transition-colors relative z-10" />
                                <span className="relative z-10 group-hover:text-emerald-700 transition-colors">Worker बनें</span>
                            </Link>
                        </motion.div>
                    </div>

                    {/* Right Column: Image */}
                    <motion.div
                        className="relative lg:h-[600px] w-full flex items-center justify-center order-2 px-4 lg:px-0 mt-10 lg:mt-0"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="relative w-full aspect-square max-w-[500px] lg:max-w-none">
                            {/* Blob Background */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-full blur-[80px] opacity-20 animate-pulse"></div>

                            {/* Main Image Container */}
                            <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-2xl shadow-blue-900/10 bg-slate-100">
                                <img
                                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1000&q=80"
                                    alt="Gig Workers Collaboration"
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                />

                                {/* 2M+ Downloads Badge - Top Left */}
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.6, type: "spring" }}
                                    className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl shadow-lg border border-slate-100 flex items-center gap-2 sm:gap-3 z-20"
                                >
                                    <div className="text-left">
                                        <p className="text-sm sm:text-lg font-bold text-slate-900 leading-none">2M+</p>
                                        <p className="text-[8px] sm:text-[10px] uppercase font-bold text-slate-400 tracking-wider">Downloads</p>
                                    </div>
                                    <div className="h-6 sm:h-8 w-px bg-slate-200"></div>
                                    <div className="flex items-center gap-1">
                                        <span className="text-yellow-400 text-sm sm:text-lg">★</span>
                                        <div className="text-left">
                                            <p className="text-sm sm:text-lg font-bold text-slate-900 leading-none">4.5</p>
                                            <p className="text-[8px] sm:text-[10px] uppercase font-bold text-slate-400 tracking-wider">Ratings</p>
                                        </div>
                                    </div>
                                </motion.div>



                                {/* Floating Card 2 */}
                                <motion.div
                                    initial={{ y: -20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 1, duration: 0.5 }}
                                    className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-white/90 backdrop-blur-md p-2 sm:p-4 rounded-xl border border-slate-200 shadow-xl shadow-black/5"
                                >
                                    <div className="flex -space-x-1.5 sm:-space-x-2 mb-1 sm:mb-2">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-slate-200 border-2 border-white">
                                                <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" className="w-full h-full rounded-full" />
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-[8px] sm:text-xs text-green-600 font-bold">10k+ Workers</p>
                                </motion.div>
                            </div>

                            {/* Floating "Subscription" Card */}
                            <motion.div
                                initial={{ y: 40, opacity: 0, scale: 0.9 }}
                                animate={{ y: 0, opacity: 1, scale: 1 }}
                                transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
                                className="relative sm:absolute bottom-auto sm:-bottom-10 md:bottom-24 sm:-left-10 md:-left-16 z-30 pointer-events-auto mt-6 sm:mt-0 mx-auto sm:mx-0 w-max"
                            >
                                <div className="relative group/card p-[2px] rounded-3xl overflow-hidden hover:scale-105 transition-all duration-500 shadow-[0_20px_50px_-15px_rgba(0,51,102,0.3)]">
                                    {/* Animated Logo Color Gradient Border */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#003366] via-[#66CC33] to-[#003366] bg-[length:200%_auto] animate-gradient opacity-90 group-hover/card:opacity-100 transition-opacity"></div>

                                    <div className="relative bg-white/95 backdrop-blur-md rounded-[calc(1.5rem-1px)] p-5 w-[230px] sm:w-[260px] flex flex-col gap-4 overflow-hidden">
                                        {/* Luxury Glass Shine Effect */}
                                        <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-1000 pointer-events-none">
                                            <div className="absolute top-0 -left-[100%] w-[100%] h-full bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer"></div>
                                        </div>

                                        <div className="flex items-center gap-3 relative z-10">
                                            <div className="w-11 h-11 bg-gradient-to-br from-[#003366] to-[#014c96] rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#003366]/20 group-hover/card:rotate-6 transition-transform">
                                                <Shield size={22} strokeWidth={2.5} className="group-hover/card:animate-pulse" />
                                            </div>
                                            <div>
                                                <h3 className="font-black text-slate-950 text-[13px] tracking-tight uppercase leading-none mb-1">RISK-FREE SUBSCRIPTION</h3>
                                                <div className="flex items-center gap-1.5">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-[#66CC33] animate-pulse"></div>
                                                    <p className="text-[10px] text-[#003366] font-black">Unlimited Verified Leads</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4 relative z-10">
                                            {/* Price Section with Border */}
                                            <div className="bg-white border-2 border-[#003366]/20 rounded-2xl p-4 text-center transform group-hover/card:translate-y-[-2px] transition-all duration-300 group-hover/card:border-[#003366]/40 shadow-sm leading-none">
                                                <div className="flex items-center justify-center gap-1">
                                                    <p className="text-3xl font-black text-slate-950">₹499</p>
                                                    <div className="text-left mt-1">
                                                        <p className="text-xs font-bold text-slate-600 leading-none">/mo</p>
                                                        <p className="text-[8px] font-black text-[#66CC33] uppercase">Best Value</p>
                                                    </div>
                                                </div>
                                                <p className="text-[9px] text-slate-500 font-extrabold mt-2 uppercase tracking-widest leading-none">(Taxes Included)</p>
                                            </div>

                                            {/* Guarantee Section with Border */}
                                            <div className="relative group/box">
                                                <div className="bg-gradient-to-br from-[#003366]/5 to-[#66CC33]/5 border-2 border-[#66CC33]/30 rounded-2xl p-4 group-hover/card:bg-white transition-all duration-500 text-center group-hover/card:border-[#66CC33]/50 shadow-sm">
                                                    <div className="flex flex-col items-center gap-2">
                                                        <p className="text-[10px] text-slate-950 font-black">0 Qualified Leads = Refund*</p>
                                                        <div className="flex items-center gap-2 w-full">
                                                            <div className="h-px flex-1 bg-slate-200"></div>
                                                            <p className="text-[9px] text-[#003366] font-black italic whitespace-nowrap px-1">Refund within 24 Hours</p>
                                                            <div className="h-px flex-1 bg-slate-200"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-2 pt-2 border-t border-slate-200 relative z-10">
                                            <div className="flex items-center justify-between">
                                                <div className="flex -space-x-2">
                                                    {[1, 2, 3, 4].map(i => (
                                                        <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200 shadow-sm overflow-hidden hover:z-20 transform hover:scale-110 transition-transform">
                                                            <img src={`https://i.pravatar.cc/100?img=${i + 50}`} className="w-full h-full object-cover" alt="User" />
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-[10px] text-slate-950 font-black">1000+ Workers</p>
                                                    <p className="text-[8px] text-[#66CC33] font-black uppercase">Platform Choice</p>
                                                </div>
                                            </div>
                                            <p className="text-[8px] text-slate-500 font-black italic text-center">*Tax Charges Deducted</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                {/* Trust Badges Section */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <TrustBadge icon={CheckCircle} title={t('statsProfessionals')} desc="Background checked pros" color="blue" />
                    <TrustBadge icon={CreditCard} title={t('noCommission')} desc="Direct earnings for workers" color="green" />
                    <TrustBadge icon={Zap} title={t('instantBooking')} desc="Connect in minutes" color="purple" />
                    <TrustBadge icon={Shield} title={t('securePayment')} desc="Safe & transparent" color="orange" />
                </motion.div>
            </div>
        </div>
    );
};

export default Hero;
