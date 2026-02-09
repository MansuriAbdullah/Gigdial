import React, { useState } from 'react';
import { Search, Filter, MoreVertical, Shield, ShieldAlert, CheckCircle, XCircle } from 'lucide-react';

const users = [
    { id: 1, name: 'Rahul Kumar', role: 'Worker', status: 'Verified', email: 'rahul.k@example.com', joinDate: '2023-11-12' },
    { id: 2, name: 'Priya Sharma', role: 'Customer', status: 'Active', email: 'priya.s@example.com', joinDate: '2023-11-15' },
    { id: 3, name: 'Amit Singh', role: 'Worker', status: 'Pending', email: 'amit.singh@example.com', joinDate: '2023-11-20' },
    { id: 4, name: 'Sneha Gupta', role: 'Worker', status: 'Verified', email: 'sneha.g@example.com', joinDate: '2023-11-22' },
    { id: 5, name: 'Vikram Malhotra', role: 'Customer', status: 'Suspended', email: 'vikram.m@example.com', joinDate: '2023-10-05' },
    { id: 6, name: 'Anjali Desai', role: 'Customer', status: 'Active', email: 'anjali.d@example.com', joinDate: '2023-12-01' },
];

const AdminUsers = () => {
    const [filter, setFilter] = useState('All');

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
                    <p className="text-slate-500">Manage customers and workers.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search users..."
                            className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 text-slate-600 font-medium">
                        <Filter size={18} /> Filter
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors">
                        Add User
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100">
                                <th className="px-6 py-4 font-semibold text-slate-600 text-sm">User</th>
                                <th className="px-6 py-4 font-semibold text-slate-600 text-sm">Role</th>
                                <th className="px-6 py-4 font-semibold text-slate-600 text-sm">Status</th>
                                <th className="px-6 py-4 font-semibold text-slate-600 text-sm">Joined Date</th>
                                <th className="px-6 py-4 font-semibold text-slate-600 text-sm text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-xs">
                                                {user.name.charAt(0)}{user.name.split(' ')[1]?.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-900">{user.name}</div>
                                                <div className="text-xs text-slate-500">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${user.role === 'Worker' ? 'bg-blue-50 text-blue-700 border border-blue-100' : 'bg-orange-50 text-orange-700 border border-orange-100'
                                            }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${user.status === 'Verified' ? 'bg-green-50 text-green-700 border-green-100' :
                                                user.status === 'Active' ? 'bg-green-50 text-green-700 border-green-100' :
                                                    user.status === 'Pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-100' :
                                                        'bg-red-50 text-red-700 border-red-100'
                                            }`}>
                                            {user.status === 'Verified' && <CheckCircle size={12} />}
                                            {user.status === 'Suspended' && <ShieldAlert size={12} />}
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-500 text-sm">
                                        {user.joinDate}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                            <MoreVertical size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
                    <p className="text-sm text-slate-500">Showing 6 of 124 users</p>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 text-sm border border-slate-200 rounded-lg hover:bg-slate-50">Previous</button>
                        <button className="px-3 py-1 text-sm border border-slate-200 rounded-lg hover:bg-slate-50">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminUsers;
