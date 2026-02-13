import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const checkUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const users = await User.find({});
        console.log(`Total Users: ${users.length}`);
        users.forEach(u => {
            console.log(`User: ${u.name}, Email: ${u.email}, Role: '${u.role}', isProvider: ${u.isProvider}`);
        });
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

checkUsers();
