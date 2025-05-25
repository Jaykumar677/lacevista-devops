// Cart Page
// routes/pagesRoutes.js
const express = require('express');
const router  = express.Router();
const cartController = require('../controllers/cartController');

router.get('/cart', cartController.getCart);
router.post('/cartAdd', cartController.addToCart);
router.post('/cartUpdate', cartController.updateCartItem);

module.exports = router;
