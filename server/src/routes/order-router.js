const express = require('express');
const { getOrderData, getUserOrderData, createOrder,updateOrderStatus } = require('../controllers/order-controller');
const authenticateToken = require('../middlewares/authenticate-token');
const orderRouter = express.Router();

orderRouter.post('/get/order-data', authenticateToken, getOrderData);
orderRouter.post('/get/user-order-data', authenticateToken, getUserOrderData)
orderRouter.post('/create-order', authenticateToken, createOrder)
orderRouter.post('/update-order-status', updateOrderStatus);

module.exports = orderRouter;