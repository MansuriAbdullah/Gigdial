import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import connectDB from './config/db.js';

dotenv.config();

const updateAdmin = async () => {
    try {
        await connectDB();

        // 1. Find existing admin by 'isAdmin: true' OR by original email
        // We'll look for any admin user first.
        let admin = await User.findOne({ isAdmin: true });

        if (!admin) {
            // Fallback: look for admin@gigdial.com
            admin = await User.findOne({ email: 'admin@gigdial.com' });
        }

        if (admin) {
            console.log(`Found admin user: ${admin.email}`);
            admin.email = 'newadmin@example.com';
            admin.password = 'newpassword123'; // Pre-save hook will hash this
            await admin.save();
            console.log('Admin credentials updated successfully.');
            console.log('Email: newadmin@example.com');
            console.log('Password: newpassword123');
        } else {
            console.log('No admin user found. Creating one...');
            await User.create({
                name: 'Admin User',
                email: 'newadmin@example.com',
                password: 'newpassword123',
                isAdmin: true,
                isProvider: false
            });
            console.log('Admin user created.');
            console.log('Email: newadmin@example.com');
            console.log('Password: newpassword123');
        }

        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

updateAdmin();
