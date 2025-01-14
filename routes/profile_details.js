import express from 'express';

import upload from '../middleware/multer.js'; 
import User from '../models/user.js'; // Make sure to import your User model

const router = express.Router();


router.get('/', (req, res) => {

    if (req.session.username) {
        // Render the profile page and pass session data
        res.render('profile', { session: req.session,error: '' });

    } else {
        // Redirect to login page if user is not logged in
        res.redirect('/log');
    }
});

// Route to handle profile update
router.post('/update', upload.single('profile-picture'), async (req, res) => {
    try {
        
        const { contact_number } = req.body;
        const userId = req.session.userId; // Assuming user ID is stored in session
        const user = await User.findOne({ username: req.session.username });

        // Find the user by ID and update the profile
        
         
            user.contact_num= contact_number;
            

        // If a profile picture is uploaded, include it in the update data
        if (req.file) {
            user.profile_pic = `/uploads/${req.file.filename}`;
        }

        await user.save();
       

        res.redirect('/profile'); // Redirect back to the profile page
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).send('An error occurred while updating the profile.');
    }
    
});
router.post('/change-password', async (req, res) => {
    try {
        const { current_password, new_password } = req.body;
        const user = await User.findOne({ username: req.session.username });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if the current password matches the stored password
        if (current_password !== user.password) {
            return res.status(400).json({ error: 'Current password is incorrect' });
        }

        // Validate new password
        if (new_password.length < 8) {
            return res.status(400).json({ error: 'New password must be at least 8 characters long' });
        }

        // Update the user's password
        user.password = new_password;
        await user.save();

        res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        console.error('Error changing password:', error);
        res.status(500).json({ error: 'An error occurred while changing the password.' });
    }
});




export default router;

