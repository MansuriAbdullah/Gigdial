import React, { useState, useEffect } from 'react';
import { Search, Star, MapPin, TrendingUp, Heart, ChevronRight, Briefcase, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const BrowseWorkers = () => {
    const [workers, setWorkers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    useEffect(() => {
        fetchWorkers();
        fetchCategories();
        if (userInfo) {
            fetchFavorites();
        }
    }, []);

    const fetchFavorites = async () => {
        try {
            const response = await fetch('/api/users/favourites', {
                headers: {
                    'Authorization': `Bearer ${userInfo?.token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setFavorites(data.map(fav => fav._id));
            }
        } catch (error) {
            console.error('Error fetching favorites:', error);
        }
    };

    const handleToggleFavorite = async (workerId) => {
        if (!userInfo) {
            navigate('/login');
            return;
        }

        const isFav = favorites.includes(workerId);
        const method = isFav ? 'DELETE' : 'POST';
        const url = isFav ? `/api/users/favourites/${workerId}` : '/api/users/favourites';
        const body = isFav ? {} : { workerId };

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userInfo?.token}`
                },
                body: JSON.stringify(body)
            });

            if (response.ok) {
                if (isFav) {
                    setFavorites(favorites.filter(id => id !== workerId));
                } else {
                    setFavorites([...favorites, workerId]);
                }
            }
        } catch (error) {
            console.error('Error toggling favorite:', error);
        }
    };

    const fetchWorkers = async () => {
        try {
            const response = await fetch('/api/users/workers');
            if (response.ok) {
                const data = await response.json();
                setWorkers(Array.isArray(data) ? data : []);
            } else {
                console.error('Failed to fetch workers:', response.status);
                setWorkers([]);
            }
        } catch (error) {
            console.error('Error fetching workers:', error);
            setWorkers([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch('/api/users/worker-categories');
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

    const filteredWorkers = Array.isArray(workers) ? workers.filter(worker => {
        const matchesCategory = selectedCategory === 'all' || worker.skills?.includes(selectedCategory);
        const matchesSearch = worker.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            worker.skills?.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
            worker.bio?.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    }) : [];

    const handleWorkerClick = (workerId) => {
        navigate(`/workers/${workerId}`);
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
                <h1 className="text-2xl font-bold text-slate-900">Browse Workers</h1>
                <p className="text-slate-500 mt-1">Find skilled professionals for your needs</p>
            </div>

            {/* Search Bar */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                    type="text"
                    placeholder="Search for workers by name or skill..."
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
                    All Workers
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

            {/* Workers Grid */}
            {filteredWorkers.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredWorkers.map((worker) => (
                        <motion.div
                            key={worker._id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            onClick={() => handleWorkerClick(worker._id)}
                            className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all cursor-pointer group overflow-hidden"
                        >
                            {/* Worker Image */}
                            <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100 overflow-hidden">
                                {worker.profileImage ? (
                                    <img
                                        src={`http://localhost:5000/${worker.profileImage.replace(/\\/g, '/')}`}
                                        alt={worker.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-6xl font-bold text-blue-600">
                                        {worker.name?.charAt(0)}
                                    </div>
                                )}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleToggleFavorite(worker._id);
                                    }}
                                    className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-red-50 transition-colors group/heart z-10"
                                >
                                    <Heart
                                        size={18}
                                        className={`transition-colors ${favorites.includes(worker._id)
                                            ? 'text-red-500 fill-red-500'
                                            : 'text-slate-400 group-hover/heart:text-red-500'
                                            }`}
                                    />
                                </button>
                                {worker.isVerified && (
                                    <div className="absolute top-3 left-3 px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                                        <Award size={12} />
                                        Verified
                                    </div>
                                )}
                            </div>

                            {/* Worker Info */}
                            <div className="p-5">
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex-1">
                                        <h3 className="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">
                                            {worker.name}
                                        </h3>
                                        <p className="text-sm text-slate-600 line-clamp-2 mt-1">
                                            {worker.bio || 'Professional service provider'}
                                        </p>
                                    </div>
                                    {worker.rating > 0 && (
                                        <div className="flex items-center gap-1 px-2 py-1 bg-yellow-50 rounded-lg border border-yellow-100">
                                            <Star size={14} className="text-yellow-500 fill-yellow-500" />
                                            <span className="text-sm font-bold text-yellow-700">{worker.rating.toFixed(1)}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Skills */}
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {worker.skills?.slice(0, 3).map((skill, index) => (
                                        <span
                                            key={index}
                                            className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                    {worker.skills?.length > 3 && (
                                        <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-lg">
                                            +{worker.skills.length - 3} more
                                        </span>
                                    )}
                                </div>

                                {/* Location & Stats */}
                                {worker.city && (
                                    <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
                                        <MapPin size={14} />
                                        <span>{worker.city}</span>
                                    </div>
                                )}

                                <div className="grid grid-cols-2 gap-3 mb-4 p-3 bg-slate-50 rounded-xl">
                                    <div>
                                        <p className="text-xs text-slate-500">Experience</p>
                                        <p className="text-lg font-bold text-slate-900">{worker.experience || 0}+ yrs</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500">Jobs Done</p>
                                        <p className="text-lg font-bold text-slate-900">{worker.completedJobs || 0}</p>
                                    </div>
                                </div>

                                {/* CTA Button */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(`/workers/${worker._id}`);
                                    }}
                                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors group-hover:gap-3"
                                >
                                    <Briefcase size={16} />
                                    View Profile
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                    <Search size={48} className="mx-auto text-slate-300 mb-3" />
                    <h3 className="text-xl font-bold text-slate-900 mb-2">No Workers Found</h3>
                    <p className="text-slate-500">Try adjusting your search or filters</p>
                </div>
            )}

            {/* Popular Skills */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                <div className="flex items-center gap-2 mb-4">
                    <TrendingUp size={20} className="text-blue-600" />
                    <h3 className="text-lg font-bold text-blue-900">Popular Skills</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['Plumber', 'Electrician', 'Carpenter', 'Painter'].map((skill) => (
                        <button
                            key={skill}
                            onClick={() => setSearchTerm(skill)}
                            className="p-3 bg-white rounded-xl font-bold text-sm text-slate-700 hover:bg-blue-100 hover:text-blue-700 transition-colors border border-blue-100"
                        >
                            {skill}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BrowseWorkers;
