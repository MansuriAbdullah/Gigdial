/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { motion } from 'framer-motion';
import { Car, Wrench, Zap, Home, GraduationCap, Dumbbell, Heart, Laptop, ChevronRight, Sparkles, Star, Users, Clock } from 'lucide-react';

const categories = [
  {
    name: 'Driver',
    icon: Car,
    color: 'text-blue-500',
    bg: 'bg-gradient-to-br from-blue-500/20 to-blue-600/10',
    count: '2.4k',
    rating: 4.8,
    tagline: 'Safe & Reliable Rides'
  },
  {
    name: 'Plumber',
    icon: Wrench,
    color: 'text-orange-500',
    bg: 'bg-gradient-to-br from-orange-500/20 to-amber-600/10',
    count: '3.2k',
    rating: 4.9,
    tagline: '24/7 Emergency Service'
  },
  {
    name: 'Electrician',
    icon: Zap,
    color: 'text-yellow-500',
    bg: 'bg-gradient-to-br from-yellow-500/20 to-yellow-600/10',
    count: '1.8k',
    rating: 4.7,
    tagline: 'Certified Experts'
  },
  {
    name: 'House Help',
    icon: Home,
    color: 'text-emerald-500',
    bg: 'bg-gradient-to-br from-emerald-500/20 to-green-600/10',
    count: '5.6k',
    rating: 4.6,
    tagline: 'Trusted & Verified'
  },
  {
    name: 'Tutor',
    icon: GraduationCap,
    color: 'text-purple-500',
    bg: 'bg-gradient-to-br from-purple-500/20 to-purple-600/10',
    count: '2.1k',
    rating: 4.9,
    tagline: 'Expert Educators'
  },
  {
    name: 'Fitness',
    icon: Dumbbell,
    color: 'text-rose-500',
    bg: 'bg-gradient-to-br from-rose-500/20 to-pink-600/10',
    count: '1.5k',
    rating: 4.8,
    tagline: 'Personal Trainers'
  },
  {
    name: 'Elder Care',
    icon: Heart,
    color: 'text-pink-500',
    bg: 'bg-gradient-to-br from-pink-500/20 to-rose-600/10',
    count: '980',
    rating: 4.9,
    tagline: 'Compassionate Care'
  },
  {
    name: 'IT Support',
    icon: Laptop,
    color: 'text-cyan-500',
    bg: 'bg-gradient-to-br from-cyan-500/20 to-blue-600/10',
    count: '1.3k',
    rating: 4.7,
    tagline: 'Tech Solutions'
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  },
  hover: {
    y: -8,
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  }
};

const Categories = () => {
  const { t } = useLanguage();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-64 bg-purple-500/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lime-500/10 border border-lime-500/20 mb-6"
          >
            <Sparkles className="w-4 h-4 text-lime-600" />
            <span className="text-sm font-medium text-lime-700">Trusted by 50,000+ Customers</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
          >
            Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Premium</span> Services
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto"
          >
            Handpicked professionals delivering exceptional service with verified ratings and instant booking
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          {categories.map((cat, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover="hover"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative group"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-lime-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative p-6 rounded-3xl bg-white border border-slate-200 group-hover:border-lime-500/30 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-lime-500/5 overflow-hidden cursor-pointer">

                {/* Animated background pattern */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute -right-4 -top-4 w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/5 to-transparent"></div>
                  <div className="absolute -left-4 -bottom-4 w-16 h-16 rounded-full bg-gradient-to-tr from-lime-500/5 to-transparent"></div>
                </div>

                {/* Badge */}
                <div className="absolute top-4 right-4 flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-full">
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                  <span className="text-xs font-semibold text-slate-700">{cat.rating}</span>
                </div>

                {/* Icon container with animated gradient */}
                <motion.div
                  className={`relative w-16 h-16 rounded-2xl ${cat.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 overflow-hidden`}
                  whileHover={{ rotate: 5 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                  <cat.icon className={`w-8 h-8 ${cat.color} relative z-10`} />
                </motion.div>

                {/* Category name */}
                <h3 className="text-xl font-bold text-slate-800 mb-2 relative">
                  {cat.name}
                  <ChevronRight className="w-5 h-5 text-lime-600 absolute right-0 top-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                </h3>

                {/* Tagline */}
                <p className="text-sm text-slate-500 mb-4 font-medium">{cat.tagline}</p>

                {/* Stats */}
                <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-2 mb-2">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-slate-400" />
                    <span className="text-sm font-medium text-slate-700">{cat.count} Experts</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-600">24/7</span>
                  </div>
                </div>

                <button className="w-full py-2.5 rounded-xl bg-slate-50 text-slate-600 font-bold text-sm group-hover:bg-slate-900 group-hover:text-white transition-all duration-300 flex items-center justify-center gap-2">
                  {t('viewWorkers')} <ChevronRight size={16} />
                </button>

                {/* Hover indicator */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-24 h-1 bg-gradient-to-r from-blue-500 to-lime-500 rounded-full transition-all duration-300"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 p-8 bg-gradient-to-r from-blue-50 to-lime-50 rounded-3xl border border-blue-100 shadow-lg">
            <div className="text-left">
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Can't find what you need?</h3>
              <p className="text-slate-600">We have 50+ more categories waiting for you</p>
            </div>
            <button className="group relative px-8 py-3 bg-gradient-to-r from-blue-600 to-lime-600 text-white font-semibold rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-lime-500/30">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-lime-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center gap-2">
                Explore All Categories
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-8 text-slate-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm">Live Availability</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm">Verified Professionals</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-sm">Secure Payments</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-sm">Instant Booking</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Categories;