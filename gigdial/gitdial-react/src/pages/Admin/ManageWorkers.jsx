import React, { useState, useEffect } from 'react';
import { Search, Filter, MoreVertical, Shield, ShieldAlert, CheckCircle, XCircle, Briefcase, Clock, FileText, Loader, Eye, ExternalLink, ChevronDown, Check, X, Mail, MapPin, Award } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { getFullImagePath } from '../../utils/imagePath';

const ManageWorkers = () => {
    const [workers, setWorkers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
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
            let url = `/api/users/workers/${id}/${action}`;

            const response = await fetch(url, {
                method: 'PUT',
                headers: getAuthHeaders(),
                body: JSON.stringify({})
            });

            const data = await response.json();

            if (response.ok) {
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
        const status = w.kycStatus || 'pending';
        const matchesFilter = filter === 'All' ||
            (filter === 'Pending' && status === 'pending') ||
            (filter === 'Approved' && status === 'approved') ||
            (filter === 'Rejected' && status === 'rejected');

        const matchesSearch =
            w.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            w.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            w.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            w.category?.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesFilter && matchesSearch;
    });

    const getStatusBadgeColor = (status) => {
        switch (status) {
            case 'approved': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
            case 'pending': return 'bg-amber-50 text-amber-700 border-amber-100';
            case 'rejected': return 'bg-rose-50 text-rose-700 border-rose-100';
            default: return 'bg-slate-50 text-slate-500 border-slate-100';
        }
    };

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
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-1">
                <div className="space-y-2">
                    <h1 className="text-3xl md:text-4xl font-display font-bold text-slate-800 tracking-tight leading-none">
                        Worker Management
                    </h1>
                    <p className="text-slate-500 font-medium text-base md:text-lg">
                        Verify and manage {workers.length} professionals on your platform.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Admin Control Panel</span>
                </div>
            </div>

            {/* Content Card */}
            <div className="bg-white/90 backdrop-blur-xl rounded-[1.5rem] md:rounded-[2.5rem] border border-white/60 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-60"></div>

                <div className="p-4 md:p-8 space-y-6">
                    {/* Filters & Search */}
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 md:gap-6">
                        <div className="flex flex-wrap items-center gap-2 md:gap-4 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                            {['All', 'Pending', 'Approved', 'Rejected'].map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setFilter(status)}
                                    className={`px-4 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl text-xs md:text-sm font-bold transition-all whitespace-nowrap ${filter === status
                                        ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20'
                                        : 'bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-100'}`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>

                        <div className="relative group w-full lg:w-96">
                            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                <Search className="text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                            </div>
                            <input
                                type="text"
                                placeholder="Search by name, email or city..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 md:py-4 bg-slate-50 border border-slate-100 rounded-xl md:rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white focus:border-blue-500 transition-all font-medium text-slate-600 placeholder:text-slate-400"
                            />
                        </div>
                    </div>

                    {/* Table Area */}
                    <div className="overflow-x-auto -mx-4 md:mx-0">
                        <div className="inline-block min-w-full align-middle px-4 md:px-0">
                            <table className="min-w-full border-collapse">
                                <thead>
                                    <tr className="border-b border-slate-100">
                                        <th className="px-4 md:px-6 py-4 md:py-5 text-left text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-50/50 first:rounded-tl-2xl">Worker Details</th>
                                        <th className="px-4 md:px-6 py-4 md:py-5 text-left text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-50/50">Category & Exp</th>
                                        <th className="px-4 md:px-6 py-4 md:py-5 text-left text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-50/50">Status</th>
                                        <th className="px-4 md:px-6 py-4 md:py-5 text-center text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-50/50 last:rounded-tr-2xl">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    <AnimatePresence>
                                        {loading ? (
                                            <tr>
                                                <td colSpan="4" className="py-20 text-center">
                                                    <div className="flex flex-col items-center justify-center h-full gap-4 text-slate-400">
                                                        <Loader className="animate-spin text-blue-500" size={40} />
                                                        <p className="font-medium animate-pulse">Fetching workers...</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : filteredWorkers.length === 0 ? (
                                            <tr>
                                                <td colSpan="4" className="py-20 text-center">
                                                    <div className="flex flex-col items-center gap-4">
                                                        <div className="p-4 bg-slate-50 rounded-full">
                                                            <Search className="text-slate-300" size={40} />
                                                        </div>
                                                        <p className="text-slate-400 font-medium">No workers found matching your criteria</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : (
                                            filteredWorkers.map((worker, idx) => (
                                                <motion.tr
                                                    key={worker._id}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: idx * 0.05 }}
                                                    className="group hover:bg-slate-50/50 transition-colors"
                                                >
                                                    <td className="px-4 md:px-6 py-4 md:py-6">
                                                        <div className="flex items-center gap-3 md:gap-4">
                                                            <div className="relative flex-shrink-0">
                                                                <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center overflow-hidden shadow-inner">
                                                                    {worker.profileImage ? (
                                                                        <img src={getFullImagePath(worker.profileImage)} alt="" className="w-full h-full object-cover" />
                                                                    ) : (
                                                                        <span className="text-xl md:text-2xl font-bold text-slate-400">{worker.name.charAt(0)}</span>
                                                                    )}
                                                                </div>
                                                                <div className="absolute -bottom-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100">
                                                                    <div className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full ${worker.isOnline ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
                                                                </div>
                                                            </div>
                                                            <div className="min-w-0">
                                                                <div className="font-bold text-slate-900 text-sm md:text-base truncate group-hover:text-blue-600 transition-colors">
                                                                    {worker.name}
                                                                </div>
                                                                <div className="flex flex-col gap-0.5 mt-0.5 md:mt-1">
                                                                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                                                                        <Mail size={12} /> {worker.email}
                                                                    </div>
                                                                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                                                                        <MapPin size={12} /> {worker.city}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 md:px-6 py-4 md:py-6">
                                                        <div className="space-y-1 md:space-y-2">
                                                            <div className="inline-flex items-center gap-1.5 px-2 md:px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 text-[10px] md:text-xs font-bold border border-blue-100 whitespace-nowrap">
                                                                <Briefcase size={12} /> {worker.category}
                                                            </div>
                                                            <div className="flex items-center gap-1.5 text-[10px] md:text-xs text-slate-500 font-bold ml-1">
                                                                <Award size={12} className="text-amber-500" />
                                                                {worker.experience} Years Exp.
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 md:px-6 py-4 md:py-6">
                                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] md:text-xs font-bold border shadow-sm whitespace-nowrap ${getStatusBadgeColor(worker.kycStatus || 'pending')}`}>
                                                            {worker.kycStatus === 'pending' && <Clock size={12} />}
                                                            {worker.kycStatus === 'approved' && <CheckCircle size={12} />}
                                                            {worker.kycStatus === 'rejected' && <ShieldAlert size={12} />}
                                                            <span className="capitalize">{worker.kycStatus || 'pending'}</span>
                                                        </span>
                                                    </td>
                                                    <td className="px-4 md:px-6 py-4 md:py-6">
                                                        <div className="flex items-center justify-center gap-2 md:gap-3">
                                                            <button
                                                                onClick={() => setSelectedWorker(worker)}
                                                                className="flex items-center gap-2 px-3 md:px-4 py-2 md:py-2.5 rounded-xl bg-slate-900 text-white text-[10px] md:text-xs font-bold hover:bg-blue-600 hover:-translate-y-1 transition-all shadow-lg shadow-slate-900/10 hover:shadow-blue-500/20 whitespace-nowrap"
                                                            >
                                                                <Shield size={14} />
                                                                Verify
                                                            </button>
                                                        </div>
                                                    </td>
                                                </motion.tr>
                                            ))
                                        )}
                                    </AnimatePresence>
                                </tbody>
                            </table>
                        </div>
                    </div>
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
                            className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl w-full max-w-3xl overflow-hidden max-h-[90vh] flex flex-col"
                        >
                            {/* Modal Header */}
                            <div className="p-4 md:p-8 border-b border-slate-100 flex justify-between items-center bg-gradient-to-r from-slate-50 to-white">
                                <div className="flex items-center gap-3 md:gap-4 font-bold">
                                    <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 text-lg md:text-xl">
                                        {selectedWorker.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="text-xl md:text-2xl font-bold text-slate-900">{selectedWorker.name}</h3>
                                        <div className="flex items-center gap-2 mt-0.5 md:mt-1 font-medium">
                                            <StatusBadge status={selectedWorker.kycStatus} />
                                            <span className="text-slate-400 text-sm hidden sm:inline">•</span>
                                            <span className="text-slate-500 text-xs md:text-sm truncate max-w-[150px] md:max-w-none">{selectedWorker.email}</span>
                                        </div>
                                    </div>
                                </div>
                                <button onClick={() => setSelectedWorker(null)} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600">
                                    <XCircle size={24} md:size={32} />
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div className="p-4 md:p-8 overflow-y-auto custom-scrollbar bg-slate-50/50">
                                <h4 className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 md:mb-6">Submitted Documents</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 font-bold">
                                    <div className="space-y-2 md:space-y-3">
                                        <div className="flex justify-between items-center">
                                            <p className="text-slate-700 text-xs md:text-sm">Aadhaar Card</p>
                                            <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-50 text-blue-600 rounded-md">Front & Back</span>
                                        </div>
                                        <div className="aspect-[16/10] bg-white rounded-xl md:rounded-2xl border border-slate-200 shadow-sm flex items-center justify-center relative group overflow-hidden">
                                            {selectedWorker.aadhaarCard ? (
                                                <>
                                                    {selectedWorker.aadhaarCard.toLowerCase().endsWith('.pdf') ? (
                                                        <div className="flex flex-col items-center gap-2">
                                                            <FileText size={48} className="text-rose-500" />
                                                            <span className="text-xs font-bold text-slate-500">Aadhaar Card (PDF)</span>
                                                        </div>
                                                    ) : (
                                                        <img
                                                            src={getFullImagePath(selectedWorker.aadhaarCard)}
                                                            alt="Aadhaar"
                                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                        />
                                                    )}
                                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                        <a href={getFullImagePath(selectedWorker.aadhaarCard)} target="_blank" rel="noreferrer" className="bg-white text-slate-900 px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all">
                                                            <Eye size={14} /> {selectedWorker.aadhaarCard.toLowerCase().endsWith('.pdf') ? 'Open PDF' : 'View Full'}
                                                        </a>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="text-center p-4">
                                                    <div className="w-10 h-10 md:w-16 md:h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3 text-slate-300">
                                                        <FileText size={24} md:size={32} />
                                                    </div>
                                                    <span className="text-slate-400 text-xs md:text-sm font-medium">No Document Uploaded</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-2 md:space-y-3">
                                        <div className="flex justify-between items-center">
                                            <p className="text-slate-700 text-xs md:text-sm">PAN Card</p>
                                            <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-50 text-blue-600 rounded-md">Front Only</span>
                                        </div>
                                        <div className="aspect-[16/10] bg-white rounded-xl md:rounded-2xl border border-slate-200 shadow-sm flex items-center justify-center relative group overflow-hidden">
                                            {selectedWorker.panCard ? (
                                                <>
                                                    {selectedWorker.panCard.toLowerCase().endsWith('.pdf') ? (
                                                        <div className="flex flex-col items-center gap-2">
                                                            <FileText size={48} className="text-blue-500" />
                                                            <span className="text-xs font-bold text-slate-500">PAN Card (PDF)</span>
                                                        </div>
                                                    ) : (
                                                        <img
                                                            src={getFullImagePath(selectedWorker.panCard)}
                                                            alt="PAN"
                                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                        />
                                                    )}
                                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                        <a href={getFullImagePath(selectedWorker.panCard)} target="_blank" rel="noreferrer" className="bg-white text-slate-900 px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all">
                                                            <Eye size={14} /> {selectedWorker.panCard.toLowerCase().endsWith('.pdf') ? 'Open PDF' : 'View Full'}
                                                        </a>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="text-center p-4">
                                                    <div className="w-10 h-10 md:w-16 md:h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3 text-slate-300">
                                                        <FileText size={24} md:size={32} />
                                                    </div>
                                                    <span className="text-slate-400 text-xs md:text-sm font-medium">No Document Uploaded</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="p-4 md:p-6 border-t border-slate-100 bg-white flex flex-col sm:flex-row justify-end gap-3 md:gap-4 font-bold">
                                <button
                                    onClick={() => handleAction(selectedWorker._id, 'reject')}
                                    className="px-6 md:px-8 py-2.5 md:py-3 bg-rose-50 text-rose-600 font-bold rounded-xl hover:bg-rose-100 border border-rose-100 transition-colors flex items-center justify-center gap-2 text-sm"
                                >
                                    <XCircle size={18} />
                                    Reject
                                </button>
                                <button
                                    onClick={() => handleAction(selectedWorker._id, 'approve')}
                                    className="px-6 md:px-8 py-2.5 md:py-3 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600 shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 text-sm font-bold"
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
