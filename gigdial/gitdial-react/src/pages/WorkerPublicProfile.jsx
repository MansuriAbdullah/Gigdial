import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
    MapPin, Star, Briefcase, Calendar, CheckCircle,
    User, Mail, Phone, Shield, ArrowLeft, Heart, MessageSquare,
    Clock, Award, Zap, TrendingUp, X, Send
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const ServiceCard = ({ title, rating, image, category, price, bookings, onBook, gigId }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.03, y: -8 }}
        viewport={{ once: true }}
        onClick={() => onBook(gigId)}
        className="relative flex-shrink-0 w-full bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-md hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 group cursor-pointer"
    >
        {/* Premium badge for high ratings */}
        {parseFloat(rating) >= 4.8 && (
            <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-yellow-500 to-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                <Award className="w-3 h-3" />
                <span>Premium</span>
            </div>
        )}

        <div className="h-48 overflow-hidden relative">
            <img
                src={image}
                alt={title}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-60"></div>

            {/* Category tag */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full border border-white/20">
                {category}
            </div>
        </div>

        {/* Content */}
        <div className="p-5">
            <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                    {title}
                </h3>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <div className="flex items-center bg-blue-50 px-3 py-1.5 rounded-lg">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="ml-1.5 font-bold text-slate-800">{rating}</span>
                        <span className="text-xs text-slate-500 ml-1">/ 5.0</span>
                    </div>
                </div>

                <div className="flex items-center text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>2h avg.</span>
                </div>
            </div>

            {/* Price and CTA */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div>
                    <div className="text-xs text-slate-500">Starting from</div>
                    <div className="text-xl font-bold text-slate-900">
                        ₹{price}
                        <span className="text-sm text-slate-500 font-normal ml-1">/session</span>
                    </div>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                        e.stopPropagation();
                        onBook(gigId);
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                    Book Now
                </motion.button>
            </div>
        </div>
    </motion.div>
);

const WorkerPublicProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();
    const [worker, setWorker] = useState(null);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    // Modal state
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(location.state?.prefilledPhoneNumber || '');
    const [sending, setSending] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Worker Details
                const workerRes = await fetch(`/api/users/workers/${id}`);
                if (workerRes.ok) {
                    const workerData = await workerRes.json();
                    setWorker(workerData);
                } else {
                    console.error('Failed to fetch worker');
                }

                // Fetch Worker Services (Gigs)
                const gigsRes = await fetch(`/api/gigs/worker/${id}`);
                if (gigsRes.ok) {
                    const gigsData = await gigsRes.json();
                    setServices(gigsData);
                }

            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    // Check for pending booking intent after login
    useEffect(() => {
        if (user && location.state?.bookingGigId && services.length > 0) {
            const gigId = location.state.bookingGigId;
            const service = services.find(s => s._id === gigId);

            if (service) {
                setSelectedService(service);
                setModalOpen(true);
                // Clean up state to prevent reopening on refresh (optional but good UX)
                navigate(location.pathname, { replace: true, state: {} });
            }
        }
    }, [user, location.state, services, navigate, location.pathname]);

    const handleBack = () => {
        navigate(-1);
    };

    const handleBookService = (gigId) => {
        // Robust check for user login
        const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

        if (!user || (user && !user._id) || !userInfo) {
            toast.error('Please login first to book a service');

            // Redirect to login with state to return and open modal
            navigate('/login', {
                state: {
                    from: location,
                    bookingGigId: gigId
                }
            });
            return;
        }

        const service = services.find(s => s._id === gigId);
        if (service) {
            setSelectedService(service);
            setModalOpen(true);
        }
    };

    const handleSubmitContact = async (e) => {
        e.preventDefault();
        if (!phoneNumber.trim()) {
            toast.error("Please enter your phone number");
            return;
        }

        setSending(true);
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const token = userInfo?.token;

            if (!token) {
                throw new Error("Authentication error");
            }

            await fetch('/api/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    recipientId: worker._id,
                    content: `Hello, I'm interested in your service "${selectedService.title}". My contact number is: ${phoneNumber}. Please get back to me.`
                })
            });

            toast.success("Message sent successfully!");
            setModalOpen(false);
            setPhoneNumber('');

        } catch (error) {
            console.error("Failed to send message", error);
            toast.error("Failed to send message. Please try again.");
        } finally {
            setSending(false);
        }
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
                                    onClick={() => {
                                        const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
                                        if (!user || (user && !user._id) || !userInfo) {
                                            toast.error('Please login to contact the worker');
                                            navigate('/login', {
                                                state: {
                                                    from: location
                                                }
                                            });
                                        } else {
                                            navigate(`/customer-dashboard/messages?workerId=${worker._id}`);
                                        }
                                    }}
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

                        {/* Services Grid (Gigs) */}
                        {services.length > 0 && (
                            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
                                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                    <Zap className="text-blue-600" size={20} />
                                    Offered Services
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {services.map((service) => (
                                        <ServiceCard
                                            key={service._id}
                                            gigId={service._id}
                                            title={service.title}
                                            rating={service.rating?.toString() || '0'}
                                            image={service.image || service.coverImage || 'https://images.unsplash.com/photo-1581578731117-104f8a3d46a8?auto=format&fit=crop&w=600&q=80'}
                                            category={service.category}
                                            price={service.price}
                                            bookings={service.salesCount || 0}
                                            onBook={handleBookService}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Skills */}
                        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
                            <h3 className="text-xl font-bold text-slate-900 mb-6">Skills</h3>
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
                        <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 relative overflow-hidden group">
                            {!user && (
                                <div className="absolute inset-0 z-10 bg-white/60 backdrop-blur-sm flex items-center justify-center transition-all duration-300">
                                    <button
                                        onClick={() => navigate('/login', { state: { from: location } })}
                                        className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition-colors transform hover:scale-105"
                                    >
                                        Log in to view details
                                    </button>
                                </div>
                            )}
                            <h3 className="text-lg font-bold text-slate-900 mb-4">Contact Info</h3>
                            <div className={`space-y-4 ${!user ? 'blur-sm select-none' : ''}`}>
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

            {/* Book Service Modal */}
            <AnimatePresence>
                {modalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl relative"
                        >
                            <button
                                onClick={() => setModalOpen(false)}
                                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
                            >
                                <X size={24} />
                            </button>

                            <div className="text-center mb-6">
                                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Phone className="text-blue-600 w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900">Book {selectedService?.title}</h3>
                                <p className="text-slate-500 mt-2">Enter your number to contact {worker.name}.</p>
                            </div>

                            <form onSubmit={handleSubmitContact} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                                    <input
                                        type="tel"
                                        required
                                        placeholder="+91 9876543210"
                                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={sending}
                                    className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                                >
                                    {sending ? 'Sending...' : (
                                        <>
                                            <Send size={18} /> Send Message
                                        </>
                                    )}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default WorkerPublicProfile;
