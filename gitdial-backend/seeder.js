import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Gig from './models/Gig.js';
import Order from './models/Order.js';
import connectDB from './config/db.js';

dotenv.config();

const importData = async () => {
    try {
        await connectDB();

        // 1. Create Users (Admin, Provider, Customer)
        let adminUser = await User.findOne({ email: 'admin@gigdial.com' });
        if (!adminUser) {
            adminUser = await User.create({
                name: 'Admin User',
                email: 'admin@gigdial.com',
                password: 'admin123',
                isAdmin: true,
                isProvider: false,
            });
            console.log('Admin user created');
        } else {
            console.log('Admin user already exists');
        }

        let providerUser = await User.findOne({ email: 'provider@gigdial.com' });
        if (!providerUser) {
            providerUser = await User.create({
                name: 'John Developer',
                email: 'provider@gigdial.com',
                password: 'password123',
                isAdmin: false,
                isProvider: true,
                skills: ['React', 'Node.js', 'MongoDB'],
                city: 'Tech City',
            });
            console.log('Provider user created');
        } else {
            console.log('Provider user already exists');
        }

        let customerUser = await User.findOne({ email: 'customer@gigdial.com' });
        if (!customerUser) {
            customerUser = await User.create({
                name: 'Jane Client',
                email: 'customer@gigdial.com',
                password: 'password123',
                isAdmin: false,
                isProvider: false,
                city: 'Business Town',
            });
            console.log('Customer user created');
        } else {
            console.log('Customer user already exists');
        }

        // 2. Create Gigs for the Provider
        const gigTitle = 'Full Stack Web Development';
        let sampleGig = await Gig.findOne({ title: gigTitle });

        if (!sampleGig) {
            sampleGig = await Gig.create({
                user: providerUser._id,
                title: gigTitle,
                description: 'I will build a complete full stack web application using MERN stack.',
                category: 'Programming & Tech',
                price: 500,
                deliveryTime: 7,
                revisions: 3,
                image: '/uploads/sample-gig.jpg', // Placeholder
                rating: 4.5,
                numReviews: 0,
            });
            console.log('Sample Gig created');
        } else {
            console.log('Sample Gig already exists');
        }

        // 3. Create Order (Customer buys Gig)
        // Check if this user has already ordered this gig (just a simple check logic)
        let sampleOrder = await Order.findOne({ user: customerUser._id, gig: sampleGig._id });

        if (!sampleOrder) {
            await Order.create({
                user: customerUser._id,
                gig: sampleGig._id,
                seller: providerUser._id,
                paymentMethod: 'PayPal',
                taxPrice: 50,
                totalPrice: 550,
                isPaid: true,
                paidAt: Date.now(),
                isDelivered: false,
            });
            console.log('Sample Order created');
        } else {
            console.log('Sample Order already exists');
        }

        console.log('Data Imported Successfully!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await connectDB();
        await Order.deleteMany();
        await Gig.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
