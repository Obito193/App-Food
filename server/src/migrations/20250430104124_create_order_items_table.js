// migrations/xxxx_create_order_items_table.js

exports.up = function (knex) {
  return knex.schema.createTable('order_items', function (table) {
    table.increments('id').primary();

    table.integer('order_id').unsigned().notNullable()
      .references('id').inTable('order')
      .onDelete('CASCADE');

    table.integer('product_id').unsigned().notNullable()
      .references('id').inTable('product')
      .onDelete('CASCADE');

    table.integer('quantity').notNullable();   // Số lượng sản phẩm
    table.decimal('total_price', 10, 2).notNullable(); // Tổng giá (quantity * price)
    table.decimal('price', 10, 2).notNullable(); // Giá 1 sản phẩm tại thời điểm mua
    table.string('name', 255); // Tên sản phẩm
    table.string('category', 255); // Danh mục sản phẩm
    table.text('image'); // Link ảnh sản phẩm
    table.text('description'); // Mô tả sản phẩm

    table.timestamps(true, true); // created_at và updated_at
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('order_items');
};
