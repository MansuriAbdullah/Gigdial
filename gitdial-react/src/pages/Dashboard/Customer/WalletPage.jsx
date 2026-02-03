import React, { useState, useEffect } from 'react';
import { Wallet, Plus, ArrowUpRight, ArrowDownLeft, CreditCard, History, TrendingUp, Download } from 'lucide-react';
import { motion } from 'framer-motion';

const WalletPage = () => {
    const [balance, setBalance] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const [showAddMoney, setShowAddMoney] = useState(false);
    const [amount, setAmount] = useState('');
    const [filter, setFilter] = useState('all'); // all, credit, debit

    useEffect(() => {
        fetchWalletData();
    }, []);

    const fetchWalletData = async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const response = await fetch('/api/users/wallet', {
                headers: {
                    'Authorization': `Bearer ${userInfo?.token}`
                }
            });
            const data = await response.json();
            setBalance(data.balance || 0);
            setTransactions(data.transactions || []);
        } catch (error) {
            console.error('Error fetching wallet data:', error);
        }
    };

    const handleAddMoney = async (e) => {
        e.preventDefault();
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const response = await fetch('/api/users/wallet/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userInfo?.token}`
                },
                body: JSON.stringify({ amount: parseFloat(amount) })
            });

            if (response.ok) {
                fetchWalletData();
                setShowAddMoney(false);
                setAmount('');
            }
        } catch (error) {
            console.error('Error adding money:', error);
        }
    };

    const filteredTransactions = transactions.filter(t => {
        if (filter === 'all') return true;
        return t.type === filter;
    });

    const quickAmounts = [500, 1000, 2000, 5000];

    return (
        <div className="space-y-6">
            {/* Wallet Balance Card */}
            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-6 md:p-8 text-white shadow-xl shadow-indigo-200 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full -ml-12 -mb-12 blur-3xl"></div>

                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <p className="text-indigo-100 font-medium mb-2">Wallet Balance</p>
                            <h1 className="text-4xl md:text-5xl font-bold">₹{balance.toFixed(2)}</h1>
                        </div>
                        <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl">
                            <Wallet size={28} />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <button
                            onClick={() => setShowAddMoney(true)}
                            className="flex items-center justify-center gap-2 bg-white text-indigo-600 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-colors shadow-lg shadow-black/10"
                        >
                            <Plus size={20} />
                            Add Money
                        </button>
                        <button className="flex items-center justify-center gap-2 bg-indigo-500/50 text-white py-3 rounded-xl font-bold hover:bg-indigo-500/70 transition-colors border border-indigo-400/30">
                            <Download size={20} />
                            Statement
                        </button>
                    </div>
                </div>
            </div>

            {/* Add Money Modal */}
            {showAddMoney && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"
                >
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Add Money to Wallet</h3>
                    <form onSubmit={handleAddMoney} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Enter Amount</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">₹</span>
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="0.00"
                                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg font-bold"
                                    required
                                    min="1"
                                    step="0.01"
                                />
                            </div>
                        </div>

                        <div>
                            <p className="text-sm font-medium text-slate-700 mb-2">Quick Add</p>
                            <div className="grid grid-cols-4 gap-2">
                                {quickAmounts.map((amt) => (
                                    <button
                                        key={amt}
                                        type="button"
                                        onClick={() => setAmount(amt.toString())}
                                        className="py-2 px-3 border-2 border-slate-200 rounded-lg font-bold text-slate-700 hover:border-blue-600 hover:text-blue-600 transition-colors"
                                    >
                                        ₹{amt}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                            <h4 className="font-bold text-blue-900 text-sm mb-2">Payment Methods</h4>
                            <div className="space-y-2">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input type="radio" name="payment" defaultChecked className="w-4 h-4" />
                                    <CreditCard size={18} className="text-blue-600" />
                                    <span className="text-sm font-medium text-slate-700">UPI / Cards / Net Banking</span>
                                </label>
                            </div>
                        </div>

                        <div className="flex gap-3 justify-end">
                            <button
                                type="button"
                                onClick={() => {
                                    setShowAddMoney(false);
                                    setAmount('');
                                }}
                                className="px-6 py-2 text-slate-600 font-bold rounded-xl hover:bg-slate-100 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors"
                            >
                                Proceed to Pay
                            </button>
                        </div>
                    </form>
                </motion.div>
            )}

            {/* Transaction History */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-slate-900">Transaction History</h2>
                    <div className="flex gap-2">
                        {['all', 'credit', 'debit'].map((type) => (
                            <button
                                key={type}
                                onClick={() => setFilter(type)}
                                className={`px-4 py-1.5 rounded-lg text-sm font-bold capitalize transition-colors ${filter === type
                                        ? 'bg-slate-900 text-white'
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                    }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-3">
                    {filteredTransactions.length > 0 ? (
                        filteredTransactions.map((transaction) => (
                            <motion.div
                                key={transaction._id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`p-2 rounded-lg ${transaction.type === 'credit'
                                            ? 'bg-green-50'
                                            : 'bg-red-50'
                                        }`}>
                                        {transaction.type === 'credit' ? (
                                            <ArrowDownLeft size={20} className="text-green-600" />
                                        ) : (
                                            <ArrowUpRight size={20} className="text-red-600" />
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900">{transaction.description}</h4>
                                        <p className="text-sm text-slate-500">
                                            {new Date(transaction.createdAt).toLocaleDateString('en-IN', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className={`text-lg font-bold ${transaction.type === 'credit'
                                            ? 'text-green-600'
                                            : 'text-red-600'
                                        }`}>
                                        {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount.toFixed(2)}
                                    </p>
                                    <p className="text-xs text-slate-500 capitalize">{transaction.status}</p>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="text-center py-12 bg-slate-50 rounded-xl">
                            <History size={48} className="mx-auto text-slate-300 mb-3" />
                            <p className="text-slate-500 font-medium">No transactions yet</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Wallet Benefits */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-100">
                <div className="flex items-start gap-3">
                    <div className="p-2 bg-yellow-400 rounded-lg">
                        <TrendingUp size={20} className="text-yellow-900" />
                    </div>
                    <div>
                        <h3 className="font-bold text-yellow-900 mb-1">Wallet Benefits</h3>
                        <ul className="text-sm text-yellow-800 space-y-1">
                            <li>• Instant refunds on cancellations</li>
                            <li>• Faster checkout process</li>
                            <li>• Exclusive wallet-only offers</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WalletPage;
