import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { 
  Plus, Search, Edit2, Trash2, Eye, EyeOff, 
  ChevronRight, Calendar, User as UserIcon, Tag,
  FileText, Image as ImageIcon, X, Save
} from 'lucide-react';

const ManageBlogs = () => {
    const fileInputRef = useRef(null);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBlog, setEditingBlog] = useState(null);
    
    // Form States
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: 'General',
        thumbnail: '',
        excerpt: '',
        isPublished: true
    });

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get('/api/blogs/admin');
            setBlogs(data);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to fetch blogs');
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setFormData({ ...formData, thumbnail: reader.result });
            };
            reader.onerror = (error) => {
                console.error("Error reading file:", error);
                toast.error("Failed to read image file.");
            };
        }
    };

    const handleEdit = (blog) => {
        setEditingBlog(blog);
        setFormData({
            title: blog.title,
            content: blog.content,
            category: blog.category,
            thumbnail: blog.thumbnail || '',
            excerpt: blog.excerpt || '',
            isPublished: blog.isPublished
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this blog?')) {
            try {
                await axios.delete(`/api/blogs/${id}`);
                toast.success('Blog deleted successfully');
                fetchBlogs();
            } catch (error) {
                toast.error(error.response?.data?.message || 'Failed to delete blog');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingBlog) {
                await axios.put(`/api/blogs/${editingBlog._id}`, formData);
                toast.success('Blog updated successfully');
            } else {
                await axios.post('/api/blogs', formData);
                toast.success('Blog created successfully');
            }
            setIsModalOpen(false);
            resetForm();
            fetchBlogs();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to save blog');
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            content: '',
            category: 'General',
            thumbnail: '',
            excerpt: '',
            isPublished: true
        });
        setEditingBlog(null);
    };

    const filteredBlogs = blogs.filter(blog => 
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6 bg-slate-50 min-h-screen font-inter">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                <div>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2 flex items-center gap-3 tracking-tight">
                        <div className="p-2.5 bg-blue-600 rounded-2xl shadow-lg shadow-blue-200">
                            <FileText className="text-white" size={28} />
                        </div>
                        Manage Blogs
                    </h1>
                    <p className="text-slate-500 font-medium ml-1">Create, edit, and manage your platform's articles</p>
                </div>
                <button 
                    onClick={() => { resetForm(); setIsModalOpen(true); }}
                    className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl transition-all shadow-[0_10px_20px_-5px_rgba(37,99,235,0.3)] font-bold text-lg active:scale-95"
                >
                    <Plus size={22} />
                    Create New Blog
                </button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white border border-slate-200 p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow group">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-slate-500 text-sm mb-1 font-bold uppercase tracking-wider">Total Blogs</p>
                            <h3 className="text-4xl font-black text-slate-900 tracking-tighter">{blogs.length}</h3>
                        </div>
                        <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                            <FileText size={28} />
                        </div>
                    </div>
                </div>
                <div className="bg-white border border-slate-200 p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow group">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-slate-500 text-sm mb-1 font-bold uppercase tracking-wider">Published</p>
                            <h3 className="text-4xl font-black text-emerald-600 tracking-tighter">
                                {blogs.filter(b => b.isPublished).length}
                            </h3>
                        </div>
                        <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                            <Eye size={28} />
                        </div>
                    </div>
                </div>
                <div className="bg-white border border-slate-200 p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow group">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-slate-500 text-sm mb-1 font-bold uppercase tracking-wider">Drafts</p>
                            <h3 className="text-4xl font-black text-orange-600 tracking-tighter">
                                {blogs.filter(b => !b.isPublished).length}
                            </h3>
                        </div>
                        <div className="p-4 bg-orange-50 text-orange-600 rounded-2xl group-hover:bg-orange-600 group-hover:text-white transition-colors duration-300">
                            <EyeOff size={28} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="relative mb-8 max-w-2xl">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                    type="text"
                    placeholder="Search by title or category..."
                    className="w-full bg-white border-2 border-slate-100 text-slate-900 rounded-[1.25rem] py-4.5 pl-14 pr-6 focus:outline-none focus:border-blue-500 focus:bg-white transition-all placeholder:text-slate-400 font-bold shadow-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Blogs Table/List */}
            <div className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm">
                {loading ? (
                    <div className="flex justify-center items-center py-32">
                        <div className="animate-spin rounded-full h-16 w-16 border-[6px] border-slate-100 border-t-blue-600"></div>
                    </div>
                ) : filteredBlogs.length === 0 ? (
                    <div className="text-center py-32 bg-slate-50/50">
                        <div className="p-6 bg-white w-24 h-24 rounded-[2rem] shadow-sm border border-slate-100 mx-auto mb-6 flex items-center justify-center">
                            <FileText className="text-slate-200" size={48} />
                        </div>
                        <h3 className="text-2xl text-slate-900 font-black mb-2 tracking-tight">No blogs found</h3>
                        <p className="text-slate-500 font-medium">Try searching for something else or create a new article.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto min-h-[500px]">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-100">
                                    <th className="px-8 py-6 text-slate-500 font-black text-xs uppercase tracking-widest">Blog Article</th>
                                    <th className="px-6 py-6 text-slate-500 font-black text-xs uppercase tracking-widest">Category</th>
                                    <th className="px-6 py-6 text-slate-500 font-black text-xs uppercase tracking-widest">Status</th>
                                    <th className="px-6 py-6 text-slate-500 font-black text-xs uppercase tracking-widest">Date Created</th>
                                    <th className="px-8 py-6 text-slate-500 font-black text-xs uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {filteredBlogs.map((blog) => (
                                    <tr key={blog._id} className="hover:bg-blue-50/30 transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-5">
                                                <div className="w-20 h-14 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border-2 border-white shadow-sm ring-1 ring-slate-100">
                                                    {blog.thumbnail ? (
                                                        <img src={blog.thumbnail} alt="" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-slate-300">
                                                            <ImageIcon size={20} />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex flex-col min-w-0">
                                                    <span className="text-slate-900 font-black tracking-tight group-hover:text-blue-600 transition-colors line-clamp-1 text-base">{blog.title}</span>
                                                    <span className="text-slate-400 text-xs font-bold flex items-center gap-1.5 mt-1 underline decoration-slate-200 underline-offset-2">
                                                        <UserIcon size={12} className="text-slate-300" /> {blog.author?.name}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6 font-bold">
                                            <span className="px-4 py-1.5 bg-slate-100 text-slate-600 rounded-full text-[11px] font-black uppercase tracking-wider border border-slate-200 shadow-sm">
                                                {blog.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-6">
                                            {blog.isPublished ? (
                                                <span className="flex items-center gap-2 text-emerald-600 text-[11px] font-black uppercase tracking-wider bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100 w-fit">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                                    Published
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-2 text-orange-600 text-[11px] font-black uppercase tracking-wider bg-orange-50 px-3 py-1.5 rounded-full border border-orange-100 w-fit">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                                                    Draft
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-6">
                                            <span className="text-slate-600 text-sm font-bold flex items-center gap-2">
                                                <Calendar size={16} className="text-slate-400" /> {new Date(blog.createdAt).toLocaleDateString()}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button 
                                                    onClick={() => handleEdit(blog)}
                                                    className="p-2.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-xl transition-all active:scale-90"
                                                    title="Edit"
                                                >
                                                    <Edit2 size={18} />
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(blog._id)}
                                                    className="p-2.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl transition-all active:scale-90"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Blog Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="fixed inset-0 bg-slate-900/60 backdrop-blur-md"
                        onClick={() => setIsModalOpen(false)}
                    />
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="bg-white w-full max-w-5xl max-h-full overflow-hidden rounded-[3rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] flex flex-col relative z-[60]"
                    >
                        <div className="p-8 md:p-10 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0">
                            <div>
                                <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                                    {editingBlog ? 'Update Article' : 'Write New Article'}
                                </h2>
                                <p className="text-slate-500 font-medium mt-1">Ready to share your insights with the platform?</p>
                            </div>
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-2xl transition-all active:scale-95"
                            >
                                <X size={24} />
                            </button>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-10 space-y-12 bg-white">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                                {/* Left Column: Basic Info - Spans 8 cols */}
                                <div className="lg:col-span-8 space-y-8">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 mb-1">
                                            <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
                                            <label className="text-slate-900 text-sm font-black uppercase tracking-[0.2em]">Article Title</label>
                                        </div>
                                        <input 
                                            type="text"
                                            required
                                            className="w-full bg-slate-50 border-2 border-slate-100 text-slate-900 rounded-2xl py-5 px-7 focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-black text-xl placeholder:text-slate-300 shadow-sm"
                                            placeholder="The future of GitDial technology..."
                                            value={formData.title}
                                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                                        />
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 mb-1">
                                            <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
                                            <label className="text-slate-900 text-sm font-black uppercase tracking-[0.2em]">Full Content</label>
                                        </div>
                                        <textarea 
                                            required
                                            rows="18"
                                            className="w-full bg-slate-50 border-2 border-slate-100 text-slate-900 rounded-[2rem] py-8 px-10 focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-bold text-lg placeholder:text-slate-300 resize-none min-h-[450px] shadow-sm leading-relaxed"
                                            placeholder="Once upon a time in the digital era..."
                                            value={formData.content}
                                            onChange={(e) => setFormData({...formData, content: e.target.value})}
                                        ></textarea>
                                    </div>
                                </div>

                                {/* Right Column: Preview & Status - Spans 4 cols */}
                                <div className="lg:col-span-4 space-y-10">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 mb-1">
                                            <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
                                            <label className="text-slate-900 text-sm font-black uppercase tracking-[0.2em]">Thumbnail</label>
                                        </div>
                                        <div 
                                            className="relative group/thumb aspect-[16/10] w-full rounded-[2.5rem] border-4 border-slate-100 overflow-hidden bg-slate-50 shadow-inner flex flex-col items-center justify-center cursor-pointer transition-all hover:border-blue-400 hover:shadow-blue-100"
                                            onClick={() => fileInputRef.current?.click()}
                                        >
                                            {formData.thumbnail ? (
                                                <>
                                                    <img src={formData.thumbnail} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover/thumb:scale-110" />
                                                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex flex-col items-center justify-center backdrop-blur-sm">
                                                        <ImageIcon className="text-white mb-2" size={32} />
                                                        <span className="text-white px-5 py-2.5 rounded-2xl font-black text-xs uppercase tracking-widest bg-blue-600 shadow-xl">Update Image</span>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="flex flex-col items-center justify-center text-slate-400 gap-4 p-8 text-center animate-in fade-in zoom-in duration-500">
                                                    <div className="w-20 h-20 bg-white rounded-[1.75rem] shadow-md flex items-center justify-center mb-2 group-hover/thumb:scale-110 transition-transform">
                                                        <ImageIcon size={36} className="text-blue-500" />
                                                    </div>
                                                    <div>
                                                        <p className="font-black text-sm uppercase tracking-wider text-slate-900 mb-1">Gallery Access</p>
                                                        <p className="text-[10px] font-bold text-slate-400 tracking-tight">JPG, PNG, GIF (Max 5MB)</p>
                                                    </div>
                                                </div>
                                            )}
                                            <input 
                                                ref={fileInputRef}
                                                type="file" 
                                                className="hidden" 
                                                accept="image/*"
                                                onChange={handleFileChange}
                                            />
                                            {formData.thumbnail && (
                                                <button 
                                                    type="button"
                                                    onClick={(e) => { e.stopPropagation(); setFormData({...formData, thumbnail: ''}); }}
                                                    className="absolute top-5 right-5 bg-white/90 backdrop-blur-md p-3 rounded-2xl text-red-500 shadow-2xl border border-red-50 hover:bg-red-500 hover:text-white transition-all z-20"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 mb-1">
                                            <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
                                            <label className="text-slate-900 text-sm font-black uppercase tracking-[0.2em]">Brief Excerpt</label>
                                        </div>
                                        <textarea 
                                            rows="5"
                                            className="w-full bg-slate-50 border-2 border-slate-100 text-slate-900 rounded-[1.5rem] py-5 px-7 focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-bold text-sm placeholder:text-slate-300 resize-none shadow-sm"
                                            placeholder="A short Hook for your readers..."
                                            value={formData.excerpt}
                                            onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                                        ></textarea>
                                    </div>
                                    
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 mb-1">
                                            <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
                                            <label className="text-slate-900 text-sm font-black uppercase tracking-[0.2em]">Category</label>
                                        </div>
                                        <select 
                                            className="w-full bg-slate-50 border-2 border-slate-100 text-slate-900 rounded-[1.5rem] py-5 px-7 focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-black text-sm appearance-none shadow-sm cursor-pointer"
                                            value={formData.category}
                                            onChange={(e) => setFormData({...formData, category: e.target.value})}
                                        >
                                            <option value="General">General</option>
                                            <option value="Tutorial">Tutorial</option>
                                            <option value="Tips & Tricks">Tips & Tricks</option>
                                            <option value="Updates">Updates</option>
                                            <option value="Industry">Industry</option>
                                        </select>
                                    </div>

                                    <div className="bg-slate-50 p-10 rounded-[2.5rem] border-2 border-slate-100 shadow-inner space-y-8">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <span className="text-slate-900 font-black uppercase tracking-widest text-[10px] block mb-1">Visibility Status</span>
                                                <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest inline-flex items-center gap-2 ${formData.isPublished ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200' : 'bg-orange-500 text-white shadow-lg shadow-orange-200'}`}>
                                                    <div className={`w-1.5 h-1.5 rounded-full bg-white ${formData.isPublished ? 'animate-pulse' : ''}`} />
                                                    {formData.isPublished ? 'Live Now' : 'Hidden Draft'}
                                                </div>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input 
                                                    type="checkbox" 
                                                    className="sr-only peer"
                                                    checked={formData.isPublished}
                                                    onChange={(e) => setFormData({...formData, isPublished: e.target.checked})}
                                                />
                                                <div className="w-16 h-9 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-200 after:border after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-emerald-500"></div>
                                            </label>
                                        </div>
                                        <p className="text-[11px] text-slate-400 font-bold leading-relaxed">
                                            {formData.isPublished 
                                                ? "Visible to everyone on the main blog page." 
                                                : "Only you can see this in the admin panel."
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row justify-end gap-5 pt-12 border-t-2 border-slate-100 sticky bottom-0 bg-white">
                                <button 
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-12 py-5 rounded-[1.5rem] bg-slate-100 border-2 border-slate-200 text-slate-600 hover:bg-slate-200 hover:border-slate-300 transition-all font-black uppercase tracking-widest text-xs active:scale-95"
                                >
                                    Discard Changes
                                </button>
                                <button 
                                    type="submit"
                                    className="flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-16 py-5 rounded-[1.5rem] transition-all shadow-2xl shadow-blue-200 font-black uppercase tracking-widest text-xs active:scale-95 group"
                                >
                                    <Save size={20} className="group-hover:scale-125 transition-transform" />
                                    {editingBlog ? 'Update Article' : 'Launch Article'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default ManageBlogs;
