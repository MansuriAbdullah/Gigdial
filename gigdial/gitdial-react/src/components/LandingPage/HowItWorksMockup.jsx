import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Users, CheckCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const steps = [
    {
        icon: MessageSquare,
        title: 'Tell Us Your Requirement',
        desc: 'Salie; ithip sroviver and tell to waick you',
    },
    {
        icon: Users,
        title: 'Get Matched with a Worker',
        desc: 'Get conment to pro workes local as nese profesional',
    },
    {
        icon: CheckCircle,
        title: 'Get Your Job Done',
        desc: 'The server comes to your haution and fniisates the job',
    },
];

const HowItWorksMockup = () => {
    const navigate = useNavigate();

    return (
        <section className="py-14 bg-gray-200 border-t border-gray-400">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
                <div className="grid lg:grid-cols-2 gap-10 items-start">

                    {/* Left: Steps */}
                    <div>
                        <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-1">Trusted by 1000+ Users</h2>
                        <p className="text-gray-700 font-bold text-sm mb-10">Most popular and frequently booked services</p>

                        <div className="flex flex-col md:flex-row gap-6 relative">
                            {steps.map((step, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center text-center relative max-w-[200px] mx-auto md:max-w-none">
                                    {/* Icon */}
                                    <div className="w-16 h-16 rounded-2xl bg-gray-100 border border-gray-400 shadow-md flex items-center justify-center text-gray-800 mb-4 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                                        <step.icon size={28} strokeWidth={2.5} />
                                    </div>
                                    <h3 className="text-sm font-black text-gray-900 mb-2 leading-snug">{step.title}</h3>
                                    <p className="text-xs text-gray-700 font-bold leading-relaxed max-w-[150px]">{step.desc}</p>

                                    {/* Connector arrow */}
                                    {i < steps.length - 1 && (
                                        <div className="hidden md:flex absolute right-0 top-6 -mr-6 z-10 translate-x-1/2">
                                            <ArrowRight size={20} strokeWidth={2.5} className="text-gray-500" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: How GigDial Works CTA */}
                    <div className="flex flex-col">
                        <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-1">How GigDial Works</h2>
                        <p className="text-gray-700 font-bold text-sm mb-6">8. beete jobe-daales it services / disyisler prevince</p>

                        <div className="bg-gray-100 rounded-3xl p-8 shadow-xl shadow-gray-900/10 border border-gray-300 hover:border-gray-400 transition-colors duration-300">
                            <h3 className="text-xl font-black text-gray-900 mb-6">Need a service right now?</h3>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => navigate('/services')}
                                className="w-full py-4 bg-gray-700 hover:bg-gray-800 text-white font-black text-sm uppercase tracking-widest rounded-2xl shadow-lg shadow-gray-700/30 transition-all flex items-center justify-center gap-2 group"
                            >
                                Get Worker Now <ArrowRight size={18} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorksMockup;
