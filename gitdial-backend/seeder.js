import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import Gig from './models/Gig.js';
import Order from './models/Order.js';
import Review from './models/Review.js';
import Portfolio from './models/Portfolio.js';
import Wallet from './models/Wallet.js';
import Message from './models/Message.js';
import Notification from './models/Notification.js';
import Dispute from './models/Dispute.js';
import Favorite from './models/Favorite.js';
import Category from './models/Category.js';
import Conversation from './models/Conversation.js';
import connectDB from './config/db.js';

dotenv.config();

const users = [
    {
        name: 'Admin User',
        email: 'admin@gigdial.com',
        password: 'password123',
        role: 'admin',
        isAdmin: true,
        isProvider: false,
    },
    {
        name: 'John Dev',
        email: 'john@gigdial.com',
        password: 'password123',
        role: 'worker',
        isAdmin: false,
        isProvider: true,
        skills: ['React', 'Node.js', 'MongoDB', 'Express'],
        city: 'San Francisco',
        bio: 'Senior Full Stack Developer with 5 years of experience.',
        isVerified: true,
    },
    {
        name: 'Alice Design',
        email: 'alice@gigdial.com',
        password: 'password123',
        role: 'worker',
        isAdmin: false,
        isProvider: true,
        skills: ['Photoshop', 'Illustrator', 'Figma'],
        city: 'New York',
        bio: 'Creative Graphic Designer passionate about brand identity.',
        isVerified: true,
    },
    {
        name: 'Bob Writer',
        email: 'bob@gigdial.com',
        password: 'password123',
        role: 'worker',
        isAdmin: false,
        isProvider: true,
        skills: ['SEO', 'Copywriting', 'Content Marketing'],
        city: 'London',
        bio: 'Professional writer with a knack for storytelling.',
        isVerified: true,
    },
    {
        name: 'Emma Client',
        email: 'emma@gigdial.com',
        password: 'password123',
        role: 'customer',
        isAdmin: false,
        isProvider: false,
        city: 'Austin',
        walletBalance: 1000,
    },
    {
        name: 'David Customer',
        email: 'david@gigdial.com',
        password: 'password123',
        role: 'customer',
        isAdmin: false,
        isProvider: false,
        city: 'Berlin',
        walletBalance: 500,
    }
];

const portfolios = [
    {
        workerIndex: 1, // John
        title: 'E-commerce Platform',
        description: 'A full-featured e-commerce site built with MERN.',
        images: ['https://placehold.co/600x400/png'],
        link: 'https://github.com/john/ecommerce'
    },
    {
        workerIndex: 2, // Alice
        title: 'Brand Identity for Coffee Shop',
        description: 'Logo, menu, and packaging design.',
        images: ['https://placehold.co/600x400/png'],
        link: 'https://behance.net/alice/coffee'
    }
];

const gigs = [
    {
        workerIndex: 1, // John
        title: 'I will build a complete MERN stack application',
        description: 'Get a professional web application built with MongoDB, Express, React, and Node.js.',
        category: 'Programming & Tech',
        subCategory: 'Web Development',
        tags: ['web', 'mern', 'fullstack'],
        price: 500,
        deliveryTime: 7,
        revisions: 3,
        coverImage: 'https://placehold.co/600x400?text=MERN+Gig',
        isActive: true,
        status: 'approved'
    },
    {
        workerIndex: 1, // John
        title: 'I will fix bugs in your React app',
        description: 'Expert debugging for React applications.',
        category: 'Programming & Tech',
        subCategory: 'Web Development',
        tags: ['react', 'bugfix'],
        price: 100,
        deliveryTime: 2,
        revisions: 1,
        coverImage: 'https://placehold.co/600x400?text=React+Fix',
        isActive: true,
        status: 'approved'
    },
    {
        workerIndex: 2, // Alice
        title: 'I will design a modern minimalist logo',
        description: 'Unique and timeless logo design for your brand.',
        category: 'Graphics & Design',
        subCategory: 'Logo Design',
        tags: ['logo', 'minimalist', 'design'],
        price: 150,
        deliveryTime: 4,
        revisions: 5,
        coverImage: 'https://placehold.co/600x400?text=Logo+Gig',
        isActive: true,
        status: 'approved'
    },
    {
        workerIndex: 3, // Bob
        title: 'I will write SEO optimized blog posts',
        description: 'High quality content to rank your website higher.',
        category: 'Writing & Translation',
        subCategory: 'Blog Posts',
        tags: ['seo', 'writing', 'blog'],
        price: 50,
        deliveryTime: 3,
        revisions: 2,
        coverImage: 'https://placehold.co/600x400?text=Writing+Gig',
        isActive: true,
        status: 'approved'
    }
];

const importData = async () => {
    try {
        console.log('Connecting to DB...');
        await connectDB();

        console.log('Deleting old data...');
        // CLEANUP
        await Order.deleteMany();
        await Gig.deleteMany();
        await User.deleteMany();
        await Review.deleteMany();
        await Portfolio.deleteMany();
        await Wallet.deleteMany();
        await Message.deleteMany();
        await Notification.deleteMany();
        await Dispute.deleteMany();
        await Favorite.deleteMany();
        await Category.deleteMany();
        await Conversation.deleteMany(); // Added new cleanup

        console.log('Data Destroyed. Starting Import...');

        // 1. CREATE USERS
        console.log('Creating Users...');
        const createdUsers = await User.create(users);
        console.log(`Created ${createdUsers.length} users.`);

        // 2. CREATE CATEGORIES
        console.log('Creating Categories...');
        const categories = [
            { name: 'Programming & Tech', slug: 'programming-tech' },
            { name: 'Graphics & Design', slug: 'graphics-design' },
            { name: 'Writing & Translation', slug: 'writing-translation' },
            { name: 'Digital Marketing', slug: 'digital-marketing' },
            { name: 'Video & Animation', slug: 'video-animation' },
            { name: 'Music & Audio', slug: 'music-audio' }
        ];
        await Category.insertMany(categories);
        console.log(`Created ${categories.length} categories.`);

        // 3. CREATE PORTFOLIOS
        console.log('Creating Portfolios...');
        const portfolioDocs = [];
        for (const p of portfolios) {
            portfolioDocs.push({
                ...p,
                worker: createdUsers[p.workerIndex]._id,
                status: 'approved'
            });
        }
        await Portfolio.insertMany(portfolioDocs);
        console.log(`Created ${portfolioDocs.length} portfolio items.`);

        // 4. CREATE GIGS
        console.log('Creating Gigs...');
        const gigDocs = [];
        for (const g of gigs) {
            gigDocs.push({
                ...g,
                user: createdUsers[g.workerIndex]._id
            });
        }
        const createdGigs = await Gig.insertMany(gigDocs);
        console.log(`Created ${createdGigs.length} gigs.`);

        // 5. CREATE ORDERS
        console.log('Creating Orders...');
        // Emma (4) buys John's MERN Gig (0) - Completed
        const order1 = new Order({
            customer: createdUsers[4]._id, // Emma
            user: createdUsers[4]._id, // Emma (as user field in schema)
            worker: createdUsers[1]._id, // John
            seller: createdUsers[1]._id, // John
            gig: createdGigs[0]._id,
            amount: 500,
            tax: 25,
            totalAmount: 525,
            paymentMethod: 'wallet',
            isPaid: true,
            paidAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
            status: 'completed',
            requirements: 'Build a shop similar to Amazon',
            deliveryFile: 'https://github.com/john/amazon-clone',
            deliveredAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
            completedAt: Date.now(),
        });
        await order1.save();

        // David (5) buys Alice's Logo Gig (2) - Pending
        const order2 = new Order({
            customer: createdUsers[5]._id,
            user: createdUsers[5]._id,
            worker: createdUsers[2]._id,
            seller: createdUsers[2]._id,
            gig: createdGigs[2]._id,
            amount: 150,
            tax: 7.5,
            totalAmount: 157.5,
            paymentMethod: 'PayPal',
            isPaid: true,
            paidAt: Date.now(),
            status: 'in_progress',
            requirements: 'Logo for a tech startup named "Verita"',
        });
        await order2.save();
        console.log('Created Orders.');

        // 6. CREATE REVIEWS
        console.log('Creating Reviews...');
        // Emma reviews John
        const review1 = new Review({
            order: order1._id,
            gig: createdGigs[0]._id,
            reviewer: createdUsers[4]._id,
            worker: createdUsers[1]._id,
            rating: 5,
            comment: 'Excellent work! Delivered on time and exceeded expectations.',
        });
        await review1.save();
        console.log('Created Reviews.');

        // Update John's stats
        console.log('Updating stats...');
        const john = createdUsers[1];
        john.numReviews = 1;
        john.rating = 5;
        john.walletBalance += 500; // Crediting earnings
        await john.save();

        const gig0 = createdGigs[0];
        gig0.numReviews = 1;
        gig0.rating = 5;
        gig0.salesCount = 1;
        await gig0.save();

        // 7. CREATE WALLET TRANSACTIONS
        console.log('Creating Wallet Transactions...');
        await Wallet.create([
            {
                user: createdUsers[4]._id,
                type: 'credit',
                amount: 1000,
                description: 'Initial Deposit',
                status: 'success'
            },
            {
                user: createdUsers[4]._id,
                type: 'debit',
                amount: 525,
                description: 'Payment for Order #' + order1._id,
                order: order1._id,
                status: 'success'
            },
            {
                user: createdUsers[1]._id,
                type: 'credit',
                amount: 500,
                description: 'Earnings from Order #' + order1._id,
                order: order1._id,
                status: 'success'
            }
        ]);
        console.log('Created Wallet Transactions.');

        // 8. CREATE CONVERSATION
        console.log('Creating Conversation...');
        await Conversation.create({
            members: [createdUsers[4]._id, createdUsers[1]._id], // Emma and John
            lastMessage: 'Hello, can you help me with a project?',
            isRead: false
        });
        console.log('Created Conversation.');

        console.log('Data Imported Successfully!');
        process.exit();
    } catch (error) {
        console.error(`Error Step: ${error.message}`);
        console.error(`Error Stack: ${error.stack}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await connectDB();
        await Order.deleteMany();
        await Gig.deleteMany();
        await User.deleteMany();
        await Review.deleteMany();
        await Portfolio.deleteMany();
        await Wallet.deleteMany();
        await Message.deleteMany();
        await Notification.deleteMany();
        await Dispute.deleteMany();
        await Favorite.deleteMany();

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
