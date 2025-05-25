const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController.js');
const isAdmin = require('../middleware/isAdmin');

// Admin route to view orders
router.get('/admin/orders', isAdmin, orderController.listOrders);
router.post('/admin/orders/:id/delete', isAdmin, orderController.softDeleteOrder);

module.exports = router;
