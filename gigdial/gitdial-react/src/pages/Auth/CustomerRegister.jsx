import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Phone, MapPin, ArrowRight, Check, Shield, Star, Lock, Heart, ShoppingBag, Search, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const StepIndicator = ({ currentStep, totalSteps }) => (
    <div className="flex items-center justify-center mb-8 lg:mb-12">
        {[...Array(totalSteps)].map((_, i) => (
            <React.Fragment key={i}>
                <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center font-bold text-base transition-all duration-500 ${i + 1 <= currentStep ? 'bg-gradient-to-br from-primary to-primary-dark text-white shadow-lg shadow-primary/30 scale-110' : 'bg-white border-2 border-slate-200 text-slate-400'}`}>
                    {i + 1 < currentStep ? <Check size={20} /> : i + 1}
                    {i + 1 === currentStep && i + 1 < totalSteps && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute -inset-3 rounded-full border-2 border-primary/30 border-dashed animate-spin-slow"
                            transition={{ duration: 0.3 }}
                        />
                    )}
                </div>
                {i < totalSteps - 1 && (
                    <div className="w-16 md:w-24 h-1 mx-2 bg-slate-200 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: i + 1 < currentStep ? '100%' : '0%' }}
                            transition={{ duration: 0.5 }}
                            className="h-full bg-primary"
                        />
                    </div>
                )}
            </React.Fragment>
        ))}
    </div>
);

const CustomerRegister = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        city: '',
        address: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError('');
    };

    const validateStep1 = () => {
        if (!formData.name || !formData.email || !formData.password || !formData.phone || !formData.city) {
            setError("Please fill in all required fields");
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return false;
        }
        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters");
            return false;
        }
        return true;
    };

    const handleRegister = async () => {
        if (!validateStep1()) return;

        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    phone: formData.phone,
                    city: formData.city,
                    address: formData.address,
                    isProvider: false // Customer
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            // Success, move to success screen
            setStep(2);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Dynamic Background */}
            <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-400/10 blur-[100px] rounded-full mix-blend-multiply animate-float"></div>
                <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-400/10 blur-[100px] rounded-full mix-blend-multiply animate-float" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="container max-w-6xl mx-auto relative z-10">
                <div className="text-center mb-10">
                    <Link to="/" className="inline-block mb-8 group">
                        <img src="/images/gigdial-logo.png" alt="GigDial" className="h-12 w-auto mx-auto group-hover:scale-105 transition-transform duration-300" />
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-800 mb-4">Join as a Customer</h1>
                    <p className="text-slate-500 text-lg max-w-2xl mx-auto">Find the perfect professional for your needs instantly.</p>
                </div>

                <div className="flex justify-center">
                    <div className="w-full max-w-5xl bg-white/80 backdrop-blur-xl border border-white/60 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
                            {/* Left Content Area - Form */}
                            <div className="lg:col-span-7 p-8 md:p-12">
                                {error && (
                                    <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium flex items-center gap-2">
                                        <Shield size={16} />
                                        {error}
                                    </div>
                                )}
                                <AnimatePresence mode="wait">
                                    {step === 1 && (
                                        <motion.div
                                            key="step1"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.3 }}
                                            className="space-y-8"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h2 className="text-2xl font-bold text-slate-800">Create Account</h2>
                                                    <p className="text-slate-500 mt-1">Fill in your details to get started.</p>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 gap-5">
                                                <div className="space-y-2 group">
                                                    <label className="text-sm font-semibold text-slate-700 ml-1">Full Name</label>
                                                    <div className="relative">
                                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
                                                        <input
                                                            type="text"
                                                            name="name"
                                                            value={formData.name}
                                                            onChange={handleChange}
                                                            placeholder="John Doe"
                                                            className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-2 group">
                                                    <label className="text-sm font-semibold text-slate-700 ml-1">Email Address</label>
                                                    <div className="relative">
                                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
                                                        <input
                                                            type="email"
                                                            name="email"
                                                            value={formData.email}
                                                            onChange={handleChange}
                                                            placeholder="john@example.com"
                                                            className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                    <div className="space-y-2 group">
                                                        <label className="text-sm font-semibold text-slate-700 ml-1">Password</label>
                                                        <div className="relative">
                                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
                                                            <input
                                                                type="password"
                                                                name="password"
                                                                value={formData.password}
                                                                onChange={handleChange}
                                                                placeholder="Create password"
                                                                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2 group">
                                                        <label className="text-sm font-semibold text-slate-700 ml-1">Confirm Password</label>
                                                        <div className="relative">
                                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
                                                            <input
                                                                type="password"
                                                                name="confirmPassword"
                                                                value={formData.confirmPassword}
                                                                onChange={handleChange}
                                                                placeholder="Confirm password"
                                                                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                    <div className="space-y-2 group">
                                                        <label className="text-sm font-semibold text-slate-700 ml-1">Phone Number</label>
                                                        <div className="relative">
                                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
                                                            <input
                                                                type="tel"
                                                                name="phone"
                                                                value={formData.phone}
                                                                onChange={handleChange}
                                                                placeholder="+91 98765 43210"
                                                                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2 group">
                                                        <label className="text-sm font-semibold text-slate-700 ml-1">City</label>
                                                        <div className="relative">
                                                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
                                                            <select
                                                                name="city"
                                                                value={formData.city}
                                                                onChange={handleChange}
                                                                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all appearance-none text-slate-600"
                                                            >
                                                                <option value="">Select City</option>
                                                                <option value="Mumbai">Mumbai</option>
                                                                <option value="Delhi">Delhi</option>
                                                                <option value="Bangalore">Bangalore</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <button
                                                onClick={handleRegister}
                                                disabled={loading}
                                                className="w-full bg-primary hover:bg-primary-dark text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300 disabled:opacity-70 disabled:pointer-events-none mt-4"
                                            >
                                                {loading ? <Loader2 className="animate-spin" size={20} /> : 'Create Account'}
                                                {!loading && <ArrowRight size={20} />}
                                            </button>

                                            <p className="text-center text-slate-500 mt-6">
                                                Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Log in</Link>
                                            </p>
                                        </motion.div>
                                    )}

                                    {step === 2 && (
                                        <motion.div
                                            key="step2"
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="text-center py-12 flex flex-col items-center justify-center h-full min-h-[400px]"
                                        >
                                            <div className="w-24 h-24 bg-gradient-to-tr from-green-400 to-green-600 rounded-full flex items-center justify-center text-white mx-auto mb-8 shadow-2xl shadow-green-500/30 animate-bump">
                                                <Check size={48} strokeWidth={3} />
                                            </div>
                                            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-800 mb-4">You're All Set!</h2>
                                            <p className="text-slate-500 text-lg mb-10 max-w-md mx-auto leading-relaxed">
                                                Your account has been created successfully. You can now login and start exploring services.
                                            </p>
                                            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md justify-center">
                                                <Link to="/login" className="btn-primary w-full justify-center py-4 text-lg">Go to Login</Link>
                                                <Link to="/" className="btn-secondary w-full justify-center py-4 text-lg">Back to Home</Link>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Right Content Area - Dynamic Sidebar */}
                            <div className="hidden lg:flex lg:col-span-5 bg-slate-900 relative overflow-hidden flex-col justify-between p-10 text-white">
                                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/90"></div>

                                <div className="relative z-10 mt-8">
                                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 rounded-full pl-1 pr-4 py-1 mb-8">
                                        <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-[10px] font-bold text-white">
                                            <Star size={12} fill="currentColor" />
                                        </div>
                                        <span className="text-sm font-semibold text-white tracking-wide">#1 Service Platform</span>
                                    </div>

                                    <h3 className="text-3xl font-display font-bold leading-tight mb-6">
                                        Expert help, <br /><span className="text-blue-400">just a click away.</span>
                                    </h3>

                                    <div className="space-y-6 mt-8">
                                        <div className="flex gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                                                <Search size={20} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-white">Find Professionals</h4>
                                                <p className="text-slate-400 text-sm">Browse thousands of verified profiles.</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                                                <Shield size={20} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-white">Secure Booking</h4>
                                                <p className="text-slate-400 text-sm">Safe payments and insurance coverage.</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-pink-500/20 flex items-center justify-center text-pink-400 shrink-0">
                                                <Heart size={20} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-white">Satisfaction Guaranteed</h4>
                                                <p className="text-slate-400 text-sm">We ensure high quality service delivery.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="relative z-10 mt-auto">
                                    <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10">
                                        <p className="text-slate-200 text-sm italic">"GigDial saved me so much time. I found a great plumber in minutes!"</p>
                                        <div className="flex items-center gap-3 mt-3">
                                            <div className="w-8 h-8 rounded-full bg-yellow-400"></div>
                                            <span className="text-sm font-bold">Sarah Jenkins</span>
                                        </div>
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

export default CustomerRegister;
