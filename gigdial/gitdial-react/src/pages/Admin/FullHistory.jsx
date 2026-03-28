import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import {
    ArrowLeft, Users, Briefcase, ShoppingBag, Filter,
    ChevronLeft, ChevronRight, Clock, TrendingUp, RefreshCw,
    UserCheck, UserPlus, Search
} from 'lucide-react';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const getActivityStyle = (type) => {
    switch (type) {
        case 'worker_join':
            return {
                bg: 'bg-emerald-50',
                text: 'text-emerald-700',
                border: 'border-emerald-200',
                icon: Briefcase,
                iconColor: 'text-emerald-600',
                badge: 'bg-emerald-100 text-emerald-700',
                label: 'New Worker'
            };
        case 'customer_join':
            return {
                bg: 'bg-blue-50',
                text: 'text-blue-700',
                border: 'border-blue-200',
                icon: UserPlus,
                iconColor: 'text-blue-600',
                badge: 'bg-blue-100 text-blue-700',
                label: 'New Customer'
            };
        case 'booking':
            return {
                bg: 'bg-purple-50',
                text: 'text-purple-700',
                border: 'border-purple-200',
                icon: ShoppingBag,
                iconColor: 'text-purple-600',
                badge: 'bg-purple-100 text-purple-700',
                label: 'Booking'
            };
        default:
            return {
                bg: 'bg-slate-50',
                text: 'text-slate-700',
                border: 'border-slate-200',
                icon: Clock,
                iconColor: 'text-slate-600',
                badge: 'bg-slate-100 text-slate-700',
                label: 'Activity'
            };
    }
};

const formatTime = (dateStr) => {
    const d = new Date(dateStr);
    const now = new Date();
    const diff = now - d;
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
};

const ActivityRow = ({ activity, index }) => {
    const style = getActivityStyle(activity.type);
    const Icon = style.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03, duration: 0.3 }}
            className={`flex items-start gap-4 p-4 rounded-2xl border ${style.border} ${style.bg} hover:shadow-md transition-all`}
        >
            <div className={`w-12 h-12 rounded-2xl bg-white flex items-center justify-center shrink-0 shadow-sm border ${style.border}`}>
                <Icon size={20} className={style.iconColor} />
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full ${style.badge}`}>
                                {style.label}
                            </span>
                            {activity.status && (
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${activity.status === 'completed' ? 'bg-green-100 text-green-700' :
                                    activity.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                                        'bg-yellow-100 text-yellow-700'
                                    }`}>
                                    {activity.status}
                                </span>
                            )}
                        </div>
                        <p className={`font-bold text-sm ${style.text} truncate`}>{activity.title}</p>
                        <p className="text-slate-500 text-xs mt-0.5 truncate">{activity.subtitle}</p>
                    </div>
                    <div className="text-right shrink-0">
                        <span className="text-xs font-semibold text-slate-400 whitespace-nowrap">
                            {formatTime(activity.time)}
                        </span>
                        {activity.price > 0 && (
                            <p className="text-sm font-extrabold text-green-600 mt-1">₹{activity.price.toLocaleString()}</p>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const FullHistory = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');
    const [refreshing, setRefreshing] = useState(false);

    const fetchHistory = useCallback(async (currentPage = page, currentFilter = filter) => {
        try {
            setLoading(true);
            const config = { headers: { Authorization: `Bearer ${user?.token}` } };
            const { data } = await axios.get(
                `/api/users/dashboard/history?page=${currentPage}&limit=15&filter=${currentFilter}`,
                config
            );
            setActivities(data.activities || []);
            setTotalPages(data.totalPages || 1);
            setTotal(data.total || 0);
        } catch (error) {
            console.error('Error fetching history:', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, [user, page, filter]);

    useEffect(() => {
        if (user?.token) fetchHistory(page, filter);
    }, [user, page, filter]);

    const handleRefresh = () => {
        setRefreshing(true);
        fetchHistory(page, filter);
    };

    const filteredActivities = activities.filter(a =>
        search === '' ||
        a.title?.toLowerCase().includes(search.toLowerCase()) ||
        a.subtitle?.toLowerCase().includes(search.toLowerCase())
    );

    // Count by type
    const workerCount = activities.filter(a => a.type === 'worker_join').length;
    const customerCount = activities.filter(a => a.type === 'customer_join').length;
    const bookingCount = activities.filter(a => a.type === 'booking').length;

    return (
        <div className="max-w-5xl mx-auto space-y-6 pb-16">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-4"
            >
                <button
                    onClick={() => navigate('/admin')}
                    className="p-2.5 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all"
                >
                    <ArrowLeft size={20} />
                </button>
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-900">Full Activity History</h1>
                    <p className="text-slate-500 text-sm font-medium">Complete platform event log from the database</p>
                </div>
                <button
                    onClick={handleRefresh}
                    disabled={refreshing}
                    className="ml-auto p-2.5 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-blue-600 transition-all disabled:opacity-50"
                >
                    <RefreshCw size={18} className={refreshing ? 'animate-spin' : ''} />
                </button>
            </motion.div>

            {/* Summary Cards */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
                {[
                    { label: 'Total Events', value: total, icon: TrendingUp, color: 'slate' },
                    { label: 'New Workers', value: workerCount, icon: Briefcase, color: 'emerald' },
                    { label: 'New Customers', value: customerCount, icon: UserCheck, color: 'blue' },
                    { label: 'Bookings', value: bookingCount, icon: ShoppingBag, color: 'purple' },
                ].map((card, i) => (
                    <motion.div
                        key={card.label}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 + i * 0.05 }}
                        className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-center gap-3"
                    >
                        <div className={`w-10 h-10 rounded-xl bg-${card.color}-50 flex items-center justify-center shrink-0`}>
                            <card.icon size={18} className={`text-${card.color}-600`} />
                        </div>
                        <div>
                            <p className="text-slate-400 text-[10px] font-bold uppercase">{card.label}</p>
                            <p className="text-xl font-extrabold text-slate-900">{card.value}</p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Filters + Search */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center"
            >
                <div className="flex items-center gap-2">
                    <Filter size={16} className="text-slate-400" />
                    <span className="text-sm font-bold text-slate-600">Filter:</span>
                </div>
                <div className="flex gap-2 flex-wrap">
                    {[
                        { key: 'all', label: 'All Events' },
                        { key: 'users', label: 'Users Only' },
                        { key: 'orders', label: 'Bookings Only' },
                    ].map(f => (
                        <button
                            key={f.key}
                            onClick={() => { setFilter(f.key); setPage(1); }}
                            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${filter === f.key
                                ? 'bg-slate-900 text-white shadow-sm'
                                : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                                }`}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>
                <div className="sm:ml-auto relative">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search events..."
                        className="pl-8 pr-4 py-1.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-slate-50 w-48"
                    />
                </div>
            </motion.div>

            {/* Activity List */}
            <div className="space-y-3">
                {loading ? (
                    <div className="py-20 flex flex-col items-center gap-4">
                        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                        <p className="text-slate-400 font-medium">Loading activity history...</p>
                    </div>
                ) : filteredActivities.length === 0 ? (
                    <div className="py-20 text-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                        <Clock size={48} className="mx-auto text-slate-300 mb-3" />
                        <p className="text-slate-500 font-medium">No activities found</p>
                        <p className="text-slate-400 text-sm mt-1">Try changing the filter or search term</p>
                    </div>
                ) : (
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`${page}-${filter}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="space-y-3"
                        >
                            {filteredActivities.map((activity, index) => (
                                <ActivityRow key={`${activity.id}-${index}`} activity={activity} index={index} />
                            ))}
                        </motion.div>
                    </AnimatePresence>
                )}
            </div>

            {/* Pagination */}
            {!loading && totalPages > 1 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-between pt-2"
                >
                    <p className="text-sm text-slate-400 font-medium">
                        Page <span className="font-bold text-slate-700">{page}</span> of <span className="font-bold text-slate-700">{totalPages}</span>
                    </p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                        >
                            <ChevronLeft size={16} /> Prev
                        </button>
                        <button
                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                        >
                            Next <ChevronRight size={16} />
                        </button>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default FullHistory;
