import mongoose from 'mongoose';

const favoriteSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    // Can store either Gig OR Worker
    gig: { type: mongoose.Schema.Types.ObjectId, ref: 'Gig' },
    worker: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

const Favorite = mongoose.model('Favorite', favoriteSchema);

export default Favorite;
