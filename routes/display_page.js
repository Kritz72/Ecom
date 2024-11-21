import express from 'express';
import Product from '../models/product.js'; // Adjust the path based on your folder structure

const router = express.Router();

// Route to fetch and display a product by ID
router.get('/:id', async (req, res) => {
    try {
        // Fetch the product from the database using the provided ID
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).send('Product not found');
        }

        // Render the product details page, passing the product data
        res.render('displaypage', { product });
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).send('Server Error');
    }
});

export default router;

