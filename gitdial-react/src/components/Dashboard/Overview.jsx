import React from 'react';
import {
    DollarSign, User, Calendar, TrendingUp, TrendingDown,
    MoreHorizontal, CheckCircle, Clock, AlertCircle
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const StatCard = ({ title, value, change, isPositive, icon: Icon, color }) => (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-card-hover transition-all duration-300">
        <div className="flex justify-between items-start mb-4">
            <div className={`w-12 h-12 rounded-2xl ${color} bg-opacity-10 flex items-center justify-center text-${color.replace('bg-', '')}-600`}>
                <Icon size={24} />
            </div>
            <span className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-lg ${isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {change}
            </span>
        </div>
        <h3 className="text-3xl font-display font-bold text-dark-surface mb-1">{value}</h3>
        <p className="text-slate-500 font-medium text-sm">{title}</p>
    </div>
);

const Overview = () => {
    const revenueData = [
        { name: 'Mon', revenue: 4000 },
        { name: 'Tue', revenue: 3000 },
        { name: 'Wed', revenue: 2000 },
        { name: 'Thu', revenue: 2780 },
        { name: 'Fri', revenue: 1890 },
        { name: 'Sat', revenue: 2390 },
        { name: 'Sun', revenue: 3490 },
    ];

    const recentBookings = [
        { id: 1, client: 'Amit Singh', service: 'Plumbing Repair', date: 'Today, 10:00 AM', status: 'Pending', price: '₹450' },
        { id: 2, client: 'Sarah Khan', service: 'House Cleaning', date: 'Yesterday', status: 'Completed', price: '₹1200' },
        { id: 3, client: 'Rajesh Kumar', service: 'AC Service', date: '22 Jan', status: 'Cancelled', price: '₹800' },
    ];

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-display font-bold text-dark-surface">Dashboard Overview</h1>
                    <p className="text-slate-500">Welcome back, Rahul! You have 3 new requests.</p>
                </div>
                <div className="flex items-center gap-3">
                    <select className="bg-white border border-slate-200 text-slate-600 text-sm font-semibold py-2 px-4 rounded-xl focus:outline-none shadow-sm cursor-pointer">
                        <option>Last 7 Days</option>
                        <option>Last 30 Days</option>
                        <option>This Year</option>
                    </select>
                    <button className="btn-primary py-2 px-4 text-sm shadow-md">Export Report</button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Revenue"
                    value="₹45,231"
                    change="+12.5%"
                    isPositive={true}
                    icon={DollarSign}
                    color="bg-green-500"
                />
                <StatCard
                    title="Active Bookings"
                    value="24"
                    change="+4"
                    isPositive={true}
                    icon={Calendar}
                    color="bg-blue-500"
                />
                <StatCard
                    title="Profile Views"
                    value="1,203"
                    change="-2.4%"
                    isPositive={false}
                    icon={User}
                    color="bg-purple-500"
                />
                <StatCard
                    title="Completion Rate"
                    value="98%"
                    change="+1.2%"
                    isPositive={true}
                    icon={CheckCircle}
                    color="bg-orange-500"
                />
            </div>

            {/* Charts & Activity Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Chart */}
                <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-lg text-dark-surface">Revenue Analytics</h3>
                        <button className="text-primary text-sm font-semibold hover:underline">View Details</button>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={revenueData}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1E293B', borderRadius: '8px', border: 'none', color: '#fff' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Area type="monotone" dataKey="revenue" stroke="#4F46E5" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Recent Bookings List */}
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                    <h3 className="font-bold text-lg text-dark-surface mb-6">Recent Activity</h3>
                    <div className="space-y-6">
                        {recentBookings.map(booking => (
                            <div key={booking.id} className="flex items-center gap-4 pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs ${booking.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                        booking.status === 'Pending' ? 'bg-orange-100 text-orange-700' :
                                            'bg-red-100 text-red-700'
                                    }`}>
                                    {booking.client.charAt(0)}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-semibold text-sm text-dark-surface">{booking.client}</h4>
                                    <p className="text-xs text-slate-500">{booking.service}</p>
                                </div>
                                <div className="text-right">
                                    <div className="font-bold text-sm text-dark-surface">{booking.price}</div>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${booking.status === 'Completed' ? 'bg-green-50 text-green-600' :
                                            booking.status === 'Pending' ? 'bg-orange-50 text-orange-600' :
                                                'bg-red-50 text-red-600'
                                        }`}>
                                        {booking.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-6 py-3 rounded-xl border border-slate-100 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
                        View All Bookings
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Overview;
