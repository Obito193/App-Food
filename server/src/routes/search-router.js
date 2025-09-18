const express = require('express');
const { searchData } = require('../controllers/search-controller');
const searchRouter = express.Router();

searchRouter.post('/search', searchData);

module.exports = searchRouter;