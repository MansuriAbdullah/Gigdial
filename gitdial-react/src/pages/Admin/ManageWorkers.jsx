import React, { useState } from 'react';
import { Search, Filter, MoreVertical, Shield, ShieldAlert, CheckCircle, XCircle, Briefcase, Clock, FileText } from 'lucide-react';

const initialWorkers = [
    { id: 1, name: 'Amit Singh', role: 'Worker', status: 'Pending', service: 'Plumbing', email: 'amit.singh@example.com', appliedDate: '2023-11-20', documents: 'Verified' },
    { id: 2, name: 'Rahul Kumar', role: 'Worker', status: 'Verified', service: 'Electrician', email: 'rahul.k@example.com', appliedDate: '2023-11-12', documents: 'Verified' },
    { id: 3, name: 'Sneha Gupta', role: 'Worker', status: 'Verified', service: 'Cleaning', email: 'sneha.g@example.com', appliedDate: '2023-11-22', documents: 'Verified' },
    { id: 4, name: 'Vikram Joshi', role: 'Worker', status: 'Pending', service: 'Carpenter', email: 'vikram.j@example.com', appliedDate: '2023-11-25', documents: 'Pending' },
    { id: 5, name: 'Pooja Verma', role: 'Worker', status: 'Rejected', service: 'Painting', email: 'pooja.v@example.com', appliedDate: '2023-11-18', documents: 'Failed' },
];

const ManageWorkers = () => {
    const [workers, setWorkers] = useState(initialWorkers);
    const [filter, setFilter] = useState('All');
    const [selectedWorker, setSelectedWorker] = useState(null);

    const handleAction = (id, action) => {
        setWorkers(workers.map(worker =>
            worker.id === id ? { ...worker, status: action === 'approve' ? 'Verified' : action === 'reject' ? 'Rejected' : action === 'ban' ? 'Banned' : 'Suspended' } : worker
        ));
        if (selectedWorker?.id === id) setSelectedWorker(null);
    };

    const filteredWorkers = filter === 'All' ? workers : workers.filter(w => w.status === filter);

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
                        {['All', 'Pending', 'Verified', 'Rejected', 'Banned'].map(status => (
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
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100">
                                <th className="px-6 py-4 font-semibold text-slate-600 text-sm">Worker</th>
                                <th className="px-6 py-4 font-semibold text-slate-600 text-sm">Service</th>
                                <th className="px-6 py-4 font-semibold text-slate-600 text-sm">Applied Date</th>
                                <th className="px-6 py-4 font-semibold text-slate-600 text-sm">Status</th>
                                <th className="px-6 py-4 font-semibold text-slate-600 text-sm">Documents</th>
                                <th className="px-6 py-4 font-semibold text-slate-600 text-sm text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredWorkers.map((worker) => (
                                <tr key={worker.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                                                {worker.name.charAt(0)}{worker.name.split(' ')[1]?.charAt(0)}
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
                                            {worker.service}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-500 text-sm">
                                        <div className="flex items-center gap-2">
                                            <Clock size={14} className="text-slate-400" />
                                            {worker.appliedDate}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${worker.status === 'Verified' ? 'bg-green-50 text-green-700 border-green-100' :
                                            worker.status === 'Pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-100' :
                                                'bg-red-50 text-red-700 border-red-100'
                                            }`}>
                                            {worker.status === 'Verified' && <CheckCircle size={12} />}
                                            {worker.status === 'Pending' && <Clock size={12} />}
                                            {(worker.status === 'Rejected' || worker.status === 'Banned') && <XCircle size={12} />}
                                            {worker.status}
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
                                        {worker.status === 'Pending' ? (
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => handleAction(worker.id, 'approve')}
                                                    className="p-1 px-3 bg-green-50 text-green-700 hover:bg-green-100 rounded-lg text-xs font-bold transition-colors border border-green-200 flex items-center gap-1"
                                                >
                                                    <CheckCircle size={14} /> Approve
                                                </button>
                                                <button
                                                    onClick={() => handleAction(worker.id, 'reject')}
                                                    className="p-1 px-3 bg-red-50 text-red-700 hover:bg-red-100 rounded-lg text-xs font-bold transition-colors border border-red-200 flex items-center gap-1"
                                                >
                                                    <XCircle size={14} /> Reject
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex justify-end gap-2">
                                                {worker.status !== 'Banned' && (
                                                    <button
                                                        onClick={() => handleAction(worker.id, 'ban')}
                                                        className="flex items-center gap-1 px-3 py-1.5 bg-slate-50 text-slate-600 hover:bg-red-50 hover:text-red-600 rounded-lg text-xs font-bold transition-colors border border-slate-200 hover:border-red-200"
                                                        title="Ban Worker"
                                                    >
                                                        <ShieldAlert size={14} /> Ban
                                                    </button>
                                                )}
                                                <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                                    <MoreVertical size={18} />
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Document Verification Modal */}
            {selectedWorker && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900">Verification Documents</h3>
                                <p className="text-slate-500 text-sm">Reviewing documents for {selectedWorker.name}</p>
                            </div>
                            <button onClick={() => setSelectedWorker(null)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                                <XCircle size={24} className="text-slate-400" />
                            </button>
                        </div>
                        <div className="p-6 grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <p className="font-bold text-slate-700 text-sm">Aadhaar Card (Front)</p>
                                <div className="aspect-video bg-slate-100 rounded-xl border-2 border-dashed border-slate-300 flex items-center justify-center relative group overflow-hidden">
                                    <img src="https://images.unsplash.com/photo-1563203369-26f2e4a5ccf7?auto=format&fit=crop&w=400&q=80" alt="Doc" className="w-full h-full object-cover" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <p className="font-bold text-slate-700 text-sm">Aadhaar Card (Back)</p>
                                <div className="aspect-video bg-slate-100 rounded-xl border-2 border-dashed border-slate-300 flex items-center justify-center relative group overflow-hidden">
                                    <img src="https://images.unsplash.com/photo-1563203369-26f2e4a5ccf7?auto=format&fit=crop&w=400&q=80" alt="Doc" className="w-full h-full object-cover grayscale" />
                                </div>
                            </div>
                        </div>
                        <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
                            <button
                                onClick={() => handleAction(selectedWorker.id, 'reject')}
                                className="px-6 py-2.5 bg-red-100 text-red-700 font-bold rounded-xl hover:bg-red-200 transition-colors"
                            >
                                Reject
                            </button>
                            <button
                                onClick={() => handleAction(selectedWorker.id, 'approve')}
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
