import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Wallet from './models/Wallet.js';
import connectDB from './config/db.js';

dotenv.config();

const createWorker = async () => {
    try {
        await connectDB();

        const email = 'worker@gigdial.com';

        let worker = await User.findOne({ email });

        if (worker) {
            console.log('Worker already exists, updating role...');
            worker.isProvider = true;
            worker.skills = worker.skills.length ? worker.skills : ['Plumbing', 'Electrical'];
            worker.password = 'worker123';
            await worker.save();
        } else {
            console.log('Creating new worker...');
            worker = await User.create({
                name: 'Test Worker',
                email: email,
                password: 'worker123', // Will be hashed by pre-save hook
                phone: '9876543210',
                city: 'Mumbai',
                address: '123 Worker Lane, Andheri West',
                skills: ['Plumbing', 'Electrical'],
                isProvider: true,
                role: 'worker',
                isApproved: true // Auto-approve for testing dashboard access
            });
        }

        // Ensure wallet exists
        const wallet = await Wallet.findOne({ user: worker._id });
        if (!wallet) {
            await Wallet.create({ user: worker._id, balance: 500 }); // Give some starting balance
        }

        console.log('Worker credentials set:');
        console.log(`Email: ${email}`);
        console.log('Password: worker123');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

createWorker();
