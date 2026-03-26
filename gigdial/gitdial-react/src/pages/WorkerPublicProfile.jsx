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

// Skill cleaner helper to remove brackets and quotes
const cleanSkills = (skills) => {
    if (!skills) return [];
    if (Array.isArray(skills)) return skills.map(s => String(s).replace(/[\[\]"]/g, '').trim());
    if (typeof skills === 'string') {
        let clean = skills.trim();
        if (clean.startsWith('[') && clean.endsWith(']')) {
            try {
                const parsed = JSON.parse(clean);
                return Array.isArray(parsed) ? parsed.map(s => String(s).trim()) : [String(parsed).trim()];
            } catch (e) {
                return clean.slice(1, -1).split(',').map(s => s.trim().replace(/^["']|["']$/g, ''));
            }
        }
        return clean.split(',').map(s => s.trim().replace(/^["']|["']$/g, ''));
    }
    return [];
};

const ServiceCard = ({ title, rating, image, category, price, onBook, gigId, isBooking }) => {
    // Premium Category fallback images to ensure no broken links
    const getFallbackImage = (cat) => {
        const lowerCat = String(cat).toLowerCase();
        if (lowerCat.includes('fitness') || lowerCat.includes('gym')) return 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop';
        if (lowerCat.includes('driver')) return 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop';
        if (lowerCat.includes('plumber')) return 'https://images.unsplash.com/photo-1505798577917-a65157d3320a?q=80&w=2070&auto=format&fit=crop';
        if (lowerCat.includes('clean')) return 'https://images.unsplash.com/photo-1581578731548-c64695cc6958?q=80&w=2070&auto=format&fit=crop';
        if (lowerCat.includes('electric')) return 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2070&auto=format&fit=crop';
        return `https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop`; // General Professional Fallback
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onClick={() => !isBooking && onBook(gigId)}
            className={`bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer flex flex-col h-full ${isBooking ? 'opacity-70 grayscale-[0.5]' : ''}`}
        >
            <div className="h-40 overflow-hidden relative shrink-0">
                <img
                    src={getFullImagePath(image) || getFallbackImage(category)}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = getFallbackImage(category);
                    }}
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
                    disabled={isBooking}
                    onClick={(e) => { e.stopPropagation(); onBook(gigId); }}
                    className="w-full py-2 bg-pink-50 hover:bg-pink-100 text-pink-600 rounded-lg text-xs font-black uppercase tracking-widest transition-all mt-auto flex items-center justify-center gap-2"
                >
                    {isBooking ? 'Sending...' : 'Request Service'}
                    <ChevronRight size={14} />
                </button>
            </div>
        </motion.div>
    );
};

const WorkerPublicProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();
    const [worker, setWorker] = useState(null);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [bookingGigId, setBookingGigId] = useState(null);

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

    const handleBookService = async (gigId) => {
        if (!user) {
            toast.error('Please login to send requests');
            navigate('/login', { state: { from: location, bookingGigId: gigId } });
            return;
        }

        const selectedGig = services.find(s => s._id === gigId);
        if (!selectedGig) return;

        setBookingGigId(gigId);
        try {
            const res = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({
                    gig: selectedGig._id,
                    seller: worker._id,
                    title: selectedGig.title,
                    description: selectedGig.description,
                    price: selectedGig.price,
                    deliveryTime: selectedGig.deliveryTime || 1,
                    paymentMethod: 'request',
                    notes: `Service request initiated from ${worker.name}'s profile.`
                })
            });

            if (res.ok) {
                toast.success(`Request sent to ${worker.name}!`, {
                    duration: 4000,
                    icon: '🚀'
                });
                navigate('/customer-dashboard/orders');
            } else {
                const data = await res.json();
                toast.error(data.message || 'Failed to send request');
            }
        } catch (error) {
            console.error('Booking error:', error);
            toast.error('Something went wrong. Please try again.');
        } finally {
            setBookingGigId(null);
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="w-10 h-10 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    if (!worker) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Worker Profile Missing</h2>
            <button onClick={handleBack} className="px-6 py-2 bg-pink-50 text-white rounded-lg font-bold">Go Back</button>
        </div>
    );

    const skills = cleanSkills(worker.skills);

    return (
        <div className="min-h-screen bg-[#F7F7F7] pb-20 font-sans">


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
                                            src={getFullImagePath(worker.profileImage) || `https://ui-avatars.com/api/?name=${encodeURIComponent(worker.name)}&background=random&color=fff&size=512`} 
                                            className="w-full h-full object-cover transition-all"
                                            alt={worker.name}
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(worker.name)}&background=random&color=fff&size=512`;
                                            }}
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
                                        <button 
                                            onClick={() => navigate(`/customer-dashboard/messages?workerId=${worker._id}`)}
                                            className="flex items-center gap-2 px-6 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-all shadow-sm font-bold text-sm"
                                        >
                                            Contact
                                        </button>
                                        <button 
                                            onClick={() => navigate(`/customer-dashboard/messages?workerId=${worker._id}`)}
                                            className="px-10 py-2.5 bg-[#e91e63] text-white rounded-lg font-bold text-sm shadow-md hover:bg-[#d81b60] transition-all"
                                        >
                                            Hire Now
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
                            {/* Offered Services */}
                            {services.length > 0 && (
                                <section>
                                    <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-4">
                                        <h3 className="text-xl font-black text-slate-900">My Offered Services</h3>
                                    </div>
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
                                                isBooking={bookingGigId === s._id}
                                            />
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Expertise & Skills */}
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkerPublicProfile;
