import {
    DollarSign, TrendingUp, Wallet, Download, Calendar,
    Filter, ChevronDown, CheckCircle, Clock, ArrowUpRight,
    Info, Send
} from 'lucide-react';
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Earnings = () => {
    const [dateRange, setDateRange] = useState('Last 6 Months');
    const [activeTab, setActiveTab] = useState('Earnings History');
    const [selectedService, setSelectedService] = useState('All Services');
    const [selectedStatus, setSelectedStatus] = useState('All Status');

    const earningsData = [
        { name: 'Oct', amount: 15000 },
        { name: 'Nov', amount: 22000 },
        { name: 'Dec', amount: 18000 },
        { name: 'Jan', amount: 28000 },
        { name: 'Feb', amount: 24000 },
        { name: 'Mar', amount: 35240 },
    ];

    const transactions = [
        { id: '#GD-123', date: 'Mar 20, 2025', service: 'Tap Repair', customer: 'Priya M.', price: '₹499', commission: '-₹50', earnings: '₹449', status: 'Released' },
        { id: '#GD-124', date: 'Mar 19, 2025', service: 'Pipe Installation', customer: 'Amit S.', price: '₹1,200', commission: '-₹120', earnings: '₹1,080', status: 'Released' },
        { id: '#GD-125', date: 'Mar 18, 2025', service: 'Leak Repair', customer: 'Raj K.', price: '₹800', commission: '-₹80', earnings: '₹720', status: 'In Escrow' },
        { id: '#GD-120', date: 'Mar 15, 2025', service: 'Full Plumbing Check', customer: 'Sneha P.', price: '₹2,000', commission: '-₹200', earnings: '₹1,800', status: 'Released' },
        { id: '#GD-118', date: 'Mar 12, 2025', service: 'Water Tank Cleaning', customer: 'Vikram S.', price: '₹1,500', commission: '-₹150', earnings: '₹1,350', status: 'Released' },
    ];

    const servicesList = ['All Services', ...new Set(transactions.map(t => t.service))];
    const statusList = ['All Status', 'Released', 'In Escrow'];

    const filteredTransactions = transactions.filter(tx => {
        const matchesService = selectedService === 'All Services' || tx.service === selectedService;
        const matchesStatus = selectedStatus === 'All Status' || tx.status === selectedStatus;
        return matchesService && matchesStatus;
    });

    return (
        <div className="space-y-8 animate-fade-in max-w-7xl mx-auto pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600">
                            <DollarSign size={16} />
                        </span>
                        <span className="text-xs font-bold text-green-600 uppercase tracking-wider">Finance</span>
                    </div>
                    <h1 className="text-3xl font-display font-bold text-slate-900">My Earnings</h1>
                </div>
                <button className="flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-sm">
                    <Download size={18} />
                    Download Report
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                            <DollarSign size={24} />
                        </div>
                    </div>
                    <div className="relative">
                        <h3 className="text-3xl font-bold text-slate-800 mb-1">₹45,680</h3>
                        <p className="text-slate-500 font-medium text-sm">Total Earnings (Lifetime)</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-3 bg-green-50 text-green-600 rounded-xl">
                            <TrendingUp size={24} />
                        </div>
                        <span className="flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-green-50 text-green-600 border border-green-100">
                            +15% vs last month
                        </span>
                    </div>
                    <div className="relative">
                        <h3 className="text-3xl font-bold text-slate-800 mb-1">₹12,450</h3>
                        <p className="text-slate-500 font-medium text-sm">This Month</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
                            <Wallet size={24} />
                        </div>
                    </div>
                    <div className="relative">
                        <h3 className="text-3xl font-bold text-slate-800 mb-1">₹3,200</h3>
                        <p className="text-slate-500 font-medium text-sm">Available Balance</p>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        Earnings Trend
                        <span className="text-sm font-normal text-slate-400">({dateRange})</span>
                    </h2>
                    <div className="flex gap-2">
                        {['Last 6 Months', 'This Year'].map(range => (
                            <button
                                key={range}
                                onClick={() => setDateRange(range)}
                                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${dateRange === range ? 'bg-slate-800 text-white' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
                            >
                                {range}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={earningsData} barSize={60}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#64748B', fontSize: 12, fontWeight: 500 }}
                                dy={10}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#64748B', fontSize: 12 }}
                                tickFormatter={(value) => `₹${value / 1000}k`}
                            />
                            <Tooltip
                                cursor={{ fill: '#F1F5F9' }}
                                contentStyle={{ backgroundColor: '#1E293B', borderRadius: '12px', border: 'none', color: '#fff', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                                itemStyle={{ color: '#fff' }}
                                formatter={(value) => [`₹${value}`, 'Earnings']}
                            />
                            <Bar dataKey="amount" fill="#3B82F6" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Content Tabs */}
            <div className="flex gap-8 border-b border-slate-200 mb-6">
                {['Earnings History', 'Refund Claims'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-4 text-sm font-bold transition-all relative ${activeTab === tab
                            ? 'text-primary'
                            : 'text-slate-500 hover:text-slate-700'
                            }`}
                    >
                        {tab}
                        {activeTab === tab && (
                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full"></div>
                        )}
                    </button>
                ))}
            </div>

            {activeTab === 'Earnings History' ? (
                /* Transaction History */
                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden animate-fade-in">
                    <div className="p-6 border-b border-slate-50 bg-slate-50/30 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4">
                        <h2 className="font-bold text-lg text-slate-800">Earnings History</h2>

                        <div className="flex flex-wrap gap-3 w-full xl:w-auto">
                            <div className="relative group">
                                <select
                                    value={selectedService}
                                    onChange={(e) => setSelectedService(e.target.value)}
                                    className="pl-4 pr-10 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-primary appearance-none hover:border-slate-300 transition-colors w-36 cursor-pointer"
                                >
                                    {servicesList.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                            </div>

                            <div className="relative group">
                                <select
                                    value={selectedStatus}
                                    onChange={(e) => setSelectedStatus(e.target.value)}
                                    className="pl-4 pr-10 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-primary appearance-none hover:border-slate-300 transition-colors w-32 cursor-pointer"
                                >
                                    {statusList.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                            </div>

                            <div className="relative group">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-primary transition-colors" size={16} />
                                <input type="text" placeholder="Start Date" className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-primary w-32 hover:border-slate-300 transition-colors" />
                            </div>
                            <div className="relative group">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-primary transition-colors" size={16} />
                                <input type="text" placeholder="End Date" className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-primary w-32 hover:border-slate-300 transition-colors" />
                            </div>
                            <button className="flex items-center gap-2 bg-primary text-white px-5 py-2 rounded-xl font-bold text-sm shadow-md shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95">
                                Apply
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-50 border-b border-slate-100">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Job ID</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Service</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Customer</th>
                                    <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Amount</th>
                                    <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Earnings</th>
                                    <th className="px-6 py-4 text-center text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {filteredTransactions.length > 0 ? (
                                    filteredTransactions.map((tx) => (
                                        <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="px-6 py-4 text-sm text-slate-600 font-medium">{tx.date}</td>
                                            <td className="px-6 py-4 text-sm font-bold text-primary group-hover:underline cursor-pointer">{tx.id}</td>
                                            <td className="px-6 py-4 text-sm text-slate-800 font-semibold">{tx.service}</td>
                                            <td className="px-6 py-4 text-sm text-slate-600">{tx.customer}</td>
                                            <td className="px-6 py-4 text-sm text-slate-500 font-medium text-right">{tx.price}</td>
                                            <td className="px-6 py-4 text-sm text-green-600 font-bold text-right">{tx.earnings}</td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${tx.status === 'Released'
                                                    ? 'bg-green-50 text-green-600 border-green-100'
                                                    : 'bg-yellow-50 text-yellow-600 border-yellow-100'
                                                    }`}>
                                                    {tx.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-8 text-center text-slate-500">
                                            No transactions match your filters.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-4 border-t border-slate-100 flex justify-center">
                        <button className="text-sm font-bold text-primary hover:text-blue-700 transition-colors flex items-center gap-1">
                            View All Transactions
                            <ArrowUpRight size={14} />
                        </button>
                    </div>
                </div>
            ) : (
                /* Refund Claims Form */
                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 animate-fade-in space-y-8">
                    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 flex gap-4">
                        <div className="p-2 bg-blue-100 text-blue-600 rounded-lg shrink-0 h-fit">
                            <Info size={20} />
                        </div>
                        <div>
                            <h3 className="font-bold text-blue-900 text-sm mb-1">No-Lead Refund Policy</h3>
                            <p className="text-sm text-blue-700 leading-relaxed">
                                If you subscribed for premium visibility but received fewer than 5 leads per month, you can claim a full refund.
                                Claims must be submitted within 10 days of the subscription month end.
                            </p>
                        </div>
                    </div>

                    <div className="p-6 border border-green-100 bg-green-50/30 rounded-2xl">
                        <h3 className="font-bold text-slate-800 mb-6">Submit Refund Claim</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Subscription Month</label>
                                <div className="relative">
                                    <select className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-50 appearance-none transition-all cursor-pointer">
                                        <option>February 2025</option>
                                        <option>January 2025</option>
                                        <option>December 2024</option>
                                    </select>
                                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Reason</label>
                                <div className="relative">
                                    <select className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-50 appearance-none transition-all cursor-pointer">
                                        <option>Received fewer than 5 leads</option>
                                        <option>Technical issues with account</option>
                                        <option>Other (Specify below)</option>
                                    </select>
                                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2 mb-8">
                            <label className="text-sm font-bold text-slate-700">Additional Details</label>
                            <textarea
                                rows="4"
                                placeholder="Explain your situation..."
                                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-50 transition-all resize-none placeholder:text-slate-400"
                            ></textarea>
                        </div>

                        <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-green-200 active:scale-95 group">
                            <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                            Submit Claim
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Earnings;
