const sql = require("../configs/database-config");
const { sanitizeNumber, formatCurrency } = require("../utilities/formatPrice");
class CartItemsServices {

  static addProductInCart(data) {
    const { cart_id, product_id, quantity, price, total_price, name, category, image, description } = data;
    return new Promise((resolve, reject) => {
      sql.query(
        "SELECT * FROM `cart_items` WHERE `cart_id` = ? AND `product_id` = ?",
        [cart_id, product_id],
        (err, res) => {
          if (err) {
            console.log(err);
            return reject(err);
          }
          if (res.length > 0) {

            const existingItem = res[0];
            const newQuantity = existingItem.quantity + 1;
            const priceNumber = sanitizeNumber(existingItem.price);
            if (isNaN(priceNumber)) return reject(new Error('Invalid price'));

            const newTotalPrice = newQuantity * priceNumber;
            const formattedTotalPrice = formatCurrency(newTotalPrice);

            sql.query(
              "UPDATE `cart_items` SET `quantity` = ?, `total_price` = ? WHERE `id` = ?",
              [newQuantity, formattedTotalPrice, existingItem.id],
              (err2, res2) => {
                if (err2) {
                  console.log(err2);
                  return reject(err2);
                }
                return resolve({
                  id: existingItem.id,
                  cart_id: cart_id,
                  product_id: product_id,
                  quantity: newQuantity,
                  price: existingItem.price,
                  total_price: newTotalPrice,
                  name: existingItem.name,
                  category: existingItem.category,
                  image: existingItem.image,
                  description: existingItem.description
                });
              }
            );
          } else {
            sql.query(
              "INSERT INTO `cart_items` (`cart_id`, `product_id`, `quantity`,`price`,`total_price`,`name`,`category`,`image`,`description`) VALUES (?,?,?,?,?,?,?,?,?)",
              [cart_id, product_id, quantity, price, total_price, name, category, image, description],
              (err3, res3) => {
                if (err3) {
                  console.log(err3);
                  return reject(err3);
                }
                const id = res3.insertId;
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
                });
              }
            );
          }
        }
      );
    });
  }

  static removeProductInCart(data) { 
    const {product_id, cart_id } = data
    return new Promise((resolve, reject) => {
      sql.query(
        "DELETE FROM `cart_items` WHERE `cart_id` = ? AND `product_id` = ?",
        [cart_id, product_id],
        (err, res) => {
          if (err) {
            console.log(err);
            return reject(err);
          }
          return resolve({
            cart_id: cart_id,
            product_id: product_id,
          })
        }
      );
    });
  }

  static increaseProductQuantity(data) {
    const { quantity, price, product_id, cart_id } = data
    return new Promise((resolve, reject) => {
      const priceNumber = sanitizeNumber(price);
      if (isNaN(priceNumber)) return reject(new Error('Invalid price'));

      const newTotalPrice = Number(quantity) * priceNumber;
      const formattedTotalPrice = formatCurrency(newTotalPrice);
      sql.query(
        "UPDATE `cart_items` SET `quantity` = ?, `total_price` = ? WHERE `product_id` = ? AND `cart_id` = ?",
        [quantity, formattedTotalPrice, product_id, cart_id],
        (err, res) => {
          if (err) {
            console.log(err);
            return reject(err);
          }
          return resolve({
            cart_id: cart_id,
            product_id: product_id,
            quantity: quantity,
            total_price: formattedTotalPrice,
          })
        }
      );
    });
  }
}
module.exports = CartItemsServices