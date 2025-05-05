const sql = require("../configs/database-config");
class CartServices {
  static getUserCart(user_id) {
    return new Promise((resolve, reject) => {
      sql.query(
        "SELECT * FROM `cart` WHERE `user_id` = ?",
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
              created_at: res[0].created_at,
              updated_at: res[0].updated_at,
            });
          } else {
            const now = new Date();
            sql.query(
              "INSERT INTO `cart` (`user_id`, `total_price`) VALUES (?, ?)",
              [user_id, 0],
              (insertErr, insertRes) => {
                if (insertErr) {
                  console.log(insertErr);
                  return reject(insertErr);
                }
                return resolve({
                  id: insertRes.insertId,
                  user_id: user_id,
                  total_price: 0,
                  created_at: now,
                  updated_at: now,
                });
              }
            );
          }
        }
      );
    });
  }
}
module.exports = CartServices