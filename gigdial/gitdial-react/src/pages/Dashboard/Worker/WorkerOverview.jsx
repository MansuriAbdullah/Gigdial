import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import axios from 'axios';
import { useLanguage } from '../../../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
    DollarSign, Star, Activity, Briefcase,
    MessageSquare, TrendingUp, Banknote, CheckCircle, Video, Plus,
    User, ChevronRight, Award, MapPin
} from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, trend, color }) => (
    <div className="bg-white p-4 md:p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl ${color} bg-opacity-10`}>
                <Icon className={color.replace('bg-', 'text-')} size={24} />
            </div>
            {trend && (
                <span className="flex items-center text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    <TrendingUp size={12} className="mr-1" /> {trend}
                </span>
            )}
        </div>
        <p className="text-slate-500 text-sm font-medium">{label}</p>
        <h3 className="text-3xl font-bold text-slate-800 mt-1">{value}</h3>
    </div>
);

const LeadCard = ({ id, name, service, location, distance, price, time, onAccept, onDecline, onNegotiate }) => (
    <div className="bg-white p-4 md:p-6 rounded-2xl border border-slate-100 shadow-sm mb-4 hover:shadow-md transition-all">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-lg">
                    {name.charAt(0)}
                </div>
                <div>
                    <h4 className="font-bold text-slate-800 text-lg">{name}</h4>
                    <div className="flex items-center text-slate-500 text-sm mt-1 gap-3">
                        <span className="flex items-center gap-1"><Briefcase size={14} /> {service}</span>
                        <span className="flex items-center gap-1"><MapPin size={14} /> {distance || 'N/A'}</span>
                    </div>
                </div>
            </div>
            <div className="text-right">
                <p className="text-2xl font-bold text-blue-600">{price}</p>
                <p className="text-xs text-slate-400 font-medium">{time}</p>
            </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
            <button
                onClick={() => onAccept(id)}
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-bold text-sm bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md">
                <CheckCircle size={16} /> Accept
            </button>
            <button
                onClick={() => onNegotiate(id)}
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-bold text-sm bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors border border-blue-200">
                <MessageSquare size={16} /> Negotiate
            </button>
            <button
                onClick={() => onDecline(id)}
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-bold text-sm bg-slate-50 text-slate-500 hover:bg-slate-100 transition-colors border border-slate-200">
                <TrendingUp size={16} className="rotate-180" /> Decline
            </button>
        </div>
    </div>
);

const Badge = ({ icon: Icon, label, color }) => (
    <div className="flex flex-col items-center justify-center p-4 bg-slate-50/50 rounded-xl border border-slate-100 text-center">
        <div className={`p-2 rounded-full mb-2 ${color} bg-opacity-10`}>
            <Icon size={20} className={color.replace('bg-', 'text-')} />
        </div>
        <span className="text-xs font-bold text-slate-700">{label}</span>
    </div>
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
        opportunities: []
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
                const { data } = await axios.get('/api/users/dashboard/stats', config);
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
                activeLeads: status === 'in_progress' ? prev.activeLeads + 1 : prev.activeLeads
            }));

        } catch (error) {
            console.error("Action error:", error);
        }
    };

    const handleNegotiate = (id) => {
        // Navigate to messages or open chat modal
        // For now, simple alert or redirect
        if (window.confirm("Start negotiation chat for this order?")) {
            // In a real app, this would route to /messages/:userId or similar
            window.location.href = '/worker-dashboard/messages';
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="space-y-8">
            {/* Quick Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard icon={DollarSign} label={t('totalEarnings')} value={`₹${stats.totalEarnings}`} trend="+12%" color="text-green-600 bg-green-600" />
                <StatCard icon={Activity} label={t('activeLeads')} value={stats.activeLeads} trend="+5 new" color="text-blue-600 bg-blue-600" />
                <StatCard icon={MessageSquare} label={t('responseRate')} value={`${stats.responseRate}%`} color="text-purple-600 bg-purple-600" />
                <StatCard icon={Star} label={t('rating')} value={stats.rating} color="text-yellow-500 bg-yellow-500" />
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Main Tabs */}
                    <div className="bg-white p-1 rounded-2xl border border-slate-200 flex overflow-x-auto no-scrollbar w-full md:w-auto">
                        {['leads', 'earnings'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`flex-none px-6 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${activeTab === tab
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                    }`}
                            >
                                {tab === 'leads' && t('newLeads')}
                                {tab === 'earnings' && t('payout')}
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
                                    <h3 className="text-xl font-bold text-slate-800 mb-4">{t('newOpportunities')}</h3>
                                    {stats.opportunities.length === 0 ? (
                                        <p className="text-slate-500">No new opportunities at the moment.</p>
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
                                                onAccept={(id) => handleAction(id, 'in_progress')}
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
                                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-5 md:p-8 shadow-xl">
                                        <div className="flex justify-between items-start mb-6 md:mb-8">
                                            <div>
                                                <p className="text-slate-400 mb-1 text-sm md:text-base">{t('availableBalance')}</p>
                                                <h2 className="text-3xl md:text-4xl font-bold">₹{stats.walletBalance}</h2>
                                            </div>
                                            <div className="p-3 bg-white/10 rounded-xl backdrop-blur-md">
                                                <Banknote size={24} className="text-green-400" />
                                            </div>
                                        </div>
                                        <div className="flex flex-col sm:flex-row gap-4">
                                            <button className="flex-1 bg-white text-slate-900 py-3 rounded-xl font-bold hover:bg-slate-100 transition-colors shadow-sm">
                                                {t('requestPayout')}
                                            </button>
                                            <button className="flex-1 bg-white/10 text-white py-3 rounded-xl font-bold border border-white/10 hover:bg-white/20 transition-colors">
                                                {t('viewHistory')}
                                            </button>
                                        </div>
                                        <div className="mt-6 md:mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between text-sm text-slate-400 gap-2">
                                            <span>{t('bankAccount')}: **** 8832</span>
                                            <span className="text-green-400 flex items-center gap-1"><CheckCircle size={14} /> {t('verified')}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="space-y-8">
                    {/* Profile Quick Edit */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                            <User size={20} className="text-blue-600" /> {t('quickProfile')}
                        </h3>

                        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl mb-6">
                            <span className="font-medium text-slate-700">{t('availability')}</span>
                            <button
                                onClick={() => setIsAvailable(!isAvailable)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isAvailable ? 'bg-green-500' : 'bg-slate-300'}`}
                            >
                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isAvailable ? 'translate-x-6' : 'translate-x-1'}`} />
                            </button>
                        </div>

                        <div className="space-y-3">
                            <button className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-blue-500 hover:bg-blue-50 transition-all text-slate-600 hover:text-blue-600">
                                <span className="flex items-center gap-2 font-medium"><Plus size={18} /> {t('addNewSkill')}</span>
                                <ChevronRight size={16} />
                            </button>
                            <button className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-purle-500 hover:bg-purple-50 transition-all text-slate-600 hover:text-purple-600">
                                <span className="flex items-center gap-2 font-medium"><Video size={18} /> {t('trainingVideos')}</span>
                                <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-bold">New</span>
                            </button>
                        </div>
                    </div>

                    {/* Gamification */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                            <Award size={20} className="text-yellow-500" /> {t('achievements')}
                        </h3>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <Badge icon={MessageSquare} label={t('topResponder')} color="text-blue-600 bg-blue-600" />
                            <Badge icon={Star} label={t('fiveStarWorker')} color="text-yellow-500 bg-yellow-500" />
                        </div>

                        <div className="bg-slate-50 rounded-xl p-4">
                            <h4 className="text-xs font-bold text-slate-400 uppercase mb-3">{t('localLeaderboard')}</h4>
                            <div className="space-y-3">
                                {stats.leaderboard?.map((worker, index) => (
                                    <div key={worker.id} className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <span className={`font-bold text-sm ${index === 0 ? 'text-yellow-500' : index === 1 ? 'text-slate-400' : 'text-orange-500'}`}>#{index + 1}</span>
                                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                                                {worker.name.charAt(0)}
                                            </div>
                                            <span className="font-medium text-slate-700 text-sm">
                                                {worker.name} {user?._id === worker.id && '(You)'}
                                            </span>
                                        </div>
                                        <span className="font-bold text-green-600 text-sm">₹{worker.earnings}</span>
                                    </div>
                                ))}
                                {(!stats.leaderboard || stats.leaderboard.length === 0) && (
                                    <p className="text-xs text-slate-400">No data available</p>
                                )}
                            </div>
                        </div>

                        {/* Recent Reviews Widget */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mt-6">
                            <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                                <Star size={20} className="text-yellow-500" /> Recent Reviews
                            </h3>
                            <div className="space-y-4">
                                {stats.recentReviews?.map((review) => (
                                    <div key={review.id} className="border-b border-slate-50 last:border-0 pb-3 last:pb-0">
                                        <div className="flex justify-between items-start mb-1">
                                            <h5 className="font-bold text-sm text-slate-800">{review.reviewerName}</h5>
                                            <div className="flex items-center bg-green-50 px-1.5 py-0.5 rounded text-green-700 text-xs font-bold">
                                                <Star size={10} className="mr-1 fill-current" /> {review.rating}
                                            </div>
                                        </div>
                                        <p className="text-xs text-slate-500 line-clamp-2 italic">"{review.comment}"</p>
                                        <p className="text-[10px] text-slate-400 mt-1 text-right">{new Date(review.date).toLocaleDateString()}</p>
                                    </div>
                                ))}
                                {(!stats.recentReviews || stats.recentReviews.length === 0) && (
                                    <p className="text-sm text-slate-400 italic">No reviews yet.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkerOverview;
