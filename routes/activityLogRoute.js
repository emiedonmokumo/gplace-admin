import express from 'express'
import { getActivityLogs } from '../controllers/activityLog.js';
import authenticate from '../middleware/authMiddleware.js';
const router = express.Router();

/**
 * @swagger
 * /api/activity/logs:
 *   get:
 *     summary: Retrieve recent activity logs
 *     description: Fetches the 50 most recent activity logs sorted in descending order by creation time.
 *     tags:
 *       - Activity Logs
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved activity logs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "65c2e2b1f1a3a2b0e6f3c5d9"
 *                   action:
 *                     type: string
 *                     example: "User login"
 *                   userId:
 *                     type: string
 *                     example: "65c2e2b1f1a3a2b0e6f3c5d8"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-02-25T14:30:00Z"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
router.get('/logs', getActivityLogs, authenticate);

export default router;