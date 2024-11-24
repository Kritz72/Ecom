// routes/addproduct.js
import express from 'express';
import Product from '../models/product.js';
import upload from '../middleware/multer.js'; // Import Multer configuration

const router = express.Router();

// Route to render the Add Product page
router.get('/', (req, res) => {
    res.render('addProduct'); // Render addproduct.ejs
});

// Handle the form submission from Add Product page with image upload
router.post('/add-product', upload.single('image'), async (req, res) => {
    const { name, price, description, category } = req.body;
    console.log(req.body)
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : ''; // Get image path if file is uploaded

    // Create a new product instance with the image path and save it to MongoDB
    const product = new Product({ name, price, imageUrl, description, category });
    
    try {
        await product.save();
        console.log('Product added:', { name, price, imageUrl });
        res.redirect('/'); // Redirects to homepage after adding product
    } catch (error) {
        console.error('Error saving product:', error);
        res.status(500).send('Error saving product');
    }
});

export default router;
