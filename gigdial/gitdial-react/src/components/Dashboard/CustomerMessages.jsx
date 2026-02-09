import React, { useState } from 'react';
import {
    Search, Phone, Video, MoreVertical, Send, Paperclip,
    Smile, Mic, Image as ImageIcon, ChevronLeft, Check, CheckCheck
} from 'lucide-react';

const CustomerMessages = () => {
    const [activeChat, setActiveChat] = useState(0);
    const [messageInput, setMessageInput] = useState('');
    const [mobileView, setMobileView] = useState('list'); // list or chat

    const contacts = [
        {
            id: 0,
            name: 'Rajesh Kumar',
            role: 'Plumber',
            avatar: 'https://i.pravatar.cc/150?img=11',
            status: 'online',
            lastMessage: "I'll be there by 2 PM tomorrow.",
            time: '10 min ago',
            unread: 2,
            messages: [
                { id: 1, sender: 'them', text: 'Hello! I noticed you booked the plumbing repair service.', time: '10:00 AM' },
                { id: 2, sender: 'me', text: 'Hi Rajesh, yes. The kitchen sink is leaking quite a bit.', time: '10:05 AM' },
                { id: 3, sender: 'them', text: 'No problem. I will bring the necessary tools.', time: '10:06 AM' },
                { id: 4, sender: 'them', text: "I'll be there by 2 PM tomorrow. Please keep the area accessible.", time: '10:15 AM' }
            ]
        },
        {
            id: 1,
            name: 'Amit Sharma',
            role: 'Painter',
            avatar: 'https://i.pravatar.cc/150?img=33',
            status: 'offline',
            lastMessage: 'Quote updated to ₹12,000.',
            time: '1 hour ago',
            unread: 0,
            messages: [
                { id: 1, sender: 'me', text: 'Hi Amit, can you give me a quote for painting 2 bedrooms?', time: 'Yesterday' },
                { id: 2, sender: 'them', text: 'Sure, I can inspect it tomorrow if you are available.', time: 'Yesterday' },
                { id: 3, sender: 'them', text: 'Quote updated to ₹12,000. Includes premium paint and 2 coats.', time: '1:00 PM' }
            ]
        },
        {
            id: 2,
            name: 'Sunita Desai',
            role: 'Cleaning Expert',
            avatar: 'https://i.pravatar.cc/150?img=5',
            status: 'online',
            lastMessage: 'Thank you for the review!',
            time: '2 days ago',
            unread: 0,
            messages: [
                { id: 1, sender: 'me', text: 'Great job with the cleaning yesterday, thank you!', time: 'Monday' },
                { id: 2, sender: 'them', text: 'Thank you for the 5-star review! Happy to serve you again.', time: 'Monday' }
            ]
        },
        {
            id: 3,
            name: 'Reliable Movers',
            role: 'Moving Service',
            avatar: 'https://i.pravatar.cc/150?img=12',
            status: 'offline',
            lastMessage: 'Your booking is confirmed.',
            time: '1 week ago',
            unread: 0,
            messages: [
                { id: 1, sender: 'them', text: 'Your booking is confirmed for next Saturday.', time: 'Last Week' }
            ]
        }
    ];

    const currentChat = contacts[activeChat];

    const handleSendMessage = (e) => {
        e.preventDefault();
        setMessageInput('');
        // Logic to send message would go here
    };

    const handleContactClick = (index) => {
        setActiveChat(index);
        setMobileView('chat');
    };

    return (
        <div className="h-[calc(100vh-140px)] bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden flex animate-fade-in">
            {/* Sidebar / Contact List */}
            <div className={`w-full md:w-80 lg:w-96 border-r border-slate-100 flex flex-col bg-slate-50/50 ${mobileView === 'chat' ? 'hidden md:flex' : 'flex'}`}>
                <div className="p-6 border-b border-slate-100 bg-white">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Messages</h2>
                    <div className="relative">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search chats..."
                            className="w-full bg-slate-100 border-none rounded-xl pl-10 pr-4 py-3 text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-slate-400"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-2">
                    {contacts.map((contact, index) => (
                        <div
                            key={index}
                            onClick={() => handleContactClick(index)}
                            className={`p-4 rounded-2xl cursor-pointer transition-all duration-200 group ${activeChat === index
                                    ? 'bg-white shadow-md shadow-slate-200/50 border border-slate-100'
                                    : 'hover:bg-white hover:shadow-sm border border-transparent'
                                }`}
                        >
                            <div className="flex gap-4">
                                <div className="relative shrink-0">
                                    <img src={contact.avatar} alt={contact.name} className="w-12 h-12 rounded-full object-cover" />
                                    {contact.status === 'online' && (
                                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-baseline mb-0.5">
                                        <h3 className={`font-bold text-sm truncate ${activeChat === index ? 'text-slate-900' : 'text-slate-700'}`}>{contact.name}</h3>
                                        <span className="text-xs text-slate-400">{contact.time}</span>
                                    </div>
                                    <p className="text-xs text-slate-500 mb-1">{contact.role}</p>
                                    <div className="flex justify-between items-center">
                                        <p className={`text-sm truncate pr-2 ${activeChat === index ? 'text-slate-600 font-medium' : 'text-slate-400'}`}>
                                            {contact.lastMessage}
                                        </p>
                                        {contact.unread > 0 && (
                                            <span className="bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                                                {contact.unread}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className={`flex-1 flex flex-col bg-white ${mobileView === 'list' ? 'hidden md:flex' : 'flex'}`}>
                {/* Chat Header */}
                <div className="h-20 px-6 border-b border-slate-100 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-10">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setMobileView('list')} className="md:hidden p-2 -ml-2 text-slate-500 hover:text-slate-800">
                            <ChevronLeft size={24} />
                        </button>
                        <div className="relative">
                            <img src={currentChat.avatar} alt={currentChat.name} className="w-10 h-10 rounded-full object-cover" />
                            {currentChat.status === 'online' && (
                                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
                            )}
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900 leading-tight">{currentChat.name}</h3>
                            <p className="text-xs text-slate-500 font-medium">{currentChat.role} • {currentChat.status === 'online' ? 'Online' : 'Offline'}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="p-2.5 text-slate-400 hover:text-primary hover:bg-slate-50 rounded-xl transition-all">
                            <Phone size={20} />
                        </button>
                        <button className="p-2.5 text-slate-400 hover:text-primary hover:bg-slate-50 rounded-xl transition-all">
                            <Video size={20} />
                        </button>
                        <button className="p-2.5 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-xl transition-all">
                            <MoreVertical size={20} />
                        </button>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#F8FAFC]">
                    {currentChat.messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`flex flex-col max-w-[80%] md:max-w-[60%] ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}>
                                <div className={`px-5 py-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.sender === 'me'
                                        ? 'bg-slate-900 text-white rounded-tr-sm'
                                        : 'bg-white text-slate-700 border border-slate-100 rounded-tl-sm'
                                    }`}>
                                    {msg.text}
                                </div>
                                <div className="flex items-center gap-1 mt-1.5 px-1">
                                    <span className="text-[10px] text-slate-400 font-medium">{msg.time}</span>
                                    {msg.sender === 'me' && <CheckCheck size={12} className="text-primary" />}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-slate-100">
                    <form onSubmit={handleSendMessage} className="flex items-end gap-2 bg-slate-50 rounded-2xl p-2 border border-slate-100 focus-within:ring-2 focus-within:ring-primary/10 transition-all">
                        <button type="button" className="p-3 text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 rounded-xl transition-colors">
                            <Paperclip size={20} />
                        </button>
                        <textarea
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 bg-transparent border-none outline-none text-slate-700 text-sm font-medium placeholder:text-slate-400 py-3 max-h-32 resize-none"
                            rows="1"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSendMessage(e);
                                }
                            }}
                        />
                        <button type="button" className="p-3 text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 rounded-xl transition-colors">
                            <Smile size={20} />
                        </button>
                        <button type="submit" className={`p-3 rounded-xl transition-all shadow-md ${messageInput.trim()
                                ? 'bg-primary text-white hover:bg-primary-dark shadow-primary/20'
                                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                            }`} disabled={!messageInput.trim()}>
                            <Send size={20} />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CustomerMessages;
