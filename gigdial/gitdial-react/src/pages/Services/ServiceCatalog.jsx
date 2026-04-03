import React, { useState, useEffect } from 'react';
import { Search, Filter, Star, MapPin, ArrowRight, Sparkles, Loader, Home as HomeIcon, Laptop as LaptopIcon, ChevronDown } from 'lucide-react';
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
    const rawCategory = queryParams.get('category') || 'All';
    const initialCategory = rawCategory.toLowerCase().startsWith('all') ? 'All' : rawCategory;
    const initialType = queryParams.get('type') || 'All';
    const initialSearch = queryParams.get('search') || '';
    const initialCity = queryParams.get('city') || '';

    const [filter, setFilter] = useState(initialCategory);
    const [serviceType, setServiceType] = useState(initialType);
    const [searchQuery, setSearchQuery] = useState(initialSearch);
    const [cityFilter, setCityFilter] = useState(initialCity);
    const [services, setServices] = useState([]);
    const [categories, setCategories] = useState(['All']);
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(true);

    const getCategoryIcon = (cat) => {
        const icons = {
            'All': '🔍',
            'Cleaning': '🧹',
            'Cooking': '👨‍🍳',
            'Driver': '🚗',
            'Fitness': '🏋️',
            'Fitness Trainer': '💪',
            'Painting': '🎨',
            'Pest Control': '🦟',
            'Plumber': '🔧',
            'Security': '🛡️',
            'Gym': '🏃',
            'Trades & Services (Manual)': '🛠️',
            'Health, Medical & Wellness': '🏃',
            'Computers, IT & Software': '💻',
            'Design, Media & Architecture': '🎨',
            'Events, Hospitality & Tourism': '📷',
            'Education, Teaching & Coaching': '🎓',
            'Sales, Marketing & PR': '📈',
            'Logistics, Shipping & Transport': '🚛',
            'Business, Admin & HR': '💼',
            'Legal & Compliance': '⚖️',
            'Writing, Content & Languages': '✍️',
            'Artificial Intelligence & Future Tech': '🤖',
            'Others & General Jobs': '⚙️'
        };
        return icons[cat] || '✨';
    };

    const getCityIcon = (city) => {
        const cityName = typeof city === 'string' ? city : city.name;
        const icons = {
            'Ahmedabad': '🏘️',
            'Surat': '🏗️',
            'Vadodara': '🏙️',
            'Rajkot': '🏭',
            'Gandhinagar': '🏛️',
            'Mumbai': '🌆',
            'Delhi': '🚩',
            'Bangalore': '🛰️',
            'Pune': '🎓'
        };
        return icons[cityName] || '📍';
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Fetch basic data
                const gigsRes = await axios.get('/api/gigs');
                setServices(gigsRes.data);
                
                // Fetch non-blocking extras
                Promise.all([
                    axios.get('/api/gigs/categories'),
                    axios.get('/api/cities')
                ]).then(([catsRes, citiesRes]) => {
                    setCategories(['All', ...catsRes.data]);
                    if (citiesRes.data?.length > 0) {
                        setCities(citiesRes.data);
                    }
                }).catch(err => {
                    console.error("Delayed data fetch error:", err);
                });

                // Set initial cities fallback if nothing loaded yet
                setCities([{name: 'Ahmedabad'}, {name: 'Surat'}, {name: 'Vadodara'}, {name: 'Rajkot'}, {name: 'Gandhinagar'}]);

            } catch (error) {
                console.error('Error fetching services:', error);
                toast.error("Failed to load services. Please check your connection.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const rawParam = queryParams.get('category') || 'All';
        const finalFilter = rawParam.toLowerCase().startsWith('all') ? 'All' : rawParam;
        setFilter(finalFilter);
        setServiceType(queryParams.get('type') || 'All');
        setSearchQuery(queryParams.get('search') || '');
        setCityFilter(queryParams.get('city') || '');
    }, [location.search]);

    const filteredServices = services.filter(s => {
        // Universal Category Normalization
        const currentFilter = filter.toLowerCase();
        const sCat = (s.category || s.mainCategory || '').toLowerCase();
        const matchesCategory = currentFilter === 'all' || sCat === currentFilter;
        
        // Universal Service Type Mapping
        const currentType = serviceType.toLowerCase();
        const sType = (s.serviceType || '').toLowerCase();
        const matchesType = currentType === 'all' || sType === currentType || !sType; // Show if missing type on "All"
        
        const currentSearch = searchQuery.toLowerCase().trim();
        const matchesSearch = !currentSearch || 
            s.title.toLowerCase().includes(currentSearch) ||
            sCat.includes(currentSearch) ||
            (s.description && s.description.toLowerCase().includes(currentSearch));
        
        const cFilter = cityFilter.toLowerCase().trim();
        const sCity = (s.user?.city || s.city || '').toLowerCase().trim();
        const matchesCity = !cFilter || cFilter === 'all' || sCity === cFilter;
        
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
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-white to-transparent"></div>
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>

            <div className="container mx-auto px-6 relative z-10 pt-10">

                <div className="text-center max-w-3xl mx-auto mb-12">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-500 font-bold text-xs mb-6 shadow-sm uppercase tracking-widest"
                    >
                        <Sparkles size={14} className="text-primary" /> Discover Talent
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-5xl font-display font-black text-dark-surface mb-4 leading-tight"
                    >
                        Find the perfect service
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-base sm:text-lg text-slate-500 font-light mb-8 max-w-2xl mx-auto px-4"
                    >
                        Browse through our extensive catalog of verified professionals ready to help you.
                    </motion.p>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                        className="flex flex-wrap justify-center gap-2 sm:gap-3 px-4"
                    >
                        {[
                            { id: 'All', label: 'All Services', icon: Sparkles },
                            { id: 'Residency', label: 'Residency', icon: HomeIcon },
                            { id: 'Commercial', label: 'Commercial', icon: LaptopIcon }
                        ].map((type) => (
                            <button
                                key={type.id}
                                onClick={() => setServiceType(type.id)}
                                className={`flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm transition-all duration-300 ${serviceType === type.id ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-105' : 'bg-white text-slate-600 border border-slate-100 hover:border-primary/20 hover:bg-slate-50'}`}
                            >
                                <type.icon size={16} className={serviceType === type.id ? 'text-white' : 'text-primary'} />
                                {type.label}
                            </button>
                        ))}
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="max-w-7xl mx-auto flex flex-col md:flex-row flex-wrap lg:flex-nowrap lg:items-stretch gap-3 mb-12 px-4"
                >
                    <div className="flex-[2] relative group min-w-[280px]">
                        <div className="absolute inset-0 bg-slate-900/5 rounded-[2.5rem] blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-700"></div>
                        <div className="relative flex items-center bg-white border-2 border-slate-900 rounded-full lg:rounded-[2.5rem] p-0.5 shadow-lg shadow-slate-200/40 focus-within:ring-4 focus-within:ring-slate-900/5 transition-all duration-500">
                            <div className="pl-5 pr-1">
                                <Search className="w-4 h-4 text-slate-400 group-focus-within:text-slate-900 transition-colors" />
                            </div>
                            <input
                                type="text"
                                placeholder="Service or Professional?"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-2 pr-4 py-3 sm:py-4 bg-transparent outline-none text-slate-900 font-extrabold placeholder:text-slate-300 text-sm sm:text-base"
                            />
                        </div>
                    </div>

                    <div className="flex-1 relative group/dropdown min-w-[160px]">
                        <div className="relative h-full">
                            <select
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                className="w-full h-full appearance-none bg-white border-2 border-slate-900 rounded-full lg:rounded-[2.5rem] px-6 py-3.5 sm:py-5 font-black text-[10px] sm:text-xs uppercase tracking-widest text-slate-800 outline-none focus:ring-4 focus:ring-slate-900/5 cursor-pointer shadow-md transition-all pr-12"
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>
                                        {getCategoryIcon(cat)} {cat === 'All' ? 'CATEGORIES' : cat.toUpperCase()}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-900">
                                <ChevronDown className="w-4 h-4" strokeWidth={4} />
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 relative group/dropdown min-w-[140px]">
                        <div className="relative h-full">
                            <select
                                value={cityFilter}
                                onChange={(e) => setCityFilter(e.target.value)}
                                className="w-full h-full appearance-none bg-white border-2 border-slate-900 rounded-full lg:rounded-[2.5rem] px-6 py-3.5 sm:py-5 font-black text-[10px] sm:text-xs uppercase tracking-widest text-slate-800 outline-none focus:ring-4 focus:ring-slate-900/5 cursor-pointer shadow-md transition-all pr-12"
                            >
                                <option value="">📍 CITIES</option>
                                {cities.map(city => (
                                    <option key={city.name || city} value={city.name || city}>
                                        {getCityIcon(city)} {(city.name || city).toUpperCase()}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-900">
                                <ChevronDown className="w-4 h-4" strokeWidth={4} />
                            </div>
                        </div>
                    </div>
                </motion.div>

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
                    <div className="text-center py-20 bg-white rounded-[2rem] border border-slate-100 shadow-sm mt-10">
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">No services found matching your criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ServiceCatalog;
