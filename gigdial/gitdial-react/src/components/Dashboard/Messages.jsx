import React, { useState } from 'react';
import {
    Search, Phone, Video, MoreVertical, Send, Paperclip,
    Smile, Image as ImageIcon, Mic, Check, CheckCheck
} from 'lucide-react';

const Messages = () => {
    // Mock Data for Contacts
    const contacts = [
        { id: 1, name: 'Priya Singh', avatar: 'https://i.pravatar.cc/150?img=5', lastMsg: 'Sure, can you send me the photo?', time: '10:30 AM', unread: 2, online: true },
        { id: 2, name: 'Amit Patel', avatar: 'https://i.pravatar.cc/150?img=11', lastMsg: 'I will be there by 4 PM.', time: 'Yesterday', unread: 0, online: false },
        { id: 3, name: 'Rahul Sharma', avatar: 'https://i.pravatar.cc/150?img=3', lastMsg: 'Thanks for the quick service!', time: 'Yesterday', unread: 0, online: true },
        { id: 4, name: 'Sneha Gupta', avatar: 'https://i.pravatar.cc/150?img=9', lastMsg: 'Is Monday available?', time: '2 days ago', unread: 0, online: false },
    ];

    // Mock Data for Messages
    const [messages, setMessages] = useState([
        { id: 1, sender: 'them', text: 'Hello! I am Priya, I need some plumbing work done.', time: '10:00 AM' },
        { id: 2, sender: 'me', text: 'Hi Priya! I am Rajesh, your assigned plumber. How can I help you today?', time: '10:05 AM' },
        { id: 3, sender: 'them', text: 'Could you please bring extra washers for the tap?', time: '10:15 AM' },
        { id: 4, sender: 'me', text: 'Sure, I can do that. Could you send me a photo of the tap area so I know what to expect?', time: '10:20 AM' },
        { id: 5, sender: 'them', image: 'https://plumbermag.com/wp-content/uploads/2019/07/leaky-faucet.jpg', text: 'Here it is.', time: '10:25 AM' },
        { id: 6, sender: 'me', text: 'Thanks! I see the issue. I will be there by 10 AM tomorrow.', time: '10:32 AM' },
    ]);

    const [activeContact, setActiveContact] = useState(contacts[0]);
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;
        setMessages([...messages, {
            id: messages.length + 1,
            sender: 'me',
            text: newMessage,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
        setNewMessage('');
    };

    return (
        <div className="h-[calc(100vh-8rem)] bg-white rounded-[2rem] shadow-sm border border-slate-100 flex overflow-hidden">
            {/* Sidebar - Contacts List */}
            <div className="w-full md:w-80 lg:w-96 border-r border-slate-100 flex flex-col bg-slate-50/50">
                <div className="p-6 pb-2">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">Messages</h2>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search messages..."
                            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:border-primary outline-none transition-all text-sm font-medium shadow-sm"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
                    {contacts.map((contact) => (
                        <div
                            key={contact.id}
                            onClick={() => setActiveContact(contact)}
                            className={`p-4 rounded-xl cursor-pointer transition-all flex items-center gap-4 group ${activeContact.id === contact.id
                                    ? 'bg-white shadow-md border border-slate-100'
                                    : 'hover:bg-white hover:shadow-sm border border-transparent'
                                }`}
                        >
                            <div className="relative shrink-0">
                                <img src={contact.avatar} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" alt={contact.name} />
                                {contact.online && (
                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start mb-1">
                                    <h4 className={`font-bold text-sm ${activeContact.id === contact.id ? 'text-slate-900' : 'text-slate-700'}`}>
                                        {contact.name}
                                    </h4>
                                    <span className="text-xs text-slate-400 font-medium">{contact.time}</span>
                                </div>
                                <p className={`text-xs truncate ${contact.unread > 0 ? 'font-bold text-slate-800' : 'text-slate-500'
                                    }`}>
                                    {contact.lastMsg}
                                </p>
                            </div>
                            {contact.unread > 0 && (
                                <div className="w-5 h-5 bg-primary text-white text-[10px] font-bold flex items-center justify-center rounded-full shadow-sm shadow-indigo-200">
                                    {contact.unread}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Window */}
            <div className="flex-1 flex flex-col bg-white">
                {/* Chat Header */}
                <div className="px-6 py-4 border-b border-slate-50 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-10">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <img src={activeContact.avatar} className="w-10 h-10 rounded-full object-cover" alt={activeContact.name} />
                            {activeContact.online && (
                                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
                            )}
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900 leading-tight">{activeContact.name}</h3>
                            <span className="text-xs font-medium text-green-500 flex items-center gap-1">
                                {activeContact.online ? 'Online' : 'Offline'}
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="p-2 text-slate-400 hover:text-primary hover:bg-slate-50 rounded-full transition-colors">
                            <Phone size={20} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-primary hover:bg-slate-50 rounded-full transition-colors">
                            <Video size={20} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-primary hover:bg-slate-50 rounded-full transition-colors">
                            <MoreVertical size={20} />
                        </button>
                    </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`flex flex-col max-w-[70%] ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}>
                                <div
                                    className={`px-5 py-3.5 rounded-[1.5rem] shadow-sm text-sm leading-relaxed relative group ${msg.sender === 'me'
                                            ? 'bg-gradient-to-br from-primary to-indigo-600 text-white rounded-tr-none'
                                            : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none'
                                        }`}
                                >
                                    {msg.text}

                                    {/* Message tail adjustment would go here via CSS or pseudo-elements if needed */}
                                </div>

                                {msg.image && (
                                    <div className={`mt-2 p-1 bg-white rounded-2xl border border-slate-100 shadow-sm ${msg.sender === 'me' ? 'rounded-tr-none' : 'rounded-tl-none'}`}>
                                        <img src={msg.image} className="max-w-xs rounded-xl" alt="Attachment" />
                                    </div>
                                )}

                                <div className="flex items-center gap-1 mt-1 px-1">
                                    <span className="text-[10px] text-slate-400 font-medium">{msg.time}</span>
                                    {msg.sender === 'me' && (
                                        <CheckCheck size={12} className="text-primary" />
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-slate-50">
                    <form onSubmit={handleSendMessage} className="flex items-end gap-2 bg-slate-50 p-2 rounded-[1.5rem] border border-slate-200 focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/5 transition-all">
                        <button type="button" className="p-3 text-slate-400 hover:text-primary hover:bg-white rounded-full transition-all">
                            <Paperclip size={20} />
                        </button>
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 bg-transparent border-none focus:ring-0 py-3 text-sm font-medium text-slate-700 placeholder:text-slate-400 max-h-32 overflow-y-auto resize-none"
                        />
                        <button type="button" className="p-3 text-slate-400 hover:text-primary hover:bg-white rounded-full transition-all">
                            <Smile size={20} />
                        </button>
                        <button
                            type="submit"
                            disabled={!newMessage.trim()}
                            className="p-3 bg-primary text-white rounded-full shadow-lg shadow-primary/30 hover:shadow-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:shadow-none disabled:active:scale-100"
                        >
                            <Send size={18} className="translate-x-0.5 translate-y-0.5" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Messages;
