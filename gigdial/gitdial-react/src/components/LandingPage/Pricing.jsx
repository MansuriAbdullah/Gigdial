import React from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Star, Gem } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Pricing = () => {
    const navigate = useNavigate();
    const plans = [
        {
            id: 'monthly',
            title: "Pro Monthly",
            price: "499",
            period: "/month",
            description: "Full access to priority leads",
            features: [
                "Priority Listing",
                "Unlimited Leads Access",
                "Verified Badge",
                "Direct WhatsApp Access",
                "Refund if no leads in 1 month"
            ],
            highlight: true,
            color: "blue",
            buttonText: "Join as Worker",
            icon: Zap,
            badge: "POPULAR"
        }
    ];

    return (
        <section className="py-20 bg-slate-50 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-100/50 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/3 pointer-events-none" />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">
                        Simple & Transparent Pricing
                    </h2>
                    <p className="text-slate-600 max-w-xl mx-auto text-lg font-medium">
                        Maximize your earnings with our Pro plan. Get leads or get your <span className="text-blue-600 font-bold">money back</span>.
                    </p>
                </motion.div>

                <div className="flex justify-center">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className={`relative rounded-[2rem] sm:rounded-3xl p-6 sm:p-8 transition-all duration-300 group max-w-md w-full ${plan.highlight
                                ? 'bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-xl shadow-blue-900/20 md:scale-105 z-10 border border-blue-500'
                                : 'bg-white text-slate-900 border border-slate-200 shadow-lg hover:border-blue-200 hover:shadow-xl'
                                }`}
                        >
                            {plan.badge && (
                                <div className="absolute top-0 right-0">
                                    <div className="bg-lime-400 text-blue-900 text-[10px] font-extrabold px-3 py-1 rounded-bl-xl rounded-tr-2xl shadow-sm z-10 uppercase tracking-wider flex items-center gap-1">
                                        <Star size={10} fill="currentColor" /> {plan.badge}
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center gap-4 mb-6">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-md transition-transform group-hover:scale-105 ${plan.highlight
                                    ? 'bg-white/10 text-white border border-white/10'
                                    : 'bg-blue-50 text-blue-600'
                                    }`}>
                                    <plan.icon size={24} strokeWidth={2} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">{plan.title}</h3>
                                    <div className={`text-xs font-semibold ${plan.highlight ? 'text-blue-200' : 'text-slate-500'}`}>
                                        {plan.description}
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6 pb-6 border-b border-opacity-10 border-current">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-extrabold tracking-tight">
                                        ₹{plan.price}
                                    </span>
                                    <span className={`text-sm font-medium ${plan.highlight ? 'text-blue-200' : 'text-slate-400'}`}>
                                        {plan.period}
                                    </span>
                                </div>
                            </div>

                            <ul className="space-y-3 mb-8">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <div className={`mt-0.5 rounded-full p-0.5 flex-shrink-0 ${plan.highlight
                                            ? 'bg-white/20 text-white'
                                            : 'bg-emerald-100 text-emerald-600'
                                            }`}>
                                            <Check size={12} strokeWidth={3} />
                                        </div>
                                        <span className={`text-sm font-medium ${plan.highlight ? 'text-blue-50' : 'text-slate-700'}`}>
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => navigate('/login')}
                                className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all transform active:scale-[0.98] shadow-lg flex items-center justify-center gap-2 ${plan.highlight
                                    ? 'bg-white text-blue-700 hover:bg-blue-50 shadow-black/10'
                                    : 'bg-slate-900 text-white hover:bg-slate-800 shadow-slate-900/20'
                                    }`}>
                                {plan.highlight && <Gem size={14} />}
                                {plan.buttonText}
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Pricing;
