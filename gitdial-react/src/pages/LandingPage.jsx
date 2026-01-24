import React from 'react';
import Hero from '../components/LandingPage/Hero';
import Stats from '../components/LandingPage/Stats';
import Categories from '../components/LandingPage/Categories';
import ServiceShowcase from '../components/LandingPage/ServiceShowcase';
import Features from '../components/LandingPage/Features';
import { motion } from 'framer-motion';

// Page transition variants
const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

const LandingPage = () => {
    return (
        <motion.div
            className="landing-page-wrapper bg-white"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            {/* Hero Section with integrated animations */}
            <Hero />

            {/* Stats Bar - Overlapping the Hero bottom */}
            <Stats />

            {/* Main Service Categories */}
            <div id="categories">
                <Categories />
            </div>

            {/* Features & Value Props */}
            <div id="features">
                <Features />
            </div>

            {/* Detailed Service Showcase */}
            <div id="services">
                <ServiceShowcase />
            </div>

        </motion.div>
    );
};

export default LandingPage;
