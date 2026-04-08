import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Send, MessageSquare, User, Briefcase, Clock, CheckCircle, ChevronRight, Scale } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';

const CustomerComplain = () => {
    const { t } = useLanguage();
    const [bookings, setBookings] = useState([]);
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    
    // Form state
    const [formData, setFormData] = useState({
        orderId: '',
        defendantId: '',
        reason: '',
        description: ''
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            
            // Fetch bookings to populate the worker list
            const bookingsRes = await fetch('/api/orders/myorders', {
                headers: { 'Authorization': `Bearer ${userInfo?.token}` }
            });
            const bookingsData = await bookingsRes.json();
            setBookings(bookingsData);

            // Fetch existing disputes (we'll need a route for user's own disputes)
            // For now, let's assume we might need a new endpoint or filter
            const disputesRes = await fetch('/api/disputes', {
                headers: { 'Authorization': `Bearer ${userInfo?.token}` }
            });
            const disputesData = await disputesRes.json();
            // Filter disputes where current user is the complainant
            const userDisputes = disputesData.filter(d => d.complainant?._id === userInfo._id || d.complainant === userInfo._id);
            setComplaints(userDisputes);

        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleBookingChange = (e) => {
        const orderId = e.target.value;
        const booking = bookings.find(b => b._id === orderId);
        setFormData({
            ...formData,
            orderId,
            defendantId: booking ? booking.seller?._id : ''
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.reason || !formData.description) {
            alert('Please fill in all required fields');
            return;
        }

        setSubmitting(true);
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const res = await fetch('/api/disputes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userInfo?.token}`
                },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                alert('Complain submitted successfully! Admin will review it.');
                setFormData({ orderId: '', defendantId: '', reason: '', description: '' });
                fetchData(); // Refresh list
            } else {
                const error = await res.json();
                alert(error.message || 'Failed to submit complain');
            }
        } catch (error) {
            console.error('Submit error:', error);
            alert('An error occurred');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                        <Scale className="text-primary" size={32} />
                        {t('complain')} & Disputes
                    </h1>
                    <p className="text-slate-500 font-medium">Report issues with services or workers to our support team.</p>
                </div>
            </div>

            <div className="grid lg:grid-cols-5 gap-8">
                {/* Complain Form */}
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="lg:col-span-3 space-y-6"
                >
                    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 p-6 md:p-8">
                        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <Send size={20} className="text-primary" />
                            Submit New Complain
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Select Booking (Optional)</label>
                                    <div className="relative">
                                        <Briefcase className="absolute left-3 top-3 text-slate-400" size={18} />
                                        <select
                                            value={formData.orderId}
                                            onChange={handleBookingChange}
                                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none font-medium transition-all"
                                        >
                                            <option value="">N/A - General Complain</option>
                                            {bookings.map(b => (
                                                <option key={b._id} value={b._id}>
                                                    {b.gig?.title || 'Unknown Service'} ({b.seller?.name})
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Complain Reason</label>
                                    <div className="relative">
                                        <AlertCircle className="absolute left-3 top-3 text-slate-400" size={18} />
                                        <select
                                            required
                                            value={formData.reason}
                                            onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none font-medium transition-all"
                                        >
                                            <option value="">Select a reason</option>
                                            <option value="Behavior">Unprofessional Behavior</option>
                                            <option value="Quality">Poor Work Quality</option>
                                            <option value="Overcharging">Overcharging / Pricing Issue</option>
                                            <option value="NoShow">Worker Didn't Show Up</option>
                                            <option value="Delay">Significant Delay</option>
                                            <option value="Safety">Safety Concern</option>
                                            <option value="Other">Other Issues</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {!formData.orderId && (
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Defendant ID (Worker ID if known)</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-3 text-slate-400" size={18} />
                                        <input
                                            type="text"
                                            placeholder="Enter worker ID or name..."
                                            value={formData.defendantId}
                                            onChange={(e) => setFormData({ ...formData, defendantId: e.target.value })}
                                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none font-medium transition-all"
                                        />
                                    </div>
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
                                <textarea
                                    required
                                    rows="5"
                                    placeholder="Please provide details about what happened..."
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none font-medium transition-all resize-none"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-lg shadow-xl shadow-slate-900/20 hover:shadow-slate-900/40 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:transform-none"
                            >
                                {submitting ? (
                                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <Send size={22} />
                                        {t('submitComplain')}
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </motion.div>

                {/* History Section */}
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="lg:col-span-2 space-y-6"
                >
                    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 p-6">
                        <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <Clock size={20} className="text-slate-400" />
                            Your Complaints
                        </h2>

                        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                            {complaints.length > 0 ? (
                                complaints.map((complaint) => (
                                    <div 
                                        key={complaint._id}
                                        className="p-4 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-primary/20 transition-all group"
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                                                complaint.status === 'resolved' 
                                                ? 'bg-green-50 text-green-700 border-green-100' 
                                                : 'bg-orange-50 text-orange-700 border-orange-100'
                                            }`}>
                                                {complaint.status}
                                            </span>
                                            <span className="text-[10px] text-slate-400 font-bold">
                                                {new Date(complaint.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <h4 className="font-bold text-slate-900 group-hover:text-primary transition-colors">{complaint.reason}</h4>
                                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">{complaint.description}</p>
                                        
                                        {complaint.resolution && (
                                            <div className="mt-3 p-2 bg-blue-50 rounded-lg border border-blue-100">
                                                <p className="text-[10px] font-black text-blue-700 flex items-center gap-1">
                                                    <CheckCircle size={10} />
                                                    ADMIN RESOLUTION:
                                                </p>
                                                <p className="text-[11px] text-blue-800 font-medium mt-1">{complaint.resolution}</p>
                                            </div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-10">
                                    <MessageSquare size={40} className="mx-auto text-slate-200 mb-3" />
                                    <p className="text-sm text-slate-400 font-bold">No complaints found</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Support Card */}
                    <div className="bg-gradient-to-br from-primary to-blue-700 rounded-3xl p-6 text-white shadow-xl shadow-primary/20">
                        <h3 className="font-bold text-lg mb-2">Need Immediate Help?</h3>
                        <p className="text-white/80 text-sm mb-4 leading-relaxed">If this is an emergency or safety concern, please contact our 24/7 helpline immediately.</p>
                        <button className="w-full py-3 bg-white text-primary rounded-xl font-bold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
                            <AlertCircle size={18} />
                            Contact Support
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default CustomerComplain;
