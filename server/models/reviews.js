/* eslint-disable no-multi-str */
const db = require('../db');

module.exports = {
  getReviews: (productId, page, count, sort) => {
    const offset = (page - 1) * count;
    let sortCol;

    if (sort === 'newest') {
      sortCol = 'date';
    }
    if (sort === 'helpful') {
      sortCol = 'helpful';
    }

    const query = {
      text: `SELECT
                *,
                (SELECT ARRAY_AGG(
                  json_build_object('id', id, 'url', url)
                )
                  FROM
                    reviews_photos
                  WHERE
                    reviews.id = reviews_photos.review_id
                ) as photos
              FROM
                reviews
              WHERE
                product_id = $1 AND reported = false
              ORDER BY ${sortCol} DESC
              OFFSET $2 ROWS
              LIMIT $3`,
      values: [productId, offset, count],
    };

    return db.query(query);
  },
  addReview: (inputs) => {
    const photosQueryFn = (col, table, key) => {
      const array = [];
      inputs[key].forEach((item) => array.push(`((SELECT ${col} FROM ${table}), '${item}')`));
      return array.join(', ');
    };

    const characteristicsQueryFn = (col, table) => {
      const keys = Object.keys(inputs.characteristics);
      const array = [];
      keys.forEach((key) => array.push(`(${key}, (SELECT ${col} FROM ${table}), ${inputs.characteristics[key]})`));
      return array.join(', ');
    };

    // remove recommend, reported and ehlpful. those will be default values
    const query = {
      text: `WITH reviewsInsert AS (
               INSERT INTO
                 reviews(product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpful)
               VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
               RETURNING id
             ), photos AS (
               INSERT INTO
                 reviews_photos(review_id, url)
               VALUES ${photosQueryFn('id', 'reviewsInsert', 'photos')}
             )
             INSERT INTO
               characteristic_reviews(characteristic_id, review_id, value)
             VALUES ${characteristicsQueryFn('id', 'reviewsInsert')}
             `,
      values: [
        inputs.product_id,
        inputs.rating,
        inputs.date,
        inputs.summary,
        inputs.body,
        inputs.recommend,
        inputs.reported,
        inputs.reviewer_name,
        inputs.reviewer_email,
        inputs.response,
        inputs.helpful,
      ],
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
  getMeta: (productId) => {
    const output = {
      product_id: productId,
      rating: {},
      recommended: {},
      characteristics: {},
    };

    const query = {
      text: `SELECT
               rating, count(rating)
             FROM
               reviews
             WHERE product_id = $1
             GROUP BY rating`,
      values: [productId],
    };

    db.query(query)
      .then((results) => {
        results.rows.forEach((ratingCount) => {
          const key = ratingCount.rating;
          output.rating[key] = ratingCount.count;
          // console.log(output);
        });
      })
      .catch((error) => {
        console.log(error, 'error retreiving ratings');
      });

    // create a new query and keep adding to the output object
    // eventually return the fully created output object once all queries are done
    // console.log(output);
  },

  // "product_id": "2",
  // "ratings": {
  //   2: 1,
  //   3: 1,
  //   4: 2,
  //   // ...
  // // },
  // "recommended": {
  //   0: 5
  //   // ...
  // },
  // "characteristics": {
  //   "Size": {
  //     "id": 14,
  //     "value": "4.0000"
  //   },
  //   "Width": {
  //     "id": 15,
  //     "value": "3.5000"
  //   },
  //   "Comfort": {
  //     "id": 16,
  //     "value": "4.0000"
  //   },
};
