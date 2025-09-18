const mysql = require('mysql2/promise');
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = require('../configs/config-env');

const pool = mysql.createPool({
  host: `${DB_HOST}`,
  user: `${DB_USER}`,   
  password: `${DB_PASSWORD}`, 
  database:`${DB_NAME}`
});

async function paginateWithToken(tableName, page, limit, userId, filterColumn, filterValue) {
  try {
    if (!userId) throw new Error("userId is required");

    page = (page ?? 0) > 0 ? page : null;  
    limit = (limit ?? 0) > 0 ? limit : null; 
    filterColumn = filterColumn ?? '';
    filterValue = filterValue ?? ''; 
    
   let query = `SELECT * FROM \`${tableName}\` WHERE user_id = ?`;
    let params = [userId];

    // Nếu có filterColumn và filterValue thì thêm điều kiện
    if (filterColumn && filterValue) {
     query += ` AND \`${filterColumn}\` LIKE ?`;
      filterValue = `%${filterValue}%`;
      params.push(filterValue);
    }

    let totalItems = 0;
    let rows = [];

    if (page && limit) {
      const offset = (page - 1) * limit;

      // Truy vấn tổng số bản ghi
      let countQuery = `SELECT COUNT(*) AS totalItems  FROM \`${tableName}\`  WHERE user_id = ?`;
      let countParams = [userId];

      if (filterColumn && filterValue) {
        countQuery += ` AND ${filterColumn} LIKE ?`;
        countParams.push(filterValue);
      }

      const [countRows] = await pool.query(countQuery, countParams);
      totalItems = countRows[0].totalItems;

      // Thêm phân trang
      query += ` LIMIT ? OFFSET ?`;
      params.push(limit, offset);

      [rows] = await pool.query(query, params);

      const totalPages = Math.ceil(totalItems / limit);

      return {
        success: true,
        message: 'Success',
        data: rows,
        currentPage: page,
        totalItems: totalItems,
        totalPages: totalPages
      };
    } else {
      // Nếu không có page/limit thì lấy tất cả
      [rows] = await pool.query(query, params);

      return {
        success: true,
        message: 'Success',
        data: rows,
        totalItems: rows.length
      };
    }
  } catch (error) {
    console.log(error);
    throw new Error('Error fetching data: ' + error.message);
  }
}

module.exports = paginateWithToken;
