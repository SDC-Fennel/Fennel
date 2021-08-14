/* eslint-disable no-multi-str */
const db = require('../db');

module.exports = {
  getReviews: (product_id, page, count, sort) => {
    const offset = (page - 1) * count;
    let sortCol;

    if (sort === 'newest') {
      sortCol = 'date';
    }
    if (sort === 'helpful') {
      sortCol = 'helpful';
    }

    const query = {
      text:  'SELECT * FROM reviews\
              WHERE product_id = $1 AND reported = false\
              LEFT JOIN (\
                SELECT \
              )\
              GROUP BY reviews.id\
              ORDER BY $4 DESC\
              OFFSET $2 ROWS\
              LIMIT $3',
      values: [product_id, offset, count, sortCol],
    };

    return db.query(query);
  },

  // 'SELECT\
  //   reviews.*,\
  //   ARRAY_AGG (SELECT * FROM reviews_photos\
  //     WHERE reviews.id = reviews_photos.review_id\
  //     ) photos\
  // FROM reviews\
  // LEFT JOIN reviews_photos\
  //   ON reviews.id = reviews_photos.review_id\
  // WHERE product_id = $1 AND reported = false\
  // GROUP BY reviews.id\
  // ORDER BY $4 DESC\
  // OFFSET $2 ROWS\
  // LIMIT $3',

  // ARRAY_AGG (SELECT * FROM reviews_photos\
  //   WHERE reviews.id = reviews_photos.review_id\
  //   ) photos\

  addReview: (inputs) => {
    const query = {
      text: 'INSERT INTO\
                reviews(product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpful)\
             VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)',
      values: Object.values(inputs),
    };

    return db.query(query);
  },
  updateHelpful: (reviewId) => {
    const query = {
      text: 'UPDATE reviews SET helpful = helpful + 1 WHERE id = $1',
      values: [reviewId],
    };

    return db.query(query);
  },
  updateReported: (reviewId) => {
    const query = {
      text: 'UPDATE reviews SET reported = true WHERE id = $1',
      values: [reviewId],
    };

    return db.query(query);
  },
};
