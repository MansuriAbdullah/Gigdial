import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import axios from 'axios';
import { useLanguage } from '../../../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
    DollarSign, Star, Activity, Briefcase,
    MessageSquare, TrendingUp, Banknote, CheckCircle, Video, Plus,
    User, ChevronRight, Award, MapPin, Sparkles, Zap
} from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, trend, color, subLabel }) => (
    <motion.div
        whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group"
    >
        <div className={`absolute top-0 right-0 w-24 h-24 ${color} opacity-5 rounded-full -mr-8 -mt-8 blur-2xl group-hover:scale-150 transition-transform duration-500`}></div>

        <div className="relative z-10 flex justify-between items-start mb-4">
            <div className={`p-3.5 rounded-2xl ${color} bg-opacity-10 shadow-sm ring-4 ring-white`}>
                <Icon className={color.replace('bg-', 'text-')} size={26} strokeWidth={2.5} />
            </div>
            {trend && (
                <span className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1.5 rounded-full border border-emerald-100">
                    <TrendingUp size={12} className="mr-1.5" /> {trend}
                </span>
            )}
        </div>

        <div className="relative z-10">
            <p className="text-slate-500 text-sm font-semibold tracking-wide uppercase mb-1">{label}</p>
            <h3 className="text-3xl font-black text-slate-800 tracking-tight">{value}</h3>
            {subLabel && <p className="text-xs text-slate-400 mt-2 font-medium">{subLabel}</p>}
        </div>
    </motion.div>
);

const LeadCard = ({ id, name, service, location, distance, price, time, onAccept, onDecline, onNegotiate }) => (
    <motion.div
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 relative overflow-hidden mb-6"
    >
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-slate-100 to-transparent"></div>
        <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 rounded-l-3xl"></div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
            <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center text-blue-600 font-black text-2xl shadow-inner border border-white">
                    {name.charAt(0)}
                </div>
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-slate-900 text-xl">{name}</h4>
                        <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">New</span>
                    </div>
                    <div className="flex flex-wrap items-center text-slate-500 text-sm gap-4 font-medium">
                        <span className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-lg"><Briefcase size={14} className="text-blue-500" /> {service}</span>
                        <span className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-lg"><MapPin size={14} className="text-red-500" /> {distance || 'N/A'}</span>
                    </div>
                </div>
            </div>
            <div className="text-right bg-slate-50/50 p-3 rounded-xl border border-slate-100 min-w-[120px]">
                <p className="text-sm text-slate-500 mb-1 font-semibold">Estimated Pay</p>
                <p className="text-2xl font-black text-emerald-600">₹{price}</p>
                <p className="text-xs text-slate-400 mt-1 font-medium flex items-center justify-end gap-1">
                    <ClockIcon /> {new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
            </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8 pt-6 border-t border-slate-100">
            <button
                onClick={() => onAccept(id)}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm bg-blue-600 text-white hover:bg-blue-700 transition-all hover:scale-[1.02] shadow-lg shadow-blue-200 active:scale-95">
                <CheckCircle size={18} /> Accept Job
            </button>
            <button
                onClick={() => onNegotiate(id)}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-all border border-indigo-100 hover:scale-[1.02] active:scale-95">
                <MessageSquare size={18} /> Message
            </button>
            <button
                onClick={() => onDecline(id)}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm bg-slate-50 text-slate-500 hover:bg-slate-100 transition-all border border-slate-200 hover:text-red-500 hover:border-red-100 hover:bg-red-50 active:scale-95">
                <XCircleIcon /> Decline
            </button>
        </div>
    </motion.div>
);

const ClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
);

const XCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>
);

const Badge = ({ icon: Icon, label, color, shine }) => (
    <motion.div
        whileHover={{ scale: 1.05 }}
        className="flex flex-col items-center justify-center p-5 bg-white rounded-2xl border border-slate-100 shadow-sm text-center relative overflow-hidden group"
    >
        {shine && <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform skew-x-12 group-hover:animate-shine transition-all duration-1000"></div>}
        <div className={`p-3 rounded-full mb-3 ${color} bg-opacity-10 ring-4 ring-slate-50`}>
            <Icon size={22} className={color.replace('bg-', 'text-')} />
        </div>
        <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">{label}</span>
    </motion.div>
);

const WorkerOverview = () => {
    const { user } = useAuth();
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState('leads');
    const [isAvailable, setIsAvailable] = useState(true);
    const [stats, setStats] = useState({
        totalEarnings: 0,
        activeLeads: 0,
        responseRate: 0,
        rating: 0,
        walletBalance: 0,
        opportunities: [],
        leaderboard: [],
        recentReviews: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user?.token}`,
                    },
                };
                const { data } = await axios.get(`/api/users/worker/dashboard/${user._id}`, config);
                setStats(data);
            } catch (error) {
                console.error("Error fetching stats:", error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchStats();
        }
    }, [user]);

    const handleAction = async (id, status) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user?.token}`,
                },
            };
            await axios.put(`/api/orders/${id}/status`, { status }, config);

            // Remove from list
            setStats(prev => ({
                ...prev,
                opportunities: prev.opportunities.filter(op => op.id !== id),
                activeLeads: Math.max(0, prev.activeLeads - 1)
            }));

        } catch (error) {
            console.error("Action error:", error);
        }
    };

    const handleNegotiate = (id) => {
        if (window.confirm("Start negotiation chat for this order?")) {
            // In a real app, this would route to /messages/:userId or similar
            window.location.href = '/worker-dashboard/messages';
        }
    };

    const handleRequestPayout = async () => {
        const amountStr = window.prompt(`Enter amount to withdraw (Available: ₹${stats.walletBalance})`, stats.walletBalance);
        if (!amountStr) return;

        const amount = parseFloat(amountStr);
        if (isNaN(amount) || amount <= 0) {
            alert("Invalid amount");
            return;
        }
        if (amount > stats.walletBalance) {
            alert("Insufficient balance");
            return;
        }

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user?.token}`,
                },
            };
            await axios.post('/api/withdrawals', { amount }, config);
            alert('Withdrawal request submitted successfully!');
            // Refresh stats
            const { data } = await axios.get(`/api/users/worker/dashboard/${user._id}`, config);
            setStats(data);
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || 'Withdrawal failed');
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="space-y-8 pb-20">
            {/* Header / Welcome */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                        Welcome back, {user?.name.split(' ')[0]} <span className="text-2xl">👋</span>
                    </h1>
                    <p className="text-slate-500 font-medium mt-1">Ready to manage your gigs and earnings?</p>
                </div>
                <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
                    <span className="text-sm font-bold text-slate-700 px-2">{isAvailable ? 'Available for Work' : 'Unavailable'}</span>
                    <button
                        onClick={() => setIsAvailable(!isAvailable)}
                        className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isAvailable ? 'bg-emerald-500' : 'bg-slate-300'}`}
                    >
                        <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform duration-300 ${isAvailable ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                </div>
            </div>

            {/* Quick Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    icon={DollarSign}
                    label={t('totalEarnings')}
                    value={`₹${stats.totalEarnings?.toLocaleString() || '0'}`}
                    trend="+12%"
                    color="text-emerald-600 bg-emerald-600"
                    subLabel="Total lifetime earnings"
                />
                <StatCard
                    icon={Activity}
                    label={t('activeLeads')}
                    value={stats.activeLeads}
                    trend="+5 new"
                    color="text-blue-600 bg-blue-600"
                    subLabel="Pending Requests"
                />
                <StatCard
                    icon={CheckCircle}
                    label={t('responseRate')}
                    value={`${stats.responseRate}%`}
                    color="text-indigo-600 bg-indigo-600"
                    subLabel="Great consistency!"
                />
                <StatCard
                    icon={Star}
                    label="Overall Rating"
                    value={<div className="flex items-center gap-1">
                        {stats.rating} <Star size={20} className="fill-yellow-400 text-yellow-400" />
                    </div>}
                    color="text-yellow-500 bg-yellow-500"
                    subLabel={`Based on reviews`}
                />
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Main Tabs */}
                    <div className="bg-white p-1.5 rounded-2xl border border-slate-200 flex overflow-x-auto no-scrollbar w-full md:w-auto shadow-sm">
                        {['leads', 'earnings'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`flex-1 md:flex-none px-8 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap relative z-10 ${activeTab === tab
                                    ? 'bg-slate-900 text-white shadow-md'
                                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                    }`}
                            >
                                {tab === 'leads' && <span className="flex items-center gap-2"><Briefcase size={16} /> {t('newLeads')}</span>}
                                {tab === 'earnings' && <span className="flex items-center gap-2"><Banknote size={16} /> {t('payout')}</span>}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="min-h-[400px]">
                        <AnimatePresence mode="wait">
                            {activeTab === 'leads' && (
                                <motion.div
                                    key="leads"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                >
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                            <Sparkles className="text-yellow-500 fill-yellow-500" size={20} /> {t('newOpportunities')}
                                        </h3>
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stats.opportunities.length} PENDING</span>
                                    </div>

                                    {stats.opportunities.length === 0 ? (
                                        <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-200">
                                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <Briefcase size={24} className="text-slate-300" />
                                            </div>
                                            <p className="text-slate-500 font-medium">No new opportunities at the moment.</p>
                                            <p className="text-xs text-slate-400 mt-1">Check back later or update your skills.</p>
                                        </div>
                                    ) : (
                                        stats.opportunities.map((opp) => (
                                            <LeadCard
                                                key={opp.id}
                                                id={opp.id}
                                                name={opp.name}
                                                service={opp.service}
                                                location={opp.location}
                                                distance={opp.distance}
                                                price={opp.price}
                                                time={opp.time}
                                                onAccept={(id) => handleAction(id, 'in-progress')}
                                                onNegotiate={handleNegotiate}
                                                onDecline={(id) => handleAction(id, 'cancelled')}
                                            />
                                        ))
                                    )}
                                </motion.div>
                            )}

                            {activeTab === 'earnings' && (
                                <motion.div
                                    key="earnings"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-6"
                                >
                                    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-white rounded-[2rem] p-8 shadow-2xl relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full -ml-16 -mb-16 blur-3xl"></div>

                                        <div className="flex justify-between items-start mb-10 relative z-10">
                                            <div>
                                                <p className="text-slate-300 mb-2 text-sm font-medium tracking-wide uppercase opacity-80">{t('availableBalance')}</p>
                                                <h2 className="text-5xl font-black tracking-tight">₹{stats.walletBalance?.toLocaleString()}</h2>
                                            </div>
                                            <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 shadow-lg">
                                                <Banknote size={32} className="text-emerald-400" />
                                            </div>
                                        </div>

                                        <div className="flex flex-col sm:flex-row gap-4 relative z-10">
                                            <button onClick={handleRequestPayout} className="flex-1 bg-white text-slate-900 py-4 rounded-xl font-bold hover:bg-slate-50 transition-colors shadow-lg shadow-black/20 text-sm tracking-wide uppercase">
                                                {t('requestPayout')}
                                            </button>
                                            <button className="flex-1 bg-white/10 text-white py-4 rounded-xl font-bold border border-white/20 hover:bg-white/20 transition-colors backdrop-blur-sm text-sm tracking-wide uppercase">
                                                {t('viewHistory')}
                                            </button>
                                        </div>

                                        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-slate-400 gap-2 relative z-10 font-medium">
                                            <span className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                                {t('bankAccount')}: **** 8832
                                            </span>
                                            <span className="text-emerald-400 flex items-center gap-1 bg-emerald-400/10 px-2 py-1 rounded-md border border-emerald-400/20">
                                                <CheckCircle size={12} /> {t('verified')}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="space-y-8">
                    {/* Gamification */}
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                        <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <Award size={20} className="text-yellow-500" /> {t('achievements')}
                        </h3>

                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <Badge icon={MessageSquare} label={t('topResponder')} color="text-blue-600 bg-blue-600" shine={true} />
                            <Badge icon={Star} label={t('fiveStarWorker')} color="text-yellow-500 bg-yellow-500" shine={true} />
                        </div>

                        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                            <h4 className="text-xs font-bold text-slate-400 uppercase mb-4 tracking-wider flex items-center justify-between">
                                {t('localLeaderboard')}
                                <Zap size={14} className="text-yellow-500 fill-yellow-500" />
                            </h4>
                            <div className="space-y-4">
                                {stats.leaderboard?.map((worker, index) => (
                                    <motion.div
                                        initial={{ x: -10, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                        key={worker.id || index}
                                        className="flex items-center justify-between group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className={`font-black text-sm w-5 ${index === 0 ? 'text-yellow-500 text-lg' : index === 1 ? 'text-slate-400 text-base' : 'text-orange-500'}`}>#{index + 1}</span>
                                            <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 font-bold text-sm shadow-sm group-hover:scale-110 transition-transform">
                                                {worker.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-800 text-sm">
                                                    {worker.name} {user?._id === worker.id && '(You)'}
                                                </p>
                                                <p className="text-[10px] text-slate-400 font-medium">{worker.rating} Rating</p>
                                            </div>
                                        </div>
                                        {worker.earnings && <span className="font-bold text-emerald-600 text-xs bg-emerald-50 px-2 py-1 rounded-md">₹{worker.earnings}</span>}
                                    </motion.div>
                                ))}
                                {(!stats.leaderboard || stats.leaderboard.length === 0) && (
                                    <p className="text-xs text-slate-400 text-center py-2">No leaderboard data yet</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Recent Reviews Widget */}
                    <div className="bg-gradient-to-b from-white to-slate-50 p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-full -mr-16 -mt-16 blur-xl"></div>

                        <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2 relative z-10">
                            <Star size={20} className="text-yellow-500 fill-yellow-500" /> Recent Reviews
                        </h3>

                        <div className="space-y-5 relative z-10">
                            {stats.recentReviews?.map((review, i) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    key={review.id || i}
                                    className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <h5 className="font-bold text-sm text-slate-800">{review.reviewerName}</h5>
                                        <div className="flex items-center gap-0.5">
                                            {[...Array(5)].map((_, si) => (
                                                <Star key={si} size={10} className={`${si < review.rating ? "fill-yellow-400 text-yellow-400" : "text-slate-200"}`} />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-xs text-slate-500 italic leading-relaxed mb-2">"{review.comment}"</p>
                                    <p className="text-[10px] text-slate-400 font-medium text-right">{new Date(review.date).toLocaleDateString()}</p>
                                </motion.div>
                            ))}
                            {(!stats.recentReviews || stats.recentReviews.length === 0) && (
                                <div className="text-center py-8">
                                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                        <MessageSquare size={20} className="text-slate-300" />
                                    </div>
                                    <p className="text-sm text-slate-400 font-medium">No reviews yet.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Quick Profile Actions */}
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                        <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <User size={20} className="text-blue-600" /> Quick Actions
                        </h3>
                        <div className="space-y-3">
                            <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-blue-50 transition-all text-slate-600 hover:text-blue-600 group">
                                <span className="flex items-center gap-3 font-bold text-sm">
                                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm text-blue-500 group-hover:scale-110 transition-transform"><Plus size={16} /></div>
                                    {t('addNewSkill')}
                                </span>
                                <ChevronRight size={16} />
                            </button>
                            <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-purple-200 hover:bg-purple-50 transition-all text-slate-600 hover:text-purple-600 group">
                                <span className="flex items-center gap-3 font-bold text-sm">
                                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm text-purple-500 group-hover:scale-110 transition-transform"><Video size={16} /></div>
                                    {t('trainingVideos')}
                                </span>
                                <span className="text-[10px] bg-red-500 text-white px-2 py-0.5 rounded-full font-bold shadow-sm shadow-red-200">NEW</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkerOverview;
