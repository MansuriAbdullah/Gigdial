import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, Clock, ArrowRight, Tag, Search, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../../components/Shared/SEO';

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('All');

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const { data } = await axios.get('/api/blogs');
            setBlogs(data);
        } catch (error) {
            console.error('Failed to fetch blogs:', error);
        } finally {
            setLoading(false);
        }
    };

    const colorMap = {
        blue: "text-blue-600 bg-blue-50 border-blue-100",
        rose: "text-rose-600 bg-rose-50 border-rose-100",
        emerald: "text-emerald-600 bg-emerald-50 border-emerald-100",
        indigo: "text-indigo-600 bg-indigo-50 border-indigo-100",
        amber: "text-amber-600 bg-amber-50 border-amber-100",
        "Guide": "text-blue-600 bg-blue-50 border-blue-100",
        "Update": "text-rose-600 bg-rose-50 border-rose-100",
        "News": "text-amber-600 bg-amber-50 border-amber-100",
        "Tips": "text-emerald-600 bg-emerald-50 border-emerald-100"
    };

    const getPostColor = (cat) => colorMap[cat] || colorMap.blue;

    const filteredBlogs = blogs.filter(b => {
        const matchesSearch = b.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             (b.excerpt && b.excerpt.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesCategory = category === 'All' || b.category === category;
        return matchesSearch && matchesCategory;
    });

    const categories = ['All', 'Guide', 'Update', 'News', 'Tips'];

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full"></div>
        </div>
    );

    return (
        <div className="bg-slate-50 min-h-screen pt-32 pb-24">
            <SEO title="Blog" description="Stay updated with the latest trends and guides from the GigDial community." />
            
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                {/* Header */}
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-blue-600 text-white shadow-2xl shadow-blue-500/20 mb-8"
                    >
                        <Sparkles className="w-4 h-4 text-blue-200 fill-blue-200" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Insights & Stories</span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tight leading-[1.1]"
                    >
                        Learn Something <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-rose-500 to-amber-500">New Every Day</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-slate-500 max-w-2xl mx-auto font-bold"
                    >
                        Discover expert tips, industry news, and community stories that help you grow and live better.
                    </motion.p>
                </div>

                {/* Featured Post (First one if exists) */}
                {filteredBlogs.length > 0 && category === 'All' && searchTerm === '' && (
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="relative rounded-[3.5rem] bg-white overflow-hidden shadow-2xl shadow-slate-200/50 mb-20 border-2 border-white group"
                    >
                        <div className="flex flex-col lg:flex-row min-h-[500px]">
                            <div className="lg:w-3/5 relative overflow-hidden bg-slate-100">
                                {filteredBlogs[0].thumbnail ? (
                                    <img src={filteredBlogs[0].thumbnail} alt={filteredBlogs[0].title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-300 italic font-black">Image Coming Soon</div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/40 to-transparent"></div>
                            </div>
                            <div className="lg:w-2/5 p-12 flex flex-col justify-center bg-white relative z-10">
                                <div className={`inline-flex items-center self-start px-4 py-1.5 rounded-xl border-2 mb-8 ${getPostColor(filteredBlogs[0].category)} text-xs font-black uppercase tracking-widest`}>
                                    {filteredBlogs[0].category}
                                </div>
                                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 group-hover:text-blue-600 transition-colors leading-tight">
                                    {filteredBlogs[0].title}
                                </h2>
                                <p className="text-slate-500 font-bold text-lg mb-8 leading-relaxed line-clamp-3">
                                    {filteredBlogs[0].excerpt}
                                </p>
                                <div className="flex items-center gap-6 text-sm text-slate-400 mb-10 font-black tracking-widest uppercase">
                                    <div className="flex items-center gap-2">
                                        <Calendar size={16} />
                                        <span>{new Date(filteredBlogs[0].createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <User size={16} />
                                        <span>{filteredBlogs[0].author?.name}</span>
                                    </div>
                                </div>
                                <Link to={`/blog/${filteredBlogs[0].slug}`} className="flex items-center justify-center gap-3 w-full py-5 bg-slate-900 text-white rounded-[1.5rem] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-slate-900/10">
                                    Read Full Story
                                    <ArrowRight size={18} />
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Search & Filter */}
                <div className="mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="relative w-full md:w-96 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Find topics..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-6 py-4 rounded-2xl border-2 border-white bg-white shadow-xl shadow-slate-200/50 focus:border-blue-500 focus:ring-0 outline-none font-bold text-slate-800 transition-all placeholder:text-slate-300"
                        />
                    </div>
                    <div className="flex items-center gap-4 overflow-x-auto pb-4 w-full md:w-auto scrollbar-hide">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setCategory(cat)}
                                className={`flex-shrink-0 px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${category === cat ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/20' : 'bg-white text-slate-500 border border-slate-100 hover:bg-slate-50'}`}
                            >
                                {cat === 'All' ? 'All Stories' : cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {(category === 'All' && searchTerm === '' ? filteredBlogs.slice(1) : filteredBlogs).map((post, idx) => (
                        <motion.article
                            key={post._id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover={{ y: -10 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white rounded-[3rem] overflow-hidden shadow-2xl shadow-slate-200/50 border-2 border-white group"
                        >
                            <Link to={`/blog/${post.slug}`}>
                                <div className="relative h-60 overflow-hidden bg-slate-100">
                                    {post.thumbnail ? (
                                        <img src={post.thumbnail} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-300 font-black italic">Image Coming Soon</div>
                                    )}
                                    <div className={`absolute top-4 left-4 inline-flex items-center px-4 py-1 rounded-xl border-2 ${getPostColor(post.category)} text-[10px] font-black uppercase tracking-widest backdrop-blur-md`}>
                                        {post.category}
                                    </div>
                                </div>
                                <div className="p-8">
                                    <div className="flex items-center gap-4 text-xs font-bold text-slate-400 mb-4 tracking-widest uppercase">
                                        <Calendar size={14} />
                                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                                        {post.title}
                                    </h3>
                                    <p className="text-slate-500 font-bold mb-8 line-clamp-3 leading-relaxed">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                                        <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                            <User size={12} />
                                            <span>{post.author?.name}</span>
                                        </div>
                                        <div className="p-3 rounded-2xl bg-slate-50 text-slate-900 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                            <ArrowRight size={18} />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.article>
                    ))}
                    
                    {filteredBlogs.length === 0 && (
                        <div className="col-span-full py-24 text-center">
                            <h3 className="text-2xl font-black text-slate-300 uppercase tracking-widest">No stories found</h3>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BlogList;
