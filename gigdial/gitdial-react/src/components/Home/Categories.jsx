import React from 'react';
import { Smartphone, Heart, Home, BookOpen, Music, Scissors, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CategoryCard = ({ icon: Icon, title, count, color, index }) => {
    // Determine color classes dynamically based on theme palette
    let bgClass = "bg-primary-50";
    let textClass = "text-primary";
    let decorationClass = "bg-primary";

    if (color === 'secondary') {
        bgClass = "bg-secondary-50"; // Use custom configured secondary color
        textClass = "text-secondary";
        decorationClass = "bg-secondary";
    } else if (color === 'accent') {
        bgClass = "bg-amber-50";
        textClass = "text-amber-600";
        decorationClass = "bg-amber-500";
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -10 }}
            className="group relative bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all cursor-pointer overflow-hidden"
        >
            <div className={`absolute top-0 right-0 w-32 h-32 opacity-10 rounded-bl-[100px] -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-500 ${decorationClass}`}></div>

            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 relative z-10 ${bgClass} ${textClass} group-hover:scale-110 group-hover:shadow-lg`}>
                <Icon size={32} strokeWidth={1.5} />
            </div>

            <h3 className="font-display font-bold text-xl text-dark-surface mb-2 group-hover:translate-x-1 transition-transform group-hover:text-primary">{title}</h3>
            <p className="text-sm font-medium text-slate-500 flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${decorationClass}`}></span>
                {count} Workers
            </p>

            <div className={`absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300 ${textClass}`}>
                <ArrowRight size={24} />
            </div>
        </motion.div>
    );
}

const Categories = () => {
    const categories = [
        { icon: Smartphone, title: 'Digital & Tech', count: '1,200+', color: 'primary' },
        { icon: Heart, title: 'Wellness & Fitness', count: '850+', color: 'secondary' },
        { icon: Home, title: 'Home Services', count: '2,400+', color: 'accent' },
        { icon: BookOpen, title: 'Education & Tutors', count: '500+', color: 'primary' },
        { icon: Music, title: 'Events & Creative', count: '600+', color: 'secondary' },
        { icon: Scissors, title: 'Beauty & Grooming', count: '900+', color: 'accent' },
    ];

    return (
        <section className="py-32 bg-white relative">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="max-w-xl"
                    >
                        <span className="text-secondary font-bold tracking-wider uppercase text-sm mb-2 block">Our Categories</span>
                        <h2 className="text-4xl md:text-5xl font-display font-extrabold text-dark-surface mb-6">Explore by Category</h2>
                        <p className="text-lg text-slate-500 leading-relaxed">From coding to cleaning, find the right professional for every job in your life.</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <Link to="/services" className="hidden md:flex items-center gap-2 font-bold text-dark-surface hover:text-primary transition-colors group px-6 py-3 rounded-full bg-slate-50 hover:bg-slate-100 hover:shadow-md border border-transparent hover:border-slate-200">
                            View All Categories <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                        </Link>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((cat, index) => (
                        <CategoryCard key={index} {...cat} index={index} />
                    ))}
                </div>

                <div className="mt-12 text-center md:hidden">
                    <Link to="/services" className="btn-secondary w-full py-4 rounded-xl">View All Categories</Link>
                </div>
            </div>
        </section>
    );
};

export default Categories;
