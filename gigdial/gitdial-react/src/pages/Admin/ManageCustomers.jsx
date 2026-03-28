import React, { useState, useEffect } from 'react';
import { Search, Filter, MoreVertical, Shield, ShieldAlert, CheckCircle, XCircle, Loader, Mail, Calendar, Phone, MapPin } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const ManageCustomers = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeDropdown, setActiveDropdown] = useState(null);
    const { user } = useAuth();

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

    useEffect(() => {
        if (user?.token) {
            fetchCustomers();
        }
    }, [user]);

    const handleBlockToggle = async (id) => {
        try {
            const response = await fetch(`/api/users/${id}/block`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${user?.token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                fetchCustomers();
                setActiveDropdown(null);
            }
        } catch (error) {
            console.error("Error toggling block:", error);
        }
    };

    const filteredCustomers = customers.filter(c => {
        const matchesSearch =
            c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.email?.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesSearch;
    });

    return (
        <div className="space-y-8 font-inter">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-1">
                <div>
                    <h1 className="text-3xl md:text-4xl font-display font-bold text-slate-800 tracking-tight">Customer Management</h1>
                    <p className="text-slate-500 mt-1 text-base md:text-lg font-medium">View and manage {customers.length} registered customers.</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative group w-full md:w-64">
                        <div className="absolute inset-x-0 bottom-0 top-0 bg-blue-100 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity"></div>
                        <div className="relative bg-white rounded-xl shadow-sm border border-slate-200 flex items-center px-4 py-2.5 w-full focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all font-bold">
                            <Search className="text-slate-400 mr-3" size={18} />
                            <input
                                type="text"
                                placeholder="Search customers..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="bg-transparent border-none outline-none text-slate-700 font-bold placeholder:text-slate-400 w-full text-sm"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Table Card */}
            <div className="bg-white/90 backdrop-blur-xl rounded-[1.5rem] md:rounded-[2rem] border border-white/60 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-blue-500 opacity-80"></div>

                <div className="overflow-x-auto min-h-[400px]">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center h-96 gap-4 text-slate-400">
                            <Loader className="animate-spin text-blue-500" size={40} />
                            <p className="font-medium animate-pulse">Loading customers...</p>
                        </div>
                    ) : (
                        <div className="inline-block min-w-full align-middle">
                            <table className="min-w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-slate-100 bg-slate-50/50">
                                        <th className="px-6 md:px-8 py-5 font-bold text-slate-600 text-[10px] md:text-sm uppercase tracking-wider">Customer Details</th>
                                        <th className="px-4 md:px-6 py-5 font-bold text-slate-600 text-[10px] md:text-sm uppercase tracking-wider">Contact & City</th>
                                        <th className="px-4 md:px-6 py-5 font-bold text-slate-600 text-[10px] md:text-sm uppercase tracking-wider">Status</th>
                                        <th className="px-4 md:px-6 py-5 font-bold text-slate-600 text-[10px] md:text-sm uppercase tracking-wider">Joined Date</th>
                                        <th className="px-6 md:px-8 py-5 font-bold text-slate-600 text-[10px] md:text-sm uppercase tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    <AnimatePresence>
                                        {filteredCustomers.length > 0 ? (
                                            filteredCustomers.map((customer, index) => (
                                                <motion.tr
                                                    key={customer._id}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: index * 0.05 }}
                                                    className="hover:bg-blue-50/30 transition-colors group"
                                                >
                                                    <td className="px-6 md:px-8 py-4">
                                                        <div className="flex items-center gap-3 md:gap-4 font-bold">
                                                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-500 font-bold text-base md:text-lg shadow-inner">
                                                                {customer.name?.charAt(0) || 'C'}
                                                            </div>
                                                            <div className="min-w-0">
                                                                <div className="font-bold text-slate-900 text-sm md:text-base truncate">{customer.name}</div>
                                                                <div className="text-[10px] md:text-sm text-slate-500 font-medium flex items-center gap-1 truncate max-w-[150px] md:max-w-none">
                                                                    <Mail size={12} /> {customer.email}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 md:px-6 py-4">
                                                        <div className="flex flex-col gap-1">
                                                            <div className="flex items-center gap-1.5 text-[10px] md:text-xs font-bold text-slate-700">
                                                                <Phone size={12} className="text-blue-500" />
                                                                {customer.phone || 'N/A'}
                                                            </div>
                                                            <div className="flex items-center gap-1.5 text-[10px] md:text-xs font-bold text-slate-500">
                                                                <MapPin size={12} className="text-emerald-500" />
                                                                {customer.city || 'N/A'}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 md:px-6 py-4" onMouseLeave={() => setActiveDropdown(null)}>
                                                        {customer.isBlocked ? (
                                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] md:text-xs font-bold bg-red-100 text-red-700 border border-red-200 shadow-sm whitespace-nowrap">
                                                                <XCircle size={14} className="mt-0.5" /> Blocked
                                                            </span>
                                                        ) : (
                                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] md:text-xs font-bold bg-emerald-100 text-emerald-700 border border-emerald-200 shadow-sm whitespace-nowrap">
                                                                <CheckCircle size={14} className="mt-0.5" /> Active
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="px-4 md:px-6 py-4">
                                                        <div className="flex items-center gap-2 text-slate-600 text-[10px] md:text-sm font-medium whitespace-nowrap">
                                                            <Calendar size={16} className="text-slate-400" />
                                                            {new Date(customer.createdAt).toLocaleDateString()}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 md:px-8 py-4 text-right">
                                                        <div className="relative inline-block text-left">
                                                            <button
                                                                onClick={() => setActiveDropdown(activeDropdown === customer._id ? null : customer._id)}
                                                                className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                            >
                                                                <MoreVertical size={18} />
                                                            </button>

                                                            {activeDropdown === customer._id && (
                                                                <div className="absolute right-8 top-0 w-36 py-2 bg-white rounded-xl shadow-xl border border-slate-100 z-50">
                                                                    <button
                                                                        onClick={() => handleBlockToggle(customer._id)}
                                                                        className={`w-full text-left px-4 py-2 text-xs font-bold flex items-center gap-2 ${customer.isBlocked ? 'text-emerald-600 hover:bg-emerald-50' : 'text-red-600 hover:bg-red-50'}`}
                                                                    >
                                                                        {customer.isBlocked ? <Shield className="size-4" /> : <ShieldAlert className="size-4" />}
                                                                        {customer.isBlocked ? 'Unblock' : 'Block'}
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </td>
                                                </motion.tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="text-center py-20 text-slate-500 font-medium">No customers found matching your criteria.</td>
                                            </tr>
                                        )}
                                    </AnimatePresence>
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ManageCustomers;
