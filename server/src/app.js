const express = require('express')
const app = express()
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRouter = require('./routes/user-router');
const orderRouter = require('./routes/order-router');
const orderItemsRouter = require('./routes/order-items-router');
const productRouter = require('./routes/product-router');
const cartRouter = require('./routes/cart-router');
const cartItemsRouter = require('./routes/cart-items-router');
const searchRouter = require('./routes/search-router');


app.set('view engine', 'ejs');

let jsonParser = bodyParser.json()
let urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(urlencodedParser)
app.use(jsonParser)
app.use(cors());

app.use('/', userRouter)
app.use('/', orderRouter)
app.use('/', cartRouter)
app.use('/', cartItemsRouter)
app.use('/', orderItemsRouter)
app.use('/', productRouter)
app.use('/', searchRouter)


module.exports = app