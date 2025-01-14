import express from 'express';
import Seller from '../models/seller.js'; // Assume you have a Seller model

const router = express.Router();

// GET route to display the registration page
router.get('/register', (req, res) => {
    res.render('seller_registration');
});

// POST route to handle form submission
router.post('/register', async (req, res) => {
    try {
        const { username, email, password, storeName, address } = req.body;

        // Save seller to the database
        const newSeller = new Seller({
            username,
            email,
            password, // You should hash this before saving
            storeName,
            address,
        });

        await newSeller.save();
        res.redirect('/log'); // Redirect to login after registration
    } catch (error) {
        console.error('Error during seller registration:', error);
        res.status(500).send('Error during registration. Please try again.');
    }
});

export default router;
