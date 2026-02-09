import React, { useState, useEffect } from 'react';
import { Gift, Copy, Share2, Users, TrendingUp, Check, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const ReferAndEarn = () => {
    const [referralCode, setReferralCode] = useState('');
    const [referrals, setReferrals] = useState([]);
    const [earnings, setEarnings] = useState(0);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        fetchReferralData();
    }, []);

    const fetchReferralData = async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const response = await fetch('/api/users/referral', {
                headers: {
                    'Authorization': `Bearer ${userInfo?.token}`
                }
            });
            const data = await response.json();
            setReferralCode(data.referralCode || '');
            setReferrals(data.referrals || []);
            setEarnings(data.earnings || 0);
        } catch (error) {
            console.error('Error fetching referral data:', error);
        }
    };

    const handleCopyCode = () => {
        navigator.clipboard.writeText(referralCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const shareMessage = `Join GigDial and get ₹100 off on your first booking! Use my referral code: ${referralCode}`;

    const handleShare = (platform) => {
        const encodedMessage = encodeURIComponent(shareMessage);
        const urls = {
            whatsapp: `https://wa.me/?text=${encodedMessage}`,
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedMessage}`,
            twitter: `https://twitter.com/intent/tweet?text=${encodedMessage}`
        };
        window.open(urls[platform], '_blank');
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Refer & Earn</h1>
                <p className="text-slate-500 mt-1">Invite friends and earn rewards together</p>
            </div>

            {/* Earnings Card */}
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-6 md:p-8 text-white shadow-xl shadow-green-200 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full -ml-12 -mb-12 blur-3xl"></div>

                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl">
                            <Gift size={28} />
                        </div>
                        <div>
                            <p className="text-green-100 font-medium">Total Earnings</p>
                            <h2 className="text-4xl font-bold">₹{earnings.toFixed(2)}</h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                        <div>
                            <p className="text-green-100 text-sm mb-1">Successful Referrals</p>
                            <p className="text-2xl font-bold">{referrals.filter(r => r.status === 'completed').length}</p>
                        </div>
                        <div>
                            <p className="text-green-100 text-sm mb-1">Pending</p>
                            <p className="text-2xl font-bold">{referrals.filter(r => r.status === 'pending').length}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Referral Code Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Your Referral Code</h3>
                <div className="flex gap-3">
                    <div className="flex-1 px-4 py-3 bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl font-mono text-2xl font-bold text-slate-900 text-center">
                        {referralCode || 'LOADING...'}
                    </div>
                    <button
                        onClick={handleCopyCode}
                        className={`px-6 py-3 rounded-xl font-bold transition-all ${copied
                            ? 'bg-green-600 text-white'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                            }`}
                    >
                        {copied ? (
                            <><Check size={20} className="inline mr-2" />Copied!</>
                        ) : (
                            <><Copy size={20} className="inline mr-2" />Copy</>
                        )}
                    </button>
                </div>

                {/* Share Buttons */}
                <div className="mt-6">
                    <p className="text-sm font-medium text-slate-600 mb-3">Share via</p>
                    <div className="grid grid-cols-3 gap-3">
                        <button
                            onClick={() => handleShare('whatsapp')}
                            className="flex items-center justify-center gap-2 py-3 bg-green-50 text-green-600 font-bold rounded-xl hover:bg-green-100 transition-colors border border-green-200"
                        >
                            <MessageCircle size={20} />
                            WhatsApp
                        </button>
                        <button
                            onClick={() => handleShare('facebook')}
                            className="flex items-center justify-center gap-2 py-3 bg-blue-50 text-blue-600 font-bold rounded-xl hover:bg-blue-100 transition-colors border border-blue-200"
                        >
                            <Share2 size={20} />
                            Facebook
                        </button>
                        <button
                            onClick={() => handleShare('twitter')}
                            className="flex items-center justify-center gap-2 py-3 bg-sky-50 text-sky-600 font-bold rounded-xl hover:bg-sky-100 transition-colors border border-sky-200"
                        >
                            <Share2 size={20} />
                            Twitter
                        </button>
                    </div>
                </div>
            </div>

            {/* How it Works */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
                <h3 className="text-lg font-bold text-purple-900 mb-4">How It Works</h3>
                <div className="space-y-4">
                    <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold shrink-0">1</div>
                        <div>
                            <h4 className="font-bold text-slate-900">Share Your Code</h4>
                            <p className="text-sm text-slate-600">Send your unique referral code to friends and family</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold shrink-0">2</div>
                        <div>
                            <h4 className="font-bold text-slate-900">They Sign Up</h4>
                            <p className="text-sm text-slate-600">Your friend registers using your code and gets ₹100 off</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold shrink-0">3</div>
                        <div>
                            <h4 className="font-bold text-slate-900">You Both Earn</h4>
                            <p className="text-sm text-slate-600">You get ₹100 in your wallet after their first booking</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Referral History */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Referral History</h3>
                {referrals.length > 0 ? (
                    <div className="space-y-3">
                        {referrals.map((referral) => (
                            <motion.div
                                key={referral._id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                                        {referral.name?.charAt(0) || 'U'}
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900">{referral.name || 'User'}</p>
                                        <p className="text-sm text-slate-500">
                                            {new Date(referral.createdAt).toLocaleDateString('en-IN', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className={`text-sm font-bold px-3 py-1 rounded-full ${referral.status === 'completed'
                                        ? 'bg-green-50 text-green-700'
                                        : 'bg-yellow-50 text-yellow-700'
                                        }`}>
                                        {referral.status === 'completed' ? '+₹100' : 'Pending'}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8 bg-slate-50 rounded-xl">
                        <Users size={40} className="mx-auto text-slate-300 mb-2" />
                        <p className="text-slate-500">No referrals yet. Start sharing!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReferAndEarn;
