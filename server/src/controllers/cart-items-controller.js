const CartItemsServices = require("../services/cart-items-services");
const paginate = require("../utilities/pagination");

exports.getCartItemsData = async (req, res, next) => {
  const { page, limit, filterColumn, filterValue } = req.body ?? {}
  try {
    const response = await paginate('cart_items', page, limit, filterColumn, filterValue);
    if (response) {
      return res.status(200).json(response);
    }
  } catch (err) {
    const statusCode = err?.status || err?.statusCode || 500;
    return res.status(statusCode).json({ success: false, error: err.message || String(err) });
  }
};
exports.addProductInCart = async (req, res, next) => {
  const data = req.body ?? {}
  try {
    const response = await CartItemsServices.addProductInCart(data)
    if (response) {
      return res.status(200).json({ success: true, response });
    }
  } catch (err) {
    const statusCode = err?.status || err?.statusCode || 500;
    return res.status(statusCode).json({ success: false, error: err.message || String(err) });
  }
};

exports.removeProductInCart = async (req, res, next) => {
  const data = req.body ?? {}
  try {
    const response = await CartItemsServices.removeProductInCart(data)
    if (response) {
      return res.status(200).json({ success: true, response });
    }
  } catch (err) {
    const statusCode = err?.status || err?.statusCode || 500;
    return res.status(statusCode).json({ success: false, error: err.message || String(err) });
  }
};

exports.increaseProductQuantity = async (req, res, next) => {
  const data = req.body ?? {}
  try {
    const response = await CartItemsServices.increaseProductQuantity(data)
    if (response) {
      return res.status(200).json({ success: true, response });
    }
  } catch (err) {
    const statusCode = err?.status || err?.statusCode || 500;
    return res.status(statusCode).json({ success: false, error: err.message || String(err) });
  }
};