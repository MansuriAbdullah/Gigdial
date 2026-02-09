import React, { useState } from 'react';
import {
    User, Smartphone, Mail, Globe, Bell, Shield, Eye, Lock, MapPin,
    CreditCard, Check, HelpCircle, FileText, PhoneCall, MessageSquare, Briefcase, ExternalLink, ChevronRight
} from 'lucide-react';

const Settings = () => {
    // State for toggles
    const [notifications, setNotifications] = useState({
        jobRequests: { push: true, email: true, sms: true },
        jobConfirmations: { push: true, email: false, sms: true },
        paymentReceived: { push: true, email: true, sms: false },
        customerReviews: { push: true, email: false, sms: false },
        promotionalOffers: { push: false, email: true, sms: false },
    });

    const [privacy, setPrivacy] = useState({
        profileVisibility: true,
        showPhone: false,
        locationSharing: true,
        twoFactor: true,
    });

    const toggleNotification = (type, channel) => {
        setNotifications(prev => ({
            ...prev,
            [type]: { ...prev[type], [channel]: !prev[type][channel] }
        }));
    };

    const togglePrivacy = (key) => {
        setPrivacy(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="max-w-5xl mx-auto space-y-10 pb-20 animate-fade-in font-sans text-slate-800">

            {/* Page Header */}
            <div>
                <h1 className="text-3xl font-display font-bold text-slate-900">Settings</h1>
                <p className="text-slate-500 mt-1">Manage your account preferences, notifications, and subscription</p>
            </div>

            {/* 1. Account Settings */}
            <section className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-slate-50">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-blue-600 rounded-xl text-white">
                            <User size={20} />
                        </div>
                        <h2 className="text-xl font-bold text-slate-900">Personal Information</h2>
                    </div>
                </div>
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-bold text-slate-700">Full Name</label>
                        <input type="text" defaultValue="Rajesh Kumar" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:border-blue-600 outline-none transition-all font-medium text-slate-900" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Phone Number</label>
                        <input type="text" defaultValue="+91 98765 43210" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:border-blue-600 outline-none transition-all font-medium text-slate-900" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Email Address</label>
                        <input type="email" defaultValue="rajesh.kumar@email.com" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:border-blue-600 outline-none transition-all font-medium text-slate-900" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-bold text-slate-700">Language Preference</label>
                        <div className="relative">
                            <select className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:border-blue-600 outline-none transition-all font-medium text-slate-900 appearance-none cursor-pointer">
                                <option>Hindi</option>
                                <option>English</option>
                                <option>Gujarati</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                <ChevronRight className="rotate-90" size={16} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Notification Preferences */}
            <section className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-slate-50">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-orange-400 rounded-xl text-white">
                            <Bell size={20} />
                        </div>
                        <h2 className="text-xl font-bold text-slate-900">Notification Preferences</h2>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr>
                                <th className="p-6 pl-8 text-xs font-bold text-slate-500 uppercase tracking-wider w-1/2">Notification Type</th>
                                <th className="p-6 text-center text-xs font-bold text-slate-500 uppercase tracking-wider">Push</th>
                                <th className="p-6 text-center text-xs font-bold text-slate-500 uppercase tracking-wider">Email</th>
                                <th className="p-6 pr-8 text-center text-xs font-bold text-slate-500 uppercase tracking-wider">SMS</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {[
                                { key: 'jobRequests', label: 'New Job Requests', desc: 'Get notified when customers request your services' },
                                { key: 'jobConfirmations', label: 'Job Confirmations', desc: 'Alerts when a job is confirmed or scheduled' },
                                { key: 'paymentReceived', label: 'Payment Received', desc: 'Notifications when you receive payments' },
                                { key: 'customerReviews', label: 'Customer Reviews', desc: 'When customers leave reviews or ratings' },
                                { key: 'promotionalOffers', label: 'Promotional Offers', desc: 'Special offers and platform updates' },
                            ].map((item) => (
                                <tr key={item.key} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="p-6 pl-8">
                                        <p className="font-bold text-slate-900 text-sm">{item.label}</p>
                                        <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                                    </td>
                                    {['push', 'email', 'sms'].map(channel => (
                                        <td key={channel} className="p-6 text-center">
                                            <button
                                                onClick={() => toggleNotification(item.key, channel)}
                                                className={`w-12 h-7 rounded-full transition-colors relative ${notifications[item.key][channel] ? 'bg-green-500' : 'bg-slate-200'}`}
                                            >
                                                <div className={`w-5 h-5 bg-white rounded-full shadow-sm absolute top-1 transition-transform ${notifications[item.key][channel] ? 'left-6' : 'left-1'}`}></div>
                                            </button>
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* 3. Privacy & Safety */}
            <section className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-slate-50">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-red-600 rounded-xl text-white">
                            <Shield size={20} />
                        </div>
                        <h2 className="text-xl font-bold text-slate-900">Privacy & Safety</h2>
                    </div>
                </div>
                <div className="p-8 space-y-8">
                    {[
                        { key: 'profileVisibility', label: 'Profile Visibility', desc: 'Make your profile visible to customers searching for services' },
                        { key: 'showPhone', label: 'Show Phone Number', desc: 'Display your phone number on your public profile' },
                        { key: 'locationSharing', label: 'Location Sharing', desc: 'Allow customers to see your approximate location for nearby services' },
                        { key: 'twoFactor', label: 'Two-Factor Authentication', desc: 'Add an extra layer of security to your account' },
                    ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between">
                            <div>
                                <h4 className="font-bold text-slate-900 text-sm">{item.label}</h4>
                                <p className="text-xs text-slate-500 mt-1 max-w-md">{item.desc}</p>
                            </div>
                            <button
                                onClick={() => togglePrivacy(item.key)}
                                className={`w-12 h-7 rounded-full transition-colors relative shrink-0 ${privacy[item.key] ? 'bg-green-500' : 'bg-slate-200'}`}
                            >
                                <div className={`w-5 h-5 bg-white rounded-full shadow-sm absolute top-1 transition-transform ${privacy[item.key] ? 'left-6' : 'left-1'}`}></div>
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* 4. Subscription & Billing */}
            <section className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-slate-50">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-green-500 rounded-xl text-white">
                            <CreditCard size={20} />
                        </div>
                        <h2 className="text-xl font-bold text-slate-900">Subscription & Billing</h2>
                    </div>
                </div>

                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Free Plan */}
                    <div className="border border-slate-200 rounded-[1.5rem] p-6 flex flex-col items-center text-center">
                        <h3 className="text-lg font-bold text-slate-900 mb-2">Free Plan</h3>
                        <div className="flex items-end gap-1 mb-6">
                            <span className="text-4xl font-extrabold text-slate-900">₹0</span>
                            <span className="text-slate-500 pb-1 font-medium">/month</span>
                        </div>

                        <div className="space-y-3 w-full mb-8 text-left">
                            {['Basic profile listing', 'Up to 10 job requests/month', 'Standard customer support'].map((feat, i) => (
                                <div key={i} className="flex items-center gap-3 text-sm text-slate-700">
                                    <Check size={16} className="text-green-500 shrink-0" /> {feat}
                                </div>
                            ))}
                            {['Priority job visibility', 'Advanced analytics', 'Premium badge', 'Marketing tools'].map((feat, i) => (
                                <div key={i} className="flex items-center gap-3 text-sm text-slate-400">
                                    <div className="w-4 h-4 flex items-center justify-center"><div className="w-3 h-[1px] bg-slate-300 rotate-45 transform origin-center absolute"></div><div className="w-3 h-[1px] bg-slate-300 -rotate-45 transform origin-center absolute"></div></div> {feat}
                                </div>
                            ))}
                        </div>
                        <button className="w-full py-3 bg-slate-100 text-slate-600 font-bold rounded-xl mt-auto hover:bg-slate-200 transition-colors">
                            Current Plan
                        </button>
                    </div>

                    {/* Premium Plan */}
                    <div className="border-2 border-green-500 rounded-[1.5rem] p-6 flex flex-col items-center text-center relative overflow-hidden bg-white shadow-xl shadow-green-100/50">
                        <div className="absolute top-0 right-0 bg-green-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">Recommended</div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">Premium Plan</h3>
                        <div className="flex items-end gap-1 mb-6">
                            <span className="text-4xl font-extrabold text-green-500">₹499</span>
                            <span className="text-slate-500 pb-1 font-medium">/month</span>
                        </div>

                        <div className="space-y-3 w-full mb-8 text-left">
                            {['Enhanced profile with photos', 'Unlimited job requests', '24/7 priority support', 'Priority job visibility', 'Advanced analytics dashboard', 'Premium verified badge', 'Marketing & promotion tools'].map((feat, i) => (
                                <div key={i} className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                                    <Check size={16} className="text-green-500 shrink-0" /> {feat}
                                </div>
                            ))}
                        </div>
                        <button className="w-full py-3 bg-green-500 text-white font-bold rounded-xl mt-auto shadow-lg shadow-green-200 hover:bg-green-600 hover:shadow-green-300 transition-all active:scale-95">
                            Upgrade to Premium
                        </button>
                    </div>
                </div>

                <div className="px-8 pb-8">
                    <div className="bg-green-50 border border-green-100 rounded-xl p-4 flex items-center gap-4">
                        <div className="text-2xl">🎁</div>
                        <div>
                            <h4 className="font-bold text-green-800 text-sm">Special Offer: Get 2 months free on annual subscription!</h4>
                            <p className="text-xs text-green-700 mt-1">Save ₹998 when you upgrade to Premium Annual Plan (₹4,990/year)</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Help & Support */}
            <section className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-slate-50">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-blue-500 rounded-xl text-white">
                            <HelpCircle size={20} />
                        </div>
                        <h2 className="text-xl font-bold text-slate-900">Help & Support</h2>
                    </div>
                </div>
                <div className="p-6">
                    {[
                        { icon: FileText, title: 'Help Center', subtitle: 'Browse FAQs and guides' },
                        { icon: MessageSquare, title: 'Contact Support', subtitle: 'Chat with our support team' },
                        { icon: PhoneCall, title: 'Call Us', subtitle: '1800-GIG-HELP (24/7)' },
                        { icon: Shield, title: 'Terms & Privacy', subtitle: 'Read our policies' },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-4 p-4 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors group">
                            <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-500 group-hover:bg-white group-hover:shadow-sm">
                                <item.icon size={20} />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                                <p className="text-xs text-slate-500">{item.subtitle}</p>
                            </div>
                            <ChevronRight size={16} className="text-slate-300 group-hover:text-primary" />
                        </div>
                    ))}
                </div>
            </section>

            {/* Sticky Footer */}
            <div className="sticky bottom-4 z-10 flex justify-end">
                <button className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold shadow-xl hover:bg-slate-800 transition-all flex items-center gap-2">
                    <Check size={18} />
                    Save All Settings
                </button>
            </div>

        </div>
    );
};

export default Settings;
