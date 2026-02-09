import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Eye, Clock, MapPin, DollarSign, Plus } from 'lucide-react';

const mockServices = [
    {
        id: 1,
        title: "Professional Home Cleaning",
        provider: "Priya Sharma",
        providerImg: "https://i.pravatar.cc/150?img=5",
        category: "Cleaning",
        price: "$40/hr",
        location: "Mumbai, MH",
        submitted: "2 hours ago",
        image: "https://images.unsplash.com/photo-1581578731117-104f8a746929?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 2,
        title: "Wedding Photography Package",
        provider: "Rahul Verma",
        providerImg: "https://i.pravatar.cc/150?img=3",
        category: "Photography",
        price: "$500/day",
        location: "Delhi, DL",
        submitted: "5 hours ago",
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 3,
        title: "Advanced React.js Tutoring",
        provider: "Amit Patel",
        providerImg: "https://i.pravatar.cc/150?img=11",
        category: "Education",
        price: "$25/hr",
        location: "Online",
        submitted: "1 day ago",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=400&q=80"
    }
];

const ServiceApprovals = () => {
    const [services, setServices] = useState(mockServices);
    const [activeTab, setActiveTab] = useState('approvals');
    const [loading, setLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        city: '',
        price: '',
        description: '',
        coverImage: ''
    });

    // Mock Categories
    const [categories, setCategories] = useState([
        { id: 1, name: 'Home Cleaning', count: 156, image: "https://images.unsplash.com/photo-1581578731117-104f8a746929?auto=format&fit=crop&w=100&q=80" },
        { id: 2, name: 'Plumbing', count: 98, image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=100&q=80" },
        { id: 3, name: 'Electrical', count: 124, image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=100&q=80" },
        { id: 4, name: 'Beauty & Salon', count: 210, image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=100&q=80" }
    ]);

    const handleAction = (id) => {
        setServices(services.filter(s => s.id !== id));
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddService = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const res = await fetch('/api/gigs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userInfo.token}`
                },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                alert('Service Added Successfully!');
                setFormData({ title: '', category: '', city: '', price: '', description: '', coverImage: '' });
            } else {
                alert('Failed to add service');
            }
        } catch (err) {
            console.error(err);
            alert('Error adding service');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Services & Categories</h1>
                    <p className="text-slate-500 mt-2">Manage service categories, add new services, and approve worker requests.</p>
                </div>
                <div className="flex bg-slate-100 p-1 rounded-xl">
                    <button
                        onClick={() => setActiveTab('approvals')}
                        className={`px-6 py-2 rounded-lg font-bold text-sm transition-all ${activeTab === 'approvals' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        Approvals <span className="ml-2 bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded text-xs">{services.length}</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('add-service')}
                        className={`px-6 py-2 rounded-lg font-bold text-sm transition-all ${activeTab === 'add-service' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        Add Service
                    </button>
                    <button
                        onClick={() => setActiveTab('categories')}
                        className={`px-6 py-2 rounded-lg font-bold text-sm transition-all ${activeTab === 'categories' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        Categories
                    </button>
                </div>
            </div>

            {/* Approvals Tab */}
            {activeTab === 'approvals' && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence>
                        {services.map((service) => (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                layout
                                className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden"
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <img src={service.image} alt={service.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-700 shadow-sm">
                                        {service.category}
                                    </div>
                                </div>
                                <div className="p-5">
                                    <div className="flex items-center gap-3 mb-3">
                                        <img src={service.providerImg} alt={service.provider} className="w-8 h-8 rounded-full border border-slate-200" />
                                        <span className="text-sm font-medium text-slate-600">{service.provider}</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight group-hover:text-blue-600 transition-colors">
                                        {service.title}
                                    </h3>
                                    <div className="flex items-center gap-4 text-xs font-medium text-slate-500 mb-6">
                                        <span className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded"><MapPin size={12} /> {service.location}</span>
                                        <span className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded"><DollarSign size={12} /> {service.price}</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button onClick={() => handleAction(service.id)} className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-red-100 text-red-600 hover:bg-red-50 font-bold transition-all"><X size={18} /> Reject</button>
                                        <button onClick={() => handleAction(service.id)} className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-green-600 text-white hover:bg-green-700 shadow-lg shadow-green-600/20 font-bold transition-all"><Check size={18} /> Approve</button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    {services.length === 0 && (
                        <div className="col-span-full py-20 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                            <h3 className="text-lg font-bold text-slate-900">All Caught Up!</h3>
                            <p className="text-slate-500">No pending service approvals.</p>
                        </div>
                    )}
                </div>
            )}

            {/* Add Service Tab */}
            {activeTab === 'add-service' && (
                <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm max-w-2xl mx-auto">
                    <h2 className="text-xl font-bold text-slate-900 mb-6">Add New Service</h2>
                    <form onSubmit={handleAddService} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Service Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="e.g. Professional Home Cleaning"
                                required
                            />
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Category</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                >
                                    <option value="">Select Category</option>
                                    {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">City</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="e.g. Mumbai"
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Price (₹)</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Image URL</label>
                                <input
                                    type="text"
                                    name="coverImage"
                                    value={formData.coverImage}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="https://..."
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
                                placeholder="Describe the service..."
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20"
                        >
                            {loading ? 'Adding...' : 'Add Service'}
                        </button>
                    </form>
                </div>
            )}

            {/* Categories Tab */}
            {activeTab === 'categories' && (
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((cat) => (
                        <div key={cat.id} className="bg-white p-4 rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all group cursor-pointer">
                            <div className="flex items-center gap-4">
                                <img src={cat.image} alt={cat.name} className="w-16 h-16 rounded-xl object-cover" />
                                <div>
                                    <h4 className="font-bold text-slate-900">{cat.name}</h4>
                                    <p className="text-sm text-slate-500 font-medium">{cat.count} Workers</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ServiceApprovals;
