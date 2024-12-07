import express from 'express'
import { generateToken } from '../controllers/auth.js';
const router = express.Router()

// Example route to generate token after login
router.post('/login', generateToken);

export default router