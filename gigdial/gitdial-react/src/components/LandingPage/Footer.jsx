import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="relative bg-blue-950 pt-20 pb-8 border-t border-blue-900 overflow-hidden">
            {/* Subtle Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                <div className="absolute top-10 left-10 w-72 h-72 bg-blue-600 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-600 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
                    {/* Brand Section - Takes more space */}
                    <div className="lg:col-span-4 space-y-6">
                        <div>
                            <h2 className="text-2xl font-black text-white mb-3">GigDial</h2>
                            <p className="text-slate-400 text-sm leading-relaxed max-w-sm font-medium">
                                India's first commission-free digital marketplace connecting verified gig workers with customers.
                            </p>
                        </div>

                        {/* Newsletter Subscription */}
                        <div className="pt-4">
                            <p className="text-xs font-bold text-slate-300 mb-3 uppercase tracking-wider">Stay Updated</p>
                            <div className="flex gap-2">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 px-4 py-2.5 text-sm bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <button className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors duration-300 flex items-center gap-1">
                                    <span className="text-sm font-medium">Join</span>
                                    <ArrowRight size={14} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Links Column 1 */}
                    <div className="lg:col-span-2">
                        <h4 className="text-white font-bold text-sm mb-6">Browse Services</h4>
                        <ul className="space-y-3 text-sm font-medium text-slate-400">
                            <li><Link to="/services" className="hover:text-white transition-colors">All Categories</Link></li>
                            <li><Link to="/dashboard" className="hover:text-white transition-colors">Customer Dashboard</Link></li>
                            <li><Link to="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
                            <li><Link to="/safety" className="hover:text-white transition-colors">Safety Guidelines</Link></li>
                        </ul>
                    </div>

                    {/* Links Column 2 */}
                    <div className="lg:col-span-2">
                        <h4 className="text-white font-bold text-sm mb-6">Join as Worker</h4>
                        <ul className="space-y-3 text-sm font-medium text-slate-400">
                            <li><Link to="/register" className="hover:text-white transition-colors">Worker Dashboard</Link></li>
                            <li><Link to="/benefits" className="hover:text-white transition-colors">Worker Benefits</Link></li>
                            <li><Link to="/training" className="hover:text-white transition-colors">Training Programs</Link></li>
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div className="lg:col-span-4">
                        <h4 className="text-white font-bold text-sm mb-6">Get in Touch</h4>
                        <ul className="space-y-4 text-sm font-medium text-slate-400">
                            <li className="flex items-center gap-3 group">
                                <div className="p-2 bg-slate-800 border border-slate-700 text-blue-400 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-all">
                                    <Mail size={16} />
                                </div>
                                <span className="group-hover:text-white transition-colors">support@gigdial.com</span>
                            </li>
                            <li className="flex items-center gap-3 group">
                                <div className="p-2 bg-slate-800 border border-slate-700 text-emerald-400 rounded-lg group-hover:bg-emerald-600 group-hover:text-white transition-all">
                                    <Phone size={16} />
                                </div>
                                <span className="group-hover:text-white transition-colors">+91 98765 43210</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Link to="/privacy" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</Link>
                                <span className="text-slate-600">•</span>
                                <Link to="/terms" className="text-slate-400 hover:text-white transition-colors">Terms of Service</Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                        {/* Social Icons */}
                        <div className="flex gap-2">
                            {[
                                { icon: Facebook, href: "#", bg: "bg-slate-800 hover:bg-blue-600 border-slate-700" },
                                { icon: Twitter, href: "#", bg: "bg-slate-800 hover:bg-sky-500 border-slate-700" },
                                { icon: Instagram, href: "#", bg: "bg-slate-800 hover:bg-pink-600 border-slate-700" },
                                { icon: Linkedin, href: "#", bg: "bg-slate-800 hover:bg-blue-700 border-slate-700" }
                            ].map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    className={`w-9 h-9 rounded-full border ${social.bg} flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300`}
                                >
                                    <social.icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <p className="text-xs text-slate-500 font-medium text-center">
                        © 2025 GigDial. All rights reserved.
                    </p>

                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                        Made with <Heart size={12} className="fill-red-500 text-red-500 animate-pulse" /> in India
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
