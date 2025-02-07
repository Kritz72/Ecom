import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Route to serve the Child Help Dashboard
router.get('/', (req, res) => {
    res.render('childHelp');
});

export default router;
