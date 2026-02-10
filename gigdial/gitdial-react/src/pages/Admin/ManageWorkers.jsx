import React, { useState, useEffect } from 'react';
import { Search, Filter, MoreVertical, Shield, ShieldAlert, CheckCircle, XCircle, Briefcase, Clock, FileText, Loader, Eye, ExternalLink, ChevronDown, Check, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const ManageWorkers = () => {
    const [workers, setWorkers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');
    const [selectedWorker, setSelectedWorker] = useState(null);
    const { token } = useAuth();

    const getAuthHeaders = () => {
        const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userInfo?.token}`
        };
    };

    const fetchWorkers = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/users', {
                headers: getAuthHeaders()
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (!Array.isArray(data)) {
                console.error('Expected array but got:', data);
                setWorkers([]);
                return;
            }

            // Filter only workers or providers or pending applicants
            // Also treat undefined role as potential worker if isProvider is true
            const workerList = data.filter(u =>
                u.role === 'worker' ||
                u.isProvider === true ||
                u.kycStatus === 'pending'
            );

            setWorkers(workerList);
        } catch (error) {
            console.error("Failed to fetch workers:", error);
            setWorkers([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWorkers();
    }, []);

    const handleAction = async (id, action) => {
        try {
            // Updated endpoint to match backend route
            let url = `/api/users/workers/${id}/${action}`;

            const response = await fetch(url, {
                method: 'PUT',
                headers: getAuthHeaders(),
                body: JSON.stringify({})
            });

            const data = await response.json();

            if (response.ok) {
                // Show success feedback briefly (optional toast here)
                // Refresh list
                fetchWorkers();
                if (selectedWorker?._id === id) setSelectedWorker(null);
            } else {
                alert(`Action failed: ${data.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error("Action error:", error);
            alert('Action failed: ' + error.message);
        }
    };

    const filteredWorkers = workers.filter(w => {
        // Default undefined kycStatus to 'pending'
        const status = w.kycStatus || 'pending';

        if (filter === 'All') return true;
        if (filter === 'Pending') return status === 'pending';
        if (filter === 'Approved') return status === 'approved'; // Renamed 'Verified' to 'Approved' for clarity
        if (filter === 'Rejected') return status === 'rejected';
        return true;
    });

    // Helper to render status badge
    const StatusBadge = ({ status }) => {
        const s = status || 'pending';
        const styles = {
            approved: 'bg-emerald-100 text-emerald-700 border-emerald-200',
            pending: 'bg-amber-100 text-amber-700 border-amber-200',
            rejected: 'bg-rose-100 text-rose-700 border-rose-200'
        };
        const icons = {
            approved: <CheckCircle size={14} className="mt-0.5" />,
            pending: <Clock size={14} className="mt-0.5" />,
            rejected: <XCircle size={14} className="mt-0.5" />
        };

        return (
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${styles[s] || styles.pending} shadow-sm transition-all duration-300 hover:scale-105`}>
                {icons[s] || icons.pending}
                {s.charAt(0).toUpperCase() + s.slice(1)}
            </span>
        );
    };

    return (
        <div className="space-y-8 relative font-inter">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-display font-bold text-slate-800 tracking-tight">Worker Management</h1>
                    <p className="text-slate-500 mt-1 text-lg">Oversee worker verification and approvals.</p>
                </div>

                {/* Filters & Search */}
                <div className="flex flex-wrap items-center gap-4">
                    <div className="relative group">
                        <div className="absolute inset-0 bg-blue-100 rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
                        <div className="relative bg-white rounded-xl shadow-sm border border-slate-200 flex items-center px-4 py-2.5 w-64 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
                            <Search className="text-slate-400 mr-3" size={18} />
                            <input
                                type="text"
                                placeholder="Search by name or email..."
                                className="bg-transparent border-none outline-none text-slate-700 font-medium placeholder:text-slate-400 w-full"
                            />
                        </div>
                    </div>

                    <div className="flex bg-white rounded-xl p-1.5 border border-slate-200 shadow-sm">
                        {['All', 'Pending', 'Approved', 'Rejected'].map(status => (
                            <button
                                key={status}
                                onClick={() => setFilter(status)}
                                className={`px-4 py-2 text-sm font-bold rounded-lg transition-all duration-300 ${filter === status
                                        ? 'bg-slate-800 text-white shadow-md transform scale-105'
                                        : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
                                    }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Table Card */}
            <div className="bg-white/90 backdrop-blur-xl rounded-[2rem] border border-white/60 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-80"></div>

                <div className="overflow-x-auto min-h-[400px]">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center h-96 gap-4 text-slate-400">
                            <Loader className="animate-spin text-blue-500" size={40} />
                            <p className="font-medium animate-pulse">Fetching workers...</p>
                        </div>
                    ) : filteredWorkers.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-96 gap-4 text-slate-400">
                            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-2">
                                <Briefcase size={32} opacity={0.5} />
                            </div>
                            <p className="font-medium text-lg">No workers found matching your criteria.</p>
                        </div>
                    ) : (
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-100 bg-slate-50/50">
                                    <th className="px-8 py-5 font-bold text-slate-600 text-sm uppercase tracking-wider">Professional</th>
                                    <th className="px-6 py-5 font-bold text-slate-600 text-sm uppercase tracking-wider">Expertise</th>
                                    <th className="px-6 py-5 font-bold text-slate-600 text-sm uppercase tracking-wider">Joined</th>
                                    <th className="px-6 py-5 font-bold text-slate-600 text-sm uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-5 font-bold text-slate-600 text-sm uppercase tracking-wider">Documents</th>
                                    <th className="px-8 py-5 font-bold text-slate-600 text-sm uppercase tracking-wider text-right">Approvals</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                <AnimatePresence>
                                    {filteredWorkers.map((worker, index) => (
                                        <motion.tr
                                            key={worker._id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="hover:bg-blue-50/30 transition-colors group"
                                        >
                                            <td className="px-8 py-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="relative">
                                                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/20 overflow-hidden">
                                                            {worker.profileImage ? (
                                                                <img src={'http://localhost:5000/' + worker.profileImage.replace(/\\/g, '/')} alt="profile" className="w-full h-full object-cover" />
                                                            ) : (
                                                                worker.name.charAt(0)
                                                            )}
                                                        </div>
                                                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-slate-900 text-base">{worker.name}</div>
                                                        <div className="text-sm text-slate-500 font-medium">{worker.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-lg text-sm font-bold flex items-center gap-2 border border-slate-200">
                                                        <Briefcase size={14} className="text-slate-400" />
                                                        {worker.skills?.[0] || 'General'}
                                                    </span>
                                                    {worker.skills?.length > 1 && (
                                                        <span className="bg-slate-100 text-slate-500 px-2 py-1 rounded-lg text-xs font-bold border border-slate-200">
                                                            +{worker.skills.length - 1}
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 text-slate-600 text-sm font-medium">
                                                    <Clock size={16} className="text-slate-400" />
                                                    {new Date(worker.createdAt).toLocaleDateString(undefined, {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric'
                                                    })}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <StatusBadge status={worker.kycStatus} />
                                            </td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => setSelectedWorker(worker)}
                                                    className="group/btn flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-200 px-4 py-2 rounded-xl shadow-sm hover:shadow-md"
                                                >
                                                    <FileText size={16} className="text-slate-400 group-hover/btn:text-blue-500 transition-colors" />
                                                    View Docs
                                                </button>
                                            </td>
                                            <td className="px-8 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    {/* Approve Button */}
                                                    <button
                                                        onClick={() => handleAction(worker._id, 'approve')}
                                                        className={`p-2 rounded-xl transition-all duration-300 flex items-center gap-2 text-xs font-bold shadow-sm ${worker.kycStatus === 'approved'
                                                                ? 'bg-slate-100 text-slate-400 cursor-not-allowed opacity-50'
                                                                : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-200 hover:shadow-emerald-500/20 hover:shadow-lg hover:-translate-y-0.5'
                                                            }`}
                                                        disabled={worker.kycStatus === 'approved'}
                                                        title="Approve Worker"
                                                    >
                                                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${worker.kycStatus === 'approved' ? 'bg-slate-200' : 'bg-emerald-200 text-emerald-700'}`}>
                                                            <Check size={14} strokeWidth={3} />
                                                        </div>
                                                        <span className="pr-1">{worker.kycStatus === 'approved' ? 'Approved' : 'Approve'}</span>
                                                    </button>

                                                    {/* Reject Button */}
                                                    <button
                                                        onClick={() => handleAction(worker._id, 'reject')}
                                                        className={`p-2 rounded-xl transition-all duration-300 flex items-center gap-2 text-xs font-bold shadow-sm ${worker.kycStatus === 'rejected'
                                                                ? 'bg-slate-100 text-slate-400 cursor-not-allowed opacity-50'
                                                                : 'bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 hover:shadow-rose-500/20 hover:shadow-lg hover:-translate-y-0.5'
                                                            }`}
                                                        disabled={worker.kycStatus === 'rejected'}
                                                        title="Reject Worker"
                                                    >
                                                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${worker.kycStatus === 'rejected' ? 'bg-slate-200' : 'bg-rose-200 text-rose-700'}`}>
                                                            <X size={14} strokeWidth={3} />
                                                        </div>
                                                        <span className="pr-1">{worker.kycStatus === 'rejected' ? 'Rejected' : 'Reject'}</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* Document Verification Modal */}
            <AnimatePresence>
                {selectedWorker && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-white rounded-[2rem] shadow-2xl w-full max-w-3xl overflow-hidden max-h-[90vh] flex flex-col"
                        >
                            {/* Modal Header */}
                            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-gradient-to-r from-slate-50 to-white">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                                        {selectedWorker.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-slate-900">{selectedWorker.name}</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <StatusBadge status={selectedWorker.kycStatus} />
                                            <span className="text-slate-400 text-sm">•</span>
                                            <span className="text-slate-500 text-sm">{selectedWorker.email}</span>
                                        </div>
                                    </div>
                                </div>
                                <button onClick={() => setSelectedWorker(null)} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600">
                                    <XCircle size={32} />
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div className="p-8 overflow-y-auto custom-scrollbar bg-slate-50/50">
                                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Submitted Documents</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <p className="font-bold text-slate-700">Aadhaar Card</p>
                                            <span className="text-xs font-bold px-2 py-1 bg-blue-50 text-blue-600 rounded-md">Front & Back</span>
                                        </div>
                                        <div className="aspect-[16/10] bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center justify-center relative group overflow-hidden">
                                            {selectedWorker.aadhaarCard ? (
                                                <>
                                                    <img
                                                        src={'http://localhost:5000/' + selectedWorker.aadhaarCard.replace(/\\/g, '/')}
                                                        alt="Aadhaar"
                                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                    />
                                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                        <a href={'http://localhost:5000/' + selectedWorker.aadhaarCard.replace(/\\/g, '/')} target="_blank" rel="noreferrer" className="bg-white text-slate-900 px-4 py-2 rounded-lg font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all">
                                                            <Eye size={16} /> View Full
                                                        </a>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="text-center p-6">
                                                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-300">
                                                        <FileText size={32} />
                                                    </div>
                                                    <span className="text-slate-400 font-medium">No Document Uploaded</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <p className="font-bold text-slate-700">PAN Card</p>
                                            <span className="text-xs font-bold px-2 py-1 bg-blue-50 text-blue-600 rounded-md">Front Only</span>
                                        </div>
                                        <div className="aspect-[16/10] bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center justify-center relative group overflow-hidden">
                                            {selectedWorker.panCard ? (
                                                <>
                                                    <img
                                                        src={'http://localhost:5000/' + selectedWorker.panCard.replace(/\\/g, '/')}
                                                        alt="PAN"
                                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                    />
                                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                        <a href={'http://localhost:5000/' + selectedWorker.panCard.replace(/\\/g, '/')} target="_blank" rel="noreferrer" className="bg-white text-slate-900 px-4 py-2 rounded-lg font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all">
                                                            <Eye size={16} /> View Full
                                                        </a>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="text-center p-6">
                                                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-300">
                                                        <FileText size={32} />
                                                    </div>
                                                    <span className="text-slate-400 font-medium">No Document Uploaded</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="p-6 border-t border-slate-100 bg-white flex justify-end gap-4">
                                <button
                                    onClick={() => handleAction(selectedWorker._id, 'reject')}
                                    className="px-8 py-3 bg-rose-50 text-rose-600 font-bold rounded-xl hover:bg-rose-100 border border-rose-100 transition-colors flex items-center gap-2"
                                >
                                    <XCircle size={18} />
                                    Reject Application
                                </button>
                                <button
                                    onClick={() => handleAction(selectedWorker._id, 'approve')}
                                    className="px-8 py-3 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all flex items-center gap-2"
                                >
                                    <CheckCircle size={18} />
                                    Approve & Verify
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ManageWorkers;
