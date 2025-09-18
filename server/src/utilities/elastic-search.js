const client = require("../configs/elastic"); // file kết nối elastic đã tạo ở trên

async function searchWithPagination({ index, field, query, page = 1, limit = 10 }) {
  try {
    const from = (page - 1) * limit;

    const result = await client.search({
      index,
      body: {
        from,
        size: limit,
        query: {
          match: {
            [field]: query, // field động
          },
        },
      },
    });

    return {
      total: result.hits.total.value,
      page,
      limit,
      data: result.hits.hits.map((hit) => hit._source),
    };
  } catch (error) {
    console.error("Elasticsearch search error:", error);
    throw error;
  }
}

module.exports = searchWithPagination;
