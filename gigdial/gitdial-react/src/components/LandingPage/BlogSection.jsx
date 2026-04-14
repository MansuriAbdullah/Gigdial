import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, User, Clock, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const BlogSection = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const { data } = await axios.get('/api/blogs');
                setBlogs(data.slice(0, 3)); // Only show top 3 on landing page
            } catch (error) {
                console.error('Failed to fetch blogs:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    const colors = {
        'General': "from-blue-600 to-cyan-500",
        'Tutorial': "from-rose-600 to-pink-500",
        'Tips & Tricks': "from-emerald-600 to-teal-500",
        'Updates': "from-amber-600 to-orange-500",
        'Industry': "from-indigo-600 to-violet-500"
    };

    const getColor = (cat) => colors[cat] || colors['General'];

    if (loading) return null;
    if (blogs.length === 0) return null;

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100 mb-6"
                        >
                            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Latest Insights</span>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-[1.1]"
                        >
                            Knowledge Center
                        </motion.h2>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <Link to="/blog" className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#2f5af4] to-[#6049e6] hover:from-[#2143bf] hover:to-[#4a39b3] text-white rounded-[2rem] font-black text-xs uppercase tracking-widest transition-all group shadow-lg shadow-indigo-500/30 hover:shadow-xl">
                            View All Stories
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {blogs.map((post, idx) => (
                        <motion.article
                            key={post._id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover={{ y: -10 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group cursor-pointer"
                        >
                            <Link to={`/blog/${post.slug || post._id}`}>
                                <div className="relative h-64 rounded-[2.5rem] overflow-hidden mb-6 shadow-2xl transition-all duration-500 group-hover:shadow-blue-500/20">
                                    {post.thumbnail ? (
                                        <img src={post.thumbnail} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    ) : (
                                        <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300 font-black italic uppercase text-xs">Image Coming Soon</div>
                                    )}
                                    <div className={`absolute top-4 left-4 px-4 py-1.5 rounded-xl bg-gradient-to-r ${getColor(post.category)} text-white text-[10px] font-black uppercase tracking-wider shadow-lg`}>
                                        {post.category}
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </div>

                                <div className="px-2">
                                    <div className="flex items-center gap-4 text-xs font-bold text-slate-400 mb-4 tracking-widest uppercase">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className="w-3.5 h-3.5" />
                                            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Clock className="w-3.5 h-3.5" />
                                            <span>5 min read</span>
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                                        {post.title}
                                    </h3>

                                    <p className="text-slate-500 font-bold leading-relaxed mb-6 line-clamp-2">
                                        {post.excerpt}
                                    </p>

                                    <div className="flex items-center text-blue-600 font-black text-[10px] uppercase tracking-[0.2em] group/btn">
                                        Read Full Article
                                        <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogSection;
