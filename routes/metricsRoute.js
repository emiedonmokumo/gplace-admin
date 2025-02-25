import express from 'express'
import { getMetrics } from '../controllers/metrics.js';
import authenticate from '../middleware/authMiddleware.js';
const router = express.Router();

/**
 * @swagger
 * /api/metrics:
 *   get:
 *     summary: Retrieve user metrics
 *     description: Fetches total users, active users in the last 24 hours, and the number of paid users (Platinum subscribers).
 *     tags:
 *       - Metrics
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved metrics.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: integer
 *                   description: Total number of users.
 *                 paidUsers:
 *                   type: integer
 *                   description: Number of users with a Platinum subscription.
 *                 activeUsers:
 *                   type: integer
 *                   description: Number of users who updated their records in the last 24 hours.
 *       500:
 *         description: Internal server error.
 */
router.get('/', getMetrics, authenticate)

export default router;