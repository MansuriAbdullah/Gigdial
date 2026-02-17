import React, { useState, useEffect, useRef } from 'react';
import { Search, Send, MoreVertical, Phone, Video, Image as ImageIcon, Paperclip, Smile, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getFullImagePath } from '../../../utils/imagePath';
import { useLocation } from 'react-router-dom';

const WorkerMessages = () => {
    const [activeChat, setActiveChat] = useState(null);
    const [messageInput, setMessageInput] = useState('');
    const [conversations, setConversations] = useState([]);
    const [messages, setMessages] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef(null);
    const location = useLocation();

    const emojis = ['😊', '😂', '🥰', '👍', '🙌', '🔥', '✨', '🙏', '💯', '👋', '😎', '🎉', '❤️', '✅', '⭐', '🤝'];

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    // Initialize chat from navigation state if available
    useEffect(() => {
        if (location.state?.user) {
            setActiveChat(location.state.user);
            // Optionally, we could check if user is in conversations and add if not,
            // but for now, just setting activeChat allows messaging.
        }
    }, [location.state]);

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

                // If we have a user from state, ensure they are in the list or handle visual consistency
                // For now, let's just leave it, as sending a message will likely refresh the list eventually.
            } catch (error) {
                console.error(error);
            }
        };
        fetchConversations();
    }, [searchQuery, userInfo?.token]);

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
        <div className="flex h-[calc(100vh-140px)] bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Sidebar List */}
            <div className="w-1/3 border-r border-slate-100 flex flex-col">
                <div className="p-4 border-b border-slate-100">
                    <h2 className="text-xl font-bold mb-4">Messages</h2>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search people..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-slate-50 border-none rounded-xl py-2 pl-10 pr-4 text-sm font-medium focus:ring-2 focus:ring-blue-500/20"
                        />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {conversations.map((user) => (
                        <div
                            key={user._id}
                            onClick={() => setActiveChat(user)}
                            className={`p-4 flex gap-3 cursor-pointer transition-colors hover:bg-slate-50 ${activeChat?._id === user._id ? 'bg-blue-50/50 border-r-4 border-blue-600' : ''}`}
                        >
                            <div className="relative">
                                <img src={user.profileImage ? getFullImagePath(user.profileImage) : "https://i.pravatar.cc/150?img=11"} alt={user.name} className="w-12 h-12 rounded-full object-cover" />
                                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className={`font-bold text-sm ${activeChat?._id === user._id ? 'text-blue-700' : 'text-slate-800'}`}>{user.name}</h3>
                                    {/* Time placeholder if not in conversation list object */}
                                    <span className="text-xs text-slate-400 font-medium"></span>
                                </div>
                                <p className="text-sm text-slate-500 truncate">{user.city || 'User'}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
                {activeChat ? (
                    <>
                        {/* Header */}
                        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white z-10">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <img src={activeChat.profileImage ? getFullImagePath(activeChat.profileImage) : "https://i.pravatar.cc/150?img=11"} alt={activeChat.name} className="w-10 h-10 rounded-full object-cover" />
                                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-800">{activeChat.name}</h3>
                                    <p className="text-xs text-green-600 font-medium flex items-center gap-1">
                                        Active
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
                                    <Phone size={20} />
                                </button>
                                <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
                                    <Video size={20} />
                                </button>
                                <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors">
                                    <MoreVertical size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Messages Feed */}
                        <div className="flex-1 bg-slate-50/50 p-6 overflow-y-auto flex flex-col gap-4">
                            {messages.map((msg, idx) => {
                                const isMe = msg.sender === userInfo._id || msg.sender?._id === userInfo._id;
                                return (
                                    <div key={msg._id || idx} className={`flex gap-3 max-w-[80%] ${isMe ? 'self-end flex-row-reverse' : ''}`}>
                                        <img
                                            src={isMe ? (userInfo.profileImage ? getFullImagePath(userInfo.profileImage) : "https://i.pravatar.cc/150?img=11") : (activeChat.profileImage ? getFullImagePath(activeChat.profileImage) : "https://i.pravatar.cc/150?img=11")}
                                            alt=""
                                            className="w-8 h-8 rounded-full self-end mb-1 object-cover"
                                        />
                                        <div className="flex flex-col">
                                            {msg.image && (
                                                <div className="mb-2 max-w-sm rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
                                                    <img
                                                        src={getFullImagePath(msg.image)}
                                                        alt="Sent image"
                                                        className="w-full h-auto cursor-pointer hover:opacity-95 transition-opacity"
                                                        onClick={() => window.open(getFullImagePath(msg.image), '_blank')}
                                                    />
                                                </div>
                                            )}
                                            {msg.content && (
                                                <div className={`${isMe ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white text-slate-700 rounded-bl-none'} p-3 rounded-2xl shadow-sm border border-slate-100 text-sm`}>
                                                    {msg.content}
                                                </div>
                                            )}
                                            <span className={`text-[10px] text-slate-400 mt-1 inline-block ${isMe ? 'text-right w-full mr-1' : 'ml-1'}`}>
                                                {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Input Area */}
                        <div className="p-4 border-t border-slate-100 bg-white relative">
                            {/* Emoji Picker */}
                            <AnimatePresence>
                                {showEmojiPicker && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute bottom-full left-4 mb-4 bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 z-50 w-64"
                                    >
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="text-sm font-bold text-slate-700">Quick Emojis</span>
                                            <button onClick={() => setShowEmojiPicker(false)} className="text-slate-400 hover:text-slate-600">
                                                <X size={16} />
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-4 gap-2">
                                            {emojis.map(emoji => (
                                                <button
                                                    key={emoji}
                                                    onClick={() => addEmoji(emoji)}
                                                    className="w-10 h-10 flex items-center justify-center text-xl hover:bg-slate-50 rounded-xl transition-colors"
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
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className={`p-3 text-slate-400 hover:text-blue-600 bg-slate-50 hover:bg-blue-50 rounded-xl transition-colors ${isUploading ? 'animate-pulse' : ''}`}
                                    title="Attach Document"
                                >
                                    <Paperclip size={20} />
                                </button>
                                <div className="flex-1 bg-slate-50 rounded-xl flex items-center gap-2 px-3 py-1 focus-within:ring-2 focus-within:ring-blue-500/20 border border-transparent focus-within:border-blue-200 transition-all">
                                    <input
                                        type="text"
                                        value={messageInput}
                                        onChange={(e) => setMessageInput(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                        placeholder="Type a message..."
                                        className="flex-1 bg-transparent border-none focus:ring-0 py-3 text-sm font-medium text-slate-700 placeholder:text-slate-400"
                                    />
                                    <button
                                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                        className={`p-2 transition-colors ${showEmojiPicker ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
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
                                    className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-600/30 transition-all active:scale-95 disabled:opacity-50"
                                    disabled={(!messageInput.trim() && !isUploading) || isUploading}
                                >
                                    <Send size={20} />
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-slate-500">
                        Select a conversation to start messaging
                    </div>
                )}
            </div>
        </div>
    );
};

export default WorkerMessages;
