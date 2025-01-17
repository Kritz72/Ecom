import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import User from '../models/user.js'; // Adjust the path based on your project structure


const router = express.Router();
router.get('/',(req,res)=>
{
    res.render('login_page');
}
)

router.use(session({
    secret: 'your_secret_key', // Replace with a secure secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));
// Login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find user in the database
        const user = await User.findOne({ username, password });

        if (user) {
            // Save user info, including profile picture, in session
            req.session.username = user.username;
            req.session.email = user.email;
            req.session.createdAt = user.createdAt;
            req.session.profilePic = user.profile_pic; // Store profile picture in session
            req.session.isSeller= user.isSeller;

            return res.redirect('/'); // Redirect to the homepage or another page
        } else {
            return res.status(401).send('Invalid username or password');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('An error occurred during login');
    }
});



// Logout route
router.get('/logout', (req, res) => {
    // Destroy the session
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Failed to log out');
        }
        res.redirect('/'); // Redirect to the homepage or login page
    });
});


export default router;
