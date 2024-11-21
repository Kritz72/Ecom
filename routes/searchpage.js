// routes/search.js
import express from 'express';
import Product from '../models/product.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const q = typeof req.query.q === 'string' ? req.query.q : ''; // Ensure `q` is a string
    
    try {
        // Perform the search only if `q` is not an empty string
        const products = q
            ? await Product.find({
                  $or: [
                      { name: { $regex: q, $options: 'i' } }
                     
                  ]
              })
            : [];

        res.render('searchpage', { products, query: q });
    } catch (error) {
        console.error('Error searching products:', error);
        res.status(500).send('Error searching products');
    }
});

export default router;
