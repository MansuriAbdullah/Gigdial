import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Upload, ArrowRight, Check } from 'lucide-react';

const StepIndicator = ({ currentStep, totalSteps }) => (
    <div className="flex items-center justify-center mb-12">
        {[...Array(totalSteps)].map((_, i) => (
            <React.Fragment key={i}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${i + 1 <= currentStep ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-slate-100 text-slate-400'}`}>
                    {i + 1 < currentStep ? <Check size={18} /> : i + 1}
                </div>
                {i < totalSteps - 1 && (
                    <div className={`w-16 h-1 rounded-full mx-2 transition-all duration-300 ${i + 1 < currentStep ? 'bg-primary' : 'bg-slate-100'}`}></div>
                )}
            </React.Fragment>
        ))}
    </div>
);

const Register = () => {
    const [step, setStep] = useState(1);

    const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    return (
        <div className="min-h-screen bg-slate-50 py-20 flex items-center justify-center">
            <div className="container max-w-4xl mx-auto px-4">

                <div className="text-center mb-12">
                    <h1 className="text-4xl font-display font-bold text-dark-surface mb-4">Join as a Professional</h1>
                    <p className="text-slate-500 text-lg">Earn more with 0% commission. Sign up in 3 easy steps.</p>
                </div>

                <StepIndicator currentStep={step} totalSteps={3} />

                <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100"
                >
                    {step === 1 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <input type="text" placeholder="John Doe" className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <input type="email" placeholder="john@example.com" className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700">Phone Number</label>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <input type="tel" placeholder="+91 98765 43210" className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700">City</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <select className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none text-slate-600">
                                            <option>Select City</option>
                                            <option>Mumbai</option>
                                            <option>Delhi</option>
                                            <option>Bangalore</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold mb-6">Professional Details</h2>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700">Select Service Category</label>
                                    <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none text-slate-600">
                                        <option>Select Category</option>
                                        <option>Home Cleaning</option>
                                        <option>Electrician</option>
                                        <option>Plumber</option>
                                        <option>Web Developer</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700">Experience (Years)</label>
                                    <input type="number" placeholder="e.g. 5" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700">Upload ID Proof (Aadhaar/PAN)</label>
                                    <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center hover:bg-slate-50 transition-colors cursor-pointer group">
                                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-4 group-hover:scale-110 transition-transform">
                                            <Upload size={24} />
                                        </div>
                                        <p className="text-sm text-slate-500 font-medium">Click to upload or drag and drop</p>
                                        <p className="text-xs text-slate-400 mt-1">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="text-center py-12">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-6 animate-bounce">
                                <Check size={40} />
                            </div>
                            <h2 className="text-3xl font-bold text-dark-surface mb-4">Registration Successful!</h2>
                            <p className="text-slate-500 text-lg mb-8 max-w-md mx-auto">
                                Thank you for joining GigDial. We will verify your documents and activate your account within 24 hours.
                            </p>
                            <button className="btn-primary w-full md:w-auto px-12">Go to Dashboard</button>
                        </div>
                    )}

                    {/* Step Navigation */}
                    {step < 3 && (
                        <div className="flex justify-between mt-12 pt-8 border-t border-slate-100">
                            {step > 1 ? (
                                <button onClick={prevStep} className="btn-secondary px-8">Back</button>
                            ) : <div></div>}
                            <button onClick={nextStep} className="btn-primary px-8 flex items-center gap-2">
                                {step === 2 ? 'Submit' : 'Next Step'} <ArrowRight size={20} />
                            </button>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default Register;
