import express from 'express'
import { getAllInvestors, getInvestor } from '../controllers/investor.js'
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


/**
 * @swagger
 * /api/investor/{id}:
 *   get:
 *     summary: Retrieve a specific investor by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the investor
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A specific investor.
 *       404:
 *         description: Investor not found.
 */
router.get('/:id', getInvestor);

export default router