exports.up = function(knex) {
  return knex.schema.createTable('user', function(table) {
    table.increments('user_id').primary(); // Tự động tăng ID
    table.string('user_name').notNullable();
    table.string('user_avatar'); // Avatar có thể để trống
    table.string('role').notNullable();
    table.string('email').unique().notNullable();
    table.string('password').notNullable();
    table.timestamps(true, true); // created_at và updated_at tự động
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('user');
};
