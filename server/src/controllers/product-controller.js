const paginate = require("../utilities/pagination");

exports.getProductData = async (req, res, next) => {
  const {page, limit, filterColumn, filterValue} = req.body ?? {}
  try {
    const response = await paginate('product', page, limit, filterColumn, filterValue);
    if (response) {
      return res.status(200).json(response);
    }
  } catch (err) {
    const statusCode = err?.status || err?.statusCode || 500;
    return res.status(statusCode).json({ success: false, error: err.message || String(err) });
  }
};