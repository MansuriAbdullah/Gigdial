import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const repairSahil = async () => {
    try {
        // Find users named Sahil who are providers but marked as customers/not_submitted
        const query = {
            name: { $regex: 'Sahil', $options: 'i' },
            isProvider: true,
            // role: 'customer' // Optional constraint
        };

        const users = await User.find(query);
        console.log(`Found ${users.length} users to repair.`);

        for (const user of users) {
            console.log(`Repairing user: ${user.name} (${user._id})`);
            user.role = 'worker';
            // If they have docs, set kycStatus to pending if currently not_submitted
            if (user.aadhaarCard || user.panCard) {
                if (user.kycStatus === 'not_submitted') {
                    user.kycStatus = 'pending';
                }
            }
            await user.save();
            console.log('Success!');
        }

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

repairSahil();
