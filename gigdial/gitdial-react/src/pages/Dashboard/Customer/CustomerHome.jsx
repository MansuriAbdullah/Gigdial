import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus, Heart, Clock, Headphones, Phone, MessageSquare,
    XCircle, Calendar, Star, Wallet, MapPin, Search,
    ChevronRight, CreditCard, RefreshCw, AlertTriangle, Briefcase
} from 'lucide-react';

const CustomerHome = () => {
    const navigate = useNavigate();
    const [filter, setFilter] = useState('active');
    const [bookings, setBookings] = useState([]);
    const [walletBalance, setWalletBalance] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));

            // Fetch bookings
            try {
                const bookingsRes = await fetch('/api/orders/myorders', {
                    headers: { 'Authorization': `Bearer ${userInfo?.token}` }
                });
                if (bookingsRes.ok) {
                    const bookingsData = await bookingsRes.json();
                    setBookings(Array.isArray(bookingsData) ? bookingsData : []);
                } else {
                    setBookings([]);
                }
            } catch (err) {
                console.error('Error fetching bookings:', err);
                setBookings([]);
            }

            // Fetch wallet balance
            try {
                const walletRes = await fetch('/api/users/wallet', {
                    headers: { 'Authorization': `Bearer ${userInfo?.token}` }
                });
                if (walletRes.ok) {
                    const walletData = await walletRes.json();
                    setWalletBalance(walletData.balance || 0);
                } else {
                    setWalletBalance(0);
                }
            } catch (err) {
                console.error('Error fetching wallet:', err);
                setWalletBalance(0);
            }
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            setBookings([]);
            setWalletBalance(0);
        } finally {
            setLoading(false);
        }
    };

    const filteredBookings = bookings.filter(b => b.status === filter || filter === 'all');

    const QuickAction = ({ icon: Icon, label, color, onClick }) => (
        <button
            onClick={onClick}
            className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group"
        >
            <div className={`p-3 rounded-xl mb-3 ${color} bg-opacity-10 group-hover:bg-opacity-20 transition-colors`}>
                <Icon size={24} className={color.replace('bg-', 'text-')} />
            </div>
            <span className="font-bold text-slate-700 text-sm text-center">{label}</span>
        </button>
    );

    const BookingCard = ({ booking }) => {
        const [isRating, setIsRating] = useState(false);
        const [rating, setRating] = useState(0);
        const [review, setReview] = useState('');

        const handleSubmitReview = async () => {
            try {
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                await fetch(`/api/orders/${booking._id}/review`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${userInfo?.token}`
                    },
                    body: JSON.stringify({ rating, review })
                });
                setIsRating(false);
                fetchDashboardData();
            } catch (error) {
                console.error('Error submitting review:', error);
            }
        };

        return (
            <div className="bg-white p-4 md:p-5 rounded-2xl border border-slate-200 shadow-sm mb-4 transition-all hover:shadow-md">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-4 flex-1">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-xl font-bold text-blue-600">
                            {booking.workerName?.charAt(0) || 'W'}
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-slate-900 text-lg">{booking.serviceName}</h4>
                            <p className="text-slate-500 text-sm font-medium">{booking.workerName}</p>
                            <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                                <span className="flex items-center gap-1">
                                    <Calendar size={12} />
                                    {new Date(booking.date).toLocaleDateString()}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Clock size={12} />
                                    {booking.time}
                                </span>
                            </div>
                        </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${booking.status === 'active' ? 'bg-blue-50 text-blue-600' :
                        booking.status === 'completed' ? 'bg-green-50 text-green-600' :
                            'bg-red-50 text-red-600'
                        }`}>
                        {booking.status}
                    </span>
                </div>

                {booking.status === 'active' && (
                    <div className="grid grid-cols-3 gap-2">
                        <button className="flex items-center justify-center gap-1 py-2 rounded-xl bg-green-50 text-green-700 font-bold text-xs hover:bg-green-100 transition-colors">
                            <Phone size={14} /> Call
                        </button>
                        <button className="flex items-center justify-center gap-1 py-2 rounded-xl bg-blue-50 text-blue-700 font-bold text-xs hover:bg-blue-100 transition-colors">
                            <MessageSquare size={14} /> Chat
                        </button>
                        <button className="flex items-center justify-center gap-1 py-2 rounded-xl bg-red-50 text-red-600 font-bold text-xs hover:bg-red-100 transition-colors">
                            <XCircle size={14} /> Cancel
                        </button>
                    </div>
                )}

                {booking.status === 'completed' && !booking.rated && (
                    <div className="mt-2">
                        {!isRating ? (
                            <button
                                onClick={() => setIsRating(true)}
                                className="w-full px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-sm rounded-lg transition-colors flex items-center justify-center gap-2"
                            >
                                <Star size={14} fill="black" /> Rate Worker
                            </button>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="bg-slate-50 p-4 rounded-xl border border-slate-100"
                            >
                                <h5 className="font-bold text-slate-800 mb-3 text-sm">Rate your experience</h5>
                                <div className="flex gap-2 mb-4">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            onClick={() => setRating(star)}
                                            className="transition-transform hover:scale-110"
                                        >
                                            <Star
                                                size={24}
                                                className={star <= rating ? "fill-yellow-400 text-yellow-400" : "text-slate-300"}
                                            />
                                        </button>
                                    ))}
                                </div>
                                <textarea
                                    value={review}
                                    onChange={(e) => setReview(e.target.value)}
                                    placeholder="Write a brief review (optional)..."
                                    className="w-full p-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white mb-3"
                                    rows="2"
                                />
                                <div className="flex gap-2 justify-end">
                                    <button
                                        onClick={() => setIsRating(false)}
                                        className="px-4 py-2 text-slate-500 font-bold text-sm hover:bg-slate-200 rounded-lg transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSubmitReview}
                                        disabled={rating === 0}
                                        className="px-6 py-2 bg-slate-900 text-white font-bold text-sm rounded-lg hover:bg-slate-800 transition-colors disabled:opacity-50"
                                    >
                                        Submit Review
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </div>
                )}
            </div>
        );
    };

    const WalletCard = () => (
        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-5 md:p-6 text-white shadow-xl shadow-indigo-200 mb-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
            <div className="relative z-10">
                <div className="flex justify-between items-start mb-6 md:mb-8">
                    <div>
                        <p className="text-indigo-100 font-medium mb-1">Wallet Balance</p>
                        <h3 className="text-3xl font-bold">₹{walletBalance.toFixed(2)}</h3>
                    </div>
                    <div className="p-2 bg-white/20 backdrop-blur-md rounded-lg">
                        <Wallet size={24} />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={() => navigate('/customer-dashboard/wallet')}
                        className="flex items-center justify-center bg-white text-indigo-600 py-3 rounded-xl font-bold text-sm hover:bg-indigo-50 transition-colors shadow-lg shadow-black/10"
                    >
                        Add Money
                    </button>
                    <button
                        onClick={() => navigate('/customer-dashboard/wallet')}
                        className="flex items-center justify-center bg-indigo-500/50 text-white py-3 rounded-xl font-bold text-sm hover:bg-indigo-500/70 transition-colors border border-indigo-400/30"
                    >
                        History
                    </button>
                </div>
            </div>
        </div>
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto space-y-6 lg:space-y-8 pb-32">
            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <QuickAction
                    icon={Plus}
                    label="New Booking"
                    color="text-blue-600 bg-blue-600"
                    onClick={() => navigate('/customer-dashboard/browse-services')}
                />
                <QuickAction
                    icon={Heart}
                    label="My Favourites"
                    color="text-pink-500 bg-pink-500"
                    onClick={() => navigate('/customer-dashboard/favourites')}
                />
                <QuickAction
                    icon={Clock}
                    label="Active Bookings"
                    color="text-orange-500 bg-orange-500"
                    onClick={() => setFilter('active')}
                />
                <QuickAction
                    icon={Headphones}
                    label="Support"
                    color="text-green-600 bg-green-600"
                    onClick={() => navigate('/contact')}
                />
            </div>

            <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
                {/* Left Column: Bookings */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-slate-800">My Bookings</h2>
                        <button
                            onClick={() => navigate('/customer-dashboard/service-history')}
                            className="text-blue-600 font-bold text-sm hover:underline"
                        >
                            View All
                        </button>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                        {['active', 'completed', 'cancelled', 'upcoming'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setFilter(tab)}
                                className={`px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${filter === tab
                                    ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20'
                                    : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'
                                    }`}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>

                    {/* Bookings List */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={filter}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-4"
                        >
                            {filteredBookings.length > 0 ? (
                                filteredBookings.slice(0, 3).map((booking) => (
                                    <BookingCard key={booking._id} booking={booking} />
                                ))
                            ) : (
                                <div className="text-center py-12 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                                    <Calendar size={48} className="mx-auto text-slate-300 mb-3" />
                                    <p className="text-slate-500 font-medium">No {filter} bookings found.</p>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Right Column: Wallet & Quick Links */}
                <div className="space-y-6">
                    <WalletCard />

                    {/* Quick Links */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
                        <h3 className="font-bold text-slate-900 mb-4">Quick Links</h3>
                        <div className="space-y-2">
                            {[
                                { icon: Briefcase, label: 'Browse Services', path: '/customer-dashboard/browse-services' },
                                { icon: MapPin, label: 'Saved Addresses', path: '/customer-dashboard/addresses' },
                                { icon: Star, label: 'Refer & Earn', path: '/customer-dashboard/refer-earn' },
                            ].map((link) => (
                                <button
                                    key={link.path}
                                    onClick={() => navigate(link.path)}
                                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors group"
                                >
                                    <div className="flex items-center gap-3">
                                        <link.icon size={18} className="text-slate-400 group-hover:text-blue-600 transition-colors" />
                                        <span className="font-medium text-slate-700 group-hover:text-blue-600 transition-colors">
                                            {link.label}
                                        </span>
                                    </div>
                                    <ChevronRight size={18} className="text-slate-300 group-hover:text-blue-600 transition-colors" />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerHome;
