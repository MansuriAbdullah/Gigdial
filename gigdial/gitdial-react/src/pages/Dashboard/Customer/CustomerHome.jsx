import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus, Heart, Clock, Headphones, Phone, MessageSquare,
    XCircle, Calendar, Star, Wallet, MapPin, Search,
    ChevronRight, CreditCard, RefreshCw, AlertTriangle, Briefcase, User
} from 'lucide-react';

const CustomerHome = () => {
    const navigate = useNavigate();
    const [filter, setFilter] = useState('active');
    const [bookings, setBookings] = useState([]);
    const [jobRequests, setJobRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
        fetchMyRequests();
    }, []);

    const fetchMyRequests = async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const res = await fetch('/api/job-requests/my', {
                headers: { 'Authorization': `Bearer ${userInfo?.token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setJobRequests(data);
            }
        } catch (error) {
            console.error('Error fetching job requests:', error);
        }
    };

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


        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            setBookings([]);
        } finally {
            setLoading(false);
        }
    };

    const filteredBookings = bookings.filter(b => b.status === filter || filter === 'all');

    const QuickAction = ({ icon: Icon, label, color, onClick }) => (
        <button
            onClick={onClick}
            className="flex flex-col items-center justify-center p-3 sm:p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group w-full"
        >
            <div className={`p-2.5 sm:p-3 rounded-xl mb-2 sm:mb-3 ${color} bg-opacity-10 group-hover:bg-opacity-20 transition-colors`}>
                <Icon size={20} className={color.replace('bg-', 'text-')} />
            </div>
            <span className="font-bold text-slate-700 text-[10px] sm:text-xs md:text-sm text-center line-clamp-1">{label}</span>
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
                <div className="flex justify-between items-start gap-3 mb-4">
                    <div className="flex gap-3 sm:gap-4 flex-1 min-w-0">
                        <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-sm sm:text-xl font-bold text-blue-600 shrink-0">
                            {booking.seller?.name?.charAt(0) || 'W'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-slate-900 text-sm sm:text-lg truncate">{booking.title || booking.gig?.title}</h4>
                            <p className="text-slate-500 text-[10px] sm:text-sm font-medium truncate">{booking.seller?.name || 'Worker'}</p>
                            <div className="flex flex-wrap items-center gap-2 mt-1 text-[10px] sm:text-xs text-slate-400">
                                <span className="flex items-center gap-1 whitespace-nowrap">
                                    <Calendar size={10} />
                                    {new Date(booking.date).toLocaleDateString()}
                                </span>
                                <span className="flex items-center gap-1 whitespace-nowrap">
                                    <Clock size={10} />
                                    {booking.time}
                                </span>
                            </div>
                        </div>
                    </div>
                    <span className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold capitalize shrink-0 ${booking.status === 'active' ? 'bg-blue-50 text-blue-600' :
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
                        <button
                            onClick={() => navigate(`/customer-dashboard/messages?workerId=${booking.seller?._id || booking.seller}`)}
                            className="flex items-center justify-center gap-1 py-2 rounded-xl bg-blue-50 text-blue-700 font-bold text-xs hover:bg-blue-100 transition-colors"
                        >
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



    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto space-y-6 lg:space-y-8 pb-32">
            {/* Quick Actions Grid */}
            <div className="grid grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
                <QuickAction
                    icon={Plus}
                    label="Booking"
                    color="bg-blue-600"
                    onClick={() => navigate('/customer-dashboard/browse-services')}
                />
                <QuickAction
                    icon={Heart}
                    label="Favourites"
                    color="bg-pink-500"
                    onClick={() => navigate('/customer-dashboard/favourites')}
                />
                <QuickAction
                    icon={Clock}
                    label="Active"
                    color="bg-orange-500"
                    onClick={() => setFilter('active')}
                />
                <QuickAction
                    icon={User}
                    label="Profile"
                    color="bg-indigo-600"
                    onClick={() => navigate('/customer-dashboard/profile')}
                />
                <QuickAction
                    icon={Headphones}
                    label="Support"
                    color="bg-green-600"
                    onClick={() => navigate('/contact')}
                />
            </div>

            {/* My Requests Section */}
            {jobRequests.length > 0 && (
                <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 p-6 md:p-8">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                                <MessageSquare size={20} />
                            </div>
                            <h2 className="text-xl font-bold text-slate-900">My Public Requests</h2>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {jobRequests.map((req) => (
                            <div key={req._id} className="p-5 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-lg transition-all border-l-4 border-l-blue-500">
                                <div className="flex justify-between items-start mb-3">
                                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-[10px] font-bold rounded-full uppercase tracking-wider">
                                        {req.category}
                                    </span>
                                    <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${
                                        req.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 
                                        req.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-600'
                                    }`}>
                                        {req.status === 'pending' ? 'WAITING' : 'ACCEPTED'}
                                    </span>
                                </div>
                                <p className="text-slate-700 text-sm font-medium line-clamp-2 mb-4">"{req.description}"</p>
                                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                    <div className="flex items-center gap-2 text-slate-500">
                                        <Clock size={14} />
                                        <span className="text-xs font-bold">{req.days} Days</span>
                                    </div>
                                    <div className="text-blue-600 font-bold text-sm">₹{req.budget}</div>
                                </div>
                                {req.status === 'active' && (
                                    <div className="mt-4 p-3 bg-green-50 rounded-xl flex items-center gap-3">
                                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-green-600 font-bold text-xs ring-2 ring-green-100">
                                            {req.acceptedBy?.name?.charAt(0) || 'W'}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[10px] text-green-600 font-bold uppercase tracking-wider">Accepted By</p>
                                            <p className="text-xs font-bold text-slate-800 truncate">{req.acceptedBy?.name || 'Assigned Worker'}</p>
                                        </div>
                                        <button 
                                            onClick={() => navigate(`/customer-dashboard/messages?workerId=${req.acceptedBy?._id || req.acceptedBy}`)}
                                            className="p-2 bg-white text-blue-600 rounded-lg shadow-sm hover:bg-blue-600 hover:text-white transition-all"
                                        >
                                            <MessageSquare size={14} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

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
                    <div className="flex gap-2 overflow-x-auto pb-4 px-1 no-scrollbar -mx-1 mask-fade-right">
                        {['active', 'completed', 'cancelled', 'upcoming'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setFilter(tab)}
                                className={`px-5 py-2 md:px-6 md:py-2.5 rounded-full text-xs md:text-sm font-bold whitespace-nowrap transition-all ${filter === tab
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


                    {/* Quick Links */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
                        <h3 className="font-bold text-slate-900 mb-4">Quick Links</h3>
                        <div className="space-y-2">
                            {[
                                { icon: Briefcase, label: 'Browse Services', path: '/customer-dashboard/browse-services' },
                                { icon: MessageSquare, label: 'Messages', path: '/customer-dashboard/messages' },
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
