import express from 'express';
import User from '../models/user.js';

const router = express.Router();

// GET route to display the registration page
router.get('/register', (req, res) => {
    res.render('seller_reg');
});

// POST route to handle form submission
router.post('/register', async (req, res) => {
    try {
        const { username, emailid, storeName, isseller } = req.body;
        const user = await User.findOne({ email: emailid });
        console.log(user);
        if(user!=null){
        user.isSeller= isseller;
        
        user.storename= storeName;

        await user.save();
        req.session.isSeller= user.isSeller;
        }

       
        res.redirect('/'); 
    } catch (error) {
        console.error('Error during seller registration:', error);
        res.status(500).send('Error during registration. Please try again.');
    }
});

export default router;
