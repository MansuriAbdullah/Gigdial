import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import {
    User, Mail, Phone, MapPin, Camera, Save, Loader, Lock, Shield, ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { getFullImagePath } from '../../../utils/imagePath';

const CustomerProfile = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        city: '',
        address: '',
        profileImage: '',
        password: '',
        confirmPassword: ''
    });

    useEffect(() => {
        if (user) {
            setFormData({
                ...formData,
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
                city: user.city || '',
                address: user.address || '',
                profileImage: user.profileImage || ''
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formDataFile = new FormData();
        formDataFile.append('image', file);
        setUploading(true);

        try {
            const token = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).token : null;
            const response = await fetch('/api/upload', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formDataFile
            });
            const data = await response.json();

            if (response.ok) {
                setFormData({ ...formData, profileImage: data.image });
                setMessage({ text: 'Image uploaded! Save changes to apply.', type: 'success' });
            } else {
                setMessage({ text: data.message || 'Image upload failed', type: 'error' });
            }
            setUploading(false);
        } catch (error) {
            console.error('Error uploading image:', error);
            setUploading(false);
            setMessage({ text: 'Image upload failed', type: 'error' });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password && formData.password !== formData.confirmPassword) {
            setMessage({ text: 'Passwords do not match', type: 'error' });
            return;
        }

        setLoading(true);
        setMessage({ text: '', type: '' });

        try {
            const token = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).token : null;

            const response = await fetch('/api/users/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: formData.name,
                    phone: formData.phone,
                    city: formData.city,
                    address: formData.address,
                    profileImage: formData.profileImage,
                    password: formData.password || undefined
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to update profile');
            }

            // Update local user state
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const updatedUserInfo = { ...userInfo, ...data };
            localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));

            setMessage({ text: 'Profile updated successfully!', type: 'success' });

            // Reload after short delay to show success message
            setTimeout(() => {
                window.location.reload();
            }, 1500);

        } catch (error) {
            setMessage({ text: error.message, type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Personal Profile</h1>
                    <p className="text-slate-500 font-medium">Manage your personal information and security settings</p>
                </div>
                {message.text && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`px-4 py-3 rounded-2xl text-sm font-bold flex items-center gap-2 shadow-sm ${message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'
                            }`}
                    >
                        {message.type === 'success' ? <Shield size={18} /> : <AlertCircle size={18} />}
                        {message.text}
                    </motion.div>
                )}
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Avatar & Quick Links */}
                <div className="space-y-8">
                    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8 text-center relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-blue-500/10 transition-colors duration-500"></div>

                        <div className="relative mx-auto w-32 h-32 mb-6">
                            <div className="w-full h-full rounded-full border-[6px] border-slate-50 shadow-inner overflow-hidden bg-slate-100">
                                <img
                                    src={getFullImagePath(formData.profileImage) || "https://i.pravatar.cc/150?img=11"}
                                    alt="Profile"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                            <label className="absolute bottom-0 right-0 p-3 bg-slate-900 text-white rounded-2xl hover:bg-blue-600 transition-all shadow-xl cursor-pointer hover:scale-110 active:scale-95">
                                <Camera size={20} />
                                <input type="file" hidden onChange={uploadFileHandler} />
                            </label>
                            {uploading && (
                                <div className="absolute inset-0 bg-white/60 backdrop-blur-sm rounded-full flex items-center justify-center">
                                    <Loader className="text-blue-600 animate-spin" size={32} />
                                </div>
                            )}
                        </div>

                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">{user?.name}</h2>
                        <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mt-1">Valued Customer</p>

                        <div className="mt-8 pt-8 border-t border-slate-50 grid grid-cols-2 gap-4">
                            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Bookings</p>
                                <p className="text-xl font-black text-slate-900">12</p>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Spent</p>
                                <p className="text-xl font-black text-slate-900">₹4.2k</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-6 space-y-2">
                        <button type="button" className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-blue-50 text-slate-600 hover:text-blue-600 transition-all font-bold text-sm group">
                            <span className="flex items-center gap-3"><Shield size={18} /> Account Security</span>
                            <ChevronRight size={16} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button type="button" className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-rose-50 text-slate-600 hover:text-rose-600 transition-all font-bold text-sm group">
                            <span className="flex items-center gap-3"><Lock size={18} /> Privacy Settings</span>
                            <ChevronRight size={16} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>

                {/* Right Column: Form Fields */}
                <div className="lg:col-span-2 space-y-8">
                    {/* General Information */}
                    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                        <div className="px-8 py-6 border-b border-slate-50 bg-slate-50/50">
                            <h3 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                                <User size={20} className="text-blue-600" /> General Information
                            </h3>
                        </div>
                        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-300">
                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                                        <User size={18} />
                                    </div>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50 text-slate-900 font-bold focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/5 outline-none transition-all placeholder:text-slate-300"
                                        placeholder="Your full name"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                        <Mail size={18} />
                                    </div>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        disabled
                                        className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-100 bg-slate-200 text-slate-500 font-bold cursor-not-allowed outline-none"
                                    />
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                        <Shield size={16} className="text-emerald-500" />
                                    </div>
                                </div>
                                <p className="text-[10px] text-slate-400 font-bold italic ml-1">* Email cannot be changed for security reasons</p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                                        <Phone size={18} />
                                    </div>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50 text-slate-900 font-bold focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/5 outline-none transition-all placeholder:text-slate-300"
                                        placeholder="+91 ······"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Current City</label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                                        <MapPin size={18} />
                                    </div>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50 text-slate-900 font-bold focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/5 outline-none transition-all placeholder:text-slate-300"
                                        placeholder="City name"
                                    />
                                </div>
                            </div>

                            <div className="md:col-span-2 space-y-2">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Complete Address</label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-4 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                                        <MapPin size={18} />
                                    </div>
                                    <textarea
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        rows="3"
                                        className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50 text-slate-900 font-bold focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/5 outline-none transition-all resize-none placeholder:text-slate-300"
                                        placeholder="Building, street, and area details..."
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Change Password */}
                    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                        <div className="px-8 py-6 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
                            <h3 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                                <Lock size={20} className="text-rose-600" /> Change Password
                            </h3>
                            <span className="text-[10px] bg-rose-50 text-rose-600 px-2 py-0.5 rounded-full font-black uppercase tracking-widest border border-rose-100 italic">Optional</span>
                        </div>
                        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">New Password</label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-rose-600 transition-colors">
                                        <Lock size={18} />
                                    </div>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50 text-slate-900 font-bold focus:border-rose-500 focus:bg-white focus:ring-4 focus:ring-rose-500/5 outline-none transition-all placeholder:text-slate-300"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Confirm New Password</label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-rose-600 transition-colors">
                                        <Lock size={18} />
                                    </div>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50 text-slate-900 font-bold focus:border-rose-500 focus:bg-white focus:ring-4 focus:ring-rose-500/5 outline-none transition-all placeholder:text-slate-300"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Submit Bar */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-end items-center pt-4">
                        <button type="button" onClick={() => window.location.reload()} className="w-full sm:w-auto px-10 py-4 rounded-2xl font-black text-slate-500 hover:bg-slate-100 transition-all text-sm uppercase tracking-widest active:scale-95">
                            Reset Fields
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full sm:w-auto px-10 py-5 bg-slate-900 text-white font-black rounded-[2rem] hover:bg-blue-600 transition-all shadow-xl shadow-slate-900/10 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3 text-sm uppercase tracking-widest"
                        >
                            {loading ? <Loader className="animate-spin" size={20} /> : <Save size={20} />}
                            Update Profile
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CustomerProfile;
