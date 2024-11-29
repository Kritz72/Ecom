import express from 'express';
import session from 'express-session';

const router = express.Router();

// Configure session middleware
router.use(session({
    secret: 'your_secret_key', // Replace with a secure secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

router.get('/', (req, res) => {
    // Check if the user is already logged in
    if (req.session.username) {
        return res.send(`Welcome back, ${req.session.username}!`);
    }
    res.render('login_page');
});

// Login route
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Example: Validate user credentials
    if (username === 'testuser' && password === 'password123') {
        // Save user info in session
        req.session.username = username;
        res.send('Login successful!');
    } else {
        res.status(401).send('Invalid username or password');
    }
});

// Logout route
router.get('/logout', (req, res) => {
    // Destroy the session
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Failed to log out');
        }
        res.send('Logged out successfully!');
    });
});

export default router;
