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
    const { total_price, payment_status, order_status, address, items } = data;
    return new Promise((resolve, reject) => {
      sql.query(
        "INSERT INTO `order` (`user_id`, `payment_status`, `order_status`, `address`, `total_price`) VALUES (?,?,?,?,?)",
        [user_id, payment_status, order_status, address, total_price],
        (err, res) => {
          if (err) {
            console.log(err);
            return reject(err);
          }
          const now = new Date();
          const orderId = res.insertId;

          if (!items || items.length === 0) {
            return reject(new Error("No items provided"));
          }

          const orderItemsData = items.map(item => [
            orderId,                // order_id
            item.product_id,         // product_id
            item.quantity,           // quantity
            item.price,              // price
            item.total_price,        // total_price
            item.name,               // name
            item.category,           // category
            item.image,              // image
            item.description         // description
          ]);

          sql.query(
            "INSERT INTO `order_items` (`order_id`, `product_id`, `quantity`, `price`, `total_price`, `name`, `category`, `image`, `description`) VALUES ?",
            [orderItemsData],
            (err2, res2) => {
              if (err2) {
                console.log(err2);
                return reject(err2);
              }

              return resolve({
                order_id: orderId,
                user_id,
                total_price,
                payment_status,
                order_status,
                created_at: now,
                updated_at: now,
                address,
                // items
              });
            }
          );
        }
      );
    });
  }
}
module.exports = OrderServices