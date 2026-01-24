import React, { useState } from 'react';
import {
    User, Mail, Phone, MapPin, Camera, Save, Shield,
    Briefcase, Calendar, Star
} from 'lucide-react';
import { motion } from 'framer-motion';

const UserProfile = ({ role = 'worker' }) => {
    // Determine layout/fields based on role (Customer vs Worker)
    const isWorker = role === 'worker';

    const [bgImage, setBgImage] = useState("https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80");
    const [avatar, setAvatar] = useState("https://i.pravatar.cc/150?img=11");

    return (
        <div className="animate-fade-in max-w-5xl mx-auto pb-20">
            {/* Header / Cover Image */}
            <div className="relative h-64 rounded-t-[2.5rem] overflow-hidden group">
                <img src={bgImage} className="w-full h-full object-cover" alt="Cover" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                <button className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-md border border-white/50 text-white px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-white/30 transition-all opacity-0 group-hover:opacity-100">
                    <Camera size={16} /> Edit Cover
                </button>
            </div>

            {/* Profile Info Card (Overlapping) */}
            <div className="relative px-8 -mt-20 mb-8">
                <div className="flex flex-col md:flex-row items-end md:items-center gap-6">
                    <div className="relative">
                        <div className="w-32 h-32 rounded-3xl border-4 border-white shadow-lg overflow-hidden bg-white">
                            <img src={avatar} className="w-full h-full object-cover" alt="Avatar" />
                        </div>
                        <button className="absolute bottom-2 right-2 p-2 bg-primary text-white rounded-full shadow-lg hover:scale-110 transition-transform">
                            <Camera size={16} />
                        </button>
                    </div>

                    <div className="flex-1 pb-2">
                        <h1 className="text-3xl font-display font-bold text-dark-surface mb-1 flex items-center gap-2">
                            Rahul Kumar
                            {isWorker && <Shield size={20} className="text-green-500 fill-current" />}
                        </h1>
                        <p className="text-slate-500 font-medium flex items-center gap-4">
                            <span>{isWorker ? 'Professional Electrician' : 'Premium Member'}</span>
                            <span className="w-1 h-1 bg-slate-400 rounded-full"></span>
                            <span className="flex items-center gap-1"><MapPin size={14} /> Mumbai, India</span>
                        </p>
                    </div>

                    <div className="flex gap-3 pb-2">
                        <button className="btn-secondary px-6">Public View</button>
                        <button className="btn-primary px-6 flex items-center gap-2">
                            <Save size={18} /> Save Changes
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-4">
                {/* Left Column: Personal Info form */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                        <h3 className="text-xl font-bold text-dark-surface mb-6">Personal Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input type="text" defaultValue="Rahul Kumar" className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-primary outline-none transition-all" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input type="email" defaultValue="rahul.k@example.com" className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-primary outline-none transition-all" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Phone</label>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input type="tel" defaultValue="+91 98765 43210" className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-primary outline-none transition-all" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Location</label>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input type="text" defaultValue="Andheri West, Mumbai" className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-primary outline-none transition-all" />
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 space-y-2">
                            <label className="text-sm font-bold text-slate-700">About Me</label>
                            <textarea rows="4" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:border-primary outline-none transition-all resize-none" defaultValue="I am a certified experience electrician with over 5 years of field work. Specialized in home wiring and appliance repair."></textarea>
                        </div>
                    </div>

                    {isWorker && (
                        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                            <h3 className="text-xl font-bold text-dark-surface mb-6">Professional Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Experience</label>
                                    <div className="relative">
                                        <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <input type="text" defaultValue="5 Years" className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-primary outline-none transition-all" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Daily Rate (₹)</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                                        <input type="number" defaultValue="500" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-primary outline-none transition-all" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Column: Stats & Badges */}
                <div className="space-y-8">
                    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold text-lg">Profile Strength</h3>
                            <span className="text-green-600 font-bold">85%</span>
                        </div>
                        <div className="w-full h-3 bg-slate-100 rounded-full mb-2 overflow-hidden">
                            <div className="w-[85%] h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full"></div>
                        </div>
                        <p className="text-xs text-slate-400">Complete your bio to reach 100%</p>
                    </div>

                    {isWorker && (
                        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                            <h3 className="font-bold text-lg mb-4">Verification Status</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl border border-green-100">
                                    <div className="flex items-center gap-3">
                                        <Shield className="text-green-600" size={18} />
                                        <span className="font-semibold text-green-800 text-sm">ID Verified</span>
                                    </div>
                                    <CheckCircle size={18} className="text-green-600" />
                                </div>
                                <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl border border-green-100">
                                    <div className="flex items-center gap-3">
                                        <Briefcase className="text-green-600" size={18} />
                                        <span className="font-semibold text-green-800 text-sm">Skill Check</span>
                                    </div>
                                    <CheckCircle size={18} className="text-green-600" />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// Internal icon helper
const CheckCircle = ({ size, className }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" class={className} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>;

export default UserProfile;
