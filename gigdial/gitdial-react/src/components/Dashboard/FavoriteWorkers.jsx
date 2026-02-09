import React from 'react';
import { Star, MapPin, Heart, Shield, Clock, Award } from 'lucide-react';

const FavoriteWorkers = () => {
    const favorites = [
        {
            id: 1,
            name: 'Rajesh Kumar',
            role: 'Plumber',
            rating: '4.8',
            jobs: 145,
            location: 'Mumbai, MH',
            image: 'https://i.pravatar.cc/150?img=11',
            verified: true,
            hourlyRate: '₹350/hr'
        },
        {
            id: 2,
            name: 'Sunita Desai',
            role: 'Cleaning Expert',
            rating: '5.0',
            jobs: 89,
            location: 'Mumbai, MH',
            image: 'https://i.pravatar.cc/150?img=5',
            verified: true,
            hourlyRate: '₹250/hr'
        },
        {
            id: 3,
            name: 'Suresh Patel',
            role: 'Electrician',
            rating: '4.9',
            jobs: 204,
            location: 'Mumbai, MH',
            image: 'https://i.pravatar.cc/150?img=3',
            verified: true,
            hourlyRate: '₹400/hr'
        },
        {
            id: 4,
            name: 'Anita Roy',
            role: 'Salon Specialist',
            rating: '4.7',
            jobs: 56,
            location: 'Mumbai, MH',
            image: 'https://i.pravatar.cc/150?img=9',
            verified: true,
            hourlyRate: '₹500/hr'
        }
    ];

    return (
        <div className="space-y-6 animate-fade-in pb-10">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-display font-bold text-slate-900">Favorite Professionals</h1>
                    <p className="text-slate-500 mt-1">Your trusted service providers</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {favorites.map((worker) => (
                    <div key={worker.id} className="bg-white rounded-[2rem] border border-slate-100 p-6 shadow-sm hover:shadow-xl transition-all duration-300 group relative">
                        <button className="absolute top-6 right-6 p-2 bg-red-50 text-red-500 rounded-full hover:bg-red-100 transition-colors">
                            <Heart size={20} fill="currentColor" />
                        </button>

                        <div className="flex flex-col items-center text-center">
                            <div className="relative mb-4">
                                <img src={worker.image} alt={worker.name} className="w-24 h-24 rounded-2xl object-cover shadow-md group-hover:scale-105 transition-transform duration-500" />
                                {worker.verified && (
                                    <div className="absolute -bottom-2 -right-2 bg-white p-1 rounded-full shadow-sm">
                                        <div className="bg-blue-500 text-white p-1 rounded-full">
                                            <Shield size={12} fill="currentColor" />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <h3 className="text-lg font-bold text-slate-900 mb-1">{worker.name}</h3>
                            <p className="text-slate-500 text-sm font-medium mb-3">{worker.role}</p>

                            <div className="flex items-center gap-4 text-sm text-slate-600 mb-6 bg-slate-50 px-4 py-2 rounded-xl w-full justify-center">
                                <div className="flex items-center gap-1">
                                    <Star size={14} className="text-amber-400 fill-amber-400" />
                                    <span className="font-bold">{worker.rating}</span>
                                </div>
                                <div className="w-px h-4 bg-slate-200"></div>
                                <div className="flex items-center gap-1">
                                    <Award size={14} className="text-slate-400" />
                                    <span>{worker.jobs} Jobs</span>
                                </div>
                            </div>

                            <div className="w-full space-y-3">
                                <div className="flex justify-between items-center text-xs font-medium text-slate-500 px-2">
                                    <span className="flex items-center gap-1"><MapPin size={12} /> {worker.location}</span>
                                    <span className="text-slate-900 font-bold">{worker.hourlyRate}</span>
                                </div>
                                <button className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10">
                                    Book Now
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FavoriteWorkers;
