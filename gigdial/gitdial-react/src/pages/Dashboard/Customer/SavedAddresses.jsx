import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Plus, Edit2, Trash2, Home, Briefcase, Heart, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const SavedAddresses = () => {
    const navigate = useNavigate();
    const [addresses, setAddresses] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        type: 'home',
        name: '',
        phone: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        pincode: '',
        isDefault: false
    });

    // Fetch addresses from backend
    useEffect(() => {
        fetchAddresses();
    }, []);

    const fetchAddresses = async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            if (!userInfo) return;
            const response = await fetch('/api/users/addresses', {
                headers: {
                    'Authorization': `Bearer ${userInfo?.token}`
                }
            });
            const data = await response.json();
            setAddresses(data);
        } catch (error) {
            console.error('Error fetching addresses:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));

            if (!userInfo || !userInfo.token) {
                alert('Please login to save address');
                navigate('/login');
                return;
            }

            const url = editingId ? `/api/users/addresses/${editingId}` : '/api/users/addresses';
            const method = editingId ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userInfo.token}`
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert(editingId ? 'Address updated successfully!' : 'Address saved successfully!');
                await fetchAddresses();
                setShowAddForm(false);
                setEditingId(null);
                resetForm();
            } else {
                const error = await response.json();
                console.error('Server error:', error);
                alert(`Error: ${error.message || 'Failed to save address'}`);
            }
        } catch (error) {
            console.error('Error saving address:', error);
            alert(`Failed to save address: ${error.message || 'Please try again'}`);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this address?')) return;

        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const response = await fetch(`/api/users/addresses/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${userInfo?.token}`
                }
            });

            if (response.ok) {
                fetchAddresses();
            }
        } catch (error) {
            console.error('Error deleting address:', error);
        }
    };

    const handleEdit = (address) => {
        setFormData(address);
        setEditingId(address._id);
        setShowAddForm(true);
    };

    const resetForm = () => {
        setFormData({
            type: 'home',
            name: '',
            phone: '',
            addressLine1: '',
            addressLine2: '',
            city: '',
            state: '',
            pincode: '',
            isDefault: false
        });
    };

    const getIcon = (type) => {
        switch (type) {
            case 'home': return Home;
            case 'work': return Briefcase;
            case 'other': return MapPin;
            default: return MapPin;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Saved Addresses</h1>
                    <p className="text-slate-500 mt-1">Manage your delivery addresses</p>
                </div>
                <button
                    onClick={() => setShowAddForm(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
                >
                    <Plus size={20} />
                    Add Address
                </button>
            </div>

            {/* Add/Edit Form */}
            {showAddForm && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"
                >
                    <h3 className="text-lg font-bold text-slate-900 mb-4">
                        {editingId ? 'Edit Address' : 'Add New Address'}
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-3 gap-3">
                            {['home', 'work', 'other'].map((type) => (
                                <button
                                    key={type}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, type })}
                                    className={`p-3 rounded-xl border-2 font-bold capitalize transition-all ${formData.type === type
                                        ? 'border-blue-600 bg-blue-50 text-blue-600'
                                        : 'border-slate-200 text-slate-600 hover:border-slate-300'
                                        }`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <input
                                type="tel"
                                placeholder="Phone Number"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <input
                            type="text"
                            placeholder="Address Line 1"
                            value={formData.addressLine1}
                            onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />

                        <input
                            type="text"
                            placeholder="Address Line 2 (Optional)"
                            value={formData.addressLine2}
                            onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <div className="grid md:grid-cols-3 gap-4">
                            <input
                                type="text"
                                placeholder="City"
                                value={formData.city}
                                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                className="px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <input
                                type="text"
                                placeholder="State"
                                value={formData.state}
                                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                                className="px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Pincode"
                                value={formData.pincode}
                                onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                                className="px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.isDefault}
                                onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                                className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="text-slate-700 font-medium">Set as default address</span>
                        </label>

                        <div className="flex gap-3 justify-end">
                            <button
                                type="button"
                                onClick={() => {
                                    setShowAddForm(false);
                                    setEditingId(null);
                                    resetForm();
                                }}
                                className="px-6 py-2 text-slate-600 font-bold rounded-xl hover:bg-slate-100 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors"
                            >
                                {editingId ? 'Update' : 'Save'} Address
                            </button>
                        </div>
                    </form>
                </motion.div>
            )}

            {/* Address List */}
            <div className="grid md:grid-cols-2 gap-4">
                {addresses.map((address) => {
                    const Icon = getIcon(address.type);
                    return (
                        <motion.div
                            key={address._id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all relative"
                        >
                            {address.isDefault && (
                                <div className="absolute top-4 right-4">
                                    <span className="flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-200">
                                        <CheckCircle size={12} />
                                        Default
                                    </span>
                                </div>
                            )}

                            <div className="flex items-start gap-3 mb-4">
                                <div className="p-2 bg-blue-50 rounded-lg">
                                    <Icon size={20} className="text-blue-600" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-slate-900 capitalize">{address.type}</h3>
                                    <p className="text-sm text-slate-500">{address.name} • {address.phone}</p>
                                </div>
                            </div>

                            <p className="text-slate-700 text-sm mb-1">{address.addressLine1}</p>
                            {address.addressLine2 && (
                                <p className="text-slate-700 text-sm mb-1">{address.addressLine2}</p>
                            )}
                            <p className="text-slate-600 text-sm">
                                {address.city}, {address.state} - {address.pincode}
                            </p>

                            <div className="flex gap-2 mt-4 pt-4 border-t border-slate-100">
                                <button
                                    onClick={() => handleEdit(address)}
                                    className="flex-1 flex items-center justify-center gap-2 py-2 text-blue-600 font-bold text-sm hover:bg-blue-50 rounded-lg transition-colors"
                                >
                                    <Edit2 size={14} />
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(address._id)}
                                    className="flex-1 flex items-center justify-center gap-2 py-2 text-red-600 font-bold text-sm hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <Trash2 size={14} />
                                    Delete
                                </button>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {addresses.length === 0 && !showAddForm && (
                <div className="text-center py-12 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                    <MapPin size={48} className="mx-auto text-slate-300 mb-3" />
                    <p className="text-slate-500 font-medium mb-4">No saved addresses yet</p>
                    <button
                        onClick={() => setShowAddForm(true)}
                        className="px-6 py-2 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors"
                    >
                        Add Your First Address
                    </button>
                </div>
            )}
        </div>
    );
};

export default SavedAddresses;
