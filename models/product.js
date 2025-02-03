// models/product.js
import mongoose from 'mongoose';

// Define the Product schema and model
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    imageUrl: String,// This will store the image path
    description: String,
    category: String,
    seller_email: String
});

const Product = mongoose.model('Product', productSchema);

export default Product;
