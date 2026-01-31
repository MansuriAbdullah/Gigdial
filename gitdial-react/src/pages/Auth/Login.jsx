import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Star, Shield, Clock, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
    const [role, setRole] = useState('customer'); // 'customer' or 'worker'
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError('');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/users/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Login failed');
            }

            // Use context login
            login(data);

            // Redirect based on user role from DB (overrides toggle if mismatched, 
            // or we could enforce toggle match. Let's just trust DB role for redirection)
            if (data.isAdmin) {
                navigate('/admin');
            } else if (data.isProvider) { // Assuming backend returns isProvider
                navigate('/worker-dashboard');
            } else {
                navigate('/customer-dashboard');
            }

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-slate-50">
            {/* Dynamic Background */}
            <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-primary/10 blur-[120px] rounded-full mix-blend-multiply animate-float"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-secondary/10 blur-[120px] rounded-full mix-blend-multiply animate-float" style={{ animationDelay: '2s' }}></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] bg-white/80 backdrop-blur-2xl border border-white/60 relative z-10"
            >
                {/* Left Side - Form */}
                <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center order-2 lg:order-1 relative">
                    {/* Role Toggle Switch */}
                    <div className="absolute top-8 right-8 lg:top-12 lg:right-12">
                        <div className="bg-slate-100/80 p-1 rounded-xl flex shadow-inner">
                            <button
                                onClick={() => setRole('customer')}
                                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ${role === 'customer' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                Customer
                            </button>
                            <button
                                onClick={() => setRole('worker')}
                                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ${role === 'worker' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                Worker
                            </button>
                        </div>
                    </div>

                    <div className="mb-10 mt-6 lg:mt-0">
                        <Link to="/" className="inline-block mb-8 group">
                            <img src="/images/gigdial-logo.png" alt="GigDial" className="h-12 w-auto group-hover:scale-105 transition-transform duration-300" />
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-800 mb-4 tracking-tight">
                            Welcome Back
                        </h1>
                        <p className="text-slate-500 text-lg">
                            Sign in to access your {role === 'customer' ? 'customer dashboard' : 'worker account'}.
                        </p>
                    </div>

                    <form className="space-y-6" onSubmit={handleLogin}>
                        {error && (
                            <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium">
                                {error}
                            </div>
                        )}
                        <div className="space-y-2 group">
                            <label className="text-sm font-semibold text-slate-700 ml-1">Email Connection</label>
                            <div className="relative transform group-focus-within:scale-[1.01] transition-transform duration-300">
                                <div className="absolute left-0 top-0 bottom-0 w-14 flex items-center justify-center text-slate-400 group-focus-within:text-primary transition-colors">
                                    <Mail size={20} />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="name@example.com"
                                    className="w-full pl-14 pr-4 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/10 transition-all duration-300 font-medium text-slate-700 placeholder:text-slate-400"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2 group">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-sm font-semibold text-slate-700">Passcode</label>
                                <a href="#" className="text-xs font-semibold text-primary hover:text-primary-dark transition-colors">Forgot Password?</a>
                            </div>
                            <div className="relative transform group-focus-within:scale-[1.01] transition-transform duration-300">
                                <div className="absolute left-0 top-0 bottom-0 w-14 flex items-center justify-center text-slate-400 group-focus-within:text-primary transition-colors">
                                    <Lock size={20} />
                                </div>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="w-full pl-14 pr-4 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/10 transition-all duration-300 font-medium text-slate-700 placeholder:text-slate-400"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary text-white font-bold py-4 rounded-2xl shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 mt-4 disabled:opacity-70 disabled:pointer-events-none"
                        >
                            {loading ? <Loader2 className="animate-spin" size={20} /> : 'Sign In'}
                            {!loading && <ArrowRight size={20} />}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-slate-500">
                        New to GigDial?{' '}
                        <Link to={role === 'customer' ? "/register/customer" : "/register"} className="text-primary font-bold hover:text-primary-dark underline decoration-2 decoration-transparent hover:decoration-primary/30 underline-offset-4 transition-all">
                            Create Account
                        </Link>
                    </p>
                </div>

                {/* Right Side - Visual */}
                <div className="relative hidden lg:flex items-center justify-center p-12 order-1 lg:order-2 bg-slate-900 overflow-hidden group">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay transition-transform duration-[2s] group-hover:scale-105"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-blue-900/90 mix-blend-multiply"></div>

                    <div className="relative z-10 max-w-md text-white">
                        <h2 className="text-4xl text-white font-display font-bold leading-tight mb-6">
                            Constructing a better <span className="text-secondary-light">future together.</span>
                        </h2>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/15 transition-colors">
                                <div className="p-2 bg-secondary/20 rounded-lg text-secondary-light">
                                    <Star size={24} fill="currentColor" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-white">Top Rated Pros</h3>
                                    <p className="text-indigo-100/80 text-sm leading-relaxed">Access the top 1% of skilled professionals in your area instantly.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/15 transition-colors">
                                <div className="p-2 bg-white/10 rounded-lg text-white">
                                    <Shield size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-white">Secure & Safe</h3>
                                    <p className="text-indigo-100/80 text-sm leading-relaxed">Every professional involves a thorough background verification process.</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 flex items-center gap-4">
                            <div className="flex -space-x-4">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="w-12 h-12 rounded-full border-2 border-indigo-900 bg-slate-200 overflow-hidden">
                                        <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                            <div className="text-sm font-medium">
                                <span className="block text-xl font-bold">12k+</span>
                                <span className="text-indigo-200">Active Pros</span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
