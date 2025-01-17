import express from 'express';

const router = express.Router();

// Seller Dashboard Route
router.get('/', (req, res) => {
    if (req.session.username) {
        res.render('seller', { username: req.session.username });
    } else {
        res.redirect('/log'); // Redirect to login if not logged in
    }
});
// routes/seller.js
router.get('/dashboard', async (req, res) => {
    try {
        // Replace the following line with actual logic to fetch the product count
        const totalProducts = await Product.countDocuments(); 
        res.render('seller', { totalProducts });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});



export default router;
