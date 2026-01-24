import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white text-slate-600 pt-16 pb-8 border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-lime-500 bg-clip-text text-transparent mb-4">
                            GigDial
                        </h2>
                        <p className="text-sm text-slate-500 mb-6">
                            Ek Kaam, Ek Time, Ek Paisa. <br />
                            Connecting you with verified professionals instantly.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-blue-600 transition-colors"><Facebook className="w-5 h-5" /></a>
                            <a href="#" className="hover:text-blue-400 transition-colors"><Twitter className="w-5 h-5" /></a>
                            <a href="#" className="hover:text-pink-500 transition-colors"><Instagram className="w-5 h-5" /></a>
                            <a href="#" className="hover:text-blue-700 transition-colors"><Linkedin className="w-5 h-5" /></a>
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="text-slate-900 font-semibold mb-6">For Customers</h3>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#" className="hover:text-blue-600 transition-colors">Browse Services</a></li>
                            <li><a href="#" className="hover:text-blue-600 transition-colors">How it Works</a></li>
                            <li><a href="#" className="hover:text-blue-600 transition-colors">Safety & Trust</a></li>
                            <li><a href="#" className="hover:text-blue-600 transition-colors">Help Center</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-slate-900 font-semibold mb-6">For Gig Workers</h3>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#" className="hover:text-blue-600 transition-colors">Join as Worker</a></li>
                            <li><a href="#" className="hover:text-blue-600 transition-colors">Success Stories</a></li>
                            <li><a href="#" className="hover:text-blue-600 transition-colors">Worker Benefits</a></li>
                            <li><a href="#" className="hover:text-blue-600 transition-colors">Training</a></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-slate-900 font-semibold mb-6">Stay Updated</h3>
                        <p className="text-sm text-slate-500 mb-4">Subscribe to our newsletter for latest updates.</p>
                        <div className="flex">
                            <input
                                type="email"
                                placeholder="Enter email"
                                className="bg-slate-50 border border-slate-200 text-slate-900 px-4 py-2 rounded-l-lg outline-none focus:border-blue-500 w-full text-sm placeholder-slate-400"
                            />
                            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-lg transition-colors">
                                <Mail className="w-4 h-4 text-white" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
                    <p>&copy; 2025 GigDial. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
