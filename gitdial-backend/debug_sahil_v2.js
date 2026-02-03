import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import connectDB from './config/db.js';
import fs from 'fs';

dotenv.config();
connectDB();

const findSahil = async () => {
    try {
        const users = await User.find({ name: { $regex: 'Sahil', $options: 'i' } });
        const recentUsers = await User.find().sort({ createdAt: -1 }).limit(5);

        const output = {
            sahilMatches: users,
            recentUsers: recentUsers
        };

        fs.writeFileSync('sahil_debug_output.json', JSON.stringify(output, null, 2));
        console.log('Debug data written to sahil_debug_output.json');

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

findSahil();
