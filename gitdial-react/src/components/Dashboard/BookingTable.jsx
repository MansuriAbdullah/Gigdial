import React, { useState } from 'react';
import { Search, Filter, MoreHorizontal, Eye, CheckCircle, XCircle } from 'lucide-react';

const BookingTable = () => {
    const [statusFilter, setStatusFilter] = useState('All');

    const bookings = [
        { id: '#BK-001', client: 'Amit Singh', service: 'Plumbing Repair', date: '24 Jan, 2026', time: '10:00 AM', status: 'Pending', price: '₹450', avatar: 1 },
        { id: '#BK-002', client: 'Sarah Khan', service: 'House Cleaning', date: '23 Jan, 2026', time: '02:00 PM', status: 'Completed', price: '₹1200', avatar: 2 },
        { id: '#BK-003', client: 'Rajesh Kumar', service: 'AC Service', date: '22 Jan, 2026', time: '11:00 AM', status: 'Cancelled', price: '₹800', avatar: 3 },
        { id: '#BK-004', client: 'Priya Sharma', service: 'Web Development', date: '21 Jan, 2026', time: '09:00 AM', status: 'In Progress', price: '₹5000', avatar: 4 },
        { id: '#BK-005', client: 'Vikram Malhotra', service: 'Electrician', date: '20 Jan, 2026', time: '04:30 PM', status: 'Completed', price: '₹350', avatar: 5 },
    ];

    const filteredBookings = statusFilter === 'All' ? bookings : bookings.filter(b => b.status === statusFilter);

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h1 className="text-3xl font-display font-bold text-dark-surface">My Bookings</h1>
                <button className="btn-primary py-2 px-4 text-sm shadow-md">+ Add Booking</button>
            </div>

            {/* Filters Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                    {['All', 'Pending', 'In Progress', 'Completed', 'Cancelled'].map(status => (
                        <button
                            key={status}
                            onClick={() => setStatusFilter(status)}
                            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${statusFilter === status ? 'bg-dark-surface text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                        >
                            {status}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input type="text" placeholder="Search client or service..." className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                    </div>
                    <button className="p-2 bg-slate-50 border border-slate-100 rounded-lg text-slate-500 hover:text-dark-surface">
                        <Filter size={18} />
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100">
                                <th className="p-4 pl-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Booking ID</th>
                                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Client</th>
                                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Service</th>
                                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date & Time</th>
                                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Price</th>
                                <th className="p-4 pr-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filteredBookings.map((booking) => (
                                <tr key={booking.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="p-4 pl-6 font-semibold text-primary text-sm">{booking.id}</td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <img src={`https://i.pravatar.cc/150?img=${booking.avatar + 10}`} className="w-8 h-8 rounded-full" alt="Avatar" />
                                            <span className="font-semibold text-dark-surface text-sm">{booking.client}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-sm text-slate-600">{booking.service}</td>
                                    <td className="p-4">
                                        <div className="flex flex-col text-sm">
                                            <span className="font-semibold text-slate-700">{booking.date}</span>
                                            <span className="text-xs text-slate-500">{booking.time}</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${booking.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                                booking.status === 'Pending' ? 'bg-orange-100 text-orange-700' :
                                                    booking.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                                                        'bg-red-100 text-red-700'
                                            }`}>
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right font-bold text-dark-surface text-sm">{booking.price}</td>
                                    <td className="p-4 pr-6 text-center">
                                        <div className="flex justify-center gap-2">
                                            <button className="p-1.5 rounded-lg text-slate-400 hover:text-primary hover:bg-primary/5 transition-colors" title="View Details">
                                                <Eye size={18} />
                                            </button>
                                            {booking.status === 'Pending' && (
                                                <>
                                                    <button className="p-1.5 rounded-lg text-slate-400 hover:text-green-600 hover:bg-green-50 transition-colors" title="Accept">
                                                        <CheckCircle size={18} />
                                                    </button>
                                                    <button className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors" title="Decline">
                                                        <XCircle size={18} />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-4 border-t border-slate-100 flex justify-between items-center text-sm text-slate-500">
                    <span>Showing 1 to {filteredBookings.length} of {filteredBookings.length} results</span>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-50" disabled>Previous</button>
                        <button className="px-3 py-1 rounded-lg border border-slate-200 hover:bg-slate-50">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingTable;
