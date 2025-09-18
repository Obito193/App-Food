// migrations/xxxx_create_orders_table.js

exports.up = function(knex) {
  return knex.schema.createTable('order', function(table) {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable()
         .references('user_id').inTable('user')
         .onDelete('CASCADE');

table.string('total_price', 1000).notNullable(); // Tổng giá (quantity * price)

    table.string('payment_status').defaultTo('pending'); // pending, paid, failed
    table.string('order_status').defaultTo('pending');   // pending, shipped, delivered, cancelled
    table.string('address').notNullable();              // ➔ thêm địa chỉ giao hàng

    table.timestamps(true, true); // created_at và updated_at
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('orders');
};
