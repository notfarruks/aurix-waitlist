import express, { Request, Response } from 'express';
import { Pool } from 'pg';

const router = express.Router();

export const initWaitlistRoutes = (pool: Pool) => {
    router.post('/waitlist', async (req: Request, res: Response) => {
        try {
            const { fullName, email, phoneNumber, country } = req.body;

            // Validation
            if (!fullName || !email || !phoneNumber || !country) {
                return res.status(400).json({
                    success: false,
                    error: 'All fields are required: fullName, email, phoneNumber, country'
                });
            }

            // Insert into database
            const result = await pool.query(
                'INSERT INTO waitlist (full_name, email, phone_number, country, joined_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING id, email, joined_at',
                [fullName, email, phoneNumber, country]
            );

            res.status(201).json({
                success: true,
                message: 'Successfully joined waitlist',
                data: result.rows[0]
            });
        } catch (error: any) {
            console.error('Waitlist error:', error);
            if (error.code === '23505') { // Duplicate email error
                return res.status(400).json({ success: false, error: 'Email already registered' });
            }
            res.status(500).json({ success: false, error: error.message || 'Server error' });
        }
    });

    return router;
};

export default router;