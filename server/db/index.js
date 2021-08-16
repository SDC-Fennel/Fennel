const { Pool } = require('pg');
const { dbCreds } = require('../../config');

const pool = new Pool(dbCreds);

module.exports = pool;
