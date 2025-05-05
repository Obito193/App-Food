const express = require('express');
const { getOrderData, getUserOrderData, createOrder } = require('../controllers/order-controller');
const authenticateToken = require('../middlewares/authenticate-token');
const orderRouter = express.Router();

orderRouter.post('/get/order-data', getOrderData);
orderRouter.post('/get/user-order-data', authenticateToken, getUserOrderData)
orderRouter.post('/create-order', authenticateToken, createOrder)

module.exports = orderRouter;