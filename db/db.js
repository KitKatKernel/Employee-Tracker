const { Pool } = require('pg');

const pool = new Pool({
    user: 'username here',
    host: 'localhost',
    database: 'database here',
    password: 'password here',
    port: 5432,
});

module.exports = pool;

