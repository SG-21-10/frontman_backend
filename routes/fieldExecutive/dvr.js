const express = require('express');
const router = express.Router();

const authenticate = require('../../middlewares/auth');
const authorizeRoles = require('../../middlewares/roleCheck');
const dvrController = require('../../controllers/dvrController');

/**
 * @swagger
 * tags:
 *   name: DVR Reports
 *   description: Daily Visit Reports by Field Executives
 */

router.use(authenticate);
router.use(authorizeRoles('FieldExecutive'));

/**
 * @swagger
 * /fieldExecutive/dvr:
 *   post:
 *     summary: Submit a Daily Visit Report (DVR)
 *     tags: [DVR Reports]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2025-07-29"
 *               clientName:
 *                 type: string
 *                 example: "Acme Corp"
 *               purpose:
 *                 type: string
 *                 example: "Product demo and follow-up"
 *               outcome:
 *                 type: string
 *                 example: "Client interested in pricing proposal"
 *     responses:
 *       201:
 *         description: DVR submitted successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post('/', dvrController.createDVR);

/**
 * @swagger
 * /fieldExecutive/dvr:
 *   get:
 *     summary: Fetch all submitted DVRs for the logged-in Field Executive
 *     tags: [DVR Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of DVRs
 *       500:
 *         description: Failed to fetch DVRs
 */
router.get('/', dvrController.getMyDVRs);

module.exports = router;
