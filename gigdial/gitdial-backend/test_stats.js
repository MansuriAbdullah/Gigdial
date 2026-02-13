import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const testStats = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        const totalCustomers = await User.countDocuments({ role: { $nin: ['worker', 'admin'] } });
        console.log('Total Customers (Backend Logic):', totalCustomers);

        const allUsers = await User.find({});
        const frontendCustomers = allUsers.filter(u => u.role === 'customer' || (!u.role && !u.isProvider));
        console.log('Total Customers (Frontend Logic):', frontendCustomers.length);

        console.log('Backend vs Frontend Match:', totalCustomers === frontendCustomers.length);

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

testStats();
