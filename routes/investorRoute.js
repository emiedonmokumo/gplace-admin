import express from 'express'
import { getAllInvestors } from '../controllers/investor.js'
const router = express.Router()


/**
 * @swagger
 * /api/investor:
 *   get:
 *     summary: Retrieve all investors
 *     responses:
 *       200:
 *         description: A list of investors.
 */
router.get('/', getAllInvestors)

export default router