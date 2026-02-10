import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: false,
    },
    city: {
        type: String,
        required: false,
    },
    address: {
        type: String,
        required: false,
    },
    skills: [{
        type: String,
    }],
    aadhaarCard: {
        type: String,
        required: false,
    },
    panCard: {
        type: String,
        required: false,
    },
    profileImage: {
        type: String,
        required: false,
    },
    savedAddresses: [{
        type: {
            type: String,
            enum: ['home', 'work', 'other'],
            default: 'home'
        },
        name: String,
        phone: String,
        addressLine1: String,
        addressLine2: String,
        city: String,
        state: String,
        pincode: String,
        isDefault: {
            type: Boolean,
            default: false
        }
    }],
    isProvider: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
    role: {
        type: String,
        enum: ['customer', 'worker', 'admin'],
        default: 'customer'
    },
    kycStatus: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    isApproved: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
});

// Method to check password match
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Middleware to hash password before saving
userSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return;
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;
