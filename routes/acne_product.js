import express from 'express';
import Product from '../models/product.js';

const router = express.Router();






// Route to display all products

router.get('/', async (req, res) => {
    try {
        // Fetch products with the category "Acne" from the database
        const acneProducts = await Product.find({ category: 'acne' });
        
        // Render the 'acne_products.ejs' view and pass the products
        res.render('acne_product', { products: acneProducts });
    } catch (error) {
        console.error('Error fetching Acne products:', error);
        res.status(500).send('Error fetching Acne products');
    }
});

export default router;
