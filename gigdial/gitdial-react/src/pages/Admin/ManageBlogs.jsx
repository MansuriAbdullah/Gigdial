import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { 
  Plus, Search, Edit2, Trash2, Eye, EyeOff, 
  ChevronRight, Calendar, User as UserIcon, Tag,
  FileText, Image as ImageIcon, X, Save
} from 'lucide-react';

const ManageBlogs = () => {
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
        <div className="p-6 bg-slate-900/50 min-h-screen">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                        <FileText className="text-blue-500" />
                        Manage Blogs
                    </h1>
                    <p className="text-slate-400">Create, edit, and manage your platform's articles</p>
                </div>
                <button 
                    onClick={() => { resetForm(); setIsModalOpen(true); }}
                    className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-all shadow-lg shadow-blue-900/20 font-semibold"
                >
                    <Plus size={20} />
                    Create New Blog
                </button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-slate-400 text-sm mb-1 font-medium">Total Blogs</p>
                            <h3 className="text-3xl font-bold text-white">{blogs.length}</h3>
                        </div>
                        <div className="p-3 bg-blue-500/10 rounded-xl">
                            <FileText className="text-blue-500" />
                        </div>
                    </div>
                </div>
                <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-slate-400 text-sm mb-1 font-medium">Published</p>
                            <h3 className="text-3xl font-bold text-green-500">
                                {blogs.filter(b => b.isPublished).length}
                            </h3>
                        </div>
                        <div className="p-3 bg-green-500/10 rounded-xl">
                            <Eye className="text-green-500" />
                        </div>
                    </div>
                </div>
                <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-slate-400 text-sm mb-1 font-medium">Drafts</p>
                            <h3 className="text-3xl font-bold text-orange-500">
                                {blogs.filter(b => !b.isPublished).length}
                            </h3>
                        </div>
                        <div className="p-3 bg-orange-500/10 rounded-xl">
                            <EyeOff className="text-orange-500" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                <input 
                    type="text"
                    placeholder="Search by title or category..."
                    className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Blogs Table/List */}
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl overflow-hidden backdrop-blur-sm">
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                    </div>
                ) : filteredBlogs.length === 0 ? (
                    <div className="text-center py-20">
                        <FileText className="mx-auto text-slate-700 mb-4" size={48} />
                        <h3 className="text-xl text-slate-400 font-medium">No blogs found</h3>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-800/80 border-b border-slate-700">
                                <tr>
                                    <th className="px-6 py-4 text-slate-400 font-semibold text-sm">Blog Article</th>
                                    <th className="px-6 py-4 text-slate-400 font-semibold text-sm">Category</th>
                                    <th className="px-6 py-4 text-slate-400 font-semibold text-sm">Status</th>
                                    <th className="px-6 py-4 text-slate-400 font-semibold text-sm">Date Created</th>
                                    <th className="px-6 py-4 text-slate-400 font-semibold text-sm text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700/50">
                                {filteredBlogs.map((blog) => (
                                    <tr key={blog._id} className="hover:bg-slate-700/20 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-16 h-10 rounded-lg overflow-hidden bg-slate-700 shrink-0">
                                                    {blog.thumbnail ? (
                                                        <img src={blog.thumbnail} alt="" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-slate-500">
                                                            <ImageIcon size={16} />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-white font-semibold group-hover:text-blue-400 transition-colors line-clamp-1">{blog.title}</span>
                                                    <span className="text-slate-500 text-xs flex items-center gap-1 mt-1">
                                                        <UserIcon size={12} /> {blog.author?.name}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs font-medium border border-blue-500/20">
                                                {blog.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {blog.isPublished ? (
                                                <span className="flex items-center gap-1.5 text-green-500 text-sm font-medium">
                                                    <Eye size={14} /> Published
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-1.5 text-orange-500 text-sm font-medium">
                                                    <EyeOff size={14} /> Draft
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-slate-400 text-sm flex items-center gap-1.5">
                                                <Calendar size={14} /> {new Date(blog.createdAt).toLocaleDateString()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button 
                                                    onClick={() => handleEdit(blog)}
                                                    className="p-2 hover:bg-blue-500/10 text-slate-400 hover:text-blue-500 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit2 size={18} />
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(blog._id)}
                                                    className="p-2 hover:bg-red-500/10 text-slate-400 hover:text-red-500 rounded-lg transition-colors"
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
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-slate-900 border border-slate-700 w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl shadow-2xl flex flex-col">
                        <div className="p-6 border-b border-slate-700 flex justify-between items-center bg-slate-800/50">
                            <div>
                                <h2 className="text-2xl font-bold text-white">
                                    {editingBlog ? 'Edit Blog' : 'Create New Blog'}
                                </h2>
                                <p className="text-slate-400 text-sm mt-1">Fill in the details for your article</p>
                            </div>
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="p-2 hover:bg-slate-700 text-slate-400 hover:text-white rounded-full transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Left Column: Basic Info */}
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-slate-400 text-sm font-medium mb-2">Title</label>
                                        <input 
                                            type="text"
                                            required
                                            className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                            placeholder="Enter blog title"
                                            value={formData.title}
                                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-slate-400 text-sm font-medium mb-2">Category</label>
                                        <select 
                                            className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
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

                                    <div>
                                        <label className="block text-slate-400 text-sm font-medium mb-2">Thumbnail URL</label>
                                        <div className="relative">
                                            <input 
                                                type="text"
                                                className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                                placeholder="https://example.com/image.jpg"
                                                value={formData.thumbnail}
                                                onChange={(e) => setFormData({...formData, thumbnail: e.target.value})}
                                            />
                                            <ImageIcon className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column: Preview & Status */}
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-slate-400 text-sm font-medium mb-2">Excerpt (Short Description)</label>
                                        <textarea 
                                            rows="3"
                                            className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
                                            placeholder="Write a brief summary..."
                                            value={formData.excerpt}
                                            onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                                        ></textarea>
                                    </div>

                                    <div className="bg-slate-800/50 p-6 rounded-2xl border border-dashed border-slate-700">
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-white font-medium">Publishing Settings</span>
                                            <div className={`px-2 py-1 rounded text-xs font-semibold uppercase ${formData.isPublished ? 'bg-green-500/20 text-green-500' : 'bg-orange-500/20 text-orange-500'}`}>
                                                {formData.isPublished ? 'Public' : 'Hidden'}
                                            </div>
                                        </div>
                                        <label className="flex items-center gap-3 cursor-pointer group">
                                            <div className="relative">
                                                <input 
                                                    type="checkbox" 
                                                    className="sr-only peer"
                                                    checked={formData.isPublished}
                                                    onChange={(e) => setFormData({...formData, isPublished: e.target.checked})}
                                                />
                                                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                            </div>
                                            <span className="text-slate-300 group-hover:text-white transition-colors">Visible to public</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-slate-400 text-sm font-medium mb-2">Content (HTML or Text)</label>
                                <textarea 
                                    required
                                    rows="10"
                                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl py-4 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                    placeholder="Write your blog content here..."
                                    value={formData.content}
                                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                                ></textarea>
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-slate-700">
                                <button 
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-6 py-3 rounded-xl border border-slate-700 text-white hover:bg-slate-800 transition-colors font-semibold"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit"
                                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl transition-all shadow-lg shadow-blue-900/20 font-semibold"
                                >
                                    <Save size={20} />
                                    {editingBlog ? 'Update Article' : 'Publish Article'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageBlogs;
