import express from 'express'
import { deleteInvestor, getAllInvestors, getInvestor } from '../controllers/investor.js'
import { getInvestorContacts } from '../controllers/investorContact.js';
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


/**
 * @swagger
 * /api/investor/{id}:
 *   delete:
 *     summary: Delete a specific investor by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the investor to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The investor was successfully deleted.
 *       404:
 *         description: Investor not found.
 */
router.delete('/:id', deleteInvestor);


/**
 * @swagger
 * /api/investor/{userId}/contacts:
 *   get:
 *     summary: Get investor contacts for a specific user
 *     tags: [Investor Contacts]
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: ID of the user whose investor contacts are being retrieved
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved the investor contacts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   investor:
 *                     type: string
 *                     description: The investor's ID
 *                   user:
 *                     type: string
 *                     description: The user's ID
 *                   name:
 *                     type: string
 *                     description: The contact's name
 *                   surname:
 *                     type: string
 *                     description: The contact's surname
 *                   email:
 *                     type: string
 *                     description: The contact's email
 *                   phone:
 *                     type: string
 *                     description: The contact's phone number
 *                   title:
 *                     type: string
 *                     description: The contact's title
 *                   contactType:
 *                     type: string
 *                     enum: [Primary, Secondary]
 *                     description: Type of contact
 *       500:
 *         description: Internal server error
 */
router.get('/:userId/contacts', getInvestorContacts);


export default router