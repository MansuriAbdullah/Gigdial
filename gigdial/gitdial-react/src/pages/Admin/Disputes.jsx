import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, MessageSquare, ShieldCheck, MoreHorizontal, ChevronDown, Check, X } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const Disputes = () => {
    const { user } = useAuth();
    const [disputes, setDisputes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedId, setExpandedId] = useState(null);

    useEffect(() => {
        const fetchDisputes = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user?.token}`,
                    },
                };
                const { data } = await axios.get('/api/disputes', config);
                setDisputes(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching disputes:", error);
                setLoading(false);
            }
        };

        if (user?.token) {
            fetchDisputes();
        }
    }, [user]);

    const handleResolve = async (id, resolution) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user?.token}`,
                },
            };
            await axios.put(`/api/disputes/${id}`, { status: 'resolved', resolution }, config);

            setDisputes(disputes.map(d => d._id === id ? { ...d, status: 'resolved', resolution } : d));
            alert("Dispute marked as resolved");
        } catch (error) {
            console.error(error);
            alert("Failed to resolve dispute");
        }
    };

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <div className="space-y-8 relative">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Dispute Resolution</h1>
                    <p className="text-slate-500 mt-2">Manage and resolve user complaints and issues.</p>
                </div>
            </div>

            <div className="space-y-4">
                {loading ? (
                    <div className="text-center py-10">Loading disputes...</div>
                ) : disputes.length > 0 ? (
                    disputes.map((dispute, index) => (
                        <motion.div
                            key={dispute._id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${expandedId === dispute._id
                                ? 'border-blue-500 shadow-xl shadow-blue-500/10 ring-1 ring-blue-500'
                                : 'border-slate-100 hover:border-blue-200 hover:shadow-md'
                                }`}
                        >
                            {/* Header Row */}
                            <div
                                onClick={() => toggleExpand(dispute._id)}
                                className="p-6 flex items-center justify-between cursor-pointer"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 bg-red-100 text-red-600`}>
                                        <AlertCircle size={24} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3">
                                            <h3 className="font-bold text-slate-900 text-lg">{dispute.reason}</h3>
                                            <span className={`px-2 py-0.5 rounded text-xs font-bold capitalize ${dispute.status === 'open' ? 'bg-red-100 text-red-700' :
                                                    dispute.status === 'resolved' ? 'bg-green-100 text-green-700' :
                                                        'bg-slate-100 text-slate-700'
                                                }`}>
                                                {dispute.status}
                                            </span>
                                        </div>
                                        <p className="text-slate-500 text-sm mt-1">
                                            ID: <span className="font-mono text-slate-700">#{dispute._id.slice(-6)}</span> • {new Date(dispute.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-8">
                                    <div className={`p-2 rounded-full transition-transform duration-300 ${expandedId === dispute._id ? 'rotate-180 bg-slate-100' : ''}`}>
                                        <ChevronDown size={20} className="text-slate-400" />
                                    </div>
                                </div>
                            </div>

                            {/* Expanded Details */}
                            <motion.div
                                initial={false}
                                animate={{ height: expandedId === dispute._id ? 'auto' : 0 }}
                                className="overflow-hidden bg-slate-50/50"
                            >
                                <div className="p-6 border-t border-slate-100 grid md:grid-cols-2 gap-8">
                                    <div>
                                        <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                                            <ShieldCheck size={18} className="text-blue-500" /> Case Details
                                        </h4>
                                        <div className="space-y-3 text-sm">
                                            <div className="flex justify-between p-3 bg-white rounded-lg border border-slate-100">
                                                <span className="text-slate-500">Complainant</span>
                                                <span className="font-semibold text-slate-900">{dispute.complainant?.name || 'Unknown'} <span className="text-xs text-slate-400">({dispute.complainant?.email})</span></span>
                                            </div>
                                            {dispute.order && (
                                                <div className="flex justify-between p-3 bg-white rounded-lg border border-slate-100">
                                                    <span className="text-slate-500">Related Order</span>
                                                    <span className="font-semibold text-slate-900">{dispute.order?.title}</span>
                                                </div>
                                            )}
                                            <div className="p-4 bg-white rounded-lg border border-slate-100 mt-2">
                                                <span className="text-slate-500 block mb-2 text-xs uppercase tracking-wider font-bold">Description</span>
                                                <p className="text-slate-700 leading-relaxed">
                                                    {dispute.description}
                                                </p>
                                            </div>
                                            {dispute.resolution && (
                                                <div className="p-4 bg-green-50 rounded-lg border border-green-100 mt-2">
                                                    <span className="text-green-700 block mb-2 text-xs uppercase tracking-wider font-bold">Resolution</span>
                                                    <p className="text-green-800 leading-relaxed">
                                                        {dispute.resolution}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex flex-col h-full justify-between">
                                        {dispute.status === 'open' && (
                                            <div className="mt-8 pt-6 border-t border-slate-200 flex items-center gap-3">
                                                <button
                                                    onClick={() => handleResolve(dispute._id, "Refunded to Buyer")}
                                                    className="flex-1 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 shadow-lg shadow-green-600/20 transition-all"
                                                >
                                                    Resolve (Refund)
                                                </button>
                                                <button
                                                    onClick={() => handleResolve(dispute._id, "Closed in favor of Worker")}
                                                    className="flex-1 py-3 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-900 transition-all"
                                                >
                                                    Close Case
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))
                ) : (
                    <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed text-slate-500">
                        No active disputes.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Disputes;
