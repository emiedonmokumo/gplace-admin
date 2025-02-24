import express from 'express';
import { getSubscribers } from '../controllers/subscription.js';
import authenticate from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /api/subscription/subscribers:
 *   get:
 *     summary: Retrieve all subscribers
 *     description: Fetches all subscribed users along with their subscription details, including user ID, full name, status, plan, and expiration date.
 *     tags: 
 *       - Subscription
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of subscribers retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   userId:
 *                     type: string
 *                     example: "65b23c1a4f3b2a6d2f9c0e1a"
 *                   name:
 *                     type: string
 *                     example: "Alice Johnson"
 *                   status:
 *                     type: string
 *                     enum: [Active, Expired, Pending]
 *                     example: "Active"
 *                   plan:
 *                     type: string
 *                     example: "Platinum"
 *                   expiryDate:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-12-31T00:00:00.000Z"
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       500:
 *         description: Internal server error
 */
// Get all subscribers
router.get('/subscribers', getSubscribers, authenticate);

export default router;
