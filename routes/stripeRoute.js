import express from 'express'
import { getStripeEvents } from '../controllers/stripe.js';
const router = express.Router()

// Event Route
router.get('/event', getStripeEvents);

export default router