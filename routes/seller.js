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

export default router;
