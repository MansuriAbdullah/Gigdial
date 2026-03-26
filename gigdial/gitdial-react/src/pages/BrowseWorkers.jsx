import React, { useState, useEffect } from 'react';
import { Search, MapPin, Star, Briefcase, Filter, ChevronDown, ArrowRight, Zap, Shield, Loader2, Sparkles, X, SearchCheck } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getFullImagePath } from '../utils/imagePath';

const WorkerCard = ({ worker, index, color, onClick }) => {
    // Category mapping for colors consistent with the design system
    const colorMap = {
        'House Help': 'from-blue-600 to-cyan-500',
        'Cleaning': 'from-emerald-500 to-teal-500',
        'Plumber': 'from-rose-500 to-pink-500',
        'Electrician': 'from-amber-400 to-orange-500',
        'Tutor': 'from-indigo-600 to-purple-500',
        'specialist': 'from-violet-500 to-fuchsia-500'
    };

    const cardColor = colorMap[worker.category] || color.primary;

    const getSkills = (skills) => {
        let skillsArray = [];
        try {
            if (Array.isArray(skills)) {
                skillsArray = skills;
            } else if (typeof skills === 'string') {
                let clean = skills.trim();
                if (clean.startsWith('[') && clean.endsWith(']')) {
                    try {
                        const parsed = JSON.parse(clean);
                        skillsArray = Array.isArray(parsed) ? parsed : [parsed];
                    } catch (e) {
                        clean = clean.slice(1, -1);
                        skillsArray = clean.split(',').map(s => s.trim().replace(/^["']|["']$/g, ''));
                    }
                } else {
                    skillsArray = clean.split(',').map(s => s.trim().replace(/^["']|["']$/g, ''));
                }
            }
        } catch (e) {
            skillsArray = ['Professional'];
        }

        return (skillsArray && skillsArray.length > 0)
            ? skillsArray.map(s => String(s).replace(/[\[\]"]/g, '').trim()).slice(0, 3)
            : ['Expert'];
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -12 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            onClick={onClick}
            className="group relative p-[1px] rounded-[2.5rem] transition-all duration-700 cursor-pointer h-full"
        >
            {/* Always Visible Category Shimmer Border */}
            <div className={`absolute -inset-[1px] bg-gradient-to-r ${cardColor} rounded-[2.5rem] blur-sm opacity-25 group-hover:opacity-100 transition-opacity duration-500`}></div>

            <div className="bg-white rounded-[2.4rem] overflow-hidden h-full flex flex-col relative z-10 transition-all border border-slate-100 shadow-xl shadow-slate-200/50">
                {/* Profile Image Area - Ultra Slim Bubble */}
                <div className="relative h-28 overflow-hidden bg-slate-100">
                    <img
                        src={getFullImagePath(worker.profileImage) || `https://ui-avatars.com/api/?name=${worker.name}&size=400&background=random`}
                        alt={worker.name}
                        className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 group-hover:rotate-1"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(worker.name)}&background=random&color=fff`;
                        }}
                    />

                    {/* Dark Overlay Gradient */}
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent"></div>

                    {/* Mini Verified Badge */}
                    {worker.isVerified && (
                        <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/95 backdrop-blur-md border border-white text-[7px] font-black uppercase tracking-widest text-slate-800 shadow-xl z-20">
                            <Shield size={7} className="text-blue-600 fill-blue-600/20" />
                        </div>
                    )}

                    {/* Mini Rating */}
                    <div className="absolute top-2 right-2 bg-white/95 backdrop-blur-xl px-1.5 py-1 rounded-lg shadow-xl flex items-center gap-1 border border-white z-20">
                        <Star className="w-2 h-2 text-yellow-500 fill-yellow-500" />
                        <span className="text-[8px] font-black text-slate-800">{worker.rating || '4.8'}</span>
                    </div>
                </div>

                {/* Worker Body Content - Minimalist Spacing */}
                <div className="p-3 flex flex-col gap-2">
                    <div className="leading-none">
                        <h3 className="text-sm font-black text-slate-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-black group-hover:to-slate-600 transition-all truncate tracking-tight">
                            {worker.name}
                        </h3>
                        {/* Combined Location & Specialty on one line with minimal gap */}
                        <div className="flex items-center gap-2 mt-1 opacity-70">
                            <div className="flex items-center gap-1">
                                <MapPin size={8} className="text-blue-500" />
                                <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">{worker.city || 'Anywhere'}</span>
                            </div>
                            <div className="w-[1px] h-1.5 bg-slate-200"></div>
                            <span className={`text-[7px] font-black uppercase tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r ${cardColor}`}>
                                {worker.category || 'Expert'}
                            </span>
                        </div>
                    </div>

                    {/* Action Button - Fully Integrated */}
                    <div className="mt-1">
                        <button className={`w-full py-2 rounded-xl bg-gradient-to-r ${cardColor} text-white font-black text-[8px] uppercase tracking-[0.2em] shadow-lg hover:shadow-2xl transition-all flex items-center justify-center gap-1.5 active:scale-95 group/btn`}>
                            View Services
                            <ArrowRight size={10} className="group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const BrowseWorkers = () => {
    const [workers, setWorkers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedType, setSelectedType] = useState('All');
    const navigate = useNavigate();
    const location = useLocation();

    const categories = ['All', 'Driver', 'Plumber', 'Electrician', 'House Help', 'Tutor', 'Fitness', 'Elder Care', 'IT Support', 'Cleaning', 'Beauty', 'Painting', 'Carpentry', 'Repair', 'Creative', 'Appliance Repair'];
    const workTypes = ['All', 'Residential', 'Commercial'];

    const colors = [
        { primary: 'from-blue-600 to-indigo-600' },
        { primary: 'from-rose-500 to-pink-500' },
        { primary: 'from-emerald-500 to-teal-500' },
        { primary: 'from-amber-500 to-orange-500' }
    ];

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const categoryQuery = queryParams.get('category');
        if (categoryQuery && categories.includes(categoryQuery)) {
            setSelectedCategory(categoryQuery);
        } else if (!categoryQuery) {
            setSelectedCategory('All');
        }
        fetchApprovedWorkers();
    }, [location.search]);

    const fetchApprovedWorkers = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/users/workers');
            const data = await response.json();
            setWorkers(data);
        } catch (error) {
            console.error('Failed to fetch workers:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredWorkers = workers.filter(worker => {
        const term = searchTerm.toLowerCase();
        const matchesSearch = worker.name.toLowerCase().includes(term) ||
            (worker.category && worker.category.toLowerCase().includes(term)) ||
            (worker.city && worker.city.toLowerCase().includes(term)) ||
            worker.skills?.some(skill => String(skill).toLowerCase().includes(term));

        const cat = selectedCategory.toLowerCase();
        const matchesCategory = selectedCategory === 'All' ||
            (worker.category && worker.category.toLowerCase().includes(cat)) ||
            worker.skills?.some(skill => String(skill).toLowerCase().includes(cat));

        const type = selectedType.toLowerCase();
        const matchesType = selectedType === 'All' ||
            (worker.category && worker.category.toLowerCase().includes(type)) ||
            (worker.skills && worker.skills.some(skill => String(skill).toLowerCase().includes(type))) ||
            (worker.description && worker.description.toLowerCase().includes(type));

        return matchesSearch && matchesCategory && matchesType;
    });

    return (
        <div className="min-h-screen bg-[#FAFBFF] text-slate-900 selection:bg-blue-600/10">
            {/* Soft Ambient Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[5%] left-[5%] w-[40%] h-[40%] bg-blue-100/40 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[10%] right-[0%] w-[35%] h-[35%] bg-rose-100/30 blur-[120px] rounded-full"></div>
                <div className="absolute top-[40%] left-[50%] w-[25%] h-[25%] bg-amber-50/50 blur-[120px] rounded-full"></div>
            </div>

            {/* Premium Header - Vibrant & Bright */}
            <div className="relative pt-32 pb-24 z-10 overflow-hidden border-b border-slate-100 bg-white/40 backdrop-blur-3xl">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="max-w-7xl mx-auto text-center"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100 mb-8"
                        >
                            <Sparkles size={14} className="fill-blue-600" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">India's Verified Talent</span>
                        </motion.div>

                        <h1 className="text-4xl md:text-7xl font-black mb-8 leading-tight tracking-tighter text-slate-950 uppercase">
                            BROWSE OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-rose-500 to-amber-500">PRO NETWORK</span>
                        </h1>

                        <p className="text-slate-500 text-lg md:text-xl font-bold mb-12 max-w-3xl mx-auto leading-relaxed italic">
                            Handpicked, background-verified professionals ready to transform your home and business life. High-quality service guaranteed.
                        </p>                        {/* Compact Centered Search Section */}
                        <div className="max-w-2xl mx-auto mt-12">
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-rose-500 to-amber-500 rounded-[1.8rem] blur opacity-15 group-focus-within:opacity-25 transition-opacity"></div>
                                <div className="relative flex items-center bg-white border border-slate-100 rounded-[1.8rem] shadow-xl shadow-blue-500/5 overflow-hidden">
                                    <Search className="ml-6 text-slate-300" size={20} />
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        placeholder="Search name, skill, category or city..."
                                        className="w-full bg-transparent px-5 py-5 text-slate-900 font-bold focus:outline-none placeholder:text-slate-300 text-base"
                                    />
                                    <button className="mr-2 px-8 py-3.5 bg-slate-950 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-slate-800 transition-all shadow-lg active:scale-95">
                                        SEARCH
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Integrated Specialty Tags Under Search */}
                        <div className="mt-12 max-w-5xl mx-auto">
                            <div className="flex items-center justify-center gap-3 mb-6">
                                <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-slate-200"></div>
                                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2">
                                    <Filter size={10} className="text-blue-500" />
                                    Explore Specialties
                                </h3>
                                <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-slate-200"></div>
                            </div>

                            <div className="flex flex-wrap justify-center gap-3">
                                {categories.map((category, idx) => {
                                    const categoryGradients = [
                                        'from-blue-600 to-cyan-500',
                                        'from-rose-500 to-pink-500',
                                        'from-emerald-500 to-teal-500',
                                        'from-amber-400 to-orange-500',
                                        'from-indigo-600 to-purple-500',
                                        'from-violet-500 to-fuchsia-500'
                                    ];
                                    const gradient = category === 'All' ? 'from-slate-950 to-slate-800' : categoryGradients[idx % categoryGradients.length];

                                    return (
                                        <button
                                            key={category}
                                            onClick={() => setSelectedCategory(category)}
                                            className="relative group transition-all transform active:scale-95"
                                        >
                                            {/* Shimmering Dynamic Border */}
                                            <div className={`absolute -inset-[1px] bg-gradient-to-r ${gradient} rounded-xl blur-[2px] ${selectedCategory === category ? 'opacity-100' : 'opacity-20 group-hover:opacity-100'
                                                } transition-opacity duration-300`}></div>

                                            <div className={`relative px-8 py-3.5 rounded-[12px] font-black text-[11px] uppercase tracking-widest transition-all ${selectedCategory === category
                                                    ? 'bg-slate-950 text-white shadow-2xl shadow-blue-500/10'
                                                    : 'bg-white text-slate-800 group-hover:text-black border border-transparent'
                                                }`}>
                                                {category}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-20 relative z-10 max-w-7xl">



                {/* Results Grid with Animation */}
                <AnimatePresence mode="popLayout">
                    {loading ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center py-40"
                        >
                            <Loader2 className="w-16 h-16 text-blue-600 animate-spin mb-6" />
                            <p className="text-slate-400 font-black uppercase tracking-widest text-[10px] animate-pulse">Accessing our expert talent cloud...</p>
                        </motion.div>
                    ) : filteredWorkers.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-40 bg-white rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/50"
                        >
                            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 border border-slate-100">
                                <Zap className="text-slate-200" size={40} />
                            </div>
                            <h3 className="text-3xl font-black text-slate-900 mb-4 uppercase tracking-tighter">No Experts Found</h3>
                            <p className="text-slate-400 text-lg font-bold max-w-md mx-auto italic leading-relaxed">We couldn't find any professionals matching your specific filters. Try adjusting your search.</p>
                            <button
                                onClick={() => { setSearchTerm(''); setSelectedCategory('All'); setSelectedType('All'); }}
                                className="mt-10 px-10 py-4 bg-slate-950 text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-slate-800 transition-all shadow-xl active:scale-95"
                            >
                                Reset All Filters
                            </button>
                        </motion.div>
                    ) : (
                        <motion.div
                            layout
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10"
                        >
                            {filteredWorkers.map((worker, index) => (
                                <WorkerCard
                                    key={worker._id}
                                    worker={worker}
                                    index={index}
                                    color={colors[index % colors.length]}
                                    onClick={() => navigate(`/workers/${worker._id}`)}
                                />
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default BrowseWorkers;
