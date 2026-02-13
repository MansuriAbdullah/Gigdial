import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, MapPin, DollarSign, Archive } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const ServiceApprovals = () => {
    const { user } = useAuth();
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('pending'); // pending, active, rejected

    useEffect(() => {
        const fetchGigs = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user?.token}`,
                    },
                };
                const { data } = await axios.get('/api/gigs/admin/all', config);
                setServices(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching gigs:", error);
                setLoading(false);
            }
        };
        fetchGigs();
    }, []);

    const handleAction = async (id, status) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user?.token}`,
                },
            };
            await axios.put(`/api/gigs/${id}/status`, { status }, config);

            // Updates local state
            setServices(services.map(s => s._id === id ? { ...s, status } : s));
            alert(`Service ${status} successfully`);
        } catch (error) {
            console.error(`Error updating gig status:`, error);
            alert("Failed to update status");
        }
    };

    const filteredServices = services.filter(s => {
        if (filter === 'all') return true;
        // If status is undefined (legacy data), treat as active? Or pending.
        const status = s.status || 'active';
        return status === filter;
    });

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Service Approvals</h1>
                    <p className="text-slate-500 mt-2">Review and approve new services posted by workers.</p>
                </div>
                <div className="flex bg-slate-100 p-1 rounded-xl">
                    {['pending', 'active', 'rejected', 'all'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-6 py-2 rounded-lg font-bold text-sm capitalize transition-all ${filter === f ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                    {loading ? (
                        <div className="col-span-full py-20 text-center text-slate-500">Loading services...</div>
                    ) : filteredServices.length > 0 ? (
                        filteredServices.map((service) => (
                            <motion.div
                                key={service._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                layout
                                className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden flex flex-col h-full"
                            >
                                <div className="relative h-48 overflow-hidden bg-slate-200">
                                    {service.image ? (
                                        <img src={service.image} alt={service.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-400">No Image</div>
                                    )}
                                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-700 shadow-sm">
                                        {service.category}
                                    </div>
                                    {service.status && (
                                        <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold shadow-sm ${service.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                            service.status === 'active' ? 'bg-green-100 text-green-700' :
                                                'bg-red-100 text-red-700'
                                            }`}>
                                            {service.status}
                                        </div>
                                    )}
                                </div>
                                <div className="p-5 flex-1 flex flex-col">
                                    <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight group-hover:text-blue-600 transition-colors">
                                        {service.title}
                                    </h3>
                                    <p className="text-slate-500 text-sm mb-4 line-clamp-2">{service.description}</p>

                                    <div className="flex items-center gap-4 text-xs font-medium text-slate-500 mb-6 mt-auto">
                                        <span className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded"><DollarSign size={12} /> ₹{service.price}</span>
                                        <span className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded"><Archive size={12} /> {service.deliveryTime} Days</span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100">
                                        <button
                                            onClick={() => handleAction(service._id, 'rejected')}
                                            disabled={service.status === 'rejected'}
                                            className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-red-100 text-red-600 hover:bg-red-50 font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <X size={18} /> Reject
                                        </button>
                                        <button
                                            onClick={() => handleAction(service._id, 'active')}
                                            disabled={service.status === 'active'}
                                            className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-green-600 text-white hover:bg-green-700 shadow-lg shadow-green-600/20 font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <Check size={18} /> Approve
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                            <h3 className="text-lg font-bold text-slate-900">No Services Found</h3>
                            <p className="text-slate-500">No services match the current filter.</p>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ServiceApprovals;
