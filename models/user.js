import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        
        
        trim: true
    },
    password: {
        type: String,
        
    },
    email: {
        type: String,
        
        unique: true,
        trim: true
    },
    otp: {
        type: Number,
        default: null
    },
    otpExpires: {
        type: Date,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);

export default User;
