import express from 'express';
import cors from 'cors';
import { Pool } from 'pg';
import dotenv from 'dotenv';
// Import the named export from your routes file
import { initWaitlistRoutes } from './routes/waitlist.routes';

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

// Database setup
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// Initialize the waitlist routes and pass the database pool
app.use('/api', initWaitlistRoutes(pool));

// Health check for Railway/Tasneem
app.get('/health', (req, res) => {
    res.json({ status: 'live', timestamp: new Date() });
});

app.listen(PORT, () => {
    console.log(`🚀 AURIX Waitlist API running on port ${PORT}`);
});