import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import connectDB from './config/db.js';

dotenv.config();

const createAdmin = async () => {
    try {
        await connectDB();

        const adminExists = await User.findOne({ email: 'admin@gigdial.com' });

        if (adminExists) {
            console.log('Admin user already exists');
            process.exit();
        }

        const adminUser = await User.create({
            name: 'Admin User',
            email: 'admin@gigdial.com',
            password: 'admin123', // This will be hashed by the pre-save hook in User model
            isAdmin: true,
            isProvider: false,
        });

        console.log('Admin user created successfully');
        console.log('Email: admin@gigdial.com');
        console.log('Password: admin123');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

createAdmin();
