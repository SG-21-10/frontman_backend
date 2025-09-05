const express = require('express');
const router = express.Router();

const authenticate = require('../../middlewares/auth');
const authorizeRoles = require('../../middlewares/roleCheck');
const followupController = require('../../controllers/followupController');

/**
 * @swagger
 * tags:
 *   name: Follow-Ups
 *   description: Manage customer follow-ups by Field Executives
 */

router.use(authenticate);
router.use(authorizeRoles('FieldExecutive'));

/**
 * @swagger
 * /field-executive/followups:
 *   get:
 *     summary: Get all follow-ups for the Field Executive
 *     tags: [Follow-Ups]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of follow-ups
 *       500:
 *         description: Failed to fetch follow-ups
 */
router.get('/', followupController.getFollowUps);

/**
 * @swagger
 * /field-executive/followups:
 *   post:
 *     summary: Create a new follow-up
 *     tags: [Follow-Ups]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerName:
 *                 type: string
 *                 example: "Jane Doe"
 *               purpose:
 *                 type: string
 *                 example: "Product discussion"
 *               followUpDate:
 *                 type: string
 *                 format: date
 *                 example: "2025-07-31"
 *     responses:
 *       201:
 *         description: Follow-up created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Failed to create follow-up
 */
router.post('/', followupController.createFollowUp);

/**
 * @swagger
 * /field-executive/followups/{id}:
 *   put:
 *     summary: Update a follow-up by ID
 *     tags: [Follow-Ups]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Follow-up ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerName:
 *                 type: string
 *               purpose:
 *                 type: string
 *               followUpDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Follow-up updated
 *       404:
 *         description: Follow-up not found
 *       500:
 *         description: Failed to update follow-up
 */
router.put('/:id', followupController.updateFollowUp);

/**
 * @swagger
 * /field-executive/followups/{id}/status:
 *   patch:
 *     summary: Update the status of a follow-up (e.g., completed, postponed)
 *     tags: [Follow-Ups]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Follow-up ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [Completed, Postponed]
 *                 example: "Completed"
 *     responses:
 *       200:
 *         description: Follow-up status updated
 *       404:
 *         description: Follow-up not found
 *       500:
 *         description: Failed to update status
 */
router.patch('/:id/status', followupController.updateFollowUpStatus);

module.exports = router;
