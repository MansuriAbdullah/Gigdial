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
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => navigate(`/workers/${worker._id}`)}
            className={`group relative p-[2px] rounded-xl bg-gradient-to-br ${color.primary} shadow-xl ${color.shadow} transition-all duration-300 cursor-pointer`}
        >
            {/* Inner Content Wrapper */}
            <div className="bg-white rounded-lg overflow-hidden h-full flex flex-col">
                {/* Profile Image & Background */}
                <div className="relative h-56 overflow-hidden bg-slate-900">
                    <img
                        src={worker.profileImage ? getFullImagePath(worker.profileImage) :
                            `https://images.unsplash.com/photo-${['1540513032858-583516954829', '1507003211169-0a1dd7228f2d', '1560250097-0b93528c311a', '1573497019940-1c28c88b4f3e', '1580489944761-15a19d654956', '1633332755192-727a05c4013d', '1494790108377-be9c29b29330', '1500648767791-00dcc994a43e'][index % 8]}?q=80&w=400&h=500&auto=format&fit=crop`}
                        alt={worker.name}
                        className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-1 transition-transform duration-1000"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(worker.name)}&background=random&color=fff&size=512`;
                        }}
                    />

                    {/* Vibrant Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                    {/* Top Badge Row */}
                    <div className="absolute top-5 left-5 right-5 flex justify-between items-center z-20">
                        <div className="bg-black/40 backdrop-blur-xl px-3 py-1 rounded-2xl border border-white/20 flex items-center gap-1.5 shadow-2xl">
                            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                            <span className="text-[10px] font-black uppercase text-white tracking-widest leading-none">{worker.rating || 4.5}</span>
                        </div>

                        {worker.isVerified !== false && (
                            <div className="bg-white/95 backdrop-blur-3xl px-3 py-1 rounded-2xl border border-white flex items-center gap-1.5 shadow-2xl shadow-blue-500/10">
                                <Award className="w-3.5 h-3.5 text-blue-600" />
                                <span className="text-[10px] font-black uppercase text-slate-900 tracking-widest leading-none">Pro</span>
                            </div>
                        )}
                    </div>

                    {/* Content Overlay - Name & City on Image */}
                    <div className="absolute bottom-5 left-5 right-5 z-20">
                        <h3 className="text-xl font-black text-white mb-1 tracking-tight uppercase leading-none truncate">
                            {worker.name}
                        </h3>
                        <div className="flex items-center gap-1.5 opacity-90">
                            <MapPin className="w-2.5 h-2.5 text-blue-400" />
                            <span className="text-[9px] font-black text-slate-50 uppercase tracking-[0.2em]">{worker.city || 'Ahmedabad'}</span>
                        </div>
                    </div>

                    {/* Experience Badge - Moved into Image */}
                    <div className="absolute bottom-5 right-5 z-20">
                        <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 flex flex-col items-center shadow-2xl">
                            <span className="text-[7px] font-black text-white/70 uppercase tracking-widest leading-none mb-0.5">Experience</span>
                            <span className="text-[10px] font-black text-white leading-none">{worker.experience || 2}+ Yrs</span>
                        </div>
                    </div>
                </div>

                {/* Content Area - Detailed Professional Overview */}
                <div className="p-5 relative flex-1 flex flex-col items-start bg-white gap-3">

                    {/* Short Professional Bio */}
                    <div className="w-full">
                        <p className="text-[10px] font-bold text-slate-800 leading-relaxed italic line-clamp-2">
                             "{worker.bio || 'Professional in providing high-quality services with excellence and reliability.'}"
                        </p>
                    </div>

                    {/* Skills Grid - Modern Compact Chips */}
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
                                skillsArray = ['Professional'];
                            }
                            
                            if (!skillsArray || skillsArray.length === 0 || !Array.isArray(skillsArray)) {
                                skillsArray = ['Expert'];
                            }

                            return skillsArray.slice(0, 3).map((skill, idx) => {
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
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`w-full py-3 bg-gradient-to-r ${color.primary} text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-xl shadow-lg ${color.shadow} hover:brightness-110 transition-all flex items-center justify-center gap-2`}
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
                    <h2 className="text-3xl md:text-5xl lg:text-[56px] font-bold text-slate-900 tracking-tight leading-[1.05] mb-6">
                        Discover Top Rated Talent
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
