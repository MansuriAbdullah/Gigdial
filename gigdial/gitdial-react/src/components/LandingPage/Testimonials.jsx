import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, CheckCircle, ArrowRight } from 'lucide-react';

const reviews = [
    {
        name: "Anjali Mehta",
        role: "Home Owner",
        content: "GigDial made it so easy to find a reliable plumber for our kitchen renovation. The professional was on time and very skilled. Completely hassle-free experience!",
        rating: 5,
        image: "https://i.pravatar.cc/150?img=32",
        verified: true,
        category: "Plumbing",
        theme: "blue"
    },
    {
        name: "Vikram Singh",
        role: "Fitness Enthusiast",
        content: "Found my personal yoga trainer here. The interface is intuitive, and I love that I can see verified reviews before booking. Highly recommended for quality services.",
        rating: 5,
        image: "https://i.pravatar.cc/150?img=12",
        verified: true,
        category: "Wellness",
        theme: "rose"
    },
    {
        name: "Sneha Patel",
        role: "Event Planner",
        content: "Used GigDial for my daughter's birthday event. The decorators and photographers were top-notch. It's now my go-to app for all professional needs.",
        rating: 4,
        image: "https://i.pravatar.cc/150?img=26",
        verified: true,
        category: "Events",
        theme: "emerald"
    }
];

const Testimonials = () => {
    const themeStyles = {
        blue: {
            border: "border-blue-100/50",
            hoverBorder: "hover:border-blue-500/50",
            shadow: "shadow-blue-200/50",
            hoverShadow: "hover:shadow-blue-500/20",
            accent: "bg-blue-50",
            text: "text-blue-600",
            gradient: "from-blue-500/5 to-cyan-500/5",
            dot: "bg-blue-500"
        },
        rose: {
            border: "border-rose-100/50",
            hoverBorder: "hover:border-rose-500/50",
            shadow: "shadow-rose-200/50",
            hoverShadow: "hover:shadow-rose-500/20",
            accent: "bg-rose-50",
            text: "text-rose-600",
            gradient: "from-rose-500/5 to-pink-500/5",
            dot: "bg-rose-500"
        },
        emerald: {
            border: "border-emerald-100/50",
            hoverBorder: "hover:border-emerald-500/50",
            shadow: "shadow-emerald-200/50",
            hoverShadow: "hover:shadow-emerald-500/20",
            accent: "bg-emerald-50",
            text: "text-emerald-600",
            gradient: "from-emerald-500/5 to-teal-500/5",
            dot: "bg-emerald-500"
        }
    };

    return (
        <section className="py-24 bg-slate-50 relative overflow-hidden">
            {/* Background Accents - More Vibrant */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-400/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-[100px]"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-rose-400/10 rounded-full -translate-x-1/2 translate-y-1/2 blur-[100px]"></div>

            <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white shadow-xl shadow-slate-900/10 mb-6"
                    >
                        <Quote className="w-3 h-3 text-blue-400 fill-blue-400" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Our Community Pulse</span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight mb-6"
                    >
                        Loved by Industry Leaders & Locals
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-500 max-w-2xl mx-auto font-bold text-lg"
                    >
                        Real experiences from real people across 100+ categories.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {reviews.map((review, idx) => {
                        const style = themeStyles[review.theme];
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                whileHover={{ y: -15 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className={`bg-white p-9 rounded-[3rem] shadow-2xl ${style.shadow} ${style.hoverShadow} ${style.border} ${style.hoverBorder} border-2 transition-all duration-700 group relative overflow-hidden`}
                            >
                                {/* Theme Dot */}
                                <div className={`absolute top-0 right-0 w-32 h-32 ${style.gradient} rounded-full translate-x-12 -translate-y-12 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity`}></div>

                                <div className="mb-8 flex justify-between items-center relative z-10">
                                    <div className="flex gap-1.5">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-100'}`} />
                                        ))}
                                    </div>
                                    <div className={`p-2.5 ${style.accent} rounded-2xl ${style.text} transform -rotate-12 group-hover:rotate-0 transition-transform duration-500`}>
                                        <Quote className="w-6 h-6" />
                                    </div>
                                </div>

                                <p className="text-slate-700 mb-10 font-black text-lg leading-relaxed relative z-10">
                                    "{review.content}"
                                </p>

                                <div className="flex items-center gap-5 relative z-10 border-t border-slate-50 pt-8">
                                    <div className="relative">
                                        <div className={`absolute -inset-1.5 rounded-[1.4rem] bg-gradient-to-tr ${review.theme === 'blue' ? 'from-blue-600 to-cyan-400' : review.theme === 'rose' ? 'from-rose-600 to-orange-400' : 'from-emerald-600 to-teal-400'} opacity-30 group-hover:opacity-100 transition-opacity blur-[2px]`}></div>
                                        <img src={review.image} alt={review.name} className="relative w-16 h-16 rounded-[1.2rem] object-cover border-2 border-white shadow-lg" />
                                        {review.verified && (
                                            <div className={`absolute -bottom-1 -right-1 ${style.dot} text-white p-1 rounded-full border-2 border-white shadow-lg z-20`}>
                                                <CheckCircle className="w-3.5 h-3.5" />
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="font-black text-slate-900 text-xl tracking-tight">{review.name}</h4>
                                        <div className="flex items-center gap-2 mt-1">
                                            <div className={`w-2 h-2 rounded-full ${style.dot} animate-pulse`}></div>
                                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{review.role}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Bottom Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20 p-1 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl"
                >
                    <div className="bg-slate-900 rounded-[1.4rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="text-center md:text-left">
                            <h3 className="text-2xl md:text-3xl font-black text-white mb-2">Ready to experience it yourself?</h3>
                            <p className="text-indigo-200 font-bold">Join over 10,000+ satisfied users today.</p>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-white/5 flex items-center gap-3 group"
                        >
                            Get Started Now
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Testimonials;
