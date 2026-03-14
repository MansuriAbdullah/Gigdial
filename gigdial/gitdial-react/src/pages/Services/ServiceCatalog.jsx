import React, { useState, useEffect } from 'react';
import { Search, Filter, Star, MapPin, ArrowRight, Sparkles, Loader, Home as HomeIcon, Laptop as LaptopIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { getFullImagePath } from '../../utils/imagePath';

const ServiceCard = ({ id, title, category, price, rating, reviews, image, index }) => (
    <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        className="group bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-card-hover transition-all duration-500"
    >
        <div className="relative h-56 overflow-hidden">
            <div className="absolute inset-0 bg-slate-200 animate-pulse" /> {/* Loading placeholder effect */}
            <img
                src={getFullImagePath(image) || 'https://images.unsplash.com/photo-1581578731117-10452b7d702e?auto=format&fit=crop&q=80'}
                alt={title}
                loading="lazy"
                className="relative w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1581578731117-10452b7d702e?auto=format&fit=crop&q=80" }}
            />
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-dark-surface uppercase tracking-wider shadow-sm">
                {category}
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 flex justify-between items-end">
                <div className="flex items-center gap-1.5 text-yellow-400 font-bold text-sm bg-black/20 backdrop-blur-sm px-2 py-1 rounded-lg">
                    <Star size={14} fill="currentColor" /> {rating?.toFixed(1) || '0.0'} <span className="text-white/80 font-normal text-xs">({reviews || 0})</span>
                </div>
            </div>
        </div>

        <div className="p-6">
            <h3 className="text-xl font-display font-bold text-dark-surface mb-2 leading-tight group-hover:text-primary transition-colors line-clamp-1">{title}</h3>
            <div className="flex items-center gap-2 text-slate-500 text-sm mb-6">
                <MapPin size={16} className="text-primary" />
                <span>Available in your area</span>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5">Starting from</span>
                    <div className="text-lg font-bold text-dark-surface">₹{price}</div>
                </div>
                <Link to={`/services/${id}`} className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm transform group-hover:rotate-[-45deg]">
                    <ArrowRight size={20} />
                </Link>
            </div>
        </div>
    </motion.div>
);

const ServiceCatalog = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialSearch = queryParams.get('search') || '';
    const initialCity = queryParams.get('city') || '';
    const initialCategory = queryParams.get('category') || 'All';
    const initialType = queryParams.get('type') || 'All';

    const [filter, setFilter] = useState(initialCategory);
    const [serviceType, setServiceType] = useState(initialType);
    const [searchQuery, setSearchQuery] = useState(initialSearch);
    const [services, setServices] = useState([]);
    const [categories, setCategories] = useState(['All']);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [gigsRes, catsRes] = await Promise.all([
                    axios.get('/api/gigs'),
                    axios.get('/api/gigs/categories')
                ]);

                setServices(gigsRes.data);
                setCategories(['All', ...catsRes.data]);
            } catch (error) {
                console.error('Error fetching services:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        setFilter(queryParams.get('category') || 'All');
        setServiceType(queryParams.get('type') || 'All');
        setSearchQuery(queryParams.get('search') || '');
    }, [location.search]);

    const filteredServices = services.filter(s => {
        const matchesCategory = filter === 'All' || s.category === filter;
        const matchesType = serviceType === 'All' || s.serviceType === serviceType;
        const matchesSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.category.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCity = !initialCity || (s.user?.city?.toLowerCase() === initialCity.toLowerCase());
        return matchesCategory && matchesType && matchesSearch && matchesCity;
    });

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="flex flex-col items-center gap-4">
                    <Loader className="animate-spin text-primary" size={40} />
                    <p className="text-slate-500 font-medium animate-pulse">Fetching latest services...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 pb-24 relative overflow-hidden">
            {/* Bg Decoration */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-white to-transparent"></div>
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>

            <div className="container mx-auto px-6 relative z-10 pt-24">

                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-500 font-bold text-xs mb-6 shadow-sm"
                    >
                        <Sparkles size={14} className="text-primary" /> DISCOVER TALENT
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-display font-extrabold text-dark-surface mb-6"
                    >
                        Find the perfect service
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-slate-500 font-light mb-10"
                    >
                        Browse through our extensive catalog of verified professionals ready to help you.
                    </motion.p>

                    {/* Service Type Toggle */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                        className="flex justify-center gap-3"
                    >
                        {[
                            { id: 'All', label: 'All Services', icon: Sparkles },
                            { id: 'Residency', label: 'Residency', icon: HomeIcon },
                            { id: 'Commercial', label: 'Commercial', icon: LaptopIcon }
                        ].map((type) => (
                            <button
                                key={type.id}
                                onClick={() => setServiceType(type.id)}
                                className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm transition-all duration-300 ${serviceType === type.id ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-105' : 'bg-white text-slate-600 border border-slate-100 hover:border-primary/20 hover:bg-slate-50'}`}
                            >
                                <type.icon size={18} className={serviceType === type.id ? 'text-white' : 'text-primary'} />
                                {type.label}
                            </button>
                        ))}
                    </motion.div>
                </div>

                {/* Search & Filter Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white p-2 rounded-[1.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col lg:flex-row gap-4 mb-16 max-w-5xl mx-auto"
                >
                    <div className="relative flex-1 lg:min-w-[300px]">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input
                            type="text"
                            placeholder="What are you looking for?"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-14 pr-6 py-4 bg-transparent border-none outline-none text-slate-700 placeholder:text-slate-400 text-lg"
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto p-2 no-scrollbar">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-6 py-3 rounded-xl font-bold text-sm whitespace-nowrap transition-all duration-300 ${filter === cat ? 'bg-dark-surface text-white shadow-lg' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    <AnimatePresence mode='popLayout'>
                        {filteredServices.map((service, index) => (
                            <ServiceCard
                                key={service._id}
                                id={service._id}
                                title={service.title}
                                category={service.category}
                                price={service.price}
                                rating={service.user?.rating || 0}
                                reviews={service.user?.numReviews || 0}
                                image={service.image}
                                index={index}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredServices.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-slate-400 text-lg">No services found matching your criteria.</p>
                        <button onClick={() => { setFilter('All'); setServiceType('All'); setSearchQuery(''); }} className="text-primary font-bold mt-2 hover:underline">Clear Filters</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ServiceCatalog;
