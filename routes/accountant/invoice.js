const express = require('express');
const router = express.Router();

const authenticate = require('../../middlewares/auth');
const authorizeRoles = require('../../middlewares/roleCheck');
const invoiceController = require('../../controllers/invoiceController');

/**
 * @swagger
 * tags:
 *   name: Accountant Invoice
 *   description: Manage invoices for orders (Accountant/Admin access)
 */

router.use(authenticate);
router.use(authorizeRoles('Accountant', 'Admin'));

/**
 * @swagger
 * /accountant/invoice/{orderId}:
 *   post:
 *     summary: Generate an invoice for a specific order
 *     tags: [Accountant Invoice]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the order
 *     responses:
 *       201:
 *         description: Invoice generated successfully
 *       400:
 *         description: Invalid or duplicate invoice
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */
router.post('/:orderId', invoiceController.generateInvoice);

/**
 * @swagger
 * /accountant/invoice/{orderId}:
 *   get:
 *     summary: Get invoice details for a specific order
 *     tags: [Accountant Invoice]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the order
 *     responses:
 *       200:
 *         description: Invoice details retrieved
 *       404:
 *         description: Invoice not found
 *       500:
 *         description: Server error
 */
router.get('/:orderId', invoiceController.getInvoice);

module.exports = router;
