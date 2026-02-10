import mongoose from 'mongoose';

const contentSchema = mongoose.Schema({
    key: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    section: {
        type: String, // e.g. 'footer', 'about', 'terms'
        required: false,
    }
}, {
    timestamps: true,
});

const Content = mongoose.model('Content', contentSchema);

export default Content;
