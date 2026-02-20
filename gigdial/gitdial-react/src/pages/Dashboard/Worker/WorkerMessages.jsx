import React, { useState, useEffect, useRef } from 'react';
import { Search, Send, MoreVertical, Phone, Video, Image as ImageIcon, Paperclip, Smile, X, ArrowLeft, MessageSquare } from 'lucide-react';
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
    const messagesEndRef = useRef(null);
    const location = useLocation();

    const emojis = ['😊', '😂', '🥰', '👍', '🙌', '🔥', '✨', '🙏', '💯', '👋', '😎', '🎉', '❤️', '✅', '⭐', '🤝'];

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Initialize chat from navigation state if available
    useEffect(() => {
        if (location.state?.user) {
            setActiveChat(location.state.user);
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
        <div className="flex h-[calc(100vh-120px)] md:h-[calc(100vh-140px)] bg-slate-50 rounded-3xl border border-slate-200 shadow-xl overflow-hidden relative">
            {/* Sidebar List */}
            <div className={`${activeChat ? 'hidden lg:flex' : 'flex'} w-full lg:w-[350px] border-r border-slate-100 flex-col bg-white overflow-hidden`}>
                <div className="p-6 border-b border-slate-100 bg-white">
                    <h2 className="text-2xl font-bold text-slate-800 mb-6">Messages</h2>
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                        <input
                            type="text"
                            placeholder="Search people..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-slate-50 border-2 border-transparent rounded-2xl py-3 pl-12 pr-4 text-sm font-bold focus:bg-white focus:border-blue-500/20 focus:ring-4 focus:ring-blue-500/5 transition-all outline-none"
                        />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
                    {conversations.map((user) => (
                        <div
                            key={user._id}
                            onClick={() => setActiveChat(user)}
                            className={`p-4 flex gap-4 cursor-pointer transition-all rounded-2xl mb-1 hover:bg-slate-50 ${activeChat?._id === user._id ? 'bg-blue-50/80 shadow-sm' : ''}`}
                        >
                            <div className="relative shrink-0">
                                <img src={user.profileImage ? getFullImagePath(user.profileImage) : "https://i.pravatar.cc/150?img=11"} alt={user.name} className="w-14 h-14 rounded-2xl object-cover shadow-sm border-2 border-white" />
                                <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start mb-1 font-bold">
                                    <h3 className={`font-bold text-sm truncate ${activeChat?._id === user._id ? 'text-blue-700' : 'text-slate-800'}`}>{user.name}</h3>
                                </div>
                                <p className="text-xs text-slate-500 truncate font-bold opacity-70">{user.city || 'User'}</p>
                            </div>
                        </div>
                    ))}
                    {conversations.length === 0 && (
                        <div className="p-12 text-center">
                            <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-4 border border-slate-100">
                                <MessageSquare className="text-slate-300" size={32} />
                            </div>
                            <p className="text-slate-400 text-sm font-bold">No chats found</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Chat Area */}
            <div className={`${activeChat ? 'flex' : 'hidden lg:flex'} flex-1 flex-col bg-white relative overflow-hidden`}>
                {activeChat ? (
                    <>
                        {/* Header */}
                        <div className="px-4 py-3 md:px-6 md:py-4 border-b border-slate-100 flex justify-between items-center bg-white/95 backdrop-blur-xl sticky top-0 z-30 shadow-sm">
                            <div className="flex items-center gap-4 min-w-0">
                                <button
                                    onClick={() => setActiveChat(null)}
                                    className="lg:hidden p-2 -ml-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                                >
                                    <ArrowLeft size={24} />
                                </button>
                                <div className="relative shrink-0">
                                    <img src={activeChat.profileImage ? getFullImagePath(activeChat.profileImage) : "https://i.pravatar.cc/150?img=11"} alt={activeChat.name} className="w-10 h-10 md:w-12 md:h-12 rounded-2xl object-cover shadow-sm border-2 border-white" />
                                    <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full shadow-sm"></span>
                                </div>
                                <div className="min-w-0 font-bold">
                                    <h3 className="font-bold text-slate-800 text-sm md:text-lg truncate tracking-tight">{activeChat.name}</h3>
                                    <p className="text-[10px] md:text-xs text-green-600 font-bold uppercase tracking-wider flex items-center gap-1.5 px-1">
                                        <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full"></span> Online
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-1">
                                <button className="p-2 md:p-3 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-2xl transition-all">
                                    <Phone size={20} />
                                </button>
                                <button className="p-2 md:p-3 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-2xl transition-all">
                                    <MoreVertical size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Messages Feed */}
                        <div className="flex-1 p-4 md:p-8 overflow-y-auto flex flex-col gap-6 custom-scrollbar bg-slate-50/50">
                            {messages.map((msg, idx) => {
                                const isMe = msg.sender === userInfo._id || msg.sender?._id === userInfo._id;
                                return (
                                    <div key={msg._id || idx} className={`flex gap-3 max-w-[90%] sm:max-w-[75%] ${isMe ? 'self-end flex-row-reverse' : 'self-start'}`}>
                                        <div className="relative shrink-0 self-end mb-1">
                                            <img
                                                src={isMe ? (userInfo.profileImage ? getFullImagePath(userInfo.profileImage) : "https://i.pravatar.cc/150?img=11") : (activeChat.profileImage ? getFullImagePath(activeChat.profileImage) : "https://i.pravatar.cc/150?img=11")}
                                                alt=""
                                                className="w-8 h-8 md:w-10 md:h-10 rounded-xl object-cover shadow-sm border-2 border-white"
                                            />
                                        </div>
                                        <div className={`flex flex-col gap-1 ${isMe ? 'items-end' : 'items-start'}`}>
                                            {msg.image && (
                                                <div className="mb-1 max-w-[280px] sm:max-w-md rounded-2xl overflow-hidden border-2 border-white shadow-lg transition-transform hover:scale-[1.02] cursor-pointer">
                                                    <img
                                                        src={getFullImagePath(msg.image)}
                                                        alt="Sent content"
                                                        className="w-full h-auto object-cover"
                                                        onClick={() => window.open(getFullImagePath(msg.image), '_blank')}
                                                    />
                                                </div>
                                            )}
                                            {msg.content && (
                                                <div className={`
                                                    p-3 md:p-4 rounded-2xl text-sm md:text-base font-bold shadow-sm break-words max-w-full
                                                    ${isMe
                                                        ? 'bg-blue-600 text-white rounded-br-none shadow-blue-200'
                                                        : 'bg-white text-slate-700 rounded-bl-none border border-slate-100'}
                                                `}>
                                                    {msg.content}
                                                </div>
                                            )}
                                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest px-1">
                                                {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="px-4 py-4 md:px-8 md:py-6 bg-white border-t border-slate-100 sticky bottom-0 z-30">
                            {/* Emoji Picker */}
                            <AnimatePresence>
                                {showEmojiPicker && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute bottom-full left-4 right-4 md:left-auto md:w-80 mb-4 bg-white rounded-3xl shadow-2xl border border-slate-100 p-5 z-50 overflow-hidden"
                                    >
                                        <div className="flex justify-between items-center mb-4">
                                            <span className="text-sm font-bold text-slate-800 uppercase tracking-widest">Emojis</span>
                                            <button onClick={() => setShowEmojiPicker(false)} className="text-slate-400 hover:text-slate-600 p-1">
                                                <X size={18} />
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-6 gap-2">
                                            {emojis.map(emoji => (
                                                <button
                                                    key={emoji}
                                                    onClick={() => addEmoji(emoji)}
                                                    className="w-10 h-10 flex items-center justify-center text-xl hover:bg-slate-50 rounded-xl transition-all hover:scale-110 active:scale-90"
                                                >
                                                    {emoji}
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="flex items-center gap-3 md:gap-4">
                                <div className="flex-1 bg-slate-50 border-2 border-slate-200 focus-within:border-blue-500/30 focus-within:bg-white rounded-[24px] flex items-center px-2 md:px-4 py-1 transition-all font-bold">
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        className="p-2 text-slate-400 hover:text-blue-600 transition-all rounded-full hover:bg-blue-50 shrink-0"
                                    >
                                        <Paperclip size={20} />
                                    </button>
                                    <input
                                        type="text"
                                        value={messageInput}
                                        onChange={(e) => setMessageInput(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                        placeholder="Type your message..."
                                        className="flex-1 bg-transparent border-none focus:ring-0 py-3 text-sm md:text-base font-bold text-slate-700 placeholder:text-slate-400 outline-none min-w-0"
                                    />
                                    <button
                                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                        className={`p-2 transition-all rounded-full shrink-0 ${showEmojiPicker ? 'text-blue-600 bg-blue-50' : 'text-slate-400 hover:text-blue-600 hover:bg-blue-50'}`}
                                    >
                                        <Smile size={20} />
                                    </button>
                                    <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
                                </div>
                                <button
                                    onClick={() => handleSendMessage()}
                                    className={`
                                        shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all bg-blue-600 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 active:scale-90
                                        ${(!messageInput.trim() && !isUploading) ? 'opacity-50 grayscale cursor-not-allowed' : ''}
                                    `}
                                    disabled={(!messageInput.trim() && !isUploading) || isUploading}
                                >
                                    <Send size={22} className={isUploading ? 'animate-pulse' : ''} />
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
                        <div className="w-32 h-32 bg-blue-50 rounded-[40px] flex items-center justify-center mb-8 text-blue-500 shadow-inner">
                            <MessageSquare size={64} />
                        </div>
                        <h3 className="text-3xl font-bold text-slate-800 mb-4 tracking-tight">Select a Chat</h3>
                        <p className="text-slate-500 max-w-sm font-bold text-lg leading-relaxed">
                            Start a conversation with clients to get things moving. Your messages will appear here.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WorkerMessages;
