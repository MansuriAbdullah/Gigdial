import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const checkAdmin = async () => {
    try {
        const adminUser = await User.findOne({ email: 'admin@gigdial.com' });

        if (adminUser) {
            console.log('Admin user found:');
            console.log('Email:', adminUser.email);
            console.log('isAdmin:', adminUser.isAdmin);
            console.log('Name:', adminUser.name);
        } else {
            console.log('No admin user found with email admin@gigdial.com');

            // Check all users with isAdmin true
            const allAdmins = await User.find({ isAdmin: true });
            console.log('\nAll admin users:', allAdmins.length);
            allAdmins.forEach(admin => {
                console.log(`- ${admin.email} (${admin.name})`);
            });
        }

        process.exit();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

checkAdmin();
