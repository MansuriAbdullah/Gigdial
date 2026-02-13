import React, { useState, useEffect } from 'react';
import { Search, Filter, Star, MapPin, TrendingUp, Heart, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const BrowseServices = () => {
    const [services, setServices] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchServices();
        fetchCategories();
    }, []);

    const fetchServices = async () => {
        try {
            const response = await fetch('/api/gigs');
            if (response.ok) {
                const data = await response.json();
                setServices(Array.isArray(data) ? data : []);
            } else {
                console.error('Failed to fetch services:', response.status);
                setServices([]);
            }
        } catch (error) {
            console.error('Error fetching services:', error);
            setServices([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch('/api/gigs/categories');
            if (response.ok) {
                const data = await response.json();
                setCategories(Array.isArray(data) ? data : []);
            } else {
                setCategories([]);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
            setCategories([]);
        }
    };

    const filteredServices = Array.isArray(services) ? services.filter(service => {
        const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
        const matchesSearch = service.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            service.description?.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    }) : [];

    const handleServiceClick = (serviceId) => {
        navigate(`/services/${serviceId}`);
    };

    const handleBookService = async (e, service) => {
        e.stopPropagation();
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));

        if (!userInfo) {
            alert('Please login to book a service');
            navigate('/login');
            return;
        }

        if (window.confirm(`Confirm booking for ${service.title} at ₹${service.price}?`)) {
            try {
                const res = await fetch('/api/orders', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${userInfo.token}`
                    },
                    body: JSON.stringify({
                        gig: service._id,
                        seller: service.user._id,
                        title: service.title,
                        description: service.description,
                        price: service.price,
                        deliveryTime: service.deliveryTime,
                        paymentMethod: 'wallet'
                    })
                });

                if (res.ok) {
                    alert('Service booked successfully! Check your orders.');
                } else {
                    const error = await res.json();
                    alert(`Booking failed: ${error.message}`);
                }
            } catch (err) {
                console.error(err);
                alert('Something went wrong');
            }
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Browse Services</h1>
                <p className="text-slate-500 mt-1">Find the perfect service for your needs</p>
            </div>

            {/* Search Bar */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                    type="text"
                    placeholder="Search for services..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                />
            </div>

            {/* Categories */}
            <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                <button
                    onClick={() => setSelectedCategory('all')}
                    className={`px-6 py-2.5 rounded-full font-bold whitespace-nowrap transition-all ${selectedCategory === 'all'
                        ? 'bg-slate-900 text-white shadow-lg'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                        }`}
                >
                    All Services
                </button>
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-6 py-2.5 rounded-full font-bold whitespace-nowrap transition-all ${selectedCategory === category
                            ? 'bg-slate-900 text-white shadow-lg'
                            : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Services Grid */}
            {filteredServices.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredServices.map((service) => (
                        <motion.div
                            key={service._id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            onClick={() => handleServiceClick(service._id)}
                            className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all cursor-pointer group overflow-hidden"
                        >
                            {/* Service Image */}
                            <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100 overflow-hidden">
                                {service.images && service.images[0] ? (
                                    <img
                                        src={`http://localhost:5000/${service.images[0].replace(/\\/g, '/')}`}
                                        alt={service.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-blue-600">
                                        {service.title?.charAt(0)}
                                    </div>
                                )}
                                <div className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-red-50 transition-colors">
                                    <Heart size={18} className="text-slate-400 hover:text-red-500 transition-colors" />
                                </div>
                                {service.discount && (
                                    <div className="absolute top-3 left-3 px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                                        {service.discount}% OFF
                                    </div>
                                )}
                            </div>

                            {/* Service Info */}
                            <div className="p-5">
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex-1">
                                        <h3 className="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                                            {service.title}
                                        </h3>
                                        <p className="text-sm text-slate-600 line-clamp-2 mt-1">
                                            {service.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Worker Info */}
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-bold text-blue-600">
                                        {service.user?.name?.charAt(0) || 'W'}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-slate-700">{service.user?.name || 'Service Provider'}</p>
                                    </div>
                                    {service.user?.rating && (
                                        <div className="flex items-center gap-1 px-2 py-0.5 bg-yellow-50 rounded-lg">
                                            <Star size={12} className="text-yellow-500 fill-yellow-500" />
                                            <span className="text-xs font-bold text-yellow-700">{service.user.rating}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Price and CTA */}
                                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                                    <div>
                                        <p className="text-xs text-slate-500">Starting from</p>
                                        <p className="text-xl font-bold text-slate-900">₹{service.price}</p>
                                    </div>
                                    <button
                                        onClick={(e) => handleBookService(e, service)}
                                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors group-hover:gap-3"
                                    >
                                        Book Now
                                        <ChevronRight size={16} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                    <Search size={48} className="mx-auto text-slate-300 mb-3" />
                    <h3 className="text-xl font-bold text-slate-900 mb-2">No Services Found</h3>
                    <p className="text-slate-500">Try adjusting your search or filters</p>
                </div>
            )}

            {/* Popular Services */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                <div className="flex items-center gap-2 mb-4">
                    <TrendingUp size={20} className="text-blue-600" />
                    <h3 className="text-lg font-bold text-blue-900">Popular This Week</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['AC Repair', 'Home Cleaning', 'Plumbing', 'Electrician'].map((service) => (
                        <button
                            key={service}
                            onClick={() => setSearchTerm(service)}
                            className="p-3 bg-white rounded-xl font-bold text-sm text-slate-700 hover:bg-blue-100 hover:text-blue-700 transition-colors border border-blue-100"
                        >
                            {service}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BrowseServices;
