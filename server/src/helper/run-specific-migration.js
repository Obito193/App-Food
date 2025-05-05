const knexConfig = require('../../knexfile'); // Đúng: load knexfile config
const knex = require('knex')(knexConfig.development); // Khởi tạo knex từ config
const path = require('path');

async function runMigration() {
  try {
    const folder = path.resolve(__dirname, '../../src/migrations'); // Đường dẫn tuyệt đối đến thư mục migrations
    const fileName = '20250430104124_create_order_items_table.js'; // file cần migrate

    await knex.migrate.up({
      directory: folder,
      name: fileName,
    });

    console.log('Migration chạy xong!');
  } catch (error) {
    console.error('Migration lỗi:', error);
  } finally {
    await knex.destroy(); // Đóng kết nối DB
    process.exit(0);
  }
}

runMigration();
