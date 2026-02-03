import React, { useState, useEffect } from 'react';
import { Search, Filter, MoreVertical, Shield, ShieldAlert, CheckCircle, XCircle, Briefcase, Clock, FileText, Loader } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const ManageWorkers = () => {
    const [workers, setWorkers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');
    const [selectedWorker, setSelectedWorker] = useState(null);
    const { token } = useAuth(); // Assuming auth context provides token or use localStorage directly if simpler

    // Helper to get auth header if context is not fully wired for token access directly always
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

            // Ensure data is an array
            if (!Array.isArray(data)) {
                console.error('Expected array but got:', data);
                setWorkers([]);
                return;
            }

            // Filter only workers or applicants
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
            let url = `/api/admin/worker/${id}/${action}`; // approve or reject
            let body = {};

            if (action === 'ban') {
                // Implement ban logic later or mapping
                return;
            }

            console.log('Sending request to:', url);
            const response = await fetch(url, {
                method: 'PUT',
                headers: getAuthHeaders(),
                body: JSON.stringify(body)
            });

            const data = await response.json();
            console.log('Response:', data);

            if (response.ok) {
                alert(`Worker ${action}d successfully!`);
                // Refresh list
                fetchWorkers();
                if (selectedWorker?.id === id) setSelectedWorker(null);
            } else {
                alert(`Action failed: ${data.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error("Action error:", error);
            alert('Action failed: ' + error.message);
        }
    };

    const filteredWorkers = workers.filter(w => {
        if (filter === 'All') return true;
        if (filter === 'Pending') return w.kycStatus === 'pending';
        if (filter === 'Verified') return w.kycStatus === 'approved';
        if (filter === 'Rejected') return w.kycStatus === 'rejected';
        return true;
    });

    return (
        <div className="space-y-6 relative">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Manage Workers</h1>
                    <p className="text-slate-500">Approve registrations and manage worker profiles.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search workers..."
                            className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                        />
                    </div>

                    <div className="flex bg-slate-100 rounded-lg p-1">
                        {['All', 'Pending', 'Verified', 'Rejected'].map(status => (
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
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    {loading ? (
                        <div className="p-10 text-center text-slate-500">
                            <Loader className="animate-spin h-8 w-8 mx-auto mb-2 text-blue-600" />
                            Loading workers...
                        </div>
                    ) : (
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-100">
                                    <th className="px-6 py-4 font-semibold text-slate-600 text-sm">Worker</th>
                                    <th className="px-6 py-4 font-semibold text-slate-600 text-sm">Service</th>
                                    <th className="px-6 py-4 font-semibold text-slate-600 text-sm">Joined Date</th>
                                    <th className="px-6 py-4 font-semibold text-slate-600 text-sm">KYC Status</th>
                                    <th className="px-6 py-4 font-semibold text-slate-600 text-sm">Documents</th>
                                    <th className="px-6 py-4 font-semibold text-slate-600 text-sm text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredWorkers.map((worker) => (
                                    <tr key={worker._id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs overflow-hidden">
                                                    {worker.profileImage ? (
                                                        <img src={'http://localhost:5000/' + worker.profileImage.replace(/\\/g, '/')} alt="profile" className="w-full h-full object-cover" />
                                                    ) : (
                                                        worker.name.charAt(0)
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-slate-900">{worker.name}</div>
                                                    <div className="text-xs text-slate-500">{worker.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-slate-700 font-medium text-sm">
                                                <Briefcase size={14} className="text-slate-400" />
                                                {worker.skills?.[0] || 'General'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-500 text-sm">
                                            <div className="flex items-center gap-2">
                                                <Clock size={14} className="text-slate-400" />
                                                {new Date(worker.createdAt).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${worker.kycStatus === 'approved' ? 'bg-green-50 text-green-700 border-green-100' :
                                                worker.kycStatus === 'pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-100' :
                                                    'bg-red-50 text-red-700 border-red-100'
                                                }`}>
                                                {worker.kycStatus === 'approved' && <CheckCircle size={12} />}
                                                {worker.kycStatus === 'pending' && <Clock size={12} />}
                                                {worker.kycStatus === 'rejected' && <XCircle size={12} />}
                                                {worker.kycStatus}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => setSelectedWorker(worker)}
                                                className="flex items-center gap-2 text-sm text-blue-600 font-medium cursor-pointer hover:underline"
                                            >
                                                <FileText size={14} /> View Docs
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            {worker.kycStatus === 'pending' && (
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        onClick={() => handleAction(worker._id, 'approve')}
                                                        className="p-1 px-3 bg-green-50 text-green-700 hover:bg-green-100 rounded-lg text-xs font-bold transition-colors border border-green-200 flex items-center gap-1"
                                                    >
                                                        <CheckCircle size={14} /> Approve
                                                    </button>
                                                    <button
                                                        onClick={() => handleAction(worker._id, 'reject')}
                                                        className="p-1 px-3 bg-red-50 text-red-700 hover:bg-red-100 rounded-lg text-xs font-bold transition-colors border border-red-200 flex items-center gap-1"
                                                    >
                                                        <XCircle size={14} /> Reject
                                                    </button>
                                                </div>
                                            )}
                                            {worker.kycStatus === 'approved' && (
                                                <span className="text-green-600 text-sm font-bold flex items-center justify-end gap-1">
                                                    <CheckCircle size={14} /> Active
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* Document Verification Modal */}
            {selectedWorker && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50 sticky top-0 z-10">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900">Verification Documents</h3>
                                <p className="text-slate-500 text-sm">Reviewing documents for {selectedWorker.name}</p>
                            </div>
                            <button onClick={() => setSelectedWorker(null)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                                <XCircle size={24} className="text-slate-400" />
                            </button>
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <p className="font-bold text-slate-700 text-sm">Aadhaar Card</p>
                                <div className="aspect-video bg-slate-100 rounded-xl border-2 border-dashed border-slate-300 flex items-center justify-center relative group overflow-hidden">
                                    {selectedWorker.aadhaarCard ? (
                                        <img
                                            src={'http://localhost:5000/' + selectedWorker.aadhaarCard.replace(/\\/g, '/')}
                                            alt="Aadhaar"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-slate-400 text-sm">Not Uploaded</span>
                                    )}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <p className="font-bold text-slate-700 text-sm">PAN Card</p>
                                <div className="aspect-video bg-slate-100 rounded-xl border-2 border-dashed border-slate-300 flex items-center justify-center relative group overflow-hidden">
                                    {selectedWorker.panCard ? (
                                        <img
                                            src={'http://localhost:5000/' + selectedWorker.panCard.replace(/\\/g, '/')}
                                            alt="PAN"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-slate-400 text-sm">Not Uploaded</span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 sticky bottom-0 z-10">
                            <button
                                onClick={() => handleAction(selectedWorker._id, 'reject')}
                                className="px-6 py-2.5 bg-red-100 text-red-700 font-bold rounded-xl hover:bg-red-200 transition-colors"
                            >
                                Reject
                            </button>
                            <button
                                onClick={() => handleAction(selectedWorker._id, 'approve')}
                                className="px-6 py-2.5 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 shadow-lg shadow-green-600/20 transition-colors"
                            >
                                Verify & Approve
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default ManageWorkers;
