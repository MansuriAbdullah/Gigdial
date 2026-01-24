import React from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

const ContactItem = ({ icon: Icon, title, value, subtext, color }) => (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-card-hover transition-all duration-300">
        <div className={`w-12 h-12 rounded-2xl ${color} bg-opacity-10 flex items-center justify-center text-${color.replace('bg-', '')}-600 mb-4`}>
            <Icon size={24} />
        </div>
        <h3 className="font-bold text-lg text-dark-surface mb-1">{title}</h3>
        <p className="text-primary font-semibold mb-1">{value}</p>
        <p className="text-sm text-slate-500">{subtext}</p>
    </div>
);

const Contact = () => {
    return (
        <div className="min-h-screen bg-slate-50 py-20">
            <div className="container mx-auto px-4 max-w-6xl">

                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block"
                    >
                        Get in Touch
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-display font-bold text-dark-surface mb-6"
                    >
                        We're here to help you.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-slate-500"
                    >
                        Have a question about our services, pricing, or just want to verify a professional? Drop us a line.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20 animate-fade-in relative z-10">
                    <ContactItem
                        icon={Phone}
                        title="Call Us"
                        value="+91-98765-43210"
                        subtext="Mon-Sat from 9am to 6pm"
                        color="bg-blue-500"
                    />
                    <ContactItem
                        icon={Mail}
                        title="Email Us"
                        value="support@gigdial.com"
                        subtext="We reply within 2 hours"
                        color="bg-purple-500"
                    />
                    <ContactItem
                        icon={MapPin}
                        title="Visit Us"
                        value="Mumbai, India"
                        subtext="View on Google Maps"
                        color="bg-green-500"
                    />
                </div>

                {/* Form Section */}
                <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden flex flex-col md:flex-row">
                    {/* Visual Side */}
                    <div className="md:w-5/12 bg-dark relative p-12 text-white flex flex-col justify-between overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary to-purple-900 opacity-90 z-0"></div>
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-overlay opacity-50 z-0"></div>

                        <div className="relative z-10">
                            <h3 className="text-3xl font-display font-bold mb-4">Let's start a conversation</h3>
                            <p className="text-slate-300 leading-relaxed">
                                Whether you're a customer looking for services or a professional looking to join, we're ready to answer your questions.
                            </p>
                        </div>

                        <div className="relative z-10 mt-12 space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                    <MessageSquare size={18} />
                                </div>
                                <div>
                                    <h5 className="font-bold">Live Chat</h5>
                                    <p className="text-sm text-slate-300">Available 24/7 for urgent queries</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form Side */}
                    <div className="md:w-7/12 p-8 md:p-12">
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-dark-surface">First Name</label>
                                    <input type="text" placeholder="John" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-dark-surface">Last Name</label>
                                    <input type="text" placeholder="Doe" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-dark-surface">Email Address</label>
                                <input type="email" placeholder="john@example.com" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-dark-surface">Message</label>
                                <textarea rows="4" placeholder="How can we help you?" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"></textarea>
                            </div>

                            <button type="button" className="btn-primary w-full py-4 text-lg rounded-xl flex items-center justify-center gap-2 group">
                                Send Message <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
