import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart2, TrendingUp, Users, ShoppingBag, ArrowUpRight, DollarSign } from 'lucide-react';

const ChartBar = ({ height, label, color, value }) => (
    <div className="flex flex-col items-center justify-end gap-2 h-full flex-1 group relative">
        <div className="absolute -top-8 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-xs py-1 px-2 rounded pointer-events-none">
            {value}
        </div>
        <motion.div
            initial={{ height: 0 }}
            animate={{ height: height }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className={`w-full max-w-[40px] ${color} rounded-t-lg opacity-80 hover:opacity-100 transition-opacity`}
        />
        <span className="text-xs text-slate-400 font-medium rotate-0 sm:rotate-0">{label}</span>
    </div>
);

const AdminAnalytics = () => {
    // Mock Data
    const dailySignups = [
        { day: 'Mon', val: 45 }, { day: 'Tue', val: 32 }, { day: 'Wed', val: 56 }, { day: 'Thu', val: 48 }, { day: 'Fri', val: 72 }, { day: 'Sat', val: 38 }, { day: 'Sun', val: 24 }
    ];

    const topServices = [
        { name: 'Home Cleaning', count: 1240, revenue: '$24,800', growth: '+12%' },
        { name: 'AC Repair', count: 985, revenue: '$18,500', growth: '+8%' },
        { name: 'Plumbing', count: 850, revenue: '$12,400', growth: '+15%' },
        { name: 'Hair Services', count: 620, revenue: '$15,200', growth: '+5%' },
    ];

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Analytics & Reports</h1>
                    <p className="text-slate-500 mt-2">Platform performance insights and metrics.</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50">Export Report</button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700">Last 30 Days</button>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* 1. Daily Signups Chart */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                            <Users size={18} className="text-blue-500" /> Daily User Signups
                        </h3>
                        <div className="text-green-600 text-sm font-bold flex items-center gap-1">
                            <TrendingUp size={14} /> +12% vs last week
                        </div>
                    </div>
                    <div className="h-64 flex items-end justify-between gap-2">
                        {dailySignups.map((d, i) => (
                            <ChartBar key={i} height={`${d.val}%`} label={d.day} value={d.val} color="bg-blue-500" />
                        ))}
                    </div>
                </div>

                {/* 3. Revenue Trends Chart (Simulated) */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                            <DollarSign size={18} className="text-green-500" /> Revenue Trends
                        </h3>
                        <div className="text-green-600 text-sm font-bold flex items-center gap-1">
                            <ArrowUpRight size={14} /> +8.5% Growth
                        </div>
                    </div>
                    <div className="h-64 flex items-end justify-between gap-1">
                        {[40, 65, 55, 80, 45, 90, 70, 85, 60, 95, 75, 80].map((h, i) => (
                            <ChartBar
                                key={i}
                                height={`${h}%`}
                                label={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]}
                                value={`$${h}k`}
                                color="bg-green-500"
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* 2. Top Services List */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        <ShoppingBag size={18} className="text-purple-500" /> Top Performing Services
                    </h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100">
                                <th className="px-6 py-4 font-semibold text-slate-600 text-sm">Service Name</th>
                                <th className="px-6 py-4 font-semibold text-slate-600 text-sm">Total Bookings</th>
                                <th className="px-6 py-4 font-semibold text-slate-600 text-sm">Total Revenue</th>
                                <th className="px-6 py-4 font-semibold text-slate-600 text-sm">Growth</th>
                                <th className="px-6 py-4 font-semibold text-slate-600 text-sm text-right">Performance</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {topServices.map((service, i) => (
                                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4 font-bold text-slate-800">{service.name}</td>
                                    <td className="px-6 py-4 text-slate-600">{service.count}</td>
                                    <td className="px-6 py-4 text-slate-900 font-bold">{service.revenue}</td>
                                    <td className="px-6 py-4 text-green-600 font-bold">{service.growth}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="w-32 ml-auto bg-slate-100 rounded-full h-2 overflow-hidden">
                                            <div className="bg-purple-500 h-full rounded-full" style={{ width: `${Math.random() * 40 + 60}%` }}></div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminAnalytics;
