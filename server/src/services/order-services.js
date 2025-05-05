const sql = require("../configs/database-config");
class OrderServices {
  static getUserOrder(user_id) {
    return new Promise((resolve, reject) => {
      sql.query(
        "SELECT * FROM `order` WHERE `user_id` = ?",
        [user_id],
        (err, res) => {
          if (err) {
            console.log(err);
            return reject(err);
          }

          if (res.length > 0) {
            return resolve({
              id: res[0].id,
              user_id: res[0].user_id,
              total_price: res[0].total_price,
              payment_status: res[0].payment_status,
              order_status: res[0].order_status,
              address: res[0].address,
              created_at: res[0].created_at,
              updated_at: res[0].updated_at,
            });
          } else {
            return resolve({
              message: 'Không có data'
            });
          }
        }
      );
    });
  }
  static createOrder(user_id, data) {
    const { total_price, payment_status, order_status, address } = data
    return new Promise((resolve, reject) => {
      sql.query(
        "INSERT INTO `order` (`user_id`, `payment_status`, `order_status`,`address`,`total_price`) VALUES (?,?,?,?,?)",
        [user_id, payment_status, order_status, address, total_price],
        (err, res) => {
          if (err) {
            console.log(err);
            return reject(err);
          }
          const id = res.insertId
          return resolve({
            id: id,
            user_id: user_id,
            payment_status: payment_status,
            order_status: order_status,
            address: address,
            total_price: total_price
          })
        }
      );
    });
  }
}
module.exports = OrderServices