import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, MapPin, ShieldCheck, Check, Clock, Calendar, ArrowLeft, Heart, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

const ServiceDetail = () => {
    const { id } = useParams();
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');

    return (
        <div className="min-h-screen bg-white">
            {/* Immersive Hero Header */}
            <div className="relative h-[60vh] md:h-[70vh] bg-slate-900 overflow-hidden">
                <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 10 }}
                    className="absolute inset-0"
                >
                    <img
                        src="https://images.unsplash.com/photo-1581578731117-10452b7d702e?auto=format&fit=crop&q=80"
                        alt="Service Hero"
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div> {/* Seamless blend to white content */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent"></div>
                </motion.div>

                <div className="absolute top-0 left-0 right-0 p-6 z-20">
                    <div className="container mx-auto">
                        <Link to="/services" className="inline-flex items-center text-white/80 hover:text-white mb-8 font-medium transition-colors bg-black/20 backdrop-blur-md px-4 py-2 rounded-full">
                            <ArrowLeft size={18} className="mr-2" /> Back to Services
                        </Link>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 pb-12 z-20">
                    <div className="container mx-auto px-6">
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="max-w-4xl"
                        >
                            <div className="flex items-center gap-3 mb-4 text-white/90">
                                <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-lg uppercase tracking-wider">Home Cleaning</span>
                                <span className="flex items-center gap-1"><Star size={14} className="text-yellow-400 fill-current" /> 4.8 (124 reviews)</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-display font-extrabold text-slate-900 mb-4 leading-tight">
                                Professional Deep <br /> House Cleaning
                            </h1>
                            <p className="text-lg text-slate-600 max-w-2xl font-medium">
                                Experience a spotless home with our verified professional cleaning services. Includes deep sanitization and eco-friendly products.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 pb-24 -mt-8 relative z-30">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">

                        {/* Features Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { icon: ShieldCheck, label: 'Verified Pro', desc: 'Background Checked' },
                                { icon: Clock, label: 'On Time', desc: 'Guaranteed Arrival' },
                                { icon: Check, label: 'Eco-Friendly', desc: 'Safe Products' },
                                { icon: Star, label: 'Top Rated', desc: '4.8+ Rating' },
                            ].map((f, i) => (
                                <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex items-start gap-4">
                                    <div className="p-3 bg-white rounded-xl text-primary shadow-sm">
                                        <f.icon size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-dark-surface">{f.label}</h4>
                                        <p className="text-xs text-slate-500">{f.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Description */}
                        <div>
                            <h3 className="text-2xl font-bold font-display text-dark-surface mb-6">About this service</h3>
                            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
                                <p>
                                    Our Deep House Cleaning service is designed to thoroughly clean your home from top to bottom. Ideal for move-in/move-out cleaning, spring cleaning, or if you just haven't had a professional clean in a while.
                                </p>
                                <p>
                                    <strong>What's Included:</strong>
                                    <ul className="list-disc pl-5 space-y-1 mt-2">
                                        <li>Deep cleaning of all rooms (living, bedrooms, kitchen, bathrooms)</li>
                                        <li>Floor scrubbing and polishing</li>
                                        <li>Window and glass cleaning (interior)</li>
                                        <li>Furniture vacuuming and dusting</li>
                                        <li>Kitchen oil stain removal and cabinet cleaning</li>
                                    </ul>
                                </p>
                            </div>
                        </div>

                        {/* Provider Profile */}
                        <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/50">
                            <div className="flex justify-between items-start mb-6">
                                <h3 className="text-xl font-bold">Service Provider</h3>
                                <div className="text-green-600 font-bold text-sm bg-green-50 px-3 py-1 rounded-full flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Available Today
                                </div>
                            </div>

                            <div className="flex items-center gap-6">
                                <div className="relative">
                                    <img src="https://i.pravatar.cc/150?img=12" className="w-20 h-20 rounded-2xl object-cover shadow-md" alt="Provider" />
                                    <div className="absolute -bottom-2 -right-2 bg-white p-1 rounded-lg shadow-sm">
                                        <ShieldCheck className="text-blue-500 fill-blue-50" size={20} />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-xl text-dark-surface mb-1">Rahul Sharma</h4>
                                    <p className="text-sm text-slate-500 mb-2">Member since 2021 • 500+ Jobs Completed</p>
                                    <div className="flex gap-2">
                                        <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded-md">Vaccinated</span>
                                        <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded-md">English Speaking</span>
                                    </div>
                                </div>
                                <button className="btn-secondary px-4 py-2 text-sm h-10">View Profile</button>
                            </div>
                        </div>
                    </div>

                    {/* Booking Sidebar (Sticky) */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-28 bg-white rounded-[2rem] p-8 border border-slate-100 shadow-2xl shadow-slate-200/50">
                            <div className="flex justify-between items-end mb-8">
                                <div>
                                    <p className="text-sm text-slate-400 font-bold uppercase tracking-wider mb-1">Total Price</p>
                                    <div className="text-4xl font-bold text-primary">₹499</div>
                                </div>
                                <div className="flex gap-2">
                                    <button className="p-2 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-400 hover:text-red-500 transition-colors"><Heart size={20} /></button>
                                    <button className="p-2 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-400 hover:text-blue-500 transition-colors"><Share2 size={20} /></button>
                                </div>
                            </div>

                            <hr className="border-slate-100 mb-8" />

                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <label className="text-sm font-bold text-dark-surface">Select Date</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <input type="date" className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium" />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-sm font-bold text-dark-surface">Select Time</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {['10:00 AM', '12:00 PM', '02:00 PM', '04:00 PM'].map(time => (
                                            <button
                                                key={time}
                                                onClick={() => setSelectedTime(time)}
                                                className={`py-2 rounded-xl border font-semibold text-sm transition-all ${selectedTime === time ? 'border-primary bg-primary/5 text-primary' : 'border-slate-200 hover:border-slate-300 text-slate-500'}`}
                                            >
                                                {time}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <button className="btn-primary w-full py-4 text-lg shadow-xl shadow-primary/20 mt-4 group">
                                    Book Now
                                    <ArrowRight size={20} className="inline ml-2 group-hover:translate-x-1 transition-transform" />
                                </button>

                                <p className="text-xs text-center text-slate-400 flex items-center justify-center gap-1 mt-4">
                                    <ShieldCheck size={14} /> 100% Satisfaction Job Guarantee
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetail;
