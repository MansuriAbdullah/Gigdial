// ServicesCatalog.jsx
import React, { useState, useEffect } from 'react';
import { 
  Search, Mic, Star, Users, CheckCircle, 
  LayoutDashboard, Calendar, Repeat, MessageSquare,
  Heart, CreditCard, MapPin, Gift, Crown,
  Settings, LogOut, Menu, Filter, X, Sparkles,
  TrendingUp, Clock, Award, Shield, Zap
} from 'lucide-react';

// Services data
const servicesData = [
  {
    id: 1,
    name: "Web Development",
    category: "Digital Services",
    description: "Full-stack developers, frontend & backend specialists",
    rating: "4.8",
    workers: "1,245",
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=400",
    popular: true,
    badge: "Trending"
  },
  {
    id: 2,
    name: "App Development",
    category: "Digital Services",
    description: "iOS, Android & cross-platform mobile developers",
    rating: "4.9",
    workers: "892",
    imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=400",
    featured: true,
    badge: "Featured"
  },
  {
    id: 3,
    name: "Graphic Design",
    category: "Digital Services",
    description: "Logo, branding, UI/UX & visual design experts",
    rating: "4.7",
    workers: "2,156",
    imageUrl: "https://images.unsplash.com/photo-1626785774573-4b799312afc2?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 4,
    name: "Digital Marketing",
    category: "Digital Services",
    description: "SEO, social media, content marketing specialists",
    rating: "4.8",
    workers: "1,567",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400",
    popular: true
  },
  {
    id: 5,
    name: "Yoga Trainers",
    category: "Wellness",
    description: "Certified yoga instructors for all levels",
    rating: "4.9",
    workers: "543",
    imageUrl: "https://images.unsplash.com/photo-1544367563-121955377d02?auto=format&fit=crop&q=80&w=400",
    badge: "Popular"
  },
  {
    id: 6,
    name: "Personal Trainers",
    category: "Wellness",
    description: "Fitness coaches & gym trainers",
    rating: "4.8",
    workers: "789",
    imageUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 7,
    name: "Nutritionists",
    category: "Wellness",
    description: "Diet planning & nutrition counseling",
    rating: "4.7",
    workers: "432",
    imageUrl: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 8,
    name: "Cleaning Services",
    category: "Home Services",
    description: "Professional home & office cleaning",
    rating: "4.8",
    workers: "1,567",
    imageUrl: "https://images.unsplash.com/photo-1581578731117-104f2a863a30?auto=format&fit=crop&q=80&w=400",
    popular: true
  },
  {
    id: 9,
    name: "Plumbers",
    category: "Home Services",
    description: "Plumbing repairs & installations",
    rating: "4.7",
    workers: "892",
    imageUrl: "https://images.unsplash.com/photo-1505798577917-a65157d3320a?auto=format&fit=crop&q=80&w=400",
    urgentAvailable: true
  },
  {
    id: 10,
    name: "Electricians",
    category: "Home Services",
    description: "Electrical repairs & wiring",
    rating: "4.6",
    workers: "745",
    imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=400",
    urgentAvailable: true
  },
  {
    id: 11,
    name: "Academic Tutors",
    category: "Tutoring",
    description: "Math, Science, English & more",
    rating: "4.9",
    workers: "2,345",
    imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=400",
    badge: "Popular"
  },
  {
    id: 12,
    name: "Event Planners",
    category: "Events",
    description: "Wedding, corporate & party planning",
    rating: "4.8",
    workers: "456",
    imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=400"
  }
];

const categories = [
  { id: 'all', name: 'All Services', icon: '🎯', count: 124 },
  { id: 'digital', name: 'Digital', icon: '💻', count: 45 },
  { id: 'wellness', name: 'Wellness', icon: '🧘', count: 32 },
  { id: 'home', name: 'Home', icon: '🏠', count: 28 },
  { id: 'tutoring', name: 'Tutoring', icon: '📚', count: 19 },
  { id: 'events', name: 'Events', icon: '🎉', count: 16 },
  { id: 'beauty', name: 'Beauty', icon: '💅', count: 12 },
  { id: 'auto', name: 'Auto', icon: '🚗', count: 8 }
];

const SidebarLink = ({ icon: Icon, label, active = false, badge }) => (
  <a
    href="#"
    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
      active
        ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 border border-blue-100'
        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
    }`}
  >
    <Icon className="w-5 h-5" />
    <span className="font-medium">{label}</span>
    {badge && (
      <span className="ml-auto px-2 py-1 text-xs font-semibold bg-red-100 text-red-600 rounded-full">
        {badge}
      </span>
    )}
  </a>
);

const ServiceCard = ({ service }) => {
  const getCategoryColor = (category) => {
    const colors = {
      'Digital Services': 'from-blue-500 to-cyan-500',
      'Wellness': 'from-green-500 to-emerald-500',
      'Home Services': 'from-orange-500 to-amber-500',
      'Tutoring': 'from-purple-500 to-pink-500',
      'Events': 'from-red-500 to-rose-500',
      'Beauty': 'from-pink-500 to-rose-500'
    };
    return colors[category] || 'from-gray-500 to-gray-600';
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Gradient Border Effect */}
      <div className={`absolute inset-0 bg-gradient-to-r ${getCategoryColor(service.category)} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
      
      <div className="relative h-48 overflow-hidden">
        <img
          src={service.imageUrl}
          alt={service.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        
        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <div className="flex items-center gap-1 px-3 py-1 bg-white/95 backdrop-blur-sm rounded-full">
            <CheckCircle className="w-3 h-3 text-green-500" />
            <span className="text-xs font-semibold text-gray-800">Verified</span>
          </div>
          {service.badge && (
            <div className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full">
              {service.badge}
            </div>
          )}
          {service.urgentAvailable && (
            <div className="px-3 py-1 bg-gradient-to-r from-red-500 to-rose-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
              <Zap className="w-3 h-3" />
              Urgent
            </div>
          )}
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <span className={`text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r ${getCategoryColor(service.category)} text-white`}>
            {service.category}
          </span>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="font-semibold text-gray-800">{service.rating}</span>
            <span className="text-gray-400 text-sm">/5</span>
          </div>
        </div>

        <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {service.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {service.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-500">
            <Users className="w-4 h-4" />
            <span className="text-sm font-medium">{service.workers} available</span>
          </div>
          <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm font-semibold rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg">
            View Profiles
          </button>
        </div>
      </div>
    </div>
  );
};

const CategoryButton = ({ category, isActive, onClick }) => (
  <button
    onClick={() => onClick(category.id)}
    className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-200 transform hover:scale-105 ${
      isActive
        ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg scale-105'
        : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
    }`}
  >
    <span className="text-2xl mb-2">{category.icon}</span>
    <span className="font-semibold text-gray-800">{category.name}</span>
    <span className="text-xs text-gray-500 mt-1">{category.count} services</span>
  </button>
);

const ServicesCatalog = () => {
  const [services, setServices] = useState(servicesData);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [location, setLocation] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const filterServices = () => {
    let filtered = [...servicesData];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(service =>
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(service => {
        if (selectedCategory === 'digital') return service.category === 'Digital Services';
        if (selectedCategory === 'wellness') return service.category === 'Wellness';
        if (selectedCategory === 'home') return service.category === 'Home Services';
        if (selectedCategory === 'tutoring') return service.category === 'Tutoring';
        if (selectedCategory === 'events') return service.category === 'Events';
        if (selectedCategory === 'beauty') return service.category === 'Beauty';
        return true;
      });
    }

    // Sort
    if (sortBy === 'rating') {
      filtered.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
    } else if (sortBy === 'popular') {
      filtered.sort((a, b) => parseInt(b.workers.replace(/,/g, '')) - parseInt(a.workers.replace(/,/g, '')));
    }

    setServices(filtered);
  };

  useEffect(() => {
    filterServices();
  }, [searchQuery, selectedCategory, sortBy, location]);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Discover Amazing Services
              <span className="block text-3xl md:text-4xl font-normal mt-2">
                Find perfect professionals for any task
              </span>
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Browse 45+ service categories with verified professionals ready to help
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for services (e.g., 'Plumber', 'Yoga', 'Web Design')..."
                  className="w-full pl-12 pr-12 py-4 text-gray-900 bg-white rounded-2xl border-2 border-transparent focus:border-blue-500 focus:ring-4 focus:ring-blue-200 outline-none transition-all shadow-xl"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all">
                  <Mic className="h-5 w-5 text-white" />
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold">45+</div>
                <div className="text-blue-200">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">10K+</div>
                <div className="text-blue-200">Professionals</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">4.8★</div>
                <div className="text-blue-200">Avg Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Categories */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Popular Categories</h2>
              <p className="text-gray-600">Browse services by category</p>
            </div>
            <button className="text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-2">
              View all <Sparkles className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {categories.map((category) => (
              <CategoryButton
                key={category.id}
                category={category}
                isActive={selectedCategory === category.id}
                onClick={handleCategoryClick}
              />
            ))}
          </div>
        </div>

        {/* Filters Bar */}
        <div className="mb-8 bg-white rounded-2xl shadow-lg p-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
              >
                <Filter className="w-4 h-4" />
                Filters
                {showFilters && <X className="w-4 h-4" />}
              </button>
              <div className="text-gray-600">
                Showing <span className="font-bold text-gray-900">{services.length}</span> services
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value="all">All Locations</option>
                <option value="mumbai">Mumbai</option>
                <option value="delhi">Delhi NCR</option>
                <option value="bangalore">Bangalore</option>
              </select>
            </div>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-6 p-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
                  <div className="space-y-2">
                    {['Immediate', 'Today', 'Tomorrow', 'Weekend'].map((opt) => (
                      <label key={opt} className="flex items-center gap-2">
                        <input type="checkbox" className="rounded text-blue-600" />
                        <span className="text-gray-700">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                  <div className="space-y-2">
                    {['Under ₹500', '₹500 - ₹1000', '₹1000 - ₹2000', '₹2000+'].map((opt) => (
                      <label key={opt} className="flex items-center gap-2">
                        <input type="checkbox" className="rounded text-blue-600" />
                        <span className="text-gray-700">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                  <div className="space-y-2">
                    {['4.5+ Stars', '4.0+ Stars', '3.5+ Stars', 'Any Rating'].map((opt) => (
                      <label key={opt} className="flex items-center gap-2">
                        <input type="checkbox" className="rounded text-blue-600" />
                        <span className="text-gray-700">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded text-blue-600" />
                      <span className="text-gray-700 flex items-center gap-1">
                        <Shield className="w-4 h-4 text-green-500" />
                        Verified Only
                      </span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded text-blue-600" />
                      <span className="text-gray-700 flex items-center gap-1">
                        <Zap className="w-4 h-4 text-orange-500" />
                        Urgent Available
                      </span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded text-blue-600" />
                      <span className="text-gray-700 flex items-center gap-1">
                        <Award className="w-4 h-4 text-purple-500" />
                        Top Rated
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Services Grid */}
        {services.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mb-8">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
            
            {/* Load More Button */}
            <div className="text-center">
              <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Load More Services
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="mb-6">
              <Search className="w-20 h-20 text-gray-300 mx-auto" />
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No services found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your filters or search query</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-6 py-2 border-2 border-blue-500 text-blue-500 font-semibold rounded-xl hover:bg-blue-50 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 p-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Need something specific?</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Can't find what you're looking for? Our concierge service can help you find the perfect professional for any task.
          </p>
          <button className="px-8 py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-lg">
            Request Custom Service
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServicesCatalog;