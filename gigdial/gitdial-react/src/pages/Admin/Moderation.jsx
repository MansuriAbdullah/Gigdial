import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Flag, AlertTriangle, UserX, CheckCircle, Search, Filter } from 'lucide-react';

const reports = [
    { id: 1, type: "Spam", target: "Comment #492", reporter: "User_123", time: "10m ago", status: "Pending" },
    { id: 2, type: "Harassment", target: "Msg from User_99", reporter: "Sarah_K", time: "1h ago", status: "Reviewing" },
    { id: 3, type: "Fake Profile", target: "Profile: Worker_Bob", reporter: "SysAdmin", time: "3h ago", status: "Pending" },
    { id: 4, type: "Inappropriate Content", target: "Service: Massage...", reporter: "Anon", time: "5h ago", status: "Resolved" }
];

const Moderation = () => {
    return (
        <div className="space-y-8">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden"
            >
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        <Shield className="text-blue-400" size={32} /> Moderation Center
                    </h1>
                    <p className="text-slate-300 mt-2 max-w-xl">
                        Monitor content, enforce community guidelines, and keep the platform safe.
                        <br />Automated systems are currently handling 94% of spam.
                    </p>
                </div>
                {/* Decorative particles */}
                <div className="absolute right-0 top-0 h-full w-1/3 opacity-10">
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#3B82F6" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,79.6,-46.9C87.4,-34.7,90.1,-20.4,87.3,-7.2C84.4,6.1,76,18.3,66.5,29.1C57,39.9,46.4,49.3,34.8,55.9C23.2,62.5,10.6,66.3,-1.2,68.4C-13,70.5,-25.1,70.9,-36.4,65.3C-47.7,59.7,-58.2,48.1,-66.2,35.1C-74.2,22.1,-79.7,7.7,-78.3,-6.1C-77,-19.9,-68.8,-33.1,-58.5,-44.6C-48.2,-56.1,-35.8,-65.9,-22.6,-70.5C-9.4,-75.1,4.6,-74.5,17.9,-73.9" transform="translate(100 100)" />
                    </svg>
                </div>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Stats */}
                <div className="lg:col-span-1 space-y-6">
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4"
                    >
                        <div className="p-3 bg-red-100 text-red-600 rounded-xl">
                            <Flag size={24} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-slate-900">24</h3>
                            <p className="text-slate-500 text-sm">Pending Reports</p>
                        </div>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4"
                    >
                        <div className="p-3 bg-orange-100 text-orange-600 rounded-xl">
                            <AlertTriangle size={24} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-slate-900">5</h3>
                            <p className="text-slate-500 text-sm">High Severity</p>
                        </div>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4"
                    >
                        <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                            <UserX size={24} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-slate-900">12</h3>
                            <p className="text-slate-500 text-sm">Banned Users (Today)</p>
                        </div>
                    </motion.div>
                </div>

                {/* Queue */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                        <h3 className="font-bold text-lg text-slate-900">Report Queue</h3>
                        <div className="flex gap-2">
                            <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-500">
                                <Search size={18} />
                            </button>
                            <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-500">
                                <Filter size={18} />
                            </button>
                        </div>
                    </div>
                    <div>
                        {reports.map((report, idx) => (
                            <motion.div
                                key={report.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors flex items-center justify-between group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-2 h-2 rounded-full ${report.status === 'Pending' ? 'bg-red-500' : 'bg-slate-300'}`}></div>
                                    <div>
                                        <p className="font-bold text-slate-800 text-sm">{report.type}</p>
                                        <p className="text-xs text-slate-500">{report.target} • Reported by {report.reporter}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-xs text-slate-400 font-medium">{report.time}</span>
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                                        <button className="px-3 py-1 bg-white border border-slate-200 rounded text-xs font-bold hover:bg-red-50 hover:border-red-200 hover:text-red-600">
                                            Ban
                                        </button>
                                        <button className="px-3 py-1 bg-blue-600 text-white border border-blue-600 rounded text-xs font-bold hover:bg-blue-700">
                                            Ignore
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <div className="p-4 text-center">
                        <button className="text-blue-600 text-sm font-bold hover:underline">View All History</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Moderation;
