import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Send, MoreVertical, Phone, Video, Image as ImageIcon, Paperclip, Smile, X, ArrowLeft, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { getFullImagePath } from '../../../utils/imagePath';

const CustomerMessages = () => {
    const [activeChat, setActiveChat] = useState(null);
    const [messageInput, setMessageInput] = useState('');
    const [conversations, setConversations] = useState([]);
    const [messages, setMessages] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef(null);
    const [searchParams] = useSearchParams();

    const emojis = ['😊', '😂', '🥰', '👍', '🙌', '🔥', '✨', '🙏', '💯', '👋', '😎', '🎉', '❤️', '✅', '⭐', '🤝'];

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const workerIdParam = searchParams.get('workerId');

    // Fetch conversations/contacts
    useEffect(() => {
        const fetchConversations = async () => {
            if (!userInfo) return;
            try {
                let url = '/api/messages/conversations/list';
                if (searchQuery) {
                    url = `/api/messages/search/${searchQuery}`;
                }
                const res = await fetch(url, {
                    headers: { 'Authorization': `Bearer ${userInfo.token}` }
                });
                const data = await res.json();
                setConversations(data);
                return data;
            } catch (error) {
                console.error(error);
                return [];
            }
        };

        fetchConversations().then(async (loadedConversations) => {
            // Handle workerId param if present
            if (workerIdParam) {
                const existing = loadedConversations.find(c => c._id === workerIdParam);
                if (existing) {
                    setActiveChat(existing);
                } else {
                    // Fetch worker details if not in conversation list
                    try {
                        const res = await axios.get(`/api/users/workers/${workerIdParam}`);
                        // Adapt response to match conversation object structure if needed
                        if (res.data) {
                            const newChatUser = {
                                _id: res.data._id,
                                name: res.data.name,
                                profileImage: res.data.profileImage,
                                city: res.data.city
                            };
                            setActiveChat(newChatUser);
                            setConversations(prev => [newChatUser, ...prev]);
                        }
                    } catch (err) {
                        console.error("Error fetching worker details for chat:", err);
                    }
                }
            }
        });
    }, [searchQuery, userInfo?.token, workerIdParam]);

    // Fetch messages for active chat
    useEffect(() => {
        const fetchMessages = async () => {
            if (!activeChat) return;
            try {
                const res = await fetch(`/api/messages/${activeChat._id}`, {
                    headers: { 'Authorization': `Bearer ${userInfo.token}` }
                });
                const data = await res.json();
                setMessages(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchMessages();
        // Poll for new messages every 5 seconds
        const interval = setInterval(fetchMessages, 5000);
        return () => clearInterval(interval);
    }, [activeChat, userInfo?.token]);

    const handleSendMessage = async (imagePath = null) => {
        if (!messageInput.trim() && !imagePath) return;
        if (!activeChat) return;

        try {
            const res = await fetch('/api/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userInfo.token}`
                },
                body: JSON.stringify({
                    recipientId: activeChat._id,
                    content: messageInput,
                    image: imagePath
                })
            });
            const data = await res.json();
            setMessages([...messages, data]);
            setMessageInput('');
            setShowEmojiPicker(false);

            // Refresh conversations list to update order or add new
            if (!conversations.find(c => c._id === activeChat._id)) {
                setConversations(prev => [activeChat, ...prev]);
            }

        } catch (error) {
            console.error(error);
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        setIsUploading(true);
        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${userInfo.token}`
                },
                body: formData
            });
            const data = await res.json();
            if (res.ok) {
                await handleSendMessage(data.image);
            } else {
                alert(data.message || 'Upload failed');
            }
        } catch (error) {
            console.error('Upload error:', error);
            alert('Error uploading image');
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const addEmoji = (emoji) => {
        setMessageInput(prev => prev + emoji);
    };

    return (
        <div className="flex h-[calc(100vh-120px)] md:h-[calc(100vh-140px)] bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden relative">
            {/* Sidebar List */}
            <div className={`${activeChat ? 'hidden md:flex' : 'flex'} w-full md:w-1/3 lg:w-80 border-r border-slate-100 flex-col bg-white`}>
                <div className="p-4 border-b border-slate-100">
                    <h2 className="text-xl font-bold mb-4">Messages</h2>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search people..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-slate-50 border-none rounded-xl py-2 pl-10 pr-4 text-sm font-medium focus:ring-2 focus:ring-blue-500/20 transition-all font-bold"
                        />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {conversations.map((user) => (
                        <div
                            key={user._id}
                            onClick={() => setActiveChat(user)}
                            className={`p-4 flex gap-3 cursor-pointer transition-all hover:bg-slate-50 ${activeChat?._id === user._id ? 'bg-blue-50/50 md:border-r-4 md:border-blue-600' : ''}`}
                        >
                            <div className="relative shrink-0">
                                <img src={user.profileImage ? getFullImagePath(user.profileImage) : "https://i.pravatar.cc/150?img=11"} alt={user.name} className="w-12 h-12 rounded-full object-cover shadow-sm" />
                                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start mb-1 font-bold">
                                    <h3 className={`font-bold text-sm truncate ${activeChat?._id === user._id ? 'text-blue-700' : 'text-slate-800'}`}>{user.name}</h3>
                                </div>
                                <p className="text-xs text-slate-500 truncate font-medium">{user.city || 'User'}</p>
                            </div>
                        </div>
                    ))}
                    {conversations.length === 0 && (
                        <div className="p-8 text-center">
                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <MessageSquare className="text-slate-300" size={24} />
                            </div>
                            <p className="text-slate-500 text-sm font-medium">No conversations yet.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Chat Area */}
            <div className={`${activeChat ? 'flex' : 'hidden md:flex'} flex-1 flex-col bg-slate-50/30 relative`}>
                {activeChat ? (
                    <>
                        {/* Header */}
                        <div className="p-3 md:p-4 border-b border-slate-100 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-20">
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setActiveChat(null)}
                                    className="md:hidden p-2 -ml-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                                >
                                    <ArrowLeft size={20} />
                                </button>
                                <div className="relative shrink-0">
                                    <img src={activeChat.profileImage ? getFullImagePath(activeChat.profileImage) : "https://i.pravatar.cc/150?img=11"} alt={activeChat.name} className="w-10 h-10 rounded-full object-cover shadow-sm" />
                                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
                                </div>
                                <div className="min-w-0 font-bold">
                                    <h3 className="font-bold text-slate-800 text-sm md:text-base truncate">{activeChat.name}</h3>
                                    <p className="text-[10px] md:text-xs text-green-600 font-bold flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Online
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-1 md:gap-2">
                                <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
                                    <Phone size={18} />
                                </button>
                                <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors hidden sm:block">
                                    <Video size={18} />
                                </button>
                                <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors">
                                    <MoreVertical size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Messages Feed */}
                        <div className="flex-1 p-4 md:p-6 overflow-y-auto flex flex-col gap-4 custom-scrollbar">
                            {messages.map((msg, idx) => {
                                const isMe = msg.sender === userInfo._id || msg.sender?._id === userInfo._id;
                                return (
                                    <div key={msg._id || idx} className={`flex gap-2 md:gap-3 max-w-[85%] md:max-w-[75%] ${isMe ? 'self-end flex-row-reverse' : ''}`}>
                                        <img
                                            src={isMe ? (userInfo.profileImage ? getFullImagePath(userInfo.profileImage) : "https://i.pravatar.cc/150?img=11") : (activeChat.profileImage ? getFullImagePath(activeChat.profileImage) : "https://i.pravatar.cc/150?img=11")}
                                            alt=""
                                            className="w-7 h-7 md:w-8 md:h-8 rounded-full self-end mb-1 object-cover shrink-0 border border-white shadow-sm"
                                        />
                                        <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                                            {msg.image && (
                                                <div className="mb-2 max-w-[240px] md:max-w-sm rounded-2xl overflow-hidden border border-slate-100 shadow-sm transition-transform hover:scale-[1.02] cursor-pointer">
                                                    <img
                                                        src={getFullImagePath(msg.image)}
                                                        alt="Sent image"
                                                        className="w-full h-auto"
                                                        onClick={() => window.open(getFullImagePath(msg.image), '_blank')}
                                                    />
                                                </div>
                                            )}
                                            {msg.content && (
                                                <div className={`${isMe ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white text-slate-700 rounded-bl-none shadow-sm'} p-3 rounded-2xl border border-slate-100/50 text-sm font-bold leading-relaxed`}>
                                                    {msg.content}
                                                </div>
                                            )}
                                            <span className={`text-[10px] text-slate-400 mt-1 font-bold ${isMe ? 'mr-1' : 'ml-1'}`}>
                                                {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Input Area */}
                        <div className="p-3 md:p-4 border-t border-slate-100 bg-white sticky bottom-0">
                            {/* Emoji Picker */}
                            <AnimatePresence>
                                {showEmojiPicker && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute bottom-full left-4 right-4 md:right-auto mb-4 bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 z-50 md:w-64"
                                    >
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="text-sm font-bold text-slate-700 font-bold">Quick Emojis</span>
                                            <button onClick={() => setShowEmojiPicker(false)} className="text-slate-400 hover:text-slate-600">
                                                <X size={16} />
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-6 md:grid-cols-4 gap-2">
                                            {emojis.map(emoji => (
                                                <button
                                                    key={emoji}
                                                    onClick={() => addEmoji(emoji)}
                                                    className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-lg hover:bg-slate-50 rounded-xl transition-colors"
                                                >
                                                    {emoji}
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="flex gap-2 items-end">
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImageUpload}
                                    className="hidden"
                                    accept="image/*"
                                />
                                <div className="flex-1 bg-slate-50 rounded-2xl flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1 focus-within:ring-2 focus-within:ring-blue-500/10 border border-slate-200 focus-within:border-blue-300 transition-all">
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        className={`p-2 text-slate-400 hover:text-blue-600 transition-colors ${isUploading ? 'animate-pulse' : ''}`}
                                    >
                                        <Paperclip size={20} />
                                    </button>
                                    <input
                                        type="text"
                                        value={messageInput}
                                        onChange={(e) => setMessageInput(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                        placeholder="Type message..."
                                        className="flex-1 bg-transparent border-none focus:ring-0 py-3 text-sm font-bold text-slate-700 placeholder:text-slate-400"
                                    />
                                    <button
                                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                        className={`p-2 transition-colors hidden sm:block ${showEmojiPicker ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
                                    >
                                        <Smile size={20} />
                                    </button>
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
                                    >
                                        <ImageIcon size={20} />
                                    </button>
                                </div>
                                <button
                                    onClick={() => handleSendMessage()}
                                    className="p-3.5 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 shadow-lg shadow-blue-600/30 transition-all active:scale-90 disabled:opacity-50"
                                    disabled={(!messageInput.trim() && !isUploading) || isUploading}
                                >
                                    <Send size={20} />
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-white/50">
                        <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mb-6 text-blue-500">
                            <MessageSquare size={40} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-2">Your Messages</h3>
                        <p className="text-slate-500 max-w-xs font-bold">
                            Select a user from the list to start a conversation or continue where you left off.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CustomerMessages;
