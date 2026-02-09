import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Maximize2, Image as ImageIcon } from 'lucide-react';

const mockPortfolio = [
    {
        id: 1,
        provider: "Arjun Singh",
        title: "Modern Kitchen Renovation",
        description: "Complete overhaul of a 200sqft kitchen with modular fittings.",
        image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80",
        date: "Today, 10:30 AM"
    },
    {
        id: 2,
        provider: "Sarah Wilson",
        title: "Logo Design Collection",
        description: "Minimalist logo designs for tech startups.",
        image: "https://images.unsplash.com/photo-1626785774573-4b799314346d?auto=format&fit=crop&w=600&q=80",
        date: "Yesterday, 4:15 PM"
    },
    {
        id: 3,
        provider: "Mohd. Irfan",
        title: "Event Decoration",
        description: "Floral arrangement for a wedding reception.",
        image: "https://images.unsplash.com/photo-1519225421980-715cb0202128?auto=format&fit=crop&w=600&q=80",
        date: "Yesterday, 2:00 PM"
    },
    {
        id: 4,
        provider: "Anita Roy",
        title: "Portrait Photography",
        description: "Outdoor portrait session during golden hour.",
        image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&q=80",
        date: "23 Jan, 11:00 AM"
    }
];

const PortfolioApprovals = () => {
    const [items, setItems] = useState(mockPortfolio);

    const handleAction = (id) => {
        setItems(items.filter(i => i.id !== id));
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">Portfolio Approvals</h1>
                <p className="text-slate-500 mt-2">Validate work samples uploaded by workers.</p>
            </div>

            <div className="masonry-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                    {items.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                            transition={{ delay: index * 0.1 }}
                            layout
                            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 group relative"
                        >
                            <div className="relative aspect-[4/3] overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        <div className="flex justify-between items-center gap-4">
                                            <button
                                                onClick={() => handleAction(item.id)}
                                                className="flex-1 bg-white/20 backdrop-blur-md hover:bg-red-500 hover:text-white text-white py-2 rounded-lg font-bold transition-colors flex items-center justify-center gap-2"
                                            >
                                                <X size={16} /> Reject
                                            </button>
                                            <button
                                                onClick={() => handleAction(item.id)}
                                                className="flex-1 bg-white text-slate-900 hover:bg-green-500 hover:text-white py-2 rounded-lg font-bold transition-colors flex items-center justify-center gap-2 shadow-lg"
                                            >
                                                <Check size={16} /> Approve
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <button className="p-2 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white hover:text-slate-900 transition-colors">
                                        <Maximize2 size={18} />
                                    </button>
                                </div>
                            </div>

                            <div className="p-5">
                                <h3 className="font-bold text-lg text-slate-900 mb-1">{item.title}</h3>
                                <p className="text-slate-500 text-sm mb-3 line-clamp-2">{item.description}</p>
                                <div className="flex items-center justify-between text-xs font-medium text-slate-400 border-t border-slate-50 pt-3">
                                    <span>by {item.provider}</span>
                                    <span>{item.date}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {items.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="col-span-full py-24 text-center"
                    >
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <ImageIcon size={32} className="text-slate-300" />
                        </div>
                        <p className="text-slate-500 font-medium">No new photos to review</p>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default PortfolioApprovals;
