import React from 'react';
import { motion } from 'framer-motion';

import Hero from '../components/LandingPage/Hero';
import ServiceGrid from '../components/LandingPage/ServiceGrid';
import HowItWorksMockup from '../components/LandingPage/HowItWorksMockup';
import SEO from '../components/Shared/SEO';

const LandingPage = () => {
    return (
        <motion.div
            className="landing-page-wrapper bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <SEO title="Home" description="Connect with verified local professionals instantly. No middleman, no commission." />
            
            {/* 1. Hero Section (Includes Comparison Cards) */}
            <Hero />

            {/* 2. Service Grid Section (45+ Services) */}
            <ServiceGrid />

            {/* 3. How It Works Section (Trusted by 1000+ Users) */}
            <HowItWorksMockup />

        </motion.div>
    );
};

export default LandingPage;
