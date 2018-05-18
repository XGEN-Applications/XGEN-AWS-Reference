const util = require('util');

// get connection info from config file
const { DB, REDIS, SESSION_TTL_SECONDS } = require('../config/config');

// redis memcahe client
const redis = require('redis');
const { host, port } = REDIS;
const client = redis.createClient(port, host);
// promisify redis methods
const getAsync = util.promisify(client.get).bind(client);
const setAsync = util.promisify(client.set).bind(client);
const delAsync = util.promisify(client.del).bind(client);
const quitAsync = util.promisify(client.quit).bind(client);


// create mysql aurora connection pool pool
// this will maintain connection pool for the entire environment
const  mysql = require('mysql');
const pool = mysql.createPool(DB);
// promisify pool methods
pool.query = util.promisify(pool.query);
pool.end = util.promisify(pool.end);

// connect, getConnection, query => all in one
const query = async query => await pool.query(query);

// close pool and redis gracefully 
const disconnect = async () => {
  await pool.end();
  await quitAsync();
};

// get session from redis
const getSession = async (token) => await getAsync(token);

// set session
// session Time To Live in seconds can be configured in config file
const setSession = async (userId, token) => await client.setAsync(userId, token, 'EX', SESSION_TTL_SECONDS);

// clear all user sessions
const clearSession = async (userId) => await client.delAsync(userId);

module.exports = { query, disconnect, getSession, setSession, clearSession };