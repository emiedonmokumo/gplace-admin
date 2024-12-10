import express from 'express'
import authenticate from '../middleware/authMiddleware.js'
import { deleteUser, getAllUsers, getUser, updateUser } from '../controllers/user.js'
const router = express.Router()


/**
 * @swagger
 * /api/users:
 *   get:
 *     tags: 
 *        - Users
 *     summary: Retrieve all users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users.
 */
router.get('/', authenticate, getAllUsers);

/**
 * @swagger
 *  /api/users/{id}:
 *    get:
 *      summary: Get a user by ID
 *      security:
 *       - bearerAuth: []
 *      tags: 
 *          - Users
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID of the user to retrieve
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Successfully retrieved user
 *        404:
 *          description: User not found
 *        500:
 *          description: Internal server error
 */
router.get('/:id', authenticate, getUser);

/**
 * @swagger
 *  /api/users/{id}:
 *    put:
 *      summary: Update a user
 *      security:
 *       - bearerAuth: []
 *      tags: [Users]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID of the user to update
 *          schema:
 *            type: string
 *      requestBody:
 *        description: User details to update
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                bio:
 *                  type: string
 *                company:
 *                  type: string
 *                team:
 *                  type: string
 *                credentials:
 *                  type: string
 *                role:
 *                  type: string
 *      responses:
 *        200:
 *          description: Successfully updated user
 *        400:
 *          description: Invalid input
 *        404:
 *          description: User not found
 *        500:
 *          description: Internal server error
 */
router.put('/:id', authenticate, updateUser);

/**
 * @swagger
 *  /api/users/{id}:
 *    delete:
 *      summary: Delete a user
 *      security:
 *       - bearerAuth: []
 *      tags: [Users]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID of the user to delete
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Successfully deleted user
 *        404:
 *          description: User not found
 *        500:
 *          description: Internal server error
 */
router.delete('/:id', authenticate, deleteUser);


export default router;
