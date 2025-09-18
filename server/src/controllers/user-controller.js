const { JWT_SECRET } = require("../configs/config-env");
const jwt = require('jsonwebtoken');
const UserServices = require("../services/user-services");
const paginate = require("../utilities/pagination");

exports.deleteUser = async (req, res, next) => {
  const { user_id } = req.user
  try {
    const result = await UserServices.deleteAccount(user_id);
    if (result) {
      return res.status(200).json({ success: true, message: 'Success', result });
    }
  } catch (err) {
    const statusCode = err?.status || err?.statusCode || 500;
    return res.status(statusCode).json({ success: false, error: err.message || String(err) });
  }
}

exports.registerAccount = async (req, res, next) => {
  const data = req.body;

  try {
    const result = await UserServices.registerAccount(data);

    if (result.message) {
      return res.status(400).json({ message: result.message });
    }

    const user_id = result.user_id;
    const token = jwt.sign({ user_id: user_id }, JWT_SECRET, { expiresIn: '24h' });

    return res.status(200).json({
      success: true,
      message: 'Register Successful',
      token,
      role: result.role,
      user_name: result.user_name,
      user_avatar: result.user_avatar,
      email: result.email
    });

  } catch (err) {
    const statusCode = err?.status || err?.statusCode || 500;
    return res.status(statusCode).json({ success: false, error: err.message || String(err) });
  }
};

exports.loginAccount = async (req, res, next) => {
  const data = req.body;

  try {
    const result = await UserServices.loginAccount(data);

    if (result.message) {
      return res.status(400).json({ message: result.message });
    }

    const user_id = result.user_id;
    const token = jwt.sign({ user_id: user_id }, JWT_SECRET, { expiresIn: '24h' });

    return res.status(200).json({
      success: true,
      message: 'Login Successful',
      token,
      role: result.role,
      user_name: result.user_name,
      user_avatar: result.user_avatar,
      email: result.email
    });

  } catch (err) {
    const statusCode = err?.status || err?.statusCode || 500;
    return res.status(statusCode).json({ success: false, error: err.message || String(err) });
  }
};
exports.getUserData = async (req, res, next) => {
  const { user_id } = req.user
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  let filterColumn = ''
  let filterValue = ''
  if (user_id) {
    filterColumn = 'user_id'
    filterValue = user_id
  }
  else {
    filterColumn = req.query.filterColumn ? req.query.filterColumn.toString() : '';
    filterValue = req.query.filterValue ? req.query.filterValue.toString() : '';
  }
  const isRandom = req.query.isRandom ? parseInt(req.query.isRandom) : '';

  try {
    const response = await paginate('user', page, limit, filterColumn, filterValue, isRandom);
    if (response) {
      return res.status(200).json({ success: true, result: response });
    }
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message || err });
  }
};
exports.updateProfile = async (req, res, next) => {
  try {
    const { user_id } = req.user
    const { user_name, phone_number } = req.body
    let user_avatar;
    if (req?.file?.filename !== undefined && req.file?.filename !== null && req.file?.filename) {
      user_avatar = `src/uploads/images/${req?.file?.filename}`;
    }
    const data = {
      user_id: user_id,
      user_name: user_name,
      user_avatar: user_avatar,
      phone_number: phone_number
    }
    const result = await UserServices.updateProfile(data)
    if (result) {
      return res.status(200).json(result);
    }
  } catch (err) {
    const statusCode = err?.status || err?.statusCode || 500;
    return res.status(statusCode).json({ success: false, error: err.message || err });
  }
}
