import React, { useState, useEffect } from 'react';
import { Search, MapPin, Star, Briefcase, Filter, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BrowseWorkers = () => {
    const [workers, setWorkers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const navigate = useNavigate();

    const categories = ['All', 'Plumbing', 'Electrical', 'Cleaning', 'Painting', 'Carpentry', 'Driver'];

    useEffect(() => {
        fetchApprovedWorkers();
    }, []);

    const fetchApprovedWorkers = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/users/workers/approved');
            const data = await response.json();
            setWorkers(data);
        } catch (error) {
            console.error('Failed to fetch workers:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredWorkers = workers.filter(worker => {
        const matchesSearch = worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            worker.skills?.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesCategory = selectedCategory === 'All' || worker.skills?.includes(selectedCategory);
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold mb-4">Find Skilled Workers</h1>
                    <p className="text-blue-100 mb-6">Browse verified professionals for your service needs</p>

                    {/* Search Bar */}
                    <div className="max-w-2xl">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search by name or skill..."
                                className="w-full pl-12 pr-4 py-4 rounded-xl text-slate-900 font-medium focus:ring-4 focus:ring-blue-300/50 border-none"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* Category Filter */}
                <div className="mb-8">
                    <div className="flex flex-wrap gap-2">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-lg font-medium transition-all ${selectedCategory === category
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                                    : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Workers Grid */}
                {loading ? (
                    <div className="text-center py-12">
                        <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
                        <p className="text-slate-500 mt-4">Loading workers...</p>
                    </div>
                ) : filteredWorkers.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Briefcase className="text-slate-400" size={32} />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">No workers found</h3>
                        <p className="text-slate-500">Try adjusting your search or filters</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredWorkers.map(worker => (
                            <div
                                key={worker._id}
                                className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
                                onClick={() => navigate(`/workers/${worker._id}`)}
                            >
                                {/* Profile Image */}
                                <div className="relative h-48 bg-gradient-to-br from-blue-500 to-blue-600 overflow-hidden">
                                    {worker.profileImage ? (
                                        <img
                                            src={`http://localhost:5000/${worker.profileImage.replace(/\\/g, '/')}`}
                                            alt={worker.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-white text-6xl font-bold">
                                            {worker.name.charAt(0)}
                                        </div>
                                    )}
                                    {worker.isVerified && (
                                        <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                            <Star size={12} fill="white" />
                                            Verified
                                        </div>
                                    )}
                                </div>

                                {/* Worker Info */}
                                <div className="p-5">
                                    <h3 className="font-bold text-lg text-slate-900 mb-2">{worker.name}</h3>

                                    {/* Skills */}
                                    <div className="flex flex-wrap gap-1 mb-3">
                                        {worker.skills?.slice(0, 3).map((skill, idx) => (
                                            <span
                                                key={idx}
                                                className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                        {worker.skills?.length > 3 && (
                                            <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-lg">
                                                +{worker.skills.length - 3}
                                            </span>
                                        )}
                                    </div>

                                    {/* Location */}
                                    {worker.city && (
                                        <div className="flex items-center gap-2 text-slate-500 text-sm mb-3">
                                            <MapPin size={14} />
                                            <span>{worker.city}</span>
                                        </div>
                                    )}

                                    {/* Rating */}
                                    <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-100">
                                        <div className="flex items-center gap-1 text-yellow-500">
                                            <Star size={16} fill="currentColor" />
                                            <span className="font-bold text-slate-900">{worker.rating || 4.5}</span>
                                        </div>
                                        <span className="text-xs text-slate-400">
                                            ({worker.numReviews || 0} reviews)
                                        </span>
                                    </div>

                                    {/* Bio */}
                                    {worker.bio && (
                                        <p className="text-sm text-slate-600 line-clamp-2 mb-4">
                                            {worker.bio}
                                        </p>
                                    )}

                                    {/* Action Button */}
                                    <button className="w-full py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-bold text-sm">
                                        View Profile
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BrowseWorkers;
