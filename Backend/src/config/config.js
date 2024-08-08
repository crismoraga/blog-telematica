// src/config/config.js
module.exports = {
    development: {
      username: 'root',
      password: null,
      database: 'my_database',
      host: '127.0.0.1',
      dialect: 'mysql',
    },
    test: {
      username: 'root',
      password: null,
      database: 'test_database',
      host: '127.0.0.1',
      dialect: 'mysql',
    },
    production: {
      username: 'root',
      password: null,
      database: 'production_database',
      host: '127.0.0.1',
      dialect: 'mysql',
    },
  };
  