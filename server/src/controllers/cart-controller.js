const CartServices = require("../services/cart-services");
const paginate = require("../utilities/pagination");

exports.getUserCartData = async (req, res, next) => {
  const {user_id} = req.user
  try {
    const result = await CartServices.getUserCart(user_id);
    if(result){
      return res.status(200).json({ success: true, message: 'Success', result });
    }
  } catch (err) {
    const statusCode = err?.status || err?.statusCode || 500;
    return res.status(statusCode).json({ success: false, error: err.message || String(err) });
  }
};