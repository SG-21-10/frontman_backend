// const express = require('express');
// const router = express.Router();

// const authenticate = require('../../middlewares/auth');
// const authorizeRoles = require('../../middlewares/roleCheck');
// const invoiceController = require('../../controllers/invoiceController');
// const accountantController = require('../../controllers/accountantController');

// /**
//  * @swagger
//  * tags:
//  *   name: Accountant Invoice
//  *   description: Manage invoices for orders (Accountant/Admin access)
//  */

// router.use(authenticate);
// router.use(authorizeRoles('Accountant', 'Admin'));

// /**
//  * @swagger
//  * /accountant/invoice/{orderId}:
//  *   post:
//  *     summary: Generate an invoice for a specific order
//  *     tags: [Accountant Invoice]
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: orderId
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: ID of the order
//  *     responses:
//  *       201:
//  *         description: Invoice generated successfully
//  *       400:
//  *         description: Invalid or duplicate invoice
//  *       404:
//  *         description: Order not found
//  *       500:
//  *         description: Server error
//  */
// router.post('/:orderId', invoiceController.generateInvoice);

// /**
//  * @swagger
//  * /accountant/invoice/{orderId}:
//  *   get:
//  *     summary: Get invoice details for a specific order
//  *     tags: [Accountant Invoice]
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: orderId
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: ID of the order
//  *     responses:
//  *       200:
//  *         description: Invoice details retrieved
//  *       404:
//  *         description: Invoice not found
//  *       500:
//  *         description: Server error
//  */
// router.get('/:orderId', invoiceController.getInvoice);

// /**
//  * @swagger
//  * /accountant/invoice:
//  *   get:
//  *     summary: Get all invoices with filtering and pagination
//  *     tags: [Accountant Invoice]
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: query
//  *         name: status
//  *         schema:
//  *           type: string
//  *           enum: [Draft, Sent, Paid, Overdue, Cancelled]
//  *         description: Filter by invoice status
//  *       - in: query
//  *         name: startDate
//  *         schema:
//  *           type: string
//  *           format: date
//  *         description: Filter invoices from this date
//  *       - in: query
//  *         name: endDate
//  *         schema:
//  *           type: string
//  *           format: date
//  *         description: Filter invoices until this date
//  *       - in: query
//  *         name: userId
//  *         schema:
//  *           type: string
//  *         description: Filter by user ID
//  *       - in: query
//  *         name: page
//  *         schema:
//  *           type: integer
//  *           default: 1
//  *         description: Page number
//  *       - in: query
//  *         name: limit
//  *         schema:
//  *           type: integer
//  *           default: 10
//  *         description: Number of items per page
//  *     responses:
//  *       200:
//  *         description: Invoices retrieved successfully
//  *       500:
//  *         description: Server error
//  */
// router.get('/', accountantController.getAllInvoices);

// /**
//  * @swagger
//  * /accountant/invoice:
//  *   post:
//  *     summary: Create a new invoice manually
//  *     tags: [Accountant Invoice]
//  *     security:
//  *       - bearerAuth: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - userId
//  *               - totalAmount
//  *               - items
//  *             properties:
//  *               userId:
//  *                 type: string
//  *                 description: ID of the user for whom the invoice is created
//  *               totalAmount:
//  *                 type: number
//  *                 description: Total amount of the invoice
//  *               items:
//  *                 type: array
//  *                 items:
//  *                   type: object
//  *                   required:
//  *                     - productName
//  *                     - quantity
//  *                     - unitPrice
//  *                   properties:
//  *                     productName:
//  *                       type: string
//  *                     quantity:
//  *                       type: integer
//  *                     unitPrice:
//  *                       type: number
//  *               description:
//  *                 type: string
//  *                 description: Optional description for the invoice
//  *               dueDate:
//  *                 type: string
//  *                 format: date
//  *                 description: Due date for the invoice
//  *     responses:
//  *       201:
//  *         description: Invoice created successfully
//  *       400:
//  *         description: Invalid input data
//  *       404:
//  *         description: User not found
//  *       500:
//  *         description: Server error
//  */
// router.post('/', accountantController.createInvoice);

// /**
//  * @swagger
//  * /accountant/invoice/{id}/send:
//  *   patch:
//  *     summary: Mark an invoice as sent
//  *     tags: [Accountant Invoice]
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: ID of the invoice
//  *     responses:
//  *       200:
//  *         description: Invoice marked as sent successfully
//  *       400:
//  *         description: Invalid operation (e.g., trying to send a paid invoice)
//  *       404:
//  *         description: Invoice not found
//  *       500:
//  *         description: Server error
//  */
// router.patch('/:id/send', accountantController.sendInvoice);

// /**
//  * @swagger
//  * /accountant/invoice/{id}/verify-payment:
//  *   patch:
//  *     summary: Verify payment and mark invoice as paid
//  *     tags: [Accountant Invoice]
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: ID of the invoice
//  *     requestBody:
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               paymentMethod:
//  *                 type: string
//  *                 description: Method of payment (optional)
//  *               paymentReference:
//  *                 type: string
//  *                 description: Payment reference number (optional)
//  *     responses:
//  *       200:
//  *         description: Payment verified and invoice marked as paid
//  *       400:
//  *         description: Invalid operation (e.g., invoice already paid)
//  *       404:
//  *         description: Invoice not found
//  *       500:
//  *         description: Server error
//  */
// router.patch('/:id/verify-payment', accountantController.verifyPayment);

// module.exports = router;
const express = require('express');
const router = express.Router();

const authenticate = require('../../middlewares/auth');
const authorizeRoles = require('../../middlewares/roleCheck');
const invoiceController = require('../../controllers/invoiceController');
const accountantController = require('../../controllers/accountantController');

router.use(authenticate);
router.use(authorizeRoles('Accountant', 'Admin'));

// ## ADD THIS NEW ROUTE for the dashboard summary ##
router.get('/summary', accountantController.getFinancialSummary);

// Your existing routes
router.post('/:orderId', invoiceController.generateInvoice);
router.get('/:orderId', invoiceController.getInvoice);
router.get('/', accountantController.getAllInvoices);
router.post('/', accountantController.createInvoice);
router.patch('/:id/send', accountantController.sendInvoice);
router.patch('/:id/verify-payment', accountantController.verifyPayment);

module.exports = router;
