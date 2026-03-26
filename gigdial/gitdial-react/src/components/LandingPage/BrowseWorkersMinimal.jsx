import React, { useState, useEffect } from 'react';
import { Search, MapPin, Star, Briefcase, Filter, ArrowRight, Zap, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getFullImagePath } from '../../utils/imagePath';

const WorkerCard = ({ worker, navigate, index }) => {
    const colors = [
        { primary: 'from-blue-600 to-indigo-600', shadow: 'shadow-blue-500/30', light: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-100' },
        { primary: 'from-lime-600 to-emerald-600', shadow: 'shadow-lime-500/30', light: 'bg-lime-50', text: 'text-green-700', border: 'border-lime-100' },
        { primary: 'from-rose-600 to-pink-600', shadow: 'shadow-rose-500/30', light: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-100' },
        { primary: 'from-amber-600 to-orange-600', shadow: 'shadow-amber-500/30', light: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-100' },
        { primary: 'from-purple-600 to-violet-600', shadow: 'shadow-purple-500/30', light: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-100' },
        { primary: 'from-cyan-600 to-blue-600', shadow: 'shadow-cyan-500/30', light: 'bg-cyan-50', text: 'text-cyan-700', border: 'border-cyan-100' }
    ];
    const color = colors[index % colors.length];

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            whileHover={{ y: -15, scale: 1.02 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => navigate(`/workers/${worker._id}`)}
            className={`group relative p-[2px] rounded-[3rem] bg-gradient-to-br ${color.primary} shadow-2xl ${color.shadow} hover:shadow-3xl transition-all duration-500 cursor-pointer`}
        >
            {/* Inner Content Wrapper */}
            <div className="bg-white rounded-[2.95rem] overflow-hidden h-full flex flex-col">
                {/* Profile Image & Background */}
                <div className="relative h-64 overflow-hidden bg-slate-900">
                    {worker.profileImage ? (
                        <img
                            src={getFullImagePath(worker.profileImage)}
                            alt={worker.name}
                            className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-2 transition-transform duration-700"
                            referrerPolicy="no-referrer"
                        />
                    ) : (
                        <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${color.primary} text-white text-7xl font-black`}>
                            {worker.name.charAt(0)}
                        </div>
                    )}
                    
                    {/* Vibrant Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent opacity-80"></div>
                    
                    {/* Top Badge Row */}
                    <div className="absolute top-5 left-5 right-5 flex justify-between items-center z-20">
                        <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 flex items-center gap-1.5">
                            <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                            <span className="text-[10px] font-black uppercase text-white tracking-widest">{worker.rating || 4.5}</span>
                        </div>

                        {worker.isVerified && (
                            <div className="bg-white/95 backdrop-blur-xl px-3 py-1.5 rounded-full border border-white flex items-center gap-1.5 shadow-xl shadow-yellow-500/20">
                                <Award className="w-4 h-4 text-amber-500 fill-amber-500" />
                                <span className="text-[10px] font-black uppercase text-slate-800 tracking-widest">Verified</span>
                            </div>
                        )}
                    </div>

                    {/* Floating Category Badge */}
                    <div className={`absolute bottom-6 right-6 z-20 px-4 py-1.5 rounded-full bg-gradient-to-r ${color.primary} text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-xl`}>
                        {worker.category || 'Expert'}
                    </div>
                </div>

                {/* Content Area */}
                <div className="p-8 relative flex-1 flex flex-col">
                    {/* Decorative flare */}
                    <div className={`absolute -top-12 right-12 w-24 h-24 bg-gradient-to-br ${color.primary} rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity`}></div>

                    <div className="mb-6">
                        <h3 className="text-2xl font-black text-black mb-2 group-hover:text-transparent bg-clip-text bg-gradient-to-r transition-all duration-300" style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }}>
                            <span className={`group-hover:bg-gradient-to-r ${color.primary} bg-clip-text group-hover:text-transparent`}>
                                {worker.name}
                            </span>
                        </h3>
                        <div className="flex items-center gap-2">
                            <div className={`p-1.5 ${color.light} rounded-lg`}>
                                <MapPin className={`w-3.5 h-3.5 ${color.text}`} />
                            </div>
                            <span className="text-xs font-black text-slate-700 uppercase tracking-[0.15em]">{worker.city || 'Ahmedabad'}</span>
                        </div>
                    </div>

                    {/* Skills Grid */}
                    <div className="flex flex-wrap gap-2 mb-8">
                        {(() => {
                            let skillsArray = [];
                            try {
                                if (Array.isArray(worker.skills)) {
                                    skillsArray = worker.skills;
                                } else if (typeof worker.skills === 'string') {
                                    let clean = worker.skills.trim();
                                    // Remove leading/trailing brackets if they exist but JSON parsing fails
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
                                skillsArray = ['Professional'];
                            }
                            
                            if (!skillsArray || skillsArray.length === 0 || !Array.isArray(skillsArray)) {
                                skillsArray = ['Expert'];
                            }

                            return skillsArray.slice(0, 3).map((skill, idx) => {
                                // Double check if skill itself is a string and clean it
                                const cleanSkill = typeof skill === 'string' 
                                    ? skill.replace(/[\[\]"]/g, '').trim() 
                                    : String(skill);
                                
                                return (
                                    <div key={idx} className={`px-4 py-2 ${color.light} rounded-2xl flex items-center gap-2 transition-all group-hover:scale-105 duration-300 border border-transparent hover:border-slate-100 shadow-sm shadow-slate-200/50`}>
                                        <div className={`w-1 h-1 rounded-full bg-gradient-to-br ${color.primary}`}></div>
                                        <span className={`text-[10px] font-black uppercase tracking-widest ${color.text}`}>
                                            {cleanSkill}
                                        </span>
                                    </div>
                                );
                            });
                        })()}
                    </div>

                    {/* Action Footer - Price Removed */}
                    <div className="pt-4 border-t border-slate-100 mt-auto">
                        <motion.button
                            whileHover={{ scale: 1.05, x: 5 }}
                            whileTap={{ scale: 0.95 }}
                            className={`w-full py-4 bg-gradient-to-r ${color.primary} text-white font-black text-[11px] uppercase tracking-[0.2em] rounded-2xl shadow-2xl ${color.shadow} hover:shadow-3xl transition-all flex items-center justify-center gap-3 drop-shadow-xl`}
                        >
                            View Services
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const BrowseWorkersMinimal = () => {
    const [workers, setWorkers] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchWorkers = async () => {
            try {
                const response = await fetch('/api/users/workers');
                const data = await response.json();
                // Show only top 8 or shuffle? Let's show top 8 for Landing Page
                setWorkers(data.slice(0, 8));
            } catch (error) {
                console.error('Failed to fetch workers:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchWorkers();
    }, []);

    if (loading) return null;

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-1/4 -right-20 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px] animate-pulse"></div>
            <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-lime-500/5 rounded-full blur-[100px] animate-pulse"></div>

            <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6"
                    >
                        <Zap className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-black uppercase text-blue-700 tracking-widest">Verified Professionals</span>
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
                        Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-lime-600">Top Rated</span> Talent
                    </h2>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
                        Browse our exclusive network of background-checked gig workers ready to help you with any task, anywhere.
                    </p>
                </div>

                {/* Workers Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {workers.map((worker, index) => (
                        <WorkerCard key={worker._id} worker={worker} navigate={navigate} index={index} />
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-16 text-center">
                    <button 
                        onClick={() => navigate('/workers')}
                        className="inline-flex items-center gap-3 px-8 py-4 bg-white border-2 border-slate-100 rounded-3xl font-black text-sm uppercase tracking-widest text-slate-800 hover:border-blue-600 hover:text-blue-600 shadow-xl shadow-slate-200/50 transition-all group"
                    >
                        View More Professionals 
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default BrowseWorkersMinimal;
