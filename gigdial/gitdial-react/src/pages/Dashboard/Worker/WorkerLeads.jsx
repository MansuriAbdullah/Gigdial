import React, { useState, useEffect } from 'react';
import { Briefcase, MapPin, Clock, DollarSign, Phone, Mail, User, Eye, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { getFullImagePath } from '../../../utils/imagePath';

const WorkerLeads = () => {
    const [leads, setLeads] = useState([]);
    const [visitorLeads, setVisitorLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');
    const [activeTab, setActiveTab] = useState('jobs'); // 'jobs' | 'visitors'
    const [subscriptionRequired, setSubscriptionRequired] = useState(false);
    const navigate = useNavigate();

    // OTP Completion States
    const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
    const [otp, setOtp] = useState('');
    const [completingOrderId, setCompletingOrderId] = useState(null);

    const handleCompleteOrder = async (orderId, skipConfirm = false) => {
        if (!skipConfirm && !window.confirm("Are you sure you want to mark this job as completed? This will verify via OTP from customer.")) return;

        try {
            const res = await fetch(`/api/orders/${orderId}/otp`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userInfo'))?.token}`
                }
            });
            if (res.ok) {
                setCompletingOrderId(orderId);
                setIsOtpModalOpen(true);
                alert('OTP sent to customer. Please ask them for the code.');
            } else {
                const error = await res.json();
                alert(`Failed to initiate completion: ${error.message}`);
            }
        } catch (err) {
            console.error(err);
            alert('Something went wrong');
        }
    };

    const verifyOtpAndComplete = async () => {
        if (!otp) return;
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        try {
            const res = await fetch(`/api/orders/${completingOrderId}/complete`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userInfo?.token}`
                },
                body: JSON.stringify({ otp })
            });

            if (res.ok) {
                alert('Order completed successfully!');
                setIsOtpModalOpen(false);
                setOtp('');
                setCompletingOrderId(null);
                fetchLeads(); // Refresh leads
            } else {
                const error = await res.json();
                alert(error.message);
            }
        } catch (err) {
            console.error(err);
            alert('Something went wrong');
        }
    };

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const fetchLeads = async () => {
        setLoading(true);
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
        } catch (error) {
            console.error('Error fetching leads:', error);
            setLeads([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchVisitorLeads = async () => {
        setLoading(true);
        setSubscriptionRequired(false);
        try {
            const response = await fetch('/api/leads/worker', {
                headers: {
                    'Authorization': `Bearer ${userInfo?.token}`
                }
            });
            const data = await response.json();

            if (response.ok) {
                setVisitorLeads(data);
            } else if (response.status === 403 && data.subscriptionRequired) {
                setSubscriptionRequired(true);
                setVisitorLeads([]);
            } else {
                setVisitorLeads([]);
            }
        } catch (error) {
            console.error('Error fetching visitor leads:', error);
            setVisitorLeads([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (activeTab === 'jobs') {
            fetchLeads();
        } else {
            fetchVisitorLeads();
        }
    }, [activeTab]);

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
        if (filter === 'Active') return lead.status === 'in-progress';
        return lead.status === filter.toLowerCase();
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Leads & Opportunities</h1>
                    <p className="text-slate-500">Manage job requests and see who visited your profile</p>
                </div>

                {activeTab === 'jobs' && (
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
                )}
            </div>

            {/* Tabs */}
            <div className="border-b border-slate-200">
                <div className="flex gap-8">
                    <button
                        onClick={() => setActiveTab('jobs')}
                        className={`pb-4 text-sm font-bold border-b-2 transition-all ${activeTab === 'jobs'
                            ? 'border-blue-600 text-blue-600'
                            : 'border-transparent text-slate-500 hover:text-slate-700'
                            }`}
                    >
                        <div className="flex items-center gap-2">
                            <Briefcase size={18} />
                            Job Requests
                        </div>
                    </button>
                    <button
                        onClick={() => setActiveTab('visitors')}
                        className={`pb-4 text-sm font-bold border-b-2 transition-all ${activeTab === 'visitors'
                            ? 'border-blue-600 text-blue-600'
                            : 'border-transparent text-slate-500 hover:text-slate-700'
                            }`}
                    >
                        <div className="flex items-center gap-2">
                            <Eye size={18} />
                            Profile Visitors
                        </div>
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-10">Loading...</div>
            ) : activeTab === 'jobs' ? (
                /* Job Requests Content */
                displayedLeads.length === 0 ? (
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
                                    <div className="flex-1 space-y-4">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <h3 className="font-bold text-lg text-slate-900">{lead.gig?.title || 'Service Request'}</h3>
                                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${lead.status === 'pending' ? 'bg-yellow-50 text-yellow-700 border border-yellow-200' :
                                                        lead.status === 'in-progress' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                                                            'bg-green-50 text-green-700 border border-green-200'
                                                        }`}>
                                                        {lead.status.replace('-', ' ').toUpperCase()}
                                                    </span>
                                                </div>
                                                <p className="text-slate-600 text-sm mb-3">
                                                    Customer: {lead.buyer?.name}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <div className="flex items-center gap-2 text-slate-600">
                                                <MapPin size={16} className="text-slate-400" />
                                                <span className="text-sm font-medium">{lead.buyer?.city || 'Location not specified'}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-slate-600">
                                                <Clock size={16} className="text-slate-400" />
                                                <span className="text-sm font-medium">{new Date(lead.createdAt).toLocaleDateString()}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-green-600">
                                                <DollarSign size={16} />
                                                <span className="text-sm font-bold">{lead.price > 0 ? `₹${lead.price}` : 'Price: Negotiable'}</span>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-100">
                                            {lead.buyer?.phone && (
                                                <a href={`tel:${lead.buyer.phone}`} className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium">
                                                    <Phone size={14} />
                                                    {lead.buyer.phone}
                                                </a>
                                            )}
                                            {lead.buyer?.email && (
                                                <a href={`mailto:${lead.buyer.email}`} className="flex items-center gap-1 px-3 py-1.5 bg-slate-50 text-slate-700 rounded-lg hover:bg-slate-100 transition-colors text-sm font-medium">
                                                    <Mail size={14} />
                                                    {lead.buyer.email}
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    {(lead.status === 'pending' || lead.status === 'requested') && (
                                        <div className="flex lg:flex-col gap-2 lg:w-40">
                                            <button
                                                onClick={() => navigate('/worker-dashboard/messages', { state: { user: lead.buyer } })}
                                                className="flex-1 lg:flex-none px-4 py-2.5 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors font-bold text-sm whitespace-nowrap flex items-center justify-center gap-2"
                                            >
                                                <Mail size={16} />
                                                Message
                                            </button>
                                            <button
                                                onClick={() => updateStatus(lead._id, 'in-progress')}
                                                className="flex-1 lg:flex-none px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-bold text-sm whitespace-nowrap"
                                            >
                                                {lead.status === 'requested' ? 'Approve' : 'Accept'}
                                            </button>
                                            <button
                                                onClick={() => updateStatus(lead._id, 'cancelled')}
                                                className="flex-1 lg:flex-none px-4 py-2.5 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors font-bold text-sm whitespace-nowrap"
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    )}
                                    {lead.status === 'in-progress' && (
                                        <div className="flex lg:flex-col gap-2 lg:w-40">
                                            <button
                                                onClick={() => handleCompleteOrder(lead._id)}
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
                )
            ) : (
                /* Profile Visitors Content */
                subscriptionRequired ? (
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-center text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-32 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                        <div className="relative z-10 max-w-lg mx-auto">
                            <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6">
                                <Lock className="text-blue-400" size={32} />
                            </div>
                            <h3 className="text-2xl font-bold mb-3">Unlock Premium Insights</h3>
                            <p className="text-slate-300 mb-8 leading-relaxed">
                                See exactly who is viewing your profile! Upgrade to a Premium Package to unlock user leads and grow your business faster.
                            </p>
                            <Link
                                to="/worker-dashboard/packages"
                                className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/30"
                            >
                                View Packages
                            </Link>
                        </div>
                    </div>
                ) : visitorLeads.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <User className="text-slate-400" size={32} />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">No profile visitors yet</h3>
                        <p className="text-slate-500">Share your profile to get more views!</p>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {visitorLeads.map((item) => (
                            <div key={item._id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex items-center gap-4 hover:shadow-md transition-all">
                                <div className="w-12 h-12 bg-slate-100 rounded-full overflow-hidden flex-shrink-0">
                                    {item.user?.profileImage ? (
                                        <img src={getFullImagePath(item.user.profileImage)} alt={item.user.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                                            <User size={20} />
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-slate-900">{item.user?.name || 'Guest User'}</h4>
                                    <p className="text-sm text-slate-500 flex items-center gap-2">
                                        <Clock size={12} />
                                        Viewed on {new Date(item.viewedAt).toLocaleDateString()} at {new Date(item.viewedAt).toLocaleTimeString()}
                                    </p>
                                </div>
                                {item.user && (
                                    <div className="flex gap-2">
                                        {item.user.phone && (
                                            <a href={`tel:${item.user.phone}`} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors" title="Call">
                                                <Phone size={18} />
                                            </a>
                                        )}
                                        {item.user.email && (
                                            <a href={`mailto:${item.user.email}`} className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors" title="Email">
                                                <Mail size={18} />
                                            </a>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )
            )}
            {/* OTP Modal */}
            {isOtpModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
                        <h2 className="text-xl font-bold mb-4 text-slate-900">Complete Order</h2>
                        <p className="text-slate-600 mb-6">An OTP has been sent to the customer. Please enter it below to complete the order.</p>
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="000000"
                            maxLength={6}
                            className="w-full px-4 py-4 rounded-xl border border-slate-200 mb-2 text-center text-3xl font-bold tracking-[1em] focus:outline-none focus:ring-4 focus:ring-blue-500/20 text-slate-800 placeholder:text-slate-200"
                        />
                        <div className="text-center mb-6">
                            <button
                                onClick={() => handleCompleteOrder(completingOrderId, true)}
                                className="text-blue-600 text-sm font-medium hover:underline"
                            >
                                Resend OTP
                            </button>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setIsOtpModalOpen(false)}
                                className="flex-1 py-3 rounded-xl font-bold text-slate-600 hover:bg-slate-50 border border-slate-200 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={verifyOtpAndComplete}
                                className="flex-1 py-3 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-blue-600/30"
                                disabled={otp.length !== 6}
                            >
                                Verify & Complete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WorkerLeads;
