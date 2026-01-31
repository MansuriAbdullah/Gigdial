import React from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const WhatsAppWidget = () => {
    return (
        <motion.a
            href="https://wa.me/919876543210" // Replace with actual number
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
            whileHover={{ scale: 1.1 }}
            className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-green-500 text-white rounded-full shadow-lg shadow-green-500/30 hover:bg-green-600 transition-colors cursor-pointer group"
        >
            <MessageCircle size={28} />

            {/* Tooltip */}
            <span className="absolute right-full mr-3 px-3 py-1.5 bg-white text-slate-700 text-sm font-bold rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Chat with Support
            </span>

            {/* Ripple Effect */}
            <span className="absolute inset-0 rounded-full border-2 border-green-500 opacity-75 animate-ping"></span>
        </motion.a>
    );
};

export default WhatsAppWidget;
