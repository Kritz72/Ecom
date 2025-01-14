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
    profile_pic: {
        type:String,
        default:null
    },
    contact_num: {
        type: Number,
        default: null
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
