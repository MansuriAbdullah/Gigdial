import React, { useState } from 'react';
import {
    User, Mail, Phone, MapPin, Camera, Save, Shield,
    Briefcase, Calendar, Star, CheckCircle, Clock,
    Image as ImageIcon, Trash2, Leaf, Mic, Info, ChevronDown,
    IndianRupee
} from 'lucide-react';

const UserProfile = ({ role = 'worker' }) => {
    const isWorker = role === 'worker';

    // State for Portfolio Images
    const [portfolioImages, setPortfolioImages] = useState([
        "https://images.unsplash.com/photo-1584622050111-993a426fbf0a?auto=format&fit=crop&q=80&w=400",
        "https://images.unsplash.com/photo-1631641551473-f30a2241f69c?auto=format&fit=crop&q=80&w=400"
    ]);

    return (
        <div className="animate-fade-in max-w-[1600px] mx-auto pb-20 font-sans text-slate-800">
            {/* Header / Cover Image */}
            <div className="relative mb-28 group">
                {/* Banner */}
                <div className="h-64 rounded-[2.5rem] bg-slate-900 relative overflow-hidden shadow-lg">
                    <img
                        src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop"
                        alt="Cover"
                        className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80"></div>

                    <button className="absolute bottom-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 duration-300">
                        <Camera size={18} /> Edit Cover
                    </button>
                </div>

                {/* Profile Info Overlay */}
                <div className="absolute -bottom-20 left-10 flex items-end gap-8">
                    <div className="relative">
                        <div className="w-40 h-40 rounded-full border-[6px] border-white shadow-2xl overflow-hidden bg-white relative z-10 group/avatar cursor-pointer">
                            <img
                                src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&q=80&w=400"
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity">
                                <Camera className="text-white" size={24} />
                            </div>
                        </div>
                        <div className="absolute bottom-2 right-2 z-20 bg-green-500 border-4 border-white w-6 h-6 rounded-full"></div>
                    </div>

                    <div className="pb-2 mb-1">
                        <div className="flex items-center gap-4 mb-2">
                            <h1 className="text-4xl font-display font-bold text-slate-900 tracking-tight">Rajesh Kumar</h1>
                            {isWorker && (
                                <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold border border-blue-100 flex items-center gap-1">
                                    <Shield size={12} className="fill-blue-600" />
                                    Verified Pro
                                </span>
                            )}
                        </div>
                        <div className="flex items-center gap-4 text-slate-500 font-medium text-sm">
                            <span className="flex items-center gap-1.5 text-slate-700 font-bold">
                                <Briefcase size={16} className="text-primary" />
                                Professional Plumber
                            </span>
                            <span className="w-1.5 h-1.5 bg-slate-300 rounded-full"></span>
                            <span className="flex items-center gap-1.5">
                                <MapPin size={16} className="text-slate-400" />
                                Ahmedabad, Gujarat
                            </span>
                            <span className="w-1.5 h-1.5 bg-slate-300 rounded-full"></span>
                            <span className="flex items-center gap-1.5">
                                <Star size={16} className="text-yellow-400 fill-yellow-400" />
                                4.9 (120+ Reviews)
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 px-4">

                {/* Column 1: Basic Info */}
                <div className="space-y-6">
                    {/* Basic Information */}
                    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <User className="text-primary" size={24} />
                            <h3 className="text-xl font-bold text-slate-900">Basic Information</h3>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Full Name <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <input type="text" defaultValue="Rajesh Kumar" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:border-primary outline-none transition-all font-medium" />
                                    <Mic className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer hover:text-primary transition-colors" size={18} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Phone Number <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">+91</span>
                                    <input type="tel" defaultValue="98765 43210" className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:border-primary outline-none transition-all font-medium" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Email Address</label>
                                <input type="email" defaultValue="rajesh.kumar@email.com" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:border-primary outline-none transition-all font-medium" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Date of Birth</label>
                                <div className="relative">
                                    <input type="text" defaultValue="15-06-1985" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:border-primary outline-none transition-all font-medium" />
                                    <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer" size={18} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Professional Bio</label>
                                <div className="relative">
                                    <textarea
                                        rows="4"
                                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:border-primary outline-none transition-all font-medium resize-none text-sm leading-relaxed"
                                        defaultValue="Experienced plumber with 15+ years in residential and commercial plumbing. Specialized in eco-friendly solutions and emergency repairs."
                                    ></textarea>
                                    <Mic className="absolute right-4 bottom-4 text-slate-400 cursor-pointer hover:text-primary transition-colors bg-white p-1 rounded-md shadow-sm border border-slate-100" size={20} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Column 2: Contact, Pricing, Sustainability */}
                <div className="space-y-6">
                    {/* Contact & Location */}
                    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <MapPin className="text-primary" size={24} />
                            <h3 className="text-xl font-bold text-slate-900">Contact & Location</h3>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">City <span className="text-red-500">*</span></label>
                                <input type="text" defaultValue="Ahmedabad" className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:border-primary outline-none transition-all font-medium text-sm" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">State <span className="text-red-500">*</span></label>
                                <input type="text" defaultValue="Gujarat" className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:border-primary outline-none transition-all font-medium text-sm" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Pincode</label>
                                <input type="text" defaultValue="380058" className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:border-primary outline-none transition-all font-medium text-sm" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Radius (km)</label>
                                <div className="relative">
                                    <input type="number" defaultValue="15" className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:border-primary outline-none transition-all font-medium appearance-none text-sm" />
                                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Full Address</label>
                            <textarea
                                rows="2"
                                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:border-primary outline-none transition-all font-medium resize-none text-sm"
                                defaultValue="123, Green Park Society, Bopal, Ahmedabad"
                            ></textarea>
                        </div>
                    </div>

                    {/* Pricing Guidelines */}
                    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                <IndianRupee size={20} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900">Pricing Guidelines</h3>
                        </div>

                        <div className="bg-blue-50 rounded-xl p-4 flex gap-3 mb-6">
                            <Info className="text-blue-600 shrink-0 mt-0.5" size={18} />
                            <p className="text-xs text-blue-800 leading-relaxed font-medium">
                                These are your reference prices. Actual pricing is discussed with, and negotiated by, customers via "Call to Quote".
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-700">Min Service Charge (₹)</label>
                                <input type="number" defaultValue="299" className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:border-primary outline-none transition-all font-bold text-slate-800" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-700">Hourly Rate (Optional)</label>
                                <input type="number" defaultValue="500" className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:border-primary outline-none transition-all font-bold text-slate-800" />
                            </div>
                        </div>
                    </div>

                    {/* Sustainability Badge */}
                    <div className="bg-green-50/30 p-6 rounded-[2rem] border border-green-100 shadow-sm relative overflow-hidden">
                        <div className="flex items-center gap-3 mb-4 relative">
                            <Leaf className="text-green-600" size={24} />
                            <h3 className="text-xl font-bold text-slate-900">Sustainability Badge</h3>
                        </div>

                        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-green-100 relative">
                            <div className="flex items-center gap-2 text-green-800 font-bold mb-2 text-sm">
                                <Shield size={16} className="fill-green-100" />
                                Apply for Eco-Friendly Badge
                            </div>
                            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                                Get verified as an eco-friendly provider to attract conscious customers.
                            </p>
                            <textarea
                                rows="3"
                                className="w-full px-4 py-3 bg-white border border-green-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-50 outline-none transition-all font-medium resize-none placeholder:text-slate-400 text-xs mb-3"
                                defaultValue="I use water-efficient fixtures and promote sustainable plumbing solutions."
                            ></textarea>
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-yellow-50 text-yellow-700 border border-yellow-100 rounded-full text-[10px] font-bold uppercase tracking-wider">
                                <Clock size={12} />
                                Pending Review
                            </div>
                        </div>
                    </div>
                </div>

                {/* Column 3: Skills, Availability */}
                <div className="space-y-6">
                    {/* Experience & Skills */}
                    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <Briefcase className="text-primary" size={24} />
                            <h3 className="text-xl font-bold text-slate-900">Experience & Skills</h3>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-700 block">Experience (Yrs)</label>
                                <input type="text" defaultValue="15" className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:border-primary outline-none transition-all font-medium text-sm" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-700 block">Primary Category</label>
                                <div className="relative">
                                    <select className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:border-primary outline-none transition-all font-medium appearance-none cursor-pointer text-sm">
                                        <option>Plumbing</option>
                                        <option>Electrical</option>
                                    </select>
                                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3 mb-6">
                            <label className="text-sm font-bold text-slate-700">Service Skills</label>
                            <div className="flex flex-wrap gap-2">
                                {[
                                    'Tap Repair', 'Pipe Installation', 'Bathroom Fitting',
                                    'Water Heater', 'Drainage', 'Leak Detection'
                                ].map((skill, idx) => (
                                    <label key={idx} className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-100 bg-slate-50 hover:bg-white hover:border-primary transition-all cursor-pointer group">
                                        <div className={`w-4 h-4 rounded flex items-center justify-center border transition-all ${idx < 3 || idx === 4 ? 'bg-primary border-primary text-white' : 'bg-white border-slate-300'}`}>
                                            {(idx < 3 || idx === 4) && <CheckCircle size={10} strokeWidth={4} />}
                                        </div>
                                        <span className="text-slate-700 font-medium text-xs">{skill}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-sm font-bold text-slate-700">Languages</label>
                            <div className="flex flex-wrap gap-2">
                                {['Hindi', 'Gujarati', 'English', 'Marathi'].map((lang, idx) => (
                                    <label key={idx} className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all cursor-pointer ${idx < 3 ? 'bg-slate-100 border-slate-200' : 'bg-white border-slate-100'}`}>
                                        <div className={`w-3 h-3 rounded-full flex items-center justify-center border ${idx < 3 ? 'bg-primary border-primary' : 'bg-white border-slate-300'}`}></div>
                                        <span className="text-slate-700 font-bold text-xs">{lang}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Availability */}
                    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <Calendar className="text-primary" size={24} />
                            <h3 className="text-xl font-bold text-slate-900">Availability</h3>
                        </div>

                        <div className="space-y-4">
                            {[
                                { day: 'Mon', checked: true }, { day: 'Tue', checked: true },
                                { day: 'Wed', checked: true }, { day: 'Thu', checked: false },
                                { day: 'Fri', checked: false }, { day: 'Sat', checked: false },
                                { day: 'Sun', checked: false },
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between pb-3 border-b border-slate-50 last:border-0 last:pb-0">
                                    <label className="flex items-center gap-3 cursor-pointer w-24">
                                        <div className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${item.checked ? 'bg-primary border-primary text-white' : 'bg-white border-slate-300'}`}>
                                            {item.checked && <CheckCircle size={12} strokeWidth={3} />}
                                        </div>
                                        <span className="font-bold text-slate-700 text-sm">{item.day}</span>
                                    </label>

                                    <div className={`flex items-center gap-2 transition-opacity ${item.checked ? 'opacity-100' : 'opacity-30 pointer-events-none'}`}>
                                        <div className="bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 text-xs font-bold text-slate-600">09:00</div>
                                        <span className="text-slate-300">-</span>
                                        <div className="bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 text-xs font-bold text-slate-600">18:00</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Portfolio: Grid Col Span Full or placed at bottom */}
                <div className="xl:col-span-3">
                    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <ImageIcon className="text-primary" size={24} />
                                <h3 className="text-xl font-bold text-slate-900">Portfolio</h3>
                            </div>
                            <div className="bg-blue-50 hover:bg-blue-100 rounded-full px-4 py-2 flex items-center gap-3 cursor-pointer transition-colors">
                                <span className="font-bold text-blue-900 text-xs">Enable AR View</span>
                                <div className="relative inline-flex items-center">
                                    <div className="w-8 h-4 bg-blue-200 rounded-full"></div>
                                    <div className="w-4 h-4 bg-primary rounded-full absolute right-0 shadow-sm border border-white"></div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {portfolioImages.map((src, idx) => (
                                <div key={idx} className="relative group rounded-2xl overflow-hidden aspect-square border border-slate-100">
                                    <img src={src} className="w-full h-full object-cover transition-transform group-hover:scale-105" alt="Portfolio" />
                                    <button
                                        onClick={() => setPortfolioImages(portfolioImages.filter((_, i) => i !== idx))}
                                        className="absolute top-2 right-2 p-1.5 bg-white/90 text-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-sm"
                                    >
                                        <Trash2 size={12} />
                                    </button>
                                </div>
                            ))}
                            <button className="aspect-square rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 hover:border-primary hover:text-primary hover:bg-slate-50 transition-all gap-1 group">
                                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                                    <span className="text-lg font-light group-hover:text-primary">+</span>
                                </div>
                                <span className="text-xs font-bold">Add Photo</span>
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            {/* Footer Actions */}
            <div className="flex justify-end gap-4 mt-8 px-4 pb-8">
                <button className="px-8 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-colors">
                    Cancel
                </button>
                <button className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold shadow-lg shadow-green-200 transition-all active:scale-95 flex items-center gap-2">
                    <Save size={18} />
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default UserProfile;
