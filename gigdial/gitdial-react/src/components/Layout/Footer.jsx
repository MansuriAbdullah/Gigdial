import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Heart, Mail, Phone, ArrowRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const SocialLink = ({ href, icon: Icon, colorClass }) => (
    <a
        href={href}
        className={`w-10 h-10 rounded-full bg-slate-900/50 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-all duration-300 group hover:scale-110 hover:border-transparent ${colorClass}`}
    >
        <Icon size={18} className="group-hover:stroke-current" />
    </a>
);

const FooterLink = ({ href, children }) => (
    <li>
        <Link
            to={href}
            className="flex items-center gap-2 text-slate-300 hover:text-white hover:translate-x-1 transition-all duration-300 text-sm font-medium"
        >
            <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-blue-400 transition-colors opacity-0 hover:opacity-100"></span>
            {children}
        </Link>
    </li>
);

const Footer = () => {
    return (
        <footer className="relative bg-[#020617] pt-24 pb-10 overflow-hidden font-sans border-t border-slate-800/50">
            {/* Ambient Background Effects */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen animate-pulse" style={{ animationDuration: '4s' }} />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen animate-pulse" style={{ animationDuration: '7s' }} />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
                    {/* Brand Section */}
                    <div className="lg:col-span-4 space-y-6">
                        <Link to="/" className="flex items-center">
                            <img src="/images/gigdial-logo.png" alt="GigDial Logo" className="h-12 md:h-14 w-auto object-contain" />
                        </Link>
                        <p className="text-slate-300 text-sm leading-relaxed max-w-sm font-medium">
                            India's leading commission-free marketplace. Empowering connections between verified gig workers and customers with trust and transparency.
                        </p>
                        <div className="flex gap-3 pt-2">
                            <SocialLink href="#" icon={Facebook} colorClass="hover:bg-blue-600" />
                            <SocialLink href="#" icon={Twitter} colorClass="hover:bg-sky-500" />
                            <SocialLink href="#" icon={Instagram} colorClass="hover:bg-pink-600" />
                            <SocialLink href="#" icon={Linkedin} colorClass="hover:bg-blue-700" />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="lg:col-span-2">
                        <h3 className="font-bold text-lg mb-6 flex items-center gap-2 text-white">
                            Customers
                            <span className="w-8 h-0.5 bg-blue-600 rounded-full"></span>
                        </h3>
                        <ul className="space-y-4">
                            <FooterLink href="/services">Find Services</FooterLink>
                            <FooterLink href="/how-it-works">How It Works</FooterLink>
                            <FooterLink href="/pricing">Pricing</FooterLink>
                            <FooterLink href="/trust-safety">Safety Standards</FooterLink>
                        </ul>
                    </div>

                    <div className="lg:col-span-2">
                        <h3 className="font-bold text-lg mb-6 flex items-center gap-2 text-white">
                            Design
                            <span className="w-8 h-0.5 bg-purple-600 rounded-full"></span>
                        </h3>
                        <ul className="space-y-4">
                            <FooterLink href="/register">Join as Worker</FooterLink>
                            <FooterLink href="/worker-benefits">Success Stories</FooterLink>
                            <FooterLink href="/skill-center">Skill Center</FooterLink>
                            <FooterLink href="/community">Community</FooterLink>
                        </ul>
                    </div>

                    {/* Newsletter & Contact */}
                    <div className="lg:col-span-4 space-y-6">
                        <h3 className="font-bold text-lg mb-6 text-white">Stay Updated</h3>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <div className="flex-1 p-1 bg-slate-900/80 border border-slate-700 rounded-xl flex items-center shadow-inner focus-within:border-blue-500/50 transition-colors">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 bg-transparent px-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none font-medium"
                                />
                            </div>
                            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transform active:scale-95 shrink-0">
                                Subscribe <ArrowRight size={14} />
                            </button>
                        </div>

                        <div className="space-y-3 pt-4 border-t border-slate-800/50">
                            <div className="flex items-center gap-3 text-slate-300 group cursor-pointer hover:text-white transition-colors">
                                <span className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center group-hover:border-blue-500/50 group-hover:bg-blue-500/10 transition-colors">
                                    <Mail size={16} className="text-slate-400 group-hover:text-blue-400 transition-colors" />
                                </span>
                                <span className="text-sm font-medium">support@gigdial.com</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-300 group cursor-pointer hover:text-white transition-colors">
                                <span className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center group-hover:border-purple-500/50 group-hover:bg-purple-500/10 transition-colors">
                                    <MapPin size={16} className="text-slate-400 group-hover:text-purple-400 transition-colors" />
                                </span>
                                <span className="text-sm font-medium">Mumbai, India</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-slate-800/50 flex flex-col items-center gap-6 text-[10px] sm:text-xs font-semibold text-slate-400">
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
                        <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                        <Link to="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4">
                        <p className="order-2 sm:order-1 text-slate-500">&copy; {new Date().getFullYear()} GigDial. All rights reserved.</p>
                        <p className="flex items-center gap-1 order-1 sm:order-2 bg-slate-900/50 px-3 py-1.5 rounded-full border border-slate-800">
                            Made with <Heart size={12} className="text-red-500 fill-red-500 animate-pulse" /> in India
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};


export default Footer;
