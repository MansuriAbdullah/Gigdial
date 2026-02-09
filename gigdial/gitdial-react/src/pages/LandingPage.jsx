import React from 'react';
import Hero from '../components/LandingPage/Hero';
import Stats from '../components/LandingPage/Stats';
import Categories from '../components/LandingPage/Categories';
import ServiceShowcase from '../components/LandingPage/ServiceShowcase';
import Features from '../components/LandingPage/Features';
import HowItWorks from '../components/LandingPage/HowItWorks';
import Pricing from '../components/LandingPage/Pricing';
import LiveDemoSection from '../components/LandingPage/LiveDemoSection';
import AppShowcase from '../components/LandingPage/AppShowcase';
import { motion } from 'framer-motion';

// Page transition variants
const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

import SEO from '../components/Shared/SEO';

const LandingPage = () => {
    return (
        <motion.div
            className="landing-page-wrapper bg-white"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <SEO title="Home" description="Connect with verified local professionals for all your service needs. Reliable, fast, and secure." />
            {/* Hero Section with integrated animations */}
            <Hero />

            {/* Stats Bar - Overlapping the Hero bottom */}
            <Stats />

            {/* Live Demo Section - New Addition */}
            <LiveDemoSection />

            {/* Main Service Categories */}
            <div id="categories">
                <Categories />
            </div>

            {/* Features & Value Props */}
            <div id="features">
                <Features />
            </div>

            {/* App Showcase - New Addition */}
            <AppShowcase />

            {/* Detailed Service Showcase */}
            <div id="services">
                <ServiceShowcase />
            </div>

            {/* How It Works Section */}
            <HowItWorks />

            {/* Pricing Section */}
            <Pricing />

        </motion.div>
    );
};

export default LandingPage;
