import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus, Heart, Clock, Headphones, Phone, MessageSquare,
    XCircle, Calendar, Star, Wallet, MapPin, Search,
    ChevronRight, CreditCard, RefreshCw, AlertTriangle
} from 'lucide-react';
import DashboardLayout from '../../layouts/DashboardLayout';

// --- Sub-Components ---

const QuickAction = ({ icon: Icon, label, color, onClick }) => (
    <button
        onClick={onClick}
        className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group"
    >
        <div className={`p-3 rounded-xl mb-3 ${color} bg-opacity-10 group-hover:bg-opacity-20 transition-colors`}>
            <Icon size={24} className={color.replace('bg-', 'text-')} />
        </div>
        <span className="font-bold text-slate-700 text-sm">{label}</span>
    </button>
);

const BookingCard = ({ workerName, service, date, time, status, image, price }) => {
    const [isRating, setIsRating] = useState(false);
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');

    const handleSubmitReview = () => {
        // Logic to submit review will go here (API call)
        alert(`Review Submitted for ${workerName}\nRating: ${rating} Stars\nComment: ${review}`);
        setIsRating(false);
        setRating(0);
        setReview('');
    };

    return (
        <div className="bg-white p-4 md:p-5 rounded-2xl border border-slate-100 shadow-sm mb-4 transition-all hover:shadow-md">
            <div className="flex justify-between items-start mb-4">
                <div className="flex gap-4">
                    <img src={image} alt={workerName} className="w-14 h-14 rounded-full object-cover border-2 border-slate-100" />
                    <div>
                        <h4 className="font-bold text-slate-900 text-lg">{workerName}</h4>
                        <p className="text-slate-500 text-sm font-medium">{service}</p>
                        <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                            <span className="flex items-center gap-1"><Calendar size={12} /> {date}</span>
                            <span className="flex items-center gap-1"><Clock size={12} /> {time}</span>
                        </div>
                    </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${status === 'active' ? 'bg-blue-50 text-blue-600' :
                    status === 'completed' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                    }`}>
                    {status}
                </span>
            </div>

            {/* Action Buttons */}
            {status === 'active' && (
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

            {status === 'completed' && (
                <div className="mt-2 space-y-4">
                    <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl">
                        <span className="font-bold text-slate-700">Total Paid: {price}</span>
                        {!isRating && (
                            <button
                                onClick={() => setIsRating(true)}
                                className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-sm rounded-lg transition-colors flex items-center gap-2"
                            >
                                <Star size={14} fill="black" /> Rate Worker
                            </button>
                        )}
                    </div>

                    {/* Inline Rating Form */}
                    <AnimatePresence>
                        {isRating && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                    <h5 className="font-bold text-slate-800 mb-3 text-sm">Rate your experience</h5>

                                    {/* Star Rating */}
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
                                    ></textarea>

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
                                            className="px-6 py-2 bg-slate-900 text-white font-bold text-sm rounded-lg hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Submit Review
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
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
                    <h3 className="text-3xl font-bold">₹2,450.00</h3>
                </div>
                <div className="p-2 bg-white/20 backdrop-blur-md rounded-lg">
                    <Wallet size={24} />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center bg-white text-indigo-600 py-3 rounded-xl font-bold text-sm hover:bg-indigo-50 transition-colors shadow-lg shadow-black/10">
                    Add Money
                </button>
                <button className="flex items-center justify-center bg-indigo-500/50 text-white py-3 rounded-xl font-bold text-sm hover:bg-indigo-500/70 transition-colors border border-indigo-400/30">
                    History
                </button>
            </div>
        </div>
    </div>
);

const SuggestedService = ({ image, title, discount }) => (
    <div className="flex items-center gap-4 p-3 rounded-2xl bg-white border border-slate-100 hover:border-blue-200 cursor-pointer transition-all group">
        <img src={image} alt={title} className="w-16 h-16 rounded-xl object-cover" />
        <div className="flex-1">
            <h5 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{title}</h5>
            <p className="text-xs text-green-600 font-bold mt-1">{discount}</p>
        </div>
        <button className="p-2 rounded-full bg-slate-50 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
            <ChevronRight size={18} />
        </button>
    </div>
);

// --- Main Page Component ---

const CustomerDashboard = () => {
    const { t } = useLanguage();
    const [filter, setFilter] = useState('active');

    // Mock Data
    const bookings = [
        { id: 1, name: "Rajesh Kumar", service: "AC Repair", date: "Today", time: "2:00 PM", status: "active", image: "https://i.pravatar.cc/150?img=11", price: "₹450" },
        { id: 2, name: "Anita Desai", service: "Home Cleaning", date: "Yesterday", time: "10:00 AM", status: "completed", image: "https://i.pravatar.cc/150?img=5", price: "₹1,200" },
        { id: 3, name: "Vikram Singh", service: "Plumbing", date: "24 Jan", time: "4:30 PM", status: "canceled", image: "https://i.pravatar.cc/150?img=3", price: "₹350" },
    ];

    const filteredBookings = bookings.filter(b => b.status === filter || filter === 'all');

    return (
        <DashboardLayout role="customer">
            <div className="max-w-6xl mx-auto space-y-6 lg:space-y-8 pb-32">

                {/* 1. Quick Actions Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <QuickAction icon={Plus} label={t('newBooking')} color="text-blue-600 bg-blue-600" onClick={() => { }} />
                    <QuickAction icon={Heart} label={t('myFavorites')} color="text-pink-500 bg-pink-500" onClick={() => { }} />
                    <QuickAction icon={Clock} label={t('activeBookings')} color="text-orange-500 bg-orange-500" onClick={() => setFilter('active')} />
                    <QuickAction icon={Headphones} label={t('support')} color="text-green-600 bg-green-600" onClick={() => { }} />
                </div>

                <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
                    {/* Left Column: Bookings & Filters */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-slate-800">{t('myBookings')}</h2>
                        </div>

                        {/* 3. Sidebar/Filter (Tabs) */}
                        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                            {['active', 'completed', 'canceled', 'upcoming'].map((tab) => (
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

                        {/* 2. Booking Cards List */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={filter}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="space-y-4"
                            >
                                {filteredBookings.length > 0 ? (
                                    filteredBookings.map((booking) => (
                                        <BookingCard
                                            key={booking.id}
                                            workerName={booking.name}
                                            service={booking.service}
                                            date={booking.date}
                                            time={booking.time}
                                            status={booking.status}
                                            image={booking.image}
                                            price={booking.price}
                                            onRate={() => alert(`Rate ${booking.name}`)}
                                        />
                                    ))
                                ) : (
                                    <div className="text-center py-12 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                                        <Calendar size={48} className="mx-auto text-slate-300 mb-3" />
                                        <p className="text-slate-500 font-medium">No {t(filter)} bookings found.</p>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Right Column: Wallet & Suggestions */}
                    <div className="space-y-8">
                        {/* 4. Wallet Status */}
                        <section>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-slate-800">{t('wallet')}</h3>
                                <span className="text-xs text-blue-600 font-bold cursor-pointer">{t('all')}</span>
                            </div>
                            <WalletCard />
                        </section>

                        {/* 6. Suggested Services (AI) */}
                        <section>
                            <div className="flex items-center gap-2 mb-4">
                                <h3 className="font-bold text-slate-800">{t('suggestedForYou')}</h3>
                                <span className="bg-purple-100 text-purple-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-purple-200">{t('aiPicks')}</span>
                            </div>
                            <div className="space-y-3">
                                <SuggestedService
                                    image="https://images.unsplash.com/photo-1581578731117-104f8a338e2d?auto=format&fit=crop&w=150&q=80"
                                    title="Deep Home Cleaning"
                                    discount="20% OFF"
                                />
                                <SuggestedService
                                    image="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=150&q=80"
                                    title="AC Service & Repair"
                                    discount="Summer Special"
                                />
                                <SuggestedService
                                    image="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=150&q=80"
                                    title="Kitchen Chimney Cleaning"
                                    discount="Starts @ ₹499"
                                />
                            </div>
                        </section>

                        {/* Rate Reminder (Static Demo) */}
                        <div className="p-4 bg-yellow-50 rounded-2xl border border-yellow-100 flex items-start gap-3">
                            <AlertTriangle className="text-yellow-600 shrink-0 mt-0.5" size={20} />
                            <div>
                                <h4 className="font-bold text-yellow-800 text-sm">{t('reviewPending')}</h4>
                                <p className="text-xs text-yellow-700 mt-1 mb-2">How was your experience with Anita Desai?</p>
                                <button className="text-xs font-bold bg-yellow-400 text-yellow-900 px-3 py-1.5 rounded-lg hover:bg-yellow-500 transition-colors">
                                    {t('writeReview')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default CustomerDashboard;
