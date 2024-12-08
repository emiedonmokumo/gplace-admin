import express from 'express'
import { getStripeEvents } from '../controllers/stripe.js';
import authenticate from '../middleware/authMiddleware.js';
const router = express.Router()

// Event Route
/**
 * @swagger
 * /api/stripe/event:
 *   get:
 *     summary: Retrieve a list of Stripe events
 *     security:
 *       - bearerAuth: []
 *     tags: [Stripe]
 *     description: Fetches the most recent events from Stripe.
 *     responses:
 *       200:
 *         description: A list of Stripe events
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   type:
 *                     type: string
 *                   created:
 *                     type: integer
 *                   data:
 *                     type: object
 *                     description: Event data
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Error message here'
 */
router.get('/event', authenticate, getStripeEvents);

export default router