import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Calendar, User, Clock, ArrowLeft, Facebook, Twitter, Linkedin, MessageSquare, Heart, Share2 } from 'lucide-react';
import SEO from '../../components/Shared/SEO';

const BlogPost = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchPost();
    }, [id]);

    const fetchPost = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`/api/blogs/${id}`);
            setPost(data);
        } catch (error) {
            console.error('Failed to fetch post:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full"></div>
        </div>
    );

    if (!post) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white">
            <h2 className="text-4xl font-black text-slate-900 mb-8">Article Not Found</h2>
            <Link to="/blog" className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-blue-600 transition-all">
                Back to Blog
            </Link>
        </div>
    );

    return (
        <div className="bg-white min-h-screen pt-32 pb-24">
            <SEO title={post.title} description={post.excerpt} />
            
            <article className="max-w-4xl mx-auto px-4 md:px-6">
                {/* Top Nav */}
                <Link to="/blog" className="inline-flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-blue-600 transition-colors mb-12 group">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Blog Center
                </Link>

                {/* Hero Header */}
                <div className="mb-12">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center px-4 py-1.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 text-[10px] font-black uppercase tracking-widest mb-6"
                    >
                        {post.category}
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-black text-slate-900 mb-8 tracking-tight leading-[1.1]"
                    >
                        {post.title}
                    </motion.h1>
                    
                    <div className="flex flex-wrap items-center gap-8 py-8 border-y border-slate-50 text-sm font-bold text-slate-400 tracking-widest uppercase">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 border-2 border-white shadow-lg">
                                <User size={18} />
                            </div>
                            <span className="text-slate-900">{post.author?.name || 'Admin'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar size={18} />
                            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock size={18} />
                            <span>5 min read</span>
                        </div>
                    </div>
                </div>

                {/* Cover Image */}
                {post.thumbnail && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative rounded-[3.5rem] overflow-hidden mb-16 shadow-2xl shadow-slate-200/50"
                    >
                        <img src={post.thumbnail} alt={post.title} className="w-full h-auto max-h-[600px] object-cover" />
                    </motion.div>
                )}

                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Share & Like Toolbar */}
                    <div className="lg:w-20 lg:sticky lg:top-40 flex lg:flex-col items-center justify-center gap-6 self-start">
                        <button 
                            onClick={() => setLiked(!liked)}
                            className={`p-4 rounded-2xl shadow-xl transition-all ${liked ? 'bg-rose-50 text-rose-500 shadow-rose-100 font-bold' : 'bg-white text-slate-400 shadow-slate-100 hover:text-rose-500 font-bold'}`}
                        >
                            <Heart size={24} fill={liked ? 'currentColor' : 'none'} />
                        </button>
                        <button className="p-4 rounded-2xl bg-white shadow-xl shadow-slate-100 text-slate-400 hover:text-blue-500 transition-all font-bold">
                            <Share2 size={24} />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 prose prose-xl prose-slate max-w-none">
                        <div 
                            dangerouslySetInnerHTML={{ __html: post.content }} 
                            className="text-slate-600 font-bold leading-relaxed space-y-8 blog-content" 
                        />
                        
                        {/* Blog Tags */}
                        <div className="mt-16 flex flex-wrap gap-4 pt-12 border-t border-slate-100">
                            {['Article', post.category, 'Guide'].map(tag => (
                                <span key={tag} className="px-4 py-2 bg-slate-50 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors cursor-pointer border border-transparent hover:border-slate-200">
                                    #{tag}
                                </span>
                            ))}
                        </div>

                        {/* Social Links */}
                        <div className="mt-12 p-8 bg-slate-50 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-6">
                            <span className="font-black tracking-tight text-slate-500 uppercase text-[10px]">Share this Article</span>
                            <div className="flex gap-4">
                                {[Facebook, Twitter, Linkedin].map((Icon, i) => (
                                    <button key={i} className="p-3 bg-white text-slate-900 rounded-xl shadow-md hover:bg-slate-900 hover:text-white transition-all transform hover:-translate-y-1">
                                        <Icon size={20} />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Newsletter Box */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-24 p-1 bg-gradient-to-r from-blue-600 to-rose-500 rounded-[3rem]"
                >
                    <div className="bg-slate-900 rounded-[2.9rem] p-12 text-center text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors"></div>
                        <h3 className="text-3xl font-black mb-4 relative z-10">Stay Inspired Daily</h3>
                        <p className="text-slate-400 font-bold mb-8 relative z-10">Join our newsletter for fresh stories and expert guides every week.</p>
                        <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4 relative z-10">
                            <input 
                                type="email" 
                                placeholder="Enter your email..." 
                                className="flex-1 px-6 py-4 bg-white/5 rounded-2xl border-2 border-white/10 font-bold outline-none focus:border-white focus:bg-white/10 transition-all text-white placeholder:text-slate-500"
                            />
                            <button className="px-8 py-4 bg-white text-slate-900 rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/5">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </motion.div>
            </article>
        </div>
    );
};

export default BlogPost;
