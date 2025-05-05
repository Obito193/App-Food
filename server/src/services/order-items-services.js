class OrderItemsServices {
  static addProductInOrder(data) {
    const { order_id, product_id, quantity, price, total_price, name, category, image, description } = data
    return new Promise((resolve, reject) => {
      sql.query(
        "INSERT INTO `order_items` (`order_id`, `product_id`, `quantity`,`price`,`total_price`,`name`,`category`,`image`,`description`) VALUES (?,?,?,?,?,?,?,?,?)",
        [order_id, product_id, quantity, price, total_price, name, category, image, description],
        (err, res) => {
          if (err) {
            console.log(err);
            return reject(err);
          }
          const id = res.insertId
          return resolve({
            id: id,
            order_id: order_id,
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
}
module.exports = OrderItemsServices