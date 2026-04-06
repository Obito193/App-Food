const searchWithPagination = require("../utilities/elastic-search");

exports.searchData = async (req, res, next) => {
  const { table, field, query, page, limit } = req.body; // đổi index -> table

  if (!table || !field || !query) {
    return res.status(400).json({ error: "table, field, query are required" });
  }

  try {
    const results = await searchWithPagination({
      table,                       // tên table trong MySQL
      field,                       // cột muốn search
      query,                       // từ khóa
      page: page ? Number(page) : 1,
      limit: limit ? Number(limit) : 10,
    });

    return res.status(200).json({ success: true, ...results });
  } catch (err) {
    const statusCode = err?.status || err?.statusCode || 500;
    return res.status(statusCode).json({ success: false, error: err.message || String(err) });
  }
};