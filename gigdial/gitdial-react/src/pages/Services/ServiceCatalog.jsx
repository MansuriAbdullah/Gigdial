import React, { useState } from 'react';
import { Search, Filter, Star, MapPin, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

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
                src={image}
                alt={title}
                loading="lazy"
                className="relative w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-dark-surface uppercase tracking-wider shadow-sm">
                {category}
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 flex justify-between items-end">
                <div className="flex items-center gap-1.5 text-yellow-400 font-bold text-sm bg-black/20 backdrop-blur-sm px-2 py-1 rounded-lg">
                    <Star size={14} fill="currentColor" /> {rating} <span className="text-white/80 font-normal text-xs">({reviews})</span>
                </div>
            </div>
        </div>

        <div className="p-6">
            <h3 className="text-xl font-display font-bold text-dark-surface mb-2 leading-tight group-hover:text-primary transition-colors">{title}</h3>
            <div className="flex items-center gap-2 text-slate-500 text-sm mb-6">
                <MapPin size={16} className="text-primary" />
                <span>Available in your area</span>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5">Starting from</span>
                    <div className="text-lg font-bold text-dark-surface">{price}</div>
                </div>
                <Link to={`/services/${id}`} className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm transform group-hover:rotate-[-45deg]">
                    <ArrowRight size={20} />
                </Link>
            </div>
        </div>
    </motion.div>
);

const ServiceCatalog = () => {
    const [filter, setFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    // Mock Data
    const services = [
        { id: 1, title: 'Deep House Cleaning', category: 'Home', price: '₹499', rating: 4.8, reviews: 124, image: 'https://images.unsplash.com/photo-1581578731117-10452b7d702e?auto=format&fit=crop&q=80' },
        { id: 2, title: 'AC Repair & Service', category: 'Repair', price: '₹399', rating: 4.7, reviews: 89, image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80' },
        { id: 3, title: 'Web Development', category: 'Tech', price: '₹4,999', rating: 4.9, reviews: 45, image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80' },
        { id: 4, title: 'Yoga Instructor', category: 'Wellness', price: '₹799', rating: 5.0, reviews: 32, image: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&q=80' },
        { id: 5, title: 'Plumbing Services', category: 'Repair', price: '₹299', rating: 4.6, reviews: 210, image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&q=80' },
        { id: 6, title: 'Wedding Photography', category: 'Events', price: '₹15,000', rating: 4.9, reviews: 18, image: 'https://images.unsplash.com/photo-1537905569824-f89f14cceb68?auto=format&fit=crop&q=80' },
        { id: 7, title: 'Pest Control', category: 'Home', price: '₹899', rating: 4.5, reviews: 56, image: 'https://images.unsplash.com/photo-1587353986036-7977cc49d8ba?auto=format&fit=crop&q=80' },
        { id: 8, title: 'Electrician', category: 'Repair', price: '₹250', rating: 4.8, reviews: 312, image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80' },
    ];

    const categories = ['All', 'Home', 'Repair', 'Tech', 'Wellness', 'Events'];

    const filteredServices = services.filter(s => {
        const matchesCategory = filter === 'All' || s.category === filter;
        const matchesSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

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
                        className="text-xl text-slate-500 font-light"
                    >
                        Browse through our extensive catalog of verified professionals ready to help you.
                    </motion.p>
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
                    <AnimatePresence>
                        {filteredServices.map((service, index) => (
                            <ServiceCard key={service.id} {...service} index={index} />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredServices.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-slate-400 text-lg">No services found matching your criteria.</p>
                        <button onClick={() => { setFilter('All'); setSearchQuery(''); }} className="text-primary font-bold mt-2 hover:underline">Clear Filters</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ServiceCatalog;
