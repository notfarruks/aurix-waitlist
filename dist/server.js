"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
// Import the named export from your routes file
const waitlist_routes_1 = require("./routes/waitlist.routes");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = parseInt(process.env.PORT || '3000', 10);
// Database setup
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL
});
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
// Initialize the waitlist routes and pass the database pool
app.use('/api', (0, waitlist_routes_1.initWaitlistRoutes)(pool));
// Health check for Railway/Tasneem
app.get('/health', (req, res) => {
    res.json({ status: 'live', timestamp: new Date() });
});
app.listen(PORT, () => {
    console.log(`🚀 AURIX Waitlist API running on port ${PORT}`);
});
