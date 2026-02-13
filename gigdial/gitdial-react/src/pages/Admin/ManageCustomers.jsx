import React, { useState, useEffect } from 'react';
import { Search, Filter, MoreVertical, Shield, ShieldAlert, CheckCircle, XCircle, Loader, Mail, Calendar } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const ManageCustomers = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');
    const { user } = useAuth();

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await fetch('/api/users', {
                    headers: {
                        Authorization: `Bearer ${user?.token}`,
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();

                if (Array.isArray(data)) {
                    // Filter only customers (users who are NOT workers and NOT admins)
                    const customerList = data.filter(u => u.role === 'customer' || (!u.role && !u.isProvider));
                    setCustomers(customerList);
                }
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch customers:", error);
                setLoading(false);
            }
        };

        if (user?.token) {
            fetchCustomers();
        }
    }, [user]);

    const filteredCustomers = customers.filter(c => {
        if (filter === 'All') return true;
        return true;
    });

    return (
        <div className="space-y-8 font-inter">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-display font-bold text-slate-800 tracking-tight">Customer Management</h1>
                    <p className="text-slate-500 mt-1 text-lg">View and manage {customers.length} registered customers.</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative group">
                        <div className="absolute inset-0 bg-blue-100 rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
                        <div className="relative bg-white rounded-xl shadow-sm border border-slate-200 flex items-center px-4 py-2.5 w-64 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
                            <Search className="text-slate-400 mr-3" size={18} />
                            <input
                                type="text"
                                placeholder="Search customers..."
                                className="bg-transparent border-none outline-none text-slate-700 font-medium placeholder:text-slate-400 w-full"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Table Card */}
            <div className="bg-white/90 backdrop-blur-xl rounded-[2rem] border border-white/60 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-blue-500 opacity-80"></div>

                <div className="overflow-x-auto min-h-[400px]">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center h-96 gap-4 text-slate-400">
                            <Loader className="animate-spin text-blue-500" size={40} />
                            <p className="font-medium animate-pulse">Loading customers...</p>
                        </div>
                    ) : (
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-100 bg-slate-50/50">
                                    <th className="px-8 py-5 font-bold text-slate-600 text-sm uppercase tracking-wider">Customer Details</th>
                                    <th className="px-6 py-5 font-bold text-slate-600 text-sm uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-5 font-bold text-slate-600 text-sm uppercase tracking-wider">Joined Date</th>
                                    <th className="px-8 py-5 font-bold text-slate-600 text-sm uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                <AnimatePresence>
                                    {filteredCustomers.length > 0 ? (
                                        filteredCustomers.map((user, index) => (
                                            <motion.tr
                                                key={user._id}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                                className="hover:bg-blue-50/30 transition-colors group"
                                            >
                                                <td className="px-8 py-4">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-500 font-bold text-lg shadow-inner">
                                                            {user.name.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <div className="font-bold text-slate-900 text-base">{user.name}</div>
                                                            <div className="text-sm text-slate-500 font-medium flex items-center gap-1">
                                                                <Mail size={12} /> {user.email}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 border border-emerald-200 shadow-sm">
                                                        <CheckCircle size={14} className="mt-0.5" /> Active
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2 text-slate-600 text-sm font-medium">
                                                        <Calendar size={16} className="text-slate-400" />
                                                        {new Date(user.createdAt).toLocaleDateString()}
                                                    </div>
                                                </td>
                                                <td className="px-8 py-4 text-right">
                                                    <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                                        <MoreVertical size={18} />
                                                    </button>
                                                </td>
                                            </motion.tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="text-center py-10 text-slate-500">No customers found. All users are currently workers or admins.</td>
                                        </tr>
                                    )}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ManageCustomers;
