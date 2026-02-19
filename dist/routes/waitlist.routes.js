"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initWaitlistRoutes = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const initWaitlistRoutes = (pool) => {
    router.post('/waitlist', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
            const result = yield pool.query('INSERT INTO waitlist (full_name, email, phone_number, country, joined_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING id, email, joined_at', [fullName, email, phoneNumber, country]);
            res.status(201).json({
                success: true,
                message: 'Successfully joined waitlist',
                data: result.rows[0]
            });
        }
        catch (error) {
            console.error('Waitlist error:', error);
            if (error.code === '23505') { // Duplicate email error
                return res.status(400).json({ success: false, error: 'Email already registered' });
            }
            res.status(500).json({ success: false, error: error.message || 'Server error' });
        }
    }));
    return router;
};
exports.initWaitlistRoutes = initWaitlistRoutes;
exports.default = router;
