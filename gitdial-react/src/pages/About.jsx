import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Heart, Globe, Award, Sparkles } from 'lucide-react';

const ValueCard = ({ icon: Icon, title, description, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
        whileHover={{ y: -5 }}
        className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-card-hover transition-all cursor-default group"
    >
        <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
            <Icon size={28} strokeWidth={1.5} />
        </div>
        <h3 className="text-xl font-display font-bold text-dark-surface mb-3 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-slate-500 leading-relaxed">
            {description}
        </p>
    </motion.div>
);

const TeamMember = ({ name, role, img, delay }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.4 }}
        className="group relative"
    >
        <div className="relative h-80 rounded-[2rem] overflow-hidden mb-4 shadow-md bg-slate-100">
            <img src={img} alt={name} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300 text-white">
                    <p className="font-medium text-sm">"Passionate about building trust."</p>
                </div>
            </div>
        </div>
        <h4 className="text-xl font-bold text-dark-surface">{name}</h4>
        <p className="text-primary font-medium text-sm uppercase tracking-wider">{role}</p>
    </motion.div>
)

const About = () => {
    return (
        <div className="min-h-screen bg-slate-50 overflow-hidden">
            {/* Hero Section */}
            <section className="relative py-24 md:py-32">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-50/50 to-transparent -z-10"></div>
                <div className="container mx-auto px-6 text-center max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-500 text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
                            <Sparkles size={12} className="text-primary" /> Our Story
                        </div>
                        <h1 className="text-5xl md:text-7xl font-display font-extrabold text-dark-surface mb-8 tracking-tight">
                            Empowering India's <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Gig Workforce</span>
                        </h1>
                        <p className="text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto">
                            We are on a mission to organize the hyperlocal service industry by connecting skilled professionals with customers through technology, trust, and transparency.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 border-y border-slate-200/60 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-100">
                        {[
                            { label: "Active Workers", value: "10k+" },
                            { label: "Safe Outcomes", value: "50k+" },
                            { label: "Cities Covered", value: "12+" },
                            { label: "Customer Rating", value: "4.8/5" }
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="p-4"
                            >
                                <div className="text-4xl md:text-5xl font-display font-bold text-dark-surface mb-2">{stat.value}</div>
                                <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission & Values */}
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-dark-surface mb-4">Core Values</h2>
                        <p className="text-lg text-slate-500">The principles that guide every decision we make.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <ValueCard
                            icon={Target}
                            title="Transparency First"
                            description="No hidden fees. No commission cuts. Workers keep 100% of what they earn, and customers know exactly what they pay for."
                            delay={0}
                        />
                        <ValueCard
                            icon={Heart}
                            title="Worker Welfare"
                            description="We provide insurance, upskilling workshops, and financial support to ensure our partners grow with us."
                            delay={0.2}
                        />
                        <ValueCard
                            icon={Globe}
                            title="Hyperlocal Focus"
                            description="Technology built for Bharat. Available in regional languages and designed for users of all digital literacy levels."
                            delay={0.4}
                        />
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-24 bg-dark text-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary-dark/50 via-dark to-dark opacity-50"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                        <div className="max-w-xl">
                            <h2 className="text-4xl font-display font-bold mb-4">Meet the Minds</h2>
                            <p className="text-slate-400 text-lg">A diverse team of engineers, designers, and problem solvers building for the next billion users.</p>
                        </div>
                        <button className="btn-primary px-8 py-3">Join Our Team</button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        <TeamMember name="Aditya Mehta" role="Co-Founder & CEO" img="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80" delay={0} />
                        <TeamMember name="Priya Singh" role="Head of Operations" img="https://images.unsplash.com/photo-1573496359-136d4755be36?auto=format&fit=crop&q=80" delay={0.2} />
                        <TeamMember name="Vikram Malhotra" role="CTO" img="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80" delay={0.4} />
                        <TeamMember name="Sanya Kapoor" role="Product Design" img="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80" delay={0.6} />
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-white text-center">
                <div className="container mx-auto px-6 max-w-2xl">
                    <Award size={48} className="text-primary mx-auto mb-6" />
                    <h2 className="text-4xl font-display font-bold text-dark-surface mb-6">Ready to make a difference?</h2>
                    <p className="text-xl text-slate-500 mb-10">Join thousands of others in the revolution of the gig economy.</p>
                    <div className="flex justify-center gap-4">
                        <button className="btn-primary px-8 py-4 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all">Get Started</button>
                        <button className="btn-secondary px-8 py-4 bg-slate-50">Contact Us</button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
