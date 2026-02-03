import React, { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, Calendar, Download, Eye, Filter, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const WorkerEarnings = () => {
    const [period, setPeriod] = useState('This Month');
    const [walletData, setWalletData] = useState({ balance: 0, transactions: [] });
    const [loading, setLoading] = useState(true);

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const fetchWallet = async () => {
        try {
            const response = await fetch('/api/wallet/my-wallet', {
                headers: {
                    'Authorization': `Bearer ${userInfo?.token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setWalletData(data && data.transactions ? data : { balance: 0, transactions: [] });
            } else {
                setWalletData({ balance: 0, transactions: [] });
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching wallet:', error);
            setWalletData({ balance: 0, transactions: [] });
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWallet();
    }, []);

    // Calculate stats
    const totalEarnings = walletData.transactions
        .filter(t => t.type === 'credit')
        .reduce((acc, curr) => acc + curr.amount, 0);

    const thisMonthEarnings = walletData.transactions
        .filter(t => t.type === 'credit' && new Date(t.createdAt).getMonth() === new Date().getMonth())
        .reduce((acc, curr) => acc + curr.amount, 0);

    // Assuming transactions are earnings, pending payouts might be wallet balance if not withdrawn
    const pendingPayouts = walletData.balance;

    // Completed jobs count from transactions
    const completedJobs = walletData.transactions.length;

    const stats = [
        { label: 'Total Earnings', value: `₹${totalEarnings}`, change: '+12.5%', trend: 'up', icon: DollarSign },
        { label: 'This Month', value: `₹${thisMonthEarnings}`, change: '+8.2%', trend: 'up', icon: Calendar },
        { label: 'Wallet Balance', value: `₹${pendingPayouts}`, change: 'Available', trend: 'up', icon: TrendingUp },
        { label: 'Transactions', value: completedJobs, change: 'Total', trend: 'up', icon: Eye }
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Earnings & Payouts</h1>
                    <p className="text-slate-500">Track your income and payment history</p>
                </div>
                <div className="flex gap-2">
                    <select
                        value={period}
                        onChange={(e) => setPeriod(e.target.value)}
                        className="px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 font-medium text-sm"
                    >
                        <option>This Week</option>
                        <option>This Month</option>
                        <option>Last Month</option>
                        <option>Last 3 Months</option>
                        <option>This Year</option>
                    </select>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-bold text-sm">
                        <Download size={18} />
                        Export
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition-all">
                        <div className="flex items-start justify-between mb-4">
                            <div className={`p-3 rounded-xl ${index === 0 ? 'bg-blue-50' : index === 1 ? 'bg-green-50' : index === 2 ? 'bg-yellow-50' : 'bg-purple-50'}`}>
                                <stat.icon className={`${index === 0 ? 'text-blue-600' : index === 1 ? 'text-green-600' : index === 2 ? 'text-yellow-600' : 'text-purple-600'}`} size={24} />
                            </div>
                            <span className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${stat.trend === 'up' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                {stat.trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                {stat.change}
                            </span>
                        </div>
                        <p className="text-slate-500 text-sm font-medium mb-1">{stat.label}</p>
                        <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Transactions Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                    <h2 className="text-lg font-bold text-slate-900">Recent Transactions</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100">
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Description</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Date</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Type</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Amount</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {walletData.transactions.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-8 text-center text-slate-500">No transactions found</td>
                                </tr>
                            ) : (
                                walletData.transactions.map((transaction) => (
                                    <tr key={transaction._id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <span className="font-bold text-slate-900">{transaction.description}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-slate-500 text-sm">{new Date(transaction.createdAt).toLocaleDateString()}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`text-sm font-medium ${transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                                                {transaction.type.toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`font-bold ${transaction.type === 'credit' ? 'text-green-600' : 'text-slate-900'}`}>
                                                {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-200`}>
                                                {transaction.status || 'Success'}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Payout Request */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h3 className="text-lg font-bold mb-2">Request Payout</h3>
                        <p className="text-blue-100 text-sm">Available balance: ₹{walletData.balance}</p>
                    </div>
                    <button
                        onClick={() => alert('Payout request sent!')}
                        className="px-6 py-3 bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition-colors font-bold shadow-lg"
                    >
                        Request Withdrawal
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WorkerEarnings;
