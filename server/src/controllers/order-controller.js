const OrderServices = require("../services/order-services");
const paginateWithToken = require("../utilities/pagination-with-token");

exports.getUserOrderData = async (req, res, next) => {
  const { user_id } = req.user
  try {
    const result = await OrderServices.getUserOrder(user_id);
    if (result) {
      return res.status(200).json({ success: true, message: 'Success', result });
    }
  } catch (err) {
    const statusCode = err?.status || err?.statusCode || 500;
    return res.status(statusCode).json({ success: false, error: err.message || String(err) });
  }
};

exports.createOrder = async (req, res, next) => {
  const { user_id } = req.user
  const data = req.body ?? {}
  try {
    if (user_id && data) {
      const result = await OrderServices.createOrder(user_id, data);
      if (result) {
        return res.status(200).json({ success: true, message: 'Success', result });
      }
    }
  } catch (err) {
    const statusCode = err?.status || err?.statusCode || 500;
    return res.status(statusCode).json({ success: false, error: err.message || String(err) });
  }
};

exports.getOrderData = async (req, res, next) => {
  const { page, limit, filterColumn, filterValue } = req.body ?? {}
  const { user_id } = req.user
  try {
    if (user_id) {
      const response = await paginateWithToken('order', page, limit, user_id, filterColumn, filterValue);
      if (response) {
        return res.status(200).json(response);
      }
    }

  } catch (err) {
    const statusCode = err?.status || err?.statusCode || 500;
    return res.status(statusCode).json({ success: false, error: err.message || String(err) });
  }
};

