import mongoose from 'mongoose';

const citySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
}, {
    timestamps: true,
});

const City = mongoose.model('City', citySchema);

export default City;
