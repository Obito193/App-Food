const searchWithPagination = require("../utilities/elastic-search");

exports.searchData = async (req, res, next) => {
  const { index, field, query, page, limit } = req.body;

  if (!index || !field || !query) {
    return res.status(400).json({ error: "index, field, q are required" });
  }

  try {
    const results = await searchWithPagination({
      index,
      field,
      query: query,
      page: page ? Number(page) : 1,
      limit: limit ? Number(limit) : 10,
    });
    return res.status(200).json({ success: true, ...results});
  } catch (err) {
    const statusCode = err?.status || err?.statusCode || 500;
    return res.status(statusCode).json({ success: false, error: err.message || String(err) });
  }
};