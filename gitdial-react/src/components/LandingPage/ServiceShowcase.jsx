import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Star, ArrowRight, Sparkles, Clock, Users, Award, Zap, TrendingUp, Heart } from 'lucide-react';

const ServiceCard = ({ title, rating, image, category, price, bookings }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    whileHover={{ scale: 1.03, y: -8 }}
    viewport={{ once: true }}
    className="relative flex-shrink-0 w-72 bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-lg hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 group cursor-pointer"
  >
    {/* Premium badge for high ratings */}
    {parseFloat(rating) >= 4.8 && (
      <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-yellow-500 to-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
        <Award className="w-3 h-3" />
        <span>Premium</span>
      </div>
    )}

    {/* Trending badge for popular services */}
    {bookings > 100 && (
      <div className="absolute top-4 right-4 z-20 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
        <TrendingUp className="w-3 h-3" />
        <span>Trending</span>
      </div>
    )}

    <div className="h-48 overflow-hidden relative">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-60"></div>

      {/* Category tag */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full border border-white/20">
        {category}
      </div>
    </div>

    {/* Content */}
    <div className="p-5">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
          {title}
        </h3>
        <Heart className="w-5 h-5 text-slate-300 hover:text-rose-500 transition-colors cursor-pointer hover:scale-110" />
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-blue-50 px-3 py-1.5 rounded-lg">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="ml-1.5 font-bold text-slate-800">{rating}</span>
            <span className="text-xs text-slate-500 ml-1">/ 5.0</span>
          </div>

          <div className="flex items-center text-xs text-slate-500">
            <Users className="w-3 h-3 mr-1" />
            <span>{bookings}+ bookings</span>
          </div>
        </div>

        <div className="flex items-center text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded">
          <Clock className="w-3 h-3 mr-1" />
          <span>2h avg.</span>
        </div>
      </div>

      {/* Price and CTA */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        <div>
          <div className="text-xs text-slate-500">Starting from</div>
          <div className="text-xl font-bold text-slate-900">
            ₹{price}
            <span className="text-sm text-slate-500 font-normal ml-1">/session</span>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Book Now
        </motion.button>
      </div>
    </div>

    {/* Hover effect border */}
    <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500/30 rounded-2xl transition-all duration-300 pointer-events-none"></div>
  </motion.div>
);

const ServiceRow = ({ title, services, icon: Icon = Sparkles, color = 'blue' }) => {
  const scrollContainer = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const colors = {
    blue: 'from-blue-500 to-cyan-500',
    green: 'from-emerald-500 to-green-500',
    purple: 'from-purple-500 to-pink-500',
    orange: 'from-orange-500 to-amber-500',
    red: 'from-rose-500 to-pink-500',
    lime: 'from-lime-500 to-green-500'
  };

  const scroll = (direction) => {
    if (scrollContainer.current) {
      const scrollAmount = 300;
      scrollContainer.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });

      setTimeout(() => {
        if (scrollContainer.current) {
          const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.current;
          setShowLeftArrow(scrollLeft > 0);
          setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10);
        }
      }, 300);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative mb-16 last:mb-0"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-8 px-4 md:px-0">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${colors[color]} bg-opacity-10`}>
            <Icon className={`w-6 h-6 text-${color}-600`} />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">{title}</h2>
        </div>
        <motion.a
          href="#"
          whileHover={{ x: 5 }}
          className="flex items-center text-sm text-blue-600 hover:text-blue-700 font-semibold transition-colors group"
        >
          <span className="mr-2">Explore All</span>
          <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
            <ArrowRight className="w-4 h-4" />
          </div>
        </motion.a>
      </div>

      {/* Scroll arrows */}
      {showLeftArrow && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => scroll('left')}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-30 bg-white p-3 rounded-full shadow-lg border border-slate-200 hover:shadow-xl hover:border-blue-300 transition-all"
        >
          <ArrowRight className="w-5 h-5 text-slate-700 rotate-180" />
        </motion.button>
      )}

      {showRightArrow && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => scroll('right')}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-30 bg-white p-3 rounded-full shadow-lg border border-slate-200 hover:shadow-xl hover:border-blue-300 transition-all"
        >
          <ArrowRight className="w-5 h-5 text-slate-700" />
        </motion.button>
      )}

      {/* Services container */}
      <div
        ref={scrollContainer}
        className="overflow-x-auto scrollbar-hide px-4 md:px-0 pb-8"
        onScroll={() => {
          if (scrollContainer.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.current;
            setShowLeftArrow(scrollLeft > 0);
            setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10);
          }
        }}
      >
        <div className="flex space-x-6 w-max">
          {services.map((service, idx) => (
            <ServiceCard key={idx} {...service} />
          ))}
        </div>
      </div>

      {/* Progress indicator */}
      <div className="flex justify-center gap-2 mt-4">
        {services.map((_, idx) => (
          <div
            key={idx}
            className="w-2 h-2 rounded-full bg-slate-300"
          />
        ))}
      </div>
    </motion.div>
  );
};

const ServiceShowcase = () => {
  const serviceData = {
    digitalServices: [
      {
        title: 'Web Development',
        rating: '4.8',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80',
        category: 'Tech',
        price: '4999',
        bookings: 245
      },
      {
        title: 'Graphic Design',
        rating: '4.7',
        image: 'https://images.unsplash.com/photo-1626785774573-4b799312c95d?auto=format&fit=crop&w=600&q=80',
        category: 'Creative',
        price: '2999',
        bookings: 189
      },
      {
        title: 'Video Editing',
        rating: '4.9',
        image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=600&q=80',
        category: 'Media',
        price: '3999',
        bookings: 312
      },
      {
        title: 'Content Writing',
        rating: '4.6',
        image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=600&q=80',
        category: 'Writing',
        price: '1999',
        bookings: 167
      },
      {
        title: 'SEO Optimization',
        rating: '4.8',
        image: 'https://images.unsplash.com/photo-1571721795195-a2ca5d481f12?auto=format&fit=crop&w=600&q=80',
        category: 'Marketing',
        price: '5999',
        bookings: 278
      },
    ],

    wellnessServices: [
      {
        title: 'Personal Trainer',
        rating: '4.9',
        image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=600&q=80',
        category: 'Fitness',
        price: '899',
        bookings: 421
      },
      {
        title: 'Yoga Instructor',
        rating: '4.8',
        image: 'https://images.unsplash.com/photo-1544367563-12123d8965cd?auto=format&fit=crop&w=600&q=80',
        category: 'Wellness',
        price: '699',
        bookings: 356
      },
      {
        title: 'Nutritionist',
        rating: '4.7',
        image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=600&q=80',
        category: 'Health',
        price: '1299',
        bookings: 289
      },
      {
        title: 'Meditation Coach',
        rating: '4.9',
        image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80',
        category: 'Mindfulness',
        price: '799',
        bookings: 198
      },
    ],

    homeServices: [
      {
        title: 'Home Cleaning',
        rating: '4.8',
        image: 'https://images.unsplash.com/photo-1581578731117-104f8a3d46a8?auto=format&fit=crop&w=600&q=80',
        category: 'Cleaning',
        price: '1499',
        bookings: 512
      },
      {
        title: 'Plumbing Repair',
        rating: '4.7',
        image: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=600&q=80',
        category: 'Repair',
        price: '999',
        bookings: 387
      },
      {
        title: 'Electrical Help',
        rating: '4.9',
        image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=600&q=80',
        category: 'Electric',
        price: '1299',
        bookings: 234
      },
      {
        title: 'Appliance Repair',
        rating: '4.6',
        image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a783?auto=format&fit=crop&w=600&q=80',
        category: 'Maintenance',
        price: '899',
        bookings: 176
      },
    ],

    tutoringServices: [
      {
        title: 'Mathematics',
        rating: '4.9',
        image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=600&q=80',
        category: 'Academics',
        price: '799',
        bookings: 421
      },
      {
        title: 'Science Tuition',
        rating: '4.8',
        image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80',
        category: 'Education',
        price: '899',
        bookings: 356
      },
      {
        title: 'Language Learning',
        rating: '4.7',
        image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=600&q=80',
        category: 'Languages',
        price: '699',
        bookings: 289
      },
      {
        title: 'Music Lessons',
        rating: '4.9',
        image: 'https://images.unsplash.com/photo-1514320291940-236122f0d358?auto=format&fit=crop&w=600&q=80',
        category: 'Arts',
        price: '1299',
        bookings: 198
      },
    ],

    creativeServices: [
      {
        title: 'Photography',
        rating: '4.8',
        image: 'https://images.unsplash.com/photo-1554048612-387768052bf7?auto=format&fit=crop&w=600&q=80',
        category: 'Art',
        price: '4999',
        bookings: 156
      },
      {
        title: 'Event Planning',
        rating: '4.7',
        image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=600&q=80',
        category: 'Events',
        price: '8999',
        bookings: 89
      },
      {
        title: 'Makeup Artist',
        rating: '4.9',
        image: 'https://images.unsplash.com/photo-1487412947132-75c5b98f4b7b?auto=format&fit=crop&w=600&q=80',
        category: 'Beauty',
        price: '2999',
        bookings: 212
      },
      {
        title: 'Interior Design',
        rating: '4.6',
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80',
        category: 'Design',
        price: '6999',
        bookings: 134
      },
    ],

    beautyServices: [
      {
        title: 'Bridal Makeup',
        rating: '4.9',
        image: 'https://images.unsplash.com/photo-1487412947132-75c5b98f4b7b?auto=format&fit=crop&w=600&q=80',
        category: 'Bridal',
        price: '8999',
        bookings: 156
      },
      {
        title: 'Hair Styling',
        rating: '4.8',
        image: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=600&q=80',
        category: 'Salon',
        price: '1999',
        bookings: 289
      },
      {
        title: 'Spa & Massage',
        rating: '4.7',
        image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600&q=80',
        category: 'Wellness',
        price: '2999',
        bookings: 367
      },
      {
        title: 'Manicure',
        rating: '4.6',
        image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=600&q=80',
        category: 'Nails',
        price: '1499',
        bookings: 412
      },
    ],
  };

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-lime-500/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
            <Zap className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-700">Handpicked Premium Services</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Premium Services</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Discover top-rated professionals for all your needs. Book instantly with verified reviews and transparent pricing.
          </p>
        </motion.div>

        {/* Service Rows */}
        <div className="space-y-20">
          <ServiceRow
            title="Digital & Tech Services"
            services={serviceData.digitalServices}
            icon={Zap}
            color="blue"
          />
          <ServiceRow
            title="Wellness & Fitness"
            services={serviceData.wellnessServices}
            icon={Heart}
            color="red"
          />
          <ServiceRow
            title="Home Services"
            services={serviceData.homeServices}
            icon={Sparkles}
            color="green"
          />
          <ServiceRow
            title="Tutoring & Education"
            services={serviceData.tutoringServices}
            icon={Award}
            color="purple"
          />
          <ServiceRow
            title="Events & Creative Services"
            services={serviceData.creativeServices}
            icon={TrendingUp}
            color="orange"
          />
          <ServiceRow
            title="Beauty & Personal Care"
            services={serviceData.beautyServices}
            icon={Star}
            color="lime"
          />
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-blue-50 to-lime-50 rounded-3xl p-8 border border-blue-100">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Need something specific?</h3>
            <p className="text-slate-600 mb-6">We have 1000+ more services across 50+ categories</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-lime-600 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-lime-500/30 transition-all duration-300"
            >
              Browse All Categories
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceShowcase;