const mysql = require('mysql2/promise');
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = require('../configs/config-env');

const pool = mysql.createPool({
  host: `${DB_HOST}`,
  user: `${DB_USER}`,   
  password: `${DB_PASSWORD}`, 
  database: `${DB_NAME}`
});

async function paginateComments(tableName, page, limit, filterColumn, filterValue, sortColumn = null, sortOrder = 'DESC', minId) {
  try {
    // Kiểm tra các tham số đầu vào
    if (!tableName || typeof tableName !== 'string') {
      throw new Error('Invalid table name');
    }


    console.log('filterColumn', filterColumn)
    console.log('filterValue', filterValue)



    page = (page ?? 0) > 0 ? page : null;
    limit = (limit ?? 0) > 0 ? limit : null;
    minId = minId || null;
    filterColumn = filterColumn ? `\`${filterColumn}\`` : '';
    filterValue = filterValue ?? '';

    let query = `SELECT * FROM \`${tableName}\``;
    let queryParams = [];

    if (filterColumn && filterValue) {
      query += ` WHERE ${filterColumn} LIKE ?`;
      queryParams.push(`${filterValue}`);
    }

    if (minId) {
      query += filterColumn && filterValue ? ` AND comment_id <= ?` : ` WHERE comment_id <= ?`;
      queryParams.push(minId);
    }

    let orderByClause = '';
    if (sortColumn) {
      orderByClause = ` ORDER BY \`${sortColumn}\` ${sortOrder}`;
    }

    const countQuery = `SELECT COUNT(*) AS totalItems FROM \`${tableName}\`` + 
      (query.includes('WHERE') ? query.substring(query.indexOf('WHERE')) : '');

    const [countRows] = await pool.query(countQuery, queryParams);
    const totalItems = countRows[0].totalItems;

    if (page && limit) {
      const offset = (page - 1) * limit;
      query += orderByClause + ` LIMIT ? OFFSET ?`;
      queryParams.push(limit, offset);

      console.log('query', query)
      console.log('queryParams', queryParams)

      const [rows] = await pool.query(query, queryParams);
      const totalPages = Math.ceil(totalItems / limit);

      return {
        data: rows,
        currentPage: page,
        totalItems,
        totalPages,
      };
    } else {
      query += orderByClause;
      const [rows] = await pool.query(query, queryParams);

      return {
        data: rows,
        totalItems: rows.length,
      };
    }
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching data: ' + error.message);
  }
}


module.exports = paginateComments;
