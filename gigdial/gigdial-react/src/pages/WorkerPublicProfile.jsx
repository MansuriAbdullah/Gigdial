import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
    MapPin, Star, Briefcase, Calendar, CheckCircle,
    User, Mail, Phone, Shield, ArrowLeft, Heart, MessageSquare,
    Clock, Award, Zap, TrendingUp, X, Send, LayoutDashboard,
    Share2, ExternalLink, Globe, DollarSign, PieChart, CheckCircle2,
    CalendarDays, ThumbsUp, CreditCard, Facebook, Twitter, Linkedin, ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

import { getFullImagePath } from '../utils/imagePath';

// Skill cleaner helper
const cleanSkills = (skills) => {
    if (!skills) return [];
    if (Array.isArray(skills)) return skills.map(s => String(s).replace(/[\[\]"]/g, '').trim());
    if (typeof skills === 'string') {
        let clean = skills.trim();
        if (clean.startsWith('[') && clean.endsWith(']')) {
            try {
                return JSON.parse(clean).map(s => String(s).trim());
            } catch (e) {
                return clean.slice(1, -1).split(',').map(s => s.trim().replace(/^["']|["']$/g, ''));
            }
        }
        return clean.split(',').map(s => s.trim());
    }
    return [];
};

const ServiceCard = ({ title, rating, image, category, price, bookings, onBook, gigId }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        onClick={() => onBook(gigId)}
        className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer flex flex-col h-full"
    >
        <div className="h-40 overflow-hidden relative shrink-0">
            <img
                src={getFullImagePath(image)}
                alt={title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded text-[10px] font-bold text-slate-900 border border-slate-200 shadow-sm">
                {category}
            </div>
        </div>
        <div className="p-4 flex flex-col flex-grow">
            <h3 className="font-bold text-slate-900 line-clamp-1 group-hover:text-pink-600 transition-colors mb-2">{title}</h3>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1 text-xs font-bold text-slate-600">
                    <Star size={14} className="text-pink-500 fill-pink-500" />
                    {rating}
                </div>
                <div className="text-sm font-bold text-slate-900">₹{price}</div>
            </div>
            
            <button 
                onClick={(e) => { e.stopPropagation(); onBook(gigId); }}
                className="w-full py-2 bg-pink-50 hover:bg-pink-100 text-pink-600 rounded-lg text-xs font-black uppercase tracking-widest transition-all mt-auto flex items-center justify-center gap-2"
            >
                Request Service
                <ChevronRight size={14} />
            </button>
        </div>
    </motion.div>
);

const WorkerPublicProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();
    const [worker, setWorker] = useState(null);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const workerRes = await fetch(`/api/users/workers/${id}`);
                if (workerRes.ok) {
                    const data = await workerRes.json();
                    setWorker(data);
                }
                const gigsRes = await fetch(`/api/gigs/worker/${id}`);
                if (gigsRes.ok) {
                    setServices(await gigsRes.json());
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleBack = () => navigate(-1);

    const handleBookService = (gigId) => {
        const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
        if (!user || (user && !user._id) || !userInfo) {
            toast.error('Please login first');
            navigate('/login', { state: { from: location, bookingGigId: gigId } });
            return;
        }
        navigate(`/customer-dashboard/messages?workerId=${worker._id}`);
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="w-10 h-10 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    if (!worker) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Worker Profile Missing</h2>
            <button onClick={handleBack} className="px-6 py-2 bg-pink-500 text-white rounded-lg font-bold">Go Back</button>
        </div>
    );

    const skills = cleanSkills(worker.skills);

    return (
        <div className="min-h-screen bg-[#F7F7F7] pb-20 font-sans">
            {/* Top Minimalist Category Bar */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 h-12 flex items-center gap-8 overflow-x-auto no-scrollbar">
                    <span className="text-[10px] font-black uppercase text-slate-400">Explore</span>
                    {['Web Development', 'Design', 'Marketing', 'Writing', 'Virtual Assistant', 'IT Support'].map(cat => (
                        <span key={cat} className="text-[11px] font-bold text-slate-600 hover:text-pink-500 cursor-pointer whitespace-nowrap transition-colors">{cat}</span>
                    ))}
                </div>
            </div>

            {/* Banner Section */}
            <div className="h-[200px] md:h-[260px] relative w-full overflow-hidden">
                <img 
                    src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop" 
                    className="w-full h-full object-cover" 
                    alt="Banner"
                />
                <div className="absolute inset-0 bg-slate-900/10"></div>
                <div className="absolute top-4 left-4">
                    <button onClick={handleBack} className="p-2 bg-white/20 backdrop-blur-md rounded-lg text-white hover:bg-white/40 shadow-xl transition-all">
                        <ArrowLeft size={20} />
                    </button>
                </div>
            </div>

            {/* Profile Info Section */}
            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row gap-8 items-start -mt-16">
                    {/* Left Main Content */}
                    <div className="flex-grow bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-10 w-full overflow-hidden">
                        {/* Avatar & Basic Info */}
                        <div className="flex flex-col md:flex-row gap-8 items-start mb-8 border-b border-slate-100 pb-10">
                            <div className="relative shrink-0">
                                <div className="w-40 h-40 md:w-52 md:h-52 rounded-2xl border-4 border-white shadow-2xl overflow-hidden bg-slate-100 p-1">
                                    <div className="w-full h-full rounded-xl overflow-hidden">
                                        <img 
                                            src={getFullImagePath(worker.profileImage) || `https://ui-avatars.com/api/?name=${worker.name}&size=200`} 
                                            className="w-full h-full object-cover"
                                            alt={worker.name}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex-grow pt-2">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-4">
                                    <div>
                                        <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-1 leading-tight tracking-tight">
                                            {worker.name}
                                        </h1>
                                        <p className="text-slate-500 font-bold text-lg">@{worker.username || worker.name.toLowerCase().replace(/\s/g, '') || 'worker'}</p>
                                    </div>
                                    <div className="flex gap-3 self-center md:self-start">
                                        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-all shadow-sm font-bold text-sm">
                                            <Share2 size={16} />
                                        </button>
                                        <button className="flex items-center gap-2 px-6 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-all shadow-sm font-bold text-sm">
                                            Invite to Bid
                                        </button>
                                        <button 
                                            onClick={() => navigate(`/customer-dashboard/messages?workerId=${worker._id}`)}
                                            className="px-10 py-2.5 bg-[#e91e63] text-white rounded-lg font-bold text-sm shadow-md hover:bg-[#d81b60] transition-all"
                                        >
                                            Contact
                                        </button>
                                    </div>
                                </div>

                                {/* Stats Bar */}
                                <div className="flex flex-wrap items-center gap-6 mb-8 mt-6">
                                    <div className="flex items-center gap-1.5">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={18} className={i < Math.floor(worker.rating || 5) ? "text-pink-500 fill-pink-500" : "text-slate-200 fill-slate-200"} />
                                        ))}
                                        <span className="text-lg font-bold text-slate-900 ml-1">{worker.rating || '5.0'}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-600 font-bold text-sm">
                                        <MessageSquare size={18} className="text-[#00aff0]" />
                                        <span>{worker.numReviews || 0} reviews</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-600 font-bold text-sm">
                                        <DollarSign size={18} className="text-[#4caf50]" />
                                        <span>9.2 Earnings</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-600 font-bold text-sm">
                                        <PieChart size={18} className="text-[#00aff0]" />
                                        <span>100% Success</span>
                                    </div>
                                </div>

                                <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-4">{skills[0] || 'Expert Specialist'}</h2>
                                
                                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-bold text-slate-500 mb-8 pb-8 border-b border-slate-100">
                                    <span className="text-slate-900">₹{worker.price || '499'} / Hour</span>
                                    <div className="flex items-center gap-1.5">
                                        <MapPin size={16} />
                                        <span>{worker.city || 'India'}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <CalendarDays size={16} />
                                        <span>Joined {new Date(worker.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <ThumbsUp size={16} />
                                        <span>{worker.recommendations || 0} Recommendations</span>
                                    </div>
                                </div>

                                {/* Bio */}
                                <div className="space-y-4">
                                    <p className="text-slate-600 leading-relaxed font-medium text-lg">
                                        {worker.bio || "Crafting excellence and delivering results with professional dedication. I aim to provide top-tier services that exceed expectations."}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Additional Sections */}
                        <div className="space-y-12">
                            {/* Skills Tag Cloud */}
                            <section>
                                <h3 className="text-xl font-black text-slate-900 mb-6">Expertise & Skills</h3>
                                <div className="flex flex-wrap gap-2">
                                    {skills.map((skill, idx) => (
                                        <span key={idx} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold hover:bg-pink-50 hover:text-pink-600 transition-colors cursor-default border border-slate-200">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </section>

                            {/* Offered Services */}
                            {services.length > 0 && (
                                <section>
                                    <h3 className="text-xl font-black text-slate-900 mb-8 border-b border-slate-100 pb-4">My Offered Services</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {services.map(s => (
                                            <ServiceCard 
                                                key={s._id} 
                                                gigId={s._id} 
                                                title={s.title} 
                                                rating={s.rating || '5.0'} 
                                                image={s.image} 
                                                category={s.category} 
                                                price={s.price} 
                                                onBook={handleBookService} 
                                            />
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Reviews */}
                            <section>
                                <h3 className="text-xl font-black text-slate-900 mb-8 border-b border-slate-100 pb-4">Recent Reviews</h3>
                                <div className="space-y-6">
                                    {worker.reviews?.map(review => (
                                        <div key={review._id} className="p-6 bg-slate-50 border border-slate-100 rounded-xl">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                                                        <img src={getFullImagePath(review.reviewer?.profileImage)} alt="" className="w-full h-full object-cover" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-slate-900">{review.reviewer?.name}</h4>
                                                        <div className="flex items-center gap-0.5 mt-0.5">
                                                            {[...Array(5)].map((_, i) => (
                                                                <Star key={i} size={10} className={i < review.rating ? "text-pink-500 fill-pink-500" : "text-slate-300"} />
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{new Date(review.createdAt).toLocaleDateString()}</span>
                                            </div>
                                            <p className="text-slate-600 font-medium text-sm leading-relaxed">{review.comment}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="w-full md:w-80 space-y-8 h-fit">
                        {/* Verifications Box */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
                            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-8 pb-4 border-b border-slate-100">Verifications</h3>
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4 text-pink-600">
                                        <User size={18} />
                                        <span className="text-sm font-bold text-slate-700">Identity Verified</span>
                                    </div>
                                    <CheckCircle size={16} className="text-pink-500 shrink-0" />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4 text-pink-600">
                                        <CreditCard size={18} />
                                        <span className="text-sm font-bold text-slate-700">Payment Verified</span>
                                    </div>
                                    <CheckCircle size={16} className="text-pink-500 shrink-0" />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4 text-pink-600">
                                        <Mail size={18} />
                                        <span className="text-sm font-bold text-slate-700">Email Verified</span>
                                    </div>
                                    <CheckCircle size={16} className="text-pink-500 shrink-0" />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4 text-pink-600">
                                        <Phone size={18} />
                                        <span className="text-sm font-bold text-slate-700">Phone Verified</span>
                                    </div>
                                    <CheckCircle size={16} className="text-pink-500 shrink-0" />
                                </div>
                            </div>

                            {/* Performance Metrics */}
                            <div className="mt-12 pt-10 border-t border-slate-100 space-y-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold text-slate-500">On time</span>
                                    <span className="text-sm font-black text-slate-900">99%</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold text-slate-500">On budget</span>
                                    <span className="text-sm font-black text-slate-900">100%</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold text-slate-500">Accept rate</span>
                                    <span className="text-sm font-black text-slate-900">58%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkerPublicProfile;
