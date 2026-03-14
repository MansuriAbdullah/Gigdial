import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Gig from './models/Gig.js';
import Wallet from './models/Wallet.js';
import connectDB from './config/db.js';

dotenv.config();

const mockWorkers = [
    {
        name: 'Rahul Sharma',
        email: 'rahul@example.com',
        password: 'password123',
        phone: '9876543210',
        city: 'Mumbai',
        role: 'worker',
        isProvider: true,
        category: 'Driver',
        skills: ['Driving', 'Valet', 'Chauffeur'],
        experience: 5,
        bio: 'Professional driver with 5 years of experience in luxury car chauffeuring.',
        isApproved: true,
        rating: 4.8,
        numReviews: 12,
        profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80'
    },
    {
        name: 'Amit Patel',
        email: 'amit@example.com',
        password: 'password123',
        phone: '9876543211',
        city: 'Mumbai',
        role: 'worker',
        isProvider: true,
        category: 'Plumber',
        skills: ['Plumbing', 'Pipe Repair', 'Leakage Fix'],
        experience: 8,
        bio: 'Expert plumber specializing in home maintenance and emergency repairs.',
        isApproved: true,
        rating: 4.9,
        numReviews: 45,
        profileImage: 'https://images.unsplash.com/photo-1540560086596-65c2962153ad?auto=format&fit=crop&w=400&q=80'
    },
    {
        name: 'Priya Singh',
        email: 'priya@example.com',
        password: 'password123',
        phone: '9876543212',
        city: 'Mumbai',
        role: 'worker',
        isProvider: true,
        category: 'Fitness',
        skills: ['Yoga', 'Zumba', 'Personal Training'],
        experience: 4,
        bio: 'Certified fitness trainer passionate about holistic wellness and yoga.',
        isApproved: true,
        rating: 4.7,
        numReviews: 28,
        profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80'
    },
    {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        phone: '9876543213',
        city: 'Mumbai',
        role: 'worker',
        isProvider: true,
        category: 'IT Support',
        skills: ['Hardware Repair', 'Software Install', 'Network Setup'],
        experience: 6,
        bio: 'Tech enthusiast providing reliable IT support and computer repairs.',
        isApproved: true,
        rating: 4.6,
        numReviews: 15,
        profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80'
    },
    {
        name: 'Suresh Kumar',
        email: 'suresh@example.com',
        password: 'password123',
        phone: '9876543214',
        city: 'Mumbai',
        role: 'worker',
        isProvider: true,
        category: 'House Help',
        skills: ['Cleaning', 'Cooking', 'Housekeeping'],
        experience: 10,
        bio: 'Experienced housekeeper offering reliable cleaning and cooking services.',
        isApproved: true,
        rating: 4.5,
        numReviews: 52,
        profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
    }
];

const mockGigs = [
    {
        title: 'Professional Home Plumbing',
        description: 'Complete plumbing solutions including leak repairs and pipe installations.',
        price: 500,
        category: 'Plumber',
        deliveryTime: 2,
        status: 'active'
    },
    {
        title: 'Yoga & Wellness Classes',
        description: 'Daily yoga sessions focusing on flexibility and mental health.',
        price: 800,
        category: 'Fitness',
        deliveryTime: 1,
        status: 'active'
    },
    {
        title: 'Luxury Car Chauffeur',
        description: 'Safe and reliable driving services for corporate and personal needs.',
        price: 1200,
        category: 'Driver',
        deliveryTime: 4,
        status: 'active'
    }
];

const seedData = async () => {
    try {
        await connectDB();

        // Clear existing data (optional, but good for clean seed)
        // await User.deleteMany({ role: 'worker' });
        // await Gig.deleteMany({});

        console.log('Seeding workers...');
        const createdWorkers = [];
        for (const worker of mockWorkers) {
            const existing = await User.findOne({ email: worker.email });
            if (!existing) {
                const newUser = await User.create(worker);
                await Wallet.create({ user: newUser._id, balance: 0 });
                createdWorkers.push(newUser);
                console.log(`Created worker: ${worker.name}`);
            } else {
                // Update existing worker with new images/bio
                const updated = await User.findOneAndUpdate(
                    { email: worker.email },
                    { $set: worker },
                    { new: true }
                );
                createdWorkers.push(updated);
                console.log(`Updated worker: ${worker.name}`);
            }
        }

        console.log('Seeding gigs...');
        for (let i = 0; i < mockGigs.length; i++) {
            const gig = mockGigs[i];
            const worker = createdWorkers[i % createdWorkers.length];

            const existingGig = await Gig.findOne({ title: gig.title });
            if (!existingGig) {
                await Gig.create({
                    ...gig,
                    user: worker._id
                });
                console.log(`Created gig: ${gig.title}`);
            }
        }

        console.log('Data seeded successfully!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedData();
