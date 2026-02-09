import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, CheckCircle, Smartphone, UserCheck, Briefcase, Award, Smile } from 'lucide-react';
import { Link } from 'react-router-dom';

const HowItWorks = () => {
    const [activeTab, setActiveTab] = useState('customers');

    const customerSteps = [
        {
            icon: Search,
            title: "Search Service",
            description: "Browse through our extensive list of services or use voice search to find exactly what you need.",
            color: "bg-blue-100 text-blue-600"
        },
        {
            icon: UserCheck,
            title: "Select Professional",
            description: "Compare verified profiles, read reviews, and check ratings to choose the best professional for your job.",
            color: "bg-purple-100 text-purple-600"
        },
        {
            icon: Calendar,
            title: "Book & Relax",
            description: "Schedule the service at your convenience. Pay securely after the job is done to your satisfaction.",
            color: "bg-green-100 text-green-600"
        }
    ];

    const workerSteps = [
        {
            icon: Smartphone,
            title: "Create Profile",
            description: "Sign up for free, upload your documents, and list your skills to get started.",
            color: "bg-orange-100 text-orange-600"
        },
        {
            icon: Briefcase,
            title: "Get Jobs",
            description: "Receive instant notifications for jobs in your area that match your expertise.",
            color: "bg-indigo-100 text-indigo-600"
        },
        {
            icon: Award,
            title: "Earn & Grow",
            description: "Keep 100% of your earnings with 0% commission. Build your reputation with good reviews.",
            color: "bg-pink-100 text-pink-600"
        }
    ];

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
    };

    return (
        <div className="pt-24 min-h-screen bg-slate-50">
            {/* Hero Section */}
            <section className="relative py-20 px-6 overflow-hidden">
                <div className="container mx-auto text-center relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-display font-bold text-slate-900 mb-6"
                    >
                        How <span className="text-primary">GigDial</span> Works
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-slate-500 max-w-2xl mx-auto mb-12"
                    >
                        Whether you need a service or offer one, we make it simple, secure, and rewarding for everyone.
                    </motion.p>

                    {/* Toggle */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex bg-white p-1 rounded-full border border-slate-200 shadow-sm mb-16"
                    >
                        <button
                            onClick={() => setActiveTab('customers')}
                            className={`px-8 py-3 rounded-full text-sm font-bold transition-all ${activeTab === 'customers' ? 'bg-primary text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}
                        >
                            For Customers
                        </button>
                        <button
                            onClick={() => setActiveTab('workers')}
                            className={`px-8 py-3 rounded-full text-sm font-bold transition-all ${activeTab === 'workers' ? 'bg-primary text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}
                        >
                            For Workers
                        </button>
                    </motion.div>
                </div>

                {/* Background Decorations */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] bg-blue-100/50 rounded-full blur-[100px]"></div>
                    <div className="absolute top-[40%] -left-[10%] w-[40%] h-[40%] bg-purple-100/50 rounded-full blur-[100px]"></div>
                </div>
            </section>

            {/* Steps Section */}
            <section className="container mx-auto px-6 pb-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Steps List */}
                    <div className="space-y-12">
                        {(activeTab === 'customers' ? customerSteps : workerSteps).map((step, index) => (
                            <motion.div
                                key={step.title}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex gap-6 group"
                            >
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${step.color} group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                                    <step.icon size={32} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-800 mb-2">{step.title}</h3>
                                    <p className="text-slate-500 text-lg leading-relaxed">{step.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Image */}
                    <div className="relative">
                        <motion.div
                            key={activeTab} // Retrigger animation on tab change
                            initial="hidden"
                            animate="visible"
                            variants={imageVariants}
                            className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white"
                        >
                            {activeTab === 'customers' ? (
                                <img
                                    src="/images/how-it-works-customer.png"
                                    alt="Customer using app"
                                    className="w-full h-auto object-cover"
                                />
                            ) : (
                                <img
                                    src="/images/how-it-works-worker.png"
                                    alt="Worker checking phone"
                                    className="w-full h-auto object-cover"
                                />
                            )}

                            {/* Floating Badge */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/50 max-w-xs"
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-green-100 rounded-full text-green-600">
                                        <Smile size={20} />
                                    </div>
                                    <span className="font-bold text-slate-800">
                                        {activeTab === 'customers' ? 'Satisfaction Guaranteed' : 'Weekly Payouts'}
                                    </span>
                                </div>
                                <p className="text-sm text-slate-500">
                                    {activeTab === 'customers'
                                        ? 'Pay only when you are happy with the service.'
                                        : 'Get your earnings deposited directly to your bank.'}
                                </p>
                            </motion.div>
                        </motion.div>

                        {/* Decor elements behind image */}
                        <div className="absolute top-10 -right-10 w-full h-full border-2 border-dashed border-slate-300 rounded-[2.5rem] -z-10"></div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-slate-900 py-20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
                <div className="container mx-auto px-6 text-center relative z-10">
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-8">
                        Ready to get started?
                    </h2>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link
                            to="/services"
                            className="bg-white text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-slate-100 transition-colors"
                        >
                            Find a Service
                        </Link>
                        <Link
                            to="/register"
                            className="bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/30"
                        >
                            Join as a Pro
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HowItWorks;
