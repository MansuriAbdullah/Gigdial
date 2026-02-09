import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, User, Phone, CheckCircle, XCircle, AlertCircle, Filter } from 'lucide-react';

const WorkerBookings = () => {
    const [filter, setFilter] = useState('All');
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const fetchBookings = async () => {
        try {
            const response = await fetch('/api/orders/seller-orders', {
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
                alert(`Order updated to ${status}`);
                fetchBookings();
            } else {
                alert('Failed to update status');
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'in_progress': return 'bg-blue-50 text-blue-700 border-blue-200';
            case 'pending': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
            case 'completed': return 'bg-green-50 text-green-700 border-green-200';
            case 'cancelled': return 'bg-red-50 text-red-700 border-red-200';
            default: return 'bg-slate-50 text-slate-700 border-slate-200';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'in_progress': return <CheckCircle size={14} />;
            case 'pending': return <AlertCircle size={14} />;
            case 'completed': return <CheckCircle size={14} />;
            case 'cancelled': return <XCircle size={14} />;
            default: return null;
        }
    };

    const displayedBookings = bookings.filter(booking => {
        if (filter === 'All') return true;
        if (filter === 'Confirmed') return booking.status === 'in_progress';
        if (filter === 'Pending') return booking.status === 'pending';
        if (filter === 'Completed') return booking.status === 'completed';
        if (filter === 'Cancelled') return booking.status === 'cancelled';
        return booking.status === filter.toLowerCase();
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">My Bookings</h1>
                    <p className="text-slate-500">Manage your upcoming and past bookings</p>
                </div>
                <div className="flex bg-slate-100 rounded-lg p-1">
                    {['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled'].map(status => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${filter === status ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {loading ? (
                <div className="text-center py-10">Loading bookings...</div>
            ) : displayedBookings.length === 0 ? (
                <div className="text-center py-10 text-slate-500">No bookings found.</div>
            ) : (
                <div className="grid gap-4">
                    {displayedBookings.map((booking) => (
                        <div key={booking._id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition-all">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex-1 space-y-3">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="font-bold text-lg text-slate-900 mb-1">{booking.gig?.title || 'Service'}</h3>
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(booking.status)}`}>
                                                {getStatusIcon(booking.status)}
                                                {booking.status.replace('_', ' ').toUpperCase()}
                                            </span>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-slate-500">Amount</p>
                                            <p className="text-xl font-bold text-slate-900">₹{booking.totalAmount}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <div className="flex items-center gap-2 text-slate-600">
                                            <User size={16} className="text-slate-400" />
                                            <span className="text-sm font-medium">{booking.user?.name || 'Customer'}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-slate-600">
                                            <Phone size={16} className="text-slate-400" />
                                            <span className="text-sm font-medium">{booking.user?.phone || 'N/A'}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-slate-600">
                                            <Calendar size={16} className="text-slate-400" />
                                            <span className="text-sm font-medium">{new Date(booking.createdAt).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-slate-600 md:col-span-2">
                                            <MapPin size={16} className="text-slate-400" />
                                            <span className="text-sm font-medium">{booking.user?.city || 'Location N/A'}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex md:flex-col gap-2">
                                    {booking.status === 'pending' && (
                                        <>
                                            <button
                                                onClick={() => updateStatus(booking._id, 'in_progress')}
                                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-bold whitespace-nowrap"
                                            >
                                                Accept
                                            </button>
                                            <button
                                                onClick={() => updateStatus(booking._id, 'cancelled')}
                                                className="px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors text-sm font-bold whitespace-nowrap"
                                            >
                                                Decline
                                            </button>
                                        </>
                                    )}
                                    {booking.status === 'in_progress' && (
                                        <button
                                            onClick={() => updateStatus(booking._id, 'completed')}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-bold whitespace-nowrap"
                                        >
                                            Mark Complete
                                        </button>
                                    )}
                                    <button className="px-4 py-2 bg-slate-50 text-slate-700 rounded-lg hover:bg-slate-100 transition-colors text-sm font-bold whitespace-nowrap">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default WorkerBookings;
