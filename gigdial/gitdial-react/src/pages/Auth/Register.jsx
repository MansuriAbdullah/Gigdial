import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Phone, MapPin, Upload, ArrowRight, Check, Briefcase, FileText, Camera, Shield, Star, Award, CheckCircle, Clock, TrendingUp, Heart, BookOpen, BadgeCheck, RefreshCcw, Lock, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const StepIndicator = ({ currentStep, totalSteps }) => (
    <div className="flex items-center justify-center mb-8 lg:mb-12">
        {[...Array(totalSteps)].map((_, i) => (
            <React.Fragment key={i}>
                <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center font-bold text-base transition-all duration-500 ${i + 1 <= currentStep ? 'bg-gradient-to-br from-primary to-primary-dark text-white shadow-lg shadow-primary/30 scale-110' : 'bg-white border-2 border-slate-200 text-slate-400'}`}>
                    {i + 1 < currentStep ? <Check size={20} /> : i + 1}
                    {i + 1 === currentStep && (
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

const Register = () => {
    const [step, setStep] = useState(1);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        city: '',
        address: ''
    });
    const [files, setFiles] = useState({
        profileImage: null,
        aadhaarCard: null,
        panCard: null
    });
    const [previews, setPreviews] = useState({
        profileImage: null,
        aadhaarCard: null,
        panCard: null
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError('');
    };

    const handleFileChange = (e) => {
        const { name, files: selectedFiles } = e.target;
        if (selectedFiles && selectedFiles[0]) {
            setFiles(prev => ({ ...prev, [name]: selectedFiles[0] }));
            setPreviews(prev => ({ ...prev, [name]: URL.createObjectURL(selectedFiles[0]) }));
        }
    };

    const toggleSkill = (skill) => {
        if (selectedSkills.includes(skill)) {
            setSelectedSkills(selectedSkills.filter(s => s !== skill));
        } else {
            setSelectedSkills([...selectedSkills, skill]);
        }
    };

    const validateStep1 = () => {
        if (!formData.name || !formData.email || !formData.password || !formData.phone || !formData.city || !formData.address) {
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

    const nextStep = () => {
        if (step === 1) {
            if (validateStep1()) {
                setError('');
                setStep(2);
            }
        } else {
            setStep(prev => Math.min(prev + 1, 3));
        }
    };

    const prevStep = () => {
        setError('');
        setStep(prev => Math.max(prev - 1, 1));
    };

    const handleRegister = async () => {
        if (selectedSkills.length === 0) {
            setError("Please select at least one skill");
            return;
        }

        setLoading(true);
        setError('');

        try {
            const data = new FormData();
            data.append('name', formData.name);
            data.append('email', formData.email);
            data.append('password', formData.password);
            data.append('phone', formData.phone);
            data.append('city', formData.city);
            data.append('address', formData.address);
            data.append('isProvider', 'true');
            data.append('role', 'worker');
            data.append('skills', JSON.stringify(selectedSkills));

            if (files.profileImage) data.append('profileImage', files.profileImage);
            if (files.aadhaarCard) data.append('aadhaarCard', files.aadhaarCard);
            if (files.panCard) data.append('panCard', files.panCard);

            const res = await fetch('/api/users', {
                method: 'POST',
                body: data, // Fetch handles Content-Type for FormData automatically
            });

            const resData = await res.json();

            if (!res.ok) {
                throw new Error(resData.message || 'Registration failed');
            }

            // Success
            setStep(3);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const skillsList = [
        "Home Cleaning", "Plumbing", "Electrical", "Carpentry",
        "Painting", "Cooking", "Driver", "Gardening",
        "Pest Control", "Appliance Repair"
    ];

    const indianCities = [
        "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Ahmedabad", "Chennai", "Kolkata", "Surat", "Pune", "Jaipur",
        "Lucknow", "Kanpur", "Nagpur", "Indore", "Thane", "Bhopal", "Visakhapatnam", "Pimpri-Chinchwad", "Patna", "Vadodara",
        "Ghaziabad", "Ludhiana", "Agra", "Nashik", "Faridabad", "Meerut", "Rajkot", "Kalyan-Dombivli", "Vasai-Virar", "Varanasi",
        "Srinagar", "Aurangabad", "Dhanbad", "Amritsar", "Navi Mumbai", "Allahabad", "Ranchi", "Howrah", "Coimbatore", "Jabalpur",
        "Gwalior", "Vijayawada", "Jodhpur", "Madurai", "Raipur", "Kota", "Guwahati", "Chandigarh", "Solapur", "Hubli-Dharwad",
        "Bareilly", "Moradabad", "Mysore", "Gurgaon", "Aligarh", "Jalandhar", "Tiruchirappalli", "Bhubaneswar", "Salem", "Mira-Bhayandar",
        "Warangal", "Thiruvananthapuram", "Bhiwandi", "Saharanpur", "Guntur", "Amravati", "Bikaner", "Noida", "Jamshedpur", "Bhilai",
        "Cuttack", "Firozabad", "Kochi", "Nellore", "Bhavnagar", "Dehradun", "Durgapur", "Asansol", "Rourkela", "Nanded",
        "Kolhapur", "Ajmer", "Akola", "Gulbarga", "Jamnagar", "Ujjain", "Loni", "Siliguri", "Jhansi", "Ulhasnagar",
        "Jammu", "Sangli-Miraj & Kupwad", "Mangalore", "Erode", "Belgaum", "Ambattur", "Tirunelveli", "Malegaon", "Gaya", "Jalgaon",
        "Udaipur", "Maheshtala"
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Dynamic Background */}
            <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-primary/10 blur-[100px] rounded-full mix-blend-multiply animate-float"></div>
                <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-secondary/10 blur-[100px] rounded-full mix-blend-multiply animate-float" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="container max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-10">
                    <Link to="/" className="inline-block mb-8 group">
                        <img src="/images/gigdial-logo.png" alt="GigDial" className="h-12 w-auto mx-auto group-hover:scale-105 transition-transform duration-300" />
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-800 mb-4">Join as a Professional</h1>
                    <p className="text-slate-500 text-lg max-w-2xl mx-auto">Start calling your own shots. Earn more with 0% commission and get paid instantly.</p>
                </div>

                <StepIndicator currentStep={step} totalSteps={3} />

                <motion.div
                    layout
                    className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
                        {/* Left Content Area */}
                        <div className="lg:col-span-8 p-8 md:p-12">
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
                                                <h2 className="text-2xl font-bold text-slate-800">Personal Information</h2>
                                                <p className="text-slate-500 mt-1">Tell us a bit about yourself to get started.</p>
                                            </div>
                                            <div className="relative group cursor-pointer">
                                                <input
                                                    type="file"
                                                    name="profileImage"
                                                    onChange={handleFileChange}
                                                    className="hidden"
                                                    id="profile-upload"
                                                    accept="image/*"
                                                />
                                                <label htmlFor="profile-upload" className="w-24 h-24 rounded-2xl bg-slate-100 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 hover:border-primary hover:bg-primary/5 hover:text-primary transition-all overflow-hidden cursor-pointer relative">
                                                    {previews.profileImage ? (
                                                        <img src={previews.profileImage} alt="Profile" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <>
                                                            <Camera size={24} className="mb-1" />
                                                            <span className="text-[10px] font-bold uppercase">Upload</span>
                                                        </>
                                                    )}
                                                </label>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                                            {/* Password Fields */}
                                            <div className="space-y-2 group">
                                                <label className="text-sm font-semibold text-slate-700 ml-1">Password</label>
                                                <div className="relative">
                                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
                                                    <input
                                                        type="password"
                                                        name="password"
                                                        value={formData.password}
                                                        onChange={handleChange}
                                                        placeholder="Create a password"
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
                                                    <input
                                                        type="text"
                                                        name="city"
                                                        value={formData.city}
                                                        onChange={handleChange}
                                                        list="indian-cities"
                                                        placeholder="Select or type your city"
                                                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-slate-600"
                                                    />
                                                    <datalist id="indian-cities">
                                                        {indianCities.map((city) => (
                                                            <option key={city} value={city} />
                                                        ))}
                                                    </datalist>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-2 group">
                                            <label className="text-sm font-semibold text-slate-700 ml-1">Complete Address</label>
                                            <textarea
                                                name="address"
                                                value={formData.address}
                                                onChange={handleChange}
                                                rows="2"
                                                placeholder="House No, Building, Street Area"
                                                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all resize-none"
                                            ></textarea>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 2 && (
                                    <motion.div
                                        key="step2"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-8"
                                    >
                                        <div>
                                            <h2 className="text-2xl font-bold text-slate-800">Professional Details</h2>
                                            <p className="text-slate-500 mt-1">Showcase your skills and verify your identity.</p>
                                        </div>

                                        <div className="space-y-4">
                                            <label className="text-sm font-semibold text-slate-700 ml-1">Select Your Skills</label>
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                                {skillsList.map((skill) => (
                                                    <div
                                                        key={skill}
                                                        onClick={() => toggleSkill(skill)}
                                                        className={`cursor-pointer px-4 py-3 rounded-xl border transition-all duration-200 flex items-center gap-2 ${selectedSkills.includes(skill) ? 'bg-primary/5 border-primary text-primary shadow-sm' : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-primary/50'}`}
                                                    >
                                                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${selectedSkills.includes(skill) ? 'bg-primary border-primary' : 'border-slate-300'}`}>
                                                            {selectedSkills.includes(skill) && <Check size={12} className="text-white" />}
                                                        </div>
                                                        <span className="text-sm font-medium">{skill}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-slate-700 ml-1">Upload Aadhaar Card</label>
                                                <input
                                                    type="file"
                                                    name="aadhaarCard"
                                                    onChange={handleFileChange}
                                                    className="hidden"
                                                    id="aadhaar-upload"
                                                    accept="image/*,application/pdf"
                                                />
                                                <label
                                                    htmlFor="aadhaar-upload"
                                                    className={`border-2 border-dashed rounded-2xl p-6 text-center hover:bg-slate-50 transition-colors cursor-pointer group block ${files.aadhaarCard ? 'border-primary bg-primary/5' : 'border-slate-300'}`}
                                                >
                                                    <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-500 mx-auto mb-3 group-hover:scale-110 transition-transform">
                                                        <FileText size={20} />
                                                    </div>
                                                    <p className="text-sm text-slate-500 font-medium">
                                                        {files.aadhaarCard ? files.aadhaarCard.name : "Front & Back Side"}
                                                    </p>
                                                    <p className="text-xs text-slate-400 mt-1">PDF or Image (Max 5MB)</p>
                                                </label>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-slate-700 ml-1">Upload PAN Card</label>
                                                <input
                                                    type="file"
                                                    name="panCard"
                                                    onChange={handleFileChange}
                                                    className="hidden"
                                                    id="pan-upload"
                                                    accept="image/*,application/pdf"
                                                />
                                                <label
                                                    htmlFor="pan-upload"
                                                    className={`border-2 border-dashed rounded-2xl p-6 text-center hover:bg-slate-50 transition-colors cursor-pointer group block ${files.panCard ? 'border-primary bg-primary/5' : 'border-slate-300'}`}
                                                >
                                                    <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-500 mx-auto mb-3 group-hover:scale-110 transition-transform">
                                                        <Briefcase size={20} />
                                                    </div>
                                                    <p className="text-sm text-slate-500 font-medium">
                                                        {files.panCard ? files.panCard.name : "Front Side Only"}
                                                    </p>
                                                    <p className="text-xs text-slate-400 mt-1">PDF or Image (Max 5MB)</p>
                                                </label>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 3 && (
                                    <motion.div
                                        key="step3"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center py-12 flex flex-col items-center justify-center h-full min-h-[400px]"
                                    >
                                        <div className="w-24 h-24 bg-gradient-to-tr from-green-400 to-green-600 rounded-full flex items-center justify-center text-white mx-auto mb-8 shadow-2xl shadow-green-500/30 animate-bump">
                                            <Check size={48} strokeWidth={3} />
                                        </div>
                                        <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-800 mb-4">Registration Successful!</h2>
                                        <p className="text-slate-500 text-lg mb-10 max-w-md mx-auto leading-relaxed">
                                            Welcome to GigDial! We've received your details. Our team will verify your documents and activate your account within 24 hours.
                                        </p>
                                        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md justify-center">
                                            <Link to="/login" className="btn-primary w-full justify-center py-4 text-lg">Go to Login</Link>
                                            <Link to="/" className="btn-secondary w-full justify-center py-4 text-lg">Back to Home</Link>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Step Navigation */}
                            {step < 3 && (
                                <div className="flex justify-between items-center mt-12 pt-8 border-t border-slate-100">
                                    {step > 1 ? (
                                        <button onClick={prevStep} className="px-8 py-3 text-slate-600 font-bold hover:text-primary transition-colors">Back</button>
                                    ) : <div></div>}

                                    {step === 2 ? (
                                        <button
                                            onClick={handleRegister}
                                            disabled={loading}
                                            className="bg-primary hover:bg-primary-dark text-white px-10 py-4 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300 disabled:opacity-70 disabled:pointer-events-none"
                                        >
                                            {loading ? <Loader2 className="animate-spin" size={20} /> : 'Submit Application'}
                                            {!loading && <ArrowRight size={20} />}
                                        </button>
                                    ) : (
                                        <button onClick={nextStep} className="bg-primary hover:bg-primary-dark text-white px-10 py-4 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300">
                                            Next Step <ArrowRight size={20} />
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Right Content Area - Dynamic Sidebar */}
                        <div className="hidden lg:flex lg:col-span-4 bg-[#0F172A] relative overflow-hidden flex-col justify-between p-4 text-white">
                            {/* Abstract Shapes/Gradients */}
                            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/80 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/80 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>

                            {/* Grid Pattern Overlay */}
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>

                            {step < 3 ? (
                                <div className="relative z-10 mt-8">
                                    <div className="inline-flex items-center gap-2 bg-slate-800/50 backdrop-blur-md border border-slate-700/50 rounded-full pl-1 pr-4 py-1 mb-8 shadow-xl shadow-black/10">
                                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary to-primary-light flex items-center justify-center text-[10px] font-bold text-white">
                                            <Shield size={12} fill="currentColor" />
                                        </div>
                                        <span className="text-sm font-semibold text-indigo-100 tracking-wide">Trust & Safety First</span>
                                    </div>

                                    <h3 className="text-4xl font-display font-bold leading-[1.15] mb-6 text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400">
                                        Join the community of trusted experts.
                                    </h3>

                                    <div className="space-y-8 mt-12">
                                        <div className="flex gap-5 group">
                                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-105 transition-transform duration-300">
                                                <Award className="text-secondary" size={26} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-lg mb-1.5 text-slate-100">Skill Verification</h4>
                                                <p className="text-slate-400 text-sm leading-relaxed">We ensure you get jobs that match your expertise perfectly.</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-5 group">
                                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-105 transition-transform duration-300">
                                                <Shield className="text-secondary" size={26} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-lg mb-1.5 text-slate-100">Standard Security</h4>
                                                <p className="text-slate-400 text-sm leading-relaxed">Your data is encrypted and protected with enterprise-grade security.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="relative z-10 mt-8 h-full flex flex-col">
                                    <h3 className="text-2xl font-display font-bold mb-6 text-white">Verification Status</h3>

                                    <div className="bg-white/40 rounded-2xl p-6 mb-8 text-center shadow-xl relative overflow-hidden">
                                        <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold mb-3">
                                            <Clock size={12} /> Pending Verification
                                        </div>
                                        <h4 className="font-bold text-slate-800 text-lg mb-1">Your documents are being verified by our team</h4>
                                        <p className="text-slate-900 text-sm">This usually takes 24-48 hours</p>
                                    </div>

                                    <div className="space-y-1">
                                        <h4 className="flex items-center gap-2 text-lg font-bold text-white mb-4">
                                            <Star className="text-secondary" fill="currentColor" size={20} />
                                            Your Benefits as a GigDial Worker
                                        </h4>

                                        <ul className="space-y-4">
                                            <li className="flex items-start gap-3">
                                                <RefreshCcw className="text-white shrink-0 mt-0.5" size={20} />
                                                <div>
                                                    <span className="font-bold text-slate-100">No-Lead Refund:</span>
                                                    <span className="text-slate-400 text-sm ml-1">Get your money back if you don't receive enough leads</span>
                                                </div>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <TrendingUp className="text-white shrink-0 mt-0.5" size={20} />
                                                <div>
                                                    <span className="font-bold text-slate-100">Stable Income:</span>
                                                    <span className="text-slate-400 text-sm ml-1">Average workers earn ₹35,000/month</span>
                                                </div>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <Heart className="text-white shrink-0 mt-0.5" size={20} />
                                                <div>
                                                    <span className="font-bold text-slate-100">Health Insurance:</span>
                                                    <span className="text-slate-400 text-sm ml-1">Free health coverage for you and your family</span>
                                                </div>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <BookOpen className="text-white shrink-0 mt-0.5" size={20} />
                                                <div>
                                                    <span className="font-bold text-slate-100">Free Training:</span>
                                                    <span className="text-slate-400 text-sm ml-1">Skill development workshops and certifications</span>
                                                </div>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <BadgeCheck className="text-white shrink-0 mt-0.5" size={20} />
                                                <div>
                                                    <span className="font-bold text-slate-100">Verified Badge:</span>
                                                    <span className="text-slate-400 text-sm ml-1">Stand out with our trust badge</span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Register;
