const OrderItemsServices = require("../services/order-items-services");
const paginate = require("../utilities/pagination");

exports.getOrderItemsData = async (req, res, next) => {
  const {page, limit, filterColumn, filterValue} = req.body ?? {}
  try {
    const response = await paginate('order_items', page, limit, filterColumn, filterValue);
    if (response) {
      return res.status(200).json(response);
    }
  } catch (err) {
    const statusCode = err?.status || err?.statusCode || 500;
    return res.status(statusCode).json({ success: false, error: err.message || String(err) });
  }
};
exports.addProductInOrder = async (req, res, next) => {
  const data = req.body ?? {}
  try {
    const response = await OrderItemsServices.addProductInOrder(data)
    if (response) {
      return res.status(200).json({ success: true, response });
    }
  } catch (err) {
    const statusCode = err?.status || err?.statusCode || 500;
    return res.status(statusCode).json({ success: false, error: err.message || String(err) });
  }
};