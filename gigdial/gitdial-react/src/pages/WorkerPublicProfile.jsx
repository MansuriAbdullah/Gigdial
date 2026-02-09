import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    MapPin, Star, Briefcase, Calendar, CheckCircle,
    User, Mail, Phone, Shield, ArrowLeft, Heart, MessageSquare
} from 'lucide-react';

const WorkerPublicProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [worker, setWorker] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        fetchWorkerDetails();
    }, [id]);

    const fetchWorkerDetails = async () => {
        try {
            const response = await fetch(`/api/users/workers/${id}`);
            if (response.ok) {
                const data = await response.json();
                setWorker(data);
                // Check if favorite logic here if needed, or separate call
            } else {
                console.error('Failed to fetch worker');
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => {
        navigate(-1);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!worker) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 gap-4">
                <h2 className="text-2xl font-bold text-slate-900">Worker Not Found</h2>
                <button onClick={handleBack} className="px-6 py-2 bg-blue-600 text-white rounded-xl font-bold">
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Cover Image & Header */}
            <div className="relative h-64 bg-slate-900">
                <img
                    src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop"
                    alt="Cover"
                    className="w-full h-full object-cover opacity-40"
                />
                <div className="absolute top-6 left-6 z-10">
                    <button onClick={handleBack} className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all">
                        <ArrowLeft size={24} />
                    </button>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 -mt-20 relative z-10">
                <div className="bg-white rounded-[2rem] shadow-xl p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start">
                    {/* Profile Image */}
                    <div className="relative shrink-0">
                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-[6px] border-white shadow-lg overflow-hidden bg-white">
                            {worker.profileImage ? (
                                <img
                                    src={`http://localhost:5000/${worker.profileImage.replace(/\\/g, '/')}`}
                                    alt={worker.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-600 text-5xl font-bold">
                                    {worker.name.charAt(0)}
                                </div>
                            )}
                        </div>
                        {worker.isVerified && (
                            <div className="absolute bottom-2 right-2 bg-green-500 border-4 border-white w-8 h-8 rounded-full flex items-center justify-center text-white" title="Verified">
                                <CheckCircle size={16} />
                            </div>
                        )}
                    </div>

                    {/* Basic Info */}
                    <div className="flex-1 pt-2">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                            <div>
                                <h1 className="text-3xl font-bold text-slate-900">{worker.name}</h1>
                                <p className="text-slate-500 font-medium text-lg mt-1 flex items-center gap-2">
                                    {worker.skills?.[0] || 'Service Provider'}
                                    {worker.isVerified && (
                                        <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full text-xs font-bold border border-blue-100 flex items-center gap-1">
                                            <Shield size={10} className="fill-blue-600" /> Verified
                                        </span>
                                    )}
                                </p>
                            </div>
                            <div className="flex gap-3">
                                <button className="p-3 rounded-xl border border-slate-200 text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                                    <Heart size={20} />
                                </button>
                                <button
                                    onClick={() => navigate(`/customer-dashboard/messages?workerId=${worker._id}`)}
                                    className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20 flex items-center gap-2">
                                    <MessageSquare size={18} />
                                    Contact
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4 mt-6 text-sm font-medium text-slate-600">
                            {worker.city && (
                                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 rounded-lg">
                                    <MapPin size={16} className="text-slate-400" />
                                    {worker.city}
                                </div>
                            )}
                            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 rounded-lg">
                                <Star size={16} className="text-yellow-400 fill-yellow-400" />
                                {worker.rating || '4.5'} ({worker.numReviews || 0} reviews)
                            </div>
                            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 rounded-lg">
                                <Briefcase size={16} className="text-slate-400" />
                                {worker.experience || 0}+ Years Exp
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Bio */}
                        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
                            <h3 className="text-xl font-bold text-slate-900 mb-4">About Me</h3>
                            <p className="text-slate-600 leading-relaxed">
                                {worker.bio || "This worker hasn't added a bio yet."}
                            </p>
                        </div>

                        {/* Skills */}
                        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
                            <h3 className="text-xl font-bold text-slate-900 mb-6">Skills & Services</h3>
                            <div className="flex flex-wrap gap-2">
                                {worker.skills?.map((skill, idx) => (
                                    <span key={idx} className="px-4 py-2 bg-blue-50 text-blue-700 rounded-xl font-bold text-sm">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Portfolio / Work History */}
                        {worker.portfolio && worker.portfolio.length > 0 && (
                            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
                                <h3 className="text-xl font-bold text-slate-900 mb-6">Work Portfolio</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {worker.portfolio.map((item) => (
                                        <div key={item._id} className="group relative rounded-xl overflow-hidden aspect-video">
                                            <img
                                                src={`http://localhost:5000/${item.images[0]?.replace(/\\/g, '/')}`}
                                                alt={item.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                                                <h4 className="text-white font-bold">{item.title}</h4>
                                                <p className="text-white/80 text-sm line-clamp-1">{item.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Reviews */}
                        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
                            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                Reviews
                                <span className="text-slate-400 text-lg font-medium">({worker.reviews?.length || 0})</span>
                            </h3>

                            {worker.reviews && worker.reviews.length > 0 ? (
                                <div className="space-y-6">
                                    {worker.reviews.map((review) => (
                                        <div key={review._id} className="border-b border-slate-100 last:border-0 pb-6 last:pb-0">
                                            <div className="flex items-start gap-4">
                                                <div className="w-12 h-12 rounded-full bg-slate-100 overflow-hidden shrink-0">
                                                    {review.reviewer?.profileImage ? (
                                                        <img
                                                            src={`http://localhost:5000/${review.reviewer.profileImage.replace(/\\/g, '/')}`}
                                                            alt={review.reviewer.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-600 font-bold">
                                                            {review.reviewer?.name?.charAt(0) || 'U'}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <h4 className="font-bold text-slate-900">{review.reviewer?.name || 'Anonymous User'}</h4>
                                                        <span className="text-xs text-slate-400">{new Date(review.createdAt).toLocaleDateString()}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1 mb-2">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                size={14}
                                                                className={i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-slate-200"}
                                                            />
                                                        ))}
                                                    </div>
                                                    <p className="text-slate-600 text-sm leading-relaxed">
                                                        {review.comment}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-10 text-slate-500">
                                    No reviews yet. Be the first to hire and review!
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        {/* Availability */}
                        <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100">
                            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <Calendar className="text-blue-600" size={20} />
                                Availability
                            </h3>
                            <div className="space-y-3">
                                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                                    <div key={day} className="flex justify-between items-center text-sm">
                                        <span className="font-bold text-slate-700 w-12">{day}</span>
                                        <div className="flex-1 mx-3 border-b border-dashed border-slate-200"></div>
                                        <span className="text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded text-xs">Available</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100">
                            <h3 className="text-lg font-bold text-slate-900 mb-4">Contact Info</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-slate-600">
                                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                                        <Mail size={18} />
                                    </div>
                                    <div className="truncate">
                                        <p className="text-xs text-slate-400 font-bold uppercase">Email</p>
                                        <p className="font-medium text-sm truncate">{worker.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 text-slate-600">
                                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                                        <Phone size={18} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400 font-bold uppercase">Phone</p>
                                        <p className="font-medium text-sm">+91 {worker.phone || '98765 43210'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkerPublicProfile;
