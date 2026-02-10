import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Save, Plus, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

const ManageContent = () => {
    const { user } = useAuth();
    const [contents, setContents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('list');
    const [formData, setFormData] = useState({ key: '', title: '', content: '', section: '' });

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        try {
            const { data } = await axios.get('/api/content');
            setContents(data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: { Authorization: `Bearer ${user?.token}` }
            };
            await axios.post('/api/content', formData, config);
            alert('Content Saved!');
            fetchContent();
            setActiveTab('list');
            setFormData({ key: '', title: '', content: '', section: '' });
        } catch (error) {
            console.error(error);
            alert('Error saving content');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure?")) return;
        try {
            const config = {
                headers: { Authorization: `Bearer ${user?.token}` }
            };
            await axios.delete(`/api/content/${id}`, config);
            fetchContent();
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (item) => {
        setFormData(item);
        setActiveTab('edit');
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Manage Content</h1>
                    <p className="text-slate-500 mt-2">Update website pages, policies, and text.</p>
                </div>
                <button
                    onClick={() => {
                        setFormData({ key: '', title: '', content: '', section: '' });
                        setActiveTab('edit');
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all"
                >
                    <Plus size={20} /> Add New Content
                </button>
            </div>

            {activeTab === 'list' ? (
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold tracking-wider">
                                <tr>
                                    <th className="p-4">Key</th>
                                    <th className="p-4">Title</th>
                                    <th className="p-4">Section</th>
                                    <th className="p-4">Updated</th>
                                    <th className="p-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {loading ? <tr><td colSpan="5" className="p-4 text-center">Loading...</td></tr> :
                                    contents.length > 0 ? (
                                        contents.map((item) => (
                                            <tr key={item._id} className="hover:bg-slate-50 transition-colors">
                                                <td className="p-4 font-mono text-xs text-blue-600 font-bold">{item.key}</td>
                                                <td className="p-4 font-bold text-slate-800">{item.title}</td>
                                                <td className="p-4 text-slate-500 text-sm">{item.section || '-'}</td>
                                                <td className="p-4 text-slate-400 text-xs">{new Date(item.updatedAt).toLocaleDateString()}</td>
                                                <td className="p-4 text-right space-x-2">
                                                    <button onClick={() => handleEdit(item)} className="text-blue-600 hover:text-blue-800 font-bold text-sm">Edit</button>
                                                    <button onClick={() => handleDelete(item._id)} className="text-red-600 hover:text-red-800 font-bold text-sm">Delete</button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr><td colSpan="5" className="p-8 text-center text-slate-400">No content found. Add some!</td></tr>
                                    )}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm max-w-3xl">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-slate-900">{formData._id ? 'Edit Content' : 'Add Content'}</h2>
                        <button onClick={() => setActiveTab('list')} className="text-slate-500 hover:text-slate-700">Cancel</button>
                    </div>
                    <form onSubmit={handleSave} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Unique Key</label>
                                <input type="text" value={formData.key} onChange={(e) => setFormData({ ...formData, key: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200" placeholder="e.g. about_us_text" required disabled={!!formData._id} />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Section</label>
                                <input type="text" value={formData.section} onChange={(e) => setFormData({ ...formData, section: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200" placeholder="e.g. Terms Page" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Title</label>
                            <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200" placeholder="Content Title" required />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Content (HTML/Text)</label>
                            <textarea value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 h-64 font-mono text-sm" placeholder="<p>Enter your content here...</p>" required />
                        </div>
                        <button type="submit" className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                            <Save size={20} /> Save Content
                        </button>
                    </form>
                </motion.div>
            )}
        </div>
    );
};

export default ManageContent;
