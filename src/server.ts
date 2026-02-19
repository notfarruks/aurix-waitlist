import express from 'express';
import cors from 'cors';
import { Pool } from 'pg';
import dotenv from 'dotenv';
import { initWaitlistRoutes } from './routes/waitlist.routes';

dotenv.config();
const app = express();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api', initWaitlistRoutes(pool));

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});