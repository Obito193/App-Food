const express = require('express');
const { getProductData } = require('../controllers/product-controller');
const productRouter = express.Router();

productRouter.post('/product', getProductData);

module.exports = productRouter;