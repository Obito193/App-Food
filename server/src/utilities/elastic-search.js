const mysql = require('mysql2/promise');
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = require('../configs/config-env');

const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

async function searchWithPagination({ table, field, query, page = 1, limit = 10 }) {
  if (!table) throw new Error("Missing 'table' parameter");
  if (!field) throw new Error("Missing 'field' parameter");

  const offset = (page - 1) * limit;

  try {
    // Truy vấn tổng số bản ghi khớp
    const [totalResult] = await pool.execute(
      `SELECT COUNT(*) as total FROM \`${table}\` WHERE \`${field}\` LIKE ?`,
      [`%${query}%`]
    );
    const total = totalResult[0].total;

    // Truy vấn dữ liệu với phân trang
    const [rows] = await pool.execute(
      // LIMIT và OFFSET trực tiếp trong query, chỉ bind giá trị query
      `SELECT * FROM \`${table}\` WHERE \`${field}\` LIKE ? LIMIT ${limit} OFFSET ${offset}`,
      [`%${query}%`]
    );

    return {
      total,
      page,
      limit,
      data: rows,
    };
  } catch (error) {
    console.error("Database search error:", error);
    throw error;
  }
}

module.exports = searchWithPagination;