import express from 'express';
import {
    createInvestor,
  deleteInvestor,
  getAllInvestors,
  getInvestor,
} from '../controllers/investor.js';
import { getInvestorContacts } from '../controllers/investorContact.js';
import authenticate from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /api/investors:
 *   post:
 *     summary: Create a new investor
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Investor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               companyInfo:
 *                 type: object
 *                 required:
 *                   - companyName
 *                   - country
 *                   - city
 *                   - website
 *                   - yearFounded
 *                   - employeeNumber
 *                   - investorType
 *                   - description
 *                 properties:
 *                   companyName:
 *                     type: string
 *                     example: "Volaris Capital"
 *                   country:
 *                     type: string
 *                     example: "USA"
 *                   city:
 *                     type: string
 *                     example: "San Francisco"
 *                   website:
 *                     type: string
 *                     example: "https://volariscapital.com"
 *                   yearFounded:
 *                     type: integer
 *                     example: 2010
 *                   employeeNumber:
 *                     type: integer
 *                     example: 200
 *                   investorType:
 *                     type: string
 *                     enum: [Financial, Strategic]
 *                   description:
 *                     type: string
 *                     example: "A strategic investor specializing in software."
 *               investmentBio:
 *                 type: object
 *                 properties:
 *                   industry:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["Software"]
 *                   geography:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["North America"]
 *                   dealsInLTM:
 *                     type: integer
 *                     example: 5
 *                   medianDealSize:
 *                     type: integer
 *                     example: 50000000
 *                   AUM:
 *                     type: integer
 *                     example: 2000000000
 *                   dealsIn5Y:
 *                     type: integer
 *                     example: 20
 *     responses:
 *       200:
 *         description: Successfully created an investor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "64e73e5c5f5a4f3b7c5f4a6c"
 *                 companyInfo:
 *                   type: object
 *                 investmentBio:
 *                   type: object
 *       500:
 *         description: Internal server error
 */
router.post('/', authenticate, createInvestor);


/**
 * @swagger
 * /api/investors:
 *   get:
 *     tags: 
 *        - Investor
 *     summary: Retrieve all investors
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of investors.
 */
router.get('/', authenticate, getAllInvestors);


/**
 * @swagger
 * /api/investors/{id}:
 *   get:
 *     summary: Retrieve a specific investor by ID
 *     security:
 *       - bearerAuth: []
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
router.get('/:id', authenticate, getInvestor);


/**
 * @swagger
 * /api/investors/{id}:
 *   delete:
 *     summary: Delete a specific investor by ID
 *     security:
 *       - bearerAuth: []
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
router.delete('/:id', authenticate, deleteInvestor);

/**
 * @swagger
 * /api/investors/{userId}/contacts:
 *   get:
 *     summary: Get investor contacts for a specific user
 *     tags: [Investor Contacts]
 *     security:
 *       - bearerAuth: []
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
router.get('/:userId/contacts', authenticate, getInvestorContacts);

export default router;
