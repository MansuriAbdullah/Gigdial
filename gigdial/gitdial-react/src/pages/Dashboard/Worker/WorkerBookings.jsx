import React, { useState, useEffect } from 'react';
import {
    Calendar, Clock, MapPin, User, Phone, CheckCircle,
    XCircle, AlertCircle, Filter, ChevronRight, Star,
    MoreVertical, ArrowUpRight, CheckSquare, MessageCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getFullImagePath } from '../../../utils/imagePath';

const WorkerBookings = () => {
    const [filter, setFilter] = useState('All');
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [otpModalOpen, setOtpModalOpen] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [otpInput, setOtpInput] = useState('');
    const [otpLoading, setOtpLoading] = useState(false);

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const fetchBookings = async () => {
        try {
            const response = await fetch('/api/orders/seller', {
                headers: {
                    'Authorization': `Bearer ${userInfo?.token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setBookings(Array.isArray(data) ? data : []);
            } else {
                setBookings([]);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching bookings:', error);
            setBookings([]);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const updateStatus = async (id, status) => {
        try {
            const response = await fetch(`/api/orders/${id}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userInfo?.token}`
                },
                body: JSON.stringify({ status })
            });

            if (response.ok) {
                fetchBookings();
            } else {
                alert('Failed to update status');
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const handleRequestCompletion = async (orderId) => {
        setOtpLoading(true);
        try {
            const res = await fetch(`/api/orders/${orderId}/otp`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${userInfo?.token}`
                }
            });

            if (res.ok) {
                setSelectedOrderId(orderId);
                setOtpModalOpen(true);
                setOtpInput('');
            } else {
                const data = await res.json();
                alert(data.message || "Failed to send OTP");
            }
        } catch (error) {
            console.error("Error sending OTP:", error);
            alert("Error sending OTP");
        } finally {
            setOtpLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        if (!otpInput || otpInput.length < 6) return;
        setOtpLoading(true);
        try {
            const res = await fetch(`/api/orders/${selectedOrderId}/complete`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userInfo?.token}`
                },
                body: JSON.stringify({ otp: otpInput })
            });

            if (res.ok) {
                setOtpModalOpen(false);
                fetchBookings();
            } else {
                const data = await res.json();
                alert(data.message || "Invalid OTP or Expired");
            }
        } catch (error) {
            console.error("Error verifying OTP:", error);
            alert("Error verifying OTP");
        } finally {
            setOtpLoading(false);
        }
    };

    const getStatusStyles = (status) => {
        switch (status) {
            case 'completed': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
            case 'cancelled': return 'bg-rose-50 text-rose-600 border-rose-100';
            case 'pending': return 'bg-amber-50 text-amber-600 border-amber-100';
            case 'in-progress':
            case 'active': return 'bg-blue-50 text-blue-600 border-blue-100';
            case 'requested': return 'bg-indigo-50 text-indigo-600 border-indigo-100';
            default: return 'bg-slate-50 text-slate-600 border-slate-100';
        }
    };

    const filteredBookings = bookings.filter(booking => {
        if (filter === 'All') return true;
        if (filter === 'Pending') return booking.status === 'pending' || booking.status === 'requested';
        if (filter === 'Active') return booking.status === 'in-progress' || booking.status === 'active';
        return booking.status === filter.toLowerCase();
    });

    return (
        <div className="space-y-8 pb-20">
            {/* Header section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Booking Management</h1>
                    <p className="text-slate-500 font-medium mt-1">Review and manage your service appointments</p>
                </div>
                <div className="flex bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto no-scrollbar">
                    {['All', 'Pending', 'Active', 'Completed', 'Cancelled'].map(status => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`px-5 py-2.5 text-sm font-bold rounded-xl transition-all whitespace-nowrap ${filter === status
                                ? 'bg-slate-900 text-white shadow-lg'
                                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[2rem] border border-slate-100 shadow-sm">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Loading Bookings...</p>
                </div>
            ) : filteredBookings.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[2rem] border border-slate-100 shadow-sm text-center">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                        <Calendar size={32} className="text-slate-200" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">No bookings found</h3>
                    <p className="text-slate-500 max-w-xs mx-auto">It looks like you don't have any {filter.toLowerCase()} bookings at the moment.</p>
                </div>
            ) : (
                <motion.div layout className="grid gap-6">
                    <AnimatePresence>
                        {filteredBookings.map((booking, idx) => (
                            <motion.div
                                key={booking._id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="group relative bg-white rounded-[2rem] border border-slate-100 p-6 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300"
                            >
                                <div className="flex flex-col lg:flex-row gap-8">
                                    {/* Left Side: Order Info */}
                                    <div className="flex-1 flex flex-col sm:flex-row gap-6">
                                        <div className="relative">
                                            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-white shadow-inner flex items-center justify-center text-blue-600 font-black text-2xl">
                                                {booking.buyer?.name?.charAt(0) || 'C'}
                                            </div>
                                            <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-white border-4 border-white shadow-sm flex items-center justify-center overflow-hidden">
                                                <img
                                                    src={booking.buyer?.profileImage ? getFullImagePath(booking.buyer.profileImage) : "https://i.pravatar.cc/150?img=11"}
                                                    className="w-full h-full object-cover"
                                                    alt=""
                                                />
                                            </div>
                                        </div>

                                        <div className="flex-1 space-y-4">
                                            <div>
                                                <div className="flex flex-wrap items-center gap-2 mb-2">
                                                    <h3 className="text-xl font-bold text-slate-900 tracking-tight">{booking.title || booking.gig?.title || 'Professional Service'}</h3>
                                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusStyles(booking.status)}`}>
                                                        {booking.status.replace('-', ' ')}
                                                    </span>
                                                </div>
                                                <div className="flex flex-wrap items-center gap-4 text-slate-500 text-sm font-semibold">
                                                    <span className="flex items-center gap-1.5"><User size={14} className="text-blue-500" /> {booking.buyer?.name || 'Customer'}</span>
                                                    <span className="flex items-center gap-1.5"><MapPin size={14} className="text-rose-500" /> {booking.buyer?.city || 'Location N/A'}</span>
                                                    <span className="flex items-center gap-1.5"><Calendar size={14} className="text-amber-500" /> {new Date(booking.date || booking.createdAt).toLocaleDateString()}</span>
                                                </div>
                                            </div>

                                            {/* Extra details row */}
                                            <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-50">
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Payment</span>
                                                    <span className="text-sm font-bold text-slate-700 capitalize">{booking.paymentMethod || 'On Request'}</span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Time Slot</span>
                                                    <span className="text-sm font-bold text-slate-700">{booking.time || 'Flexible'}</span>
                                                </div>
                                                {booking.isReviewed && (
                                                    <div className="flex flex-col">
                                                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Rating Given</span>
                                                        <div className="flex items-center gap-1">
                                                            <span className="text-sm font-bold text-amber-500">{booking.rating}</span>
                                                            <Star size={12} className="fill-amber-500 text-amber-500" />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Middle: Amount */}
                                    <div className="lg:w-px h-auto lg:h-32 bg-slate-100 self-center hidden lg:block"></div>

                                    <div className="flex flex-col justify-center text-center lg:text-right px-4">
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Service Fee</p>
                                        <h4 className="text-3xl font-black text-slate-900 leading-none">₹{booking.price || 0}</h4>
                                        <p className="text-[10px] font-bold text-emerald-600 mt-2 flex items-center lg:justify-end gap-1 uppercase">
                                            <Clock size={10} /> {booking.status === 'completed' ? 'Earned' : 'Pending'}
                                        </p>
                                    </div>

                                    {/* Right Side: Actions */}
                                    <div className="flex flex-col justify-center gap-3">
                                        {booking.status === 'pending' || booking.status === 'requested' ? (
                                            <>
                                                <button
                                                    onClick={() => updateStatus(booking._id, 'in-progress')}
                                                    className="w-full lg:w-40 py-3 bg-blue-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95 flex items-center justify-center gap-2"
                                                >
                                                    <CheckSquare size={16} /> Accept
                                                </button>
                                                <button
                                                    onClick={() => updateStatus(booking._id, 'cancelled')}
                                                    className="w-full lg:w-40 py-3 bg-rose-50 text-rose-600 border border-rose-100 rounded-xl font-bold text-sm hover:bg-rose-100 transition-all active:scale-95"
                                                >
                                                    Decline
                                                </button>
                                            </>
                                        ) : (booking.status === 'in-progress' || booking.status === 'active') ? (
                                            <button
                                                onClick={() => handleRequestCompletion(booking._id)}
                                                className="w-full lg:w-40 py-3 bg-emerald-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all active:scale-95 flex items-center justify-center gap-2"
                                            >
                                                <ArrowUpRight size={16} /> Complete Job
                                            </button>
                                        ) : null}

                                        <button
                                            onClick={() => window.location.href = `/worker-dashboard/messages?customerId=${booking.buyer?._id}`}
                                            className="w-full lg:w-40 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-all active:scale-95 flex items-center justify-center gap-2"
                                        >
                                            <MessageCircle size={16} /> Message
                                        </button>
                                    </div>
                                </div>

                                {booking.review && (
                                    <div className="mt-6 pt-4 border-t border-slate-50 italic text-slate-500 text-sm bg-slate-50/50 p-4 rounded-xl">
                                        "{booking.review}"
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            )}

            {/* OTP Modal */}
            <AnimatePresence>
                {otpModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setOtpModalOpen(false)}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-white rounded-[2.5rem] p-8 w-full max-w-sm shadow-2xl relative z-10 border border-white"
                        >
                            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                                <CheckSquare size={32} strokeWidth={2.5} />
                            </div>

                            <h3 className="text-2xl font-black text-slate-900 text-center mb-2 tracking-tight">Final Verification</h3>
                            <p className="text-slate-500 text-sm text-center mb-8 font-medium italic">
                                Please enter the verification code provided by the customer to finalize this job.
                            </p>

                            <input
                                type="text"
                                value={otpInput}
                                onChange={(e) => setOtpInput(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                                placeholder="······"
                                className="w-full text-center text-4xl font-black tracking-[0.75rem] py-5 border-2 border-slate-100 bg-slate-50 rounded-2xl focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all mb-8 placeholder:text-slate-200"
                                autoFocus
                            />

                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={handleVerifyOtp}
                                    disabled={otpLoading || otpInput.length < 6}
                                    className="w-full py-4 bg-emerald-600 text-white font-black rounded-2xl hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {otpLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : "Complete Appointment"}
                                </button>
                                <button
                                    onClick={() => setOtpModalOpen(false)}
                                    className="w-full py-3 text-slate-400 font-bold hover:text-slate-600 rounded-xl transition-colors text-sm"
                                >
                                    Go Back
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default WorkerBookings;
