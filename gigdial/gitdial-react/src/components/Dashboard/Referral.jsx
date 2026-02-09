import React from 'react';
import { Copy, Gift, Share2, MessageCircle, Facebook, Twitter, Mail, CheckCircle } from 'lucide-react';

const Referral = () => {
    return (
        <div className="space-y-8 animate-fade-in pb-10">
            {/* Hero / Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2.5rem] p-10 text-center text-white relative overflow-hidden shadow-2xl shadow-blue-500/20">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
                <div className="absolute top-[-50%] left-[-20%] w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[-50%] right-[-20%] w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-[100px]"></div>

                <div className="relative z-10 max-w-2xl mx-auto">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Gift size={32} className="text-yellow-300" fill="currentColor" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Invite Friends, Get ₹100</h1>
                    <p className="text-blue-100 text-lg md:text-xl font-medium leading-relaxed">
                        Share the love! Give your friends ₹100 off their first booking, and you get ₹100 when they complete it.
                    </p>
                </div>
            </div>

            {/* Referral Code & Sharing */}
            <div className="bg-white rounded-[2rem] border border-slate-100 p-8 md:p-12 shadow-sm text-center">
                <p className="text-slate-500 font-bold mb-4 uppercase tracking-wider text-sm">Your Unique Referral Code</p>
                <div className="relative max-w-md mx-auto mb-6 group cursor-pointer">
                    <div className="absolute inset-0 border-2 border-dashed border-primary/30 rounded-2xl group-hover:border-primary transition-colors"></div>
                    <div className="relative bg-blue-50/50 py-4 px-8 rounded-2xl flex items-center justify-between gap-4">
                        <span className="text-2xl md:text-3xl font-display font-bold text-slate-800 tracking-wider">PRIYA2024</span>
                        <Copy size={24} className="text-primary" />
                    </div>
                </div>
                <p className="text-xs text-slate-400 font-bold mb-10">Tap to copy</p>

                <div className="flex justify-center gap-6">
                    <button className="flex flex-col items-center gap-2 group">
                        <div className="w-14 h-14 bg-[#25D366] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-green-500/20 group-hover:-translate-y-1 transition-transform">
                            <MessageCircle size={28} fill="currentColor" />
                        </div>
                        <span className="text-xs font-bold text-slate-600">WhatsApp</span>
                    </button>
                    <button className="flex flex-col items-center gap-2 group">
                        <div className="w-14 h-14 bg-[#1877F2] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:-translate-y-1 transition-transform">
                            <Facebook size={28} fill="currentColor" />
                        </div>
                        <span className="text-xs font-bold text-slate-600">Facebook</span>
                    </button>
                    <button className="flex flex-col items-center gap-2 group">
                        <div className="w-14 h-14 bg-[#1DA1F2] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-sky-500/20 group-hover:-translate-y-1 transition-transform">
                            <Twitter size={28} fill="currentColor" />
                        </div>
                        <span className="text-xs font-bold text-slate-600">Twitter</span>
                    </button>
                    <button className="flex flex-col items-center gap-2 group">
                        <div className="w-14 h-14 bg-slate-700 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-slate-500/20 group-hover:-translate-y-1 transition-transform">
                            <Mail size={28} />
                        </div>
                        <span className="text-xs font-bold text-slate-600">Email</span>
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-6">
                    <div className="w-16 h-16 bg-blue-50 text-primary rounded-2xl flex items-center justify-center">
                        <Share2 size={32} />
                    </div>
                    <div>
                        <h3 className="text-4xl font-bold text-slate-900">3</h3>
                        <p className="text-slate-500 font-medium">Friends Invited</p>
                    </div>
                </div>
                <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-6">
                    <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center">
                        <div className="font-bold text-2xl">₹</div>
                    </div>
                    <div>
                        <h3 className="text-4xl font-bold text-green-600">₹300</h3>
                        <p className="text-slate-500 font-medium">Total Earned</p>
                    </div>
                </div>
            </div>

            {/* How it works */}
            <div className="bg-white rounded-[2rem] border border-slate-100 p-10 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-8 text-center">How it works</h3>
                <div className="space-y-8 max-w-2xl mx-auto">
                    {[
                        { step: '1', title: 'Share your code', desc: 'Send your unique code to friends via WhatsApp or social media.' },
                        { step: '2', title: 'Friend books a service', desc: 'They get ₹100 off instantly on their first booking using your code.' },
                        { step: '3', title: 'You earn rewards', desc: 'Once their service is completed, ₹100 is credited to your wallet.' }
                    ].map((item, i) => (
                        <div key={i} className="flex gap-6">
                            <div className="w-10 h-10 rounded-full bg-[#0F172A] text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-lg shadow-slate-900/20">
                                {item.step}
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 text-lg mb-1">{item.title}</h4>
                                <p className="text-slate-500 leading-relaxed">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Referral;
