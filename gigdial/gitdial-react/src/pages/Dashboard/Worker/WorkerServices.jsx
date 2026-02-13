import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, DollarSign, Clock, Star, ToggleLeft, ToggleRight } from 'lucide-react';

const WorkerServices = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        price: '',
        deliveryTime: '',
        description: '',
        coverImage: ''
    });

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const fetchServices = async () => {
        try {
            const response = await fetch('/api/gigs/my-gigs', {
                headers: {
                    'Authorization': `Bearer ${userInfo?.token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setServices(Array.isArray(data) ? data : []);
            } else {
                console.error('Failed to fetch services');
                setServices([]);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching services:', error);
            setLoading(false);
            setServices([]);
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleEdit = (service) => {
        setEditingId(service._id);
        setFormData({
            title: service.title,
            category: service.category,
            price: service.price,
            deliveryTime: service.deliveryTime,
            description: service.description,
            coverImage: service.coverImage || ''
        });
        setShowAddModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = editingId ? `/api/gigs/${editingId}` : '/api/gigs';
            const method = editingId ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userInfo?.token}`
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert(`Service ${editingId ? 'updated' : 'added'} successfully!`);
                setShowAddModal(false);
                setEditingId(null);
                setFormData({ title: '', category: '', price: '', deliveryTime: '', description: '', coverImage: '' });
                fetchServices();
            } else {
                const error = await response.json();
                alert(`Error: ${error.message}`);
            }
        } catch (error) {
            alert('Failed to save service');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this service?')) return;
        try {
            const response = await fetch(`/api/gigs/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${userInfo?.token}`
                }
            });
            if (response.ok) {
                fetchServices();
            }
        } catch (error) {
            console.error('Error deleting service', error);
        }
    };

    const [uploading, setUploading] = useState(false);

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formDataFile = new FormData();
        formDataFile.append('image', file);
        setUploading(true);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${userInfo?.token}`
                },
                body: formDataFile
            });
            const data = await response.json();

            if (response.ok) {
                setFormData({ ...formData, coverImage: data.image });
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

    const serviceCategories = [
        "Plumbing", "Electrical", "Cleaning", "Carpentry", "Painting", "Cooking", "Gardening",
        "Pest Control", "Appliance Repair", "Home Salon", "Makeup Artist", "Photography", "Driver",
        "Yoga Instructor", "Tutor", "Interior Design", "Event Planning", "Car Wash", "Laundry",
        "Disinfection", "Security", "Babysitting", "Elderly Care", "Physiotherapy", "Fitness Trainer",
        "Massage Therapy", "Computer Repair", "Mobile Repair", "CCTV Installation", "Packers & Movers",
        "Wedding Planner", "DJ & Music", "Catering", "Mehendi Artist", "Home Renovation", "Waterproofing",
        "Sofa Cleaning", "Carpet Cleaning", "Chimney Cleaning", "Water Tank Cleaning",
        "AC Service & Repair", "Refrigerator Repair", "Washing Machine Repair", "Microwave Repair",
        "RO Water Purifier Service", "Geyser Service", "TV Mounting & Repair"
    ];

    return (
        <div className="space-y-6 relative">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">My Services</h1>
                    <p className="text-slate-500">Manage your service offerings</p>
                </div>
                <button
                    onClick={() => {
                        setEditingId(null);
                        setFormData({ title: '', category: '', price: '', deliveryTime: '', description: '', coverImage: '' });
                        setShowAddModal(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-600/30 transition-all font-bold"
                >
                    <Plus size={20} />
                    Add New Service
                </button>
            </div>

            {loading ? (
                <div className="text-center py-10">Loading services...</div>
            ) : services.length === 0 ? (
                <div className="text-center py-10 text-slate-500">No services found. Add one to get started!</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service) => (
                        <div key={service._id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-lg transition-all group">
                            <div className="relative h-48 overflow-hidden bg-slate-100">
                                {service.coverImage ? (
                                    <img src={service.coverImage} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-slate-400">No Image</div>
                                )}
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-slate-900 mb-1 line-clamp-1">{service.title}</h3>
                                <p className="text-xs text-slate-500 mb-2 line-clamp-2">{service.description}</p>
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg">{service.category}</span>
                                    <span className={`px-2 py-1 text-xs font-bold rounded-lg ${service.status === 'active' ? 'bg-green-50 text-green-700' :
                                            service.status === 'rejected' ? 'bg-red-50 text-red-700' :
                                                'bg-yellow-50 text-yellow-700'
                                        }`}>
                                        {service.status ? service.status.charAt(0).toUpperCase() + service.status.slice(1) : 'Pending'}
                                    </span>
                                    <div className="flex items-center gap-1 text-slate-600">
                                        <DollarSign size={14} />
                                        <span className="text-sm font-bold">{service.price}</span>
                                    </div>
                                </div>
                                <div className="flex gap-2 mt-4">
                                    <button
                                        onClick={() => handleEdit(service)}
                                        className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-bold flex items-center justify-center gap-1"
                                    >
                                        <Edit size={16} /> Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(service._id)}
                                        className="flex-1 px-3 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors text-sm font-bold flex items-center justify-center gap-1"
                                    >
                                        <Trash2 size={16} /> Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showAddModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl overflow-y-auto max-h-[90vh]">
                        <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit Service' : 'Add New Service'}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Service Title</label>
                                <input type="text" name="title" value={formData.title} onChange={handleInputChange} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Professional House Cleaning" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                                    <input
                                        type="text"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        required
                                        list="service-categories"
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        placeholder="Select or type category"
                                    />
                                    <datalist id="service-categories">
                                        {serviceCategories.map((cat) => (
                                            <option key={cat} value={cat} />
                                        ))}
                                    </datalist>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Price (₹)</label>
                                    <input type="number" name="price" value={formData.price} onChange={handleInputChange} required className="w-full px-4 py-2 border rounded-lg" placeholder="500" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Delivery Time (Days)</label>
                                <input type="number" name="deliveryTime" value={formData.deliveryTime} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" placeholder="1" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Service Image</label>
                                <div className="space-y-2">
                                    <input
                                        type="file"
                                        onChange={uploadFileHandler}
                                        className="w-full px-4 py-2 border rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                    />
                                    {uploading && <span className="text-sm text-blue-600 animate-pulse font-medium">Uploading...</span>}
                                    {formData.coverImage && (
                                        <div className="mt-2 h-20 w-32 rounded-lg overflow-hidden border border-slate-200 shadow-sm relative group">
                                            <img src={formData.coverImage} alt="Preview" className="w-full h-full object-cover" />
                                            <button type="button" onClick={() => setFormData({ ...formData, coverImage: '' })} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Trash2 size={12} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                                <textarea name="description" rows="3" value={formData.description} onChange={handleInputChange} required className="w-full px-4 py-2 border rounded-lg" placeholder="Describe your service..."></textarea>
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 font-bold">Cancel</button>
                                <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-bold">{editingId ? 'Update' : 'Save'} Service</button>
                            </div>
                        </form>
                    </div>
                </div >
            )}
        </div >
    );
};

export default WorkerServices;
