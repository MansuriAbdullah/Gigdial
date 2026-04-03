import mongoose from 'mongoose';
import Gig from './models/Gig.js';
import User from './models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const checkGigs = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');
        
        const count = await Gig.countDocuments();
        console.log(`Total Gigs: ${count}`);
        
        const allGigs = await Gig.find().populate('user', 'name city');
        allGigs.forEach(g => {
            console.log(`Gig: ${g.title} | Status: ${g.status} | City: ${g.user?.city} | Category: ${g.category}`);
        });

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

checkGigs();
