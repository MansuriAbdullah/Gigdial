import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ArrowRight, Sparkles, Clock, Users, Award, Zap, TrendingUp, Heart, X, Phone, Send, Search, RefreshCw } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getFullImagePath } from '../../utils/imagePath';
import axios from 'axios';

const ServiceCard = ({ title, rating, image, category, price, bookings, onBook, workerId, id, color = 'blue' }) => {
  const gradients = {
    blue: 'from-blue-600 to-indigo-600',
    green: 'from-emerald-500 to-teal-500',
    purple: 'from-purple-500 to-fuchsia-500',
    orange: 'from-amber-400 to-orange-500',
    red: 'from-rose-500 to-pink-500',
    lime: 'from-lime-500 to-green-500'
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -10 }}
      viewport={{ once: true }}
      className="relative flex-shrink-0 w-[280px] sm:w-80 group cursor-pointer h-full"
    >
      {/* Visible Shimmer Border effect */}
      <div className={`absolute -inset-[1px] bg-gradient-to-r ${gradients[color]} rounded-[2rem] blur-sm opacity-25 group-hover:opacity-100 transition-opacity duration-500`}></div>

      {/* Main Card Content */}
      <div className="relative bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/50 group-hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
        {/* Image Container */}
        <div className="h-52 overflow-hidden relative shrink-0" onClick={() => onBook({ title, workerId, image, id })}>
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
            onError={(e) => {
              e.target.onerror = null;
              const categoryMatch = category || 'Professional';
              const placeholders = {
                'Cleaning': 'https://images.unsplash.com/photo-1581578731117-104f8a3d46a8?q=80&w=600',
                'Plumber': 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=600',
                'Electrician': 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=600',
                'Tutor': 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=600',
                'Digital': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600'
              };
              e.target.src = placeholders[categoryMatch] || 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=600';
            }}
          />
          {/* Dynamic Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>

          {/* Category Badge - Glassmorphism */}
          <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/30">
            {category}
          </div>

          {/* Floating Rating Card */}
          <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-xl px-2.5 py-1.5 rounded-xl shadow-xl flex items-center gap-1.5 border border-white">
            <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
            <span className="text-xs font-black text-slate-800">{rating}</span>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 flex flex-col flex-1">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-black text-slate-800 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-slate-900 group-hover:to-slate-600 transition-all line-clamp-1 flex-1 pr-2">
              {title}
            </h3>
            <button className="p-2 bg-slate-50 rounded-full text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-all transform hover:scale-110 active:scale-90 overflow-hidden relative">
              <Heart className="w-5 h-5" />
            </button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-3 mb-6">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-100">
              <Users className="w-3.5 h-3.5 text-blue-500" />
              <span>{bookings}+ hires</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-100">
              <Clock className="w-3.5 h-3.5 text-emerald-500" />
              <span>Quick response</span>
            </div>
          </div>

          <div className="mt-auto">
            {/* Action Button - Vibrant Gradient */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => {
                e.stopPropagation();
                onBook({ title, workerId, image, id });
              }}
              className={`w-full py-4 bg-gradient-to-r ${gradients[color]} text-white text-[11px] font-black rounded-2xl shadow-lg border-t border-white/20 transition-all uppercase tracking-widest flex items-center justify-center gap-2 group/btn`}
            >
              <Zap className="w-4 h-4 fill-white group-hover/btn:animate-pulse" />
              <span>Request Now</span>
              <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ServiceRow = ({ title, services, icon: Icon = Sparkles, color = 'blue', onBook, onExplore, category }) => {
  const scrollContainer = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const colors = {
    blue: 'from-blue-600/20 to-blue-600/5 text-blue-600',
    green: 'from-emerald-600/20 to-emerald-600/5 text-emerald-600',
    purple: 'from-purple-600/20 to-purple-600/5 text-purple-600',
    orange: 'from-orange-600/20 to-orange-600/5 text-orange-600',
    red: 'from-rose-600/20 to-rose-600/5 text-rose-600',
    lime: 'from-lime-600/20 to-lime-600/5 text-lime-600'
  };

  const scroll = (direction) => {
    if (scrollContainer.current) {
      const { scrollLeft, clientWidth, scrollWidth } = scrollContainer.current;
      const scrollAmount = 350; // Approximating card width + gap

      let nextScroll = 0;
      if (direction === 'right') {
        nextScroll = scrollLeft + clientWidth >= scrollWidth - 10 ? 0 : scrollLeft + scrollAmount;
      } else {
        nextScroll = scrollLeft <= 0 ? scrollWidth - clientWidth : scrollLeft - scrollAmount;
      }

      scrollContainer.current.scrollTo({
        left: nextScroll,
        behavior: 'smooth'
      });
    }
  };

  // Auto-scroll logic
  useEffect(() => {
    if (isHovered || services.length <= 1) return;

    const interval = setInterval(() => {
      scroll('right');
    }, 4000); // Scroll every 4 seconds

    return () => clearInterval(interval);
  }, [isHovered, services.length]);

  const handleScroll = () => {
    if (scrollContainer.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.current;
      setShowLeftArrow(scrollLeft > 20);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 20);

      // Update active dot
      const index = Math.round(scrollLeft / 344); // 320 card + 24 gap
      setActiveIndex(index);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative mb-24 last:mb-0 group/section"
    >
      {/* Header - More premium */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-8 px-4 md:px-0">
        <div className="flex items-center gap-4">
          <div className={`p-3 sm:p-4 rounded-[1.2rem] sm:rounded-[1.5rem] bg-gradient-to-br ${colors[color]} border border-white shadow-xl flex items-center justify-center transform group-hover/section:scale-110 transition-all duration-500`}>
            <Icon className="w-6 h-6 sm:w-8 sm:h-8" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-800 tracking-tight leading-tight">{title}</h2>
            <p className="text-slate-500 font-bold text-[10px] sm:text-sm tracking-widest uppercase mt-0.5 sm:mt-1 opacity-70">Handpicked Professionals</p>
          </div>
        </div>
        <motion.button
          onClick={() => onExplore(category)}
          whileHover={{ x: 5 }}
          className="flex items-center gap-3 px-6 py-3 sm:px-5 sm:py-2.5 bg-white border border-slate-100 rounded-2xl text-blue-600 font-black text-xs uppercase tracking-widest shadow-sm hover:shadow-md hover:border-blue-100 transition-all group/btn w-fit"
        >
          Explore All
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </motion.button>
      </div>

      {/* Navigation Arrows - Hidden on very small mobile */}
      <div className="hidden sm:flex absolute top-1/2 -left-4 -right-4 justify-between pointer-events-none z-30 opacity-0 group-hover/section:opacity-100 transition-opacity translate-y-4">
        <button
          onClick={() => scroll('left')}
          className={`p-4 bg-white/90 backdrop-blur-xl rounded-full shadow-2xl border border-slate-100 pointer-events-auto hover:bg-white hover:scale-110 active:scale-95 transition-all text-slate-800 ${!showLeftArrow ? 'opacity-30 cursor-not-allowed' : ''}`}
        >
          <ArrowRight className="w-6 h-6 rotate-180" />
        </button>
        <button
          onClick={() => scroll('right')}
          className={`p-4 bg-white/90 backdrop-blur-xl rounded-full shadow-2xl border border-slate-100 pointer-events-auto hover:bg-white hover:scale-110 active:scale-95 transition-all text-slate-800 ${!showRightArrow ? 'opacity-30 cursor-not-allowed' : ''}`}
        >
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>

      {/* Services container */}
      <div
        ref={scrollContainer}
        onScroll={handleScroll}
        className="overflow-x-auto scrollbar-hide px-4 md:px-0 pb-12 snap-x snap-mandatory scroll-smooth"
      >
        <div className="flex space-x-4 sm:space-x-8 w-max">
          {services.map((service, idx) => (
            <div key={idx} className="snap-start h-full">
              <ServiceCard {...service} onBook={onBook} color={color} />
            </div>
          ))}
        </div>
      </div>

      {/* Modern Progress Dots */}
      <div className="flex justify-center gap-2 -mt-4">
        {services.map((_, idx) => (
          <motion.div
            key={idx}
            animate={{
              width: activeIndex === idx ? 24 : 8,
              opacity: activeIndex === idx ? 1 : 0.4
            }}
            className={`h-2 rounded-full cursor-pointer transition-all ${activeIndex === idx ? 'bg-blue-600' : 'bg-slate-300 hover:bg-slate-400'}`}
            onClick={() => {
              scrollContainer.current.scrollTo({
                left: idx * 344,
                behavior: 'smooth'
              });
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

const ServiceShowcase = () => {
  const [data, setData] = useState({
    digitalServices: [],
    wellnessServices: [],
    homeServices: [],
    tutoringServices: [],
    creativeServices: [],
    beautyServices: []
  });
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [sending, setSending] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch('/api/gigs');
        const gigs = await res.json();

        // Categorize services based on the new registration categories
        const categoriesMap = {
          tradesServices: ['Trades & Services (Manual)', 'Plumbing', 'Electrician', 'Carpenter', 'Painter', 'AC Repair', 'Cleaning'],
          marketingSales: ['Sales, Marketing & PR', 'Marketing', 'SEO', 'Sales', 'Digital Marketing'],
          businessAdmin: ['Business, Admin & HR', 'Accounting', 'Human Resources', 'Admin', 'Financial'],
          legalCompliance: ['Legal & Compliance', 'Legal', 'Lawyer', 'Compliance'],
          techSoftware: ['Computers, IT & Software', 'Tech', 'Development', 'Software', 'IT', 'Cybersecurity', 'Cloud'],
          writingContent: ['Writing, Content & Languages', 'Writing', 'Content', 'Translator', 'Blogger'],
          designMedia: ['Design, Media & Architecture', 'Design', 'Media', 'Architecture', 'Graphic', 'Photographer'],
          logisticsTransport: ['Logistics, Shipping & Transport', 'Logistics', 'Transport', 'Driver', 'Shipping'],
          educationCoaching: ['Education, Teaching & Coaching', 'Education', 'Tutor', 'Teaching', 'Coaching'],
          healthWellness: ['Health, Medical & Wellness', 'Health', 'Medical', 'Wellness', 'Yoga', 'Fitness', 'Nurse'],
          aiTech: ['Artificial Intelligence & Future Tech', 'AI', 'Artificial Intelligence', 'Machine Learning', 'Future Tech'],
          eventsHospitality: ['Events, Hospitality & Tourism', 'Events', 'Hospitality', 'Tourism', 'Wedding', 'Chef'],
          othersGeneral: ['Others & General Jobs', 'Others', 'Security', 'Laborer', 'Delivery']
        };

        const categorizedData = {
          tradesServices: [],
          marketingSales: [],
          businessAdmin: [],
          legalCompliance: [],
          techSoftware: [],
          writingContent: [],
          designMedia: [],
          logisticsTransport: [],
          educationCoaching: [],
          healthWellness: [],
          aiTech: [],
          eventsHospitality: [],
          othersGeneral: []
        };

        gigs.forEach(gig => {
          // Fallback to user rating if gig doesn't have one
          const gigRating = (gig.rating && gig.rating > 0) ? gig.rating : (gig.user?.rating || 0);
          const gigHires = (gig.numReviews && gig.numReviews > 0) ? gig.numReviews : (gig.user?.numReviews || 0);

          // Map backend fields to frontend card props
          const mappedGig = {
            title: gig.title,
            rating: gigRating.toString() || '0',
            image: getFullImagePath(gig.image || gig.coverImage) || 'https://images.unsplash.com/photo-1581578731117-104f8a3d46a8?auto=format&fit=crop&w=600&q=80',
            category: gig.category || 'Professional',
            price: gig.price,
            bookings: gigHires || 0, // Using numReviews/salesCount as hiring count proxy
            id: gig._id,
            workerId: gig.user?._id || gig.user
          };

          // Find matching category group
          let added = false;
          const gigCat = (gig.mainCategory || gig.category || '').toLowerCase();
          
          for (const [key, keywords] of Object.entries(categoriesMap)) {
            if (keywords.some(k => gigCat.includes(k.toLowerCase()))) {
              categorizedData[key].push(mappedGig);
              added = true;
              break;
            }
          }
          // Default bucket if no specific category match
          if (!added) {
            categorizedData.othersGeneral.push(mappedGig);
          }
        });

        setData(categorizedData);
      } catch (err) {
        console.error("Failed to fetch services", err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleBookClick = async (service) => {
    setSelectedService(service);

    // Check auth status
    const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

    if (!user || !userInfo) {
      // Check for returning visitor with saved phone
      const storedPhone = localStorage.getItem('visitorPhone');
      if (storedPhone) {
        // Silent Lead capture for returning visitor
        try {
          axios.post('/api/leads/anonymous-record', { 
            workerId: service.workerId, 
            phoneNumber: storedPhone 
          });
        } catch(e) { console.error(e); }

        navigate(`/workers/${service.workerId}`, { 
          state: { 
            prefilledPhoneNumber: storedPhone,
            fromLandingPage: true
          } 
        });
        return;
      }
      
      // For landing page services, we show the popup to capture lead
      setModalOpen(true);
    } else {
      // If logged in, direct redirect to worker profile (One-click experience)
      toast.loading("Connecting...", { duration: 1000 });
      setTimeout(() => {
        navigate(`/workers/${service.workerId}`, {
          state: {
            fromLandingPage: true,
            autoRequest: true,
            gigId: service.id || service._id
          }
        });
      }, 500);
    }
  };

  const handleExplore = (category) => {
    navigate(`/services?category=${encodeURIComponent(category)}`);
  };

  const handleSubmitContact = async (e) => {
    e.preventDefault();
    const cleanPhone = phoneNumber.replace(/\D/g, ''); // Extract only digits

    if (cleanPhone.length !== 10) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }

    setSending(true);
    try {
      // 1. Store in local storage
      localStorage.setItem('visitorPhone', cleanPhone);

      // 2. Record lead anonymously
      await axios.post('/api/leads/anonymous-record', {
        workerId: selectedService.workerId,
        phoneNumber: cleanPhone
      });

      setModalOpen(false);
      setSending(false);
      toast.success("Profile Unlocked!", { icon: '🚀' });

      // 3. Navigate to worker profile
      navigate(`/workers/${selectedService.workerId}`, {
        state: {
          prefilledPhoneNumber: cleanPhone,
          fromLandingPage: true
        }
      });
    } catch (err) {
      console.error("Error submitting contact", err);
      toast.error("Process failed. Please try again.");
      setSending(false);
    }
  };

  if (loading) return <div className="py-24 text-center">Loading services...</div>;

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
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-6">
            Discover Premium Services
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Handpicked professionals delivering exceptional service with verified ratings and instant booking.
          </p>
        </motion.div>

        {/* Bada Search & Selection Row */}
        <div className="mb-16 max-w-5xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-stretch gap-6">
            {/* Compact Search Bar with Black Border */}
            <div className="flex-[2] relative group">
              <div className="absolute inset-0 bg-slate-900/5 rounded-[2.5rem] blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-700"></div>
              <div className="relative flex items-center bg-white border-2 border-slate-900 rounded-[2.5rem] p-1 shadow-lg shadow-slate-200/40 focus-within:ring-4 focus-within:ring-slate-900/5 transition-all duration-500">
                <div className="pl-6 pr-2">
                  <Search className="w-5 h-5 text-slate-400 group-focus-within:text-slate-900 transition-colors" />
                </div>
                <input
                  type="text"
                  placeholder="Find the best professional..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 bg-transparent py-3.5 text-slate-900 placeholder:text-slate-300 font-extrabold outline-none text-base pr-4"
                />
              </div>
            </div>

            {/* Compact Dropdown Button with Black Border */}
            <div className="flex-1 relative group/dropdown min-w-[240px]">
              <div className="relative h-full">
                <select
                  value={activeCategory}
                  onChange={(e) => setActiveCategory(e.target.value)}
                  className="w-full h-full appearance-none bg-white border-2 border-slate-900 rounded-[2.5rem] px-8 py-3.5 font-black text-xs uppercase tracking-[0.12em] text-slate-800 outline-none focus:ring-4 focus:ring-slate-900/5 cursor-pointer shadow-md transition-all pr-12"
                >
                  <option value="all">🔍 All Services</option>
                  <option value="tradesServices">🛠️ Trades & Manual</option>
                  <option value="healthWellness">🏃 Fitness & Wellness</option>
                  <option value="techSoftware">💻 IT & Software</option>
                  <option value="designMedia">🎨 Design & Media</option>
                  <option value="eventsHospitality">📷 Events & Beauty</option>
                  <option value="educationCoaching">🎓 Tutors & Coaching</option>
                  <option value="marketingSales">📈 Marketing & Sales</option>
                  <option value="logisticsTransport">🚛 Logistics & Driving</option>
                  <option value="businessAdmin">💼 Business & HR</option>
                  <option value="legalCompliance">⚖️ Legal & Law</option>
                  <option value="writingContent">Writing & Content</option>
                  <option value="aiTech">🤖 AI & Future Tech</option>
                  <option value="othersGeneral">⚙️ Others & General</option>
                </select>
                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-900">
                  <ArrowRight className="w-4 h-4 rotate-90" strokeWidth={4} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Service Area */}
        <div className="min-h-[400px] relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + searchTerm}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {(() => {
                let servicesToShow = [];
                let title = "";
                let icon = Sparkles;
                let color = "blue";
                let category = "All";

                const applySearch = (list) => {
                  if (!searchTerm.trim()) return list;
                  const term = searchTerm.toLowerCase().trim();
                  return list.filter(s =>
                    s.title.toLowerCase().includes(term) ||
                    (s.category && s.category.toLowerCase().includes(term)) ||
                    (s.mainCategory && s.mainCategory.toLowerCase().includes(term)) ||
                    (s.serviceDescription && s.serviceDescription.toLowerCase().includes(term))
                  );
                };

                if (activeCategory === 'all') {
                  const combined = Object.values(data).flat();
                  // Remove duplicates if any (by id)
                  const unique = Array.from(new Map(combined.map(s => [s.id, s])).values());
                  servicesToShow = applySearch(unique);
                  title = "Best Recommended Services";
                  icon = Sparkles;
                  color = "blue";
                  category = "All Professionals";
                } else if (activeCategory === 'tradesServices') {
                  servicesToShow = applySearch(data.tradesServices);
                  title = "Trades & Manual Services";
                  icon = Zap;
                  color = "blue";
                  category = "Trades";
                } else if (activeCategory === 'techSoftware') {
                  servicesToShow = applySearch(data.techSoftware);
                  title = "Computers & IT Support";
                  icon = Send;
                  color = "blue";
                  category = "Tech";
                } else if (activeCategory === 'healthWellness') {
                  servicesToShow = applySearch(data.healthWellness);
                  title = "Health & Wellness";
                  icon = Heart;
                  color = "red";
                  category = "Wellness";
                } else if (activeCategory === 'marketingSales') {
                  servicesToShow = applySearch(data.marketingSales);
                  title = "Marketing & Sales";
                  icon = Users;
                  color = "green";
                  category = "Marketing";
                } else if (activeCategory === 'designMedia') {
                  servicesToShow = applySearch(data.designMedia);
                  title = "Design & Creative Media";
                  icon = Star;
                  color = "purple";
                  category = "Design";
                } else if (activeCategory === 'educationCoaching') {
                  servicesToShow = applySearch(data.educationCoaching);
                  title = "Education & Tutoring";
                  icon = Award;
                  color = "orange";
                  category = "Tutor";
                } else if (activeCategory === 'eventsHospitality') {
                  servicesToShow = applySearch(data.eventsHospitality);
                  title = "Events & Hospitality";
                  icon = TrendingUp;
                  color = "lime";
                  category = "Events";
                } else if (activeCategory === 'aiTech') {
                  servicesToShow = applySearch(data.aiTech);
                  title = "AI & Future Technology";
                  icon = Zap;
                  color = "blue";
                  category = "AI Expert";
                } else if (activeCategory === 'logisticsTransport') {
                  servicesToShow = applySearch(data.logisticsTransport);
                  title = "Logistics & Transport";
                  icon = Clock;
                  color = "green";
                  category = "Logistics";
                }

                if (servicesToShow.length === 0) {
                  return (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                      <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                        <Search className="w-10 h-10 text-slate-300" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-800">No services found</h3>
                      <p className="text-slate-500 mt-2">Try searching for something else or browse another category.</p>
                    </div>
                  );
                }

                return (
                  <ServiceRow
                    title={title}
                    services={servicesToShow}
                    icon={icon}
                    color={color}
                    onBook={handleBookClick}
                    onExplore={handleExplore}
                    category={category}
                  />
                );
              })()}
            </motion.div>
          </AnimatePresence>
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
              className="px-8 py-3 bg-gradient-to-r from-[#2f5af4] to-[#6049e6] hover:from-[#2143bf] hover:to-[#4a39b3] text-white font-black rounded-[2rem] hover:shadow-2xl shadow-lg shadow-indigo-500/30 transition-all duration-300"
            >
              Browse All Categories
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Premium Light-Theme Contact Modal */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/40 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="relative p-[2px] rounded-[3rem] bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-2xl"
            >
              <div className="bg-white rounded-[2.95rem] w-full max-w-md p-10 relative overflow-hidden">
                {/* Micro-animations Background */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 opacity-50"></div>

                <button
                  onClick={() => setModalOpen(false)}
                  className="absolute top-6 right-6 p-2.5 bg-slate-50 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-all z-10"
                >
                  <X size={20} />
                </button>

                <div className="text-center mb-10 relative z-10">
                  <motion.div
                    initial={{ rotate: -15 }}
                    animate={{ rotate: 0 }}
                    className="w-24 h-24 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-xl shadow-blue-200"
                  >
                    <Phone className="text-white w-10 h-10" />
                  </motion.div>
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none mb-4">CONNECT WITH PRO</h3>
                  <p className="text-slate-500 font-medium text-base px-2">Enter your 10-digit number to unlock early access and professional services.</p>
                </div>

                <form onSubmit={handleSubmitContact} className="space-y-8 relative z-10">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Mobile Number</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                        <span className="text-lg font-black text-slate-300 tracking-tighter group-focus-within:text-blue-600 transition-colors">+91</span>
                      </div>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        placeholder="98765 43210"
                        className="w-full pl-16 pr-8 py-5 rounded-2xl bg-slate-50 border-2 border-slate-50 focus:bg-white focus:border-blue-500 focus:ring-8 focus:ring-blue-500/5 outline-none transition-all font-black text-slate-900 tracking-[0.15em] text-lg lg:text-xl shadow-inner"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full py-5 bg-slate-950 hover:bg-blue-600 text-white font-black rounded-2xl transition-all flex items-center justify-center gap-4 shadow-xl active:scale-[0.98] uppercase text-sm tracking-[0.2em] group overflow-hidden relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
                    {sending ? (
                      <span className="flex items-center gap-2">
                        <RefreshCw className="animate-spin" size={18} /> INITIALIZING...
                      </span>
                    ) : (
                      <>
                        <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> VIEW PROFILE NOW
                      </>
                    )}
                  </button>
                  <div className="flex items-center justify-center gap-6 mt-8 opacity-40 grayscale group-hover:grayscale-0 transition-all">
                    <div className="h-[1px] flex-1 bg-slate-200"></div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Verified & Secure</p>
                    <div className="h-[1px] flex-1 bg-slate-200"></div>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ServiceShowcase;
