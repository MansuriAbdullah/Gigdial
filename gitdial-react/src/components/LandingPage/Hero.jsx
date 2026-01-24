import React from 'react';
import { ArrowRight, CheckCircle, TrendingUp, Users, Play, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const StatPill = ({ icon: Icon, value, label, color, delay }) => (
    <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay, duration: 0.6, type: "spring" }}
        whileHover={{ scale: 1.05, y: -2 }}
        className="flex items-center gap-2 lg:gap-3 bg-white/80 backdrop-blur-xl border border-white/60 p-2 pr-4 lg:p-3 lg:pr-6 rounded-2xl shadow-lg hover:shadow-xl hover:shadow-primary/10 transition-all cursor-default z-30"
    >
        <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-xl flex items-center justify-center ${color} text-white shadow-md transform group-hover:rotate-12 transition-transform`}>
            <Icon size={16} lg:size={20} strokeWidth={2.5} />
        </div>
        <div>
            <div className="text-sm lg:text-lg font-bold text-dark-surface leading-none mb-0.5 lg:mb-1">{value}</div>
            <div className="text-[9px] lg:text-[10px] font-bold text-slate-500 uppercase tracking-wider">{label}</div>
        </div>
    </motion.div>
);

const Hero = () => {
    return (
        <section className="relative min-h-[90vh] flex items-center pt-10 lg:pt-16 pb-12 lg:pb-16 overflow-hidden bg-white">
            {/* Animated Background Gradients - Reduced Intensity */}
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-gradient-to-br from-primary/15 to-secondary/10 rounded-full blur-[100px] -z-10"
            />

            <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center px-4 lg:px-6 mx-auto">
                {/* Content Side */}
                <div className="text-left order-2 lg:order-1 pt-8 lg:pt-0">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-secondary/20 text-primary font-bold text-[10px] lg:text-xs mb-6 shadow-sm cursor-default"
                    >
                        <span className="relative flex h-2 w-2 lg:h-2.5 lg:w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 lg:h-2.5 lg:w-2.5 bg-secondary"></span>
                        </span>
                        #1 COMMISSION-FREE MARKETPLACE
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.6 }}
                        className="text-4xl md:text-5xl lg:text-7xl font-display font-extrabold text-dark-surface leading-[1.1] mb-4 lg:mb-6 tracking-tight"
                    >
                        Find the perfect <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-600 to-secondary animate-gradient-x">Gig Worker</span>
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        > for any task.</motion.span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="text-base lg:text-xl text-slate-500 mb-8 lg:mb-10 leading-relaxed max-w-lg font-medium"
                    >
                        Connect with verified professionals.
                        <span className="block mt-1">
                            <span className="text-secondary font-bold">✓ 100% Trust.</span>
                            <span className="text-primary font-bold ml-2 lg:ml-4">✓ 0% Commission.</span>
                        </span>
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="flex flex-col sm:flex-row gap-3 lg:gap-4 mb-8 lg:mb-12"
                    >
                        <button className="btn-primary text-base lg:text-lg px-6 py-3 lg:px-8 lg:py-4 shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 group flex items-center justify-center gap-3 relative overflow-hidden">
                            <span className="relative z-10 font-bold">Get Started Free</span>
                            <ArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" strokeWidth={3} size={18} />
                            <div className="absolute inset-0 bg-gradient-to-r from-primary-dark to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </button>
                        <Link to="/services" className="px-6 py-3 lg:px-8 lg:py-4 rounded-xl bg-white text-dark-surface font-bold border border-slate-200 hover:bg-slate-50 hover:border-primary/30 hover:text-primary transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-lg">
                            <Play size={18} className="fill-current" /> <span className="text-base lg:text-lg">How it Works</span>
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="flex items-center gap-4 text-sm font-medium text-slate-500"
                    >
                        <div className="flex -space-x-3 lg:-space-x-4 hover:space-x-[-5px] transition-all duration-300">
                            {[1, 2, 3, 4].map(i => (
                                <img key={i} src={`https://i.pravatar.cc/100?img=${i + 25}`} className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border-[3px] border-white shadow-md hover:scale-110 hover:z-10 transition-transform" alt="User" />
                            ))}
                        </div>
                        <div className="flex flex-col">
                            <div className="flex text-yellow-500 text-xs lg:text-sm">
                                <Star size={12} fill="currentColor" />
                                <Star size={12} fill="currentColor" />
                                <Star size={12} fill="currentColor" />
                                <Star size={12} fill="currentColor" />
                                <Star size={12} fill="currentColor" />
                            </div>
                            <span className="text-xs lg:text-sm">Trusted by <span className="text-dark-surface font-bold">50,000+</span> users</span>
                        </div>
                    </motion.div>
                </div>

                {/* Image/Visual Side */}
                <div className="relative h-[400px] md:h-[500px] lg:h-[650px] flex items-center justify-center perspective-[2000px] order-1 lg:order-2 mb-8 lg:mb-0">
                    <motion.div
                        initial={{ opacity: 0, rotateY: 10, rotateX: 5, scale: 0.9 }}
                        animate={{ opacity: 1, rotateY: 0, rotateX: 0, scale: 1 }}
                        transition={{ duration: 1.2, type: "spring", bounce: 0.3 }}
                        whileHover={{ scale: 1.01, rotateY: 2 }}
                        className="relative w-full max-w-sm lg:max-w-md aspect-[4/5] bg-white rounded-[2rem] lg:rounded-[2.5rem] p-2 lg:p-3 shadow-2xl shadow-blue-900/10 border border-slate-100"
                    >
                        <div className="w-full h-full rounded-[1.8rem] lg:rounded-[2rem] overflow-hidden relative">
                            {/* New Hero Image - Indian Professional Context */}
                            <img src="https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&w=800&q=80" alt="Indian Professional" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/10 to-transparent"></div>

                            {/* Card Content */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 text-white">
                                <div className="inline-flex items-center gap-2 bg-secondary/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] lg:text-xs font-bold mb-2 lg:mb-3 border border-secondary/20 shadow-lg">
                                    <CheckCircle size={12} className="text-white" /> VERIFIED PRO
                                </div>
                                <div className="font-display font-bold text-2xl lg:text-3xl mb-1 text-white">Amit Patel</div>
                                <div className="text-slate-200 font-medium text-xs lg:text-sm mb-2 lg:mb-4 flex items-center gap-2">
                                    <span>Interior Designer</span>
                                    <span className="w-1 h-1 bg-slate-400 rounded-full"></span>
                                    <span>Delhi NCR</span>
                                </div>
                            </div>
                        </div>

                        {/* Side Floating UI Card - Compact */}
                        <motion.div
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute -right-4 lg:-right-8 bottom-24 lg:bottom-32 bg-white p-3 lg:p-4 rounded-xl lg:rounded-2xl shadow-xl shadow-slate-200 border border-slate-50 w-36 lg:w-48 hidden md:block"
                        >
                            <div className="flex items-center gap-2 lg:gap-3 mb-2">
                                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                    <TrendingUp size={16} lg:size={20} />
                                </div>
                                <div>
                                    <div className="text-[10px] lg:text-xs text-slate-500 font-bold uppercase">Earnings</div>
                                    <div className="text-sm lg:text-lg font-bold text-dark-surface">₹62,000</div>
                                </div>
                            </div>
                            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                <div className="w-[85%] h-full bg-green-500 rounded-full"></div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Floating Stats - Repositioned for Mobile */}
                    <div className="absolute top-12 -right-2 lg:top-24 lg:-right-4 z-20">
                        <StatPill icon={CheckCircle} value="100%" label="Verified" color="bg-secondary" delay={1} />
                    </div>
                    <div className="absolute bottom-12 -left-2 lg:bottom-20 lg:-left-12 z-20">
                        <StatPill icon={TrendingUp} value="0%" label="Commission" color="bg-accent" delay={1.2} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
