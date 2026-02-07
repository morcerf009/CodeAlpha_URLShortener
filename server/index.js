import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { nanoid } from 'nanoid';
import { initDb } from './db.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let db;

// Initialize Database
initDb().then(database => {
    db = database;
    console.log('Database initialized');
}).catch(err => {
    console.error('Failed to initialize database', err);
});

// Root route
app.get('/', (req, res) => {
    res.send('URL Shortener API is running. Use the frontend or POST to /api/shorten.');
});

// API endpoint to shorten URL
app.post('/api/shorten', async (req, res) => {
    const { originalUrl } = req.body;

    if (!originalUrl) {
        return res.status(400).json({ error: 'Original URL is required' });
    }

    try {
        // Check if URL already exists
        const existing = await db.get('SELECT shortCode FROM urls WHERE originalUrl = ?', originalUrl);
        if (existing) {
            return res.json({ shortCode: existing.shortCode });
        }

        // Create new short code
        const shortCode = nanoid(8);
        await db.run(
            'INSERT INTO urls (shortCode, originalUrl) VALUES (?, ?)',
            [shortCode, originalUrl]
        );

        res.json({ shortCode });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Redirect route
app.get('/:shortCode', async (req, res) => {
    const { shortCode } = req.get('shortCode') || req.params;

    try {
        const row = await db.get('SELECT originalUrl FROM urls WHERE shortCode = ?', shortCode);

        if (row) {
            res.redirect(row.originalUrl);
        } else {
            res.status(404).json({ error: 'URL not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
