import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Trash2, Edit2, Plus, MapPin, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ManageCities = () => {
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newCity, setNewCity] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editName, setEditName] = useState('');
    const { user } = useAuth();
    const token = user?.token;
    const [error, setError] = useState(null);

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    useEffect(() => {
        if (token) {
            fetchCities();
        }
    }, [token]);

    const fetchCities = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/cities', config);
            setCities(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching cities:', error);
            setError('Failed to load cities');
            setLoading(false);
        }
    };

    const handleAddCity = async (e) => {
        e.preventDefault();
        if (!newCity.trim()) return;

        try {
            const { data } = await axios.post('http://localhost:5000/api/cities', { name: newCity }, config);
            setCities([...cities, data]);
            setNewCity('');
        } catch (error) {
            console.error('Error adding city:', error);
            alert(error.response?.data?.message || 'Error adding city');
        }
    };

    const handleDeleteCity = async (id) => {
        if (!window.confirm('Are you sure you want to delete this city?')) return;

        try {
            await axios.delete(`http://localhost:5000/api/cities/${id}`, config);
            setCities(cities.filter(city => city._id !== id));
        } catch (error) {
            console.error('Error deleting city:', error);
            alert('Error deleting city');
        }
    };

    const startEdit = (city) => {
        setEditingId(city._id);
        setEditName(city.name);
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditName('');
    };

    const saveEdit = async (id) => {
        try {
            const { data } = await axios.put(`http://localhost:5000/api/cities/${id}`, { name: editName }, config);
            setCities(cities.map(city => city._id === id ? data : city));
            setEditingId(null);
            setEditName('');
        } catch (error) {
            console.error('Error updating city:', error);
            alert('Error updating city');
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900">Manage Cities</h1>
                <p className="text-slate-500">Add, edit, or remove cities available for selection.</p>
            </div>

            {/* Add City Form */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-8">
                <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Plus size={20} className="text-blue-600" />
                    Add New City
                </h2>
                <form onSubmit={handleAddCity} className="flex gap-3">
                    <input
                        type="text"
                        value={newCity}
                        onChange={(e) => setNewCity(e.target.value)}
                        placeholder="Enter city name..."
                        className="flex-1 px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-700"
                    />
                    <button
                        type="submit"
                        disabled={!newCity.trim()}
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg shadow-blue-600/20"
                    >
                        <Plus size={18} />
                        Add City
                    </button>
                </form>
            </div>

            {/* Cities List */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                    <h3 className="font-bold text-slate-700 flex items-center gap-2">
                        <MapPin size={18} className="text-slate-400" />
                        Available Cities
                        <span className="bg-slate-200 text-slate-600 text-xs px-2 py-0.5 rounded-full">{cities.length}</span>
                    </h3>
                </div>

                {loading ? (
                    <div className="p-8 text-center text-slate-500">Loading cities...</div>
                ) : cities.length === 0 ? (
                    <div className="p-8 text-center text-slate-500">No cities found. Add one above.</div>
                ) : (
                    <div className="divide-y divide-slate-100">
                        <AnimatePresence>
                            {cities.map((city) => (
                                <motion.div
                                    key={city._id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors group"
                                >
                                    {editingId === city._id ? (
                                        <div className="flex-1 flex gap-3 mr-4">
                                            <input
                                                type="text"
                                                value={editName}
                                                onChange={(e) => setEditName(e.target.value)}
                                                className="flex-1 px-3 py-1.5 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm font-medium"
                                                autoFocus
                                            />
                                            <button
                                                onClick={() => saveEdit(city._id)}
                                                className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                                title="Save"
                                            >
                                                <Check size={18} />
                                            </button>
                                            <button
                                                onClick={cancelEdit}
                                                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                                                title="Cancel"
                                            >
                                                <X size={18} />
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <span className="font-medium text-slate-700">{city.name}</span>
                                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => startEdit(city)}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteCity(city._id)}
                                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageCities;
