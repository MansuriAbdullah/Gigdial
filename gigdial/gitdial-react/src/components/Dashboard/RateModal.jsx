import React, { useState } from 'react';
import { Star, X } from 'lucide-react';

const RateModal = ({ isOpen, onClose, onSubmit, order }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [hoveredStar, setHoveredStar] = useState(0);

    if (!isOpen) return null;

    const handleSubmit = () => {
        if (rating === 0) {
            alert('Please select a rating');
            return;
        }
        onSubmit(order._id, rating, comment);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-slate-900">Rate Service</h3>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                        <X size={20} className="text-slate-500" />
                    </button>
                </div>

                <div className="p-8 flex flex-col items-center">
                    <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center text-3xl font-bold text-blue-600 mb-4">
                        {order.workerName?.charAt(0)}
                    </div>
                    <h4 className="text-lg font-bold text-slate-900">{order.workerName}</h4>
                    <p className="text-slate-500 text-sm mb-8">{order.serviceName}</p>

                    <div className="flex gap-2 mb-8">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                onMouseEnter={() => setHoveredStar(star)}
                                onMouseLeave={() => setHoveredStar(0)}
                                onClick={() => setRating(star)}
                                className="transition-transform hover:scale-110 focus:outline-none"
                            >
                                <Star
                                    size={32}
                                    className={`${star <= (hoveredStar || rating)
                                            ? 'text-yellow-400 fill-yellow-400'
                                            : 'text-slate-200 fill-slate-50'
                                        } transition-colors`}
                                />
                            </button>
                        ))}
                    </div>

                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Share your experience..."
                        className="w-full h-32 p-4 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-blue-500 resize-none mb-6"
                    />

                    <button
                        onClick={handleSubmit}
                        className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
                    >
                        Submit Review
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RateModal;
