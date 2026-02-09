import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Send, MoreVertical, Phone, Video, Image as ImageIcon, Paperclip, Smile } from 'lucide-react';
import axios from 'axios';

const CustomerMessages = () => {
    const [activeChat, setActiveChat] = useState(null);
    const [messageInput, setMessageInput] = useState('');
    const [conversations, setConversations] = useState([]);
    const [messages, setMessages] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchParams] = useSearchParams();

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
                        // API returns worker object. Conversation list expects { _id, name, profileImage, ... }
                        if (res.data) {
                            const newChatUser = {
                                _id: res.data._id,
                                name: res.data.name,
                                profileImage: res.data.profileImage,
                                city: res.data.city
                            };
                            setActiveChat(newChatUser);
                            // Optionally add to conversations list temporarily so it shows up in sidebar
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

    const handleSendMessage = async () => {
        if (!messageInput.trim() || !activeChat) return;
        try {
            const res = await fetch('/api/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userInfo.token}`
                },
                body: JSON.stringify({
                    recipientId: activeChat._id,
                    content: messageInput
                })
            });
            const data = await res.json();
            setMessages([...messages, data]);
            setMessageInput('');

            // Refresh conversations list to update order or add new
            // For now, simpler to just ensure it's in the list
            if (!conversations.find(c => c._id === activeChat._id)) {
                setConversations(prev => [activeChat, ...prev]);
            }

        } catch (error) {
            console.error(error);
        }
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
                                <img src={user.profileImage ? `http://localhost:5000/${user.profileImage.replace(/\\/g, '/')}` : "https://i.pravatar.cc/150?img=11"} alt={user.name} className="w-12 h-12 rounded-full object-cover" />
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
                    {conversations.length === 0 && (
                        <div className="p-4 text-center text-slate-500 text-sm">
                            No conversations yet.
                        </div>
                    )}
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
                                    <img src={activeChat.profileImage ? `http://localhost:5000/${activeChat.profileImage.replace(/\\/g, '/')}` : "https://i.pravatar.cc/150?img=11"} alt={activeChat.name} className="w-10 h-10 rounded-full object-cover" />
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
                                            src={isMe ? (userInfo.profileImage ? `http://localhost:5000/${userInfo.profileImage.replace(/\\/g, '/')}` : "https://i.pravatar.cc/150?img=11") : (activeChat.profileImage ? `http://localhost:5000/${activeChat.profileImage.replace(/\\/g, '/')}` : "https://i.pravatar.cc/150?img=11")}
                                            alt=""
                                            className="w-8 h-8 rounded-full self-end mb-1 object-cover"
                                        />
                                        <div>
                                            <div className={`${isMe ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white text-slate-700 rounded-bl-none'} p-3 rounded-2xl shadow-sm border border-slate-100 text-sm`}>
                                                {msg.content}
                                            </div>
                                            <span className={`text-[10px] text-slate-400 mt-1 inline-block ${isMe ? 'text-right w-full mr-1' : 'ml-1'}`}>
                                                {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Input Area */}
                        <div className="p-4 border-t border-slate-100 bg-white">
                            <div className="flex gap-2 items-end">
                                <button className="p-3 text-slate-400 hover:text-blue-600 bg-slate-50 hover:bg-blue-50 rounded-xl transition-colors">
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
                                    <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                                        <Smile size={20} />
                                    </button>
                                    <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                                        <ImageIcon size={20} />
                                    </button>
                                </div>
                                <button
                                    onClick={handleSendMessage}
                                    className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-600/30 transition-all active:scale-95"
                                >
                                    <Send size={20} />
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-slate-500">
                        Select a conversation or start a new one to begin messaging
                    </div>
                )}
            </div>
        </div>
    );
};

export default CustomerMessages;
