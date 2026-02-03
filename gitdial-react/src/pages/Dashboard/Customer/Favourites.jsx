import React, { useState, useEffect } from 'react';
import { Heart, Star, MapPin, Phone, MessageSquare, Trash2, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Favourites = () => {
    const [favourites, setFavourites] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchFavourites();
    }, []);

    const fetchFavourites = async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const response = await fetch('/api/users/favourites', {
                headers: {
                    'Authorization': `Bearer ${userInfo?.token}`
                }
            });
            const data = await response.json();
            setFavourites(data);
        } catch (error) {
            console.error('Error fetching favourites:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveFavourite = async (workerId) => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const response = await fetch(`/api/users/favourites/${workerId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${userInfo?.token}`
                }
            });

            if (response.ok) {
                setFavourites(favourites.filter(fav => fav._id !== workerId));
            }
        } catch (error) {
            console.error('Error removing favourite:', error);
        }
    };

    const handleBookNow = (workerId) => {
        navigate(`/workers/${workerId}/book`);
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
            <div>
                <h1 className="text-2xl font-bold text-slate-900">My Favourites</h1>
                <p className="text-slate-500 mt-1">Your trusted service providers</p>
            </div>

            {favourites.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {favourites.map((worker) => (
                        <motion.div
                            key={worker._id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden group"
                        >
                            {/* Worker Image */}
                            <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100">
                                {worker.profileImage ? (
                                    <img
                                        src={`http://localhost:5000/${worker.profileImage.replace(/\\/g, '/')}`}
                                        alt={worker.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-6xl font-bold text-blue-600">
                                        {worker.name.charAt(0)}
                                    </div>
                                )}
                                <button
                                    onClick={() => handleRemoveFavourite(worker._id)}
                                    className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-red-50 transition-colors group"
                                >
                                    <Heart size={20} className="text-red-500 fill-red-500 group-hover:scale-110 transition-transform" />
                                </button>
                            </div>

                            {/* Worker Info */}
                            <div className="p-5">
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <h3 className="font-bold text-lg text-slate-900">{worker.name}</h3>
                                        <p className="text-sm text-slate-600">{worker.skills?.[0] || 'Service Provider'}</p>
                                    </div>
                                    {worker.rating && (
                                        <div className="flex items-center gap-1 px-2 py-1 bg-yellow-50 rounded-lg border border-yellow-100">
                                            <Star size={14} className="text-yellow-500 fill-yellow-500" />
                                            <span className="text-sm font-bold text-yellow-700">{worker.rating}</span>
                                        </div>
                                    )}
                                </div>

                                {worker.location && (
                                    <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                                        <MapPin size={14} />
                                        <span>{worker.location}</span>
                                    </div>
                                )}

                                {/* Stats */}
                                <div className="grid grid-cols-2 gap-3 mb-4 p-3 bg-slate-50 rounded-xl">
                                    <div>
                                        <p className="text-xs text-slate-500">Completed</p>
                                        <p className="text-lg font-bold text-slate-900">{worker.completedJobs || 0}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500">Experience</p>
                                        <p className="text-lg font-bold text-slate-900">{worker.experience || 0}+ yrs</p>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="grid grid-cols-3 gap-2">
                                    <button
                                        onClick={() => handleBookNow(worker._id)}
                                        className="col-span-2 flex items-center justify-center gap-2 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors"
                                    >
                                        <Calendar size={16} />
                                        Book Now
                                    </button>
                                    <button className="flex items-center justify-center p-2.5 bg-green-50 text-green-600 font-bold rounded-xl hover:bg-green-100 transition-colors">
                                        <Phone size={18} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                    <div className="w-20 h-20 mx-auto mb-4 bg-pink-100 rounded-full flex items-center justify-center">
                        <Heart size={40} className="text-pink-500" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">No Favourites Yet</h3>
                    <p className="text-slate-500 mb-6">Start adding your trusted service providers</p>
                    <button
                        onClick={() => navigate('/workers')}
                        className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors"
                    >
                        Browse Workers
                    </button>
                </div>
            )}

            {/* Tips Section */}
            {favourites.length > 0 && (
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                    <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                        <Heart size={20} className="text-blue-600" />
                        Why Add to Favourites?
                    </h3>
                    <ul className="text-sm text-blue-800 space-y-2">
                        <li className="flex items-start gap-2">
                            <span className="text-blue-600 font-bold">•</span>
                            <span>Quick access to your trusted service providers</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-blue-600 font-bold">•</span>
                            <span>Get notified about their availability and offers</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-blue-600 font-bold">•</span>
                            <span>Faster booking with saved preferences</span>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Favourites;
