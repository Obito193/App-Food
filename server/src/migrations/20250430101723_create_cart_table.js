// migrations/20250430110000_create_cart_table.js

exports.up = function(knex) {
  return knex.schema.createTable('cart', function(table) {
    table.increments('id').primary(); // ID giỏ hàng tự động tăng
    table.integer('user_id').unsigned().notNullable(); // ID người dùng (khóa ngoại)
    table.decimal('total_price', 10, 2).defaultTo(0.00); // Tổng giá trị giỏ hàng
    table.timestamps(true, true); // Thời gian tạo và cập nhật
    table.foreign('user_id').references('user_id').inTable('user').onDelete('CASCADE'); // Liên kết với bảng users
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cart');
};
