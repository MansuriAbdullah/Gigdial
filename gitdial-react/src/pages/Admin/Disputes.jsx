import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, MessageSquare, ExternalLink, ShieldCheck, MoreHorizontal, ChevronDown, CheckCircle2, User, Send, X } from 'lucide-react';

const mockDisputes = [
    {
        id: "DIS-001",
        user: "Rohan Das",
        userType: "Customer",
        against: "Vikram S.",
        amount: "$150.00",
        reason: "Job Incomplete",
        status: "Open",
        severity: "High",
        date: "25 Jan 2026",
        chatLog: [
            { sender: "Customer", msg: "He left half the work pending.", time: "10:00 AM" },
            { sender: "Worker", msg: "I needed more tools, I told him.", time: "10:15 AM" },
            { sender: "Customer", msg: "You never came back!", time: "10:20 AM" }
        ]
    },
    // ... other mock data ...
    {
        id: "DIS-002",
        user: "Anita Roy",
        userType: "Worker",
        against: "Hotel Plaza",
        amount: "$450.00",
        reason: "Payment Delayed",
        status: "Investigating",
        severity: "Medium",
        date: "22 Jan 2026",
        chatLog: [
            { sender: "Worker", msg: "Payment is 5 days late.", time: "09:00 AM" },
            { sender: "Customer", msg: "Processing it tomorrow.", time: "09:30 AM" }
        ]
    },
    {
        id: "DIS-003",
        user: "John Doe",
        userType: "Customer",
        against: "Fast Movers",
        amount: "$80.00",
        reason: "Damaged Items",
        status: "Action Required",
        severity: "Critical",
        date: "20 Jan 2026",
        chatLog: []
    }
];

const ChatModal = ({ dispute, onClose }) => (
    <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4"
    >
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[600px]"
        >
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                    <MessageSquare size={18} className="text-blue-500" /> Chat Log
                </h3>
                <button onClick={onClose}><X size={20} className="text-slate-400 hover:text-slate-600" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
                {dispute.chatLog && dispute.chatLog.length > 0 ? (
                    dispute.chatLog.map((msg, idx) => (
                        <div key={idx} className={`flex flex-col ${msg.sender === 'Customer' ? 'items-end' : 'items-start'}`}>
                            <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.sender === 'Customer' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none'
                                }`}>
                                <p className="font-bold text-xs mb-1 opacity-80">{msg.sender}</p>
                                {msg.msg}
                            </div>
                            <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.time}</span>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-slate-400 py-10 text-sm">No chat history available.</div>
                )}
            </div>
            <div className="p-4 bg-white border-t border-slate-100">
                <button
                    onClick={onClose}
                    className="w-full py-2.5 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-colors"
                >
                    Close Log
                </button>
            </div>
        </motion.div>
    </motion.div>
);

const Disputes = () => {
    const [expandedId, setExpandedId] = useState(null);
    const [activeChatDispute, setActiveChatDispute] = useState(null);

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <div className="space-y-8 relative">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Dispute Resolution</h1>
                    <p className="text-slate-500 mt-2">Manage and resolve active conflicts.</p>
                </div>
                <button className="px-5 py-2.5 bg-red-50 text-red-600 font-bold rounded-xl border border-red-100 hover:bg-red-100 transition-colors flex items-center gap-2">
                    <AlertCircle size={18} /> Emergency Cases
                </button>
            </div>

            <div className="space-y-4">
                {mockDisputes.map((dispute, index) => (
                    <motion.div
                        key={dispute.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${expandedId === dispute.id
                            ? 'border-blue-500 shadow-xl shadow-blue-500/10 ring-1 ring-blue-500'
                            : 'border-slate-100 hover:border-blue-200 hover:shadow-md'
                            }`}
                    >
                        {/* Header Row */}
                        <div
                            onClick={() => toggleExpand(dispute.id)}
                            className="p-6 flex items-center justify-between cursor-pointer"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${dispute.severity === 'Critical' || dispute.severity === 'High' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'
                                    }`}>
                                    <AlertCircle size={24} />
                                </div>
                                <div>
                                    <div className="flex items-center gap-3">
                                        <h3 className="font-bold text-slate-900 text-lg">{dispute.reason}</h3>
                                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${dispute.status === 'Open' ? 'bg-red-100 text-red-700' :
                                            dispute.status === 'Investigating' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
                                            }`}>
                                            {dispute.status}
                                        </span>
                                    </div>
                                    <p className="text-slate-500 text-sm mt-1">
                                        Dispute ID: <span className="font-mono text-slate-700">{dispute.id}</span> • {dispute.date}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-8">
                                <div className="text-right hidden md:block">
                                    <p className="text-sm text-slate-500">Amount held</p>
                                    <p className="font-bold text-slate-900 text-lg">{dispute.amount}</p>
                                </div>
                                <div className={`p-2 rounded-full transition-transform duration-300 ${expandedId === dispute.id ? 'rotate-180 bg-slate-100' : ''}`}>
                                    <ChevronDown size={20} className="text-slate-400" />
                                </div>
                            </div>
                        </div>

                        {/* Expanded Details */}
                        <motion.div
                            initial={false}
                            animate={{ height: expandedId === dispute.id ? 'auto' : 0 }}
                            className="overflow-hidden bg-slate-50/50"
                        >
                            <div className="p-6 border-t border-slate-100 grid md:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                                        <ShieldCheck size={18} className="text-blue-500" /> Case Details
                                    </h4>
                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between p-3 bg-white rounded-lg border border-slate-100">
                                            <span className="text-slate-500">Initiated By</span>
                                            <span className="font-semibold text-slate-900">{dispute.user} <span className="text-xs text-slate-400 font-normal">({dispute.userType})</span></span>
                                        </div>
                                        <div className="flex justify-between p-3 bg-white rounded-lg border border-slate-100">
                                            <span className="text-slate-500">Against</span>
                                            <span className="font-semibold text-slate-900">{dispute.against}</span>
                                        </div>
                                        <div className="p-4 bg-white rounded-lg border border-slate-100 mt-2">
                                            <span className="text-slate-500 block mb-2 text-xs uppercase tracking-wider font-bold">Description</span>
                                            <p className="text-slate-700 leading-relaxed">
                                                The customer claims the cleaning service was not performed up to standard. Photos provided show dusty shelves and unwept floors in the living area. Worker claims they were denied access to those rooms.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col h-full justify-between">
                                    <div>
                                        <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                                            <MessageSquare size={18} className="text-blue-500" /> Actions
                                        </h4>
                                        <div className="flex flex-wrap gap-3">
                                            <button
                                                onClick={() => setActiveChatDispute(dispute)}
                                                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors font-medium text-sm"
                                            >
                                                <MessageSquare size={16} /> View Chat Logs
                                            </button>
                                            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors font-medium text-sm">
                                                <ExternalLink size={16} /> View Evidence
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-slate-200 flex items-center gap-3">
                                        <button className="flex-1 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 shadow-lg shadow-green-600/20 transition-all">
                                            Resolve & Release Funds
                                        </button>
                                        <button className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600">
                                            <MoreHorizontal size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {activeChatDispute && <ChatModal dispute={activeChatDispute} onClose={() => setActiveChatDispute(null)} />}
            </AnimatePresence>
        </div>
    );
};

export default Disputes;
