// const express = require('express');
// const router = express.Router();

// const authenticate = require('../../middlewares/auth');
// const authorizeRoles = require('../../middlewares/roleCheck');
// const accountantController = require('../../controllers/accountantController');

// /**
//  * @swagger
//  * tags:
//  *   name: Accountant Financial Logs
//  *   description: Manage financial logs (Accountant/Admin access)
//  */

// router.use(authenticate);
// router.use(authorizeRoles('Accountant', 'Admin'));

// /**
//  * @swagger
//  * /accountant/financial-logs:
//  *   get:
//  *     summary: Get all financial logs with filtering and pagination
//  *     tags: [Accountant Financial Logs]
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: query
//  *         name: type
//  *         schema:
//  *           type: string
//  *           enum: [Income, Expense, Transfer, Adjustment]
//  *         description: Filter by financial log type
//  *       - in: query
//  *         name: startDate
//  *         schema:
//  *           type: string
//  *           format: date
//  *         description: Filter logs from this date
//  *       - in: query
//  *         name: endDate
//  *         schema:
//  *           type: string
//  *           format: date
//  *         description: Filter logs until this date
//  *       - in: query
//  *         name: category
//  *         schema:
//  *           type: string
//  *         description: Filter by category
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
//  *         description: Financial logs retrieved successfully
//  *       500:
//  *         description: Server error
//  */
// router.get('/', accountantController.getAllFinancialLogs);

// /**
//  * @swagger
//  * /accountant/financial-logs:
//  *   post:
//  *     summary: Create a new financial log
//  *     tags: [Accountant Financial Logs]
//  *     security:
//  *       - bearerAuth: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - type
//  *               - amount
//  *               - description
//  *             properties:
//  *               type:
//  *                 type: string
//  *                 enum: [Income, Expense, Transfer, Adjustment]
//  *                 description: Type of financial log
//  *               amount:
//  *                 type: number
//  *                 description: Amount (must be positive)
//  *               description:
//  *                 type: string
//  *                 description: Description of the financial log
//  *               category:
//  *                 type: string
//  *                 description: Optional category for the log
//  *               reference:
//  *                 type: string
//  *                 description: Optional reference to related entity (order, invoice, etc.)
//  *     responses:
//  *       201:
//  *         description: Financial log created successfully
//  *       400:
//  *         description: Invalid input data
//  *       500:
//  *         description: Server error
//  */
// router.post('/', accountantController.createFinancialLog);

// /**
//  * @swagger
//  * /accountant/financial-logs/{id}:
//  *   delete:
//  *     summary: Delete a financial log
//  *     tags: [Accountant Financial Logs]
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: ID of the financial log
//  *     responses:
//  *       200:
//  *         description: Financial log deleted successfully
//  *       404:
//  *         description: Financial log not found
//  *       500:
//  *         description: Server error
//  */
// router.delete('/:id', accountantController.deleteFinancialLog);

// module.exports = router;

const express = require('express');
const router = express.Router();

const authenticate = require('../../middlewares/auth');
const authorizeRoles = require('../../middlewares/roleCheck');
const accountantController = require('../../controllers/accountantController');

// Protect all routes and restrict to 'Accountant' or 'Admin' roles.
router.use(authenticate);
router.use(authorizeRoles('Accountant', 'Admin'));

router.get('/', accountantController.getAllFinancialLogs);
router.post('/', accountantController.createFinancialLog);
router.delete('/:id', accountantController.deleteFinancialLog); // Ensure this correctly references the controller method

module.exports = router;

