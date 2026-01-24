import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Heart } from 'lucide-react';

const FooterLink = ({ href, children }) => (
    <li>
        <a href={href} className="text-slate-400 hover:text-white hover:underline transition-all text-sm">
            {children}
        </a>
    </li>
);

const FooterSection = ({ title, links }) => (
    <div>
        <h3 className="text-white font-display font-bold text-lg mb-6">{title}</h3>
        <ul className="space-y-3">
            {links.map((link, index) => (
                <FooterLink key={index} href={link.href}>{link.label}</FooterLink>
            ))}
        </ul>
    </div>
);

const Footer = () => {
    return (
        <footer className="bg-dark text-slate-400 pt-20 pb-10 border-t border-slate-800">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="text-3xl font-display font-bold text-white flex items-center gap-2">
                            GigDial
                        </div>
                        <p className="text-sm leading-relaxed max-w-sm text-slate-400">
                            India's first commission-free digital marketplace connecting verified gig workers with customers.
                            <br /><br />
                            <span className="text-white font-medium">Ek Kaam, Ek Time, Ek Paisa.</span>
                        </p>
                        <div className="flex gap-4 pt-2">
                            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
                                <a key={idx} href="#" className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all transform hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/25">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <FooterSection
                        title="For Customers"
                        links={[
                            { label: "Browse Services", href: "/services" },
                            { label: "Customer Dashboard", href: "/login" },
                            { label: "How It Works", href: "#" },
                            { label: "Safety Guidelines", href: "#" }
                        ]}
                    />

                    <FooterSection
                        title="For Workers"
                        links={[
                            { label: "Join as Worker", href: "/register" },
                            { label: "Worker Dashboard", href: "/worker-dashboard" },
                            { label: "Worker Benefits", href: "#" },
                            { label: "Training Programs", href: "#" }
                        ]}
                    />

                    <FooterSection
                        title="Support"
                        links={[
                            { label: "Help Center", href: "#" },
                            { label: "Contact Us", href: "#" },
                            { label: "Privacy Policy", href: "#" },
                            { label: "Terms of Service", href: "#" }
                        ]}
                    />
                </div>

                <div className="pt-8 border-t border-slate-800 text-center text-sm flex flex-col md:flex-row justify-between items-center gap-4">
                    <p>&copy; 2025 GigDial. All rights reserved.</p>
                    <p className="flex items-center justify-center gap-1 text-slate-500">
                        Made with <Heart size={14} className="text-red-500 fill-red-500 animate-pulse" /> in India
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
