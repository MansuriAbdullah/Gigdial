import React, { useState } from 'react';
import { Bell, Lock, Globe, CreditCard, Shield, Eye, EyeOff, Save } from 'lucide-react';

const WorkerSettings = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [settings, setSettings] = useState({
        emailNotifications: true,
        smsNotifications: false,
        pushNotifications: true,
        bookingAlerts: true,
        paymentAlerts: true,
        language: 'English',
        twoFactorAuth: false,
        profileVisibility: 'public'
    });

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const handleToggle = (key) => {
        setSettings({ ...settings, [key]: !settings[key] });
    };

    const handlePasswordUpdate = async () => {
        if (!password) return alert('Please enter a new password');
        try {
            const response = await fetch('/api/users/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userInfo?.token}`
                },
                body: JSON.stringify({ password })
            });
            const data = await response.json();
            if (response.ok) {
                alert('Password updated successfully');
                setPassword('');
            } else {
                alert(data.message || 'Failed to update password');
            }
        } catch (error) {
            console.error(error);
            alert('Error updating password');
        }
    };

    const handleSaveSettings = () => {
        // Mock save implementation since schema doesn't support these settings yet
        localStorage.setItem('workerSettings', JSON.stringify(settings));
        alert('Settings saved successfully!');
    };

    return (
        <div className="space-y-6 max-w-4xl">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
                <p className="text-slate-500">Manage your account preferences and security</p>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                        <Bell className="text-blue-600" size={20} />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-slate-900">Notifications</h2>
                        <p className="text-sm text-slate-500">Manage how you receive notifications</p>
                    </div>
                </div>
                <div className="p-6 space-y-4">
                    {[
                        { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive updates via email' },
                        { key: 'smsNotifications', label: 'SMS Notifications', desc: 'Get text message alerts' },
                        { key: 'pushNotifications', label: 'Push Notifications', desc: 'Browser push notifications' },
                        { key: 'bookingAlerts', label: 'Booking Alerts', desc: 'Notify me about new bookings' },
                        { key: 'paymentAlerts', label: 'Payment Alerts', desc: 'Notify me about payments' }
                    ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                            <div>
                                <p className="font-bold text-slate-900">{item.label}</p>
                                <p className="text-sm text-slate-500">{item.desc}</p>
                            </div>
                            <button
                                onClick={() => handleToggle(item.key)}
                                className={`relative w-12 h-6 rounded-full transition-colors ${settings[item.key] ? 'bg-blue-600' : 'bg-slate-300'
                                    }`}
                            >
                                <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${settings[item.key] ? 'translate-x-6' : 'translate-x-0'
                                    }`} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Security */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex items-center gap-3">
                    <div className="p-2 bg-green-50 rounded-lg">
                        <Shield className="text-green-600" size={20} />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-slate-900">Security</h2>
                        <p className="text-sm text-slate-500">Manage your account security settings</p>
                    </div>
                </div>
                <div className="p-6 space-y-4">
                    <div className="space-y-3">
                        <label className="block">
                            <span className="text-sm font-bold text-slate-700 mb-2 block">Change Password</span>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter new password"
                                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 pr-12"
                                />
                                <button
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </label>
                        <button
                            onClick={handlePasswordUpdate}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-bold text-sm"
                        >
                            Update Password
                        </button>
                    </div>

                    <div className="flex items-center justify-between py-3 border-t border-slate-100">
                        <div>
                            <p className="font-bold text-slate-900">Two-Factor Authentication</p>
                            <p className="text-sm text-slate-500">Add an extra layer of security</p>
                        </div>
                        <button
                            onClick={() => handleToggle('twoFactorAuth')}
                            className={`relative w-12 h-6 rounded-full transition-colors ${settings.twoFactorAuth ? 'bg-blue-600' : 'bg-slate-300'
                                }`}
                        >
                            <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${settings.twoFactorAuth ? 'translate-x-6' : 'translate-x-0'
                                }`} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Preferences */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex items-center gap-3">
                    <div className="p-2 bg-purple-50 rounded-lg">
                        <Globe className="text-purple-600" size={20} />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-slate-900">Preferences</h2>
                        <p className="text-sm text-slate-500">Customize your experience</p>
                    </div>
                </div>
                <div className="p-6 space-y-4">
                    <div>
                        <label className="block">
                            <span className="text-sm font-bold text-slate-700 mb-2 block">Language</span>
                            <select
                                value={settings.language}
                                onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium"
                            >
                                <option>English</option>
                                <option>हिंदी (Hindi)</option>
                                <option>ગુજરાતી (Gujarati)</option>
                            </select>
                        </label>
                    </div>

                    <div>
                        <label className="block">
                            <span className="text-sm font-bold text-slate-700 mb-2 block">Profile Visibility</span>
                            <select
                                value={settings.profileVisibility}
                                onChange={(e) => setSettings({ ...settings, profileVisibility: e.target.value })}
                                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium"
                            >
                                <option value="public">Public - Visible to everyone</option>
                                <option value="private">Private - Only visible to customers who book</option>
                            </select>
                        </label>
                    </div>
                </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
                <button
                    onClick={handleSaveSettings}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-600/30 transition-all font-bold"
                >
                    <Save size={20} />
                    Save All Changes
                </button>
            </div>
        </div>
    );
};

export default WorkerSettings;
