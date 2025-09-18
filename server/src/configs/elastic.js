const { Client } = require('@elastic/elasticsearch');

const client = new Client({
  node: 'https://localhost:9200',
  auth: {
    username: 'elastic',
    password: 'mật_khẩu_bạn_copy_ở_console'
  },
  tls: {
    rejectUnauthorized: false
  }
});


module.exports = client;
