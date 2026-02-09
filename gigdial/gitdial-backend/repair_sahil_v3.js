import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const repairSahil = async () => {
    try {
        const query = { name: { $regex: 'Sahil', $options: 'i' } };

        // Use updateMany/One to set role='worker' and kycStatus='pending'
        // This is necessary because the previous logic assigned them 'customer' and 'not_submitted'
        const result = await User.updateMany(
            query,
            {
                $set: {
                    role: 'worker',
                    kycStatus: 'pending',
                    isProvider: true
                }
            }
        );

        console.log('Update result:', result);

        process.exit();
    } catch (error) {
        console.error("Critical Error:", error.message);
        process.exit(1);
    }
};

repairSahil();
