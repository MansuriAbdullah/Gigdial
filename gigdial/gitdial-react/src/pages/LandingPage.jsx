import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

import Hero from '../components/LandingPage/Hero';
import ServiceGrid from '../components/LandingPage/ServiceGrid';
import HowItWorksMockup from '../components/LandingPage/HowItWorksMockup';
import ServiceShowcase from '../components/LandingPage/ServiceShowcase';
import BrowseWorkersMinimal from '../components/LandingPage/BrowseWorkersMinimal';
import Testimonials from '../components/LandingPage/Testimonials';
import Features from '../components/LandingPage/Features';
import HowItWorks from '../components/LandingPage/HowItWorks';
import Pricing from '../components/LandingPage/Pricing';
import LiveDemoSection from '../components/LandingPage/LiveDemoSection';
import AppShowcase from '../components/LandingPage/AppShowcase';
import BlogSection from '../components/LandingPage/BlogSection';
import SEO from '../components/Shared/SEO';

// Page transition variants
const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

const LandingPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            if (user.role === 'worker') navigate('/worker-dashboard', { replace: true });
            else if (user.role === 'customer') navigate('/customer-dashboard', { replace: true });
            else if (user.role === 'admin') navigate('/admin', { replace: true });
        }
    }, [user, navigate]);

    return (
        <motion.div
            className="landing-page-wrapper bg-white"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <SEO title="Home" description="Connect with verified local professionals for all your service needs. Reliable, fast, and secure." />
            {/* Hero Section */}
            <Hero />

            {/* 45+ Services Grid - Directly below hero cards */}
            <ServiceGrid />

            {/* How It Works + Trusted Users */}
            <HowItWorksMockup />


            {/* Live Demo Section - New Addition */}
            <LiveDemoSection />

            {/* Detailed Service Showcase - Now at the Top */}
            <div id="services">
                <ServiceShowcase />
            </div>

            {/* Features & Value Props */}
            <div id="features">
                <Features />
            </div>

            {/* App Showcase - Mobile Experience */}
            <AppShowcase />

            {/* Top Workers Listing - Replaces Categories Section */}
            <div id="workers-grid">
                <BrowseWorkersMinimal />
            </div>

            {/* User Testimonials Section */}
            <div id="testimonials">
                <Testimonials />
            </div>

            {/* Blog Section & Knowledge Hub */}
            <BlogSection />

            {/* How It Works Section */}
            <HowItWorks />

            {/* Pricing Section */}
            <Pricing />

        </motion.div>
    );
};

export default LandingPage;
