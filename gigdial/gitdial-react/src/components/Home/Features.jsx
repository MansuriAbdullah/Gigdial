import React from 'react';
import { ShieldCheck, DollarSign, Clock, Mic, Heart, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const FeatureCard = ({ icon: Icon, title, description, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        whileHover={{ y: -5 }}
        className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all cursor-default group"
    >
        <div className="w-16 h-16 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white group-hover:border-primary group-hover:rotate-6 transition-all duration-300 shadow-sm text-primary">
            <Icon size={32} strokeWidth={1.5} />
        </div>
        <h3 className="text-xl font-display font-bold text-dark-surface mb-3 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-slate-500 leading-relaxed">
            {description}
        </p>
    </motion.div>
);

const Features = () => {
    const features = [
        {
            icon: ShieldCheck,
            title: "100% Verified Workers",
            description: "Every gig worker undergoes Aadhaar and PAN verification plus comprehensive background checks for your safety."
        },
        {
            icon: DollarSign,
            title: "0% Commission Fee",
            description: "Subscription-based model means workers keep 100% of their earnings. Fair pricing for customers too."
        },
        {
            icon: Clock,
            title: "Instant Booking",
            description: "Book services instantly or schedule for later. Flexible timing to match your convenience."
        },
        {
            icon: Mic,
            title: "Voice Search in Hindi",
            description: "Search in Hindi or English using voice commands - perfect for users of all literacy levels."
        },
        {
            icon: Heart,
            title: "Worker Welfare",
            description: "Free health insurance, skill training, and financial support for all verified gig workers."
        },
        {
            icon: Star,
            title: "Quality Guarantee",
            description: "Ratings, reviews, and satisfaction guarantee on all services. Your happiness is our priority."
        }
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <section id="how-it-works" className="py-32 bg-slate-50 relative overflow-hidden">
            {/* Bg Pattern */}
            <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#004AAD_1px,transparent_1px)] [background-size:24px_24px]"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-block"
                    >
                        <span className="text-secondary font-bold tracking-wider uppercase text-sm mb-4 block">Why Choose Us</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-4xl md:text-5xl font-display font-extrabold text-dark-surface mb-6"
                    >
                        Redefining the Gig Economy
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-xl text-slate-500 font-light"
                    >
                        We are India's first commission-free marketplace, built on trust, transparency, and technology.
                    </motion.p>
                </div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {features.map((feature, index) => (
                        <FeatureCard key={index} {...feature} index={index} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Features;
