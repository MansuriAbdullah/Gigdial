import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Home/Hero';
import Categories from '../components/Home/Categories';
import Services from '../components/Home/Services';
import Features from '../components/Home/Features';

const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20 }
};

const Home = () => {
    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <Hero />
            <Categories />
            <Services />
            <Features />
        </motion.div>
    );
};

export default Home;
