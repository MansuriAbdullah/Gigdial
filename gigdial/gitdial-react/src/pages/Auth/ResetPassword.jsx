import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, ArrowRight, Loader2, CheckCircle2, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            return setError('Passwords do not match');
        }

        if (password.length < 6) {
            return setError('Password must be at least 6 characters');
        }

        setLoading(true);
        setError('');

        try {
            const res = await fetch(`/api/users/reset-password/${token}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            setIsSuccess(true);
            // Redirect to login after 3 seconds
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-slate-50 font-sans">
            {/* Dynamic Background */}
            <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-[#0B3A69]/5 blur-[120px] rounded-full mix-blend-multiply animate-float"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-[#66CC33]/5 blur-[120px] rounded-full mix-blend-multiply animate-float" style={{ animationDelay: '2s' }}></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-[480px] bg-white/80 backdrop-blur-2xl border border-white/60 p-8 md:p-10 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] relative z-10"
            >
                <div className="mb-8 text-center">
                    <Link to="/" className="inline-block mb-6 group focus:outline-none active:bg-transparent">
                        <img src="/images/gigdial-logo.png" alt="GigDial" className="h-12 w-auto mx-auto group-hover:scale-105 transition-transform duration-300 mix-blend-multiply select-none" />
                    </Link>
                    <div className="w-16 h-16 bg-[#0B3A69]/10 rounded-2xl flex items-center justify-center text-[#0B3A69] mx-auto mb-6">
                        <Lock size={32} />
                    </div>

                    <h1 className="text-3xl font-black text-slate-800 mb-3 tracking-tighter uppercase leading-none text-center">
                        Create New<br/>Password
                    </h1>
                    <p className="text-slate-500 text-base leading-relaxed font-medium text-center">
                        Secure your account with a strong password.
                    </p>
                </div>

                <AnimatePresence mode='wait'>
                    {!isSuccess ? (
                        <motion.form
                            key="form"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="space-y-5"
                            onSubmit={handleSubmit}
                        >
                            {error && (
                                <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-bold flex items-center gap-2">
                                    <AlertCircle size={18} />
                                    {error}
                                </div>
                            )}

                            <div className="space-y-2 group text-left">
                                <label className="text-xs font-black text-slate-500 ml-1 uppercase tracking-widest">New Passcode</label>
                                <div className="relative transform group-focus-within:scale-[1.01] transition-transform duration-300">
                                    <div className="absolute left-0 top-0 bottom-0 w-14 flex items-center justify-center text-slate-400 group-focus-within:text-[#0B3A69] transition-colors">
                                        <Lock size={20} />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full pl-14 pr-12 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-[#0B3A69]/30 focus:ring-4 focus:ring-[#0B3A69]/10 transition-all duration-300 font-bold text-slate-700 placeholder:text-slate-300"
                                        required
                                    />
                                    <button 
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-2 group text-left">
                                <label className="text-xs font-black text-slate-500 ml-1 uppercase tracking-widest">Confirm New Passcode</label>
                                <div className="relative transform group-focus-within:scale-[1.01] transition-transform duration-300">
                                    <div className="absolute left-0 top-0 bottom-0 w-14 flex items-center justify-center text-slate-400 group-focus-within:text-[#0B3A69] transition-colors">
                                        <Lock size={20} />
                                    </div>
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full pl-14 pr-4 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-[#0B3A69]/30 focus:ring-4 focus:ring-[#0B3A69]/10 transition-all duration-300 font-bold text-slate-700 placeholder:text-slate-300"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading || !password || !confirmPassword}
                                className="w-full bg-[#0B3A69] hover:bg-[#082b4f] text-white font-black py-4 rounded-2xl shadow-xl shadow-[#0B3A69]/20 hover:shadow-2xl hover:shadow-[#0B3A69]/30 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 mt-2 disabled:opacity-50 disabled:pointer-events-none uppercase text-sm tracking-widest"
                            >
                                {loading ? <Loader2 className="animate-spin" size={20} /> : "Reset Password"}
                                {!loading && <ArrowRight size={20} />}
                            </button>
                        </motion.form>
                    ) : (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-4"
                        >
                            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 mx-auto mb-6 shadow-inner">
                                <CheckCircle2 size={40} />
                            </div>
                            <h2 className="text-2xl font-black text-slate-800 mb-3 tracking-tighter uppercase">Reset Complete!</h2>
                            <p className="text-slate-500 mb-8 leading-relaxed font-medium">
                                Your password has been updated successfully. <br/>
                                Redirecting you to login...
                            </p>
                            <Link
                                to="/login"
                                className="text-[#0B3A69] font-black text-sm uppercase tracking-widest hover:underline underline-offset-4 transition-all"
                            >
                                Login Now
                            </Link>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes float {
                    0%, 100% { transform: translate(0, 0); }
                    50% { transform: translate(10px, -20px); }
                }
                .animate-float {
                    animation: float 8s ease-in-out infinite;
                }
            `}} />
        </div>
    );
};

export default ResetPassword;
