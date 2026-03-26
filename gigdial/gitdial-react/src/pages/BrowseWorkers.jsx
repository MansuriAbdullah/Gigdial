import React, { useState, useEffect } from 'react';
import { Search, MapPin, Star, Filter, ArrowRight, Zap, Shield, Loader2, Sparkles, X, Phone, Send, RefreshCw } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getFullImagePath } from '../utils/imagePath';
import toast from 'react-hot-toast';

const WorkerCard = ({ worker, index, color, onClick }) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            onClick={onClick}
            className={`group relative p-[2px] rounded-xl bg-gradient-to-br ${color.primary} shadow-xl shadow-slate-200 transition-all duration-300 cursor-pointer h-full`}
        >
            {/* Inner Content Wrapper */}
            <div className="bg-white rounded-lg overflow-hidden h-full flex flex-col">
                {/* Profile Image & Background */}
                <div className="relative h-56 overflow-hidden bg-slate-900">
                    <img
                        src={worker.profileImage ? getFullImagePath(worker.profileImage) :
                            `https://images.unsplash.com/photo-${['1540513032858-583516954829', '1507003211169-0a1dd7228f2d', '1560250097-0b93528c311a', '1573497019940-1c28c88b4f3e', '1580489944761-15a19d654956', '1633332755192-727a05c4013d', '1494790108377-be9c29b29330', '1500648767791-00dcc994a43e'][index % 8]}?q=80&w=400&h=500&auto=format&fit=crop`}
                        alt={worker.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(worker.name)}&background=random&color=fff&size=512`;
                        }}
                    />

                    {/* Vibrant Overlays */}
                    <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                    {/* Top Badge Row */}
                    <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20">
                        <div className="bg-black/40 backdrop-blur-xl px-2.5 py-1 rounded-2xl border border-white/20 flex items-center gap-1.5 shadow-2xl">
                            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                            <span className="text-[9px] font-black uppercase text-white tracking-widest leading-none">{worker.rating || 4.8}</span>
                        </div>

                        {worker.isVerified !== false && (
                            <div className="bg-white/95 backdrop-blur-3xl px-2.5 py-1 rounded-2xl border border-white flex items-center gap-1.5 shadow-2xl shadow-blue-500/10">
                                <Shield className="w-3 h-3 text-blue-600" />
                                <span className="text-[9px] font-black uppercase text-slate-900 tracking-widest leading-none">Pro</span>
                            </div>
                        )}
                    </div>

                    {/* Content Overlay - Name & City on Image */}
                    <div className="absolute bottom-4 left-4 right-4 z-20">
                        <h3 className="text-xl font-black text-white mb-1 tracking-tight uppercase leading-none truncate">
                            {worker.name}
                        </h3>
                        <div className="flex items-center gap-1.5 opacity-90">
                            <MapPin className="w-2.5 h-2.5 text-blue-400" />
                            <span className="text-[9px] font-black text-slate-50 uppercase tracking-[0.2em] truncate">{worker.city || 'Anywhere'}</span>
                        </div>
                    </div>

                    {/* Experience Badge - Glassmorphic */}
                    <div className="absolute bottom-4 right-4 z-20">
                        <div className="bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/20 flex flex-col items-center">
                            <span className="text-[6px] font-black text-white/60 uppercase tracking-widest leading-none mb-0.5">Experience</span>
                            <span className="text-[9px] font-black text-white leading-none">{worker.experience || 2}+ Yrs</span>
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="p-4 relative flex-1 flex flex-col items-start bg-white gap-3">
                    {/* Short Bio */}
                    <div className="w-full">
                        <p className="text-[10px] font-bold text-slate-800 leading-relaxed italic line-clamp-2">
                             "{worker.bio || `Expert professional in ${worker.category || 'Service'} providing high-quality solutions.`}"
                        </p>
                    </div>

                    {/* Colorful Skills */}
                    <div className="flex flex-wrap gap-1.5 w-full">
                        {(() => {
                            let skillsArray = [];
                            try {
                                if (Array.isArray(worker.skills)) {
                                    skillsArray = worker.skills;
                                } else if (typeof worker.skills === 'string') {
                                    let clean = worker.skills.trim();
                                    if (clean.startsWith('[') && clean.endsWith(']')) {
                                        try {
                                            skillsArray = JSON.parse(clean);
                                        } catch (e) {
                                            clean = clean.slice(1, -1);
                                            skillsArray = clean.split(',').map(s => s.trim().replace(/^["']|["']$/g, ''));
                                        }
                                    } else {
                                        skillsArray = clean.split(',').map(s => s.trim());
                                    }
                                }
                            } catch (e) {
                                skillsArray = [worker.category || 'Professional'];
                            }
                            
                            return (skillsArray?.length > 0 ? skillsArray : [worker.category || 'Expert']).slice(0, 2).map((skill, idx) => {
                                const cleanSkill = typeof skill === 'string'
                                    ? skill.replace(/[\[\]"]/g, '').trim()
                                    : String(skill);

                                return (
                                    <div key={idx} className={`px-2.5 py-1 ${color.light} rounded-lg flex items-center gap-1.5 border border-white shadow-sm`}>
                                        <div className={`w-1 h-1 rounded-full bg-gradient-to-br ${color.primary}`}></div>
                                        <span className={`text-[7.5px] font-black uppercase tracking-wider ${color.text}`}>
                                            {cleanSkill}
                                        </span>
                                    </div>
                                );
                            });
                        })()}
                    </div>

                    {/* Action Footer */}
                    <div className="w-full mt-auto">
                        <button className={`w-full py-2.5 bg-gradient-to-r ${color.primary} text-white font-black text-[9px] uppercase tracking-[0.2em] rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 hover:brightness-110 active:scale-95`}>
                            View Services
                            <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
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

    // Modal State for Visitors
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [selectedWorker, setSelectedWorker] = useState(null);
    const [sending, setSending] = useState(false);

    const categories = ['All', 'Driver', 'Plumber', 'Electrician', 'House Help', 'Tutor', 'Fitness', 'Elder Care', 'IT Support', 'Cleaning', 'Beauty', 'Painting', 'Carpentry', 'Repair', 'Creative', 'Appliance Repair'];
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

    const handleWorkerClick = (worker) => {
        const userInfo = localStorage.getItem('userInfo');
        const storedPhone = localStorage.getItem('visitorPhone');

        // Capture lead for visitors
        if (!userInfo) {
            if (!storedPhone) {
                setSelectedWorker(worker);
                setIsModalOpen(true);
                return;
            } else {
                // Return phone in state but record lead silently
                try {
                    fetch('/api/leads/anonymous-record', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ workerId: worker._id, phoneNumber: storedPhone })
                    });
                } catch (e) {
                    console.error("Lead recording failed", e);
                }
            }
        }

        navigate(`/workers/${worker._id}`, { state: { prefilledPhoneNumber: storedPhone } });
    };

    const handlePhoneSubmit = async (e) => {
        e.preventDefault();
        const cleanPhone = phoneNumber.replace(/\D/g, '');
        if (cleanPhone.length !== 10) {
            toast.error("Please enter a valid 10-digit number");
            return;
        }

        setSending(true);
        try {
            localStorage.setItem('visitorPhone', cleanPhone);
            await fetch('/api/leads/anonymous-record', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ workerId: selectedWorker._id, phoneNumber: cleanPhone })
            });

            setIsModalOpen(false);
            setSending(false);
            navigate(`/workers/${selectedWorker._id}`, { state: { prefilledPhoneNumber: cleanPhone } });
        } catch (err) {
            console.error(err);
            setSending(false);
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
            (worker.skills && worker.skills.some(skill => String(skill).toLowerCase().includes(type)));

        return matchesSearch && matchesCategory && matchesType;
    });

    return (
        <div className="min-h-screen bg-[#FAFBFF] text-slate-900 selection:bg-blue-600/10">
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[5%] left-[5%] w-[40%] h-[40%] bg-blue-100/40 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[10%] right-[0%] w-[35%] h-[35%] bg-rose-100/30 blur-[120px] rounded-full"></div>
            </div>

            <div className="relative pt-32 pb-24 z-10 overflow-hidden border-b border-slate-100 bg-white/40 backdrop-blur-3xl">
                <div className="container mx-auto px-6">
                    <div className="max-w-7xl mx-auto text-center">
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
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 max-w-5xl mx-auto">
                            <div className="flex flex-wrap justify-center gap-3">
                                {categories.map((category, idx) => {
                                    const categoryGradients = [
                                        'from-blue-600 to-cyan-500', 'from-rose-500 to-pink-500', 'from-emerald-500 to-teal-500',
                                        'from-amber-400 to-orange-500', 'from-indigo-600 to-purple-500', 'from-violet-500 to-fuchsia-500'
                                    ];
                                    const gradient = category === 'All' ? 'from-slate-950 to-slate-800' : categoryGradients[idx % categoryGradients.length];

                                    return (
                                        <button
                                            key={category}
                                            onClick={() => setSelectedCategory(category)}
                                            className="relative group transition-all"
                                        >
                                            <div className={`absolute -inset-[1px] bg-gradient-to-r ${gradient} rounded-xl blur-[2px] ${selectedCategory === category ? 'opacity-100' : 'opacity-20 group-hover:opacity-100'} transition-opacity`}></div>
                                            <div className={`relative px-8 py-3 rounded-[12px] font-black text-[11px] uppercase tracking-widest transition-all ${selectedCategory === category ? 'bg-slate-950 text-white' : 'bg-white text-slate-800'}`}>
                                                {category}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-20 relative z-10 max-w-7xl">
                <AnimatePresence mode="popLayout">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-40">
                            <Loader2 className="w-16 h-16 text-blue-600 animate-spin mb-6" />
                            <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">Accessing our expert talent cloud...</p>
                        </div>
                    ) : filteredWorkers.length === 0 ? (
                        <div className="text-center py-40 bg-white rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/50">
                            <h3 className="text-3xl font-black text-slate-900 mb-4 uppercase">No Experts Found</h3>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                            {filteredWorkers.map((worker, index) => (
                                <WorkerCard
                                    key={worker._id}
                                    worker={worker}
                                    index={index}
                                    color={colors[index % colors.length]}
                                    onClick={() => handleWorkerClick(worker)}
                                />
                            ))}
                        </div>
                    )}
                </AnimatePresence>
            </div>

            {/* Premium Light-Theme Contact Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-white/40 backdrop-blur-xl">
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
                                    onClick={() => setIsModalOpen(false)}
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
                                    <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none mb-4 uppercase">Connect with Pro</h3>
                                    <p className="text-slate-500 font-medium text-base px-2">Provide your 10-digit number to unlock the professional's profile and services.</p>
                                </div>

                                <form onSubmit={handlePhoneSubmit} className="space-y-8 relative z-10">
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
                                                <RefreshCw className="animate-spin" size={18} /> CONNECTING...
                                            </span>
                                        ) : (
                                            <>
                                                <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> VIEW PROFILE NOW
                                            </>
                                        )}
                                    </button>
                                    <div className="flex items-center justify-center gap-6 mt-8 opacity-40 grayscale group-hover:grayscale-0 transition-all">
                                        <div className="h-[1px] flex-1 bg-slate-200"></div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Secure • Verified • Reliable</p>
                                        <div className="h-[1px] flex-1 bg-slate-200"></div>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default BrowseWorkers;
