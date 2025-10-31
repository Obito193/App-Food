const { Client } = require('@elastic/elasticsearch');

const client = new Client({
  node: 'https://localhost:9200',
  auth: {
    username: 'elastic',
    password: 'f*5h-wwwJYXDIzUN7PAd'
  },
  tls: {
    rejectUnauthorized: false
  }
});


module.exports = client;
