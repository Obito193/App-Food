const express = require('express');
const { getUserCartData } = require('../controllers/cart-controller');
const authenticateToken = require('../middlewares/authenticate-token');
const cartRouter = express.Router();

cartRouter.post('/get/user-cart-data', authenticateToken,getUserCartData)

module.exports = cartRouter;