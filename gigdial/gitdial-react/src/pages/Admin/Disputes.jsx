import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    AlertCircle, MessageSquare, ShieldCheck, MoreHorizontal,
    ChevronDown, Check, X, Gavel, Clock, CheckCircle2,
    User, Receipt, Scale, ArrowRight, Filter, Search, Loader2
} from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const Disputes = () => {
    const { user } = useAuth();
    const [disputes, setDisputes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedId, setExpandedId] = useState(null);
    const [filter, setFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchDisputes = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user?.token}`,
                    },
                };
                const { data } = await axios.get('/api/disputes', config);
                setDisputes(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching disputes:", error);
                setLoading(false);
            }
        };

        if (user?.token) {
            fetchDisputes();
        }
    }, [user]);

    const handleResolve = async (id, resolution) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user?.token}`,
                },
            };
            await axios.put(`/api/disputes/${id}`, { status: 'resolved', resolution }, config);

            setDisputes(disputes.map(d => d._id === id ? { ...d, status: 'resolved', resolution } : d));
            // Show a custom notification/toast instead of alert in a real app
        } catch (error) {
            console.error(error);
            alert("Failed to resolve dispute");
        }
    };

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const stats = [
        { label: 'Total Disputes', value: disputes.length, icon: Scale, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Open Cases', value: disputes.filter(d => d.status === 'open').length, icon: AlertCircle, color: 'text-rose-600', bg: 'bg-rose-50' },
        { label: 'Resolved', value: disputes.filter(d => d.status === 'resolved').length, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    ];

    const filteredDisputes = disputes.filter(d => {
        const matchesFilter = filter === 'All' || d.status === filter.toLowerCase();
        const matchesSearch = d.reason?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            d.complainant?.name?.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <div className="space-y-8 pb-12 font-inter">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-1">
                <div className="space-y-2">
                    <h1 className="text-3xl md:text-5xl font-black text-slate-800 tracking-tight leading-none">
                        Dispute Center
                    </h1>
                    <p className="text-slate-500 font-medium text-base md:text-lg">
                        Mediate and resolve conflicts between users with transparency.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-rose-500 animate-pulse"></div>
                    <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Resolution Control</span>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow"
                    >
                        <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                            <stat.icon size={28} />
                        </div>
                        <div>
                            <p className="text-slate-400 text-xs font-black uppercase tracking-widest">{stat.label}</p>
                            <h4 className="text-3xl font-black text-slate-800">{stat.value}</h4>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white/50 backdrop-blur-md p-4 rounded-[2rem] border border-slate-100">
                <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0 scrollbar-hide">
                    {['All', 'Open', 'Resolved'].map((s) => (
                        <button
                            key={s}
                            onClick={() => setFilter(s)}
                            className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all whitespace-nowrap ${filter === s
                                    ? 'bg-slate-900 text-white shadow-lg'
                                    : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-100'
                                }`}
                        >
                            {s}
                        </button>
                    ))}
                </div>
                <div className="relative group w-full lg:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                    <input
                        type="text"
                        placeholder="Search by reason or user..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-white border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-bold text-slate-600 placeholder:text-slate-300"
                    />
                </div>
            </div>

            {/* Disputes List */}
            <div className="space-y-4">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4 text-slate-400">
                        <Loader2 className="animate-spin text-blue-500" size={48} />
                        <p className="font-bold animate-pulse">Loading secure dispute data...</p>
                    </div>
                ) : filteredDisputes.length > 0 ? (
                    filteredDisputes.map((dispute, index) => (
                        <motion.div
                            key={dispute._id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className={`group bg-white rounded-[2rem] border transition-all duration-500 overflow-hidden ${expandedId === dispute._id
                                    ? 'border-slate-900 shadow-2xl shadow-slate-200'
                                    : 'border-slate-100 hover:border-slate-300 hover:shadow-xl'
                                }`}
                        >
                            <div
                                onClick={() => toggleExpand(dispute._id)}
                                className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between cursor-pointer gap-6"
                            >
                                <div className="flex items-center gap-6">
                                    <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center shrink-0 shadow-inner ${dispute.status === 'open'
                                            ? 'bg-rose-50 text-rose-600 border border-rose-100'
                                            : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                                        }`}>
                                        <Gavel size={32} />
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex flex-wrap items-center gap-3">
                                            <h3 className="font-black text-slate-800 text-xl md:text-2xl tracking-tight">{dispute.reason}</h3>
                                            <span className={`px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-black border ${dispute.status === 'open'
                                                    ? 'bg-rose-100 text-rose-700 border-rose-200 shadow-sm shadow-rose-100'
                                                    : 'bg-emerald-100 text-emerald-700 border-emerald-200 shadow-sm shadow-emerald-100'
                                                }`}>
                                                {dispute.status}
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-slate-400 font-bold text-sm">
                                            <span className="flex items-center gap-1.5">
                                                <Clock size={14} /> {new Date(dispute.createdAt).toLocaleDateString()}
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <ShieldCheck size={14} /> Case #{dispute._id.slice(-6).toUpperCase()}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-4 md:pt-0">
                                    <div className="text-right hidden sm:block">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Complainant</p>
                                        <p className="font-bold text-slate-900">{dispute.complainant?.name || 'Unknown'}</p>
                                    </div>
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 bg-slate-50 border border-slate-100 ${expandedId === dispute._id ? 'rotate-180 bg-slate-900 text-white border-slate-800 shadow-lg' : 'text-slate-400 group-hover:bg-slate-100'}`}>
                                        <ChevronDown size={24} />
                                    </div>
                                </div>
                            </div>

                            <AnimatePresence>
                                {expandedId === dispute._id && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.4, ease: "circOut" }}
                                        className="border-t border-slate-50 bg-slate-50/30"
                                    >
                                        <div className="p-8 grid lg:grid-cols-12 gap-10">
                                            <div className="lg:col-span-8 space-y-8">
                                                <div>
                                                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                                        <MessageSquare size={14} className="text-blue-500" /> Executive Summary
                                                    </h4>
                                                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                                                        <p className="text-slate-700 text-lg leading-relaxed font-medium italic">
                                                            "{dispute.description}"
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="grid sm:grid-cols-2 gap-6">
                                                    <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group/item">
                                                        <div className="absolute top-0 right-0 p-3 text-slate-50 group-hover/item:text-slate-100 transition-colors">
                                                            <User size={48} />
                                                        </div>
                                                        <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 relative z-10">Complainant Information</h5>
                                                        <div className="space-y-1 relative z-10">
                                                            <p className="font-black text-slate-900 text-lg">{dispute.complainant?.name || 'Unknown'}</p>
                                                            <p className="text-slate-500 font-bold text-sm tracking-tight">{dispute.complainant?.email}</p>
                                                        </div>
                                                    </div>

                                                    {dispute.order && (
                                                        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group/item">
                                                            <div className="absolute top-0 right-0 p-3 text-slate-50 group-hover/item:text-slate-100 transition-colors">
                                                                <Receipt size={48} />
                                                            </div>
                                                            <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 relative z-10">Transaction Reference</h5>
                                                            <div className="space-y-1 relative z-10">
                                                                <p className="font-black text-slate-900 text-lg truncate">{dispute.order?.title}</p>
                                                                <p className="text-blue-600 font-black text-sm uppercase tracking-wider">Order ID: #{dispute.order?._id?.slice(-8).toUpperCase()}</p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                {dispute.resolution && (
                                                    <div className="bg-emerald-50/50 p-6 rounded-3xl border border-emerald-100 border-dashed">
                                                        <h4 className="text-xs font-black text-emerald-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                                                            <CheckCircle2 size={16} /> Final Resolution Reached
                                                        </h4>
                                                        <p className="text-emerald-900 font-bold text-lg leading-relaxed">
                                                            {dispute.resolution}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="lg:col-span-4">
                                                <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white sticky top-8">
                                                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Arbitration Actions</h4>

                                                    {dispute.status === 'open' ? (
                                                        <div className="space-y-4">
                                                            <button
                                                                onClick={() => handleResolve(dispute._id, "Full refund issued to buyer. Order cancelled.")}
                                                                className="w-full py-5 bg-white text-slate-900 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-emerald-400 transition-all active:scale-[0.98] shadow-xl shadow-black/20 flex items-center justify-center gap-3"
                                                            >
                                                                Refund Buyer <Check size={18} />
                                                            </button>
                                                            <button
                                                                onClick={() => handleResolve(dispute._id, "Dispute dismissed. Funds released to service provider.")}
                                                                className="w-full py-5 bg-slate-800 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-700 transition-all active:scale-[0.98] border border-slate-700 flex items-center justify-center gap-3"
                                                            >
                                                                Release Funds <ArrowRight size={18} />
                                                            </button>

                                                            <div className="mt-8 p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50">
                                                                <p className="text-[10px] font-bold text-slate-500 italic leading-relaxed text-center">
                                                                    By taking action, you are providing a final legal decision on this platform.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="text-center py-8 space-y-4">
                                                            <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto text-emerald-500">
                                                                <CheckCircle2 size={48} />
                                                            </div>
                                                            <h5 className="text-xl font-black italic">Case is Closed</h5>
                                                            <p className="text-slate-400 text-sm font-medium">This dispute has been legally resolved and archived.</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="py-32 flex flex-col items-center justify-center bg-white rounded-[3rem] border border-slate-100 border-dashed text-slate-400 shadow-inner overflow-hidden relative"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-slate-100 to-transparent"></div>
                        <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                            <ShieldCheck size={48} className="text-slate-200" />
                        </div>
                        <h3 className="text-2xl font-black text-slate-800 mb-2">Platform is Peaceful</h3>
                        <p className="font-bold text-slate-400">0 active disputes detected in the system.</p>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Disputes;
