const express = require('express');
const { getOrderItemsData, addProductInOrder } = require('../controllers/order-items-controller');
const orderItemsRouter = express.Router();

orderItemsRouter.post('/get/order-items-data', getOrderItemsData)
orderItemsRouter.post('/add-product-in-order', addProductInOrder)

module.exports = orderItemsRouter;