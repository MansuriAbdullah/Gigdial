import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { Users, DollarSign, CheckCircle, AlertCircle, TrendingUp, Activity, BarChart2, MoreHorizontal, ArrowUpRight, Calendar, Bell, Briefcase, ShoppingBag, Loader } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';

const StatCard = ({ title, value, change, icon: Icon, color, trend, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: delay }}
        whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
        className="bg-white p-4 md:p-6 rounded-2xl border border-slate-100 shadow-sm transition-all relative overflow-hidden group cursor-default"
    >
        {/* Background Decoration */}
        <div className={`absolute -right-4 -top-4 w-24 h-24 bg-${color}-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl`} />

        <div className="relative z-10 flex justify-between items-start mb-4">
            <div className={`p-3 rounded-2xl bg-${color}-50 text-${color}-600`}>
                <Icon size={24} />
            </div>
            {change && (
                <div className={`flex items-center gap-1 text-sm font-bold ${trend === 'up' ? 'text-green-500' : 'text-red-500'} bg-slate-50 px-2.5 py-1 rounded-full border border-slate-100`}>
                    {trend === 'up' ? <TrendingUp size={14} /> : <TrendingUp size={14} className="rotate-180" />}
                    {change}
                </div>
            )}
        </div>
        <div className="relative z-10">
            <h3 className="text-slate-500 font-medium text-sm mb-1">{title}</h3>
            <p className="text-3xl font-extrabold text-slate-900 tracking-tight">{value}</p>
        </div>
    </motion.div>
);

const ActivityItem = ({ icon: Icon, title, time, type, delay }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: delay }}
        className="flex items-start gap-4 p-4 hover:bg-slate-50 rounded-2xl transition-colors cursor-pointer group"
    >
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-slate-100 ${type === 'money' ? 'bg-green-50 text-green-600' :
            type === 'user' ? 'bg-blue-50 text-blue-600' :
                'bg-orange-50 text-orange-600'
            } group-hover:scale-110 transition-transform duration-300`}>
            <Icon size={20} />
        </div>
        <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start">
                <p className="text-sm font-bold text-slate-900 truncate pr-2 group-hover:text-blue-600 transition-colors">{title}</p>
                <span className="text-xs font-semibold text-slate-400 whitespace-nowrap">{time}</span>
            </div>
            <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                New activity detected on the platform.
            </p>
        </div>
    </motion.div>
);

const AdminDashboard = () => {
    const { t } = useLanguage();
    const { user } = useAuth();
    const [stats, setStats] = useState({
        totalWorkers: 0,
        totalCustomers: 0,
        activeBookings: 0,
        totalRevenue: 0,
        recentActivities: []
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

                // Combine recent users and orders for activity feed
                const activities = [
                    ...data.recentUsers.map(u => ({
                        type: 'user',
                        title: `New ${u.role === 'worker' ? 'Worker' : 'Customer'}: ${u.name}`,
                        time: new Date(u.createdAt),
                        id: u._id
                    })),
                    ...data.recentOrders.map(o => ({
                        type: 'money',
                        title: `New Booking by ${o.user?.name || 'User'}`,
                        time: new Date(o.createdAt),
                        id: o._id
                    }))
                ].sort((a, b) => b.time - a.time).slice(0, 5);

                setStats({
                    totalWorkers: data.totalWorkers,
                    totalCustomers: data.totalCustomers,
                    activeBookings: data.activeBookings,
                    totalRevenue: data.totalRevenue,
                    recentActivities: activities
                });
                setLoading(false);
            } catch (error) {
                console.error('Error fetching admin stats:', error);
                setLoading(false);
            }
        };

        if (user?.token) {
            fetchStats();
        }
    }, [user]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <Loader className="animate-spin text-blue-600" size={40} />
            </div>
        );
    }

    return (
        <div className="space-y-8 max-w-[1600px] mx-auto">
            {/* Header Banner */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden rounded-3xl bg-slate-900 text-white p-6 md:p-10 shadow-2xl"
            >
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                        <motion.h1
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent"
                        >
                            {t('welcomeAdmin')}
                        </motion.h1>
                        <p className="text-slate-400 font-medium text-lg">{t('dashboardSubtitle')}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl flex items-center gap-3 border border-white/10">
                            <Calendar size={18} className="text-blue-400" />
                            <span className="font-bold text-sm">{new Date().toLocaleDateString()}</span>
                        </div>
                        <button className="bg-blue-600 hover:bg-blue-500 text-white p-2.5 rounded-xl transition-colors shadow-lg shadow-blue-600/30 relative">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-400 rounded-full animate-pulse"></span>
                        </button>
                    </div>
                </div>

                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title={t('totalWorkers')}
                    value={stats.totalWorkers}
                    change={`Active`}
                    icon={Briefcase}
                    color="blue"
                    trend="up"
                    delay={0.1}
                />
                <StatCard
                    title={t('totalCustomers')}
                    value={stats.totalCustomers}
                    change="Registered"
                    icon={Users}
                    color="green"
                    trend="up"
                    delay={0.2}
                />
                <StatCard
                    title={t('activeBookings')}
                    value={stats.activeBookings}
                    change={t('liveNow')}
                    icon={Calendar}
                    color="purple"
                    trend="up"
                    delay={0.3}
                />
                <StatCard
                    title={t('totalRevenue')}
                    value={`₹${stats.totalRevenue.toLocaleString()}`}
                    change="+12.5%"
                    icon={DollarSign}
                    color="orange"
                    trend="up"
                    delay={0.4}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Graph Section (Placeholder Visualization) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="lg:col-span-2 bg-white p-5 md:p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col"
                >
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-xl font-bold text-slate-900">{t('revenueAnalytics')}</h2>
                            <p className="text-sm text-slate-500 font-medium">Monthly performance overview</p>
                        </div>
                        <div className="flex bg-slate-50 p-1 rounded-xl">
                            {['Day', 'Week', 'Month', 'Year'].map((period, i) => (
                                <button
                                    key={period}
                                    className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${i === 2 ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                                >
                                    {period}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* CSS-only Bar Chart Visualization */}
                    <div className="flex-1 flex items-end justify-between gap-2 h-64 w-full box-border px-4 pb-2">
                        {[35, 55, 40, 70, 50, 85, 60, 75, 55, 90, 65, 80].map((h, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                                <motion.div
                                    initial={{ height: 0 }}
                                    whileInView={{ height: `${h}%` }}
                                    transition={{ duration: 1, ease: "easeOut", delay: i * 0.05 }}
                                    className="w-full max-w-[40px] bg-slate-100 rounded-t-xl relative overflow-hidden group-hover:bg-blue-50 transition-colors"
                                >
                                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-blue-600 to-indigo-500 opacity-80 h-full rounded-t-xl group-hover:opacity-100 transition-opacity" />
                                    {/* Tooltip */}
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                                        ₹{h * 150}
                                    </div>
                                </motion.div>
                                <span className="text-xs font-bold text-slate-400 group-hover:text-blue-600 transition-colors">
                                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]}
                                </span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Recent Activity Feed */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-white p-5 md:p-6 rounded-3xl border border-slate-100 shadow-sm"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-slate-900">{t('liveActivity')}</h2>
                        <button className="p-2 hover:bg-slate-50 rounded-full text-slate-400 transition-colors">
                            <MoreHorizontal size={20} />
                        </button>
                    </div>

                    <div className="space-y-2">
                        {stats.recentActivities.length > 0 ? (
                            stats.recentActivities.map((activity, index) => (
                                <ActivityItem
                                    key={index}
                                    icon={activity.type === 'money' ? ShoppingBag : Users}
                                    title={activity.title}
                                    time={activity.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    type={activity.type}
                                    delay={0.7 + (index * 0.1)}
                                />
                            ))
                        ) : (
                            <p className="text-slate-500 text-center py-4">No recent activity</p>
                        )}

                        <div className="pt-4 mt-2 border-t border-slate-50">
                            <button className="w-full py-3 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-2">
                                {t('viewFullHistory')} <ArrowUpRight size={16} />
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AdminDashboard;
