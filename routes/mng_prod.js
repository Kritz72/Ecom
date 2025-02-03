import express from 'express';
import Product from '../models/product.js';

const router = express.Router();

// Route to display the manage products dashboard
router.get('/', async (req, res) => {
    if (req.session.username && req.session.isSeller) {
        try {
            const products = await Product.find({ seller_email: req.session.email }); // Fetch only the seller's products
            res.render('mng_prod', { products });
        } catch (error) {
            console.error('Error fetching products:', error);
            res.status(500).send('Error fetching products');
        }
    } else {
        res.redirect('/log');
    }
});

// Route to delete a product
router.get('/delete-product/:id', async (req, res) => {
    if (req.session.username && req.session.isSeller) {
        try {
            await Product.findByIdAndDelete(req.params.id);
            res.redirect('/mng_prod');
        } catch (error) {
            console.error('Error deleting product:', error);
            res.status(500).send('Error deleting product');
        }
    } else {
        res.redirect('/log');
    }
});

// Route to edit a product
router.get('/edit-product/:id', async (req, res) => {
    if (req.session.username && req.session.isSeller) {
        try {
            const product = await Product.findById(req.params.id);
            res.render('edit_product', { product });
        } catch (error) {
            console.error('Error fetching product:', error);
            res.status(500).send('Error fetching product');
        }
    } else {
        res.redirect('/log');
    }
});

// Route to update product details
router.post('/edit-product/:id', async (req, res) => {
    if (req.session.username && req.session.isSeller) {
        try {
            const { name, category, price, stock } = req.body;
            await Product.findByIdAndUpdate(req.params.id, { name, category, price });
            res.redirect('/mng_prod');
        } catch (error) {
            console.error('Error updating product:', error);
            res.status(500).send('Error updating product');
        }
    } else {
        res.redirect('/log');
    }
});

export default router;
