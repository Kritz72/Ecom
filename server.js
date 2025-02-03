import express from 'express';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import addproductRouter from './routes/addproduct.js';
import searchRouter from './routes/searchpage.js'; // Import the search route
import displaypage from './routes/display_page.js';
import Product from './models/product.js';
import cartRouter from './routes/addTocart.js';
import acneproduct from './routes/acne_product.js';
import acnemarks from './routes/acne_marks.js';
import pigmentation from './routes/pigmentation.js';
import glowingskin from './routes/glowing.js';
import login from './routes/loginpage.js';
import registration from './routes/registration.js';
import updatedetails from './routes/profile_details.js';
import sellerdetails from './routes/seller.js';
import sellerRegistrationRouter from './routes/seller_reg.js';
import manageproducts from './routes/mng_prod.js';






const app = express();
app.use(session({
    secret: 'your_secret_key', // Replace with a secure secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));
const port = 3003;

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
app.use(express.json());
// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});


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



// Derma Cash page route
app.get('/dermacash', (req, res) => {
    if (req.session.username) {
        // Sample data for Derma Cash page
        const user = {
            username: req.session.username,
            dermaCashBalance: 500, // Example balance
        };

        const cashbackHistory = [
            { date: '2024-12-10', description: 'Purchase Cashback', amount: 50 },
            { date: '2024-12-12', description: 'Referral Cashback', amount: 100 },
        ];

        res.render('dermacash', { user, cashbackHistory });
    } else {
        res.redirect('/log'); // Redirect to login if not logged in
    }
});


// Use the `addproductRouter` for /add-product routes
app.use('/add-product', addproductRouter);

// Use the `searchRouter` for search page routes
app.use('/search', searchRouter);

app.use('/display', displaypage );

app.use('/profile',updatedetails);
app.use('/cart', cartRouter);
app.use('/acne', acneproduct);
app.use('/acne_marks', acnemarks);
app.use('/pigmentation', pigmentation);
app.use('/glowing_skin', glowingskin);

app.use('/log',login);
app.use('/register', registration);
app.use('/seller', sellerdetails);
app.use('/seller_reg', sellerRegistrationRouter);
app.use('/manage_prod',manageproducts);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

