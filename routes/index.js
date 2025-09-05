const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth'));

router.use('/admin/audits', require('./admin/audit'));
router.use('/admin/products', require('./admin/product'));
router.use('/admin/stock', require('./admin/stock'));
router.use('/admin/users', require('./admin/user'));
router.use('/admin/orders', require('./admin/order'));
router.use('/admin/warranty-cards', require('./admin/warrantyCard'));
router.use('/admin/reports', require('./admin/report'));
router.use('/admin/invoices', require('./admin/invoice'));
router.use('/admin/search', require('./admin/search'));
router.use('/admin/notifications', require('./admin/notification'));
router.use('/admin/dashboard', require('./admin/dashboard'));
router.use('/admin/incentives', require('./admin/incentive'));
router.use('/admin/points', require('./admin/points'));
router.use('/admin/location', require('./admin/location'));
router.use('/admin/shift-alerts', require('./admin/shiftAlert'));

router.use('/distributor/catalog', require('./distributor/catalog'));
router.use('/distributor/order', require('./distributor/order'));
router.use('/distributor/stock', require('./distributor/stock'));
router.use('/distributor/cart', require('./distributor/cart'));
router.use('/distributor/promo', require('./distributor/promo'));
router.use('/distributor/categories', require('./distributor/category'));

router.use('/accountant/invoice', require('./accountant/invoice'));

router.use('/worker/attendance', require('./worker/attendance'));
router.use('/worker/production', require('./worker/production'));
router.use('/worker/shift-alerts', require('./worker/shiftAlert'));

router.use('/field-executive/followups', require('./fieldExecutive/followUp'));
router.use('/fieldExecutive/dvr', require('./fieldExecutive/dvr'));
router.use('/fieldExecutive/delivery', require('./fieldExecutive/delivery'));

router.use('/user/incentives', require('./plumber/incentive'));
router.use('/user/points', require('./plumber/points'));
router.use('/user/delivery-report', require('./plumber/deliveryReport'));
router.use('/user/warranty', require('./plumber/warranty'));
router.use('/user/commissioned-work', require('./plumber/commissionedWork'));

router.use('/user/location', require('./user/location'));

module.exports = router;