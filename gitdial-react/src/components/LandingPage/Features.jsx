/* eslint-disable no-unused-vars */
import React from 'react';
import { ShieldCheck, Percent, Clock, Mic, Heart, Award } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }) => (
    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-md hover:border-lime-500/50 transition-all hover:bg-slate-50 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/5">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500/10 to-lime-500/10 rounded-lg flex items-center justify-center text-blue-600 mb-6">
            <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
    </div>
);

const Features = () => {
    const features = [
        {
            icon: ShieldCheck,
            title: "100% Verified Workers",
            description: "Every gig worker undergoes Aadhaar and PAN verification plus comprehensive background checks for your safety."
        },
        {
            icon: Percent,
            title: "0% Commission Fee",
            description: "Subscription-based model means workers keep 100% of their earnings. Fair pricing for customers too."
        },
        {
            icon: Clock,
            title: "On-Demand Services",
            description: "Book services instantly or schedule for later. Flexible timing to match your convenience."
        },
        {
            icon: Mic,
            title: "Voice Search (Hindi)",
            description: "Search in Hindi or English using voice commands – perfect for users of all literacy levels."
        },
        {
            icon: Heart,
            title: "Worker Wellness Program",
            description: "Free health insurance, skill training, and financial support for all verified gig workers."
        },
        {
            icon: Award,
            title: "Quality Guarantee",
            description: "Ratings, reviews, and satisfaction guarantee on all services. Your happiness is our priority."
        }
    ];

    return (
        <section className="py-24 bg-white relative">
            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Why Choose GigDial?</h2>
                    <p className="text-slate-500">India's first commission-free gig worker marketplace</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, idx) => (
                        <FeatureCard key={idx} {...feature} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
