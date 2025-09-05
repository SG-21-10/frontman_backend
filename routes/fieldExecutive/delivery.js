const express = require('express');
const router = express.Router();

const authenticate = require('../../middlewares/auth');
const authorizeRoles = require('../../middlewares/roleCheck');
const deliveryController = require('../../controllers/deliveryController');

/**
 * @swagger
 * tags:
 *   name: Delivery Reports
 *   description: Field Executive & Distributor Delivery Submissions
 */

router.use(authenticate);
router.use(authorizeRoles('FieldExecutive', 'Distributor'));

/**
 * @swagger
 * /fieldExecutive/delivery:
 *   post:
 *     summary: Submit a delivery report
 *     tags: [Delivery Reports]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: string
 *                 example: "64f3ec4a28bc5d2e3f12ef78"
 *               status:
 *                 type: string
 *                 enum: [Delivered, Failed, Returned]
 *                 example: "Delivered"
 *               notes:
 *                 type: string
 *                 example: "Delivered to customer and signed."
 *     responses:
 *       201:
 *         description: Delivery report submitted
 *       400:
 *         description: Invalid data
 *       500:
 *         description: Failed to submit report
 */
router.post('/', deliveryController.submitDelivery);

/**
 * @swagger
 * /fieldExecutive/delivery:
 *   get:
 *     summary: Get all delivery reports submitted by the logged-in user
 *     tags: [Delivery Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of delivery reports
 *       500:
 *         description: Failed to fetch reports
 */
router.get('/', deliveryController.getMyDeliveries);

module.exports = router;
