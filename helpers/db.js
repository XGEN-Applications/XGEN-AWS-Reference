const  mysql = require('mysql');
const { DB } = require('../config/config');
const util = require('util');

// get connection info from config file and create pool
// this will maintain connection pool for the entire environment
const pool = mysql.createPool(DB);
pool.query = util.promisify(pool.query);
// connect, getConnection, query => all in one
const query = async query => await pool.query(query);

// close pool gracefully 
const disconnect = () => pool.end();

module.exports = { query, disconnect };