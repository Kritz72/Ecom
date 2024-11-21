import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import addproductRouter from './routes/addproduct.js';
import searchRouter from './routes/searchpage.js'; // Import the search route
import displaypage from './routes/display_page.js';
import Product from './models/product.js';
import cartRouter from './routes/addTocart.js';


const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MongoDB Connection URI
const mongoURI = 'mongodb://localhost:27017/Daalbhat';

// Connect to MongoDB
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('MongoDB connection error:', error);
});

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse URL-encoded bodies (for form data)
app.use(express.urlencoded({ extended: true }));

// Route for the homepage to display products
app.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.render('index', { products });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Error fetching products');
    }
});

// Use the `addproductRouter` for /add-product routes
app.use('/add-product', addproductRouter);

// Use the `searchRouter` for search page routes
app.use('/search', searchRouter);

app.use('/display', displaypage );


app.use('/cart', cartRouter);


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

