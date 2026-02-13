import React, { useState, useEffect } from 'react';
import { Clock, Calendar, Star, Download, Filter, Search, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import html2canvas from 'html2canvas';
import RateModal from '../../../components/Dashboard/RateModal';
import InvoiceTemplate from '../../../components/Dashboard/InvoiceTemplate';

const ServiceHistory = () => {
    const [bookings, setBookings] = useState([]);
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isRateModalOpen, setIsRateModalOpen] = useState(false);
    const invoiceRef = useRef(null);

    const handleRateClick = (order) => {
        setSelectedOrder(order);
        setIsRateModalOpen(true);
    };

    const handleRateSubmit = async (orderId, rating, comment) => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const res = await fetch(`/api/orders/${orderId}/review`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userInfo.token}`
                },
                body: JSON.stringify({ rating, review: comment })
            });

            if (res.ok) {
                alert('Review submitted successfully!');
                setIsRateModalOpen(false);
                fetchServiceHistory(); // Refresh to show updated rating
            } else {
                const error = await res.json();
                alert(error.message);
            }
        } catch (err) {
            console.error(err);
            alert('Failed to submit review');
        }
    };

    const handleInvoiceClick = async (order) => {
        setSelectedOrder(order);
        // Wait for state update and render
        setTimeout(async () => {
            if (invoiceRef.current) {
                try {
                    const canvas = await html2canvas(invoiceRef.current, {
                        scale: 2,
                        backgroundColor: '#ffffff'
                    });
                    const imgData = canvas.toDataURL('image/png');
                    const link = document.createElement('a');
                    link.download = `Invoice-${order._id.slice(-6)}.png`;
                    link.href = imgData;
                    link.click();
                } catch (err) {
                    console.error('Invoice generation failed', err);
                    alert('Could not generate invoice');
                }
            }
        }, 100);
    };

    useEffect(() => {
        fetchServiceHistory();
    }, []);

    const fetchServiceHistory = async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const response = await fetch('/api/orders/myorders', {
                headers: {
                    'Authorization': `Bearer ${userInfo?.token}`
                }
            });
            const data = await response.json();
            setBookings(data);
        } catch (error) {
            console.error('Error fetching service history:', error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed':
                return <CheckCircle size={20} className="text-green-600" />;
            case 'cancelled':
                return <XCircle size={20} className="text-red-600" />;
            case 'active':
                return <Clock size={20} className="text-blue-600" />;
            default:
                return <AlertCircle size={20} className="text-yellow-600" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed':
                return 'bg-green-50 text-green-700 border-green-200';
            case 'cancelled':
                return 'bg-red-50 text-red-700 border-red-200';
            case 'active':
                return 'bg-blue-50 text-blue-700 border-blue-200';
            default:
                return 'bg-yellow-50 text-yellow-700 border-yellow-200';
        }
    };

    const filteredBookings = bookings.filter(booking => {
        const matchesFilter = filter === 'all' || booking.status === filter;
        const matchesSearch = booking.gig?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.seller?.name?.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Service History</h1>
                <p className="text-slate-500 mt-1">Track all your bookings and services</p>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search by service or worker name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex gap-2">
                    {['all', 'active', 'completed', 'cancelled'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`px-4 py-2 rounded-xl font-bold capitalize transition-colors ${filter === status
                                ? 'bg-slate-900 text-white'
                                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {/* Bookings List */}
            {filteredBookings.length > 0 ? (
                <div className="space-y-4">
                    {filteredBookings.map((booking) => (
                        <motion.div
                            key={booking._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all p-5"
                        >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex items-start gap-4 flex-1">
                                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-2xl font-bold text-blue-600">
                                        {booking.seller?.name?.charAt(0) || 'W'}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <h3 className="font-bold text-lg text-slate-900">{booking.gig?.title}</h3>
                                                <p className="text-sm text-slate-600">{booking.seller?.name}</p>
                                            </div>
                                            <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(booking.status)}`}>
                                                {getStatusIcon(booking.status)}
                                                {booking.status}
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                                            <span className="flex items-center gap-1">
                                                <Calendar size={14} />
                                                {new Date(booking.createdAt).toLocaleDateString('en-IN', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric'
                                                })}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock size={14} />
                                                {new Date(booking.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                            <span className="font-bold text-slate-900">₹{booking.price}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    {booking.status === 'completed' && !booking.isReviewed && (
                                        <button
                                            onClick={() => handleRateClick(booking)}
                                            className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-yellow-900 font-bold rounded-xl hover:bg-yellow-500 transition-colors"
                                        >
                                            <Star size={16} />
                                            Rate
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleInvoiceClick(booking)}
                                        className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors"
                                    >
                                        <Download size={16} />
                                        Invoice
                                    </button>
                                </div>
                            </div>

                            {booking.status === 'completed' && booking.isReviewed && (
                                <div className="mt-4 pt-4 border-t border-slate-100">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-sm font-medium text-slate-600">Your Rating:</span>
                                        <div className="flex gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={14}
                                                    className={i < booking.rating ? 'text-yellow-500 fill-yellow-500' : 'text-slate-300'}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    {booking.review && (
                                        <p className="text-sm text-slate-600 italic">"{booking.review}"</p>
                                    )}
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                    <Clock size={48} className="mx-auto text-slate-300 mb-3" />
                    <h3 className="text-xl font-bold text-slate-900 mb-2">No Service History</h3>
                    <p className="text-slate-500">Your booking history will appear here</p>
                </div>
            )}

            {/* Stats Summary */}
            {bookings.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                        <p className="text-sm text-blue-600 font-medium mb-1">Total Bookings</p>
                        <p className="text-2xl font-bold text-blue-900">{bookings.length}</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                        <p className="text-sm text-green-600 font-medium mb-1">Completed</p>
                        <p className="text-2xl font-bold text-green-900">
                            {bookings.filter(b => b.status === 'completed').length}
                        </p>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100">
                        <p className="text-sm text-yellow-600 font-medium mb-1">Active</p>
                        <p className="text-2xl font-bold text-yellow-900">
                            {bookings.filter(b => b.status === 'active').length}
                        </p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                        <p className="text-sm text-purple-600 font-medium mb-1">Total Spent</p>
                        <p className="text-2xl font-bold text-purple-900">
                            ₹{bookings.reduce((sum, b) => sum + (b.price || 0), 0)}
                        </p>
                    </div>
                </div>
            )}

            {/* Modals & Templates */}
            <RateModal
                isOpen={isRateModalOpen}
                onClose={() => setIsRateModalOpen(false)}
                onSubmit={handleRateSubmit}
                order={selectedOrder || {}}
            />

            <InvoiceTemplate order={selectedOrder} invoiceRef={invoiceRef} />
        </div>
    );
};

export default ServiceHistory;
