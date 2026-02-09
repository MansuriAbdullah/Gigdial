import React from 'react';
import { Crown, Gift, Tag, Zap, Ticket, Clock, TrendingUp } from 'lucide-react';

const Loyalty = () => {
    return (
        <div className="space-y-8 animate-fade-in pb-10">
            {/* Membership Card */}
            <div className="bg-[#0F172A] rounded-[2.5rem] p-8 md:p-10 text-white relative overflow-hidden shadow-2xl shadow-slate-900/30">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>

                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl text-xs font-bold uppercase tracking-wider border border-white/10">
                            <Crown size={16} className="text-yellow-400" fill="currentColor" />
                            <span>Gold Member</span>
                        </div>
                        <div className="text-right">
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Status</p>
                            <p className="text-sm font-medium">150 points to Platinum</p>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h1 className="text-6xl font-display font-bold text-yellow-400 mb-2">850</h1>
                        <p className="text-xl font-medium text-slate-300">GigPoints Balance</p>
                    </div>

                    {/* Progress Bar */}
                    <div className="relative pt-6">
                        <div className="flex justify-between text-xs font-bold text-slate-400 mb-2 uppercase tracking-wide">
                            <span>Gold</span>
                            <span>Platinum</span>
                        </div>
                        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 w-[70%] rounded-full shadow-[0_0_20px_rgba(251,191,36,0.5)]"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Rewards Grid */}
            <div>
                <h3 className="text-xl font-bold text-slate-900 mb-6 font-display">Redeem Rewards</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Coupon Reward */}
                    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-xl transition-all duration-300 group">
                        <div className="flex items-start gap-4 mb-4">
                            <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0">
                                <Ticket size={28} />
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-xs font-bold text-orange-500 uppercase tracking-wider">500 Points</span>
                                </div>
                                <h3 className="text-lg font-bold text-slate-900">₹100 Off Coupon</h3>
                                <p className="text-slate-500 text-sm mt-1">Valid on any service booking above ₹500.</p>
                            </div>
                        </div>
                        <button className="w-full py-3 bg-[#0F172A] text-white font-bold rounded-xl hover:bg-slate-800 transition-colors mt-2">
                            Redeem
                        </button>
                    </div>

                    {/* Gift Card Reward */}
                    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-xl transition-all duration-300 group">
                        <div className="flex items-start gap-4 mb-4">
                            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
                                <Gift size={28} />
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-xs font-bold text-orange-500 uppercase tracking-wider">1000 Points</span>
                                </div>
                                <h3 className="text-lg font-bold text-slate-900">Amazon Gift Card (₹250)</h3>
                                <p className="text-slate-500 text-sm mt-1">Digital code sent to your email instantly.</p>
                            </div>
                        </div>
                        <button className="w-full py-3 bg-slate-100 text-slate-400 font-bold rounded-xl cursor-not-allowed mt-2">
                            Not enough points
                        </button>
                    </div>

                    {/* Priority Booking */}
                    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-xl transition-all duration-300 group">
                        <div className="flex items-start gap-4 mb-4">
                            <div className="w-14 h-14 bg-yellow-50 text-yellow-600 rounded-2xl flex items-center justify-center shrink-0">
                                <Zap size={28} fill="currentColor" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-xs font-bold text-orange-500 uppercase tracking-wider">200 Points</span>
                                </div>
                                <h3 className="text-lg font-bold text-slate-900">Priority Booking</h3>
                                <p className="text-slate-500 text-sm mt-1">Get matched with top-rated workers first.</p>
                            </div>
                        </div>
                        <button className="w-full py-3 bg-[#0F172A] text-white font-bold rounded-xl hover:bg-slate-800 transition-colors mt-2">
                            Redeem
                        </button>
                    </div>
                </div>
            </div>

            {/* History List */}
            <div className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-6 font-display">Points History</h3>
                <div className="space-y-6">
                    {[
                        { title: 'Booking Completed: Deep Cleaning', date: 'Oct 14, 2024', points: '+150', type: 'earn' },
                        { title: 'Referral Bonus: Amit S.', date: 'Oct 10, 2024', points: '+100', type: 'earn' },
                        { title: 'Redeemed: ₹50 Off Coupon', date: 'Sep 28, 2024', points: '-250', type: 'burn' },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0 last:pb-0">
                            <div>
                                <p className="font-bold text-slate-900">{item.title}</p>
                                <p className="text-xs text-slate-400 font-medium mt-1">{item.date}</p>
                            </div>
                            <span className={`font-bold font-mono ${item.type === 'earn' ? 'text-green-600' : 'text-red-500'}`}>
                                {item.points}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Loyalty;
