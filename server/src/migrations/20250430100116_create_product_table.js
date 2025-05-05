exports.up = function(knex) {
  return knex.schema.createTable('product', function(table) {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('category').notNullable();
    table.text('image');
    table.string('price').notNullable();
    table.text('description');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('product');
};
