import React from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowRight, CheckCircle2, Star } from 'lucide-react';

const LiveDemoSection = () => {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative rounded-[2.5rem] bg-[#0F172A] overflow-hidden shadow-2xl shadow-blue-900/20 group"
                >
                    {/* Dynamic Background Gradients */}
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-500/30 transition-colors duration-700"></div>
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3 group-hover:bg-emerald-400/20 transition-colors duration-700"></div>

                    {/* Grid Pattern Overlay */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 mix-blend-overlay"></div>

                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center p-8 md:p-12 lg:p-16 relative z-10">
                        {/* Left Content */}
                        <div className="space-y-8 text-white relative">
                            {/* Floating Decoration */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -top-12 -left-12 opacity-50 pointer-events-none"
                            >
                                <div className="w-24 h-24 border border-white/10 rounded-full"></div>
                                <div className="absolute inset-4 border border-white/5 rounded-full"></div>
                            </motion.div>

                            <div>
                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-[1.1] tracking-tight">
                                    See GigDial <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">In Action</span>
                                </h2>

                                <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/10 px-5 py-2.5 rounded-full font-bold text-sm md:text-base mb-6 shadow-xl shadow-black/5 hover:bg-white/20 transition-colors cursor-default">
                                    <span className="relative flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                                    </span>
                                    <span className="text-emerald-300 font-extrabold tracking-wide">LIVE</span>
                                    <span className="w-px h-4 bg-white/20 mx-1"></span>
                                    <span className="text-slate-200">Monday - Friday • 2 PM IST</span>
                                </div>
                            </div>

                            <div className="space-y-6 max-w-lg">
                                <p className="text-slate-300 text-lg md:text-xl font-medium leading-relaxed">
                                    Join our <span className="text-emerald-400 font-bold border-b-2 border-emerald-500/30 pb-0.5">FREE Daily Demo</span> to discover how to hire verified professionals instantly.
                                </p>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="group relative px-8 py-4 bg-white text-slate-900 rounded-2xl font-bold text-lg shadow-xl shadow-white/5 overflow-hidden flex items-center gap-3"
                                >
                                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-slate-100 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                                    <span className="relative z-10">Book a Demo</span>
                                    <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                                </motion.button>
                            </div>
                        </div>

                        {/* Right Content - Video/Image Container */}
                        <div className="relative perspective-1000">
                            <motion.div
                                initial={{ rotateY: 10, rotateX: 5 }}
                                whileHover={{ rotateY: 0, rotateX: 0 }}
                                transition={{ duration: 0.5 }}
                                className="relative rounded-3xl overflow-hidden border border-white/10 bg-slate-800 aspect-video shadow-2xl shadow-black/50 group cursor-pointer"
                            >
                                {/* Thumbnail */}
                                <img
                                    src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1600&q=80"
                                    alt="Demo Preview"
                                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 group-hover:opacity-40 transition-all duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>

                                {/* Play Button */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-20">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-emerald-500 rounded-full blur-xl opacity-40 animate-pulse"></div>
                                        <div className="w-20 h-20 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform duration-300">
                                            <Play className="w-8 h-8 text-white fill-white ml-1" />
                                        </div>
                                    </div>
                                    <span className="text-white font-bold text-lg tracking-wider opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                        Watch Video
                                    </span>
                                </div>

                                {/* Floating Trusted Badge */}
                                <motion.div
                                    animate={{ y: [0, -8, 0] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute bottom-6 left-6 right-6 sm:right-auto bg-white/10 backdrop-blur-lg border border-white/10 p-4 rounded-xl flex items-center gap-4 shadow-lg z-30"
                                >
                                    <div className="bg-emerald-500/20 p-2.5 rounded-lg">
                                        <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                                    </div>
                                    <div className="text-white">
                                        <p className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">Trusted By</p>
                                        <p className="text-sm font-bold flex items-center gap-2">
                                            10k+ Daily Users
                                            <span className="flex text-yellow-400">
                                                <Star className="w-3 h-3 fill-current" />
                                                <Star className="w-3 h-3 fill-current" />
                                                <Star className="w-3 h-3 fill-current" />
                                            </span>
                                        </p>
                                    </div>
                                </motion.div>
                            </motion.div>

                            {/* Decorative Background for Video */}
                            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-[2.5rem] blur-2xl opacity-20 -z-10 group-hover:opacity-30 transition-opacity duration-500"></div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default LiveDemoSection;
