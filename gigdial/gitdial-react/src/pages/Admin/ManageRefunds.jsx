import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Check, X, Clock, User, Phone, Mail } from 'lucide-react';

const ManageRefunds = () => {
    const [refunds, setRefunds] = useState([]);
    const [loading, setLoading] = useState(true);
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const fetchRefunds = async () => {
        try {
            const response = await fetch('/api/subscriptions/refunds', {
                headers: {
                    'Authorization': `Bearer ${userInfo?.token}`
                }
            });
            const data = await response.json();
            if (response.ok) {
                setRefunds(data);
            } else {
                toast.error(data.message || 'Failed to fetch refunds');
            }
        } catch (error) {
            toast.error('Error fetching refunds');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRefunds();
    }, []);

    const handleUpdateStatus = async (userId, status) => {
        if (!window.confirm(`Are you sure you want to ${status} this refund?`)) return;

        try {
            const response = await fetch(`/api/subscriptions/refund/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userInfo?.token}`
                },
                body: JSON.stringify({ status })
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(`Refund ${status} successfully`);
                fetchRefunds();
            } else {
                toast.error(data.message || 'Update failed');
            }
        } catch (error) {
            toast.error('Something went wrong');
        }
    };

    if (loading) return <div className="flex justify-center p-12 text-slate-500">Loading refund requests...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Manage Subscription Refunds</h1>
                    <p className="text-slate-500">Review and process refund requests from workers</p>
                </div>
                <div className="bg-orange-100 text-orange-700 px-4 py-2 rounded-lg font-bold flex items-center gap-2">
                    <Clock size={18} />
                    {refunds.length} Pending Requests
                </div>
            </div>

            {refunds.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                    <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Check size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">All Caught Up!</h3>
                    <p className="text-slate-500">There are no pending refund requests at the moment.</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {refunds.map((request) => (
                        <div key={request._id} className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                                        <User size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 text-lg">{request.name}</h3>
                                        <span className="text-sm text-slate-500">Requested on: {new Date(request.subscription.refundRequestedAt).toLocaleString()}</span>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                                    <div className="flex items-center gap-1.5">
                                        <Mail size={16} />
                                        {request.email}
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Phone size={16} />
                                        {request.phone}
                                    </div>
                                </div>
                                <div className="inline-block bg-slate-100 text-slate-700 px-3 py-1 rounded-md text-xs font-bold uppercase">
                                    Plan: {request.subscription.plan} | Price: ₹499
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => handleUpdateStatus(request._id, 'rejected')}
                                    className="px-4 py-2 rounded-lg border-2 border-red-100 text-red-600 font-bold hover:bg-red-50 transition-colors flex items-center gap-2"
                                >
                                    <X size={18} />
                                    Reject
                                </button>
                                <button
                                    onClick={() => handleUpdateStatus(request._id, 'processed')}
                                    className="px-4 py-2 rounded-lg bg-green-600 text-white font-bold hover:bg-green-700 transition-colors shadow-lg shadow-green-100 flex items-center gap-2"
                                >
                                    <Check size={18} />
                                    Approve & Process
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="bg-blue-50 p-4 rounded-xl flex gap-3 items-start">
                <Clock className="text-blue-600 mt-1" size={18} />
                <p className="text-sm text-blue-800">
                    <strong>Admin Note:</strong> Before approving a refund, please verify that the worker has truly not received any leads for their current subscription period. Processing a refund will automatically deactivate their current subscription plan.
                </p>
            </div>
        </div>
    );
};

export default ManageRefunds;
