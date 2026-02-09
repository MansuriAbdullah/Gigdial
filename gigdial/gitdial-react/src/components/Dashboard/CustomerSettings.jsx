import React from 'react';
import { User, Bell, Shield, Lock, Smartphone, Mail, Trash2, Camera, LogOut } from 'lucide-react';

const CustomerSettings = () => {
    return (
        <div className="space-y-8 animate-fade-in pb-10">
            <div>
                <h1 className="text-3xl font-display font-bold text-slate-900">Settings</h1>
                <p className="text-slate-500 mt-1">Manage your account preferences</p>
            </div>

            {/* Profile Section */}
            <div className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm">
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex flex-col items-center gap-4">
                        <div className="relative">
                            <img src="https://i.pravatar.cc/150?img=32" alt="Profile" className="w-28 h-28 rounded-3xl object-cover" />
                            <button className="absolute -bottom-2 -right-2 p-2 bg-primary text-white rounded-xl border-4 border-white shadow-lg shadow-primary/20 hover:bg-primary-dark transition-colors">
                                <Camera size={18} />
                            </button>
                        </div>
                        <div className="text-center">
                            <h2 className="text-xl font-bold text-slate-900">Priya Mehta</h2>
                            <p className="text-slate-500 text-sm">Customer</p>
                        </div>
                    </div>

                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
                            <input type="text" defaultValue="Priya Mehta" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium text-slate-700 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                            <input type="email" defaultValue="priya.m@example.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium text-slate-700 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Phone Number</label>
                            <input type="tel" defaultValue="+91 98765 43210" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium text-slate-700 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider opacity-0">Action</label>
                            <button className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10">
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Notification Preferences */}
            <div className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                        <Bell size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">Notifications</h3>
                </div>

                <div className="space-y-4">
                    {[
                        { title: 'Booking Updates', desc: 'Get notified about booking status changes', email: true, sms: true },
                        { title: 'Promotions & Offers', desc: 'Receive emails about new discounts', email: true, sms: false },
                        { title: 'Security Alerts', desc: 'Login alerts and password changes', email: true, sms: true },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between py-4 border-b border-slate-50 last:border-0">
                            <div>
                                <p className="font-bold text-slate-900">{item.title}</p>
                                <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                            </div>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <div className={`w-10 h-6 rounded-full p-1 transition-colors ${item.email ? 'bg-primary' : 'bg-slate-200'}`}>
                                        <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${item.email ? 'translate-x-4' : ''}`}></div>
                                    </div>
                                    <span className="text-xs font-bold text-slate-500">Email</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <div className={`w-10 h-6 rounded-full p-1 transition-colors ${item.sms ? 'bg-primary' : 'bg-slate-200'}`}>
                                        <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${item.sms ? 'translate-x-4' : ''}`}></div>
                                    </div>
                                    <span className="text-xs font-bold text-slate-500">SMS</span>
                                </label>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Security */}
            <div className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                        <Shield size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">Security</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Current Password</label>
                        <input type="password" placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">New Password</label>
                        <input type="password" placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                    </div>
                    <div>
                        <button className="px-6 py-3 border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors">
                            Update Password
                        </button>
                    </div>
                </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-red-50 rounded-[2rem] p-8 border border-red-100">
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-red-600 mb-1">Delete Account</h3>
                        <p className="text-red-400 text-sm">Permanently delete your account and all data.</p>
                    </div>
                    <button className="px-6 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors flex items-center gap-2 shadow-lg shadow-red-600/20">
                        <Trash2 size={18} />
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CustomerSettings;
