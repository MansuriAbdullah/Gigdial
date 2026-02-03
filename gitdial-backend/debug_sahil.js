import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const findSahil = async () => {
    try {
        const users = await User.find({ name: { $regex: 'Sahil', $options: 'i' } });
        console.log('Found Users matching "Sahil":', JSON.stringify(users, null, 2));

        // Also check recent users to see if he used a different name
        const recentUsers = await User.find().sort({ createdAt: -1 }).limit(5);
        console.log('Recent 5 Users:', JSON.stringify(recentUsers, null, 2));

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

findSahil();
