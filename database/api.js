const { Pool } = require('pg');
const { dbCreds } = require('../config');

const pool = new Pool(dbCreds);

const getReviews = (product_id, page, count) => {
  const offset = (page - 1) * count;

  const query = {
    text: 'SELECT * FROM reviews WHERE product_id = $1 OFFSET $2 ROWS LIMIT $3',
    values: [product_id, offset, count],
  };

  return pool.query(query);
};

const addReview = (inputs) => {
  const query = {
    text: 'INSERT INTO reviews VALUES(?)',
    values: [inputs],
  };

  console.log(query.values);

  return pool.query(query);
};

module.exports = {
  getReviews,
  addReview,
};