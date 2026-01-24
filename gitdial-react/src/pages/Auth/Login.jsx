import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Login = () => {
    const [role, setRole] = useState('customer'); // 'customer' or 'worker'

    return (
        <div className="min-h-[90vh] flex items-center justify-center p-6 bg-slate-50 relative overflow-hidden">
            {/* Abstract Background */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[100px] rounded-full"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/20 blur-[100px] rounded-full"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/80 backdrop-blur-xl border border-white/50 p-8 md:p-12 rounded-[2rem] shadow-2xl max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10"
            >
                {/* Left Side - Form */}
                <div className="flex flex-col justify-center">
                    <div className="mb-8">
                        <Link to="/" className="text-2xl font-display font-bold text-dark-surface flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 bg-primary text-white rounded-lg flex items-center justify-center">G</div>
                            GigDial
                        </Link>
                        <h2 className="text-3xl font-display font-bold text-dark-surface mb-2">Welcome Back</h2>
                        <p className="text-light-text">Please enter your details to sign in.</p>
                    </div>

                    {/* Role Toggle */}
                    <div className="bg-slate-100 p-1.5 rounded-xl flex mb-8 relative">
                        <div
                            className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-white rounded-lg shadow-sm transition-all duration-300 ease-in-out ${role === 'worker' ? 'translate-x-[calc(100%+8px)]' : 'translate-x-0'}`}
                        ></div>
                        <button
                            className={`flex-1 py-2.5 text-sm font-semibold rounded-lg relative z-10 transition-colors ${role === 'customer' ? 'text-dark-surface' : 'text-light-text'}`}
                            onClick={() => setRole('customer')}
                        >
                            Customer
                        </button>
                        <button
                            className={`flex-1 py-2.5 text-sm font-semibold rounded-lg relative z-10 transition-colors ${role === 'worker' ? 'text-dark-surface' : 'text-light-text'}`}
                            onClick={() => setRole('worker')}
                        >
                            Gig Worker
                        </button>
                    </div>

                    <form className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-dark-surface">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-light-text w-5 h-5" />
                                <input
                                    type="email"
                                    placeholder="name@example.com"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 pl-12 text-dark outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-semibold text-dark-surface">Password</label>
                                <a href="#" className="text-sm text-primary hover:text-primary-dark font-medium">Forgot?</a>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-light-text w-5 h-5" />
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 pl-12 text-dark outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                />
                            </div>
                        </div>

                        <button type="button" className="w-full btn-primary py-4 rounded-xl mt-4 flex items-center justify-center gap-2 group">
                            Sign in as {role === 'customer' ? 'Customer' : 'Worker'}
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    <p className="text-center mt-8 text-light-text">
                        Don't have an account? <Link to="/register" className="text-primary font-bold hover:underline">Sign up</Link>
                    </p>
                </div>

                {/* Right Side - Visual */}
                <div className="hidden md:flex flex-col justify-between bg-primary rounded-[2rem] p-8 text-white relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-dark z-0"></div>
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay z-0 transition-transform duration-1000 group-hover:scale-110"></div>

                    <div className="relative z-10">
                        <div className="inline-flex bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium border border-white/20 mb-6">
                            New: Workers Insurance
                        </div>
                        <h3 className="text-4xl font-display font-bold leading-tight mb-4">
                            One platform for <br />
                            <span className="text-secondary-light">work & services.</span>
                        </h3>
                        <p className="text-indigo-100 leading-relaxed max-w-sm">
                            Join 10,000+ verified workers and 50,000+ happy customers on India's first commission-free marketplace.
                        </p>
                    </div>

                    <div className="relative z-10 space-y-4">
                        {[
                            'Instant Bookings',
                            'Direct Payment',
                            'No Hidden Fees'
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full bg-secondary text-white flex items-center justify-center">
                                    <CheckCircle size={14} />
                                </div>
                                <span className="font-medium text-lg">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
