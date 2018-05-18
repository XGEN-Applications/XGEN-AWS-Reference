const config = {
    "JWT_SECRET": "TOP_SECRET_ADD_YOUR_OWN_LONG_RANDOM_SECRET_HERE",
    "DB": {
      "host": "localhost",
      "port": 3306,
      "user": "dbuser",
      "password": "strongpassword",
      "database": "test",
      "multipleStatements": true
    },
    "REDIS": {
      "host": "localhost",
      "port":6379
    },
    "SESSION_TTL_SECONDS": 3600
  }
  
  module.exports = config;