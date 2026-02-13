import React, { useState, useEffect } from 'react';
import { Briefcase, MapPin, Clock, DollarSign, Star, Phone, Mail, Filter } from 'lucide-react';

const WorkerLeads = () => {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const fetchLeads = async () => {
        try {
            const response = await fetch('/api/orders/seller', {
                headers: {
                    'Authorization': `Bearer ${userInfo?.token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setLeads(Array.isArray(data) ? data : []);
            } else {
                setLeads([]);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching leads:', error);
            setLeads([]);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeads();
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
                alert(`Order ${status === 'in_progress' ? 'Accepted' : status}`);
                fetchLeads();
            } else {
                alert('Failed to update order status');
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const displayedLeads = leads.filter(lead => {
        if (filter === 'All') return lead.status !== 'completed' && lead.status !== 'cancelled';
        if (filter === 'New') return lead.status === 'pending';
        if (filter === 'Active') return lead.status === 'in_progress';
        return lead.status === filter.toLowerCase();
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Job Requests</h1>
                    <p className="text-slate-500">Manage your incoming job leads and opportunities</p>
                </div>
                <div className="flex bg-slate-100 rounded-lg p-1">
                    {['All', 'New', 'Active'].map(status => (
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
                <div className="text-center py-10">Loading job requests...</div>
            ) : displayedLeads.length === 0 ? (
                <div className="text-center py-12">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Briefcase className="text-slate-400" size={32} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">No new requests</h3>
                    <p className="text-slate-500">Wait for customers to book your services.</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {displayedLeads.map((lead) => (
                        <div key={lead._id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition-all">
                            <div className="flex flex-col lg:flex-row gap-6">
                                {/* Main Content */}
                                <div className="flex-1 space-y-4">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <h3 className="font-bold text-lg text-slate-900">{lead.gig?.title || 'Service Request'}</h3>
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${lead.status === 'pending' ? 'bg-yellow-50 text-yellow-700 border border-yellow-200' :
                                                    lead.status === 'in_progress' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                                                        'bg-green-50 text-green-700 border border-green-200'
                                                    }`}>
                                                    {lead.status.replace('_', ' ').toUpperCase()}
                                                </span>
                                            </div>
                                            <p className="text-slate-600 text-sm mb-3">
                                                Customer: {lead.user?.name}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <div className="flex items-center gap-2 text-slate-600">
                                            <MapPin size={16} className="text-slate-400" />
                                            <span className="text-sm font-medium">{lead.user?.city || 'Location not specified'}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-slate-600">
                                            <Clock size={16} className="text-slate-400" />
                                            <span className="text-sm font-medium">{new Date(lead.createdAt).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-green-600">
                                            <DollarSign size={16} />
                                            <span className="text-sm font-bold">₹{lead.totalAmount}</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-100">
                                        {lead.user?.phone && (
                                            <a href={`tel:${lead.user.phone}`} className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium">
                                                <Phone size={14} />
                                                {lead.user.phone}
                                            </a>
                                        )}
                                        {lead.user?.email && (
                                            <a href={`mailto:${lead.user.email}`} className="flex items-center gap-1 px-3 py-1.5 bg-slate-50 text-slate-700 rounded-lg hover:bg-slate-100 transition-colors text-sm font-medium">
                                                <Mail size={14} />
                                                {lead.user.email}
                                            </a>
                                        )}
                                    </div>
                                </div>

                                {/* Actions */}
                                {lead.status === 'pending' && (
                                    <div className="flex lg:flex-col gap-2 lg:w-40">
                                        <button
                                            onClick={() => updateStatus(lead._id, 'in_progress')}
                                            className="flex-1 lg:flex-none px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-bold text-sm whitespace-nowrap"
                                        >
                                            Accept
                                        </button>
                                        <button
                                            onClick={() => updateStatus(lead._id, 'cancelled')}
                                            className="flex-1 lg:flex-none px-4 py-2.5 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors font-bold text-sm whitespace-nowrap"
                                        >
                                            Decline
                                        </button>
                                    </div>
                                )}
                                {lead.status === 'in_progress' && (
                                    <div className="flex lg:flex-col gap-2 lg:w-40">
                                        <button
                                            onClick={() => updateStatus(lead._id, 'completed')}
                                            className="flex-1 lg:flex-none px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-bold text-sm whitespace-nowrap"
                                        >
                                            Mark Completed
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default WorkerLeads;
