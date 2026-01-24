import React from 'react';
import { Phone, Mail, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const TopBar = () => {
    return (
        <div className="bg-[#0F172A] text-slate-300 text-[11px] font-semibold tracking-wide border-b border-white/5 relative z-50">
            <div className="container mx-auto px-6 h-10 flex justify-between items-center">
                <div className="flex items-center gap-6">
                    <a href="tel:+919876543210" className="flex items-center gap-2 hover:text-white transition-colors group">
                        <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                            <Phone size={10} />
                        </div>
                        <span>+91-98765-43210</span>
                    </a>
                    <a href="mailto:support@gigdial.com" className="hidden sm:flex items-center gap-2 hover:text-white transition-colors group">
                        <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                            <Mail size={10} />
                        </div>
                        <span>support@gigdial.com</span>
                    </a>
                </div>

                <div className="flex items-center gap-6">
                    <div className="hidden md:flex items-center gap-1.5 text-emerald-400">
                        <ShieldCheck size={12} />
                        <span>100% Verified Professionals</span>
                    </div>
                    <div className="hidden md:block w-px h-3 bg-slate-700"></div>
                    <div className="flex items-center gap-4">
                        <Link to="/worker-dashboard" className="hover:text-primary transition-colors">
                            For Professionals
                        </Link>
                        <Link to="/customer-dashboard" className="hover:text-primary transition-colors">
                            For Customers
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
