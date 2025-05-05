const express = require('express');
const { getCartItemsData, addProductInCart, increaseProductQuantity } = require('../controllers/cart-items-controller');
const cartItemsRouter = express.Router();

cartItemsRouter.post('/get/cart-items-data', getCartItemsData)
cartItemsRouter.post('/add-product-in-cart', addProductInCart)
cartItemsRouter.put('/increase-product-quantity-in-cart', increaseProductQuantity)

module.exports = cartItemsRouter;