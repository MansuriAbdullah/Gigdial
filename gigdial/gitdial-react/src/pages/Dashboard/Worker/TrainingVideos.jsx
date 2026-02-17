import React from 'react';
import { motion } from 'framer-motion';
import { Play, Video, Clock, BookOpen, Star, ChevronRight } from 'lucide-react';

const TrainingVideos = () => {
    const courses = [
        {
            title: "Pro Communication Skills",
            duration: "15 min",
            lessons: 5,
            rating: 4.8,
            image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&auto=format&fit=crop",
            tag: "Communication"
        },
        {
            title: "Safety & Hygiene Protocol",
            duration: "25 min",
            lessons: 8,
            rating: 4.9,
            image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&auto=format&fit=crop",
            tag: "Safety"
        },
        {
            title: "Managing Customer Expectations",
            duration: "20 min",
            lessons: 6,
            rating: 4.7,
            image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop",
            tag: "Service"
        }
    ];

    return (
        <div className="space-y-8 pb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                        <Video className="text-purple-600" /> Training Hub
                    </h1>
                    <p className="text-slate-500 font-medium mt-1">Enhance your skills and earn more with GigDial Academy</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -5 }}
                        className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group"
                    >
                        <div className="relative h-48 overflow-hidden">
                            <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-slate-800 shadow-sm">
                                {course.tag}
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="w-14 h-14 bg-white/30 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/40 shadow-2xl transform scale-75 group-hover:scale-100 transition-transform">
                                    <Play fill="white" className="text-white ml-1" size={24} />
                                </button>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4 text-xs font-bold text-slate-400">
                                <span className="flex items-center gap-1"><Clock size={14} className="text-slate-400" /> {course.duration}</span>
                                <span className="flex items-center gap-1"><BookOpen size={14} className="text-slate-400" /> {course.lessons} Lessons</span>
                            </div>
                            <h3 className="text-lg font-black text-slate-800 mb-3 leading-tight group-hover:text-purple-600 transition-colors">{course.title}</h3>
                            <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-50">
                                <div className="flex items-center gap-1.5">
                                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                                    <span className="text-sm font-bold text-slate-700">{course.rating}</span>
                                </div>
                                <button className="text-purple-600 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                                    Start Learning <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Featured Section */}
            <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-purple-200">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                    <div className="flex-1 space-y-6">
                        <div className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full inline-block text-xs font-black uppercase tracking-widest border border-white/20">Featured Training</div>
                        <h2 className="text-4xl font-black leading-tight">Master the Art of <br />Service Delivery</h2>
                        <p className="text-purple-100 text-lg font-medium opacity-90">Get our comprehensive guide on becoming a top-rated service provider on GigDial.</p>
                        <button className="bg-white text-purple-600 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-wider shadow-xl hover:shadow-2xl transition-all hover:scale-105 active:scale-95">
                            Watch Full Video
                        </button>
                    </div>
                    <div className="flex-shrink-0 w-full md:w-80 h-48 bg-black/40 rounded-3xl border border-white/20 overflow-hidden relative group cursor-pointer">
                        <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&auto=format&fit=crop" className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" alt="Video Placeholder" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl">
                                <Play fill="#9333ea" className="text-purple-600 ml-1" size={24} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrainingVideos;
