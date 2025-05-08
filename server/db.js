const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://postgres:123@3.tcp.ngrok.io:5432/warehouse_db'
});

// Test the connection
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  console.log('Successfully connected to PostgreSQL database');
  release();
});

module.exports = {
  query: (text, params) => pool.query(text, params),
}; 