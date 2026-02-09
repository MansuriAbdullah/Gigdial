import React from 'react';
import { CreditCard, Plus, ArrowUpRight, ArrowDownLeft, Wallet as WalletIcon, MoreHorizontal } from 'lucide-react';

const Wallet = () => {
    return (
        <div className="space-y-8 animate-fade-in pb-10">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-display font-bold text-slate-900">Payments & Wallet</h1>
                    <p className="text-slate-500 mt-1">Manage your payment methods and history</p>
                </div>
                <button className="px-6 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all flex items-center gap-2 shadow-lg shadow-slate-900/20">
                    <Plus size={20} />
                    <span>Add Money</span>
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Col: Cards & Balance */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Featured Card */}
                    <div className="bg-[#0F172A] rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-slate-900/20 group">
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/30 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>

                        <div className="relative z-10 flex flex-col h-full justify-between min-h-[220px]">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-slate-400 uppercase tracking-widest text-xs font-bold mb-1">Current Balance</p>
                                    <h2 className="text-4xl font-display font-bold">₹12,450.00</h2>
                                </div>
                                <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center">
                                    <WalletIcon size={24} className="text-blue-300" />
                                </div>
                            </div>

                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Active Card</p>
                                    <div className="flex items-center gap-3">
                                        <div className="flex -space-x-2">
                                            <div className="w-8 h-8 rounded-full bg-red-500/80"></div>
                                            <div className="w-8 h-8 rounded-full bg-orange-500/80"></div>
                                        </div>
                                        <span className="font-mono text-lg tracking-wider">•••• 4242</span>
                                    </div>
                                </div>
                                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-8 opacity-80 invert" />
                            </div>
                        </div>
                    </div>

                    {/* Payment Methods List */}
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-slate-900">Saved Cards</h3>
                            <button className="text-primary font-bold text-sm hover:underline">+ Add New</button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-6 rounded-[2rem] border border-slate-200 bg-white flex items-center gap-4 hover:border-slate-300 transition-colors cursor-pointer group">
                                <div className="w-14 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-bold text-slate-900">Mastercard</p>
                                    <p className="text-slate-500 text-sm font-mono">•••• 8892</p>
                                </div>
                                <div className="w-6 h-6 rounded-full border-2 border-slate-200 flex items-center justify-center group-hover:border-primary">
                                    <div className="w-2.5 h-2.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </div>
                            </div>
                            <div className="p-6 rounded-[2rem] border-2 border-primary bg-blue-50/50 flex items-center gap-4 cursor-pointer relative">
                                <div className="absolute top-4 right-4 text-primary"><CreditCard size={16} /></div>
                                <div className="w-14 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-bold text-slate-900">Visa Debit</p>
                                    <p className="text-slate-500 text-sm font-mono">•••• 4242</p>
                                </div>
                                <div className="w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center bg-primary">
                                    <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Col: Transactions */}
                <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 h-fit">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-slate-900">Hstory</h3>
                        <button className="p-2 hover:bg-slate-50 rounded-xl transition-colors">
                            <MoreHorizontal size={20} className="text-slate-400" />
                        </button>
                    </div>

                    <div className="space-y-6">
                        {[
                            { title: 'Home Cleaning', date: 'Today, 10:00 AM', amount: '-₹1,499.00', type: 'debit', icon: ArrowUpRight },
                            { title: 'Wallet Top-up', date: 'Yesterday, 4:30 PM', amount: '+₹5,000.00', type: 'credit', icon: ArrowDownLeft },
                            { title: 'Plumbing Service', date: 'Oct 24, 2024', amount: '-₹450.00', type: 'debit', icon: ArrowUpRight },
                            { title: 'Refund: Cook', date: 'Oct 20, 2024', amount: '+₹200.00', type: 'credit', icon: ArrowDownLeft },
                            { title: 'Electrician', date: 'Oct 15, 2024', amount: '-₹800.00', type: 'debit', icon: ArrowUpRight },
                        ].map((tx, i) => (
                            <div key={i} className="flex items-center gap-4 group cursor-pointer">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${tx.type === 'credit' ? 'bg-green-50 text-green-600 group-hover:bg-green-100' : 'bg-slate-50 text-slate-600 group-hover:bg-slate-100'
                                    }`}>
                                    <tx.icon size={20} />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-slate-900 group-hover:text-primary transition-colors">{tx.title}</h4>
                                    <p className="text-xs text-slate-400 font-medium">{tx.date}</p>
                                </div>
                                <span className={`font-bold font-mono ${tx.type === 'credit' ? 'text-green-600' : 'text-slate-900'}`}>
                                    {tx.amount}
                                </span>
                            </div>
                        ))}
                    </div>

                    <button className="w-full mt-8 py-3 bg-slate-50 text-slate-600 font-bold rounded-xl hover:bg-slate-100 transition-colors">
                        View All Transactions
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Wallet;
