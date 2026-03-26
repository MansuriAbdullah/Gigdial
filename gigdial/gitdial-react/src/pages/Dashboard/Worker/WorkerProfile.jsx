import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import {
    User, Mail, Phone, MapPin, FileText, Briefcase, Camera, Save, Loader, Trash2, X
} from 'lucide-react';
import { getFullImagePath } from '../../../utils/imagePath';

const WorkerProfile = () => {
    const { user, login } = useAuth(); // Assuming login updates the user state or we need a specific 'updateUser' function from context
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        city: '',
        address: '',
        serviceDescription: '',
        skills: [],
        profileImage: ''
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
                city: user.city || '',
                address: user.address || '',
                serviceDescription: user.serviceDescription || '',
                skills: Array.isArray(user.skills) ? user.skills : [],
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
            } else {
                alert(data.message || 'Image upload failed');
            }
            setUploading(false);
        } catch (error) {
            console.error('Error uploading image:', error);
            setUploading(false);
            alert('Image upload failed');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const token = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).token : null;

            const response = await fetch('/api/users/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    ...formData,
                    skills: formData.skills
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to update profile');
            }

            // Update local user state
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            Object.assign(userInfo, data);
            localStorage.setItem('userInfo', JSON.stringify(userInfo));

            setMessage('Profile updated successfully!');
            // Reload page to reflect context changes if necessary, or rely on context if it pulls from localStorage
            window.location.reload();

        } catch (error) {
            setMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-slate-800">Edit Profile</h1>
                {message && (
                    <span className={`px-4 py-2 rounded-lg text-sm font-bold ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {message}
                    </span>
                )}
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                {/* Profile Header / Image */}
                <div className="p-8 border-b border-slate-100 bg-slate-50 flex flex-col md:flex-row items-center gap-6">
                    <div className="relative">
                        <img
                            src={getFullImagePath(formData.profileImage) || "https://i.pravatar.cc/150?img=11"}
                            alt="Profile"
                            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md bg-slate-200"
                        />
                        <label className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-sm cursor-pointer hover:shadow-lg">
                            <Camera size={16} />
                            <input type="file" hidden onChange={uploadFileHandler} />
                        </label>
                        {uploading && (
                            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center">
                                <Loader className="text-white animate-spin" size={24} />
                            </div>
                        )}
                    </div>
                    <div className="text-center md:text-left">
                        <h2 className="text-xl font-bold text-slate-800">{user?.name}</h2>
                        <p className="text-slate-500">{user?.role === 'worker' ? 'Service Provider' : 'User'}</p>
                    </div>
                </div>

                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Basic Info */}
                    <div className="space-y-4">
                        <label className="block">
                            <span className="text-sm font-bold text-slate-700 mb-1 block">Full Name</span>
                            <div className="relative">
                                <User className="absolute left-3 top-3 text-slate-400" size={18} />
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                                />
                            </div>
                        </label>
                        <label className="block">
                            <span className="text-sm font-bold text-slate-700 mb-1 block">Email Address</span>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 text-slate-400" size={18} />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    disabled
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 cursor-not-allowed"
                                />
                            </div>
                        </label>
                        <label className="block">
                            <span className="text-sm font-bold text-slate-700 mb-1 block">Phone Number</span>
                            <div className="relative">
                                <Phone className="absolute left-3 top-3 text-slate-400" size={18} />
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                                />
                            </div>
                        </label>
                    </div>

                    {/* Location & Professional */}
                    <div className="space-y-4">
                        <label className="block">
                            <span className="text-sm font-bold text-slate-700 mb-1 block">City</span>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-3 text-slate-400" size={18} />
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                                />
                            </div>
                        </label>
                        <label className="block">
                            <span className="text-sm font-bold text-slate-700 mb-1 block">Address</span>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-3 text-slate-400" size={18} />
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                                />
                            </div>
                        </label>
                        <div className="space-y-2">
                            <span className="text-sm font-bold text-slate-700 mb-1 block">Skills & Expertise</span>
                            <div className="flex flex-wrap gap-2 mb-3 min-h-[42px] p-3 rounded-2xl border border-slate-100 bg-slate-50/50">
                                {Array.isArray(formData.skills) && formData.skills.length > 0 ? (
                                    formData.skills.map((skill, index) => (
                                        <div 
                                            key={index}
                                            className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg flex items-center gap-2 group hover:border-red-200 hover:bg-red-50 transition-all shadow-sm"
                                        >
                                            <span className="text-sm font-bold text-slate-700 group-hover:text-red-700">{skill}</span>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const newSkills = formData.skills.filter((_, i) => i !== index);
                                                    setFormData({ ...formData, skills: newSkills });
                                                }}
                                                className="text-slate-400 hover:text-red-600 transition-colors"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <span className="text-xs text-slate-400 italic">No skills added yet...</span>
                                )}
                            </div>
                            <div className="relative">
                                <Briefcase className="absolute left-3 top-3 text-slate-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Add a skill (e.g. Plumbing) and press Enter"
                                    className="w-full pl-10 pr-12 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            const value = e.target.value.trim();
                                            if (value && !formData.skills.includes(value)) {
                                                setFormData({ ...formData, skills: [...formData.skills, value] });
                                                e.target.value = '';
                                            }
                                        }
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        const input = e.currentTarget.previousSibling;
                                        const value = input.value.trim();
                                        if (value && !formData.skills.includes(value)) {
                                            setFormData({ ...formData, skills: [...formData.skills, value] });
                                            input.value = '';
                                        }
                                    }}
                                    className="absolute right-2 top-1.5 p-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all font-black text-xs px-3"
                                >
                                    ADD
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Bio - Full Width */}
                    <div className="md:col-span-2">
                        <label className="block">
                            <span className="text-sm font-bold text-slate-700 mb-1 block">About Me (Bio)</span>
                            <div className="relative">
                                <FileText className="absolute left-3 top-3 text-slate-400" size={18} />
                                <textarea
                                    name="serviceDescription"
                                    value={formData.serviceDescription}
                                    onChange={handleChange}
                                    rows="4"
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
                                    placeholder="Tell customers about your experience and expertise..."
                                ></textarea>
                            </div>
                        </label>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                    <button type="button" className="px-6 py-2.5 rounded-xl font-bold text-slate-600 hover:bg-slate-200 transition-colors">
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? <Loader className="animate-spin" size={18} /> : <Save size={18} />}
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default WorkerProfile;
