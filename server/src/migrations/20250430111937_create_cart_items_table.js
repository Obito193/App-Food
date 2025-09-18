// migrations/20250430102417_create_cart_items_table.js

exports.up = function(knex) {
  return knex.schema.createTable('cart_items', function(table) {
    table.increments('id').primary(); // ID chi tiết giỏ hàng tự động tăng
    table.integer('cart_id').unsigned().notNullable(); // ID giỏ hàng (khóa ngoại)
    table.integer('product_id').unsigned().notNullable(); // ID sản phẩm (khóa ngoại)
    table.integer('quantity').defaultTo(1); // Số lượng sản phẩm
   table.string('price', 1000).notNullable(); // Giá sản phẩm
table.string('total_price', 1000).notNullable(); // Tổng giá (quantity * price)
    table.string('name', 255); // Tên sản phẩm
    table.string('category', 255); // Danh mục sản phẩm
    table.text('image'); // Link ảnh sản phẩm
    table.text('description'); // Mô tả sản phẩm
    table.foreign('cart_id').references('id').inTable('cart').onDelete('CASCADE'); // Liên kết với bảng cart
    table.foreign('product_id').references('id').inTable('product').onDelete('CASCADE'); // Liên kết với bảng products
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cart_items');
};
