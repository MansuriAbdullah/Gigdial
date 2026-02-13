import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import {
    CheckCircle, XCircle, Clock, DollarSign,
    User, AlertCircle, CreditCard, Calendar
} from 'lucide-react';
import toast from 'react-hot-toast';

const ManageWithdrawals = () => {
    const { user } = useAuth();
    const [withdrawals, setWithdrawals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(null);

    const fetchWithdrawals = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.get('/api/withdrawals', config);
            setWithdrawals(data);
        } catch (error) {
            console.error('Error fetching withdrawals:', error);
            toast.error('Failed to load withdrawals');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWithdrawals();
    }, [user]);

    const handleAction = async (id, status, reason = '') => {
        if (!window.confirm(`Are you sure you want to ${status} this withdrawal?`)) return;

        setActionLoading(id);
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const payload = { status };
            if (status === 'rejected' && reason) {
                payload.rejectionReason = reason;
            } else if (status === 'rejected') {
                const inputReason = window.prompt("Enter rejection reason:");
                if (!inputReason) {
                    setActionLoading(null);
                    return;
                }
                payload.rejectionReason = inputReason;
            }

            await axios.put(`/api/withdrawals/${id}`, payload, config);
            toast.success(`Withdrawal ${status} successfully`);
            fetchWithdrawals();
        } catch (error) {
            console.error(`Error ${status} withdrawal:`, error);
            toast.error(error.response?.data?.message || `Failed to ${status} withdrawal`);
        } finally {
            setActionLoading(null);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'bg-green-100 text-green-700';
            case 'pending': return 'bg-yellow-100 text-yellow-700';
            case 'rejected': return 'bg-red-100 text-red-700';
            default: return 'bg-slate-100 text-slate-700';
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Manage Withdrawals</h1>
                    <p className="text-slate-500">Review and process worker payout requests</p>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500 font-semibold tracking-wider">
                                <th className="p-4">User</th>
                                <th className="p-4">Amount</th>
                                <th className="p-4">Date</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Bank Details</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {withdrawals.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="p-8 text-center text-slate-500">
                                        No withdrawal requests found
                                    </td>
                                </tr>
                            ) : (
                                withdrawals.map((withdrawal) => (
                                    <tr key={withdrawal._id} className="hover:bg-slate-50 transition-colors">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                                                    <User size={20} />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-900 text-sm">{withdrawal.user?.name || 'Unknown'}</p>
                                                    <p className="text-xs text-slate-500">{withdrawal.user?.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-1 font-bold text-slate-900">
                                                <DollarSign size={16} className="text-green-600" />
                                                ₹{withdrawal.amount}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                                <Calendar size={14} />
                                                {new Date(withdrawal.createdAt).toLocaleDateString()}
                                                <span className="text-xs text-slate-400">
                                                    {new Date(withdrawal.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${getStatusColor(withdrawal.status)}`}>
                                                {withdrawal.status}
                                            </span>
                                            {withdrawal.status === 'rejected' && withdrawal.rejectionReason && (
                                                <p className="text-xs text-red-500 mt-1 max-w-[200px] truncate" title={withdrawal.rejectionReason}>
                                                    Reason: {withdrawal.rejectionReason}
                                                </p>
                                            )}
                                        </td>
                                        <td className="p-4">
                                            <div className="text-xs text-slate-600 space-y-1">
                                                <div className="flex items-center gap-1">
                                                    <CreditCard size={12} className="text-slate-400" />
                                                    <span className="font-medium">Details:</span>
                                                    {withdrawal.user?.bankDetails ? 'Provided' : 'Not Provided'}
                                                </div>
                                                {/* In a real app, display actual bank details securely */}
                                            </div>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {withdrawal.status === 'pending' ? (
                                                    <>
                                                        <button
                                                            onClick={() => handleAction(withdrawal._id, 'approved')}
                                                            disabled={actionLoading === withdrawal._id}
                                                            className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors disabled:opacity-50"
                                                            title="Approve"
                                                        >
                                                            {actionLoading === withdrawal._id ? <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div> : <CheckCircle size={18} />}
                                                        </button>
                                                        <button
                                                            onClick={() => handleAction(withdrawal._id, 'rejected')}
                                                            disabled={actionLoading === withdrawal._id}
                                                            className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50"
                                                            title="Reject"
                                                        >
                                                            <XCircle size={18} />
                                                        </button>
                                                    </>
                                                ) : (
                                                    <span className="text-xs text-slate-400 font-medium">
                                                        Processed
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageWithdrawals;
