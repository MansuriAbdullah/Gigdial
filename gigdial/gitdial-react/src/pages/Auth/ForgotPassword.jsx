import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowRight, Loader2, KeyRound, CheckCircle2, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/users/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            setIsSubmitted(true);
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
                <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-[#0B3A69]/5 blur-[120px] rounded-full mix-blend-multiply animate-float"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-[#66CC33]/5 blur-[120px] rounded-full mix-blend-multiply animate-float" style={{ animationDelay: '2s' }}></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-[480px] bg-white/80 backdrop-blur-2xl border border-white/60 p-8 md:p-10 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] relative z-10"
            >
                <div className="mb-8">
                    <Link to="/login" className="inline-flex items-center gap-2 text-slate-500 hover:text-[#0B3A69] font-bold text-sm transition-colors group mb-6">
                        <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Login
                    </Link>

                    <div className="w-16 h-16 bg-[#0B3A69]/10 rounded-2xl flex items-center justify-center text-[#0B3A69] mb-6">
                        <KeyRound size={32} />
                    </div>

                    <h1 className="text-3xl font-black text-slate-800 mb-3 tracking-tighter uppercase leading-none">
                        Forgot <br/>Password?
                    </h1>
                    <p className="text-slate-500 text-base leading-relaxed">
                        No worries, it happens! Enter your email and we'll send you reset instructions.
                    </p>
                </div>

                <AnimatePresence mode='wait'>
                    {!isSubmitted ? (
                        <motion.form
                            key="form"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="space-y-6"
                            onSubmit={handleSubmit}
                        >
                            {error && (
                                <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium">
                                    {error}
                                </div>
                            )}

                            <div className="space-y-2 group">
                                <label className="text-sm font-semibold text-slate-700 ml-1 tracking-tight">Email Connection</label>
                                <div className="relative transform group-focus-within:scale-[1.01] transition-transform duration-300">
                                    <div className="absolute left-0 top-0 bottom-0 w-14 flex items-center justify-center text-slate-400 group-focus-within:text-[#0B3A69] transition-colors">
                                        <Mail size={20} />
                                    </div>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="name@example.com"
                                        className="w-full pl-14 pr-4 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-[#0B3A69]/30 focus:ring-4 focus:ring-[#0B3A69]/10 transition-all duration-300 font-medium text-slate-700 placeholder:text-slate-400"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading || !email}
                                className="w-full bg-[#0B3A69] hover:bg-[#082b4f] text-white font-black py-4 rounded-2xl shadow-xl shadow-[#0B3A69]/20 hover:shadow-2xl hover:shadow-[#0B3A69]/30 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 mt-2 disabled:opacity-50 disabled:pointer-events-none uppercase text-sm tracking-widest"
                            >
                                {loading ? <Loader2 className="animate-spin" size={20} /> : "Send Reset Link"}
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
                            <h2 className="text-2xl font-black text-slate-800 mb-3 tracking-tighter uppercase">Check Your Inbox</h2>
                            <p className="text-slate-500 mb-8 leading-relaxed">
                                We've sent password reset instructions to <br/>
                                <strong className="text-slate-900 font-bold">{email}</strong>
                            </p>
                            <button
                                onClick={() => setIsSubmitted(false)}
                                className="text-[#0B3A69] font-black text-sm uppercase tracking-widest hover:underline underline-offset-4 transition-all"
                            >
                                Use a different email
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="mt-10 pt-8 border-t border-slate-100 text-center">
                    <p className="text-slate-500 text-sm font-medium">
                        Remember your password?{' '}
                        <Link to="/login" className="text-[#0B3A69] font-black hover:underline underline-offset-4 transition-all uppercase text-xs tracking-wider">
                            Go Back to Login
                        </Link>
                    </p>
                </div>
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

export default ForgotPassword;
