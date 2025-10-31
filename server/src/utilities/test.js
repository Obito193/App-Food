const client = require("../configs/elastic");

(async () => {
  try {
    const info = await client.info();
    console.log('✅ Kết nối thành công đến Elasticsearch!');
    console.log(info);
  } catch (err) {
    console.error('❌ Lỗi kết nối Elasticsearch:', err);
  }
})();
