import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Zap, HeartHandshake, Star, Users, CheckCircle2, ArrowRight, ClipboardList, Clock, Banknote, MessageSquare, AlertCircle } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const RequireWorker = () => {
    const { t } = useLanguage();
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        category: '',
        days: '',
        budget: '',
        description: ''
    });

    const categories = ['Driver', 'Plumber', 'Electrician', 'House Help', 'Tutor', 'Fitness', 'Elder Care', 'IT Support', 'Cleaning', 'Electrical', 'Carpentry', 'Painting', 'Appliance Repair'];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            toast.error('Please login to post a requirement');
            navigate('/login', { state: { from: location } });
            return;
        }

        setLoading(true);
        try {
            await axios.post('/api/job-requests', formData, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            toast.success('Requirement posted successfully! Workers will contact you soon.');
            setFormData({ category: '', days: '', budget: '', description: '' });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to post requirement');
        } finally {
            setLoading(false);
        }
    };

    const benefits = [
        {
            icon: ShieldCheck,
            title: "Verified Professionals",
            description: "Every worker on GigDial goes through a multi-step background check and skill assessment.",
            color: "text-blue-600",
            bg: "bg-blue-50"
        },
        {
            icon: Zap,
            title: "Instant Response",
            description: "Get connected with available workers in your area within minutes of posting your requirement.",
            color: "text-amber-600",
            bg: "bg-amber-50"
        },
        {
            icon: HeartHandshake,
            title: "Trust & Safety",
            description: "Secure payments and dispute resolution ensure you only pay for quality work.",
            color: "text-rose-600",
            bg: "bg-rose-50"
        }
    ];

    const stats = [
        { label: "Expert Workers", value: "10,000+" },
        { label: "Successful Jobs", value: "50,000+" },
        { label: "Average Rating", value: "4.8/5" },
        { label: "Cities Covered", value: "25+" }
    ];

    return (
        <div className="pt-20 min-h-screen bg-slate-50">
            {/* Hero Section */}
            <section className="relative py-20 px-6 overflow-hidden">
                <div className="container mx-auto">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        <div className="flex-1 text-left">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-bold mb-6"
                            >
                                <Star size={16} fill="currentColor" />
                                <span>Premium Service Network</span>
                            </motion.div>
                            <motion.h1 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-4xl md:text-6xl font-display font-bold text-slate-900 mb-6 leading-tight"
                            >
                                Post Your <br />
                                <span className="text-primary">Requirement Directly</span>
                            </motion.h1>
                            <motion.p 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-xl text-slate-500 max-w-xl mb-10 leading-relaxed"
                            >
                                Can't find exactly what you need? Post your specific requirement and let the right professionals find you.
                            </motion.p>
                            
                            {!user && (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="p-6 bg-amber-50 border border-amber-100 rounded-[2rem] flex items-start gap-4 mb-8"
                                >
                                    <div className="p-2 bg-amber-100 rounded-xl text-amber-600">
                                        <AlertCircle size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-amber-900 mb-1">Login Required</h4>
                                        <p className="text-amber-700 text-sm mb-3">You need to be logged in to post a service requirement.</p>
                                        <Link to="/login" state={{ from: location }} className="text-amber-900 font-bold text-sm underline hover:no-underline">Login Now →</Link>
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Form Section */}
                        <div className="flex-1 w-full max-w-xl">
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100"
                            >
                                <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                                    <ClipboardList className="text-primary" /> Post Your Requirement
                                </h2>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 ml-1">Service Category</label>
                                        <select 
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                        >
                                            <option value="">Select a category</option>
                                            {categories.map(cat => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700 ml-1">Days Required</label>
                                            <div className="relative">
                                                <Clock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                                <input 
                                                    type="number"
                                                    name="days"
                                                    value={formData.days}
                                                    onChange={handleChange}
                                                    required
                                                    min="1"
                                                    placeholder="e.g. 5"
                                                    className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700 ml-1">Your Budget (₹)</label>
                                            <div className="relative">
                                                <Banknote className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                                <input 
                                                    type="number"
                                                    name="budget"
                                                    value={formData.budget}
                                                    onChange={handleChange}
                                                    required
                                                    min="1"
                                                    placeholder="e.g. 2500"
                                                    className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 ml-1">Describe Requirements</label>
                                        <textarea 
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            required
                                            placeholder="Please describe what you need in detail..."
                                            rows="4"
                                            className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none resize-none"
                                        ></textarea>
                                    </div>

                                    <button 
                                        type="submit"
                                        disabled={loading || !user}
                                        className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg transition-all ${!user ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-primary text-white hover:bg-primary-dark shadow-primary/25'}`}
                                    >
                                        {loading ? 'Posting...' : 'Post Requirement'}
                                        <ArrowRight size={20} />
                                    </button>
                                </form>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Grid */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">How it works?</h2>
                        <p className="text-lg text-slate-500">Simple process to get your work done by experts.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: ClipboardList, title: "1. Post Requirement", desc: "Fill out the form with your needs, duration and budget." },
                            { icon: MessageSquare, title: "2. Worker Connects", desc: "Relevant workers will see your post and contact you via message." },
                            { icon: HeartHandshake, title: "3. Hire & Pay", desc: "Discuss details, negotiate if needed, and hire the best professional." }
                        ].map((step, index) => (
                            <motion.div
                                key={step.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center p-8"
                            >
                                <div className="w-20 h-20 bg-primary/5 text-primary rounded-3xl flex items-center justify-center mx-auto mb-6">
                                    <step.icon size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 mb-3">{step.title}</h3>
                                <p className="text-slate-500">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Satisfaction Section */}
            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-6">
                    <div className="bg-slate-900 rounded-[3rem] p-8 md:p-16 relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 p-12 opacity-10">
                            <ShieldCheck size={300} className="text-white" />
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                            <div>
                                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Your Satisfaction, Our Responsibility</h2>
                                <ul className="space-y-4 mb-10">
                                    {[
                                        "100% money-back guarantee for poor service",
                                        "24/7 dedicated customer support",
                                        "Strict adherence to safety protocols",
                                        "Transparent pricing with no hidden costs"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-slate-300 text-lg">
                                            <div className="bg-primary/20 p-1 rounded-full text-primary">
                                                <CheckCircle2 size={20} />
                                            </div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                                <Link to="/services" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 rounded-2xl font-bold hover:bg-slate-100 transition-all">
                                    Start Finding Professionals <ArrowRight size={20} />
                                </Link>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                {stats.map((stat, i) => (
                                    <div key={i} className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/10 text-center">
                                        <p className="text-4xl font-bold text-white mb-1">{stat.value}</p>
                                        <p className="text-sm font-medium text-slate-400 uppercase tracking-widest">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default RequireWorker;
