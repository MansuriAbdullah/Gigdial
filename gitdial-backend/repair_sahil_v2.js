import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const repairSahil = async () => {
    try {
        const query = { name: { $regex: 'Sahil', $options: 'i' } };
        const users = await User.find(query);

        console.log(`Found ${users.length} users to repair.`);

        for (const user of users) {
            console.log(`Processing: ${user.name}`);

            // Repair Role
            if (user.isProvider && user.role === 'customer') {
                user.role = 'worker';
                console.log('-> Fixed Role');
            }

            // Repair KYC Status
            if (user.isProvider && (user.aadhaarCard || user.panCard)) {
                if (user.kycStatus === 'not_submitted') {
                    user.kycStatus = 'pending';
                    console.log('-> Fixed KYC Status');
                }
            }

            await user.save();
            console.log('Saved!');
        }
        process.exit();
    } catch (error) {
        console.error("Critical Error:", error.message);
        if (error.errors) console.error("Validation Errors:", JSON.stringify(error.errors, null, 2));
        process.exit(1);
    }
};

repairSahil();
