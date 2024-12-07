import express from 'express'
import { handleStripeWebhook } from '../controllers/stripe.js';
import bodyParser from 'body-parser';
const router = express.Router()

// Event Route
router.post('/webhook', express.raw({type: 'application/json'}), handleStripeWebhook);

export default router