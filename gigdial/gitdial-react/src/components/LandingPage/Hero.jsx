import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { motion } from 'framer-motion';
import { Search, Briefcase, MapPin, CheckCircle, Shield, Zap, CreditCard, Phone, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

const TrustBadge = ({ icon: Icon, title, desc, color = "blue" }) => {
    const colors = {
        blue: "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white",
        green: "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white",
        purple: "bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white",
        orange: "bg-orange-50 text-orange-600 group-hover:bg-orange-600 group-hover:text-white",
    };

    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="group flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 cursor-default relative overflow-hidden"
        >
            <div className={`p-3 rounded-xl transition-colors duration-300 ${colors[color]}`}>
                <Icon size={24} strokeWidth={2} />
            </div>
            <div>
                <h4 className="font-bold text-slate-900 text-sm group-hover:text-blue-700 transition-colors">{title}</h4>
                <p className="text-xs text-slate-500 font-medium mt-0.5">{desc}</p>
            </div>
            {/* Hover Glow Effect */}
            <div className="absolute -right-12 -top-12 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
        </motion.div>
    );
};

const Hero = () => {
    const { t } = useLanguage();
    const [cities, setCities] = useState([]);

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/cities');
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
    return (
        <div className="relative overflow-hidden bg-white pt-28 pb-16 lg:pt-32 lg:pb-24">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-blue-100/80 blur-[100px] animate-pulse" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-lime-100/80 blur-[120px] animate-pulse" style={{ animationDuration: '4s' }} />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center mb-16">
                    {/* Left Column: Content */}
                    <div className="flex flex-col items-start text-left">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-flex items-center space-x-2 py-2 px-4 rounded-full bg-blue-50 border border-blue-100 backdrop-blur-md text-blue-700 text-sm font-medium mb-8 shadow-sm">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                                </span>
                                <span>#1 Marketplace for Gig Workers</span>
                            </div>
                        </motion.div>

                        <motion.h1
                            className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.15]"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            {t('heroTitle')} <br />
                            <span className="bg-gradient-to-r from-blue-600 to-lime-600 bg-clip-text text-transparent text-3xl md:text-5xl lg:text-5xl">{t('heroPricing')}</span>
                        </motion.h1>

                        <motion.p
                            className="text-xl md:text-2xl font-medium text-slate-700 mb-8 italic"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            {t('heroSubtitle')}
                        </motion.p>

                        <motion.p
                            className="max-w-xl text-lg text-slate-600 mb-8 leading-relaxed"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            Digital Marketplace for Verified Gig Workers & On-Demand Services.
                            Find the right person for the job, instantly.
                        </motion.p>

                        <motion.div
                            className="w-full max-w-lg mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                        >
                            <div className="bg-white p-2 rounded-2xl shadow-lg border border-slate-200 flex flex-col sm:flex-row gap-2">
                                <div className="relative min-w-[160px]">
                                    <MapPin className="absolute left-3 top-3.5 text-slate-400" size={18} />
                                    <select className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-transparent rounded-xl focus:bg-white focus:border-blue-500 outline-none text-slate-700 font-medium appearance-none cursor-pointer hover:bg-slate-100 transition-colors">
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
                                <div className="flex-1 relative">
                                    <Search className="absolute left-3 top-3.5 text-slate-400" size={18} />
                                    <input
                                        type="text"
                                        placeholder={t('searchServices')}
                                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-transparent rounded-xl focus:bg-white focus:border-blue-500 outline-none text-slate-700 placeholder:text-slate-400 font-medium transition-colors"
                                    />
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                        >
                            <Link to="/services" className="group relative px-8 py-4 bg-slate-900 text-white rounded-full font-bold shadow-lg shadow-slate-900/20 hover:shadow-slate-900/40 transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center overflow-hidden w-full sm:w-auto text-lg gap-2 border border-transparent hover:border-slate-700/50">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[length:200%_auto] animate-gradient"></div>
                                <Search className="w-5 h-5 relative z-10 group-hover:rotate-12 transition-transform" />
                                <span className="relative z-10">Service खोजें</span>
                            </Link>

                            <Link to="/register" className="group px-8 py-4 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full text-slate-800 font-bold border border-slate-200 shadow-lg shadow-slate-200/50 transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center w-full sm:w-auto text-lg gap-2 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-50 to-teal-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <Briefcase className="w-5 h-5 text-slate-600 group-hover:text-emerald-600 transition-colors relative z-10" />
                                <span className="relative z-10 group-hover:text-emerald-700 transition-colors">Worker बनें</span>
                            </Link>
                        </motion.div>
                    </div>

                    {/* Right Column: Image */}
                    <motion.div
                        className="relative lg:h-[600px] w-full flex items-center justify-center"
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
                                    className="absolute top-6 left-6 bg-white px-4 py-2 rounded-xl shadow-lg border border-slate-100 flex items-center gap-3 z-20"
                                >
                                    <div className="text-left">
                                        <p className="text-lg font-bold text-slate-900 leading-none">2M+</p>
                                        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Downloads</p>
                                    </div>
                                    <div className="h-8 w-px bg-slate-200"></div>
                                    <div className="flex items-center gap-1">
                                        <span className="text-yellow-400 text-lg">★</span>
                                        <div className="text-left">
                                            <p className="text-lg font-bold text-slate-900 leading-none">4.5</p>
                                            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Ratings</p>
                                        </div>
                                    </div>
                                </motion.div>



                                {/* Floating Card 2 */}
                                <motion.div
                                    initial={{ y: -20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 1, duration: 0.5 }}
                                    className="absolute top-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-xl border border-slate-200 shadow-xl shadow-black/5"
                                >
                                    <div className="flex -space-x-2 mb-2">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white">
                                                <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" className="w-full h-full rounded-full" />
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-xs text-green-600 font-medium">10k+ Verified Workers</p>
                                </motion.div>
                            </div>

                            {/* Floating "Congratulations" Card (No Phone Frame) */}
                            <motion.div
                                initial={{ y: 40, opacity: 0, scale: 0.9 }}
                                animate={{ y: 0, opacity: 1, scale: 1 }}
                                transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
                                className="relative sm:absolute bottom-auto sm:bottom-24 sm:-left-16 z-30 pointer-events-auto mt-6 sm:mt-0 mx-auto sm:mx-0 w-max"
                            >
                                <div className="bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] p-5 w-[240px] border border-slate-100 relative overflow-hidden">
                                    {/* Background Decoration */}
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-emerald-50 to-transparent rounded-bl-3xl -z-10"></div>

                                    <div className="flex flex-col items-start gap-3">
                                        <div className="flex items-center gap-3 w-full">
                                            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600">
                                                <Check size={20} strokeWidth={3} />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-slate-800 text-sm">Congratulations!</h3>
                                                <p className="text-[10px] text-slate-500 font-medium">Number Activated</p>
                                            </div>
                                        </div>

                                        <div className="w-full bg-slate-50 border border-slate-100 rounded-lg p-3 text-center relative group">
                                            <p className="text-[9px] uppercase text-slate-400 font-bold tracking-wider mb-1">GIGDIAL BUSINESS NUMBER</p>
                                            <p className="text-lg font-mono font-bold text-slate-900 tracking-wider">
                                                081 4331 <span className="text-emerald-500">44XX</span>
                                            </p>
                                        </div>

                                        {/* Start Calling Button */}
                                        <button className="w-full bg-slate-900 text-white font-bold text-[10px] py-3 rounded-lg shadow-lg shadow-slate-900/10 hover:bg-emerald-600 hover:shadow-emerald-500/20 transition-all duration-300 flex items-center justify-center gap-2 group mt-1">
                                            <Phone size={12} className="group-hover:animate-pulse" />
                                            START CALLING
                                        </button>

                                        <div className="w-full flex items-center justify-between text-[10px] font-semibold text-slate-400 pt-1 border-t border-slate-100 mt-1">
                                            <span>Active Now</span>
                                            <div className="flex gap-1 items-center">
                                                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                                                <span className="text-emerald-600">Online</span>
                                            </div>
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
