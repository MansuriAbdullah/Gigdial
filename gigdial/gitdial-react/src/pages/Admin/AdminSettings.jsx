import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Bell, Lock, Globe, Smartphone, Mail, Moon, Volume2 } from 'lucide-react';

const Toggle = ({ enabled, setEnabled }) => (
    <div
        onClick={() => setEnabled(!enabled)}
        className={`w-12 h-7 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${enabled ? 'bg-blue-600' : 'bg-slate-200'}`}
    >
        <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${enabled ? 'translate-x-5' : 'translate-x-0'}`} />
    </div>
);

const SettingSection = ({ title, icon: Icon, children }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-6 hover:shadow-md transition-shadow"
    >
        <div className="flex items-center gap-3 mb-6 border-b border-slate-50 pb-4">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <Icon size={20} />
            </div>
            <h3 className="font-bold text-lg text-slate-900">{title}</h3>
        </div>
        <div className="space-y-6">
            {children}
        </div>
    </motion.div>
);

const AdminSettings = () => {
    const [maintenance, setMaintenance] = useState(false);
    const [emailNotifs, setEmailNotifs] = useState(true);
    const [smsNotifs, setSmsNotifs] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Platform Settings</h1>
                    <p className="text-slate-500 mt-2">Configure system-wide preferences and controls.</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 shadow-lg hover:shadow-xl transition-all">
                    <Save size={18} /> Save Changes
                </button>
            </div>

            <SettingSection title="General" icon={Globe}>
                <div className="flex items-center justify-between">
                    <div>
                        <h4 className="font-semibold text-slate-900">Maintenance Mode</h4>
                        <p className="text-sm text-slate-500">Disable customer access for updates.</p>
                    </div>
                    <Toggle enabled={maintenance} setEnabled={setMaintenance} />
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <h4 className="font-semibold text-slate-900">System Theme</h4>
                        <p className="text-sm text-slate-500">Default theme for new visitors.</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="px-3 py-1.5 bg-slate-100 rounded-lg text-sm font-medium hover:bg-slate-200">Light</button>
                        <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-500 hover:text-slate-900">Dark</button>
                    </div>
                </div>
            </SettingSection>

            <SettingSection title="Notifications" icon={Bell}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Mail className="text-slate-400" size={18} />
                        <div>
                            <h4 className="font-semibold text-slate-900">Email Alerts</h4>
                            <p className="text-sm text-slate-500">Receive daily digest of activities.</p>
                        </div>
                    </div>
                    <Toggle enabled={emailNotifs} setEnabled={setEmailNotifs} />
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Smartphone className="text-slate-400" size={18} />
                        <div>
                            <h4 className="font-semibold text-slate-900">SMS Notifications</h4>
                            <p className="text-sm text-slate-500">Get critical alerts on phone.</p>
                        </div>
                    </div>
                    <Toggle enabled={smsNotifs} setEnabled={setSmsNotifs} />
                </div>
            </SettingSection>

            <SettingSection title="Security & Access" icon={Lock}>
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Admin Session Timeout</label>
                    <select className="w-full md:w-1/2 p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-slate-700">
                        <option>15 Minutes</option>
                        <option>30 Minutes</option>
                        <option>1 Hour</option>
                        <option>4 Hours</option>
                    </select>
                </div>
                <div className="pt-4 border-t border-slate-50">
                    <button className="text-red-500 font-bold hover:underline text-sm">Reset All Active Sessions</button>
                </div>
            </SettingSection>
        </div>
    );
};

export default AdminSettings;
