const sql = require("../configs/database-config");
class CartItemsServices {
  static addProductInCart(data) {
    const { cart_id, product_id, quantity, price, total_price, name, category, image, description } = data
    return new Promise((resolve, reject) => {
      sql.query(
        "INSERT INTO `cart_items` (`cart_id`, `product_id`, `quantity`,`price`,`total_price`,`name`,`category`,`image`,`description`) VALUES (?,?,?,?,?,?,?,?,?)",
        [cart_id, product_id, quantity, price, total_price, name, category, image, description],
        (err, res) => {
          if (err) {
            console.log(err);
            return reject(err);
          }
          const id = res.insertId
          return resolve({
            id: id,
            cart_id: cart_id,
            product_id: product_id,
            quantity: quantity,
            price: price,
            total_price: total_price,
            name: name,
            category: category,
            image: image,
            description: description
          })
        }
      );
    });
  }
  static increaseProductQuantity(data) {
    const { quantity, total_price, product_id, cart_id } = data
    return new Promise((resolve, reject) => {
      sql.query(
        "UPDATE `cart_items` SET `quantity` = ?, `total_price` = ? WHERE `product_id` = ? AND `cart_id` = ?",
        [quantity, total_price, product_id, cart_id],
        (err, res) => {
          if (err) {
            console.log(err);
            return reject(err);
          }
          return resolve({
            cart_id: cart_id,
            product_id: product_id,
            quantity: quantity,
            total_price: total_price,
          })
        }
      );
    });
  }
}
module.exports = CartItemsServices