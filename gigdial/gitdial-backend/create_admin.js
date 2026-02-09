import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const createOrUpdateAdmin = async () => {
    try {
        // Check if admin exists
        let admin = await User.findOne({ email: 'admin@gigdial.com' });

        if (admin) {
            console.log('Admin user already exists');
            console.log('Email:', admin.email);
            console.log('Password: admin123 (if not changed)');
        } else {
            // Create admin user
            admin = await User.create({
                name: 'Admin User',
                email: 'admin@gigdial.com',
                password: 'admin123',
                isAdmin: true,
                role: 'admin',
                phone: '+919999999999',
                city: 'Delhi'
            });

            console.log('✅ Admin user created successfully!');
            console.log('Email: admin@gigdial.com');
            console.log('Password: admin123');
        }

        process.exit();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

createOrUpdateAdmin();
