import express from 'express';
import Cart from '../models/cart.js';
import Product from '../models/product.js';

const router = express.Router();

// View Cart
router.get('/', async (req, res) => {
    try {
        const cart = await Cart.findOne(); // Retrieve the cart (simplified for single user)
        const items = cart?.items || [];
        const products = await Promise.all(
            items.map(async (item) => {
                const product = await Product.findById(item.productId);
                return {
                    ...product.toObject(),
                    quantity: item.quantity
                };
            })
        );
        res.render('AddToCart', { products });
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).send('Error fetching cart');
    }
});

// Add to Cart
router.post('/add/:id', async (req, res) => {
    const productId = req.params.id;
    try {
        let cart = await Cart.findOne();
        if (!cart) {
            cart = new Cart({ items: [] });
        }

        const existingItem = cart.items.find((item) => item.productId.toString() === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.items.push({ productId });
        }

        await cart.save();
        res.redirect('/cart');
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).send('Error adding to cart');
    }
});

// Remove from Cart
router.post('/remove/:id', async (req, res) => {
    const productId = req.params.id;
    try {
        const cart = await Cart.findOne();
        if (cart) {
            cart.items = cart.items.filter((item) => item.productId.toString() !== productId);
            await cart.save();
        }
        res.redirect('/cart');
    } catch (error) {
        console.error('Error removing from cart:', error);
        res.status(500).send('Error removing from cart');
    }
});

export default router;
