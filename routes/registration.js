import express, { Router } from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import User from '../models/user.js';

const router = express.Router();
router.get('/',(req,res)=>
{
    res.render('registration');
}
)
router.post('/register', async (req, res) => {
    const { username, password, email, confirmPassword } = req.body;
    if(password!=confirmPassword){
        res.status(500).send('Error saving product');
    }
    const product = new Product({ username, });
    
    try {
        await product.save();
        console.log('Product added:', { username, password, email, confirmPassword });
        res.redirect('/'); // Redirects to homepage after adding product
    } catch (error) {
        console.error('Error saving product:', error);
        res.status(500).send('Error saving product');
    }
});

export default router;