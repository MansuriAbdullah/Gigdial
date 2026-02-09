import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { motion } from 'framer-motion';
import { Search, MessageSquare, Briefcase, ChevronRight } from 'lucide-react';

const StepCard = ({ number, icon: Icon, title, desc }) => (
    <div className="relative flex flex-col items-center text-center p-8 bg-white rounded-3xl border border-slate-100 shadow-xl shadow-blue-900/5 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-300 group">
        <div className="absolute -top-6 w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-500 text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">
            {number}
        </div>
        <div className="mt-8 mb-6 p-4 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
            <Icon size={32} />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
        <p className="text-slate-500 leading-relaxed max-w-xs">{desc}</p>
    </div>
);

const HowItWorks = () => {
    const { t } = useLanguage();
    return (
        <section className="py-20 bg-slate-50 relative overflow-hidden">
            {/* Background Gradients similar to Hero */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-blue-100/50 blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-lime-100/50 blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
                        How <span className="text-blue-600">GigDial</span> Works
                    </h2>
                    <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                        Get your work done in 3 simple steps. It's fast, easy, and secure.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8 relaltive">
                    {/* Connecting Lines for Desktop */}
                    <div className="hidden md:block absolute top-[43%] left-[20%] w-[25%] h-[2px] bg-gradient-to-r from-blue-200 to-transparent z-0"></div>
                    <div className="hidden md:block absolute top-[43%] right-[20%] w-[25%] h-[2px] bg-gradient-to-l from-blue-200 to-transparent z-0"></div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <StepCard
                            number="1"
                            icon={Search}
                            title={t('step1Title')}
                            desc={t('step1Desc')}
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <StepCard
                            number="2"
                            icon={MessageSquare}
                            title={t('step2Title')}
                            desc={t('step2Desc')}
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        <StepCard
                            number="3"
                            icon={Briefcase}
                            title={t('step3Title')}
                            desc={t('step3Desc')}
                        />
                    </motion.div>
                </div>

                <div className="mt-16 text-center">
                    <button className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-full font-bold shadow-xl hover:bg-slate-800 hover:scale-105 transition-all">
                        Get Started Now <ChevronRight size={20} />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
