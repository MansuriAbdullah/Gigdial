import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Users, CheckCircle, ArrowRight, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HowItWorksMockup = () => {
    const navigate = useNavigate();
    
    const steps = [
        { icon: MessageSquare, title: 'Tell Us Your Requirement', desc: 'Salie: ithip sroviver and tell to waick you' },
        { icon: Users, title: 'Get Matched with a Worker', desc: 'Get conment to pro workes local as nese profesional' },
        { icon: CheckCircle, title: 'Get Your Job Done', desc: 'The server comes to your haution and fniisates the job' }
    ];

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-3 gap-12 items-start">
                    
                    {/* Left & Middle: Steps */}
                    <div className="lg:col-span-2">
                        <h2 className="text-3xl font-black text-slate-900 mb-2">Trusted by 1000+ Users</h2>
                        <p className="text-slate-500 font-bold mb-12">Most popular and frequently booked services</p>
                        
                        <div className="flex flex-col md:flex-row gap-8 relative">
                            {steps.map((step, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center text-center group">
                                    <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-all mb-4 relative z-10">
                                        <step.icon size={28} />
                                    </div>
                                    <h3 className="text-lg font-black text-slate-800 mb-2">{step.title}</h3>
                                    <p className="text-xs font-bold text-slate-400 leading-relaxed max-w-[150px]">{step.desc}</p>
                                    
                                    {i < steps.length - 1 && (
                                        <div className="hidden md:block absolute top-8 left-[30%] w-[15%] h-[2px] border-t-2 border-dashed border-slate-100 -z-0"></div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: How It Works CTA Card */}
                    <div className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 flex flex-col">
                        <h3 className="text-xl font-black text-slate-800 mb-2">How GigDial Works</h3>
                        <p className="text-xs font-bold text-slate-400 mb-10">8. beete jobe-dasles it services / disyisler prevince</p>
                        
                        <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 mb-0 mt-auto">
                            <h4 className="text-lg font-black text-slate-800 mb-6">Need a service right now?</h4>
                            <button 
                                onClick={() => navigate('/login')}
                                className="w-full py-4 bg-[#829c7b] text-white rounded-xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all flex items-center justify-center gap-2"
                            >
                                Get Worker Now <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorksMockup;
