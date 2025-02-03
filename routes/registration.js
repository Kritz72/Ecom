import express from 'express';
import User from '../models/user.js'; // Adjust the path as necessary
import { generateOtp, sendOtpEmail } from '../Utils/otpUtils.js'; // Adjust the path as necessary

const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, password, email, confirmPassword, otp } = req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
        return res.status(400).send('Passwords do not match.');
    }

    try {
       
        

        // Find the user by email to validate OTP
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send('User not found. Please request a new OTP.');
        }

        // Check if OTP matches and hasn't expired
        if (user.otp !== Number(otp) || user.otpExpires < new Date()) {
            return res.status(400).send('Invalid or expired OTP.');
        }

        // Clear OTP and proceed with registration
        user.username = username;
        user.password = password;
        user.otp = null;
        user.otpExpires = null;

        await user.save();
        res.redirect('/log');
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).send('Error registering user.');
    }
});

router.post('/request-otp', async (req, res) => {
    const { email } = req.body;
    console.log(req);
    const otp = generateOtp();
    const otpExpires = new Date(Date.now() + 10 * 60000);

    try {
        let user = await User.findOne({ email });
        if (!user) {
            user = new User({ email, otp, otpExpires });
            await user.save();
            await sendOtpEmail(email, otp);
            res.status(200).json({ success: true, message: 'OTP sent to email.' });
        } 
        else {
            res.status(200).json({ success: false, message: 'User exist!' });
        };
            
            // user.otp = otp;
            // user.otpExpires = otpExpires;
        

       
        
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({ success: false, message: 'Error sending OTP.' });
    }
});

export default router;
